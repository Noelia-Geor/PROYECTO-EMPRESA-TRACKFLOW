import { ArrowDownToLine, Box, House, RotateCcw, Truck, Warehouse } from 'lucide-react'
import warehousePhoto from '../assets/almacen.jpg'
import { siteContent } from '../content/site'
import { Button } from './Button'

const stepIcons = [Box, Warehouse, ArrowDownToLine, Truck, House]

export function Hero() {
  const { hero } = siteContent
  const titleSplit = hero.title.lastIndexOf(' a la ')
  const mainSteps = hero.journey.slice(0, 5)
  const returnStep = hero.journey[5]

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden px-5 pb-20 pt-36 sm:px-8 md:pb-24 md:pt-44"
      aria-labelledby="hero-title"
    >
      <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={warehousePhoto} alt="" aria-hidden="true" width={1920} height={1280} fetchPriority="high" />
      {/* Velo: más denso a la izquierda (texto) y fundido suave con el fondo por abajo. */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-noche via-noche/90 to-noche/45" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-noche/40 via-transparent to-noche" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] xl:gap-20">
        <div>
          <p className="mb-7 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.08em] text-crema/80">
            <span className="h-1.5 w-1.5 rounded-full bg-senal" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[1.02] font-extrabold text-balance text-crema sm:text-6xl xl:text-[4.4rem]"
          >
            {hero.title.slice(0, titleSplit + 5)}
            <span className="text-senal">{hero.title.slice(titleSplit + 5)}</span>
          </h1>
          <p className="mt-7 max-w-[35rem] text-lg leading-8 text-crema/80">{hero.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#como-trabajamos">{hero.action}</Button>
            <Button href="#servicios" variant="quiet">
              Ver servicios
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-md justify-self-center rounded-2xl border border-white/10 bg-noche/55 p-6 backdrop-blur-md sm:p-8 lg:justify-self-end">
          <p className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-niebla">Recorrido de un pedido</p>
          <ol className="relative" aria-label="Recorrido de un pedido en TrackFlow">
            <span className="absolute bottom-6 left-[15px] top-4 w-px bg-white/15" aria-hidden="true" />
            {mainSteps.map((step, index) => {
              const Icon = stepIcons[index]
              const isLast = index === mainSteps.length - 1
              return (
                <li
                  key={step.title}
                  className="hero-step relative flex items-start gap-4 pb-5 last:pb-0"
                  style={{ animationDelay: `${200 + index * 160}ms` }}
                >
                  <span
                    className={`relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border ${
                      isLast ? 'border-senal bg-senal text-tinta' : 'border-white/25 bg-noche text-crema'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon size={15} strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 pt-0.5">
                    <span className="block font-display text-[1.02rem] font-bold text-crema">{step.title}</span>
                    <span className="mt-0.5 block font-mono text-xs text-niebla">{step.subtitle}</span>
                  </span>
                </li>
              )
            })}
          </ol>
          <div
            className="hero-step mt-5 flex items-start gap-4 border-t border-dashed border-senal/40 pt-5"
            style={{ animationDelay: '1100ms' }}
          >
            <span
              className="flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border border-senal/70 text-senal"
              aria-hidden="true"
            >
              <RotateCcw size={15} strokeWidth={1.9} />
            </span>
            <span className="pt-0.5">
              <span className="block font-display text-[1.02rem] font-bold text-crema">{returnStep.title}</span>
              <span className="mt-0.5 block font-mono text-xs text-niebla">{returnStep.subtitle}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
