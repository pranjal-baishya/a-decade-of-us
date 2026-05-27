import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { COUPLE } from '@/data/couple'
import { isAnniversaryToday } from '@/lib/anniversary'

interface PressPlayProps {
  onEnter: () => void
}

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Full-screen cinematic intro gate.
 * Shown once per session before the Opening page.
 * Triggers music and fades out when user clicks "Press Play".
 */
export function PressPlay({ onEnter }: PressPlayProps): ReactNode {
  const isAnniversary = isAnniversaryToday()
  const handleEnter = (): void => {
    // Dispatch custom event so MusicToggle can start audio
    window.dispatchEvent(new CustomEvent('adou:press-play'))
    onEnter()
  }

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ zIndex: 100, background: '#050403' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(196,149,42,0.06) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-8 text-center">
        {/* Her name / anniversary greeting */}
        <motion.p
          className="romantic-line"
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: isAnniversary ? 'rgba(196,128,110,0.7)' : 'rgba(196,149,42,0.5)',
            letterSpacing: '0.12em',
          }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
        >
          {isAnniversary ? `Happy Anniversary, ${COUPLE.partnerB}` : `For ${COUPLE.partnerB}`}
        </motion.p>

        {/* Title */}
        <motion.h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.4rem, 8vw, 5rem)',
            fontWeight: 500,
            lineHeight: 1.1,
            color: 'var(--color-cream)',
            textShadow: '0 0 60px rgba(196,149,42,0.15)',
            letterSpacing: '-0.01em',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease, delay: 0.7 }}
        >
          A Decade of Us
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="romantic-line"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'rgba(237,226,204,0.45)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 1.4 }}
        >
          "And somehow, we're still just getting started."
        </motion.p>

        {/* Gold / blush divider */}
        <motion.div
          style={{
            height: 1,
            width: 60,
            background: isAnniversary
              ? 'linear-gradient(to right, transparent, rgba(196,128,110,0.55), transparent)'
              : 'linear-gradient(to right, transparent, rgba(196,149,42,0.45), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 2.0 }}
        />

        {/* Press Play button */}
        <motion.button
          type="button"
          onClick={handleEnter}
          className="relative font-sans uppercase overflow-hidden"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            paddingLeft: 42,
            paddingRight: 42,
            paddingTop: 18,
            paddingBottom: 18,
            borderRadius: 9999,
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            background: 'linear-gradient(135deg, rgba(196,149,42,0.18), rgba(196,100,30,0.12))',
            border: '1px solid rgba(196,149,42,0.40)',
            color: 'var(--color-cream)',
            boxShadow: '0 0 30px rgba(196,149,42,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 2.4 }}
          whileHover={{ boxShadow: '0 0 50px rgba(196,149,42,0.28), inset 0 1px 0 rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="shimmer-sweep" aria-hidden />
          {/* Play icon */}
          <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden>
            <path d="M0 0L11 6.5L0 13V0Z" fillOpacity="0.85" />
          </svg>
          Press Play
        </motion.button>

        {/* Skip link */}
        <motion.button
          type="button"
          onClick={onEnter}
          className="font-sans"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(196,149,42,0.28)',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            marginTop: -4,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          Skip intro
        </motion.button>
      </div>
    </motion.div>
  )
}
