import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { MemoryCard } from '@/types/section'
import { EASE } from '@/lib/motion'
import { formatShort } from '@/lib/formatDate'
import { assetUrl } from '@/lib/assetUrl'

interface MemoryGridProps {
  memories: MemoryCard[]
  onCardClick?: (memory: MemoryCard) => void
}

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.94, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
}

/**
 * An asymmetric editorial grid.
 * The first card is large (spans 2 columns), remaining are standard.
 * Cards stagger in like a film montage; hero card lands last.
 */
export function MemoryGrid({ memories, onCardClick }: MemoryGridProps): ReactNode {
  if (memories.length === 0) return null

  const [hero, ...rest] = memories

  return (
    <div className="w-full">
      <motion.div
        className="grid gap-2.5"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Hero card — spans 2 columns, 2 rows, lands last */}
        {hero && (
          <motion.div
            className="col-span-2 row-span-2 overflow-hidden cursor-pointer relative tap-press"
            data-ripple data-cursor="heart"
            style={{
              aspectRatio: '4/3',
              background: 'var(--color-cinema-card)',
              border: '1px solid var(--color-amber-border)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-card)',
              order: rest.length, // CSS order: renders after all rest cards so stagger hits it last
            }}
            variants={cardVariants}
            transition={{ duration: 0.7, ease: EASE.cinema }}
            whileHover={{ y: -3, boxShadow: 'var(--shadow-card-lifted)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCardClick?.(hero)}
          >
            {hero.imageUrl ? (
              <img src={assetUrl(hero.imageUrl)} alt={hero.title} className="w-full h-full object-cover photo-grade" loading="lazy" data-cursor="heart" />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1410 0%, #241c14 100%)' }}>
                <p className="font-serif text-sm" style={{ color: 'rgba(196,149,42,0.35)' }}>{hero.date}</p>
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 p-3" style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.85), transparent)' }}>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: 'var(--color-amber)', opacity: 0.8 }}>{formatShort(hero.date)}</p>
              <p className="font-serif text-sm" style={{ color: 'var(--color-cream)' }}>{hero.title}</p>
            </div>
          </motion.div>
        )}

        {/* Remaining cards */}
        {rest.map((mem) => (
          <motion.div
            key={mem.id}
            className="overflow-hidden cursor-pointer relative tap-press"
            data-ripple data-cursor="heart"
            style={{
              aspectRatio: '1/1',
              background: 'var(--color-cinema-card)',
              border: '1px solid var(--color-amber-border)',
              borderRadius: 8,
              boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
            variants={cardVariants}
            transition={{ duration: 0.5, ease: EASE.cinema }}
            whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,0,0,0.6)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onCardClick?.(mem)}
          >
            {mem.imageUrl ? (
              <img src={assetUrl(mem.imageUrl)} alt={mem.title} className="w-full h-full object-cover photo-grade" loading="lazy" data-cursor="heart" />
            ) : (
              <div className="w-full h-full flex items-end p-2" style={{ background: 'linear-gradient(135deg, #1a1410 0%, #201810 100%)' }}>
                <p className="font-serif text-xs" style={{ color: 'rgba(196,149,42,0.4)' }}>{mem.date}</p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
