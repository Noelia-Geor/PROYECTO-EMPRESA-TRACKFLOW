import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RouteMark } from './RouteMark'
import { DESTINATION, FLIGHT, LAND, MAP_HEIGHT, MAP_WIDTH, ORIGIN } from '../content/worldMap'

type Location = {
  city: string
  country: string
  role: string
}

type RouteMapProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  locations: readonly Location[]
}

// Avión visto desde arriba, apuntando a la derecha y centrado en (0, 0).
const PLANE =
  'M11 0 L-1 -1.7 L-4.5 -9 L-7 -9 L-5 -1.7 L-9.5 -1.5 L-11.5 -4.5 L-13 -4.5 L-12 0 L-13 4.5 L-11.5 4.5 L-9.5 1.5 L-5 1.7 L-7 9 L-4.5 9 L-1 1.7 Z'

// Mapa de la conexión entre los dos almacenes. Al bajar, un avión vuela de Los Ángeles a Zaragoza
// siguiendo el scroll (si subes, vuelve) y el destino se enciende al aterrizar.
export function RouteMap({ id, eyebrow, title, description, locations }: RouteMapProps) {
  const [origin, destination] = locations
  const ref = useRef<HTMLDivElement>(null)
  const routeRef = useRef<SVGPathElement>(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [progress, setProgress] = useState(reduced ? 1 : 0)
  const [plane, setPlane] = useState({ x: ORIGIN.x, y: ORIGIN.y, angle: 0 })

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      // El mapa se queda fijo mientras bajas; el avión aterriza al 80 % del recorrido y el resto es una pausa.
      const value = scrollable > 0 ? -rect.top / (scrollable * 0.8) : 1
      setProgress(Math.min(1, Math.max(0, value)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  useLayoutEffect(() => {
    const route = routeRef.current
    if (!route) return
    const length = route.getTotalLength()
    const at = Math.min(length - 0.5, progress * length)
    const point = route.getPointAtLength(at)
    const ahead = route.getPointAtLength(at + 0.5)
    const angle = (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI
    setPlane({ x: point.x, y: point.y, angle })
  }, [progress])

  const arrived = progress >= 0.985

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div ref={ref} className={reduced ? 'pt-24 md:pt-32' : 'relative h-[200vh]'}>
          {/* Título y mapa se quedan fijos juntos mientras el avión cruza. */}
          <div className={reduced ? '' : 'sticky top-0 flex h-svh flex-col pt-24'}>
            <div className="relative z-10 lg:flex lg:items-start lg:justify-between lg:gap-10">
              <div className="max-w-3xl">
                <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-niebla">
                  <RouteMark className="text-niebla" />
                  {eyebrow}
                </p>
                <h2
                  id={`${id}-title`}
                  className="font-display text-4xl leading-[1.06] font-extrabold text-balance text-crema md:text-[3.1rem]"
                >
                  {title}
                </h2>
                <p className="mt-4 max-w-[38rem] text-base leading-7 text-niebla md:text-lg md:leading-8">{description}</p>
              </div>
              {/* Leyenda: los dos almacenes. El margen derecho la alinea con Zaragoza, dentro del mapa. */}
              <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-5 lg:mt-1 lg:mr-[17%] lg:flex-col">
                {[origin, destination].map((location, index) => {
                  const lit = index === 0 || arrived
                  return (
                    <li key={location.city} className="flex gap-3">
                      <span
                        className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-500 ${
                          lit ? 'border-senal bg-senal' : 'border-crema/50 bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-niebla">
                          0{index + 1} · {location.country}
                        </p>
                        <p className="mt-1 font-display text-xl leading-tight font-bold text-crema">{location.city}</p>
                        <p className="mt-0.5 text-sm whitespace-nowrap text-niebla">{location.role}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="lg:-mt-6">
              {/* Dos máscaras para que el mapa se funda con el fondo por los cuatro lados. */}
              <div className="w-full [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
                <div className="[mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_86%,transparent)]">
                  <svg
                    className="mx-auto block h-auto max-h-[calc(100svh-16rem)] w-full"
                    viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                    role="img"
                    aria-label={`Mapa con la ruta entre ${origin.city} y ${destination.city}`}
                  >
                    <path d={LAND} fill="#f3f1ec" fillOpacity="0.055" stroke="#f3f1ec" strokeOpacity="0.14" strokeWidth="0.6" />

                    <path
                      d={FLIGHT}
                      fill="none"
                      stroke="#f3f1ec"
                      strokeOpacity="0.22"
                      strokeWidth="1.25"
                      strokeDasharray="2 6"
                      strokeLinecap="round"
                    />
                    <path
                      ref={routeRef}
                      d={FLIGHT}
                      fill="none"
                      stroke="#ff6a1a"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1 1"
                      strokeDashoffset={1 - progress}
                    />

                    <circle cx={ORIGIN.x} cy={ORIGIN.y} r="5" fill="#ff6a1a" />
                    <circle cx={ORIGIN.x} cy={ORIGIN.y} r="11" fill="none" stroke="#ff6a1a" strokeOpacity="0.35" />

                    <circle
                      cx={DESTINATION.x}
                      cy={DESTINATION.y}
                      r={arrived ? 16 : 8}
                      fill="#ff6a1a"
                      fillOpacity={arrived ? 0.14 : 0}
                      stroke={arrived ? '#ff6a1a' : '#f3f1ec'}
                      strokeOpacity={arrived ? 0.6 : 0.4}
                      strokeWidth="1.25"
                      style={{ transition: 'all 500ms ease-out' }}
                    />
                    <circle
                      cx={DESTINATION.x}
                      cy={DESTINATION.y}
                      r="4.5"
                      fill={arrived ? '#ff6a1a' : '#f3f1ec'}
                      fillOpacity={arrived ? 1 : 0.45}
                      style={{ transition: 'all 500ms ease-out' }}
                    />

                    {/* En pantallas pequeñas el mapa se encoge, así que las etiquetas crecen para seguir leyéndose. */}
                    <g
                      className="font-mono text-[34px] sm:text-[22px] md:text-[16px] lg:text-[13px]"
                      letterSpacing="1.3"
                      fill="#f3f1ec"
                    >
                      <text x={ORIGIN.x + 14} y={ORIGIN.y} dy="2.2em" fillOpacity="0.75">
                        {origin.city.toUpperCase()}
                      </text>
                      <text
                        x={DESTINATION.x}
                        y={DESTINATION.y}
                        dy="2.8em"
                        textAnchor="middle"
                        fill={arrived ? '#ff6a1a' : '#f3f1ec'}
                        fillOpacity={arrived ? 1 : 0.6}
                        style={{ transition: 'all 500ms ease-out' }}
                      >
                        {destination.city.toUpperCase()}
                      </text>
                    </g>

                    {!reduced ? (
                      <path
                        d={PLANE}
                        fill="#f3f1ec"
                        transform={`translate(${plane.x} ${plane.y}) rotate(${plane.angle}) scale(1.15)`}
                        style={{ opacity: arrived ? 0 : 1, transition: 'opacity 300ms ease-out' }}
                      />
                    ) : null}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
