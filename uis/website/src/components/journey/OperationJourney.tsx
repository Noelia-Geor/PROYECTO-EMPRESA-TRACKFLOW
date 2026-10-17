import { useCallback, useEffect, useRef, useState } from 'react'
import avif1024 from '../../assets/almacen-1024.avif'
import webp1024 from '../../assets/almacen-1024.webp'
import avif1600 from '../../assets/almacen-1600.avif'
import webp1600 from '../../assets/almacen-1600.webp'
import avif2400 from '../../assets/almacen-2400.avif'
import webp2400 from '../../assets/almacen-2400.webp'
import { clamp } from './iso'
import { Storyboard } from './Storyboard'
import { CHAPTERS, SCENE_COUNT, cameraAt, chapterOf, stateAt, type Hud, type State } from './timeline'
import { World, type View, type WorldApi } from './World'

export type Scene = { id: string; label: string; title: string; text: string }

const STORAGE_KEY = 'trackflow-recorrido-estatico'

function readStoredStatic() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function storeStatic(value: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
  } catch {
    // Sin almacenamiento (modo privado): la preferencia dura solo esta visita.
  }
}

// Modo ligero: ahorro de datos o equipos muy modestos ven el guion gráfico estático.
function prefersLite() {
  const navigatorInfo = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  return Boolean(navigatorInfo.connection?.saveData) || (navigatorInfo.deviceMemory ?? 8) <= 2 || (navigator.hardwareConcurrency ?? 8) <= 2
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export function OperationJourney({ scenes }: { scenes: Scene[] }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [still, setStill] = useState(() => readStoredStatic() || prefersLite())
  // Solo tras un cambio pedido por la persona: el botón del modo nuevo recibe el foco.
  const [switched, setSwitched] = useState(false)

  const toggle = (value: boolean) => {
    storeStatic(value)
    setStill(value)
    setSwitched(true)
  }

  if (reduced || still) {
    return <Storyboard scenes={scenes} onAnimate={reduced ? undefined : () => toggle(false)} focusToggle={switched} />
  }
  return <JourneyLive scenes={scenes} onStatic={() => toggle(true)} focusToggle={switched} />
}

// Etiquetas del gemelo digital ancladas a puntos del mundo.
const ANCHORS: { key: Hud; text: string; side?: 'left'; at: (state: State) => [number, number, number] }[] = [
  { key: 'loc', text: 'Ubicación del pedido', at: () => [186, 6, 54] },
  { key: 'list', text: 'Lista de picking en papel', side: 'left', at: (s) => [s.op.x - 2, s.op.y + 2, 24] },
  { key: 'pedido', text: 'Pedido', at: (s) => [s.pkg.x + 4, s.pkg.y + 4, s.pkg.z + 14] },
  { key: 'asignado', text: 'Transportista asignado', at: (s) => [s.truck.x, s.truck.y, 46] },
  { key: 'destino', text: 'Destino', at: () => [1214, -440, 58] },
  { key: 'entregado', text: 'Entregado', at: () => [1246, -440, 32] },
  { key: 'devoluciones', text: 'Devoluciones', at: () => [676, 122, 30] },
]

function JourneyLive({ scenes, onStatic, focusToggle }: { scenes: Scene[]; onStatic: () => void; focusToggle: boolean }) {
  // Compacto: móvil y tablet en vertical. Capítulos con cortes, sin inclinación 3D.
  const mobile = useMedia('(max-width: 767px), (orientation: portrait) and (max-width: 1100px)')
  const trackRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const hudRefs = useRef<Partial<Record<Hud, HTMLElement | null>>>({})
  const worldApi = useRef<WorldApi | null>(null)
  const sceneRef = useRef(-1)
  const chapterRef = useRef(-1)
  const [scene, setScene] = useState(0)
  const onReady = useCallback((api: WorldApi) => {
    worldApi.current = api
  }, [])

  useEffect(() => {
    let frame = 0
    let active = false

    const render = () => {
      frame = 0
      const track = trackRef.current
      const stage = stageRef.current
      const api = worldApi.current
      if (!track || !stage || !api) return

      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const t = clamp(scrollable > 0 ? -rect.top / scrollable : 0) * (SCENE_COUNT - 0.001)
      const state = stateAt(t)
      const camera = cameraAt(t, state, mobile ? 'chapters' : 'continuous')

      const width = stage.clientWidth
      const height = stage.clientHeight
      const view: View = mobile
        ? { width, height, centerX: width / 2, centerY: height * 0.4, scale: Math.min(width / 520, height / 900) }
        : { width, height, centerX: width * 0.6, centerY: height * 0.5, scale: Math.min(width / 1280, height / 800) }
      api.apply(state, camera, view)

      if (tiltRef.current) tiltRef.current.style.transform = mobile ? '' : `perspective(1600px) rotateX(${camera.tilt.toFixed(2)}deg)`
      if (photoRef.current) {
        photoRef.current.style.opacity = state.photo.toFixed(3)
        photoRef.current.style.transform = `scale(${(1 + 0.08 * (1 - state.photo)).toFixed(3)})`
      }
      for (const anchor of ANCHORS) {
        const element = hudRefs.current[anchor.key]
        if (!element) continue
        const opacity = state.hud[anchor.key]
        element.style.opacity = opacity.toFixed(2)
        element.style.visibility = opacity > 0.01 ? 'visible' : 'hidden'
        if (opacity > 0.01) {
          const [x, y] = api.project(...anchor.at(state))
          element.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
        }
      }
      for (const key of ['carrier', 'decisiones'] as const) {
        const element = hudRefs.current[key]
        if (!element) continue
        element.style.opacity = state.hud[key].toFixed(2)
        element.style.visibility = state.hud[key] > 0.01 ? 'visible' : 'hidden'
      }

      const index = Math.min(SCENE_COUNT - 1, Math.floor(t))
      if (index !== sceneRef.current) {
        sceneRef.current = index
        setScene(index)
      }
      // En móvil, cada capítulo entra con un corte suave.
      const chapter = chapterOf(t)
      if (mobile && chapter !== chapterRef.current) {
        if (chapterRef.current !== -1) {
          stage.classList.remove('jw-cut')
          void stage.offsetWidth
          stage.classList.add('jw-cut')
        }
        chapterRef.current = chapter
      }
    }

    const request = () => {
      if (active && !frame) frame = requestAnimationFrame(render)
    }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      request()
    })
    if (trackRef.current) observer.observe(trackRef.current)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    active = true
    render()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [mobile])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const top = track.getBoundingClientRect().top + window.scrollY
    const scrollable = track.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((index + 0.55) / SCENE_COUNT) * scrollable, behavior: 'smooth' })
  }

  const railItems = mobile ? CHAPTERS.map(([from]) => from) : scenes.map((_, index) => index)
  const activeRail = mobile ? CHAPTERS.findIndex(([from, to]) => scene >= from && scene < to) : scene

  return (
    <div ref={trackRef} className={`jw-track relative ${mobile ? 'jw-compact' : ''}`} style={{ ['--jw-scenes' as string]: SCENE_COUNT }}>
      <div ref={stageRef} className="jw-stage sticky top-0 h-svh overflow-hidden">
        <div className="jw-backdrop" aria-hidden="true" />
        <div ref={tiltRef} className="jw-tilt absolute inset-0">
          <World onReady={onReady} className="absolute inset-0 h-full w-full" />
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {ANCHORS.map((anchor) => (
              <div
                key={anchor.key}
                ref={(element) => {
                  hudRefs.current[anchor.key] = element
                }}
                className="jw-tag"
                data-side={anchor.side}
                style={{ opacity: 0, visibility: 'hidden' }}
              >
                <span className="jw-tag-label">{anchor.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div ref={photoRef} className="jw-photo" aria-hidden="true">
          <picture>
            {/* La misma foto nítida del hero, al tamaño que pida la pantalla. */}
            <source type="image/avif" srcSet={`${avif1024} 1024w, ${avif1600} 1600w, ${avif2400} 2400w`} sizes="100vw" />
            <img
              src={webp1600}
              srcSet={`${webp1024} 1024w, ${webp1600} 1600w, ${webp2400} 2400w`}
              sizes="100vw"
              alt=""
              className="hero-photo h-full w-full object-cover"
              decoding="async"
            />
          </picture>
        </div>
        <div className="jw-vignette" aria-hidden="true" />

        {/* Paneles fijos: red de transportistas y decisiones de cada devolución (CONTEXT.md). */}
        <div
          ref={(element) => {
            hudRefs.current.carrier = element
          }}
          className="jw-panel"
          style={{ opacity: 0, visibility: 'hidden' }}
          aria-hidden="true"
        >
          <p className="jw-panel-title">Red de 8 transportistas</p>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-niebla">Estados Unidos</dt>
              <dd className="text-crema">UPS · FedEx · DHL</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-niebla">España</dt>
              <dd className="text-crema">MRW · SEUR · DHL</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-niebla">Locales</dt>
              <dd className="text-crema">2 transportistas</dd>
            </div>
          </dl>
          <p className="mt-3 border-t border-white/10 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-niebla">Asignación por el equipo de coordinación</p>
        </div>
        <div
          ref={(element) => {
            hudRefs.current.decisiones = element
          }}
          className="jw-panel"
          style={{ opacity: 0, visibility: 'hidden' }}
          aria-hidden="true"
        >
          <p className="jw-panel-title">Cada devolución, una decisión</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-crema">
            <li className="jw-chip">Aprobar o rechazar</li>
            <li className="jw-chip">Recoger o no</li>
            <li className="jw-chip">Reacondicionar o desechar</li>
          </ul>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-niebla">18–25 % del volumen</p>
        </div>

        {/* Estado de la escena y salida a la versión estática. */}
        <div className="absolute left-4 top-20 flex items-center gap-3 sm:left-8 md:top-24">
          <p className="jw-status" aria-hidden="true">
            <span className="text-senal">{String(scene + 1).padStart(2, '0')}</span> / {SCENE_COUNT} · {scenes[scene]?.label}
          </p>
          {/* oxlint-disable-next-line jsx-a11y/no-autofocus -- solo enfoca tras un cambio de modo pedido con este control */}
          <button type="button" className="jw-button" onClick={onStatic} autoFocus={focusToggle}>
            Versión estática
          </button>
        </div>

        {/* Textos: todos en el documento y en orden; solo se ve el de la escena activa. */}
        <ol className="jw-captions">
          {scenes.map((item, index) => (
            <li key={item.id} className="jw-caption" data-active={index === scene}>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-senal">
                {String(index + 1).padStart(2, '0')} · {item.label}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight font-bold text-crema md:text-[1.9rem]">{item.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-7 text-crema/80 md:text-base">{item.text}</p>
            </li>
          ))}
        </ol>

        <nav className="jw-rail" aria-label="Escenas del recorrido">
          <ol>
            {railItems.map((start, index) => (
              <li key={start}>
                <button
                  type="button"
                  className="jw-rail-dot"
                  aria-current={index === activeRail ? 'step' : undefined}
                  aria-label={`Ir a la escena ${start + 1}: ${scenes[start]?.title}`}
                  onClick={() => goTo(start)}
                >
                  <span className="jw-rail-name" aria-hidden="true">
                    {scenes[start]?.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
