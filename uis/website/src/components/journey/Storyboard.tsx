import { useCallback } from 'react'
import type { Scene } from './OperationJourney'
import { CHAPTERS, cameraAt, stateAt } from './timeline'
import { World, type WorldApi } from './World'

// Guion gráfico estático: con movimiento reducido o en modo ligero, seis viñetas fijas del mismo mundo
// (cada una con su encuadre) y los textos de todas las escenas. Nada se fija ni se anima.

const FRAME_W = 640
const FRAME_H = 400
// Momento representativo de cada capítulo: el final de su acción principal.
const MOMENTS = [2.7, 4.85, 7.4, 9.6, 10.95, 11.97]

function Frame({ t }: { t: number }) {
  const onReady = useCallback(
    (api: WorldApi) => {
      const state = stateAt(t)
      api.apply(state, cameraAt(t, state, 'chapters'), {
        width: FRAME_W,
        height: FRAME_H,
        centerX: FRAME_W / 2,
        centerY: FRAME_H / 2,
        scale: 0.62,
      })
    },
    [t],
  )
  return <World onReady={onReady} viewBox={`0 0 ${FRAME_W} ${FRAME_H}`} className="block h-auto w-full" />
}

export function Storyboard({ scenes, onAnimate, focusToggle = false }: { scenes: Scene[]; onAnimate?: () => void; focusToggle?: boolean }) {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8">
      {onAnimate ? (
        // oxlint-disable-next-line jsx-a11y/no-autofocus -- solo enfoca tras un cambio de modo pedido con este control
        <button type="button" className="jw-button mb-8" onClick={onAnimate} autoFocus={focusToggle}>
          Ver el recorrido animado
        </button>
      ) : null}
      <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        {CHAPTERS.map(([from, to], index) => (
          <li key={from}>
            <figure>
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b1b24]">
                <Frame t={MOMENTS[index]} />
              </div>
              <figcaption className="mt-5">
                <ol className="space-y-4">
                  {scenes.slice(from, to).map((scene, offset) => (
                    <li key={scene.id}>
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-senal">
                        {String(from + offset + 1).padStart(2, '0')} · {scene.label}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-crema">{scene.title}</h3>
                      <p className="mt-1 leading-7 text-niebla">{scene.text}</p>
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </div>
  )
}
