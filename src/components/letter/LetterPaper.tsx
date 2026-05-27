import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { LetterContent } from '@/data/letter'
import { VoiceNote } from './VoiceNote'

interface LetterPaperProps {
  content: LetterContent
}

export function LetterPaper({ content }: LetterPaperProps): ReactNode {
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

        {/* Decorative opener — sweeps in like ink */}
        <motion.p
          className="romantic-line mb-6"
          style={{ color: 'rgba(196,149,42,0.55)', fontSize: '1rem', clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          My love,
        </motion.p>

        {/* Paragraphs — each sweeps in left-to-right like handwriting */}
        {content.paragraphs.map((para, i) => (
          <motion.p
            key={i}
            className="font-serif leading-relaxed mb-5"
            style={{
              color: 'var(--color-cream)',
              fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
              lineHeight: 1.75,
              clipPath: 'inset(0 100% 0 0)',
            }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {para}
          </motion.p>
        ))}

        {/* Signature */}
        <motion.div
          className="mt-8 border-t pt-6"
          style={{ borderColor: 'rgba(196,149,42,0.15)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: content.paragraphs.length * 0.08 + 0.3 }}
        >
          <motion.p
            className="romantic-line text-2xl"
            style={{ color: 'var(--color-amber)', opacity: 0.85, clipPath: 'inset(0 100% 0 0)' }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: content.paragraphs.length * 0.08 + 0.5 }}
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
