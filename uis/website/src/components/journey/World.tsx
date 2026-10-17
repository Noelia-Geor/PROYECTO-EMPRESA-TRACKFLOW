import { memo, useCallback, useRef } from 'react'
import { FigurePose } from './Figure'
import { COURIER, OPERATOR, POSE_NAMES } from './poses'
import { box, iso, onFaceX, onFaceY, poly, shadow, wheel, type Face, type Shade } from './iso'
import type { Camera, Pose, State } from './timeline'
import { LIGHTS, MAT, palletLoad, ROUTE_BACK, ROUTE_OUT, SPOTS, ZONES, type Light, type Zone } from './scenery'

// El mundo isométrico en un único SVG. React lo pinta una vez; después, apply() mueve la cámara
// y los actores escribiendo atributos directamente, sin volver a renderizar.

export type View = { width: number; height: number; centerX: number; centerY: number; scale: number }

export type WorldApi = {
  apply: (state: State, camera: Camera, view: View) => void
  project: (x: number, y: number, z: number) => [number, number]
}

const KIND_CLASS: Record<NonNullable<Face['kind']>, string> = { top: 't', left: 'l', right: 'r', shadow: 's', glow: 'g' }

function Faces({ faces }: { faces: Face[] }) {
  return faces.map((face, index) => (
    <polygon key={index} points={face.points} fill={face.fill} opacity={face.opacity} className={face.kind ? KIND_CLASS[face.kind] : undefined} />
  ))
}

// Degradados compartidos: suelo pulido, pared con caída de luz, césped nocturno, charcos de luz y brillo del camión.
function Defs() {
  return (
    <defs>
      <linearGradient id="jw-floor" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#13303d" />
        <stop offset="0.55" stopColor="#0f2632" />
        <stop offset="1" stopColor="#0b1c25" />
      </linearGradient>
      <linearGradient id="jw-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0d1d26" stopOpacity="0.85" />
        <stop offset="1" stopColor="#1f3c4c" stopOpacity="0.15" />
      </linearGradient>
      <linearGradient id="jw-grass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#11302e" />
        <stop offset="1" stopColor="#0b201f" />
      </linearGradient>
      <radialGradient id="jw-pool">
        <stop offset="0" stopColor="#dfeaf0" stopOpacity="0.2" />
        <stop offset="0.6" stopColor="#9fb9c6" stopOpacity="0.07" />
        <stop offset="1" stopColor="#9fb9c6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="jw-pool-warm">
        <stop offset="0" stopColor="#ffc785" stopOpacity="0.28" />
        <stop offset="0.6" stopColor="#ff9a4d" stopOpacity="0.08" />
        <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="jw-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#eaf3f7" stopOpacity="0.11" />
        <stop offset="1" stopColor="#eaf3f7" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="jw-glow-cold">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="jw-glow-warm">
        <stop offset="0" stopColor="#ffd59a" stopOpacity="0.75" />
        <stop offset="1" stopColor="#ffb060" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="jw-glow-pkg">
        <stop offset="0" stopColor="#ff6a1a" stopOpacity="0.45" />
        <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="jw-truck-side" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#c9d2d8" />
        <stop offset="0.45" stopColor="#eef2f4" />
        <stop offset="1" stopColor="#d2dae0" />
      </linearGradient>
      <linearGradient id="jw-truck-side-dark" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#a9b6be" />
        <stop offset="0.5" stopColor="#c8d2d8" />
        <stop offset="1" stopColor="#aab7bf" />
      </linearGradient>
    </defs>
  )
}

// Capa de luz: conos de las pantallas de la nave, cabezales encendidos y halos de las farolas.
function LightLayer({ lights }: { lights: Light[] }) {
  return lights.map((light, index) => {
    const glowFace = light.fixture[light.fixture.length - 1]
    const [gx, gy] = glowFace.points.split(' ')[0].split(',').map(Number)
    return (
      <g key={index}>
        {light.cone ? <polygon points={light.cone} fill="url(#jw-cone)" className="s" /> : null}
        <Faces faces={light.fixture} />
        <ellipse cx={gx + (light.warm ? 2 : 10)} cy={gy} rx={light.warm ? 9 : 22} ry={light.warm ? 6 : 9} fill={light.warm ? 'url(#jw-glow-warm)' : 'url(#jw-glow-cold)'} />
      </g>
    )
  })
}

// Modelos con el origen en su esquina (paquete, palet) o en su centro (camión).
const PACKAGE = 9
const PACKAGE_H = 7

function mapToY([x, y, z, w, d, h]: readonly number[]) {
  return [y, -(x + w), z, d, w, h] as const
}

const TRUCK_PARTS: { box: readonly number[]; shade: Shade; shadeY?: Shade }[] = [
  { box: [-36, -12, 2, 94, 24, 3], shade: MAT.dark },
  { box: [-35, -13, 5, 70, 26, 30], shade: { ...MAT.truck, left: 'url(#jw-truck-side)' }, shadeY: { ...MAT.truck, right: 'url(#jw-truck-side-dark)' } },
  { box: [37, -13, 3, 19, 26, 24], shade: MAT.cab },
]

function TruckAlongX() {
  return (
    <>
      <Faces faces={[shadow(-36, -13, 92, 26, 30, 0.42)]} />
      {TRUCK_PARTS.map(({ box: [x, y, z, w, d, h], shade }, index) => (
        <Faces key={index} faces={box(x, y, z, w, d, h, shade)} />
      ))}
      <polygon points={poly([[56, -11, 14], [56, 11, 14], [56, 11, 25], [56, -11, 25]])} fill="#123049" />
      <polygon points={poly([[40, 13, 15], [53, 13, 15], [53, 13, 24], [40, 13, 24]])} fill="#123049" />
      <polygon points={poly([[-33, 13, 9], [33, 13, 9], [33, 13, 10.4], [-33, 13, 10.4]])} fill="#0e2a47" opacity="0.5" />
      {[-25, -13, 45].map((x) => (
        <g key={x}>
          <polygon points={wheel(x, 13.2, 4.2, 4.2, 'y')} fill="#0a141a" />
          <polygon points={wheel(x, 13.4, 4.2, 1.8, 'y')} fill="#5b6f7b" />
        </g>
      ))}
      {/* Faros, rejilla, retrovisor y pilotos laterales. */}
      <Faces
        faces={[
          onFaceX(56.1, -11, -7, 6, 8.5, '#fff6dd', 1, 'glow'),
          onFaceX(56.1, 7, 11, 6, 8.5, '#fff6dd', 1, 'glow'),
          onFaceX(56.1, -6, 6, 5, 11, '#1a2a34'),
          ...box(50, 13, 18, 2, 3, 5, MAT.dark),
          onFaceY(13.1, -33, -31, 6, 7.4, '#ff8a3c', 1, 'glow'),
          onFaceY(13.1, 0, 2, 6, 7.4, '#ff8a3c', 1, 'glow'),
          onFaceY(13.1, 31, 33, 6, 7.4, '#ff8a3c', 1, 'glow'),
        ]}
      />
    </>
  )
}

function TruckAlongY() {
  const [chassis, cargo, cab] = TRUCK_PARTS
  return (
    <>
      <Faces faces={[shadow(-13, -56, 26, 92, 30, 0.42)]} />
      {[chassis, cab, cargo].map(({ box: params, shade, shadeY }, index) => {
        const [x, y, z, w, d, h] = mapToY(params)
        return <Faces key={index} faces={box(x, y, z, w, d, h, shadeY ?? shade)} />
      })}
      {/* Pilotos traseros. */}
      <Faces faces={[onFaceY(35.1, -12, -9, 8, 11, '#ff4d3d', 1, 'glow'), onFaceY(35.1, 9, 12, 8, 11, '#ff4d3d', 1, 'glow')]} />
      <polygon points={poly([[13, -40, 15], [13, -53, 15], [13, -53, 24], [13, -40, 24]])} fill="#123049" />
      {/* Puertas traseras de la caja, que ahora mira hacia la cámara. */}
      <polygon points={poly([[-11, 35, 7], [11, 35, 7], [11, 35, 33], [-11, 35, 33]])} fill="none" stroke="#8c99a1" strokeWidth="0.6" />
      <polygon points={poly([[0, 35, 7], [0, 35, 33]])} fill="none" stroke="#8c99a1" strokeWidth="0.6" />
      {[25, 13, -45].map((y) => (
        <g key={y}>
          <polygon points={wheel(13.2, y, 4.2, 4.2, 'x')} fill="#0a141a" />
          <polygon points={wheel(13.4, y, 4.2, 1.8, 'x')} fill="#5b6f7b" />
        </g>
      ))}
    </>
  )
}

function PackageModel() {
  const s = PACKAGE
  const h = PACKAGE_H
  const [hx, hy] = iso(s / 2, s / 2, h / 2)
  return (
    <>
      {/* El hilo conductor emite un halo suave para seguirlo en cualquier plano. */}
      <ellipse cx={hx} cy={hy} rx="17" ry="12" fill="url(#jw-glow-pkg)" />
      <polygon points={poly([[0, 0, 0], [s, 0, 0], [s, s, 0], [0, s, 0]])} fill="#000" opacity="0.3" transform="translate(2 1.5)" className="s" />
      <Faces faces={box(0, 0, 0, s, s, h, MAT.pkg)} />
      {/* Caja abierta: interior y solapas. */}
      <g data-part="open">
        <polygon points={poly([[0.6, 0.6, h], [s - 0.6, 0.6, h], [s - 0.6, s - 0.6, h], [0.6, s - 0.6, h]])} fill="#8a3a0c" />
        <polygon points={poly([[0, s, h], [s, s, h], [s, s + 3, h + 2.5], [0, s + 3, h + 2.5]])} fill="#ff8a45" />
        <polygon points={poly([[s, 0, h], [s, s, h], [s + 3, s, h + 2.5], [s + 3, 0, h + 2.5]])} fill="#e45d14" />
      </g>
      {/* Caja cerrada: precinto y etiqueta de envío. */}
      <g data-part="closed">
        <polygon points={poly([[0, s / 2 - 0.9, h], [s, s / 2 - 0.9, h], [s, s / 2 + 0.9, h], [0, s / 2 + 0.9, h]])} fill="#ffc29b" opacity="0.8" />
      </g>
      <g data-part="label">
        <polygon points={poly([[1.6, s, 1.4], [6.4, s, 1.4], [6.4, s, 5.2], [1.6, s, 5.2]])} fill="#f6f4ef" />
        <polygon points={poly([[2.2, s, 2.2], [5.8, s, 2.2], [5.8, s, 2.6], [2.2, s, 2.6]])} fill="#10161f" />
        <polygon points={poly([[2.2, s, 3.4], [4.6, s, 3.4], [4.6, s, 4.4], [2.2, s, 4.4]])} fill="#10161f" />
      </g>
    </>
  )
}

function PalletModel() {
  // Film estirable alrededor de la carga (incluido el paquete, que se apoya a 17 u).
  const wrap = box(0, 0, 3, 24, 16, 22, { top: '#e8eef1', left: '#e8eef1', right: '#c9d5db' })
  const [handX, handY] = (() => {
    const [fx, fy] = iso(36, 8, 0)
    return [fx - 6.8, fy - 15.5]
  })()
  const [baseX, baseY] = iso(24, 8, 2)
  return (
    <>
      <Faces faces={palletLoad(0, 0, 2)} />
      <g data-part="wrap">
        {wrap.map((face, index) => (
          <polygon key={index} points={face.points} fill={face.fill} opacity="0.2" />
        ))}
      </g>
      <g data-part="jack">
        <line x1={baseX} y1={baseY} x2={handX} y2={handY} stroke="#ff6a1a" strokeWidth="1.6" strokeLinecap="round" />
        <polygon points={wheel(25, 8, 2, 2, 'y')} fill="#0a141a" />
      </g>
    </>
  )
}

function Person({ palette }: { palette: typeof OPERATOR }) {
  return (
    <g data-part="flip">
      {POSE_NAMES.map((pose) => (
        <g key={pose} data-pose={pose} display="none">
          <FigurePose pose={pose} palette={palette} />
        </g>
      ))}
    </g>
  )
}

function ZoneLayer({ zone, register }: { zone: Zone; register: (id: string) => (element: SVGElement | null) => void }) {
  return (
    <g data-zone={zone.id}>
      {zone.objects.map((object, index) => (
        <g key={index} ref={object.bbox ? register(`obj-${zone.id}-${index}`) : undefined}>
          <Faces faces={object.faces} />
        </g>
      ))}
      <path d={zone.lines} className="jw-lines" />
      {zone.labels.map((label) => (
        <text key={label.text} transform={label.transform} fontSize={label.size} className={label.className} aria-hidden="true">
          {label.text}
        </text>
      ))}
    </g>
  )
}

const RETURNS_ZONE = poly([[632, 100, 0.4], [720, 100, 0.4], [720, 144, 0.4], [632, 144, 0.4]])
const DOOR = poly([[1246, -446, 0], [1246, -434, 0], [1246, -434, 21], [1246, -446, 21]])
const SLOT = { x: SPOTS.shelfSlot.x - 3, y: SPOTS.shelfSlot.y - 4, z: 36 }
const SLOT_FRAME = poly([
  [SLOT.x, SLOT.y + 18, SLOT.z],
  [SLOT.x + 16, SLOT.y + 18, SLOT.z],
  [SLOT.x + 16, SLOT.y + 18, SLOT.z + 14],
  [SLOT.x, SLOT.y + 18, SLOT.z + 14],
])
const SLOT_FLOOR = poly([
  [SLOT.x, SLOT.y, SLOT.z + 0.2],
  [SLOT.x + 16, SLOT.y, SLOT.z + 0.2],
  [SLOT.x + 16, SLOT.y + 18, SLOT.z + 0.2],
  [SLOT.x, SLOT.y + 18, SLOT.z + 0.2],
])

const POSE_SET = new Set<string>(POSE_NAMES)

type Refs = Record<string, SVGElement | null>

export const World = memo(function World({
  onReady,
  className = '',
  viewBox,
}: {
  onReady: (api: WorldApi) => void
  className?: string
  viewBox?: string
}) {
  const refs = useRef<Refs>({})
  const cache = useRef(new Map<string, string>())
  const view = useRef<View>({ width: 1, height: 1, centerX: 0, centerY: 0, scale: 1 })
  const camera = useRef<Camera>({ x: 0, y: 0, zoom: 1, tilt: 0 })

  const bind = (key: string) => (element: SVGElement | null) => {
    refs.current[key] = element
  }

  // Escribe un atributo solo si cambia: el bucle de scroll toca muy pocos nodos por fotograma.
  const set = useCallback((key: string, attribute: string, value: string) => {
    const element = refs.current[key]
    if (!element) return
    const id = `${key}:${attribute}`
    if (cache.current.get(id) === value) return
    cache.current.set(id, value)
    element.setAttribute(attribute, value)
  }, [])

  const setPart = useCallback(
    (key: string, part: string, visible: boolean) => {
      const element = refs.current[key]?.querySelector(`[data-part="${part}"]`)
      if (!element) return
      const id = `${key}/${part}`
      const value = visible ? 'inline' : 'none'
      if (cache.current.get(id) === value) return
      cache.current.set(id, value)
      element.setAttribute('display', value)
    },
    [],
  )

  const setFigure = useCallback(
    (key: string, figure: State['op']) => {
      const [sx, sy] = iso(figure.x, figure.y, 0)
      set(key, 'transform', `translate(${sx.toFixed(1)} ${sy.toFixed(1)})`)
      set(key, 'opacity', figure.vis.toFixed(2))
      const element = refs.current[key]
      if (!element) return
      const flipId = `${key}/flip`
      const flip = figure.flip ? 'scale(-1 1)' : ''
      if (cache.current.get(flipId) !== flip) {
        cache.current.set(flipId, flip)
        element.querySelector('[data-part="flip"]')?.setAttribute('transform', flip)
      }
      const poseId = `${key}/pose`
      const previous = cache.current.get(poseId)
      if (previous === figure.pose) return
      if (previous && POSE_SET.has(previous)) element.querySelector(`[data-pose="${previous}"]`)?.setAttribute('display', 'none')
      element.querySelector(`[data-pose="${figure.pose as Pose}"]`)?.setAttribute('display', 'inline')
      cache.current.set(poseId, figure.pose)
    },
    [set],
  )

  const project = useCallback((x: number, y: number, z: number): [number, number] => {
    const [sx, sy] = iso(x, y, z)
    const { centerX, centerY, scale } = view.current
    const { x: cx, y: cy, zoom } = camera.current
    return [centerX + (sx - cx) * zoom * scale, centerY + (sy - cy) * zoom * scale]
  }, [])

  const apply = useCallback(
    (state: State, cam: Camera, nextView: View) => {
      view.current = nextView
      camera.current = cam
      const zoom = cam.zoom * nextView.scale
      set(
        'camera',
        'transform',
        `translate(${nextView.centerX.toFixed(1)} ${nextView.centerY.toFixed(1)}) scale(${zoom.toFixed(4)}) translate(${(-cam.x).toFixed(1)} ${(-cam.y).toFixed(1)})`,
      )

      // Descarta las zonas que quedan fuera del encuadre.
      for (const zone of ZONES) {
        const [x0, y0, x1, y1] = zone.bounds
        const corners = [iso(x0, y0, 0), iso(x1, y0, 0), iso(x0, y1, 0), iso(x1, y1, 0), iso(x0, y0, 120)]
        const xs = corners.map(([sx]) => nextView.centerX + (sx - cam.x) * zoom)
        const ys = corners.map(([, sy]) => nextView.centerY + (sy - cam.y) * zoom)
        const visible = Math.max(...xs) > 0 && Math.min(...xs) < nextView.width && Math.max(...ys) > 0 && Math.min(...ys) < nextView.height
        set(`zone-${zone.id}`, 'display', visible ? 'inline' : 'none')
        set(`light-${zone.id}`, 'display', visible ? 'inline' : 'none')
        if (!visible) continue
        // Dentro de la zona, cada objeto (estantería, mesa, casa…) se oculta si cae fuera del encuadre.
        // Ocultar no cambia el orden de pintado, así que la profundidad se mantiene.
        const margin = 40
        zone.objects.forEach((object, index) => {
          if (!object.bbox) return
          const [bx0, by0, bx1, by1] = object.bbox
          const inside =
            nextView.centerX + (bx1 - cam.x) * zoom > -margin &&
            nextView.centerX + (bx0 - cam.x) * zoom < nextView.width + margin &&
            nextView.centerY + (by1 - cam.y) * zoom > -margin &&
            nextView.centerY + (by0 - cam.y) * zoom < nextView.height + margin
          set(`obj-${zone.id}-${index}`, 'display', inside ? 'inline' : 'none')
        })
      }

      setFigure('op', state.op)
      setFigure('courier', state.courier)

      const [px, py] = iso(state.pkg.x, state.pkg.y, state.pkg.z)
      const pkgTransform = `translate(${px.toFixed(1)} ${py.toFixed(1)})`
      for (const key of ['pkgBack', 'pkgFront']) {
        const visible = state.pkg.vis > 0 && (key === 'pkgFront') === state.pkg.front
        set(key, 'display', visible ? 'inline' : 'none')
        if (!visible) continue
        set(key, 'transform', pkgTransform)
        setPart(key, 'open', !state.pkg.closed)
        setPart(key, 'closed', state.pkg.closed)
        setPart(key, 'label', state.pkg.label)
      }
      set('ring', 'transform', pkgTransform)
      set('ring', 'opacity', state.pkg.ring.toFixed(2))

      const [lx, ly] = iso(state.pallet.x, state.pallet.y, 0)
      set('pallet', 'transform', `translate(${lx.toFixed(1)} ${ly.toFixed(1)})`)
      set('pallet', 'display', state.pallet.vis ? 'inline' : 'none')
      setPart('pallet', 'wrap', state.pallet.wrap > 0.02)
      refs.current.pallet?.querySelector('[data-part="wrap"]')?.setAttribute('opacity', state.pallet.wrap.toFixed(2))
      setPart('pallet', 'jack', state.pallet.jack > 0.5)

      const [tx, ty] = iso(state.truck.x, state.truck.y, 0)
      set('truck', 'transform', `translate(${tx.toFixed(1)} ${ty.toFixed(1)})`)
      set('truckX', 'display', state.truck.dir === 'x' ? 'inline' : 'none')
      set('truckY', 'display', state.truck.dir === 'y' ? 'inline' : 'none')

      set('loc', 'opacity', state.loc.toFixed(2))
      set('route', 'stroke-dashoffset', (1 - state.route).toFixed(3))
      set('route', 'opacity', state.route > 0 ? '1' : '0')
      set('back', 'stroke-dashoffset', (1 - state.back).toFixed(3))
      set('back', 'opacity', state.back > 0 ? '1' : '0')
      set('door', 'opacity', (state.door * 0.45).toFixed(2))
      set('returns', 'opacity', state.returns.toFixed(2))
    },
    [set, setFigure, setPart],
  )

  const ready = useRef(false)
  const svgRef = useCallback(
    (element: SVGSVGElement | null) => {
      if (element && !ready.current) {
        ready.current = true
        onReady({ apply, project })
      }
    },
    [apply, project, onReady],
  )

  const [warehouse, outside] = ZONES

  return (
    <svg ref={svgRef} className={`jw ${className}`} viewBox={viewBox} aria-hidden="true" focusable="false">
      <Defs />
      <g ref={bind('camera')}>
        <g ref={bind('zone-almacen')}>
          <ZoneLayer zone={warehouse} register={bind} />
        </g>
        <g ref={bind('zone-exterior')}>
          <ZoneLayer zone={outside} register={bind} />
        </g>

        {/* Señales en el suelo: ruta de ida, ruta de vuelta, zona de devoluciones y puerta de destino. */}
        <path ref={bind('route')} d={ROUTE_OUT} className="jw-route" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} opacity={0} />
        <path ref={bind('back')} d={ROUTE_BACK} className="jw-route-back" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} opacity={0} />
        <polygon ref={bind('returns')} points={RETURNS_ZONE} className="jw-zone" opacity={0} />
        <polygon ref={bind('door')} points={DOOR} fill="#ff6a1a" opacity={0} />

        <g ref={bind('pallet')}>
          <PalletModel />
        </g>
        <g ref={bind('pkgBack')}>
          <PackageModel />
        </g>
        <g ref={bind('loc')} opacity={0}>
          <polygon points={SLOT_FLOOR} fill="#ff6a1a" opacity="0.22" />
          <polygon points={SLOT_FRAME} className="jw-bracket" />
        </g>
        <g ref={bind('op')}>
          <Person palette={OPERATOR} />
        </g>
        <g ref={bind('courier')} opacity={0}>
          <Person palette={COURIER} />
        </g>
        <g ref={bind('pkgFront')} display="none">
          <PackageModel />
        </g>
        <g ref={bind('truck')}>
          <g ref={bind('truckX')}>
            <TruckAlongX />
          </g>
          <g ref={bind('truckY')} display="none">
            <TruckAlongY />
          </g>
        </g>
        <g ref={bind('ring')} opacity={0}>
          <circle cx="4" cy="4" r="16" className="jw-ring" />
        </g>

        <g ref={bind('light-almacen')}>
          <LightLayer lights={LIGHTS.nave} />
        </g>
        <g ref={bind('light-exterior')}>
          <LightLayer lights={LIGHTS.street} />
        </g>

        <path d={warehouse.ghost} className="jw-ghost" />
      </g>
    </svg>
  )
})
