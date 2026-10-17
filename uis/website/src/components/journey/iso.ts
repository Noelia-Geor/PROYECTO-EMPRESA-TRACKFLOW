// Proyección isométrica del recorrido. Unidades del mundo: 1 m = 20 u.
// x crece hacia abajo a la derecha, y hacia abajo a la izquierda y z hacia arriba.
export const COS = Math.cos(Math.PI / 6)
export const SIN = 0.5

export type Point2 = readonly [number, number]
export type Point3 = readonly [number, number, number]

export function iso(x: number, y: number, z = 0): Point2 {
  return [(x - y) * COS, (x + y) * SIN - z]
}

export function poly(points: readonly Point3[]): string {
  return points
    .map(([x, y, z]) => {
      const [sx, sy] = iso(x, y, z)
      return `${sx.toFixed(1)},${sy.toFixed(1)}`
    })
    .join(' ')
}

// Tres tonos por material: luz cenital, cara izquierda (+y) en media luz y cara derecha (+x) en sombra.
export type Shade = { top: string; left: string; right: string }

// kind marca la cara para el trazo de luz: las aristas superiores brillan y las laterales en sombra se apagan.
export type Face = { points: string; fill: string; opacity?: number; kind?: 'top' | 'left' | 'right' | 'shadow' | 'glow' }

export function box(x: number, y: number, z: number, w: number, d: number, h: number, shade: Shade): Face[] {
  return [
    { points: poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]]), fill: shade.right, kind: 'right' },
    { points: poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]]), fill: shade.left, kind: 'left' },
    { points: poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]]), fill: shade.top, kind: 'top' },
  ]
}

// Sombra proyectada en el suelo. Toda la escena comparte la misma dirección de luz,
// así el almacén, el muelle y la calle se leen como un mismo lugar.
export const LIGHT = { dx: 0.14, dy: 0.34 }

export function shadow(x: number, y: number, w: number, d: number, h: number, opacity = 0.32, z = 0): Face {
  const dx = h * LIGHT.dx
  const dy = h * LIGHT.dy
  return {
    points: poly([[x, y, z], [x + w, y, z], [x + w + dx, y + dy, z], [x + w + dx, y + d + dy, z], [x + dx, y + d + dy, z], [x, y + d, z]]),
    fill: '#02080c',
    opacity,
    kind: 'shadow',
  }
}

// Caras sobre un plano vertical (+y o +x): ventanas, etiquetas, rótulos.
export function onFaceY(y: number, x0: number, x1: number, z0: number, z1: number, fill: string, opacity?: number, kind?: Face['kind']): Face {
  return { points: poly([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]]), fill, opacity, kind }
}

export function onFaceX(x: number, y0: number, y1: number, z0: number, z1: number, fill: string, opacity?: number, kind?: Face['kind']): Face {
  return { points: poly([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]]), fill, opacity, kind }
}

export function plane(x: number, y: number, z: number, w: number, d: number, fill: string, opacity?: number): Face {
  return { points: poly([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]]), fill, opacity }
}

// Línea en el suelo o en el aire, como atributo d de un path.
export function line(points: readonly Point3[]): string {
  return points
    .map(([x, y, z], index) => {
      const [sx, sy] = iso(x, y, z)
      return `${index ? 'L' : 'M'}${sx.toFixed(1)} ${sy.toFixed(1)}`
    })
    .join('')
}

// Rueda o disco vertical en el plano xz (cara +y visible) o yz (cara +x visible).
export function wheel(cx: number, cy: number, cz: number, r: number, axis: 'x' | 'y'): string {
  const points: Point3[] = []
  for (let step = 0; step < 14; step++) {
    const angle = (step / 14) * Math.PI * 2
    const a = Math.cos(angle) * r
    const b = Math.sin(angle) * r
    points.push(axis === 'y' ? [cx + a, cy, cz + b] : [cx, cy + a, cz + b])
  }
  return poly(points)
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
export const lerp = (a: number, b: number, k: number) => a + (b - a) * k
// Tramo normalizado de la línea de tiempo: 0 antes de «from», 1 después de «to».
export const span = (t: number, from: number, to: number) => clamp((t - from) / (to - from))
export const ease = (k: number) => k * k * (3 - 2 * k)
export const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2)
