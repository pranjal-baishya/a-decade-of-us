import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { EASE, DUR } from '@/lib/motion'

export function NotFoundPage(): ReactNode {
  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-dvh flex flex-col items-center justify-center px-6 text-center"
      style={{ position: 'relative', zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.cinema, ease: EASE.cinema }}
    >
      {/* Compass / clock SVG */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ opacity: 0.22, scale: 1, rotate: 0 }}
        transition={{ duration: DUR.cinema, ease: EASE.cinema, delay: 0.3 }}
        aria-hidden
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="rgba(196,149,42,0.9)" strokeWidth="1.2">
          {/* Clock face */}
          <circle cx="40" cy="40" r="36" />
          {/* Hour marks */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
            const r1 = 28, r2 = 34
            return (
              <line
                key={i}
                x1={40 + r1 * Math.cos(angle)}
                y1={40 + r1 * Math.sin(angle)}
                x2={40 + r2 * Math.cos(angle)}
                y2={40 + r2 * Math.sin(angle)}
                strokeOpacity={i % 3 === 0 ? 1 : 0.4}
              />
            )
          })}
          {/* Hour hand — pointing to an ambiguous "lost" time */}
          <line x1="40" y1="40" x2="40" y2="18" strokeWidth="1.6" strokeLinecap="round" transform="rotate(50 40 40)" />
          {/* Minute hand */}
          <line x1="40" y1="40" x2="40" y2="14" strokeWidth="1" strokeLinecap="round" transform="rotate(-70 40 40)" />
          {/* Center dot */}
          <circle cx="40" cy="40" r="2.5" fill="rgba(196,149,42,0.9)" stroke="none" />
        </svg>
      </motion.div>

      {/* Headline */}
      <motion.p
        className="romantic-line mb-3"
        style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--color-cream)', lineHeight: 1.1 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.cinema, ease: EASE.cinema, delay: 0.5 }}
      >
        Lost in time…
      </motion.p>

      <motion.p
        className="font-sans mb-10"
        style={{ color: 'var(--color-cream-muted)', fontSize: '0.88rem', maxWidth: 300 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.slow, ease: EASE.cinema, delay: 0.9 }}
      >
        This page doesn't exist — but your story does.
      </motion.p>

      {/* Gold divider */}
      <motion.div
        className="mb-10"
        style={{ height: 1, width: 60, background: 'linear-gradient(to right, transparent, rgba(196,149,42,0.45), transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: DUR.slow, ease: EASE.cinema, delay: 1.1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.slow, ease: EASE.cinema, delay: 1.3 }}
      >
        <PrimaryButton size="lg" onClick={() => navigate('/timeline')}>
          Find your way back →
        </PrimaryButton>
      </motion.div>
    </motion.div>
  )
}
