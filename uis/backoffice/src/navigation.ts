import type { ComponentType } from 'react'
import { Inicio } from './pages/Inicio'

export type NavigationEntry = {
  label: string
  path: string
  page: ComponentType
}

// Para añadir un módulo, añade una línea aquí; la URL será #<path>.
export const navigation: NavigationEntry[] = [
  { label: 'Inicio', path: '/', page: Inicio },
]
