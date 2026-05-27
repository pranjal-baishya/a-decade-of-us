import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from '@/components/layout/PageShell'
import { SectionHeader } from '@/components/layout/SectionHeader'
import { MessageBubble } from '@/components/messages/MessageBubble'
import { MESSAGES } from '@/data/messages'

export function MessagesPage(): ReactNode {
  // Group messages by year
  const years = [...new Set(MESSAGES.map((m) => m.year))].sort()

  return (
    <PageShell backTo="/favorites" backLabel="Favorites" continueTo="/places" continueLabel="Places →">
      <div className="page-content">
        <div className="page-content-inner" style={{ maxWidth: 520 }}>
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              eyebrow="Through the years"
              title="Messages"
              subtitle="Some words that said everything."
              align="center"
            />
          </motion.div>

          <div className="space-y-12">
            {years.map((year) => {
              const yearMsgs = MESSAGES.filter((m) => m.year === year)
              const globalIdx = MESSAGES.indexOf(yearMsgs[0]!)
              return (
                <div key={year}>
                  <div className="flex items-center gap-3 mb-7">
                    <div className="flex-1 h-px" style={{ background: 'rgba(196,149,42,0.12)' }} />
                    <p className="font-serif text-sm" style={{ color: 'rgba(196,149,42,0.55)' }}>{year}</p>
                    <div className="flex-1 h-px" style={{ background: 'rgba(196,149,42,0.12)' }} />
                  </div>
                  <div className="space-y-5">
                    {yearMsgs.map((msg, i) => (
                      <MessageBubble key={msg.id} message={msg} index={globalIdx + i} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="romantic-line text-3xl" style={{ color: 'rgba(196,149,42,0.4)' }}>"</p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  )
}
