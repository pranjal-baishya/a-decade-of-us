import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Message } from '@/types/section'
import { COUPLE } from '@/data/couple'
import { formatLong } from '@/lib/formatDate'

interface MessageBubbleProps {
  message: Message
  index: number
}

export function MessageBubble({ message, index }: MessageBubbleProps): ReactNode {
  const isA = message.sender === 'A'
  const name = isA ? COUPLE.partnerA : COUPLE.partnerB

  return (
    <motion.div
      className={`flex flex-col gap-2 ${isA ? 'items-start' : 'items-end'}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
    >
      <p className="font-sans text-[0.58rem] uppercase tracking-[0.18em]" style={{ color: 'var(--color-amber)', opacity: 0.65 }}>
        {name} · {formatLong(message.date)}
      </p>
      <div
        className="max-w-[85%] px-6 py-4 rounded-2xl"
        style={{
          background: isA
            ? 'linear-gradient(135deg, rgba(30,22,12,0.95), rgba(36,26,14,0.95))'
            : 'linear-gradient(135deg, rgba(40,28,14,0.95), rgba(50,34,16,0.95))',
          border: `1px solid ${isA ? 'rgba(196,149,42,0.18)' : 'rgba(196,149,42,0.28)'}`,
          borderRadius: isA ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}
      >
        <p className="font-serif italic" style={{ color: 'var(--color-cream)', fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: 1.7 }}>
          {message.text}
        </p>
      </div>
    </motion.div>
  )
}
