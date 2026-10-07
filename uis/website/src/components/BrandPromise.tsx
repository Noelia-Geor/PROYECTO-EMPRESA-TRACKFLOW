import { siteContent } from '../content/site'
import { RouteMark } from './RouteMark'

export function BrandPromise() {
  const { promise } = siteContent

  return (
    <section className="px-3 pb-4 pt-24 sm:px-5 md:pt-32" aria-labelledby="promesa-title">
      <div className="mx-auto max-w-[86rem] rounded-[2rem] bg-crema px-6 py-16 text-tinta sm:px-12 md:py-24 lg:px-20">
        <div data-reveal>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-tinta/60">
            <RouteMark className="text-tinta/50" />
            {promise.eyebrow}
          </p>
          <h2
            id="promesa-title"
            className="max-w-3xl font-display text-4xl leading-[1.06] font-extrabold text-balance text-noche md:text-[3.1rem]"
          >
            {promise.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[0.8fr_auto_1.2fr] lg:gap-10" data-reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-tinta/60">{promise.brand.label}</p>
            <p className="mt-4 max-w-sm font-display text-3xl leading-tight font-bold text-noche md:text-[2.1rem]">
              {promise.brand.text}
            </p>
          </div>

          {/* La relación como una ruta: de la marca a TrackFlow. */}
          <div className="flex items-center lg:flex-col lg:pt-8" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-noche/60" />
            <span className="mx-2 h-px w-16 border-t border-dashed border-noche/30 lg:mx-0 lg:my-2 lg:h-20 lg:w-px lg:border-l lg:border-t-0" />
            <span className="h-3 w-3 rounded-full border-2 border-senal" />
          </div>

          <div>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-tinta/60">
              <span className="h-2 w-2 rounded-[2px] bg-senal" aria-hidden="true" />
              {promise.trackflow.label}
            </p>
            <ol className="mt-4 divide-y divide-noche/10 border-y border-noche/15">
              {promise.trackflow.items.map((item, index) => (
                <li key={item} className="flex items-baseline gap-5 py-4">
                  <span className="font-mono text-xs text-[#a83d08]">0{index + 1}</span>
                  <span className="text-lg text-noche">{item}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-lg text-sm leading-6 text-tinta/65">{promise.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
