import { siteContent } from '../content/site'

export function StatStrip() {
  return (
    <section className="relative z-30 mx-auto -mt-12 w-full max-w-7xl px-5 sm:px-8" aria-label={siteContent.accessibility.stats}>
      <dl className="grid grid-cols-2 border border-white/15 bg-noche/85 px-5 py-6 shadow-2xl backdrop-blur-2xl sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
        {siteContent.stats.map((stat) => (
          <div key={stat.label} className="border-l border-senal/80 py-1 pl-4">
            <dt className="font-mono text-[0.65rem] uppercase text-white/65 sm:text-xs">
              {stat.label}
            </dt>
            <dd className="mt-1 font-mono text-lg font-medium text-white sm:text-xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
