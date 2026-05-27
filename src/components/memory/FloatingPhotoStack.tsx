import { useState, useMemo, type ReactNode } from 'react'
import type { MemoryCard } from '@/types/section'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { formatShort } from '@/lib/formatDate'
import { PolaroidPhoto } from '@/components/scrapbook/PolaroidPhoto'
import { DriedFloral } from '@/components/scrapbook/DriedFloral'

interface FloatingPhotoStackProps {
  memories: MemoryCard[]
  onCardClick?: (memory: MemoryCard) => void
}

/** Number of photos used to outline the heart. */
const HEART_COUNT = 14

interface HeartSlot {
  xPct: number
  yPct: number
  rotate: number
  zIndex: number
}

/**
 * Compute N points UNIFORMLY SPACED along the parametric heart curve:
 *   x(t) = 16 sin³(t)
 *   y(t) = -(13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t))
 *
 * Sampling t evenly produces UNEVEN spatial spacing because the curve moves
 * at different speeds at different angles (slow through the notch, fast on
 * the sides). To get truly uniform spacing along the heart outline, we
 * sample the curve densely, compute cumulative arc length, and then pick
 * N points at equal arc-length intervals.
 */
function computeHeartPositions(count: number): HeartSlot[] {
  const DENSE = 2000
  // Densely sample the curve
  const dense: Array<{ t: number; x: number; y: number }> = []
  for (let i = 0; i <= DENSE; i++) {
    const t = (i / DENSE) * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    dense.push({ t, x, y })
  }

  // Cumulative arc length array
  const arcLen: number[] = [0]
  for (let i = 1; i <= DENSE; i++) {
    const dx = dense[i]!.x - dense[i - 1]!.x
    const dy = dense[i]!.y - dense[i - 1]!.y
    arcLen.push(arcLen[i - 1]! + Math.sqrt(dx * dx + dy * dy))
  }
  const totalLen = arcLen[DENSE]!

  // For each photo, find the dense index whose cumulative arc length matches
  // a uniform fraction of the total perimeter.
  // Phase offset (0.5/count) puts photos in the gaps between equal arc segments
  // so the lobe peaks and bottom point are symmetric and the notch is centered.
  const positions: HeartSlot[] = []
  const phase = 0.5 / count
  for (let j = 0; j < count; j++) {
    const targetLen = ((j / count) + phase) * totalLen
    // Binary search for first index where arcLen >= targetLen
    let lo = 0
    let hi = DENSE
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (arcLen[mid]! < targetLen) lo = mid + 1
      else hi = mid
    }
    const { t, x, y } = dense[lo]!

    // Map heart curve x ∈ [-16, 16] → xPct ∈ [16, 84]
    // Map heart curve y ∈ [-12, 17] → yPct ∈ [14, 90]
    const xPct = 16 + ((x + 16) / 32) * 68
    const yPct = 14 + ((y + 12) / 29) * 76

    const rotate = Math.sin(t * 1.5) * 5
    const zIndex = 2 + Math.round(yPct / 12)

    positions.push({ xPct, yPct, rotate, zIndex })
  }
  return positions
}

const HEART_POSITIONS = computeHeartPositions(HEART_COUNT)

export function FloatingPhotoStack({ memories, onCardClick }: FloatingPhotoStackProps): ReactNode {
  const prefersReduced = useReducedMotion()
  const [lifted, setLifted] = useState<number | null>(null)

  const items = useMemo(() => {
    if (memories.length === 0) return []
    return Array.from({ length: HEART_COUNT }, (_, i) => memories[i % memories.length]!)
  }, [memories])

  return (
    <div
      className="relative w-full mx-auto"
      style={{ aspectRatio: '4 / 4.8', maxWidth: 460 }}
    >
      {/* Subtle blush halo behind the heart */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '5% 4%',
          background: 'radial-gradient(ellipse 60% 55% at 50% 54%, rgba(196,128,110,0.08) 0%, transparent 65%)',
          filter: 'blur(10px)',
        }}
        aria-hidden
      />

      {items.map((mem, i) => {
        const slot = HEART_POSITIONS[i]!
        const isLifted = lifted === i
        const TAPE_VARIANTS: Array<'top' | 'top-left' | 'top-right' | 'corners'> = ['top', 'top-left', 'top-right', 'corners', 'top']
        const tapeVariant = TAPE_VARIANTS[i % TAPE_VARIANTS.length]!

        return (
          <div
            key={`slot-${i}`}
            className="absolute"
            style={{
              left: `${slot.xPct}%`,
              top:  `${slot.yPct}%`,
              width: '22%',
              transform: 'translate(-50%, -50%)',
              zIndex: isLifted ? 50 : slot.zIndex,
            }}
          >
            <PolaroidPhoto
              src={mem.imageUrl}
              alt={mem.title}
              date={formatShort(mem.date)}
              rotate={isLifted ? slot.rotate * 0.2 : slot.rotate}
              size="xs"
              tape={tapeVariant}
              tapeColor="gold"
              delay={0.4 + i * 0.05}
              noHover={prefersReduced}
              onClick={() => {
                setLifted(i)
                onCardClick?.(mem)
              }}
              data-cursor="heart"
            />
          </div>
        )
      })}

      {/* Dried floral accents at bottom of heart */}
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '2%', left: '12%' }}
        aria-hidden
      >
        <DriedFloral variant={1} size={34} rotate={-15} opacity={0.45} />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{ bottom: '2%', right: '12%' }}
        aria-hidden
      >
        <DriedFloral variant={3} size={30} rotate={20} opacity={0.4} />
      </div>
    </div>
  )
}

