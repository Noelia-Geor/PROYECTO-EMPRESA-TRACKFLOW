import { useEffect, useRef, useState } from 'react'
import { RouteMark } from './RouteMark'

type ProcessStep = {
  title: string
  description: string
}

type ProcessStepsProps = {
  id: string
  eyebrow: string
  title: string
  description: string
  steps: readonly ProcessStep[]
}

// Recorrido guiado por el scroll: la sección se queda fija mientras bajas, la línea avanza
// y los pasos 01-04 aparecen uno a uno. Con movimiento reducido se muestra todo a la vez.
export function ProcessSteps({ id, eyebrow, title, description, steps }: ProcessStepsProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const update = () => {
      frame = 0
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const value = scrollable > 0 ? -rect.top / scrollable : 1
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

  const shown = reduced ? 1 : progress
  // Cada paso se activa en su tramo del recorrido; el último llega antes del final.
  const stepActive = (index: number) => shown >= (index + 0.4) / (steps.length + 0.4)
  const lineScale = Math.min(1, shown * 1.15)

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="px-5 sm:px-8">
      <div ref={trackRef} className={reduced ? '' : 'relative h-[230vh]'}>
        <div className={`${reduced ? 'py-24 md:py-32' : 'sticky top-0 pb-10 pt-24'}`}>
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-14 max-w-3xl md:mb-20">
              <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-niebla">
                <RouteMark className="text-niebla" />
                {eyebrow}
              </p>
              <h2
                id={`${id}-title`}
                className="font-display text-4xl leading-[1.06] font-extrabold text-balance text-crema md:text-[3.1rem]"
              >
                {title}
              </h2>
              <p className="mt-6 max-w-[38rem] text-base leading-7 text-niebla md:text-lg md:leading-8">{description}</p>
            </div>

            <div className="relative">
              <div className="absolute left-4 right-4 top-4 hidden h-0.5 md:block" aria-hidden="true">
                <span className="absolute inset-0 border-t-2 border-dashed border-white/15" />
                <span
                  className="absolute inset-0 origin-left bg-senal transition-transform duration-150 ease-out"
                  style={{ transform: `scaleX(${lineScale})` }}
                />
              </div>
              <div className="absolute bottom-4 left-4 top-4 w-0.5 md:hidden" aria-hidden="true">
                <span className="absolute inset-0 border-l-2 border-dashed border-white/15" />
                <span
                  className="absolute inset-0 origin-top bg-senal transition-transform duration-150 ease-out"
                  style={{ transform: `scaleY(${lineScale})` }}
                />
              </div>

              <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
                {steps.map((step, index) => {
                  const active = stepActive(index)
                  return (
                    <li
                      key={step.title}
                      className={`relative pl-14 transition-all duration-500 ease-out md:pl-0 ${
                        active ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-25'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-xs font-medium transition-colors duration-300 md:relative ${
                          active ? 'border-senal bg-senal text-tinta' : 'border-white/25 bg-noche text-niebla'
                        }`}
                      >
                        0{index + 1}
                      </span>
                      <h3 className="font-display text-[1.35rem] leading-tight font-bold text-crema md:mt-8">{step.title}</h3>
                      <p className="mt-3 max-w-[30ch] text-[0.95rem] leading-7 text-niebla">{step.description}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
