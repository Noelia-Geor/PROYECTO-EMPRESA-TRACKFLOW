import type { LucideIcon } from 'lucide-react'

type ServiceCardProps = {
  number: number
  Icon: LucideIcon
  title: string
  description: string
  detail?: string
}

export function ServiceCard({ number, Icon, title, description, detail }: ServiceCardProps) {
  return (
    <article className="group relative flex min-h-64 flex-col border border-carton/70 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-marino/30 hover:shadow-xl sm:p-6">
      <span className="absolute inset-x-0 top-0 h-1 bg-senal" aria-hidden="true" />
      <span className="mb-8 flex h-11 w-11 items-center justify-center bg-marino text-white transition-colors group-hover:bg-noche" aria-hidden="true">
        <Icon size={20} strokeWidth={1.8} />
      </span>
      <span className="mb-3 font-mono text-xs text-marino/55" aria-hidden="true">0{number}</span>
      <h3 className="font-display text-xl leading-tight font-bold text-marino">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-tinta/75">{description}</p>
      {detail && (
        <p className="mt-4 border-t border-carton/80 pt-3 font-mono text-[0.7rem] leading-5 text-marino">
          {detail}
        </p>
      )}
    </article>
  )
}
