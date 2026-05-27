import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { ChapterRail } from './ChapterRail'
import { EASE, DUR } from '@/lib/motion'
import { useReadingMode } from '@/hooks/useReadingMode'

interface PageShellProps {
  children: ReactNode
  backTo?: string
  backLabel?: string
  continueTo?: string
  continueLabel?: string
  className?: string
}

// ── Per-route signature transitions ─────────────────────────────────────────
type RouteKey =
  | '/'
  | '/timeline'
  | '/favorites'
  | '/messages'
  | '/places'
  | '/little-things'
  | '/letter'
  | '/promises'
  | '/ending'
  | 'year'    // /year/:year
  | 'default'

const ROUTE_VARIANTS: Record<RouteKey, Variants> = {
  '/': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  '/timeline': {
    initial: { opacity: 0, scale: 1.015 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.99 },
  },
  year: {
    initial: { opacity: 0, scale: 1.04, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  },
  '/favorites': {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
  },
  '/messages': {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -10 },
  },
  '/places': {
    initial: { opacity: 0, scale: 1.03 },
    animate: { opacity: 1, scale: 1 },
    exit:    { opacity: 0, scale: 0.98 },
  },
  '/little-things': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  },
  '/letter': {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: 24 },
  },
  '/promises': {
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -8 },
  },
  '/ending': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  default: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: -12 },
  },
}

// Per-route transition durations
const ROUTE_DURATIONS: Partial<Record<RouteKey, number>> = {
  '/':        DUR.cinema,
  '/letter':  DUR.slow,
  '/promises':DUR.slow,
  '/ending':  DUR.cinema,
  year:       DUR.slow,
}

function getRouteKey(pathname: string): RouteKey {
  if (pathname.startsWith('/year/')) return 'year'
  if (pathname in ROUTE_VARIANTS) return pathname as RouteKey
  return 'default'
}

export function PageShell({
  children,
  backTo,
  backLabel = 'Back',
  continueTo,
  continueLabel = 'Continue',
  className = '',
}: PageShellProps): ReactNode {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const routeKey = getRouteKey(pathname)
  const { isReading } = useReadingMode()
  const variants = ROUTE_VARIANTS[routeKey] ?? ROUTE_VARIANTS.default
  const duration = ROUTE_DURATIONS[routeKey] ?? DUR.normal

  return (
    <motion.div
      className={`relative min-h-dvh z-10 ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration, ease: EASE.cinema }}
    >
      {/* Chapter progress rail */}
      <ChapterRail />

      {/* Back button */}
      {backTo && (
        <button
          type="button"
          onClick={() => navigate(backTo)}
          className="fixed z-50 flex items-center font-sans uppercase transition-opacity hover:opacity-100"
          style={{
            top: 18, left: 18, gap: 6, padding: '10px 18px',
            fontSize: '0.72rem', letterSpacing: '0.18em',
            opacity: isReading ? 0.08 : 0.75,
            color: 'var(--color-amber)',
            background: 'rgba(15,12,9,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(196,149,42,0.20)',
            borderRadius: 999,
            pointerEvents: isReading ? 'none' : 'auto',
            transition: 'opacity 0.4s ease',
          }}
          data-ripple
        >
          <ChevronLeft size={14} strokeWidth={2} />
          <span style={{ display: 'inline-block', paddingLeft: 2 }}>{backLabel}</span>
        </button>
      )}

      {children}

      {/* Continue CTA */}
      {continueTo && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 32, paddingBottom: 56, opacity: isReading ? 0.08 : 1, pointerEvents: isReading ? 'none' : 'auto', transition: 'opacity 0.4s ease' }}>
          <motion.button
            type="button"
            onClick={() => navigate(continueTo)}
            className="relative font-sans uppercase overflow-hidden"
            data-ripple
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingLeft: 36,
              paddingRight: 36,
              paddingTop: 16,
              paddingBottom: 16,
              minHeight: 52,
              borderRadius: 999,
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              background: 'linear-gradient(135deg, rgba(196,149,42,0.22), rgba(196,100,30,0.15))',
              border: '1px solid rgba(196,149,42,0.45)',
              color: 'var(--color-cream)',
              boxShadow: '0 0 24px rgba(196,149,42,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.97 }}
            whileHover={{ boxShadow: '0 0 40px rgba(196,149,42,0.28), inset 0 1px 0 rgba(255,255,255,0.06)' }}
          >
            <span className="shimmer-sweep" aria-hidden />
            {continueLabel}
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}
