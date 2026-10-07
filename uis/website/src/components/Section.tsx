import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-5 py-20 sm:px-8 md:py-28 ${className}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="mb-4 font-mono text-xs uppercase text-marino/65">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="font-display text-4xl leading-[1.08] font-extrabold text-marino sm:text-5xl"
          >
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-tinta/75">{description}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
