import { useEffect, useRef, useState } from 'react'

type Location = {
  city: string
  country: string
  role: string
}

type RouteMapProps = {
  locations: readonly Location[]
}

const ROUTE = 'M60 170 C 330 20, 670 20, 940 150'

// Esquema (no a escala) de la conexión entre los dos almacenes. La ruta se dibuja mientras bajas
// y el nodo de destino se enciende al llegar.
export function RouteMap({ locations }: RouteMapProps) {
  const [origin, destination] = locations
  const ref = useRef<HTMLDivElement>(null)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const update = () => {
      frame = 0
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const vh = window.innerHeight
      setProgress(Math.min(1, Math.max(0, (vh * 0.9 - rect.top) / (vh * 0.55))))
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

  const arrived = progress >= 0.98

  return (
    <div ref={ref}>
      <svg className="block h-auto w-full" viewBox="0 0 1000 220" role="img" aria-label={`Ruta entre ${origin.city} y ${destination.city}`}>
        <path d={ROUTE} fill="none" stroke="#f3f1ec" strokeOpacity="0.16" strokeWidth="1.25" strokeDasharray="2 7" strokeLinecap="round" />
        <path
          d={ROUTE}
          fill="none"
          stroke="#ff6a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          strokeDashoffset={1 - progress}
        />
        <circle cx="60" cy="170" r="5" fill="#ff6a1a" />
        <circle
          cx="940"
          cy="150"
          r="7"
          fill={arrived ? '#ff6a1a' : 'none'}
          fillOpacity={arrived ? 0.18 : 0}
          stroke={arrived ? '#ff6a1a' : '#f3f1ec'}
          strokeOpacity={arrived ? 1 : 0.4}
          strokeWidth="1.5"
          style={{ transition: 'all 400ms ease-out' }}
        />
        <circle cx="940" cy="150" r="2.2" fill={arrived ? '#ff6a1a' : '#f3f1ec'} fillOpacity={arrived ? 1 : 0.4} />
      </svg>

      <div className="mt-6 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-2">
        {[origin, destination].map((location, index) => (
          <article key={location.city} className={index === 1 ? 'md:text-right' : ''}>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-niebla">
              0{index + 1} · {location.country}
            </p>
            <h3 className="mt-3 font-display text-5xl leading-none font-extrabold text-crema md:text-6xl">{location.city}</h3>
            <p className="mt-4 font-mono text-sm text-crema/75">{location.role}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
