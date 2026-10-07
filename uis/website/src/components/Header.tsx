import { useEffect, useState } from 'react'
import { siteContent } from '../content/site'

export function Header() {
  const { brand, navigation, accessibility } = siteContent
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 24)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  const solid = isScrolled || menuOpen

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-50 rounded-md bg-senal px-4 py-3 font-semibold text-tinta focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {accessibility.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          solid ? 'border-white/10 bg-noche/95 backdrop-blur-xl' : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:py-5">
          <a
            href="#inicio"
            className="flex w-fit items-center gap-2.5 font-display text-2xl leading-none font-extrabold text-crema sm:text-[1.7rem]"
            aria-label={accessibility.homeLink}
          >
            <span className="h-3 w-3 rounded-[2px] bg-senal" aria-hidden="true" />
            <span>
              {brand.first}
              {brand.second}
            </span>
          </a>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md text-crema md:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-6 bg-crema transition-transform ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-crema transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-6 bg-crema transition-transform ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>

          <nav aria-label={accessibility.primaryNavigation} className="hidden md:block">
            <ul className="flex gap-x-9 text-[0.95rem] font-medium text-crema/80">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a className="py-2 transition-colors hover:text-crema" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {menuOpen ? (
          <nav id="menu-principal" aria-label={accessibility.primaryNavigation} className="border-t border-white/10 md:hidden">
            <ul className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className="flex items-center gap-3 py-3 font-display text-xl font-bold text-crema"
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-senal" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  )
}
