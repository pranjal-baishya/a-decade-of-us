import { type ReactNode, type CSSProperties } from 'react'
import { motion, type Variants } from 'framer-motion'
import { EASE, DUR } from '@/lib/motion'

interface SplitHeadlineProps {
  text: string
  /** 'word' (default) or 'char' */
  split?: 'word' | 'char'
  className?: string
  style?: CSSProperties
  delay?: number
}

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
}

const wordVariants: Variants = {
  initial: (i: number) => ({ opacity: 0, y: i % 2 === 0 ? 18 : -14, filter: 'blur(2px)' }),
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

/**
 * Splits text into words (or chars) and staggers them in.
 * Each alternate word enters from the opposite direction for cinematic texture.
 */
export function SplitHeadline({
  text,
  split = 'word',
  className = '',
  style,
  delay = 0,
}: SplitHeadlineProps): ReactNode {
  const tokens = split === 'word' ? text.split(' ') : text.split('')

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ delayChildren: delay }}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          transition={{ duration: DUR.slow, ease: EASE.cinema }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {token}{split === 'word' && i < tokens.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
