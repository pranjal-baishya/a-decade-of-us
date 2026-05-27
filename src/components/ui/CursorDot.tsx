import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Cinematic custom cursor for desktop.
 * - 6px solid amber dot that follows the cursor with no lag
 * - 24px outline ring with ~12% per-frame lerp smoothing
 * - Turns into a small heart when hovering [data-cursor="heart"] elements
 * - Hidden on touch devices and when prefers-reduced-motion is set
 */
export function CursorDot(): ReactNode {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef<number | null>(null)
  const [isHeart, setIsHeart] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on hover-capable pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Hide native cursor
    document.documentElement.style.cursor = 'none'

    const onMove = (e: PointerEvent): void => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      // Detect data-cursor="heart" hover
      const target = e.target as HTMLElement
      setIsHeart(!!target.closest('[data-cursor="heart"]'))
    }

    const loop = (): void => {
      const { x: px, y: py } = pos.current
      ring.current.x += (px - ring.current.x) * 0.13
      ring.current.y += (py - ring.current.y) * 0.13

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('pointermove', onMove)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: 'none',
          width: isHeart ? 16 : 7,
          height: isHeart ? 16 : 7,
          borderRadius: isHeart ? 0 : '50%',
          background: isHeart ? 'none' : 'var(--color-amber)',
          transition: 'width 0.2s, height 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isHeart && (
          <svg width="14" height="12" viewBox="0 0 14 12" fill="rgba(196,149,42,0.9)">
            <path d="M7 11.5C7 11.5 1 7.5 1 3.5C1 2 2.5 1 4 1C5.5 1 7 2.5 7 2.5C7 2.5 8.5 1 10 1C11.5 1 13 2 13 3.5C13 7.5 7 11.5 7 11.5Z" />
          </svg>
        )}
      </div>

      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: 'none',
          width: isHeart ? 36 : 26,
          height: isHeart ? 36 : 26,
          borderRadius: '50%',
          border: `1.5px solid rgba(196,149,42,${isHeart ? 0.55 : 0.35})`,
          boxShadow: isHeart ? '0 0 12px rgba(196,149,42,0.2)' : undefined,
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        }}
      />
    </>
  )
}
