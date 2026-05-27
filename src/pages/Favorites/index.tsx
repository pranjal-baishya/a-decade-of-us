import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { FloatingPhotoStack } from '@/components/memory/FloatingPhotoStack'
import { EmotionalModal } from '@/components/memory/EmotionalModal'
import { FEATURED_MEMORIES, MEMORIES } from '@/data/memories'
import type { MemoryCard } from '@/types/section'

export function FavoritesPage(): ReactNode {
  const [activeMemory, setActiveMemory] = useState<MemoryCard | null>(null)
  const featured = FEATURED_MEMORIES.length > 0 ? FEATURED_MEMORIES : MEMORIES.slice(0, 9)
  const activeIdx = featured.findIndex((m) => m.id === activeMemory?.id)

  return (
    <PageShell backTo="/timeline" backLabel="Timeline" continueTo="/messages" continueLabel="Messages →">
      <div className="page-content">
        <div className="page-content-inner" style={{ maxWidth: 480 }}>
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="Our Favorites"
              title="Favorite Moments"
              subtitle="The ones we keep coming back to."
              align="center"
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FloatingPhotoStack memories={featured} onCardClick={setActiveMemory} />
          </motion.div>
        </div>

        <EmotionalModal
          memory={activeMemory}
          onClose={() => setActiveMemory(null)}
          onPrev={() => activeIdx > 0 && setActiveMemory(featured[activeIdx - 1]!)}
          onNext={() => activeIdx < featured.length - 1 && setActiveMemory(featured[activeIdx + 1]!)}
          hasPrev={activeIdx > 0}
          hasNext={activeIdx < featured.length - 1}
        />
      </div>
    </PageShell>
  )
}
