import { siteContent } from '../content/site'

// Las cifras como paradas de una misma ruta: una línea punteada con un nodo sobre cada dato.
export function StatStrip() {
  return (
    <section className="px-5 sm:px-8" aria-label={siteContent.accessibility.stats}>
      <div className="relative mx-auto max-w-7xl pb-12 pt-4" data-reveal>
        <span className="absolute left-0 right-0 top-[1.3rem] hidden border-t border-dashed border-white/20 md:block" aria-hidden="true" />
        <dl className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {siteContent.stats.map((stat, index) => (
            <div key={stat.label} className="pr-4">
              <span
                className={`mb-6 hidden h-3 w-3 rounded-full md:block ${
                  index === 0 ? 'bg-senal' : index === siteContent.stats.length - 1 ? 'border-2 border-senal bg-noche' : 'border border-white/40 bg-noche'
                }`}
                aria-hidden="true"
              />
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-niebla">{stat.label}</dt>
              <dd className="mt-2 font-display text-4xl leading-none font-extrabold text-crema tabular-nums md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
