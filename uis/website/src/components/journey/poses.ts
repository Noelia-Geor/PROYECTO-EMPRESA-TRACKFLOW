import type { Pose } from './timeline'

// Datos de las poses de las personas del almacén (ver Figure.tsx).

export type Palette = { vest: string; stripe: string; shirt: string; pants: string; cap?: string }

export const OPERATOR: Palette = { vest: '#dfe4e6', stripe: '#8fa2ab', shirt: '#2b5571', pants: '#163247' }
export const COURIER: Palette = { vest: '#3e6178', stripe: '#c9d3d8', shirt: '#1f3d52', pants: '#122838', cap: '#0f2230' }

export const SKIN = '#c79f84'
export const HAIR = '#1a2731'
export const SHOE = '#081218'
export const GLOVE = '#2a3a45'

export type Point = readonly [number, number]
export type Arms = { back: Point; front: Point; lean?: number; paper?: boolean }

export const LEGS: Record<'stand' | 'a' | 'b', [Point, Point]> = {
  stand: [[-1.6, 0], [1.8, 0]],
  a: [[-5.5, 0], [5.8, -0.4]],
  b: [[-0.6, -1.2], [1.2, 0]],
}

export const ARMS: Record<string, Arms> = {
  stand: { back: [-3.8, -16.5], front: [4.2, -16.5] },
  swingA: { back: [1.8, -17.5], front: [-1.5, -17.8] },
  swingB: { back: [-5.2, -18.5], front: [5.6, -18.5] },
  read: { back: [4.6, -21.5], front: [6.2, -22.5], paper: true },
  reach: { back: [-3.6, -17], front: [7.5, -41.5] },
  carry: { back: [4.6, -16], front: [6.4, -15.5] },
  pack: { back: [7.6, -18.5], front: [9.2, -18], lean: 2.2 },
  place: { back: [8.4, -21], front: [9.6, -20.5], lean: 3 },
  pull: { back: [-3.8, -16.5], front: [-6.8, -15.5] },
}

export const POSES: Record<Pose, [keyof typeof LEGS, keyof typeof ARMS]> = {
  stand: ['stand', 'stand'],
  walkA: ['a', 'swingA'],
  walkB: ['b', 'swingB'],
  read: ['stand', 'read'],
  reach: ['stand', 'reach'],
  carry: ['stand', 'carry'],
  carryA: ['a', 'carry'],
  carryB: ['b', 'carry'],
  pack: ['stand', 'pack'],
  place: ['stand', 'place'],
  pullA: ['a', 'pull'],
  pullB: ['b', 'pull'],
  pull: ['stand', 'pull'],
}

export const POSE_NAMES = Object.keys(POSES) as Pose[]
