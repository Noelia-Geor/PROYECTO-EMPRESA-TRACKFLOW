import { ARMS, GLOVE, HAIR, LEGS, POSES, SHOE, SKIN, type Palette, type Point } from './poses'
import type { Pose } from './timeline'

// Persona del almacén en poses fijas, vista de tres cuartos y mirando a la derecha.
// Coordenadas de pantalla con los pies en (0, 0); mide 36 u (1,80 m). No es un personaje animado:
// la sensación de movimiento la dan la alternancia de dos zancadas y la cámara.

function limb([ax, ay]: Point, [bx, by]: Point, width: number) {
  const length = Math.hypot(bx - ax, by - ay) || 1
  const nx = (-(by - ay) / length) * (width / 2)
  const ny = ((bx - ax) / length) * (width / 2)
  return `${ax + nx},${ay + ny} ${bx + nx},${by + ny} ${bx - nx},${by - ny} ${ax - nx},${ay - ny}`
}

export function FigurePose({ pose, palette }: { pose: Pose; palette: Palette }) {
  const [legKey, armKey] = POSES[pose]
  const [backFoot, frontFoot] = LEGS[legKey]
  const arms = ARMS[armKey]
  const lean = arms.lean ?? 0
  const hip: Point = [lean * 0.3, -16.5]
  const shoulderBack: Point = [-2.6 + lean, -28]
  const shoulderFront: Point = [3 + lean, -28]

  return (
    <>
      <ellipse cx="0" cy="0" rx="7" ry="2.6" fill="#000" opacity="0.28" />
      {/* Brazo y pierna de atrás, más oscuros. */}
      <polygon points={limb(shoulderBack, arms.back, 2.6)} fill={palette.shirt} opacity="0.75" />
      <polygon points={limb([hip[0] - 1.4, hip[1]], backFoot, 3.4)} fill={palette.pants} opacity="0.8" />
      <polygon points={limb([hip[0] + 1.4, hip[1]], frontFoot, 3.6)} fill={palette.pants} />
      <rect x={backFoot[0] - 1.6} y={backFoot[1] - 1.6} width="4" height="1.8" rx="0.8" fill={SHOE} />
      <rect x={frontFoot[0] - 1.4} y={frontFoot[1] - 1.6} width="4.4" height="1.8" rx="0.8" fill={SHOE} />
      {/* Torso con chaleco reflectante. */}
      <polygon
        points={`${-4.3 + lean},-29.5 ${4.4 + lean},-29.5 ${4.3 + lean * 0.4},-16 ${-4 + lean * 0.4},-16`}
        fill={palette.vest}
      />
      <polygon points={`${1.6 + lean},-29.5 ${4.4 + lean},-29.5 ${4.3 + lean * 0.4},-16 ${1.4 + lean * 0.4},-16`} fill="#000" opacity="0.14" />
      <rect x={-4 + lean * 0.8} y="-23.6" width="8.4" height="1.3" fill={palette.stripe} />
      <rect x={-4 + lean * 0.6} y="-20.4" width="8.3" height="1.3" fill={palette.stripe} />
      <rect x={-4 + lean * 0.4} y="-17.2" width="8.3" height="1.2" fill={palette.pants} opacity="0.9" />
      {/* Cabeza. */}
      <circle cx={0.8 + lean} cy="-33" r="3.3" fill={SKIN} />
      <path d={`M${-2.6 + lean} -33.4 a3.4 3.4 0 0 1 6.8 -0.6 l-1.2 -0.1 a2.4 2.4 0 0 0 -4.4 0.6 z`} fill={palette.cap ?? HAIR} />
      {palette.cap ? <rect x={1.8 + lean} y="-35.4" width="3.4" height="1" rx="0.5" fill={palette.cap} /> : null}
      {/* Brazo delantero y manos. */}
      <polygon points={limb(shoulderFront, arms.front, 2.8)} fill={palette.shirt} />
      <circle cx={arms.front[0]} cy={arms.front[1]} r="1.4" fill={GLOVE} />
      <circle cx={arms.back[0]} cy={arms.back[1]} r="1.3" fill={GLOVE} opacity="0.85" />
      {arms.paper ? (
        <g transform={`translate(${arms.front[0] - 1} ${arms.front[1] - 4.5}) rotate(-12)`}>
          <rect width="5" height="6.4" fill="#f3f1ec" />
          <path d="M1 1.6h3M1 2.9h3M1 4.2h2.2" stroke="#7f8c93" strokeWidth="0.45" />
        </g>
      ) : null}
    </>
  )
}
