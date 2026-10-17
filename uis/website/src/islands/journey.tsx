import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { OperationJourney, type Scene } from '../components/journey/OperationJourney'
import '../components/journey/journey.css'

// Isla del recorrido: lee las escenas del HTML (la fuente de los textos, con sus citas de CONTEXT.md)
// y sustituye la lista estática por la experiencia guiada por el scroll.
export function mount(container: HTMLElement) {
  const scenes: Scene[] = Array.from(container.querySelectorAll<HTMLLIElement>('[data-journey-scenes] > li'), (item) => ({
    id: item.dataset.scene ?? '',
    label: item.dataset.label ?? '',
    title: item.querySelector('h3')?.textContent?.trim() ?? '',
    text: item.querySelector('p')?.textContent?.trim() ?? '',
  }))
  if (scenes.length !== 12) return
  createRoot(container).render(
    <StrictMode>
      <OperationJourney scenes={scenes} />
    </StrictMode>,
  )
}
