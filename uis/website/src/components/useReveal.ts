import { useEffect } from 'react'

// Revela con una entrada suave los elementos marcados con data-reveal cuando entran en pantalla.
// Con prefers-reduced-motion no se oculta nada.
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    root.classList.add('reveal-on')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    for (const element of elements) observer.observe(element)

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-on')
    }
  }, [])
}
