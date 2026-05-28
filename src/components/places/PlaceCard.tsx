import { useState, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Place } from '@/types/section'
import { formatLong } from '@/lib/formatDate'
import { getPlacePhotos } from '@/lib/placePhotos'
import { assetUrl } from '@/lib/assetUrl'

interface PlaceCardProps {
  place: Place | null
  onClose: () => void
}

export function PlaceCard({ place, onClose }: PlaceCardProps): ReactNode {
  return (
    <AnimatePresence>
      {place && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 1000, padding: '24px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Dimmed backdrop — click to close */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(8,6,4,0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden
          />

          {/* Centered card */}
          <motion.div
            className="relative w-full"
            style={{ maxWidth: 540, maxHeight: '92dvh', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, scale: 0.92, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${place.name} details`}
          >
            <PlaceCardInner place={place} onClose={onClose} key={place.id} />
          </motion.div>
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

  // Keyboard: arrow nav + escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape')     onClose()
      if (!hasMany) return
      if (e.key === 'ArrowLeft')  setIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setIndex((i) => Math.min(photos.length - 1, i + 1))
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [hasMany, photos.length, onClose])

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const goPrev = (): void => setIndex((i) => Math.max(0, i - 1))
  const goNext = (): void => setIndex((i) => Math.min(photos.length - 1, i + 1))
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

  return (
    <div
      style={{
        background: 'var(--color-cinema-dark)',
        border: '1px solid var(--color-amber-border)',
        borderRadius: 18,
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(196,149,42,0.06)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
      }}
    >
      {/* Photo gallery — swipeable. object-contain so portraits and landscapes
          both show fully without cropping faces. */}
      {photos.length > 0 && (
        <div
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{
            background: '#0c0907',
            aspectRatio: '4 / 3',
            maxHeight: '58dvh',
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
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
                src={assetUrl(photos[index])}
                alt={`${place.name} photo ${index + 1}`}
                className="photo-grade"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
              />
            </AnimatePresence>
          </motion.div>

          {/* Prev / Next */}
          {hasMany && (
            <>
              <button
                type="button"
                onClick={goPrev}
                disabled={!hasPrev}
                aria-label="Previous photo"
                data-ripple
                className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center rounded-full"
                style={{
                  width: 38, height: 38,
                  background: 'rgba(10,8,6,0.72)',
                  border: '1px solid rgba(196,149,42,0.25)',
                  color: 'rgba(237,226,204,0.85)',
                  opacity: hasPrev ? 1 : 0.25,
                  cursor: hasPrev ? 'pointer' : 'default',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!hasNext}
                aria-label="Next photo"
                data-ripple
                className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center rounded-full"
                style={{
                  width: 38, height: 38,
                  background: 'rgba(10,8,6,0.72)',
                  border: '1px solid rgba(196,149,42,0.25)',
                  color: 'rgba(237,226,204,0.85)',
                  opacity: hasNext ? 1 : 0.25,
                  cursor: hasNext ? 'pointer' : 'default',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <ChevronRight size={18} />
              </button>

              {/* Dot indicators */}
              <div
                className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 pointer-events-none"
                aria-hidden
              >
                {photos.map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: i === index ? 16 : 5,
                      height: 5,
                      borderRadius: 9999,
                      background: i === index ? 'var(--color-amber)' : 'rgba(196,149,42,0.45)',
                      transition: 'width 0.3s, background 0.3s',
                    }}
                  />
                ))}
              </div>

              {/* Photo count */}
              <span
                className="absolute top-3 left-3 font-sans"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: 'rgba(237,226,204,0.9)',
                  background: 'rgba(10,8,6,0.72)',
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: '1px solid rgba(196,149,42,0.22)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {index + 1} / {photos.length}
              </span>
            </>
          )}
        </div>
      )}

      {/* Info */}
      <div style={{ padding: '20px 22px 22px' }}>
        <div className="flex items-center gap-2 mb-2">
          <p className="font-sans uppercase flex items-center gap-1.5" style={{ color: 'var(--color-amber)', fontSize: '0.62rem', letterSpacing: '0.25em', opacity: 0.85 }}>
            <MapPin size={10} /> {place.region}
          </p>
        </div>
        <h3 className="font-serif" style={{ color: 'var(--color-cream)', fontSize: '1.4rem', lineHeight: 1.15, marginBottom: 6, letterSpacing: '-0.005em' }}>
          {place.name}
        </h3>
        <p className="font-sans uppercase" style={{ color: 'var(--color-cream-muted)', fontSize: '0.62rem', letterSpacing: '0.18em', marginBottom: 12 }}>
          {formatLong(place.dates)}
        </p>
        <p className="font-serif italic" style={{ color: 'var(--color-cream-dim)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          {place.note}
        </p>
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        data-ripple
        className="absolute flex items-center justify-center rounded-full"
        style={{
          top: 12, right: 12,
          width: 34, height: 34,
          background: 'rgba(10,8,6,0.78)',
          border: '1px solid rgba(196,149,42,0.25)',
          color: 'rgba(237,226,204,0.85)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <X size={15} />
      </button>
    </div>
  )
}
