import { useRef, useEffect, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReadingMode } from '@/hooks/useReadingMode'

const CHAPTERS = [
  { path: '/',              label: 'Opening' },
  { path: '/timeline',      label: 'Timeline' },
  { path: '/favorites',     label: 'Favorites' },
  { path: '/messages',      label: 'Messages' },
  { path: '/places',        label: 'Places' },
  { path: '/little-things', label: 'Little Things' },
  { path: '/letter',        label: 'Letter' },
  { path: '/promises',      label: 'Promises' },
  { path: '/ending',        label: 'Ending' },
] as const

// Dot width px (active = 20, inactive = 7), gap = 6
const DOT_W   = 7
const DOT_W_A = 20
const GAP     = 6

function dotCenterX(index: number, activeIndex: number): number {
  let x = 0
  for (let i = 0; i < index; i++) {
    x += (i === activeIndex ? DOT_W_A : DOT_W) + GAP
  }
  const w = index === activeIndex ? DOT_W_A : DOT_W
  return x + w / 2
}

/**
 * A thin gold dot-rail pinned at the top of every main page.
 * When the active route changes a tiny gold comet travels between old and new dot.
 */
export function ChapterRail(): ReactNode {
  const { pathname }  = useLocation()
  const navigate      = useNavigate()
  const { isReading } = useReadingMode()
  const activeIndex   = CHAPTERS.findIndex((c) => c.path === pathname)

  // Track previous active index in state so it survives re-renders without
  // reading a ref during render (which violates React's rules-of-hooks).
  const [prevIndex, setPrevIndex] = useState(activeIndex)
  const lastSeenIndex = useRef(activeIndex)

  useEffect(() => {
    if (activeIndex !== lastSeenIndex.current) {
      setPrevIndex(lastSeenIndex.current)
      lastSeenIndex.current = activeIndex
    }
  }, [activeIndex])

  // Hide on year chapter sub-pages — placed AFTER all hooks to keep hook order stable
  if (pathname.startsWith('/year/')) return null

  // Container pixel width (approximate — used only for comet relative positioning)
  const totalWidth = CHAPTERS.reduce(
    (acc, _, i) => acc + (i === activeIndex ? DOT_W_A : DOT_W) + GAP,
    0,
  ) - GAP
  const fromX = dotCenterX(prevIndex, activeIndex) - totalWidth / 2
  const toX   = dotCenterX(activeIndex, activeIndex) - totalWidth / 2

  return (
    <motion.div
      className="fixed top-0 inset-x-0 z-40 flex justify-center pointer-events-none"
      style={{
        paddingTop: 10,
        opacity: isReading ? 0.06 : undefined,
        pointerEvents: isReading ? 'none' : undefined,
        transition: 'opacity 0.4s ease',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isReading ? 0.06 : 1 }}
      transition={{ delay: isReading ? 0 : 1.2, duration: 0.4 }}
      aria-label="Journey progress"
    >
      <div
        className="relative flex items-center gap-1.5 px-3 py-2 rounded-full pointer-events-auto"
        style={{
          background: 'rgba(10,8,6,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(196,149,42,0.12)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
        }}
      >
        {/* Traveling comet */}
        <AnimatePresence>
          {prevIndex !== activeIndex && prevIndex !== -1 && (
            <motion.div
              key={`${prevIndex}-${activeIndex}`}
              className="absolute pointer-events-none"
              style={{
                top: '50%',
                translateY: '-50%',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-amber)',
                boxShadow: '0 0 8px rgba(196,149,42,0.8)',
                left: `calc(50% + ${fromX}px - 3px)`,
                zIndex: 20,
              }}
              animate={{ x: toX - fromX, opacity: [1, 1, 0] }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden
            />
          )}
        </AnimatePresence>

        {CHAPTERS.map((chapter, i) => {
          const isPast   = activeIndex > i
          const isActive = activeIndex === i

          return (
            <button
              key={chapter.path}
              type="button"
              onClick={() => navigate(chapter.path)}
              aria-label={`Go to ${chapter.label}`}
              title={chapter.label}
              className="relative flex items-center justify-center transition-all"
              data-ripple
              style={{
                width:  isActive ? DOT_W_A : DOT_W,
                height: DOT_W,
                borderRadius: 9999,
                background: isActive
                  ? 'var(--color-amber)'
                  : isPast
                  ? 'rgba(196,149,42,0.55)'
                  : 'rgba(196,149,42,0.15)',
                border: isActive
                  ? '1px solid rgba(196,149,42,0.6)'
                  : '1px solid rgba(196,149,42,0.18)',
                boxShadow: isActive ? '0 0 8px rgba(196,149,42,0.5)' : undefined,
                cursor: 'pointer',
                transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s',
                padding: 0,
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
