/**
 * Shared motion design tokens.
 * Import from here instead of repeating magic numbers inline.
 */

export const EASE = {
  cinema:  [0.16, 1, 0.3, 1] as const,
  gentle:  [0.4, 0, 0.2, 1] as const,
  spring:  { type: 'spring' as const, stiffness: 320, damping: 22 },
  springLight: { type: 'spring' as const, stiffness: 200, damping: 18 },
}

export const DUR = {
  fast:   0.25,
  normal: 0.55,
  slow:   0.9,
  cinema: 1.4,
} as const

/** Convenience variant factory for simple fade-up entrances */
export function fadeUp(delay = 0, distance = 18) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR.slow, ease: EASE.cinema, delay },
  } as const
}
