import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'signal' | 'paper' | 'outline'
}

export function Button({
  children,
  className = '',
  variant = 'signal',
  ...props
}: ButtonProps) {
  const variantStyles =
    variant === 'signal'
      ? 'bg-senal text-tinta hover:bg-white'
      : variant === 'paper'
        ? 'bg-white text-marino hover:bg-papel'
        : 'border border-white/60 bg-transparent text-white hover:border-senal hover:text-senal'

  return (
    <a
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-5 py-3 text-sm font-semibold transition-colors ${variantStyles} ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  )
}
