import type { ComponentType } from 'react'
import { Inicio } from './pages/Inicio'
import { LogisticaInversa } from './pages/LogisticaInversa'

export type NavigationEntry = {
  label: string
  path: string
  page: ComponentType
}

// Para añadir un módulo, añade una línea aquí; la URL será #<path>.
export const navigation: NavigationEntry[] = [
  { label: 'Inicio', path: '/', page: Inicio },
  { label: 'Logística inversa', path: '/logistica-inversa', page: LogisticaInversa },
]
