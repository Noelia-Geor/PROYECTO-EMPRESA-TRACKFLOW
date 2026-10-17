import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouteMap } from '../components/RouteMap'
import { siteContent } from '../content/site'

// Isla del mapa: sustituye la versión estática de «Dónde estamos» por el mapa con el vuelo guiado por el scroll.
export function mount(container: HTMLElement) {
  const { locations, carriers } = siteContent
  createRoot(container).render(
    <StrictMode>
      <RouteMap
        id="donde-estamos"
        eyebrow={locations.eyebrow}
        title={locations.title}
        description={locations.description}
        locations={locations.items}
        carriers={carriers}
      />
    </StrictMode>,
  )
}
