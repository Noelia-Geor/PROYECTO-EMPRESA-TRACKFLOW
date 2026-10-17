import { clamp, ease, easeInOut, iso, lerp, span, type Point3 } from './iso'
import { ROUTE_BACK_POINTS, SPOTS } from './scenery'

// Línea de tiempo del recorrido: t va de 0 a 12 y cada unidad es una escena.
// Todo es función pura de t, así que subir y bajar con el scroll reproduce exactamente lo mismo.
export const SCENE_COUNT = 12

export type Pose =
  | 'stand'
  | 'walkA'
  | 'walkB'
  | 'read'
  | 'reach'
  | 'carry'
  | 'carryA'
  | 'carryB'
  | 'pack'
  | 'place'
  | 'pullA'
  | 'pullB'
  | 'pull'

export type Hud = 'loc' | 'list' | 'pedido' | 'carrier' | 'asignado' | 'destino' | 'entregado' | 'devoluciones' | 'decisiones'

export type Figure = { x: number; y: number; pose: Pose; flip: boolean; vis: number }

export type State = {
  photo: number
  op: Figure
  courier: Figure
  pkg: { x: number; y: number; z: number; front: boolean; vis: number; closed: boolean; label: boolean; ring: number }
  loc: number
  pallet: { x: number; y: number; wrap: number; jack: number; vis: number }
  truck: { x: number; y: number; dir: 'x' | 'y' }
  route: number
  back: number
  door: number
  returns: number
  hud: Record<Hud, number>
}

const STRIDE = 7
const walkPose = (distance: number, carrying: boolean): Pose => {
  const odd = Math.floor(Math.abs(distance) / STRIDE) % 2 === 1
  if (carrying) return odd ? 'carryB' : 'carryA'
  return odd ? 'walkB' : 'walkA'
}

// Posición a lo largo de una polilínea, con k entre 0 y 1.
function along(points: readonly (readonly [number, number, number])[], k: number) {
  const lengths = points.slice(1).map((point, index) => Math.hypot(point[0] - points[index][0], point[1] - points[index][1]))
  const total = lengths.reduce((sum, value) => sum + value, 0)
  let left = clamp(k) * total
  for (let index = 0; index < lengths.length; index++) {
    if (left <= lengths[index] || index === lengths.length - 1) {
      const local = lengths[index] ? clamp(left / lengths[index]) : 0
      const [ax, ay] = points[index]
      const [bx, by] = points[index + 1]
      return { x: lerp(ax, bx, local), y: lerp(ay, by, local), segment: index }
    }
    left -= lengths[index]
  }
  return { x: points[0][0], y: points[0][1], segment: 0 }
}

const TRUCK_PATH = [
  [SPOTS.truckDock.x, SPOTS.truckDock.y, 0],
  [SPOTS.corner.x, SPOTS.corner.y, 0],
  [SPOTS.truckStop.x, SPOTS.truckStop.y, 0],
] as const

function operator(t: number): Figure {
  const y0 = SPOTS.aisleY
  // Entrada y aproximación a la estantería.
  if (t < 1.3) {
    const k = t < 1 ? span(t, 0.05, 0.95) : 1
    const x = t < 1 ? lerp(-40, 150, k) : lerp(150, 183, span(t, 1, 1.3))
    const moving = (t > 0.05 && t < 0.95) || (t > 1 && t < 1.3)
    return { x, y: y0, pose: moving ? walkPose(x, false) : 'stand', flip: false, vis: 1 }
  }
  if (t < 2.05) return { x: 183, y: y0, pose: 'read', flip: false, vis: 1 }
  if (t < 2.45) return { x: 183, y: y0, pose: 'reach', flip: false, vis: 1 }
  if (t < 3.05) return { x: 183, y: y0, pose: 'carry', flip: false, vis: 1 }
  // Traslado a la mesa de preparación.
  if (t < 3.85) {
    const k = ease(span(t, 3.05, 3.85))
    const x = lerp(183, 440, k)
    return { x, y: lerp(y0, 42, k), pose: walkPose(x, true), flip: false, vis: 1 }
  }
  if (t < 4.05) return { x: 440, y: 42, pose: 'carry', flip: false, vis: 1 }
  if (t < 5) return { x: 440, y: 42, pose: 'pack', flip: false, vis: 1 }
  if (t < 5.12) return { x: 440, y: 42, pose: 'carry', flip: false, vis: 1 }
  // Al palet.
  if (t < 5.5) {
    const x = lerp(440, 536, ease(span(t, 5.12, 5.5)))
    return { x, y: lerp(42, 44, span(t, 5.12, 5.5)), pose: walkPose(x, true), flip: false, vis: 1 }
  }
  if (t < 5.72) return { x: 536, y: 44, pose: 'place', flip: false, vis: 1 }
  if (t < 5.95) {
    const k = ease(span(t, 5.72, 5.95))
    return { x: lerp(536, 564, k), y: lerp(44, 28, k), pose: k > 0 && k < 1 ? walkPose(lerp(536, 564, k), false) : 'stand', flip: false, vis: 1 }
  }
  // Tira de la transpaleta hasta el muelle.
  if (t < 7) {
    const palletX = palletPosition(t).x
    const x = palletX + 36
    const moving = t > 6 && t < 6.8
    return { x, y: 28, pose: moving ? (walkPose(x, false) === 'walkA' ? 'pullA' : 'pullB') : 'pull', flip: false, vis: 1 }
  }
  const k = ease(span(t, 7, 7.3))
  const x = lerp(SPOTS.dockPallet.x + 36, 768, k)
  return { x, y: lerp(28, 84, k), pose: k > 0 && k < 1 ? walkPose(x + k * 40, false) : 'stand', flip: false, vis: 1 }
}

function palletPosition(t: number) {
  const toDock = easeInOut(span(t, 6, 6.8))
  const intoTruck = ease(span(t, 7.45, 7.9))
  return {
    x: lerp(lerp(SPOTS.pallet.x, SPOTS.dockPallet.x, toDock), 806, intoTruck),
    y: lerp(SPOTS.pallet.y, SPOTS.dockPallet.y, toDock),
  }
}

function truckPosition(t: number) {
  const position = along(TRUCK_PATH, easeInOut(span(t, 8.05, 9.85)))
  return { x: position.x, y: position.y, dir: position.segment === 0 ? ('x' as const) : ('y' as const) }
}

function courier(t: number): Figure {
  const from = { x: 1279, y: -482 }
  const to = { x: 1254, y: -438 }
  if (t < 10.1) return { x: from.x, y: from.y, pose: 'stand', flip: true, vis: 0 }
  const vis = span(t, 10.1, 10.2)
  if (t < 10.3) return { x: from.x, y: from.y, pose: 'carry', flip: true, vis }
  if (t < 10.6) {
    const k = ease(span(t, 10.3, 10.6))
    const x = lerp(from.x, to.x, k)
    return { x, y: lerp(from.y, to.y, k), pose: walkPose(x * 1.8, true), flip: true, vis }
  }
  if (t < 10.75) return { x: to.x, y: to.y, pose: 'place', flip: true, vis }
  const k = ease(span(t, 10.78, 11))
  const x = lerp(to.x, 1272, k)
  return {
    x,
    y: lerp(to.y, -470, k),
    pose: k > 0 && k < 1 ? walkPose(x * 1.8, false) : 'stand',
    flip: false,
    vis: 1 - span(t, 11.05, 11.2),
  }
}

function hands(figure: Figure): Point3 {
  // La caja va a la altura de la cintura, delante del cuerpo y hacia donde mira la persona.
  return figure.flip ? [figure.x - 3, figure.y + 3, 17] : [figure.x + 3, figure.y - 3, 17]
}

function mix(a: Point3, b: Point3, k: number): Point3 {
  return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)]
}

function packagePosition(t: number, op: Figure, pallet: { x: number; y: number }, carrier: Figure) {
  const shelf: Point3 = [SPOTS.shelfSlot.x, SPOTS.shelfSlot.y, SPOTS.shelfSlot.z]
  const tableSpot: Point3 = [SPOTS.table.x + 15, SPOTS.table.y + 3, 18]
  const onPallet: Point3 = [pallet.x + 7, pallet.y + 4, 17]
  const porch: Point3 = [1249, -446, 1.5]
  const held = hands(op)

  if (t < 2.3) return { at: shelf, front: false }
  if (t < 2.6) return { at: mix(shelf, held, ease(span(t, 2.3, 2.6))), front: t > 2.42 }
  if (t < 4) return { at: held, front: true }
  if (t < 4.2) return { at: mix(held, tableSpot, ease(span(t, 4, 4.2))), front: true }
  if (t < 5.02) return { at: tableSpot, front: false }
  if (t < 5.12) return { at: mix(tableSpot, held, ease(span(t, 5.02, 5.12))), front: true }
  if (t < 5.5) return { at: held, front: true }
  if (t < 5.7) return { at: mix(held, onPallet, ease(span(t, 5.5, 5.7))), front: true }
  if (t < 10.1) return { at: onPallet, front: false }
  const courierHands = hands(carrier)
  if (t < 10.62) return { at: courierHands, front: true }
  if (t < 10.75) return { at: mix(courierHands, porch, ease(span(t, 10.62, 10.75))), front: true }
  if (t < 11.15) return { at: porch, front: false }
  const back = along(ROUTE_BACK_POINTS, easeInOut(span(t, 11.15, 11.8)))
  if (t < 11.8) return { at: [back.x, back.y, 1.5] as Point3, front: false }
  return { at: [SPOTS.returns.x + 6, SPOTS.returns.y + 2, 18] as Point3, front: false }
}

const fade = (t: number, inFrom: number, inTo: number, outFrom = Infinity, outTo = Infinity) =>
  span(t, inFrom, inTo) * (1 - span(t, outFrom, outTo))

export function stateAt(rawT: number): State {
  const t = clamp(rawT, 0, SCENE_COUNT)
  const op = operator(t)
  const pallet = palletPosition(t)
  const carrier = courier(t)
  const pkg = packagePosition(t, op, pallet, carrier)
  const inTruck = t >= 7.9 && t < 10.1

  return {
    photo: 1 - span(t, 0.04, 0.42),
    op,
    courier: carrier,
    pkg: {
      x: pkg.at[0],
      y: pkg.at[1],
      z: pkg.at[2],
      front: pkg.front,
      vis: inTruck ? 0 : 1,
      closed: t >= 4.5,
      label: t >= 4.72,
      ring: fade(t, 11.1, 11.2, 11.85, 11.95),
    },
    loc: fade(t, 1.4, 1.65, 2.55, 2.8),
    pallet: { x: pallet.x, y: pallet.y, wrap: span(t, 5.75, 6), jack: span(t, 5.9, 6), vis: t < 7.92 ? 1 : 0 },
    truck: truckPosition(t),
    route: span(t, 9, 9.6) * (1 - 0.6 * span(t, 11, 11.2)),
    back: span(t, 11.05, 11.65),
    door: span(t, 10.78, 10.9),
    returns: span(t, 11.6, 11.75),
    hud: {
      loc: fade(t, 1.4, 1.6, 2.55, 2.75),
      list: fade(t, 1.35, 1.5, 2, 2.12),
      pedido: fade(t, 3.1, 3.3, 5.85, 6.05),
      carrier: fade(t, 7.05, 7.3, 8.2, 8.4),
      asignado: fade(t, 7.3, 7.5, 8.95, 9.1),
      destino: fade(t, 9.2, 9.4, 10.7, 10.85),
      entregado: fade(t, 10.8, 10.95, 11.1, 11.25),
      devoluciones: span(t, 11.6, 11.75),
      decisiones: span(t, 11.62, 11.85),
    },
  }
}

// ---------- Cámara ----------

export type Camera = { x: number; y: number; zoom: number; tilt: number }

type Shot = { focus: (state: State) => Point3; zoom: number; tilt: number }

const fixed = (x: number, y: number, z: number) => () => [x, y, z] as Point3

// Un plano por escena. El zoom es relativo al tamaño del escenario (ver frame en OperationJourney).
const SHOTS: Shot[] = [
  { focus: (s) => [s.op.x + 24, s.op.y - 10, 22], zoom: 2.9, tilt: 7 },
  { focus: fixed(186, 24, 30), zoom: 3.3, tilt: 3 },
  { focus: fixed(186, 24, 26), zoom: 3.6, tilt: 2 },
  { focus: (s) => [s.op.x + 30, s.op.y - 12, 16], zoom: 2.6, tilt: 4 },
  { focus: fixed(450, 28, 16), zoom: 3.6, tilt: 2 },
  { focus: fixed(500, 28, 14), zoom: 2.6, tilt: 4 },
  { focus: (s) => [s.pallet.x + 40, 34, 12], zoom: 2.1, tilt: 5 },
  { focus: fixed(796, 44, 22), zoom: 1.8, tilt: 3 },
  { focus: (s) => [s.truck.x, s.truck.y, 10], zoom: 1.35, tilt: 6 },
  { focus: fixed(1090, -190, 0), zoom: 0.62, tilt: 0 },
  { focus: fixed(1266, -466, 14), zoom: 2.2, tilt: 3 },
  { focus: fixed(660, -300, 0), zoom: 0.5, tilt: 0 },
]

// En móvil, seis capítulos con un plano fijo cada uno y cortes entre ellos.
export const CHAPTERS: readonly (readonly [number, number])[] = [
  [0, 3],
  [3, 6],
  [6, 8],
  [8, 10],
  [10, 11],
  [11, 12],
]

const CHAPTER_SHOTS: { focus: Point3; zoom: number }[] = [
  { focus: [176, 24, 28], zoom: 3 },
  { focus: [480, 30, 14], zoom: 2.6 },
  { focus: [770, 44, 18], zoom: 2 },
  { focus: [1130, -230, 0], zoom: 0.56 },
  { focus: [1266, -466, 14], zoom: 2.4 },
  { focus: [800, -110, 0], zoom: 0.66 },
]

export function chapterOf(t: number) {
  const index = CHAPTERS.findIndex(([from, to]) => t >= from && t < to)
  return index === -1 ? CHAPTERS.length - 1 : index
}

function shotCamera(shot: Shot, state: State, drift: number): Camera {
  const [x, y, z] = shot.focus(state)
  const [sx, sy] = iso(x, y, z)
  // Un leve acercamiento dentro de cada escena da sensación de travelling.
  return { x: sx, y: sy, zoom: shot.zoom * (1 + 0.04 * drift), tilt: shot.tilt }
}

export function cameraAt(rawT: number, state: State, mode: 'continuous' | 'chapters'): Camera {
  const t = clamp(rawT, 0, SCENE_COUNT - 0.001)
  if (mode === 'chapters') {
    const shot = CHAPTER_SHOTS[chapterOf(t)]
    const [sx, sy] = iso(...shot.focus)
    return { x: sx, y: sy, zoom: shot.zoom, tilt: 0 }
  }
  const index = Math.floor(t)
  const local = t - index
  const current = shotCamera(SHOTS[index], state, local)
  if (index === 0) {
    // Arranque: de la foto real al gemelo digital, la cámara baja la inclinación y se acerca.
    const intro = ease(span(t, 0, 0.5))
    return { ...current, zoom: current.zoom * lerp(0.82, 1, intro), tilt: lerp(14, current.tilt, intro) }
  }
  const previous = shotCamera(SHOTS[index - 1], state, 1)
  const k = easeInOut(span(local, 0, 0.42))
  // El zoom se interpola en escala logarítmica para que alejarse y acercarse se sientan iguales.
  return {
    x: lerp(previous.x, current.x, k),
    y: lerp(previous.y, current.y, k),
    zoom: Math.exp(lerp(Math.log(previous.zoom), Math.log(current.zoom), k)),
    tilt: lerp(previous.tilt, current.tilt, k),
  }
}
