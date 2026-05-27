import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { MemoryCard as MemoryCardType } from '@/types/section'

type CardVariant = 'polaroid' | 'framed' | 'filmstrip' | 'pinned'

interface MemoryCardProps {
  memory: MemoryCardType
  variant?: CardVariant
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  rotation?: number
  style?: React.CSSProperties
  className?: string
}

function PhotoPlaceholder({ title, date }: { title: string; date: string }): ReactNode {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2"
      style={{ background: 'linear-gradient(135deg, #1a1410 0%, #241c14 100%)' }}
    >
      <div style={{ width: 28, height: 28, opacity: 0.25 }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-amber)' }}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      <p className="font-serif text-xs text-center px-2" style={{ color: 'rgba(196,149,42,0.45)', lineHeight: 1.3 }}>{date}</p>
      <p className="font-sans text-[0.6rem] text-center px-2 truncate w-full" style={{ color: 'rgba(237,226,204,0.3)' }}>{title}</p>
    </div>
  )
}

export function MemoryCard({
  memory,
  variant = 'framed',
  size = 'md',
  onClick,
  rotation = 0,
  style,
  className = '',
}: MemoryCardProps): ReactNode {
  const sizeMap = { sm: { w: 120, h: 145 }, md: { w: 160, h: 195 }, lg: { w: 220, h: 270 } }
  const dim = sizeMap[size]

  if (variant === 'polaroid') {
    return (
      <motion.div
        onClick={onClick}
        className={`relative shrink-0 cursor-pointer select-none tap-press ${className}`}
        style={{
          width: dim.w,
          height: dim.h + 36,
          background: '#f5f0e8',
          borderRadius: 4,
          transform: `rotate(${rotation}deg)`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
          padding: '8px 8px 32px 8px',
          ...style,
        }}
        whileHover={{ y: -6, rotate: rotation * 0.7, boxShadow: '0 16px 48px rgba(0,0,0,0.7)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full overflow-hidden" style={{ background: '#c8b89a' }}>
          {memory.imageUrl ? (
            <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <PhotoPlaceholder title={memory.title} date={memory.date} />
          )}
        </div>
        <p
          className="absolute bottom-2 left-0 right-0 text-center font-serif italic text-[0.6rem]"
          style={{ color: '#7a6a50' }}
        >
          {memory.date}
        </p>
      </motion.div>
    )
  }

  // Default: framed card
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer tap-press ${className}`}
      style={{
        width: dim.w,
        height: dim.h,
        background: 'var(--color-cinema-card)',
        border: '1px solid var(--color-amber-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-card-lifted)', rotate: rotation * 0.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Photo area */}
      <div className="w-full overflow-hidden" style={{ height: '72%' }}>
        {memory.imageUrl ? (
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: 'scale(1.02)' }}
            loading="lazy"
          />
        ) : (
          <PhotoPlaceholder title={memory.title} date={memory.date} />
        )}
      </div>
      {/* Caption */}
      <div className="p-2.5">
        <p className="font-sans text-[0.58rem] uppercase tracking-[0.2em]" style={{ color: 'var(--color-amber)', opacity: 0.75 }}>
          {memory.date}
        </p>
        <p className="font-serif text-xs truncate mt-0.5" style={{ color: 'var(--color-cream-dim)' }}>
          {memory.title}
        </p>
      </div>
      {/* Gold rim hover */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(196,149,42,0.12)' }} aria-hidden />
    </motion.div>
  )
}
