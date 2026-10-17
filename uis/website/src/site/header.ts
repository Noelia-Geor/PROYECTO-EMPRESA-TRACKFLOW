// Cabecera compartida por index.html y application.html: fondo sólido al bajar y menú móvil
// accesible (Escape lo cierra y devuelve el foco al botón).
export function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-site-header]')
  if (!header) return

  const toggle = header.querySelector<HTMLButtonElement>('[data-menu-toggle]')
  const menu = document.getElementById('menu-principal')
  let menuOpen = false

  const paint = () => {
    header.dataset.solid = String(menuOpen || window.scrollY > 24)
  }

  const setMenu = (open: boolean, returnFocus = false) => {
    if (!toggle || !menu) return
    menuOpen = open
    menu.hidden = !open
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú')
    paint()
    if (!open && returnFocus) toggle.focus()
  }

  paint()
  window.addEventListener('scroll', paint, { passive: true })

  toggle?.addEventListener('click', () => setMenu(!menuOpen))
  menu?.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setMenu(false)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) setMenu(false, true)
  })
  // Al pasar a escritorio el menú móvil deja de existir; se cierra para no dejar estado colgado.
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false)
  })
}
