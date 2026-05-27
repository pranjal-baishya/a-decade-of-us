import { type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * A pulsing chevron pinned to the bottom-center of the viewport.
 * Tappable — scrolls the viewport down by one screen height.
 * Fades out + disables once the user has scrolled past 60px.
 */
export function ScrollHint(): ReactNode {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 60], [1, 0])
  const y = useTransform(scrollY, [0, 60], [0, 10])
  const pointerEvents = useTransform(scrollY, [0, 50], ['auto', 'none'])

  const handleClick = (): void => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 left-1/2 flex flex-col items-center"
      style={{
        opacity,
        y,
        pointerEvents,
        translateX: '-50%',
        zIndex: 20,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 14px',
      }}
      aria-label="Scroll down for more"
    >
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-1"
      >
        <p
          className="font-sans uppercase"
          style={{ color: 'rgba(196,149,42,0.55)', fontSize: '0.55rem', letterSpacing: '0.25em' }}
        >
          scroll
        </p>
        <ChevronDown size={14} style={{ color: 'rgba(196,149,42,0.50)' }} strokeWidth={1.5} />
      </motion.div>
    </motion.button>
  )
}
