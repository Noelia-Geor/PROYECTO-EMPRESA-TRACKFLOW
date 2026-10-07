import type { LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  number: number
  total: number
  Icon: LucideIcon
  title: string
  description: string
  fact?: string
}

export function ServiceCard({ number, total, Icon, title, description, fact }: ServiceCardProps) {
  return (
    <article
      data-reveal
      style={{ transitionDelay: `${(number - 1) * 120}ms` }}
      className={`group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-superficie/60 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-superficie md:p-8 ${
        number % 2 === 0 ? 'lg:mt-10' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06] text-crema" aria-hidden="true">
          <Icon size={22} strokeWidth={1.7} />
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-niebla" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-senal/80 transition-colors group-hover:bg-senal" />
          0{number} / 0{total}
        </span>
      </div>
      <h3 className="mt-10 font-display text-[1.4rem] leading-tight font-bold text-crema">{title}</h3>
      <p className="mb-8 mt-4 max-w-[28ch] text-[0.95rem] leading-7 text-niebla">{description}</p>
      {fact ? (
        <p className="mt-auto flex items-center gap-2 border-t border-white/[0.07] pt-5 font-mono text-xs text-crema/80">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full border border-senal" aria-hidden="true" />
          {fact}
        </p>
      ) : null}
    </article>
  )
}
