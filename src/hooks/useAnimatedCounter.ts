import { useEffect, useRef, useState } from 'react'

/**
 * Animates a number from 0 → target over `duration` ms using an ease-out cubic.
 * Returns the current animated value as a string with optional locale formatting.
 */
export function useAnimatedCounter(
  target: number,
  durationMs = 1800,
  delay = 0,
): string {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let startTime: number | null = null
    const timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (startTime === null) startTime = ts
        const elapsed = ts - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(target * eased))
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [target, durationMs, delay])

  return value.toLocaleString()
}
