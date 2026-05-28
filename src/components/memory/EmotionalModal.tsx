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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => { if (zoom === 1) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,6,4,0.90)', backdropFilter: 'blur(18px)' }} aria-hidden />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full sm:max-w-sm flex flex-col overflow-hidden"
        style={{ maxHeight: '92dvh', background: 'var(--color-cinema-dark)', borderTop: '1px solid var(--color-amber-border)', borderRadius: '20px 20px 0 0' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo — swipeable + pinch-zoomable */}
        <motion.div
          className="w-full overflow-hidden"
          style={{ aspectRatio: '4/3', maxHeight: '55dvh', cursor: zoom > 1 ? 'grab' : 'default' }}
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
              className="w-full h-full object-cover photo-grade"
              style={{ scale: zoom, transformOrigin: 'center', transition: zoom === 1 ? 'scale 0.3s ease' : 'none' }}
              data-cursor="heart"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: '#1a1410' }}>
              <p className="font-serif text-2xl" style={{ color: 'rgba(196,149,42,0.3)' }}>{formatShort(memory.date)}</p>
            </div>
          )}
        </motion.div>

        {/* Swipe hint dots */}
        {(hasPrev || hasNext) && zoom === 1 && (
          <div className="absolute bottom-28 inset-x-0 flex justify-center gap-1.5 pointer-events-none" aria-hidden>
            {hasPrev && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(196,149,42,0.4)' }} />}
            <div className="w-4 h-1.5 rounded-full" style={{ background: 'rgba(196,149,42,0.75)' }} />
            {hasNext && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(196,149,42,0.4)' }} />}
          </div>
        )}

        {/* Meta */}
        <div className="p-5 pb-8">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-sans text-[0.62rem] tracking-[0.25em] uppercase" style={{ color: 'var(--color-amber)', opacity: 0.8 }}>
              {formatShort(memory.date)}
            </p>
            {place && (
              <span className="flex items-center gap-0.5 font-sans text-[0.6rem]" style={{ color: 'var(--color-cream-muted)' }}>
                <MapPin size={9} />
                {place.name}
              </span>
            )}
          </div>
          <h3 className="font-serif text-lg mb-1.5" style={{ color: 'var(--color-cream)' }}>{memory.title}</h3>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-cream-dim)', fontSize: '0.85rem' }}>{memory.description}</p>
        </div>

        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full" style={{ background: 'rgba(196,149,42,0.25)' }} />

        {/* Close */}
        <button type="button" onClick={onClose} aria-label="Close" data-ripple
          className="absolute top-3.5 right-3.5 flex items-center justify-center w-8 h-8 rounded-full"
          style={{ background: 'rgba(30,20,12,0.8)', border: '1px solid rgba(196,149,42,0.2)', color: 'rgba(237,226,204,0.6)' }}>
          <X size={14} />
        </button>

        {/* Prev/Next buttons */}
        {(hasPrev || hasNext) && zoom === 1 && (
          <div className="absolute top-1/3 inset-x-0 flex justify-between px-3 pointer-events-none">
            {hasPrev && (
              <button type="button" onClick={onPrev} aria-label="Previous" data-ripple
                className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: 'rgba(10,8,6,0.7)', border: '1px solid rgba(196,149,42,0.2)', color: 'rgba(237,226,204,0.7)' }}>
                <ChevronLeft size={16} />
              </button>
            )}
            <div className="flex-1" />
            {hasNext && (
              <button type="button" onClick={onNext} aria-label="Next" data-ripple
                className="pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: 'rgba(10,8,6,0.7)', border: '1px solid rgba(196,149,42,0.2)', color: 'rgba(237,226,204,0.7)' }}>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
