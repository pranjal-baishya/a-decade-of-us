import { type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AmbientParticles } from './AmbientParticles'
import { isAnniversaryToday } from '@/lib/anniversary'
import { getYearPhase, PHASE_TINT } from '@/lib/yearPhase'

/**
 * Fixed full-viewport cinematic background:
 *  - Deep warm dark gradient
 *  - 3 soft light-leak blobs (amber, low opacity)
 *  - AmbientParticles (drifting gold dots)
 *  - Film grain is handled via CSS in globals.css (body::before)
 */
export function CinematicBackground(): ReactNode {
  const { pathname } = useLocation()
  const yearMatch = pathname.match(/^\/year\/(\d+)$/)
  const phaseTint = yearMatch
    ? PHASE_TINT[getYearPhase(parseInt(yearMatch[1]!, 10))]
    : null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 100%, #1a1208 0%, #0f0c09 45%, #07060a 100%)',
        }}
      />

      {/* Light leak — top left corner */}
      <div
        className="absolute"
        style={{
          top: '-12%',
          left: '-8%',
          width: '45%',
          height: '45%',
          background: 'radial-gradient(ellipse at center, rgba(196,149,42,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Light leak — bottom right */}
      <div
        className="absolute"
        style={{
          bottom: '-10%',
          right: '-5%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(180,100,40,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Light leak — center warm glow (very subtle) */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          transform: 'translate(-50%,-50%)',
          width: '60%',
          height: '40%',
          background: 'radial-gradient(ellipse at center, rgba(196,149,42,0.025) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Anniversary blush light leak */}
      {isAnniversaryToday() && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(196,128,110,0.07) 0%, transparent 70%)',
          }}
          aria-hidden
        />
      )}

      {/* Per-emotional-phase tint overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'soft-light' }}
        animate={{ background: phaseTint ?? 'transparent', opacity: phaseTint ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />

      {/* Ambient particles */}
      <AmbientParticles />
    </div>
  )
}
