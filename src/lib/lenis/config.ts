import Lenis from 'lenis'

export interface LenisOptions {
  duration?: number
  easing?: (t: number) => number
  orientation?: 'vertical' | 'horizontal'
  gestureOrientation?: 'vertical' | 'horizontal' | 'both'
  smoothWheel?: boolean
  wheelMultiplier?: number
  touchMultiplier?: number
}

const defaultEasing = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export const DEFAULT_LENIS_OPTIONS: LenisOptions = {
  duration: 1.4,
  easing: defaultEasing,
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
}

/**
 * Create and configure a Lenis smooth scroll instance.
 */
export function createLenis(options: LenisOptions = {}): Lenis {
  return new Lenis({
    ...DEFAULT_LENIS_OPTIONS,
    ...options,
  })
}

/**
 * Start the Lenis RAF loop.
 * Returns a cleanup function to cancel animation frame.
 */
export function startLenisLoop(lenis: Lenis): () => void {
  let rafId: number

  const raf = (time: number): void => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(rafId)
    lenis.destroy()
  }
}
