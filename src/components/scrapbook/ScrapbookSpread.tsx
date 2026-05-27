import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { MemoryCard } from '@/types/section'
import { PolaroidPhoto } from './PolaroidPhoto'
import { HandwrittenCaption } from './HandwrittenCaption'
import { DriedFloral } from './DriedFloral'
import { FiligreeCorner } from './FiligreeCorner'

interface ScrapbookSpreadProps {
  memories: MemoryCard[]
  onCardClick?: (memory: MemoryCard) => void
  /** Stagger each spread's entry animation */
  spreadIndex?: number
}

/** Per-photo slot: rotation, washi tape position, caption label */
interface Slot {
  rotate: number
  tape: 'top' | 'corners' | 'top-left' | 'top-right'
  captionIndex: number  // which of the captions array to show nearby
  captionSide: 'left' | 'right' | 'none'
  captionRotate: number
}

/** Fixed slot configurations per spread pattern (up to 5 slots) */
const SLOT_PATTERNS: Slot[][] = [
  // 1 photo
  [{ rotate: 2, tape: 'top', captionIndex: 0, captionSide: 'right', captionRotate: -3 }],
  // 2 photos
  [
    { rotate: -5, tape: 'corners', captionIndex: 0, captionSide: 'right', captionRotate: -4 },
    { rotate: 4,  tape: 'top',     captionIndex: 1, captionSide: 'none',  captionRotate: 0  },
  ],
  // 3 photos
  [
    { rotate: -6, tape: 'corners',   captionIndex: 0, captionSide: 'left',  captionRotate: -6 },
    { rotate: 2,  tape: 'top',       captionIndex: 1, captionSide: 'right', captionRotate: 3  },
    { rotate: -3, tape: 'top-right', captionIndex: 2, captionSide: 'none',  captionRotate: 0  },
  ],
  // 4 photos
  [
    { rotate: -7, tape: 'corners',   captionIndex: 0, captionSide: 'left',  captionRotate: -5 },
    { rotate: 4,  tape: 'top',       captionIndex: 1, captionSide: 'right', captionRotate: 2  },
    { rotate: -3, tape: 'top-left',  captionIndex: 2, captionSide: 'none',  captionRotate: 0  },
    { rotate: 6,  tape: 'top-right', captionIndex: 3, captionSide: 'left',  captionRotate: -3 },
  ],
  // 5 photos (full spread)
  [
    { rotate: -8, tape: 'corners',   captionIndex: 0, captionSide: 'left',  captionRotate: -6 },
    { rotate: 3,  tape: 'top',       captionIndex: 1, captionSide: 'right', captionRotate: 3  },
    { rotate: -4, tape: 'top-left',  captionIndex: 2, captionSide: 'none',  captionRotate: 0  },
    { rotate: 7,  tape: 'top-right', captionIndex: 3, captionSide: 'none',  captionRotate: 0  },
    { rotate: -2, tape: 'top',       captionIndex: 4, captionSide: 'right', captionRotate: -4 },
  ],
]

/** Short handwritten caption text pulled from memory title */
function toShortCaption(title: string): string {
  const words = title.trim().split(' ')
  return words.slice(0, 3).join(' ')
}

const SPREAD_SIZE = 5  // photos per spread

/** Splits memories into chunks of SPREAD_SIZE */
function chunkMemories(memories: MemoryCard[]): MemoryCard[][] {
  const chunks: MemoryCard[][] = []
  for (let i = 0; i < memories.length; i += SPREAD_SIZE) {
    chunks.push(memories.slice(i, i + SPREAD_SIZE))
  }
  return chunks
}

function SingleSpread({ memories, onCardClick, index }: { memories: MemoryCard[]; onCardClick?: (m: MemoryCard) => void; index: number }): ReactNode {
  const count = Math.min(memories.length, 5)
  const slots = SLOT_PATTERNS[count - 1] ?? SLOT_PATTERNS[4]!
  const baseDelay = index * 0.1

  return (
    <div className="relative w-full" style={{ minHeight: 280 }}>
      {/* Photo grid — varying columns by count */}
      <div
        className="relative flex flex-wrap gap-4 justify-center items-start"
        style={{ paddingTop: 16, paddingBottom: 24 }}
      >
        {memories.slice(0, count).map((mem, i) => {
          const slot = slots[i]!
          return (
            <div key={mem.id} className="relative" style={{ flexShrink: 0 }}>
              {/* Floating caption beside photo */}
              {slot.captionSide !== 'none' && (
                <HandwrittenCaption
                  rotate={slot.captionRotate}
                  color="gold"
                  size="xs"
                  delay={baseDelay + 0.2 + i * 0.08}
                  style={{
                    position: 'absolute',
                    [slot.captionSide === 'left' ? 'right' : 'left']: 'calc(100% + 6px)',
                    top: '30%',
                    width: 80,
                    textAlign: slot.captionSide === 'left' ? 'right' : 'left',
                    zIndex: 5,
                    pointerEvents: 'none',
                  }}
                >
                  {toShortCaption(mem.title)}
                </HandwrittenCaption>
              )}

              <PolaroidPhoto
                src={mem.imageUrl}
                alt={mem.title}
                caption={count <= 3 ? toShortCaption(mem.title) : undefined}
                date={mem.date}
                rotate={slot.rotate}
                size={count <= 2 ? 'md' : 'sm'}
                tape={slot.tape}
                tapeColor="gold"
                onClick={() => onCardClick?.(mem)}
                delay={baseDelay + 0.1 + i * 0.07}
                data-cursor="heart"
              />
            </div>
          )
        })}
      </div>

      {/* Gold star scatter */}
      {[...Array(3)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            top: `${20 + i * 28}%`,
            [i % 2 === 0 ? 'left' : 'right']: `${5 + i * 3}%`,
            color: 'rgba(196,149,42,0.35)',
            fontSize: '0.6rem',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: baseDelay + 0.6 + i * 0.1 }}
          aria-hidden
        >
          ✦
        </motion.span>
      ))}
    </div>
  )
}

/** Thin divider between spreads */
function SpreadDivider({ label }: { label?: string }): ReactNode {
  return (
    <div className="flex items-center gap-4 py-4" aria-hidden>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,149,42,0.25))' }} />
      <DriedFloral variant={2} size={24} opacity={0.45} />
      {label && (
        <span
          className="handwriting-casual"
          style={{ color: 'rgba(196,149,42,0.45)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}
        >
          {label}
        </span>
      )}
      <DriedFloral variant={2} size={24} opacity={0.45} rotate={180} />
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,149,42,0.25))' }} />
    </div>
  )
}

/**
 * Full scrapbook spread section.
 * Splits memories into groups of 5, each group gets its own SingleSpread.
 * Spreads are separated by floral dividers.
 * The last spread always gets the FiligreeCorner + DriedFloral accents.
 */
export function ScrapbookSpread({ memories, onCardClick, spreadIndex = 0 }: ScrapbookSpreadProps): ReactNode {
  if (memories.length === 0) return null

  const chunks = chunkMemories(memories)

  return (
    <div className="relative w-full">
      {chunks.map((chunk, i) => (
        <div key={i}>
          <SingleSpread
            memories={chunk}
            onCardClick={onCardClick}
            index={spreadIndex + i}
          />
          {i < chunks.length - 1 && (
            <SpreadDivider label="more memories" />
          )}
        </div>
      ))}

      {/* Decorative bottom accents on the last spread */}
      <div className="flex justify-between items-end px-2 pt-2 pointer-events-none" aria-hidden>
        <DriedFloral variant={1} size={40} rotate={-12} opacity={0.4} />
        <FiligreeCorner corner="bottom-right" size={52} opacity={0.4} />
      </div>
    </div>
  )
}
