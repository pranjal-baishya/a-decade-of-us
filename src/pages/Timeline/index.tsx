import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { TimelineNode } from '@/components/timeline/TimelineNode'
import { YEARS } from '@/data/years'
import { COUPLE } from '@/data/couple'
import { EASE } from '@/lib/motion'

const ease = [0.16, 1, 0.3, 1] as const

export function TimelinePage(): ReactNode {
  const currentYear = new Date().getFullYear()

  return (
    <PageShell backTo="/" backLabel="Home" continueTo="/favorites" continueLabel="Continue the Story →">
      <div className="page-content">
        <div className="page-content-inner">
          <div className="mb-3 text-center">
            <motion.p
              className="font-sans uppercase mb-3"
              style={{ color: 'var(--color-amber)', fontSize: '0.68rem', opacity: 0.8, letterSpacing: '0.38em' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ duration: 0.7, ease: EASE.cinema }}
            >
              {COUPLE.partnerA} & {COUPLE.partnerB}
            </motion.p>
            <h1
              className="font-serif mb-3"
              style={{ fontSize: 'clamp(1.9rem, 6vw, 3rem)', fontWeight: 500, color: 'var(--color-cream)' }}
            >
              <SplitHeadline text="A Decade of Us" delay={0.3} />
            </h1>
            <motion.p
              className="font-sans text-center"
              style={{ color: 'var(--color-cream-muted)', fontSize: '0.85rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Tap any year to explore the memories from that chapter.
            </motion.p>
          </div>

          <motion.p
            className="font-sans mb-12 text-center"
            style={{ color: 'var(--color-cream-muted)', fontSize: '0.72rem', letterSpacing: '0.18em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            2016 — 2026 · 10 years
          </motion.p>

          {/* Timeline list */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Center vertical line — draws from top to bottom.
                Position tracks the dot column: mobile (w-12 + gap-3) vs sm:+ (w-16 + gap-4) */}
            <motion.div
              className="absolute left-[4.15rem] sm:left-[5.25rem] top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(196,149,42,0.18) 8%, rgba(196,149,42,0.18) 92%, transparent)',
                transformOrigin: 'top',
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.6, delay: 0.6, ease }}
              aria-hidden
            />

            <div className="flex flex-col">
              {YEARS.map((chapter, i) => (
                <TimelineNode
                  key={chapter.year}
                  chapter={chapter}
                  index={i}
                  isActive={chapter.year === currentYear}
                  isVisited={chapter.year < currentYear}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  )
}
