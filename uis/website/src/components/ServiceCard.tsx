import type { LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  number: number
  total: number
  Icon: LucideIcon
  title: string
  description: string
  stat: { value: string; label: string }
}

// Tarjeta de servicio: la cifra real de CONTEXT.md va arriba y grande, para que se vea de un vistazo quién es TrackFlow.
export function ServiceCard({ number, total, Icon, title, description, stat }: ServiceCardProps) {
  return (
    <article
      data-reveal
      style={{ transitionDelay: `${(number - 1) * 120}ms` }}
      className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-superficie/60 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-superficie"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-crema" aria-hidden="true">
          <Icon size={19} strokeWidth={1.7} />
        </span>
        <span className="flex items-center gap-2 font-mono text-xs text-niebla" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-senal/80 transition-colors group-hover:bg-senal" />
          0{number} / 0{total}
        </span>
      </div>

      <p className="mt-8 font-display text-[2.6rem] leading-none font-extrabold whitespace-nowrap text-senal">{stat.value}</p>
      <p className="mt-2 min-h-12 text-sm leading-6 text-crema/85">{stat.label}</p>

      <div className="mt-7 border-t border-white/[0.07] pt-6">
        <h3 className="font-display text-xl leading-tight font-bold text-crema">{title}</h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-niebla">{description}</p>
      </div>
    </article>
  )
}
