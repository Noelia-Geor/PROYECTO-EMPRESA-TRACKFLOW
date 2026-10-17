import { initHeader } from './site/header'
import { initReveal } from './site/reveal'

// La landing es HTML estático (index.html). Aquí solo se activa lo interactivo:
// cabecera, entradas al hacer scroll y dos islas React que se cargan cuando se acercan a la pantalla.
initHeader()
initReveal()

type Island = { id: string; load: () => Promise<{ mount: (container: HTMLElement) => void }> }

const islands: Island[] = [
  { id: 'recorrido-root', load: () => import('./islands/journey') },
  { id: 'mapa-root', load: () => import('./islands/map') },
]

for (const island of islands) {
  const container = document.getElementById(island.id)
  if (!container) continue
  let started = false
  const start = () => {
    if (started) return
    started = true
    observer.disconnect()
    island.load().then(({ mount }) => mount(container))
  }
  // Se monta con margen de sobra para que el cambio de altura ocurra fuera de la pantalla.
  const observer = new IntersectionObserver((entries) => entries.some((entry) => entry.isIntersecting) && start(), {
    rootMargin: '200% 0px',
  })
  observer.observe(container)
  // Si se entra directamente por un ancla (#como-trabajamos), se monta sin esperar.
  const target = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null
  if (target && (target.contains(container) || container.contains(target))) start()
}
