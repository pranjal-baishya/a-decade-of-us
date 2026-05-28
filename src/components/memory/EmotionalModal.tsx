import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import type { MemoryCard } from '@/types/section'
import { PLACES } from '@/data/places'
import { formatShort } from '@/lib/formatDate'
import { assetUrl } from '@/lib/assetUrl'

interface EmotionalModalProps {
  memory: MemoryCard | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

export function EmotionalModal({ memory, onClose, onPrev, onNext, hasPrev, hasNext }: EmotionalModalProps): ReactNode {
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {memory && (
        <ModalContent
          // Re-mount whenever the active memory changes — auto-resets zoom state
          key={memory.id}
          memory={memory}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </AnimatePresence>
  )
}

interface ModalContentProps {
  memory: MemoryCard
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
}

function ModalContent({ memory, onClose, onPrev, onNext, hasPrev, hasNext }: ModalContentProps): ReactNode {
  const [zoom, setZoom] = useState(1)
  const pinchRef  = useRef<number | null>(null)
  const zoomStart = useRef(1)
  const place = memory.placeId ? PLACES.find((p) => p.id === memory.placeId) : null
  const hasMeta = Boolean(memory.title || memory.description)

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const onTouchStart = (e: React.TouchEvent): void => {
    if (e.touches.length === 2) {
      const dx = e.touches[0]!.clientX - e.touches[1]!.clientX
      const dy = e.touches[0]!.clientY - e.touches[1]!.clientY
      pinchRef.current = Math.sqrt(dx * dx + dy * dy)
      zoomStart.current = zoom
    }
  }
  const onTouchMove = (e: React.TouchEvent): void => {
    if (e.touches.length === 2 && pinchRef.current !== null) {
      const dx = e.touches[0]!.clientX - e.touches[1]!.clientX
      const dy = e.touches[0]!.clientY - e.touches[1]!.clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const ratio = dist / pinchRef.current
      setZoom(Math.min(3, Math.max(1, zoomStart.current * ratio)))
    }
  }
  const onTouchEnd = (): void => {
    pinchRef.current = null
    if (zoom < 1.15) setZoom(1)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ padding: 'clamp(12px, 3vw, 28px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => { if (zoom === 1) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={memory.title || 'Memory'}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(8,6,4,0.92)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
        aria-hidden
      />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full flex flex-col overflow-hidden"
        style={{
          maxWidth: 560,
          maxHeight: '92dvh',
          background: 'var(--color-cinema-dark)',
          border: '1px solid var(--color-amber-border)',
          borderRadius: 18,
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 60px rgba(196,149,42,0.06)',
        }}
        initial={{ opacity: 0, scale: 0.92, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 14 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo — swipeable + pinch-zoomable. object-contain so portraits/landscapes both show fully. */}
        <motion.div
          className="relative w-full overflow-hidden flex items-center justify-center"
          style={{
            background: '#0c0907',
            // Use a generous aspect that fits most photos and keeps mobile usable;
            // object-contain lets the image fill height and letterbox horizontally.
            aspectRatio: '4 / 3',
            maxHeight: '62dvh',
            cursor: zoom > 1 ? 'grab' : 'default',
          }}
          drag={zoom === 1 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80 && hasNext) onNext?.()
            if (info.offset.x > 80 && hasPrev)  onPrev?.()
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {memory.imageUrl ? (
            <motion.img
              src={assetUrl(memory.imageUrl)}
              alt={memory.title}
              className="photo-grade"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                scale: zoom,
                transformOrigin: 'center',
                transition: zoom === 1 ? 'scale 0.3s ease' : 'none',
              }}
              data-cursor="heart"
              draggable={false}
            />
          ) : (
            <p className="font-serif text-2xl" style={{ color: 'rgba(196,149,42,0.3)' }}>
              {formatShort(memory.date)}
            </p>
          )}

          {/* Prev / Next photo arrows — overlaid on image */}
          {(hasPrev || hasNext) && zoom === 1 && (
            <>
              {hasPrev && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onPrev?.() }} aria-label="Previous" data-ripple
                  className="absolute top-1/2 -translate-y-1/2 left-3 flex items-center justify-center rounded-full"
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(10,8,6,0.7)',
                    border: '1px solid rgba(196,149,42,0.25)',
                    color: 'rgba(237,226,204,0.85)',
                    backdropFilter: 'blur(6px)',
                  }}>
                  <ChevronLeft size={18} />
                </button>
              )}
              {hasNext && (
                <button type="button" onClick={(e) => { e.stopPropagation(); onNext?.() }} aria-label="Next" data-ripple
                  className="absolute top-1/2 -translate-y-1/2 right-3 flex items-center justify-center rounded-full"
                  style={{
                    width: 38, height: 38,
                    background: 'rgba(10,8,6,0.7)',
                    border: '1px solid rgba(196,149,42,0.25)',
                    color: 'rgba(237,226,204,0.85)',
                    backdropFilter: 'blur(6px)',
                  }}>
                  <ChevronRight size={18} />
                </button>
              )}
            </>
          )}
        </motion.div>

        {/* Meta — only rendered when we have prose, otherwise show a thin date strip */}
        {hasMeta ? (
          <div style={{ padding: '20px 22px 22px' }}>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <p className="font-sans uppercase" style={{ color: 'var(--color-amber)', fontSize: '0.62rem', letterSpacing: '0.25em', opacity: 0.85 }}>
                {formatShort(memory.date)}
              </p>
              {place && (
                <span className="flex items-center gap-1 font-sans" style={{ color: 'var(--color-cream-muted)', fontSize: '0.62rem', letterSpacing: '0.05em' }}>
                  <MapPin size={10} />
                  {place.name}
                </span>
              )}
            </div>
            {memory.title && (
              <h3 className="font-serif" style={{ color: 'var(--color-cream)', fontSize: '1.15rem', lineHeight: 1.25, marginBottom: 8 }}>
                {memory.title}
              </h3>
            )}
            {memory.description && (
              <p className="font-serif" style={{ color: 'var(--color-cream-dim)', fontSize: '0.9rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                {memory.description}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2" style={{ padding: '14px 18px 16px' }}>
            <p className="font-sans uppercase" style={{ color: 'var(--color-amber)', fontSize: '0.6rem', letterSpacing: '0.28em', opacity: 0.8 }}>
              {formatShort(memory.date)}
            </p>
            {place && (
              <span className="flex items-center gap-1 font-sans" style={{ color: 'var(--color-cream-muted)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                <MapPin size={9} />
                {place.name}
              </span>
            )}
          </div>
        )}

        {/* Close */}
        <button type="button" onClick={onClose} aria-label="Close" data-ripple
          className="absolute flex items-center justify-center rounded-full"
          style={{
            top: 12, right: 12,
            width: 34, height: 34,
            background: 'rgba(10,8,6,0.78)',
            border: '1px solid rgba(196,149,42,0.25)',
            color: 'rgba(237,226,204,0.85)',
            backdropFilter: 'blur(6px)',
          }}>
          <X size={15} />
        </button>
      </motion.div>
    </motion.div>
  )
}
