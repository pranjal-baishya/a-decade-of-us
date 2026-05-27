import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { WashiTape } from '@/components/scrapbook/WashiTape'
import { LITTLE_THINGS } from '@/data/littleThings'
import {
  Music, Coffee, Laugh, Film, Tag, Calendar,
  Heart, Home, Moon, Star, Map, Camera,
  Smile, Gift, Sun, Cloud, Flame, BookOpen,
} from 'lucide-react'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  Music, Coffee, Laugh, Film, Tag, Calendar, Heart, Home, Moon,
  Star, Map, Camera, Smile, Gift, Sun, Cloud, Flame, BookOpen,
}

const ROTATIONS = [-2, 1, -1.5, 2.5, -2, 1.5, -1, 2, -2.5, 1]
const TAPE_POSITIONS: Array<'tl' | 'tr' | 'none'> = ['tl', 'none', 'tr', 'none', 'tl', 'tr', 'none', 'tl', 'tr', 'none']

function ThingCard({ iconName, label, detail, index }: { iconName: string; label: string; detail: string; index: number }): ReactNode {
  const Icon = ICON_MAP[iconName] ?? Star
  const rotate = ROTATIONS[index % ROTATIONS.length] ?? 0
  const tapePos = TAPE_POSITIONS[index % TAPE_POSITIONS.length]

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, rotate: rotate * 0.3, scale: 1.03, zIndex: 10 }}
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Washi tape accent */}
      {tapePos === 'tl' && (
        <WashiTape
          color="gold"
          rotate={-15}
          width={32}
          height={11}
          style={{ position: 'absolute', top: -6, left: 10, zIndex: 10 }}
        />
      )}
      {tapePos === 'tr' && (
        <WashiTape
          color="gold"
          rotate={18}
          width={28}
          height={11}
          style={{ position: 'absolute', top: -6, right: 10, zIndex: 10 }}
        />
      )}

      {/* Index card */}
      <div
        style={{
          background: 'var(--color-paper-cream)',
          borderRadius: 4,
          padding: '14px 14px 12px 14px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aged paper texture line at top (library card lines) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: 'var(--color-paper-aged)',
            opacity: 0.5,
          }}
          aria-hidden
        />
        {/* Faint horizontal rule lines (like ruled paper) */}
        {[28, 48, 68].map((top) => (
          <div
            key={top}
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top,
              height: 1,
              background: 'rgba(160,120,40,0.08)',
            }}
          />
        ))}

        {/* Card header */}
        <div className="flex items-center gap-2 mb-2 relative z-1">
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(160,120,40,0.15)',
              border: '1px solid rgba(160,120,40,0.30)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-ink-gold)',
            }}
          >
            <Icon size={12} strokeWidth={1.8} />
          </div>
          <p
            className="handwriting"
            style={{
              color: 'var(--color-ink-dark)',
              fontSize: '1.05rem',
              lineHeight: 1.1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </p>
        </div>

        {/* Card detail */}
        <p
          className="font-serif"
          style={{
            color: 'rgba(58,46,28,0.78)',
            fontSize: '0.7rem',
            lineHeight: 1.5,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {detail}
        </p>
      </div>
    </motion.div>
  )
}

export function LittleThingsPage(): ReactNode {
  return (
    <PageShell backTo="/places" backLabel="Places" continueTo="/letter" continueLabel="Read the Letter →">
      <div className="page-content velvet-bg">
        <div className="page-content-inner" style={{ maxWidth: 540, position: 'relative', zIndex: 1 }}>
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="The small details"
              title="Little Things About Us"
              subtitle="The tiny things that make us, us."
              align="center"
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-6" style={{ paddingBottom: 8 }}>
            {LITTLE_THINGS.map((thing, i) => (
              <ThingCard
                key={thing.id}
                iconName={thing.iconName}
                label={thing.label}
                detail={thing.detail}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
