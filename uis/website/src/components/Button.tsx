import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  variant?: 'signal' | 'quiet'
}

export function Button({ children, className = '', variant = 'signal', ...props }: ButtonProps) {
  const variantStyles =
    variant === 'signal'
      ? 'min-h-13 rounded-md bg-senal px-6 text-[0.95rem] text-tinta shadow-[0_10px_30px_-12px_rgba(255,106,26,0.7)] hover:bg-[#ff7d38]'
      : 'min-h-13 px-1 text-[0.95rem] text-crema/85 underline decoration-white/25 underline-offset-[6px] hover:text-crema hover:decoration-senal'

  return (
    <a
      className={`group inline-flex items-center justify-center gap-3 font-semibold transition-colors ${variantStyles} ${className}`}
      {...props}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </a>
  )
}
