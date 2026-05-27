import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { useDaysCounter } from '@/hooks/useDaysCounter'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { COUPLE } from '@/data/couple'
import { MEMORIES } from '@/data/memories'

export function EndingPage(): ReactNode {
  const navigate = useNavigate()
  const { years, totalDays } = useDaysCounter()
  const animatedDays     = useAnimatedCounter(totalDays,        1600, 1600)
  const animatedMemories = useAnimatedCounter(MEMORIES.length, 1000, 1900)

  return (
    <PageShell>
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Rising amber particles unique to the Ending page */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }} aria-hidden>
          {Array.from({ length: 18 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                background: 'rgba(196,149,42,0.55)',
                left: `${8 + (i * 5.2) % 86}%`,
                bottom: '0',
              }}
              animate={{
                y: [0, -(300 + (i % 5) * 80)],
                opacity: [0.5, 0.8, 0],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                ease: 'easeOut',
                repeat: Infinity,
                delay: (i * 0.7) % 8,
              }}
            />
          ))}
        </div>

        {/* Eyebrow */}
        <motion.p
          className="font-sans tracking-[0.42em] uppercase mb-8"
          style={{ color: 'var(--color-amber)', fontSize: '0.68rem', opacity: 0.75 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.75, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {COUPLE.partnerA} & {COUPLE.partnerB}
        </motion.p>

        {/* Closing headline — split */}
        <h1
          className="font-serif mb-6 text-center"
          style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: 'var(--color-cream)',
            textShadow: '0 0 60px rgba(196,149,42,0.18)',
            maxWidth: '92vw',
            wordBreak: 'break-word',
          }}
        >
          <SplitHeadline text="A decade down." delay={0.5} />
          <br />
          <SplitHeadline
            text="Forever to go."
            delay={0.85}
            className="romantic-line"
            style={{ color: 'rgba(196,149,42,0.8)' }}
          />
        </h1>

        {/* Days counter */}
        <motion.p
          className="font-sans mb-6"
          style={{ color: 'var(--color-amber)', fontSize: '0.78rem', letterSpacing: '0.2em', opacity: 0.65 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 0.9, delay: 1.4 }}
        >
          {years} year{years !== 1 ? 's' : ''} · {animatedDays} days
        </motion.p>

        {/* Stats scoreboard */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.6 }}
        >
          <div
            className="inline-flex items-center gap-5 px-6 py-3 rounded-full font-sans"
            style={{
              background: 'rgba(20,15,10,0.7)',
              border: '1px solid var(--color-blush-border)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 0 28px rgba(196,128,110,0.08)',
            }}
          >
            {[
              { value: animatedDays,     label: 'days'     },
              { value: animatedMemories, label: 'memories' },
              { value: '1',              label: 'you'      },
            ].map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span
                  className="font-serif"
                  style={{ color: i === 2 ? 'var(--color-blush)' : 'var(--color-amber)', fontSize: '1.15rem', lineHeight: 1.1 }}
                >
                  {stat.value}
                </span>
                <span
                  className="font-sans uppercase"
                  style={{ color: 'var(--color-cream-muted)', fontSize: '0.52rem', letterSpacing: '0.18em', marginTop: 2 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
        >
          <PrimaryButton size="lg" onClick={() => navigate('/')}>
            Replay Our Journey
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/timeline')}>
            Browse Memories
          </SecondaryButton>
        </motion.div>

        {/* Heart */}
        <motion.p
          className="font-serif mt-14 text-4xl"
          data-cursor="heart"
          style={{ color: 'rgba(196,149,42,0.35)' }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          ♡
        </motion.p>
      </div>
    </PageShell>
  )
}
