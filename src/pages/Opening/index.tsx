import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { useDaysCounter } from '@/hooks/useDaysCounter'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { COUPLE } from '@/data/couple'

const ease = [0.16, 1, 0.3, 1] as const

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5)  return 'Good night,'
  if (h < 12) return 'Good morning,'
  if (h < 17) return 'Good afternoon,'
  if (h < 21) return 'Good evening,'
  return 'Good night,'
}

export function OpeningPage(): ReactNode {
  const navigate = useNavigate()
  const { years, totalDays } = useDaysCounter()
  const animatedDays = useAnimatedCounter(totalDays, 1800, 2400)
  const greeting = getGreeting()
  const letters = COUPLE.partnerB.split('')

  return (
    <PageShell>
      <div className="min-h-dvh flex flex-col items-center justify-center px-6 py-16 text-center">

        {/* Time-of-day greeting */}
        <motion.p
          className="font-sans mb-1"
          style={{ color: 'rgba(196,149,42,0.45)', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          {greeting}
        </motion.p>

        {/* Her name typed letter-by-letter */}
        <div className="flex justify-center mb-7" aria-label={COUPLE.partnerB}>
          {letters.map((char, i) => (
            <motion.span
              key={i}
              className="romantic-line"
              style={{
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                color: 'var(--color-amber)',
                lineHeight: 1,
                display: 'inline-block',
                whiteSpace: 'pre',
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.3 + i * 0.06 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Eyebrow */}
        <motion.p
          className="font-sans tracking-[0.45em] uppercase mb-6"
          style={{ color: 'var(--color-amber)', fontSize: '0.68rem', opacity: 0.8 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.3 + letters.length * 0.06 + 0.2 }}
        >
          {COUPLE.partnerA} & {COUPLE.partnerB}
        </motion.p>

        {/* Main headline — split word-by-word */}
        <h1
          className="font-serif mb-5 text-center"
          style={{
            fontSize: 'clamp(2.8rem, 10vw, 6rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            color: 'var(--color-cream)',
            textShadow: '0 0 80px rgba(196,149,42,0.2)',
            letterSpacing: '-0.01em',
          }}
        >
          <SplitHeadline text="Ten Years." delay={1.0} />
          <br />
          <SplitHeadline
            text="Thousands of memories."
            delay={1.35}
            className="romantic-line"
            style={{ color: 'rgba(237,226,204,0.75)', fontSize: '0.75em' }}
          />
          <br />
          <SplitHeadline text="One beautiful story." delay={1.7} />
        </h1>

        {/* Thin gold rule */}
        <motion.div
          className="mb-5"
          style={{ height: 1, width: 80, background: 'linear-gradient(to right, transparent, rgba(196,149,42,0.55), transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease, delay: 1.9 }}
        />

        {/* Days counter */}
        <motion.p
          className="font-sans mb-10"
          style={{ color: 'var(--color-amber)', fontSize: '0.78rem', letterSpacing: '0.2em', opacity: 0.75 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 0.9, ease, delay: 2.2 }}
        >
          {years} year{years !== 1 ? 's' : ''} · {animatedDays} days
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 2.5 }}
        >
          <PrimaryButton size="lg" onClick={() => navigate('/timeline')}>
            Begin Our Journey
          </PrimaryButton>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3.5, duration: 1 }}
          aria-hidden
        >
          <motion.div
            className="w-px h-7"
            style={{ background: 'rgba(196,149,42,0.5)' }}
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </PageShell>
  )
}
