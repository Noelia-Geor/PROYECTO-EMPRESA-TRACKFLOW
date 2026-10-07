import { siteContent } from '../content/site'

// La red de transportistas como un esquema de nodos: cada país es un centro del que salen sus transportistas.
export function CarrierStrip() {
  const { carriers } = siteContent

  return (
    <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 md:mt-24 lg:grid-cols-[0.8fr_1.6fr]" data-reveal>
      <div>
        <h3 className="max-w-xs font-display text-2xl leading-tight font-bold text-crema md:text-[1.7rem]">{carriers.title}</h3>
        <p className="mt-4 flex items-center gap-3 font-mono text-xs text-niebla">
          <span className="h-2.5 w-2.5 rounded-full border border-dashed border-niebla" aria-hidden="true" />
          {carriers.extra}
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        {carriers.groups.map((group) => (
          <div key={group.country}>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.1em] text-crema">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-senal" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-senal" />
              </span>
              {group.country}
            </p>
            <ul className="ml-[9px] mt-2 border-l border-dashed border-white/25 pt-2">
              {group.names.map((name) => (
                <li key={`${group.country}-${name}`} className="relative flex items-center gap-3 py-2.5 pl-6">
                  <span className="absolute left-0 top-1/2 w-4 border-t border-dashed border-white/25" aria-hidden="true" />
                  <span className="h-2 w-2 rounded-full bg-crema/70" aria-hidden="true" />
                  <span className="font-display text-xl font-bold text-crema">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
