import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Place } from '@/types/section'
import { formatLong } from '@/lib/formatDate'
import { getPlacePhotos } from '@/lib/placePhotos'

interface PlaceCardProps {
  place: Place | null
  onClose: () => void
}

export function PlaceCard({ place, onClose }: PlaceCardProps): ReactNode {
  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="absolute"
          style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: 320, zIndex: 1000 }}
          initial={{ opacity: 0, scale: 0.88, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <PlaceCardInner place={place} onClose={onClose} key={place.id} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface PlaceCardInnerProps {
  place: Place
  onClose: () => void
}

function PlaceCardInner({ place, onClose }: PlaceCardInnerProps): ReactNode {
  const photos = getPlacePhotos(place)
  const [index, setIndex] = useState(0)
  const hasMany = photos.length > 1

  // Keyboard navigation
  useEffect(() => {
    if (!hasMany) return
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft')  setIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(photos.length - 1, i + 1))
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [hasMany, photos.length])

  const goPrev = (): void => setIndex((i) => Math.max(0, i - 1))
  const goNext = (): void => setIndex((i) => Math.min(photos.length - 1, i + 1))
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

  return (
    <div
      style={{
        background: 'rgba(24,18,10,0.96)',
        border: '1px solid var(--color-amber-border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card-lifted)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
      }}
    >
      {/* Photo gallery — swipeable */}
      {photos.length > 0 && (
        <div className="relative w-full overflow-hidden" style={{ height: 160, background: '#1a1410' }}>
          <motion.div
            className="absolute inset-0"
            drag={hasMany ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60 && hasNext) goNext()
              if (info.offset.x > 60 && hasPrev) goPrev()
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={photos[index]}
                src={photos[index]}
                alt={`${place.name} photo ${index + 1}`}
                className="w-full h-full object-cover photo-grade"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-x-0 bottom-0 pointer-events-none"
            style={{ height: '50%', background: 'linear-gradient(to top, rgba(24,18,10,0.85), transparent)' }}
            aria-hidden
          />

          {/* Prev / Next */}
          {hasMany && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={!hasPrev}
                aria-label="Previous photo"
                data-ripple
                className="absolute top-1/2 left-2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: 'rgba(10,8,6,0.7)',
                  border: '1px solid rgba(196,149,42,0.25)',
                  color: 'rgba(237,226,204,0.8)',
                  opacity: hasPrev ? 1 : 0.25,
                  cursor: hasPrev ? 'pointer' : 'default',
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!hasNext}
                aria-label="Next photo"
                data-ripple
                className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full"
                style={{
                  background: 'rgba(10,8,6,0.7)',
                  border: '1px solid rgba(196,149,42,0.25)',
                  color: 'rgba(237,226,204,0.8)',
                  opacity: hasNext ? 1 : 0.25,
                  cursor: hasNext ? 'pointer' : 'default',
                }}
              >
                <ChevronRight size={14} />
              </button>

              {/* Dot indicators */}
              <div
                className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 pointer-events-none"
                aria-hidden
              >
                {photos.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i === index ? 14 : 5,
                      height: 5,
                      borderRadius: 9999,
                      background: i === index ? 'var(--color-amber)' : 'rgba(196,149,42,0.4)',
                      transition: 'width 0.3s, background 0.3s',
                    }}
                  />
                ))}
              </div>

              {/* Photo count */}
              <span
                className="absolute top-2 left-2 font-sans"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(237,226,204,0.85)',
                  background: 'rgba(10,8,6,0.7)',
                  padding: '3px 8px',
                  borderRadius: 999,
                  border: '1px solid rgba(196,149,42,0.20)',
                }}
              >
                {index + 1} / {photos.length}
              </span>
            </>
          )}
        </div>
      )}

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <div>
            <p className="font-sans text-[0.6rem] uppercase tracking-[0.25em] flex items-center gap-1" style={{ color: 'var(--color-amber)', opacity: 0.8 }}>
              <MapPin size={9} /> {place.region}
            </p>
            <h3 className="font-serif text-xl mt-0.5" style={{ color: 'var(--color-cream)' }}>{place.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-ripple
            className="flex items-center justify-center w-7 h-7 rounded-full mt-0.5"
            style={{ background: 'rgba(40,28,14,0.8)', border: '1px solid rgba(196,149,42,0.2)', color: 'rgba(237,226,204,0.6)', flexShrink: 0 }}
          >
            <X size={12} />
          </button>
        </div>
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--color-cream-muted)' }}>{formatLong(place.dates)}</p>
        <p className="font-serif italic text-sm leading-relaxed" style={{ color: 'var(--color-cream-dim)' }}>{place.note}</p>
      </div>
    </div>
  )
}
