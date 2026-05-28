import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { PlaceCard } from '@/components/places/PlaceCard'
import { RealMap } from '@/components/places/RealMap'
import { PolaroidPhoto } from '@/components/scrapbook/PolaroidPhoto'
import { DriedFloral } from '@/components/scrapbook/DriedFloral'
import { PLACES, PLACE_STATS } from '@/data/places'
import { MEMORIES } from '@/data/memories'
import { formatLong } from '@/lib/formatDate'
import { getPlacePhotos } from '@/lib/placePhotos'

export function PlacesPage(): ReactNode {
  const [activePlaceId, setActivePlaceId] = useState<string | null>(null)
  const activePlace = PLACES.find((p) => p.id === activePlaceId) ?? null
  const totalMemories = PLACES.reduce((sum, p) => sum + (p.memoryIds?.length ?? 0), 0)
  const allPlaceMemories = MEMORIES.filter((m) => m.placeId)

  const handlePinClick = (id: string): void => {
    setActivePlaceId((prev) => prev === id ? null : id)
  }

  return (
    <PageShell backTo="/album" backLabel="Album" continueTo="/little-things" continueLabel="Little Things →">
      <div className="page-content">
        <div className="page-content-inner" style={{ maxWidth: 540 }}>
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="Our journey"
              title="Places We've Been"
              subtitle="Every place holds a piece of our story."
              align="center"
            />
          </motion.div>

          {/* Real map */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <RealMap places={PLACES} activeId={activePlaceId} onPinClick={handlePinClick} />
          </motion.div>

          {/* Centered place modal — rendered above everything when active */}
          {activePlaceId && (
            <PlaceCard place={activePlace} onClose={() => setActivePlaceId(null)} />
          )}

          {/* Visual break between the map and the polaroid grid */}
          <motion.div
            className="flex items-center gap-4 my-12"
            aria-hidden
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(196,149,42,0.28))' }} />
            <DriedFloral variant={2} size={26} opacity={0.5} />
            <span
              className="font-sans uppercase shrink-0"
              style={{ color: 'var(--color-amber)', fontSize: '0.6rem', letterSpacing: '0.28em', opacity: 0.7 }}
            >
              Our places
            </span>
            <DriedFloral variant={2} size={26} opacity={0.5} rotate={180} />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(196,149,42,0.28))' }} />
          </motion.div>

          {/* Place list — polaroid cards */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            {PLACES.map((place, i) => {
              const rotations = [-4, 3, -2, 5, -3, 4]
              const tapes: Array<'top' | 'top-left' | 'top-right' | 'corners'> = ['top', 'top-right', 'corners', 'top-left', 'top', 'top-right']
              const photos = getPlacePhotos(place)
              const extraCount = Math.max(0, photos.length - 1)
              return (
                <div key={place.id} className="relative flex justify-center">
                  <PolaroidPhoto
                    src={photos[0]}
                    alt={place.name}
                    caption={place.name}
                    date={formatLong(place.dates)}
                    rotate={activePlaceId === place.id ? 0 : (rotations[i % rotations.length] ?? 0)}
                    size="md"
                    tape={tapes[i % tapes.length]!}
                    tapeColor={activePlaceId === place.id ? 'blush' : 'gold'}
                    onClick={() => handlePinClick(place.id)}
                    delay={0.4 + i * 0.07}
                  />

                  {/* "+N more" badge for places with multiple photos */}
                  {extraCount > 0 && (
                    <span
                      className="absolute font-sans pointer-events-none"
                      style={{
                        top: -6,
                        right: -2,
                        background: 'rgba(196,149,42,0.95)',
                        color: 'var(--color-cinema-void)',
                        fontSize: '0.6rem',
                        letterSpacing: '0.04em',
                        fontWeight: 600,
                        padding: '3px 7px',
                        borderRadius: 999,
                        border: '1px solid rgba(255,255,255,0.25)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                        zIndex: 12,
                      }}
                      aria-label={`${extraCount} more photos`}
                    >
                      +{extraCount}
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 border-t border-b"
            style={{
              paddingTop: 20,
              paddingBottom: 20,
              borderColor: 'rgba(196,149,42,0.1)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {[
              { value: PLACE_STATS.cities, label: 'Cities' },
              { value: PLACE_STATS.trips, label: 'Trips' },
              { value: totalMemories || allPlaceMemories.length, label: 'Memories' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl" style={{ color: 'var(--color-amber)' }}>{stat.value}</p>
                <p className="font-sans uppercase" style={{ color: 'var(--color-cream-muted)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageShell>
  )
}
