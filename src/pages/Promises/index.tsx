import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { ScrollHint } from '@/components/ui/ScrollHint'
import { PROMISES } from '@/data/promises'
import { COUPLE } from '@/data/couple'
import { EASE } from '@/lib/motion'

const STORAGE_KEY = 'adou-sealed-promises'

function loadSealed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

function saveSealed(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    /* localStorage unavailable (private mode etc.) — silently ignore */
  }
}

interface PromiseCardProps {
  promise: typeof PROMISES[0]
  index: number
  sealed: boolean
  onSeal: (id: string) => void
}

function PromiseCard({ promise, index, sealed, onSeal }: PromiseCardProps): ReactNode {
  const handleTap = (): void => {
    if (sealed) return
    onSeal(promise.id)
    try {
      navigator.vibrate?.(20)
    } catch {
      /* haptic unavailable */
    }
  }

  return (
    <motion.div
      className="flex gap-5 items-start cursor-pointer tap-press"
      role="button"
      tabIndex={0}
      aria-label={sealed ? `Promise ${promise.number} sealed` : `Tap to seal promise ${promise.number}`}
      data-ripple
      data-ripple-color="blush"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE.cinema, delay: index * 0.08 }}
      onClick={handleTap}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleTap() }}
    >
      {/* Roman numeral circle */}
      <div
        className="shrink-0 relative flex items-center justify-center"
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: sealed ? 'rgba(196,128,110,0.20)' : 'rgba(196,128,110,0.08)',
          border: `1px solid ${sealed ? 'rgba(196,128,110,0.65)' : 'var(--color-blush-border)'}`,
          marginTop: 2,
          transition: 'background 0.4s ease, border-color 0.4s ease',
          boxShadow: sealed ? '0 0 12px rgba(196,128,110,0.25)' : undefined,
        }}
      >
        <span
          className="romantic-line"
          style={{
            color: sealed ? 'var(--color-blush-light)' : 'var(--color-blush)',
            fontSize: '0.85rem',
            lineHeight: 1,
            transition: 'color 0.3s ease',
          }}
        >
          {promise.number}
        </span>
      </div>

      {/* Promise text card */}
      <motion.div
        className="flex-1 p-5 rounded-xl"
        animate={sealed ? { borderColor: 'rgba(196,128,110,0.50)' } : undefined}
        style={{
          background: sealed
            ? 'linear-gradient(135deg, rgba(36,20,16,0.7), rgba(28,16,10,0.7))'
            : 'linear-gradient(135deg, rgba(32,24,16,0.6), rgba(24,18,10,0.6))',
          border: `1px solid ${sealed ? 'rgba(196,128,110,0.50)' : 'var(--color-blush-border)'}`,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          transition: 'border-color 0.4s ease, background 0.4s ease',
        }}
      >
        <p
          className="font-serif leading-relaxed"
          style={{
            color: 'var(--color-cream)',
            fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
            lineHeight: 1.65,
            whiteSpace: 'pre-line',
          }}
        >
          {promise.text}
        </p>
        {sealed ? (
          <motion.p
            className="romantic-line mt-2"
            style={{ color: 'rgba(196,128,110,0.65)', fontSize: '0.75rem' }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            ✦ Sealed with love
          </motion.p>
        ) : (
          <p className="font-sans mt-2" style={{ color: 'rgba(196,128,110,0.35)', fontSize: '0.6rem', letterSpacing: '0.12em' }}>
            Tap to seal
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

export function PromisesPage(): ReactNode {
  const [sealed, setSealed] = useState<Set<string>>(loadSealed)
  const allSealed = PROMISES.every((p) => sealed.has(p.id))

  const handleSeal = (id: string): void => {
    setSealed((prev) => {
      const next = new Set(prev)
      next.add(id)
      saveSealed(next)
      return next
    })
  }

  return (
    <PageShell
      backTo="/letter"
      backLabel="Letter"
      continueTo="/ending"
      continueLabel={allSealed ? 'Take me to the Ending →' : 'The Ending →'}
    >
      <ScrollHint />

      {/* Ambient blush glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(196,128,110,0.06) 0%, transparent 70%)',
          zIndex: 2,
        }}
        aria-hidden
      />

      <div className="page-content">
        <div className="page-content-inner relative" style={{ maxWidth: 520, zIndex: 3 }}>
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE.cinema }}
          >
            <p
              className="font-sans uppercase mb-3"
              style={{ color: 'var(--color-blush)', fontSize: '0.68rem', opacity: 0.8, letterSpacing: '0.38em' }}
            >
              For {COUPLE.partnerB}
            </p>
            <h1
              className="font-serif mb-4"
              style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 500, color: 'var(--color-cream)', lineHeight: 1.1 }}
            >
              <SplitHeadline text="My Promises" delay={0.4} />
            </h1>
            <motion.div
              style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(196,128,110,0.45), transparent)' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: EASE.cinema, delay: 0.5 }}
            />
          </motion.div>

          {/* Promises list */}
          <div className="flex flex-col gap-5">
            {PROMISES.map((promise, i) => (
              <PromiseCard
                key={promise.id}
                promise={promise}
                index={i}
                sealed={sealed.has(promise.id)}
                onSeal={handleSeal}
              />
            ))}
          </div>

          {/* Closing sentiment */}
          <motion.p
            className="romantic-line text-center mt-14"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: 'rgba(196,128,110,0.5)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Always yours, {COUPLE.partnerA}
          </motion.p>
        </div>
      </div>
    </PageShell>
  )
}
