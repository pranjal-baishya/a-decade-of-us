import { useEffect, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useState } from 'react'

interface RippleEntry {
  id: number
  x: number
  y: number
  color: 'gold' | 'blush'
  size: number
  kind: 'circle' | 'heart'
}

let _nextId = 0

/**
 * Global tap-ripple + heart-particle system.
 *
 * - Any element with `data-ripple` gets a gold radial ripple on pointerdown.
 * - `data-ripple-color="blush"` uses the blush palette instead.
 * - Any element with `data-cursor="heart"` additionally spawns a floating
 *   heart SVG that drifts upward and fades out.
 *
 * Skipped on `prefers-reduced-motion`.
 */
export function RippleProvider(): ReactNode {
  const [ripples, setRipples] = useState<RippleEntry[]>([])

  const spawn = useCallback((entry: RippleEntry) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setRipples((r) => [...r, entry])
    setTimeout(() => {
      setRipples((r) => r.filter((x) => x.id !== entry.id))
    }, entry.kind === 'heart' ? 1000 : 700)
  }, [])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent): void => {
      const target = e.target as HTMLElement

      // Walk up to find [data-ripple] ancestor
      const rippleEl = target.closest('[data-ripple]') as HTMLElement | null
      if (rippleEl) {
        const rect = rippleEl.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2.2
        const color = (rippleEl.dataset.rippleColor as 'gold' | 'blush') ?? 'gold'
        spawn({
          id: _nextId++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size,
          color,
          kind: 'circle',
        })
      }

      // Heart particle for [data-cursor="heart"] elements
      const heartEl = target.closest('[data-cursor="heart"]') as HTMLElement | null
      if (heartEl) {
        const rect = heartEl.getBoundingClientRect()
        spawn({
          id: _nextId++,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          size: 28,
          color: 'blush',
          kind: 'heart',
        })
      }
    }

    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [spawn])

  if (ripples.length === 0) return null

  return createPortal(
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 99997 }}
      aria-hidden
    >
      {ripples.map((r) => {
        const goldColor  = 'rgba(196,149,42,0.38)'
        const blushColor = 'rgba(196,128,110,0.42)'
        const c = r.color === 'blush' ? blushColor : goldColor

        if (r.kind === 'heart') {
          return (
            <div
              key={r.id}
              style={{
                position: 'absolute',
                left: r.x,
                top: r.y,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                animation: 'ripple-heart 0.95s ease-out forwards',
              }}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" fill={c}>
                <path d="M10 17.5C10 17.5 1 11 1 5C1 2.8 2.8 1 5 1C7.2 1 10 3.5 10 3.5C10 3.5 12.8 1 15 1C17.2 1 19 2.8 19 5C19 11 10 17.5 10 17.5Z" />
              </svg>
            </div>
          )
        }

        return (
          <div
            key={r.id}
            style={{
              position: 'absolute',
              left: r.x - r.size / 2,
              top: r.y - r.size / 2,
              width: r.size,
              height: r.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${c} 0%, transparent 65%)`,
              pointerEvents: 'none',
              animation: 'ripple-expand 0.65s ease-out forwards',
            }}
          />
        )
      })}
    </div>,
    document.body,
  )
}
