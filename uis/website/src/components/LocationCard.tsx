type Location = {
  city: string
  country: string
  role: string
}

type LocationCardProps = {
  location: Location
  number: number
}

export function LocationCard({ location, number }: LocationCardProps) {
  return (
    <article className="grid min-h-72 grid-cols-[1fr_auto] items-end border border-white/15 bg-noche p-6 text-white shadow-xl sm:p-9">
      <div>
        <p className="mb-4 font-mono text-xs uppercase text-white/60">
          {location.country}
        </p>
        <h3 className="font-display text-5xl leading-none font-extrabold text-white sm:text-6xl lg:text-7xl">
          {location.city}
        </h3>
        <p className="mt-6 font-mono text-xs text-senal sm:text-sm">{location.role}</p>
      </div>
      <span className="font-mono text-sm text-white/40" aria-hidden="true">
        0{number}
      </span>
    </article>
  )
}
