import { type ReactNode, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface HandwrittenCaptionProps {
  children: ReactNode
  rotate?: number
  color?: 'gold' | 'cream' | 'sepia' | 'blush'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  casual?: boolean
  delay?: number
  style?: CSSProperties
  className?: string
}

const COLORS = {
  gold:  'rgba(196,149,42,0.85)',
  cream: 'rgba(237,226,204,0.80)',
  sepia: 'rgba(160,120,40,0.80)',
  blush: 'rgba(196,128,110,0.80)',
}

const SIZES = {
  xs: '1.1rem',
  sm: '1.4rem',
  md: '1.8rem',
  lg: '2.4rem',
}

/**
 * Floating handwritten caption — uses the Allura / Caveat font stack.
 * Position it wherever you like with `style`.
 */
export function HandwrittenCaption({
  children,
  rotate = 0,
  color = 'gold',
  size = 'sm',
  casual = false,
  delay = 0,
  style,
  className = '',
}: HandwrittenCaptionProps): ReactNode {
  return (
    <motion.p
      className={`${casual ? 'handwriting-casual' : 'handwriting'} ${className}`}
      style={{
        fontSize: SIZES[size],
        color: COLORS[color],
        transform: `rotate(${rotate}deg)`,
        lineHeight: 1.1,
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.01em',
        textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        ...style,
      }}
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: EASE.cinema, delay }}
    >
      {children}
    </motion.p>
  )
}
