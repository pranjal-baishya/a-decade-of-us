import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { ScrapbookSpread } from '@/components/scrapbook/ScrapbookSpread'
import { DriedFloral } from '@/components/scrapbook/DriedFloral'
import { FiligreeCorner } from '@/components/scrapbook/FiligreeCorner'
import { EmotionalModal } from '@/components/memory/EmotionalModal'
import { PHOTO_YEARS, getPhotosByYear, type Photo } from '@/data/photoLibrary'
import { MEMORIES } from '@/data/memories'
import { formatPhotoDate } from '@/lib/formatDate'
import type { MemoryCard } from '@/types/section'

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

const YEAR_LABELS: Record<number, string> = {
  2016: 'The Beginning',
  2017: 'Growing',
  2018: 'The Hard Year',
  2019: 'Finding Our Way',
  2020: 'Quiet & Together',
  2021: 'Five Years',
  2022: 'The Mountains',
  2023: 'New Chapters',
  2024: 'Almost a Decade',
  2025: 'Nine Years',
  2026: 'A Decade',
}

export function AlbumPage(): ReactNode {
  const [activeMemory, setActiveMemory] = useState<MemoryCard | null>(null)

  // Flatten all memories for prev/next navigation in modal
  const allMemories: MemoryCard[] = PHOTO_YEARS.flatMap((year) =>
    getPhotosByYear(year).map((p) => photoToMemory(p, MEMORIES))
  )
  const activeIdx = allMemories.findIndex((m) => m.id === activeMemory?.id)

  return (
    <PageShell backTo="/favorites" backLabel="Favorites" continueTo="/places" continueLabel="Places →">
      <div className="page-content">
        <div className="page-content-inner" style={{ maxWidth: 560 }}>

          {/* Header */}
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="A Decade of Us"
              title="Our Album"
              subtitle="Every photo, in the order they happened."
              align="center"
            />
          </motion.div>

          {/* One section per year */}
          {PHOTO_YEARS.map((year, yearIndex) => {
            const photos = getPhotosByYear(year)
            if (photos.length === 0) return null
            const memories = photos.map((p) => photoToMemory(p, MEMORIES))
            const label = YEAR_LABELS[year] ?? String(year)

            return (
              <motion.section
                key={year}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.05 * Math.min(yearIndex, 4) }}
              >
                {/* Year divider */}
                <div className="flex items-center gap-4 mb-6 mt-4">
                  <DriedFloral variant={yearIndex % 3 === 0 ? 1 : yearIndex % 3 === 1 ? 2 : 3} size={28} opacity={0.45} rotate={yearIndex * 20} />
                  <div className="flex flex-col">
                    <span
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                        color: 'rgba(196,149,42,0.65)',
                        lineHeight: 0.95,
                        fontWeight: 300,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {year}
                    </span>
                    <span
                      className="handwriting-casual"
                      style={{ color: 'var(--color-cream-muted)', fontSize: 'clamp(0.85rem, 2vw, 1rem)', marginTop: 2 }}
                    >
                      {label}
                    </span>
                  </div>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(196,149,42,0.25), transparent)' }} />
                  <span
                    className="font-sans shrink-0"
                    style={{ color: 'rgba(196,149,42,0.35)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
                  >
                    {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>

                {/* Photos as scrapbook spread */}
                <ScrapbookSpread
                  memories={memories}
                  onCardClick={setActiveMemory}
                  spreadIndex={yearIndex * 4}
                />

                {/* Bottom divider between years */}
                {yearIndex < PHOTO_YEARS.length - 1 && (
                  <div className="flex items-center justify-center gap-6 py-8" aria-hidden>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,149,42,0.2))' }} />
                    <FiligreeCorner corner="bottom-right" size={36} opacity={0.3} />
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,149,42,0.2))' }} />
                  </div>
                )}
              </motion.section>
            )
          })}

          {/* Final accent */}
          <div className="flex justify-center pt-8 pb-4 pointer-events-none" aria-hidden>
            <motion.p
              className="font-serif text-2xl"
              style={{ color: 'rgba(196,149,42,0.3)' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              ♡
            </motion.p>
          </div>

        </div>
      </div>

      <EmotionalModal
        memory={activeMemory}
        onClose={() => setActiveMemory(null)}
        onPrev={() => activeIdx > 0 && setActiveMemory(allMemories[activeIdx - 1]!)}
        onNext={() => activeIdx < allMemories.length - 1 && setActiveMemory(allMemories[activeIdx + 1]!)}
        hasPrev={activeIdx > 0}
        hasNext={activeIdx < allMemories.length - 1}
      />
    </PageShell>
  )
}
