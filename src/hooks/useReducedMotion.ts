import { useEffect, useState } from 'react'

/**
 * Returns true if the user has requested reduced motion via OS/browser settings.
 * All animated components should check this before applying motion.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent): void => {
      setPrefersReduced(e.matches)
    }

    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}
