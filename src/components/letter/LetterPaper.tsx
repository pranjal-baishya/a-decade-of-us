import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { LetterContent } from '@/data/letter'
import { VoiceNote } from './VoiceNote'

interface LetterPaperProps {
  content: LetterContent
}

const ease = [0.16, 1, 0.3, 1] as const

export function LetterPaper({ content }: LetterPaperProps): ReactNode {
  // Sequence delays: opener → stanza 1 → 2 → … → signature
  const stanzaDelay = (i: number): number => 0.35 + i * 0.18
  const signatureDelay = stanzaDelay(content.paragraphs.length) + 0.1

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: 48 }}
    >
      {/* Paper glow effect from bottom (lamp light) */}
      <div
        className="absolute bottom-0 inset-x-8 pointer-events-none"
        style={{
          height: '40%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(196,149,42,0.08) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden
      />

      {/* Paper */}
      <div
        className="relative"
        style={{
          background: 'linear-gradient(170deg, #1e180e 0%, #1a1408 60%, #16110a 100%)',
          border: '1px solid rgba(196,149,42,0.22)',
          borderRadius: 12,
          padding: '2.5rem 2rem',
          boxShadow: '0 16px 60px rgba(0,0,0,0.7), 0 0 80px rgba(196,149,42,0.04)',
        }}
      >
        {/* Corner stain effects */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(196,149,42,0.04) 0%, transparent 80%)' }} aria-hidden />
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(196,149,42,0.03) 0%, transparent 80%)' }} aria-hidden />

        {/* Opener / title — fades in first */}
        <motion.p
          className="romantic-line mb-7 text-center"
          style={{
            color: 'rgba(196,149,42,0.75)',
            fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {content.opener}
        </motion.p>

        {/* Stanzas — each fades in below the previous one.
            white-space: pre-line preserves line breaks inside a stanza so
            multi-line poetry reads with the intended cadence. */}
        {content.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="font-serif leading-relaxed"
            style={{
              color: 'var(--color-cream)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              lineHeight: 1.85,
              whiteSpace: 'pre-line',
              marginBottom: '1.6rem',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: stanzaDelay(i) }}
          >
            {para}
          </motion.p>
        ))}

        {/* Signature */}
        <motion.div
          className="mt-8 border-t pt-6"
          style={{ borderColor: 'rgba(196,149,42,0.15)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: signatureDelay }}
        >
          <motion.p
            className="romantic-line text-2xl"
            style={{ color: 'var(--color-amber)', opacity: 0.85 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.9, ease, delay: signatureDelay + 0.15 }}
          >
            {content.signature}
          </motion.p>
        </motion.div>

        {/* Voice note */}
        {content.voiceNote && (
          <div className="mt-6">
            <VoiceNote audioUrl={content.voiceNote.audioUrl} label={content.voiceNote.label} />
          </div>
        )}
      </div>
    </div>
  )
}
