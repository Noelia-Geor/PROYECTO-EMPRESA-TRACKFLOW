import { siteContent } from '../content/site'
import warehousePhoto from '../assets/almacen.jpg'
import { Button } from './Button'
import {
  ArrowDownToLine,
  Box,
  Check,
  House,
  RotateCcw,
  Truck,
  Warehouse,
} from 'lucide-react'

const journeyIcons = [Box, Warehouse, ArrowDownToLine, Truck, House, RotateCcw]

export function Hero() {
  const { hero } = siteContent
  const titleSplit = hero.title.lastIndexOf(' a la ')
  const journey = hero.journey

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-noche px-5 pb-28 pt-32 text-white sm:px-8 sm:pb-32"
      aria-labelledby="hero-title"
    >
      <img
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={warehousePhoto}
        alt=""
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-r from-noche via-noche/90 to-noche/35"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-noche/20" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-2xl">
          <p className="mb-7 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs text-white backdrop-blur-md sm:text-sm">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[1.03] font-extrabold text-white sm:text-6xl lg:text-7xl"
          >
            {hero.title.slice(0, titleSplit + 5)}
            <span className="text-senal">{hero.title.slice(titleSplit + 5)}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
            {hero.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#contacto">Habla con nuestro equipo →</Button>
            <Button href="#servicios" variant="outline">Ver servicios</Button>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
            viewBox="0 0 620 400"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <marker id="route-arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <path d="M0 0 6 3.5 0 7" fill="none" stroke="#ff6a1a" strokeWidth="1.5" />
              </marker>
            </defs>
            <path d="M303 56H318M470 112V144M318 200H303M151 256V288M303 344H318" stroke="white" strokeOpacity=".7" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" markerEnd="url(#route-arrow)" />
          </svg>
          {journey.map((step, index) => {
            const Icon = journeyIcons[index]
            const isReturn = index === journey.length - 1

            return (
              <article
                key={step.title}
                className={`journey-card relative z-10 flex min-h-24 items-center gap-3 border bg-noche/75 p-4 shadow-xl backdrop-blur-xl sm:min-h-28 sm:gap-4 sm:p-5 ${
                  isReturn ? 'border-senal/80' : 'border-white/15'
                } ${index === 2 ? 'sm:col-start-2 sm:row-start-2' : ''} ${index === 3 ? 'sm:col-start-1 sm:row-start-2' : ''}`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center border ${
                    isReturn ? 'border-senal/50 bg-senal/10 text-senal' : 'border-white/10 bg-white/10 text-white'
                  }`}
                  aria-hidden="true"
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-xs font-medium text-white sm:text-sm">
                    {step.title}
                  </span>
                  <span className="mt-1 block font-mono text-[0.65rem] leading-4 text-white/65 sm:text-xs">
                    {step.subtitle}
                  </span>
                </span>
                {index === 4 && <Check className="ml-auto text-senal" size={17} aria-hidden="true" />}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
