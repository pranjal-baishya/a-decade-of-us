import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Initialises a single Lenis smooth-scroll instance for the app.
 * Skips setup when the user prefers reduced motion.
 * Drives the RAF loop internally and cleans up on unmount.
 */
export function useLenis(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    let raf: number
    const loop = (time: number): void => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
}
