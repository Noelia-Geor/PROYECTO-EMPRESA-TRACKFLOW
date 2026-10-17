import type { ReactNode } from 'react'
import { RouteMark } from './RouteMark'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-44 ${className}`} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-7xl">
        {/* Cabecera en dos columnas: título a la izquierda y frase a la derecha, alineados abajo. */}
        <div className="mb-12 md:mb-16 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16" data-reveal>
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-niebla">
              <RouteMark className="text-niebla" />
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="font-display text-4xl leading-[1.06] font-extrabold text-balance text-crema md:text-[3.1rem]"
            >
              {title}
            </h2>
          </div>
          {description ? (
            <p className="mt-6 max-w-[38rem] text-base leading-7 text-niebla md:text-lg md:leading-8 lg:mt-0 lg:pb-1">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  )
}
