import { useState, type ReactNode } from 'react'
import { navigation } from '../navigation'

type LayoutProps = {
  currentPath: string
  children: ReactNode
}

export function Layout({ currentPath, children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-noche text-crema">
      <a
        href="#contenido"
        onClick={(event) => {
          event.preventDefault()
          document.getElementById('contenido')?.focus()
        }}
        className="sr-only z-50 rounded-md bg-senal px-4 py-3 font-semibold text-tinta focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>

      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-superficie px-5 py-3 md:hidden">
        <Logo />
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-crema"
          aria-expanded={menuOpen}
          aria-controls="menu-lateral"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-3.5 w-6" aria-hidden="true">
            <span className={`absolute left-0 h-0.5 w-6 bg-crema transition-transform ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-6 bg-crema transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-crema transition-transform ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`} />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-30 bg-noche/70 md:hidden" aria-hidden="true" onClick={() => setMenuOpen(false)} />
      ) : null}

      <aside
        id="menu-lateral"
        className={`fixed inset-y-0 left-0 z-40 w-64 flex-col border-r border-white/10 bg-superficie px-5 py-6 md:flex ${
          menuOpen ? 'flex' : 'hidden'
        }`}
      >
        <Logo />
        <p className="mt-2 font-mono text-xs tracking-wider text-niebla uppercase">Backoffice</p>

        <nav aria-label="Menú principal" className="mt-10">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const active = item.path === currentPath
              return (
                <li key={item.path}>
                  <a
                    href={`#${item.path}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 font-medium transition-colors ${
                      active ? 'bg-elevada text-crema' : 'text-crema/75 hover:bg-elevada/60 hover:text-crema'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-senal' : 'bg-niebla/50'}`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <main id="contenido" tabIndex={-1} className="px-5 py-8 outline-none sm:px-8 md:ml-64 md:px-10 md:py-12">
        {children}
      </main>
    </div>
  )
}

function Logo() {
  return (
    <a
      href="#/"
      className="flex w-fit items-center gap-2.5 font-display text-2xl leading-none font-extrabold text-crema"
      aria-label="TrackFlow, ir a Inicio"
    >
      <span className="h-3 w-3 rounded-[2px] bg-senal" aria-hidden="true" />
      <span>TrackFlow</span>
    </a>
  )
}
