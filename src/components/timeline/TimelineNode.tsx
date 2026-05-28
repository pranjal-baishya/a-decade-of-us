import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { YearChapter } from '@/types/section'
import { MEMORIES } from '@/data/memories'
import { EASE } from '@/lib/motion'
import { assetUrl } from '@/lib/assetUrl'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface TimelineNodeProps {
  chapter: YearChapter
  index: number
  isActive?: boolean
  isVisited?: boolean
}

const ease = EASE.cinema

export function TimelineNode({ chapter, index, isActive = false, isVisited = false }: TimelineNodeProps): ReactNode {
  const navigate = useNavigate()
  const prefersReduced = useReducedMotion()
  const previewMemory = MEMORIES.find((m) => m.id === chapter.memoryIds[0])
  // Prefer the curated memory's image when one exists, else fall back to the
  // year's hero photo so every timeline row gets a thumbnail.
  const thumbnailSrc = previewMemory?.imageUrl ?? chapter.heroPhoto

  // Stagger children sequentially so the row "assembles" nicely
  const baseDelay = 0.7 + index * 0.08

  return (
    <motion.div
      className="flex items-center gap-3 sm:gap-4 cursor-pointer group tap-press"
      data-ripple
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: baseDelay, ease }}
      whileHover="hover"
      onClick={() => navigate(`/year/${chapter.year}`)}
    >
      {/* Year number — fades in from the left */}
      <motion.div
        className="w-12 sm:w-16 text-right shrink-0"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: baseDelay, ease }}
      >
        <p
          className="font-serif font-light"
          style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
            color: isActive ? 'var(--color-amber-light)' : isVisited ? 'var(--color-amber)' : 'var(--color-cream-muted)',
            transition: 'color 0.3s',
          }}
        >
          {chapter.year}
        </p>
      </motion.div>

      {/* Dot + glow + connector */}
      <div className="flex flex-col items-center" style={{ minHeight: 60 }}>
        <motion.div
          className="relative"
          variants={{ hover: { scale: 1.35 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 18 }}
        >
          {/* Active year — pulsing beacon halo */}
          {isActive && !prefersReduced && (
            <motion.div
              className="absolute rounded-full"
              style={{
                top: '50%',
                left: '50%',
                width: 14,
                height: 14,
                marginTop: -7,
                marginLeft: -7,
                background: 'radial-gradient(circle, rgba(228,169,60,0.55) 0%, rgba(228,169,60,0) 70%)',
              }}
              animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
          )}

          {/* Core dot — pops in with a spring */}
          <motion.div
            className="relative w-3 h-3 rounded-full"
            style={{
              background: isActive ? 'var(--color-amber-light)' : isVisited ? 'var(--color-amber)' : 'var(--color-cinema-card)',
              border: `1.5px solid ${isActive ? 'var(--color-amber-light)' : 'var(--color-amber)'}`,
              boxShadow: isActive ? '0 0 16px rgba(228,169,60,0.8), 0 0 36px rgba(196,149,42,0.35)' : undefined,
              transition: 'all 0.3s',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: baseDelay + 0.05,
              times: [0, 0.55, 1],
              ease,
            }}
          />
        </motion.div>

        {/* Connector line segment to next node */}
        <motion.div
          className="w-px flex-1 mt-1"
          style={{ background: 'rgba(196,149,42,0.18)', minHeight: 32, transformOrigin: 'top' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.15, ease }}
        />
      </div>

      {/* Right: title + summary + thumbnail */}
      <motion.div
        className="flex-1 flex items-center justify-between pb-7"
        variants={{ hover: { x: 4 } }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {/* Title + summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: baseDelay + 0.12, ease }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(0.98rem, 2vw, 1.08rem)',
              color: 'var(--color-cream)',
              lineHeight: 1.2,
              transition: 'color 0.3s',
            }}
          >
            {chapter.title}
          </p>
          <p
            className="font-sans text-[0.66rem] mt-1 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--color-cream-muted)', opacity: 0.75, lineHeight: 1.5 }}
          >
            {chapter.summary.slice(0, 56)}{chapter.summary.length > 56 ? '…' : ''}
          </p>
        </motion.div>

        {/* Thumbnail — slides in from the right with delay */}
        {thumbnailSrc && (
          <motion.div
            className="shrink-0 overflow-hidden rounded-lg ml-2 sm:ml-3"
            style={{ width: 42, height: 42, border: '1px solid var(--color-amber-border)' }}
            initial={{ opacity: 0, x: 12, scale: 0.85 }}
            animate={{ opacity: 0.75, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: baseDelay + 0.2, ease }}
            variants={{ hover: { opacity: 1, scale: 1.08, rotate: -1 } }}
          >
            <img src={assetUrl(thumbnailSrc)} alt="" className="w-full h-full object-cover photo-grade" loading="lazy" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
