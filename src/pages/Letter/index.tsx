import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { LetterPaper } from '@/components/letter/LetterPaper'
import { LETTER } from '@/data/letter'
import { COUPLE } from '@/data/couple'
import { useReadingMode } from '@/hooks/useReadingMode'
import { ScrollHint } from '@/components/ui/ScrollHint'

export function LetterPage(): ReactNode {
  const { isReading, toggle } = useReadingMode()

  return (
    <PageShell backTo="/little-things" backLabel="Little Things" continueTo="/promises" continueLabel="My Promises →">
      {/* Ambient lamp-light glow from bottom */}
      <div
        className="fixed bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: '35dvh',
          background: 'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(196,149,42,0.06) 0%, transparent 70%)',
          zIndex: 2,
        }}
        aria-hidden
      />

      <ScrollHint />

      {/* Reading mode dim overlay */}
      {isReading && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ background: 'rgba(5,4,3,0.65)', zIndex: 5, backdropFilter: 'blur(2px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden
        />
      )}

      {/* Focus toggle */}
      <button
        type="button"
        onClick={toggle}
        className="fixed z-50 font-sans uppercase"
        style={{
          top: 18,
          right: 18,
          padding: '7px 14px',
          fontSize: '0.6rem',
          letterSpacing: '0.18em',
          borderRadius: 999,
          background: isReading ? 'rgba(196,149,42,0.22)' : 'rgba(15,12,9,0.55)',
          border: `1px solid rgba(196,149,42,${isReading ? 0.55 : 0.20})`,
          color: 'var(--color-amber)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'pointer',
          transition: 'background 0.3s, border-color 0.3s',
        }}
        data-ripple
        aria-label={isReading ? 'Exit focus mode' : 'Enter focus mode'}
      >
        {isReading ? '✦ Focus' : '○ Focus'}
      </button>

      <div className="page-content" style={{ position: 'relative', zIndex: isReading ? 6 : undefined }}>
        <div className="page-content-inner" style={{ maxWidth: 520 }}>
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="font-sans uppercase mb-3"
              style={{ color: 'var(--color-amber)', fontSize: '0.68rem', opacity: 0.8, letterSpacing: '0.38em' }}
            >
              A letter from my heart
            </p>
            <p
              className="font-serif italic"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', color: 'var(--color-cream)' }}
            >
              For {COUPLE.partnerB}
            </p>
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, fontSize: isReading ? '110%' : '100%' }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <LetterPaper content={LETTER} />
          </motion.div>
        </div>
      </div>
    </PageShell>
  )
}
