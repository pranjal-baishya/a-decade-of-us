import { useState, useEffect, type ReactNode } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { EmotionalModal } from '@/components/memory/EmotionalModal'
import { ScrapbookSpread } from '@/components/scrapbook/ScrapbookSpread'
import { VintageStamp } from '@/components/scrapbook/VintageStamp'
import { TicketStub, PassportStamp } from '@/components/scrapbook/TravelAccents'
import { TRAVEL_META } from '@/lib/travelMeta'
import { getYearBackground, BG_IMAGE, BG_OPACITY } from '@/lib/yearBackground'
import { YEARS } from '@/data/years'
import { MEMORIES } from '@/data/memories'
import { getPhotosByYear, type Photo } from '@/data/photoLibrary'
import { pickHighlights, HIGHLIGHTS_PER_YEAR } from '@/lib/photoHighlights'
import { formatPhotoDate } from '@/lib/formatDate'
import { assetUrl } from '@/lib/assetUrl'
import type { MemoryCard } from '@/types/section'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SplitHeadline } from '@/components/ui/SplitHeadline'

/**
 * Convert a Photo from the auto-generated library into a MemoryCard so it can
 * be rendered by ScrapbookSpread / EmotionalModal. If a curated MEMORIES entry
 * already references the same image, prefer that one — it carries the prose
 * (title + description) the user has hand-written.
 */
function photoToMemory(photo: Photo, curated: MemoryCard[]): MemoryCard {
  const matched = curated.find((m) => m.imageUrl === photo.src)
  if (matched) return matched
  return {
    id: photo.id,
    title: '',
    date: formatPhotoDate(photo),
    year: photo.year,
    description: '',
    imageUrl: photo.src,
    mediaType: 'photo',
  }
}

export function YearChapterPage(): ReactNode {
  const { year } = useParams<{ year: string }>()
  const navigate = useNavigate()
  const [activeMemory, setActiveMemory] = useState<MemoryCard | null>(null)
  const prefersReduced = useReducedMotion()
  const { scrollY } = useScroll()

  const yearNum   = parseInt(year ?? '2016', 10)
  const chapter   = YEARS.find((y) => y.year === yearNum)
  const yearIndex = YEARS.findIndex((y) => y.year === yearNum)
  const prevYear  = YEARS[yearIndex - 1]?.year
  const nextYear  = YEARS[yearIndex + 1]?.year

  const heroHeight    = 220
  const stickyOpacity = useTransform(scrollY, [heroHeight - 20, heroHeight + 40], [0, 1])
  const stickyY       = useTransform(scrollY, [heroHeight - 20, heroHeight + 40], [-8, 0])

  // Keyboard navigation between years
  useEffect(() => {
    const handler = (e: KeyboardEvent): void => {
      if (activeMemory) return
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowLeft'  && prevYear)  navigate(`/year/${prevYear}`)
      if (e.key === 'ArrowRight' && nextYear)  navigate(`/year/${nextYear}`)
      if (e.key === 'Escape') navigate('/timeline')
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [prevYear, nextYear, activeMemory, navigate])

  if (!chapter) {
    return (
      <PageShell backTo="/timeline" backLabel="Timeline">
        <div className="min-h-dvh flex items-center justify-center">
          <p className="font-serif text-lg" style={{ color: 'var(--color-cream-dim)' }}>Year not found.</p>
        </div>
      </PageShell>
    )
  }

  // Curated, prose-rich memories the user has hand-written for this year.
  const curatedMemories = MEMORIES.filter((m) => chapter.memoryIds.includes(m.id))

  // The full photo set for this year. Years with lots of photos get capped
  // to a curated highlight reel here — the Album page (/album) shows every
  // photo. Years with few photos show all of them in BOTH places.
  const yearPhotos    = getPhotosByYear(chapter.year)
  const pinnedSrcs    = new Set(curatedMemories.map((m) => m.imageUrl).filter(Boolean) as string[])
  const highlights    = pickHighlights(yearPhotos, HIGHLIGHTS_PER_YEAR, pinnedSrcs)
  const truncatedBy   = yearPhotos.length - highlights.length

  const chapterMemories: MemoryCard[] = highlights.length > 0
    ? highlights.map((p) => photoToMemory(p, curatedMemories))
    : curatedMemories

  const activeIdx = chapterMemories.findIndex((m) => m.id === activeMemory?.id)

  return (
    <PageShell backTo="/timeline" backLabel="Timeline">
      {/* Sticky mini-header — appears after scrolling past the hero */}
      <motion.div
        className="fixed z-30 inset-x-0 flex items-center justify-center pointer-events-none"
        style={{
          top: 50,
          opacity: stickyOpacity,
          y: stickyY,
        }}
        aria-hidden
      >
        <div
          className="flex items-center gap-3 px-5 py-2 rounded-full font-sans"
          style={{
            background: 'rgba(10,8,6,0.72)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(196,149,42,0.18)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <span
            className="font-serif"
            style={{ color: 'rgba(196,149,42,0.8)', fontSize: '0.95rem', fontWeight: 300 }}
          >
            {chapter?.year}
          </span>
          <span style={{ width: 1, height: 14, background: 'rgba(196,149,42,0.25)' }} />
          <span
            className="font-serif"
            style={{ color: 'var(--color-cream)', fontSize: '0.9rem', fontWeight: 400 }}
          >
            {chapter?.title}
          </span>
        </div>
      </motion.div>

      {/* Hero banner */}
      <div className="relative w-full overflow-hidden" style={{ height: '48dvh', minHeight: 260 }}>
        {chapter.heroPhoto ? (
          <motion.img
            src={assetUrl(chapter.heroPhoto)}
            alt={chapter.title}
            className="w-full h-full object-cover photo-grade"
            style={{ objectPosition: 'center 15%', transformOrigin: '50% 15%' }}
            animate={prefersReduced ? undefined : { scale: [1, 1.06], x: [0, -6] }}
            transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a1410 0%, #0f0c09 100%)' }} />
        )}
        {/* Year overlay — centered horizontally, anchored to bottom */}
        <div
          className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 pb-6"
          style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.45) 55%, transparent 100%)' }}
        >
          <motion.p
            className="font-serif"
            style={{ fontSize: 'clamp(4rem, 14vw, 7rem)', color: 'rgba(196,149,42,0.78)', lineHeight: 0.9, fontWeight: 300, letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {chapter.year}
          </motion.p>
          <p className="font-serif mt-2" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', color: 'var(--color-cream)', fontWeight: 400 }}>
            <SplitHeadline text={chapter.title} delay={0.2} />
          </p>
        </div>

        {/* Vintage stamp — upper right of hero */}
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          aria-hidden
        >
          <VintageStamp year={chapter.year} label={chapter.title} size={60} rotate={0} />
        </motion.div>
      </div>

      {/* Content — per-year atmospheric background */}
      <div
        className="velvet-bg year-bg-wrapper flex flex-col items-center"
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
          paddingBottom: 24,
          '--year-bg-image': `url(${assetUrl(BG_IMAGE[getYearBackground(chapter.year)])})`,
          '--year-bg-opacity': BG_OPACITY[getYearBackground(chapter.year)],
        } as React.CSSProperties}
      >
        <div className="w-full space-y-8" style={{ maxWidth: 560, position: 'relative', zIndex: 1 }}>
        {/* Summary — handwritten style */}
        <motion.p
          className="handwriting-casual text-center"
          style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: 'rgba(196,149,42,0.75)', lineHeight: 1.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {chapter.summary}
        </motion.p>

        {/* Milestones */}
        {(chapter.milestones ?? []).length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {chapter.milestones!.map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs"
                style={{ background: 'rgba(196,149,42,0.10)', border: '1px solid rgba(196,149,42,0.22)', color: 'rgba(196,149,42,0.85)' }}
              >
                {m.label}
              </span>
            ))}
          </div>
        )}

        {/* Travel accents — ticket + passport stamp for travel-coded years */}
        {TRAVEL_META[chapter.year] && (() => {
          const travel = TRAVEL_META[chapter.year]!
          return (
            <div className="flex items-center justify-start gap-5 flex-wrap" aria-hidden>
              <TicketStub
                destination={travel.destination}
                from={travel.from}
                date={travel.ticketDate}
                rotate={-4}
              />
              <PassportStamp
                place={travel.destination}
                date={travel.stampDate}
                rotate={7}
              />
            </div>
          )
        })()}

        {/* Scrapbook spread — highlight reel for this year */}
        {chapterMemories.length > 0 && (
          <ScrapbookSpread
            memories={chapterMemories}
            onCardClick={setActiveMemory}
          />
        )}

        {/* "See more in the album" — only when this year has more photos than the cap */}
        {truncatedBy > 0 && (
          <motion.div
            className="flex justify-center pt-2 pb-1"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={() => navigate('/album')}
              data-ripple
              className="font-sans uppercase tap-press"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                padding: '10px 18px',
                borderRadius: 999,
                color: 'var(--color-amber)',
                background: 'rgba(20,15,10,0.55)',
                border: '1px solid rgba(196,149,42,0.22)',
                cursor: 'pointer',
              }}
            >
              + {truncatedBy} more in the album →
            </button>
          </motion.div>
        )}

        {/* Prev / Next year — inline mini-cards */}
        <div className="flex justify-between items-stretch gap-3 pt-5 border-t" style={{ borderColor: 'rgba(196,149,42,0.12)' }}>
          {prevYear ? (() => {
            const prevChapter = YEARS.find((y) => y.year === prevYear)!
            return (
              <motion.button
                type="button"
                onClick={() => navigate(`/year/${prevYear}`)}
                className="flex-1 flex items-center gap-3 p-3 rounded-xl text-left tap-press"
                style={{ background: 'var(--color-cinema-card)', border: '1px solid var(--color-amber-border)' }}
                data-ripple
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={14} style={{ color: 'var(--color-amber)', opacity: 0.7, flexShrink: 0 }} />
                {prevChapter.heroPhoto && (
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                    <img src={assetUrl(prevChapter.heroPhoto)} alt="" className="w-full h-full object-cover photo-grade" loading="lazy" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.15em]" style={{ color: 'var(--color-amber)', opacity: 0.65 }}>{prevYear}</p>
                  <p className="font-serif text-sm truncate" style={{ color: 'var(--color-cream)' }}>{prevChapter.title}</p>
                </div>
              </motion.button>
            )
          })() : <div className="flex-1" />}

          {nextYear ? (() => {
            const nextChapter = YEARS.find((y) => y.year === nextYear)!
            return (
              <motion.button
                type="button"
                onClick={() => navigate(`/year/${nextYear}`)}
                className="flex-1 flex items-center gap-3 p-3 rounded-xl text-right justify-end tap-press"
                style={{ background: 'var(--color-cinema-card)', border: '1px solid var(--color-amber-border)' }}
                data-ripple
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="min-w-0">
                  <p className="font-sans text-[0.58rem] uppercase tracking-[0.15em]" style={{ color: 'var(--color-amber)', opacity: 0.65 }}>{nextYear}</p>
                  <p className="font-serif text-sm truncate" style={{ color: 'var(--color-cream)' }}>{nextChapter.title}</p>
                </div>
                {nextChapter.heroPhoto && (
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                    <img src={assetUrl(nextChapter.heroPhoto)} alt="" className="w-full h-full object-cover photo-grade" loading="lazy" />
                  </div>
                )}
                <ChevronRight size={14} style={{ color: 'var(--color-amber)', opacity: 0.7, flexShrink: 0 }} />
              </motion.button>
            )
          })() : <div className="flex-1" />}
        </div>
        </div>
      </div>

      {/* Memory modal */}
      <EmotionalModal
        memory={activeMemory}
        onClose={() => setActiveMemory(null)}
        onPrev={() => activeIdx > 0 && setActiveMemory(chapterMemories[activeIdx - 1]!)}
        onNext={() => activeIdx < chapterMemories.length - 1 && setActiveMemory(chapterMemories[activeIdx + 1]!)}
        hasPrev={activeIdx > 0}
        hasNext={activeIdx < chapterMemories.length - 1}
      />
    </PageShell>
  )
}
