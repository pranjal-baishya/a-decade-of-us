import type { Transition } from 'framer-motion'

/**
 * Cinematic easing — slow-in, strong ease-out.
 * Matches the emotional pacing of the app.
 */
export const EASING = {
  cinematic: [0.16, 1, 0.3, 1] as const,
  gentle: [0.4, 0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  snappy: [0.2, 0, 0, 1] as const,
  linear: [0, 0, 1, 1] as const,
} as const

export const transitions = {
  cinematic: {
    duration: 1.4,
    ease: EASING.cinematic,
  } satisfies Transition,

  slow: {
    duration: 0.9,
    ease: EASING.cinematic,
  } satisfies Transition,

  normal: {
    duration: 0.6,
    ease: EASING.gentle,
  } satisfies Transition,

  fast: {
    duration: 0.3,
    ease: EASING.snappy,
  } satisfies Transition,

  spring: {
    type: 'spring',
    stiffness: 80,
    damping: 20,
    mass: 1,
  } satisfies Transition,

  springGentle: {
    type: 'spring',
    stiffness: 50,
    damping: 18,
    mass: 1.2,
  } satisfies Transition,

  springSnappy: {
    type: 'spring',
    stiffness: 140,
    damping: 22,
    mass: 0.8,
  } satisfies Transition,

  page: {
    duration: 0.8,
    ease: EASING.cinematic,
  } satisfies Transition,
} as const
