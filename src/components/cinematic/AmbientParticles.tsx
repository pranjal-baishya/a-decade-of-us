import { useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { isAnniversaryToday } from '@/lib/anniversary'

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  opacity: number
  drift: number
  phase: number
  isBlush?: boolean
}

/**
 * Lightweight canvas of ~60 warm gold particles drifting upward.
 * Fixed, covers full viewport, pointer-events none.
 */
export function AmbientParticles(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const prefersReduced = useReducedMotion()
  const anniversary = isAnniversaryToday()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReduced) return

    const resize = (): void => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const ctx = canvas.getContext('2d')!
    const COUNT = anniversary ? 110 : 55

    const particles: Particle[] = Array.from({ length: COUNT }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.28 + 0.08,
      opacity: Math.random() * 0.45 + 0.08,
      drift: (Math.random() - 0.5) * 0.22,
      phase: Math.random() * Math.PI * 2,
      isBlush: anniversary && idx % 5 === 0,
    }))

    let t = 0
    const draw = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.012

      for (const p of particles) {
        const wobble = Math.sin(t + p.phase) * 0.4
        const alpha = p.opacity * (0.7 + Math.sin(t * 0.5 + p.phase) * 0.3)

        ctx.beginPath()
        ctx.arc(p.x + wobble, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.isBlush
          ? `rgba(196,128,110,${alpha.toFixed(3)})`
          : `rgba(196,149,42,${alpha.toFixed(3)})`
        ctx.fill()

        p.y -= p.speed
        p.x += p.drift * 0.08

        if (p.y < -6) {
          p.y = canvas.height + 6
          p.x = Math.random() * canvas.width
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [prefersReduced, anniversary])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  )
}
