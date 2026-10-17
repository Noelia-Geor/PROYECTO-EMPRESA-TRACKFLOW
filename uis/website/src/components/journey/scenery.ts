import { box, COS, iso, line, onFaceX, onFaceY, plane, poly, shadow, SIN, type Face, type Shade } from './iso'

// Geometría fija del gemelo digital: almacén (pasillo, preparación, palets, devoluciones),
// muelle, carretera y barrio de entrega. Se calcula una vez; las piezas que se mueven están en World.tsx.
// Iluminación común a todo el recorrido: luz cenital en la nave, farolas en la calle y la misma dirección de sombra.

export const MAT = {
  rack: { top: '#4a78a0', left: '#2f5a80', right: '#1e3f5e' },
  beam: { top: '#6f8797', left: '#506a7b', right: '#3a5262' },
  deck: { top: '#2a4757', left: '#203947', right: '#192e3a' },
  kraft: { top: '#d8cfbe', left: '#b3a994', right: '#8b836f' },
  kraftDark: { top: '#c2b8a3', left: '#9f9681', right: '#7c7563' },
  tote: { top: '#5d7a8c', left: '#46606f', right: '#354b58' },
  table: { top: '#36576a', left: '#264152', right: '#1c3241' },
  steel: { top: '#5a7282', left: '#425a69', right: '#31444f' },
  dark: { top: '#21374a', left: '#182b37', right: '#11202a' },
  pallet: { top: '#9a8668', left: '#7a6a52', right: '#5d513f' },
  wall: { top: '#1d3644', left: '#152b37', right: '#10222c' },
  building: { top: '#223e50', left: '#1a3141', right: '#132633' },
  house: { top: '#26435a', left: '#1d364a', right: '#162b3b' },
  roof: { top: '#31516a', left: '#31516a', right: '#243f52' },
  truck: { top: '#f2f4f5', left: '#d9e0e4', right: '#b5c1c8' },
  cab: { top: '#e6ebee', left: '#cbd4da', right: '#a9b6be' },
  car: { top: '#3b5566', left: '#2c4352', right: '#21343f' },
  pkg: { top: '#ffa266', left: '#ff6a1a', right: '#d24f0b' },
} satisfies Record<string, Shade>

export const COLORS = {
  floor: 'url(#jw-floor)',
  asphalt: '#0f1e27',
  sidewalk: '#18303d',
  grass: 'url(#jw-grass)',
}

// Puntos clave del recorrido, compartidos con la línea de tiempo.
export const SPOTS = {
  aisleY: 46,
  shelfSlot: { x: 179, y: 7, z: 37.3 },
  table: { x: 432, y: 18 },
  pallet: { x: 528, y: 20 },
  dockPallet: { x: 742, y: 28 },
  truckDock: { x: 833, y: 43 },
  corner: { x: 1295, y: 43 },
  door: { x: 1246, y: -440 },
  truckStop: { x: 1295, y: -522 },
  returns: { x: 650, y: 112 },
}

// Recorrido de ida (muelle → puerta) y de vuelta (puerta → zona de devoluciones), a ras de suelo.
export const ROUTE_OUT = line([
  [796, 43, 0.5],
  [1295, 43, 0.5],
  [1295, -440, 0.5],
  [1250, -440, 0.5],
])
export const ROUTE_BACK_POINTS = [
  [1246, -434, 0.5],
  [1286, -434, 0.5],
  [1286, 52, 0.5],
  [800, 52, 0.5],
  [700, 100, 0.5],
  [662, 118, 0.5],
] as const
export const ROUTE_BACK = line(ROUTE_BACK_POINTS)

export type WorldObject = { depth: number; faces: Face[]; bbox?: [number, number, number, number] }

// Caja envolvente en coordenadas de pantalla (sin cámara): permite ocultar lo que queda fuera del encuadre.
function withBounds(objects: WorldObject[]) {
  for (const object of objects) {
    if (object.depth === -Infinity) continue
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const face of object.faces) {
      for (const pair of face.points.split(' ')) {
        const [x, y] = pair.split(',').map(Number)
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
    object.bbox = [minX, minY, maxX, maxY]
  }
  return objects
}

// Rótulos pintados en una pared (+y) o en el suelo, con la matriz de su plano isométrico.
export type Label = { text: string; transform: string; size: number; className: string }

export type Zone = {
  id: 'almacen' | 'exterior'
  bounds: [number, number, number, number]
  objects: WorldObject[]
  lines: string
  ghost: string
  labels: Label[]
}

// Generador pseudoaleatorio con semilla: el almacén sale siempre igual.
function seeded(seed: number) {
  let value = seed
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296
    return value / 4294967296
  }
}

// Elipse en el suelo (charco de luz) como polígono.
function ellipse(cx: number, cy: number, r: number, z = 0.3) {
  const points: [number, number, number][] = []
  for (let step = 0; step < 20; step++) {
    const angle = (step / 20) * Math.PI * 2
    points.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, z])
  }
  return poly(points)
}

const wallLabel = (x: number, y: number, z: number) => {
  const [e, f] = iso(x, y, z)
  return `matrix(${COS.toFixed(4)} ${SIN} 0 1 ${e.toFixed(1)} ${f.toFixed(1)})`
}
const floorLabel = (x: number, y: number) => {
  const [e, f] = iso(x, y, 0.3)
  return `matrix(${COS.toFixed(4)} ${SIN} ${(-COS).toFixed(4)} ${SIN} ${e.toFixed(1)} ${f.toFixed(1)})`
}

// Caja de cartón con precinto y, a veces, etiqueta en la cara visible.
function carton(x: number, y: number, z: number, w: number, d: number, h: number, shade: Shade, labelled: boolean): Face[] {
  const faces = box(x, y, z, w, d, h, shade)
  faces.push({ points: poly([[x, y + d / 2 - 0.8, z + h], [x + w, y + d / 2 - 0.8, z + h], [x + w, y + d / 2 + 0.8, z + h], [x, y + d / 2 + 0.8, z + h]]), fill: '#e9dfcb', opacity: 0.55 })
  if (labelled && w > 9 && h > 6) faces.push(onFaceY(y + d, x + 2, x + 6, z + 2, z + 5, '#f4f1ea', 0.9))
  return faces
}

const LEVELS = [0, 18, 36, 54]
const BAY_W = 54
const BAY_D = 22
const RACK_H = 74

// Un módulo de estantería, de atrás hacia delante: postes traseros, niveles con carga y postes delanteros.
function rackBay(x0: number, y0: number, seed: number, skip?: { level: number; from: number; to: number }) {
  const random = seeded(seed)
  const faces: Face[] = [shadow(x0, y0, BAY_W, BAY_D, 20, 0.35)]
  faces.push(...box(x0, y0, 0, 2, 2, RACK_H, MAT.rack), ...box(x0 + BAY_W - 2, y0, 0, 2, 2, RACK_H, MAT.rack))
  for (const level of LEVELS) {
    if (level > 0) {
      faces.push(...box(x0, y0, level - 2.5, BAY_W, 1.6, 2.5, MAT.beam))
      faces.push(...box(x0 + 1, y0 + 1, level - 0.8, BAY_W - 2, BAY_D - 2, 0.8, MAT.deck))
    }
    let x = x0 + 3
    while (x < x0 + BAY_W - 10) {
      const w = 11 + Math.floor(random() * 8)
      const h = 7 + Math.floor(random() * 7)
      const d = 12 + Math.floor(random() * 6)
      const free = !skip || level !== skip.level || x + w < skip.from || x > skip.to
      if (x + w <= x0 + BAY_W - 3 && free) {
        const kind = random()
        const top = y0 + BAY_D - 3 - d
        if (kind > 0.82) faces.push(...box(x, top, level, w, d, Math.min(h, 8), MAT.tote))
        else faces.push(...carton(x, top, level, w, d, h, kind > 0.35 ? MAT.kraft : MAT.kraftDark, kind > 0.55))
      }
      x += w + 2 + Math.floor(random() * 4)
    }
    if (level > 0) {
      faces.push(...box(x0, y0 + BAY_D - 1.6, level - 2.5, BAY_W, 1.6, 2.5, MAT.beam))
      // Etiqueta de ubicación en el larguero delantero, como en cualquier estantería real.
      faces.push(onFaceY(y0 + BAY_D, x0 + 6, x0 + 12, level - 2.2, level - 0.4, '#e9edf0', 0.85))
    }
  }
  faces.push(...box(x0, y0 + BAY_D - 2, 0, 2, 2, RACK_H, MAT.rack), ...box(x0 + BAY_W - 2, y0 + BAY_D - 2, 0, 2, 2, RACK_H, MAT.rack))
  faces.push(...box(x0 - 0.5, y0 + BAY_D - 2.5, 0, 3, 3, 0.8, MAT.steel), ...box(x0 + BAY_W - 2.5, y0 + BAY_D - 2.5, 0, 3, 3, 0.8, MAT.steel))
  return faces
}

function table(x: number, y: number) {
  return [
    shadow(x, y, 40, 16, 10, 0.3),
    ...box(x + 1, y + 1, 0, 1.5, 1.5, 16, MAT.steel),
    ...box(x + 37.5, y + 1, 0, 1.5, 1.5, 16, MAT.steel),
    ...box(x + 1, y + 13.5, 0, 1.5, 1.5, 16, MAT.steel),
    ...box(x + 37.5, y + 13.5, 0, 1.5, 1.5, 16, MAT.steel),
    ...box(x + 1, y + 1, 5, 38, 14, 0.8, MAT.dark),
    ...box(x, y, 16, 40, 16, 2, MAT.table),
    onFaceY(y + 16, x, x + 40, 16, 16.6, '#7e98a8', 0.7),
  ]
}

// Palet de madera con tacos y tablas, y carga de cajas (sin la del pedido, que es un actor).
export function palletLoad(x: number, y: number, layers = 2, wrapped = false): Face[] {
  const faces: Face[] = [shadow(x, y, 24, 16, 6 + layers * 7, 0.34), ...box(x, y, 0, 24, 16, 3, MAT.pallet)]
  for (const gx of [x + 4, x + 14]) faces.push(onFaceY(y + 16, gx, gx + 6, 0.4, 2, '#3a3226'))
  for (const gy of [y + 3, y + 10]) faces.push(onFaceX(x + 24, gy, gy + 3, 0.4, 2, '#2c261d'))
  for (let layer = 0; layer < layers; layer++) {
    const z = 3 + layer * 7
    faces.push(
      ...carton(x + 0.5, y + 0.5, z, 11, 7, 7, layer % 2 ? MAT.kraftDark : MAT.kraft, false),
      ...carton(x + 12.5, y + 0.5, z, 11, 7, 7, layer % 2 ? MAT.kraft : MAT.kraftDark, false),
      ...carton(x + 0.5, y + 8.5, z, 11, 7, 7, MAT.kraft, layer === 0),
      ...carton(x + 12.5, y + 8.5, z, 11, 7, 7, MAT.kraftDark, layer === 1),
    )
  }
  if (wrapped) {
    for (const face of box(x, y, 3, 24, 16, layers * 7 + 0.4, { top: '#e8eef1', left: '#e8eef1', right: '#c9d5db' })) {
      faces.push({ ...face, opacity: 0.14 })
    }
  }
  return faces
}

function house(x: number, y: number, w: number, d: number, h: number, withDoor: boolean, litWindows: number[]): Face[] {
  const ridge = h + 16
  const faces: Face[] = [shadow(x, y, w, d, h + 8, 0.4), ...box(x, y, 0, w, d, h, MAT.house)]
  // Tejado a dos aguas con la cumbrera a lo largo de y.
  faces.push({ points: poly([[x, y, h], [x + w / 2, y, ridge], [x + w / 2, y + d, ridge], [x, y + d, h]]), fill: MAT.roof.top, kind: 'top' })
  faces.push({ points: poly([[x + w / 2, y, ridge], [x + w, y, h], [x + w, y + d, h], [x + w / 2, y + d, ridge]]), fill: MAT.roof.right, kind: 'right' })
  faces.push({ points: poly([[x, y + d, h], [x + w, y + d, h], [x + w / 2, y + d, ridge]]), fill: MAT.house.left, kind: 'left' })
  // Ventanas en la fachada que da a la calle (+x): algunas encendidas.
  ;[y + 6, y + d - 16].forEach((wy, index) => {
    const lit = litWindows.includes(index)
    faces.push(onFaceX(x + w, wy, wy + 10, 12, 20, lit ? '#ffcf8f' : '#2f5268', lit ? 0.92 : 1, lit ? 'glow' : undefined))
  })
  if (litWindows.includes(2)) faces.push(onFaceY(y + d, x + w / 2 - 5, x + w / 2 + 5, 14, 22, '#ffcf8f', 0.85, 'glow'))
  if (withDoor) {
    const dy = y + d / 2 - 6
    faces.push(onFaceX(x + w, dy, dy + 12, 0, 21, '#0b1a22'))
    faces.push(...box(x + w, dy - 3, 0, 6, 18, 1.5, MAT.steel))
    // Luz del porche.
    faces.push(onFaceX(x + w + 0.1, dy + 13.5, dy + 15.5, 18, 20.5, '#ffe2b0', 1, 'glow'))
  }
  return faces
}

function building(x: number, y: number, w: number, d: number, h: number, seed: number): Face[] {
  const random = seeded(seed)
  const faces = [shadow(x, y, w, d, h, 0.4), ...box(x, y, 0, w, d, h, MAT.building)]
  // Bandas de ventanas en las dos fachadas visibles, con tramos encendidos.
  for (let z = 10; z < h - 6; z += 12) {
    for (let wx = x + 4; wx < x + w - 10; wx += 12) {
      const lit = random() > 0.62
      faces.push(onFaceY(y + d, wx, wx + 8, z, z + 4, lit ? '#ffcf8f' : '#24465b', lit ? 0.8 : 1, lit ? 'glow' : undefined))
    }
    for (let wy = y + 4; wy < y + d - 10; wy += 12) {
      const lit = random() > 0.7
      faces.push(onFaceX(x + w, wy, wy + 8, z, z + 4, lit ? '#f5c27f' : '#1c3a4d', lit ? 0.7 : 1, lit ? 'glow' : undefined))
    }
  }
  // Remate de cubierta.
  faces.push(...box(x + w * 0.6, y + 6, h, 10, 8, 4, MAT.dark))
  return faces
}

function tree(x: number, y: number, r: number): Face[] {
  return [
    shadow(x - r * 0.6, y - r * 0.6, r * 1.2, r * 1.2, r * 2.6, 0.32),
    ...box(x - 1, y - 1, 0, 2, 2, 8, MAT.pallet),
    { points: poly([[x - r, y, 8], [x, y - r, 8], [x + r, y, 8], [x, y + r, 8], [x, y, 8 + r * 2.2]]), fill: '#24584f' },
    { points: poly([[x, y + r, 8], [x + r, y, 8], [x, y, 8 + r * 2.2]]), fill: '#1a4440' },
    { points: poly([[x - r, y, 8], [x, y + r, 8], [x, y, 8 + r * 2.2]]), fill: '#2c6559' },
  ]
}

function car(x: number, y: number, alongX: boolean): Face[] {
  const [w, d] = alongX ? [22, 11] : [11, 22]
  return [
    shadow(x, y, w, d, 8, 0.4),
    ...box(x, y, 1.5, w, d, 5, MAT.car),
    ...(alongX ? box(x + 5, y + 1, 6.5, 11, d - 2, 4, { top: '#2f4655', left: '#7fa0b3', right: '#5f8296' }) : box(x + 1, y + 5, 6.5, w - 2, 11, 4, { top: '#2f4655', left: '#7fa0b3', right: '#5f8296' })),
  ]
}

// Farola: poste, brazo y cabezal; la luz y su charco se pintan en sus capas.
function streetLamp(x: number, y: number): Face[] {
  return [shadow(x, y, 1.2, 1.2, 12, 0.3), ...box(x, y, 0, 1.2, 1.2, 36, MAT.steel), ...box(x - 5, y, 34, 6, 1.2, 1.2, MAT.steel), ...box(x - 7, y - 0.6, 33, 4, 2.4, 1.4, MAT.dark)]
}

// ---------- Luz ----------

export type Light = { cone: string; fixture: Face[]; pool: string; warm: boolean }

// Pantallas lineales colgadas del techo de la nave y farolas de la calle.
function ceilingLight(x: number, y: number, z = 104, r = 34): Light {
  const pool = ellipse(x, y + 6, r)
  const corners = [iso(x - 13, y, z), iso(x + 13, y, z)]
  const floorPoints = Array.from({ length: 20 }, (_, step) => {
    const angle = (step / 20) * Math.PI * 2
    return iso(x + Math.cos(angle) * r, y + 6 + Math.sin(angle) * r, 0)
  })
  const left = floorPoints.reduce((a, b) => (b[0] < a[0] ? b : a))
  const right = floorPoints.reduce((a, b) => (b[0] > a[0] ? b : a))
  const bottom = floorPoints.reduce((a, b) => (b[1] > a[1] ? b : a))
  const cone = [corners[0], corners[1], right, bottom, left].map(([sx, sy]) => `${sx.toFixed(1)},${sy.toFixed(1)}`).join(' ')
  const fixture: Face[] = [
    { points: poly([[x - 12, y - 0.4, z + 30], [x - 12, y + 0.4, z + 30], [x - 12, y + 0.4, z + 1], [x - 12, y - 0.4, z + 1]]), fill: '#4d6676', opacity: 0.7 },
    { points: poly([[x + 12, y - 0.4, z + 30], [x + 12, y + 0.4, z + 30], [x + 12, y + 0.4, z + 1], [x + 12, y - 0.4, z + 1]]), fill: '#4d6676', opacity: 0.7 },
    ...box(x - 13, y - 1.5, z, 26, 3, 1.4, { top: '#55707f', left: '#3c5462', right: '#2d414d' }),
    { points: poly([[x - 12.5, y - 1, z - 0.05], [x + 12.5, y - 1, z - 0.05], [x + 12.5, y + 1, z - 0.05], [x - 12.5, y + 1, z - 0.05]]), fill: '#f6f8f9', kind: 'glow' },
  ]
  return { cone, fixture, pool, warm: false }
}

function lampLight(x: number, y: number): Light {
  return {
    cone: '',
    fixture: [{ points: poly([[x - 6.5, y - 0.4, 32.9], [x - 3.5, y - 0.4, 32.9], [x - 3.5, y + 1.4, 32.9], [x - 6.5, y + 1.4, 32.9]]), fill: '#ffe2b0', kind: 'glow' }],
    pool: ellipse(x - 5, y + 2, 30),
    warm: true,
  }
}

const NAVE_LIGHTS = [
  ceilingLight(28, 52),
  ceilingLight(108, 52),
  ceilingLight(188, 52),
  ceilingLight(268, 52),
  ceilingLight(408, 36),
  ceilingLight(470, 36),
  ceilingLight(560, 30),
  ceilingLight(650, 30),
  ceilingLight(730, 44),
  ceilingLight(676, 122),
]

const LAMP_SPOTS: [number, number][] = [
  [960, 8],
  [1080, 8],
  [1200, 8],
  [1330, -100],
  [1330, -260],
  [1330, -420],
  [1330, -600],
]
const STREET_LIGHTS = LAMP_SPOTS.map(([x, y]) => lampLight(x, y))

export const LIGHTS = { nave: NAVE_LIGHTS, street: STREET_LIGHTS }

// ---------- Zonas ----------

function warehouse(): Zone {
  const objects: WorldObject[] = []
  const add = (x: number, y: number, faces: Face[]) => objects.push({ depth: x + y, faces })

  // Estanterías: fila trasera del pasillo, con el hueco del pedido en el módulo 4.
  for (let bay = 0; bay < 6; bay++) {
    const x0 = bay * BAY_W
    const skip = bay === 3 ? { level: 36, from: 175, to: 192 } : undefined
    add(x0 + 27, 11, rackBay(x0, 0, 11 + bay * 7, skip))
  }

  // Preparación: dos mesas con material de embalaje y una persona trabajando en la segunda.
  add(400, 26, table(380, 18))
  add(452, 26, table(SPOTS.table.x, SPOTS.table.y))
  add(388, 22, box(386, 21, 18, 7, 5, 4, MAT.dark))
  add(416, 22, carton(408, 20, 18, 10, 9, 7, MAT.kraft, true))
  add(458, 21, box(462, 20, 18, 6, 6, 5, MAT.dark))
  add(461, 22, box(463, 21, 23, 4, 4, 0.6, { top: '#e9edf0', left: '#c9d2d8', right: '#a9b5bd' }))
  add(486, 14, [shadow(484, 6, 22, 14, 6, 0.3), ...box(484, 6, 0, 22, 14, 2, MAT.kraftDark), ...box(484, 6, 2, 22, 14, 2, MAT.kraft), ...box(484, 6, 4, 22, 14, 2, MAT.kraftDark)])
  add(506, 10, [shadow(500, 4, 10, 10, 18, 0.3), ...box(500, 4, 0, 10, 10, 18, { top: '#7f97a5', left: '#647d8b', right: '#4d6472' })])

  // Zona de pedidos listos: palets ya cargados y retractilados detrás del carril de salida.
  add(580, 6, palletLoad(570, -2, 3, true))
  add(610, 6, palletLoad(600, -2, 2, true))
  add(640, 6, palletLoad(630, -2, 3, true))

  // Devoluciones: zona marcada, mesa de inspección y cajas devueltas.
  add(660, 118, table(640, 108))
  add(694, 128, carton(690, 124, 0, 12, 9, 8, MAT.kraftDark, true))
  add(706, 136, carton(700, 134, 0, 10, 8, 7, MAT.kraft, false))

  objects.sort((a, b) => a.depth - b.depth)

  // Suelo, paredes, marcas y charcos de luz. Las paredes traseras se dibujan antes que todo lo demás.
  const base: WorldObject = {
    depth: -Infinity,
    faces: [
      plane(-64, -34, 0, 858, 194, COLORS.floor),
      ...NAVE_LIGHTS.map((light) => ({ points: light.pool, fill: 'url(#jw-pool)' })),
      ...box(-64, -38, 0, 858, 4, 112, MAT.wall),
      onFaceY(-34, -64, 794, 0, 112, 'url(#jw-wall)'),
      onFaceY(-34, -64, 794, 84, 96, '#2a4a5c', 0.55),
      ...box(-68, -38, 0, 4, 198, 112, MAT.wall),
      plane(-60, 25, 0.2, 760, 1.6, '#c9a227', 0.32),
      plane(-60, 70, 0.2, 760, 1.6, '#c9a227', 0.32),
      plane(560, -6, 0.2, 100, 26, '#163847', 0.8),
      plane(632, 100, 0.2, 88, 44, '#163847', 0.75),
      // Muro del muelle detrás de la puerta (x = 790, a la derecha) y persiana enrollada sobre el hueco.
      ...box(790, -38, 0, 4, 54, 112, MAT.wall),
      ...box(790, 16, 74, 4, 48, 38, MAT.wall),
      ...box(788, 16, 68, 6, 48, 6, MAT.steel),
      // Burletes del muelle y banda de señalización en el borde.
      onFaceX(794.1, 13, 16, 0, 74, '#0a151b'),
      onFaceX(794.1, 64, 67, 0, 74, '#0a151b'),
      ...Array.from({ length: 8 }, (_, index) => plane(780, 16 + index * 6, 0.25, 10, 3, index % 2 ? '#14232c' : '#ff6a1a', index % 2 ? 1 : 0.75)),
    ],
  }
  objects.unshift(base)

  // Rejilla del suelo y paneles de pared: un solo path cada uno.
  const grid: string[] = []
  for (let x = -40; x < 790; x += 40) grid.push(line([[x, -34, 0.1], [x, 160, 0.1]]))
  for (let y = -20; y < 160; y += 40) grid.push(line([[-64, y, 0.1], [790, y, 0.1]]))
  for (let x = -40; x < 790; x += 60) grid.push(line([[x, -34, 0], [x, -34, 112]]))

  // Fantasma: lo que queda delante del pasillo (estanterías y muro delantero), solo en líneas.
  const ghost: string[] = []
  for (const y0 of [84, 124]) {
    for (let bay = 0; bay <= 6; bay++) {
      const x = bay * BAY_W
      ghost.push(line([[x, y0, 0], [x, y0, RACK_H]]), line([[x, y0 + BAY_D, 0], [x, y0 + BAY_D, RACK_H]]))
    }
    for (const z of [18, 36, 54, RACK_H]) {
      ghost.push(line([[0, y0, z], [6 * BAY_W, y0, z]]), line([[0, y0 + BAY_D, z], [6 * BAY_W, y0 + BAY_D, z]]))
    }
  }
  ghost.push(line([[794, 64, 0], [794, 160, 0], [794, 160, 112], [794, 64, 112], [794, 64, 0]]))
  ghost.push(line([[794, 16, 0], [794, 16, 74]]), line([[794, 64, 0], [794, 64, 74]]))
  ghost.push(line([[-64, 160, 0], [794, 160, 0]]))

  // Rótulos: la marca en la pared y las zonas pintadas en el suelo (nombres de zona, no datos).
  const labels: Label[] = [
    { text: 'TrackFlow', transform: wallLabel(470, -34, 70), size: 17, className: 'jw-sign' },
    { text: 'PREPARACIÓN', transform: floorLabel(384, 40), size: 6, className: 'jw-floor-label' },
    { text: 'LISTO PARA SALIR', transform: floorLabel(566, 22), size: 5, className: 'jw-floor-label' },
    { text: 'MUELLE', transform: floorLabel(748, 64), size: 6, className: 'jw-floor-label' },
    { text: 'DEVOLUCIONES', transform: floorLabel(636, 146), size: 5, className: 'jw-floor-label' },
  ]

  return { id: 'almacen', bounds: [-70, -40, 800, 165], objects: withBounds(objects), lines: grid.join(''), ghost: ghost.join(''), labels }
}

function outside(): Zone {
  const objects: WorldObject[] = []
  const add = (x: number, y: number, faces: Face[]) => objects.push({ depth: x + y, faces })

  // Edificios del polígono, al otro lado de la carretera de salida, y coches aparcados.
  add(970, -70, building(930, -130, 80, 100, 44, 3))
  add(1080, -70, building(1040, -120, 80, 90, 60, 5))
  add(1195, -75, building(1150, -140, 90, 110, 32, 9))
  add(985, -8, car(975, -16, true))
  add(1110, -10, car(1100, -18, true))
  for (const [x, y] of LAMP_SPOTS) add(x, y, streetLamp(x, y))

  // Barrio: casas a la izquierda de la calle; la del centro es el destino.
  const houses: [number, boolean, number[]][] = [
    [-200, true, [0]],
    [-320, false, [1, 2]],
    [-470, true, [0, 2]],
    [-590, false, []],
    [-710, true, [1]],
  ]
  for (const [y0, door, lit] of houses) add(1215, y0 + 30, house(1180, y0, 66, 60, 30, door, lit))
  for (const [x, y] of [[1262, -260], [1262, -380], [1262, -530], [1262, -650], [1160, -140], [1345, -330], [1345, -560]] as const) {
    add(x, y, tree(x, y, 7))
  }
  add(1390, -480, building(1350, -520, 60, 70, 20, 13))
  add(1395, -260, building(1355, -300, 60, 60, 16, 17))
  add(1375, -150, car(1345, -170, false))

  objects.sort((a, b) => a.depth - b.depth)

  objects.unshift({
    depth: -Infinity,
    faces: [
      plane(794, -150, 0, 620, 300, COLORS.grass),
      plane(1150, -780, 0, 260, 640, COLORS.grass),
      plane(794, -34, 0.1, 140, 150, COLORS.asphalt),
      plane(794, 18, 0.1, 526, 50, COLORS.asphalt),
      plane(1270, -780, 0.1, 50, 848, COLORS.asphalt),
      plane(1256, -780, 0.1, 14, 848, COLORS.sidewalk),
      plane(1320, -780, 0.1, 12, 848, COLORS.sidewalk),
      plane(934, 6, 0.1, 336, 12, COLORS.sidewalk),
      plane(934, 68, 0.1, 398, 12, COLORS.sidewalk),
      ...STREET_LIGHTS.map((light) => ({ points: light.pool, fill: 'url(#jw-pool-warm)' })),
      // Rampa niveladora y topes del muelle.
      plane(794, 18, 0.15, 8, 44, '#3d5463'),
      ...box(794, 16, 0, 3, 5, 8, MAT.dark),
      ...box(794, 59, 0, 3, 5, 8, MAT.dark),
      onFaceX(797, 17, 20, 3, 6, '#ff6a1a', 0.8),
      onFaceX(797, 60, 63, 3, 6, '#ff6a1a', 0.8),
    ],
  })

  // Marcas viales: eje discontinuo, bordillos y plazas del muelle.
  const marks: string[] = []
  for (let x = 950; x < 1260; x += 22) marks.push(line([[x, 43, 0.2], [x + 11, 43, 0.2]]))
  for (let y = 20; y > -770; y -= 22) marks.push(line([[1295, y, 0.2], [1295, y - 11, 0.2]]))
  for (const y of [14, 68]) marks.push(line([[796, y, 0.2], [900, y, 0.2]]))
  marks.push(line([[934, 18, 0.2], [1270, 18, 0.2]]), line([[934, 68, 0.2], [1320, 68, 0.2]]))
  marks.push(line([[1270, 18, 0.2], [1270, -780, 0.2]]), line([[1320, 68, 0.2], [1320, -780, 0.2]]))

  return { id: 'exterior', bounds: [790, -790, 1440, 160], objects: withBounds(objects), lines: marks.join(''), ghost: '', labels: [] }
}

export const ZONES: Zone[] = [warehouse(), outside()]
