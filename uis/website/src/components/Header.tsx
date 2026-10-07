import { useEffect, useState } from 'react'
import { siteContent } from '../content/site'

export function Header() {
  const { brand, navigation, accessibility } = siteContent
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 bg-senal px-4 py-3 font-semibold text-tinta focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {accessibility.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          isScrolled
            ? 'border-white/10 bg-noche/90 text-white shadow-lg backdrop-blur-xl'
            : 'border-white/15 bg-transparent text-white'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 md:flex-row md:items-center md:justify-between md:py-5">
          <a
            href="#inicio"
            className="flex w-fit items-center gap-2 font-display text-xl leading-none font-extrabold text-white sm:text-2xl"
            aria-label={accessibility.homeLink}
          >
            <span className="h-2.5 w-2.5 bg-senal" aria-hidden="true" />
            <span>{brand.first}{brand.second}</span>
          </a>
          <nav aria-label={accessibility.primaryNavigation}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-white sm:gap-x-7">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className="transition-colors hover:text-senal"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
