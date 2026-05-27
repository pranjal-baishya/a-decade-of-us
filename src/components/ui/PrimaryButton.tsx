import { type ReactNode, type ButtonHTMLAttributes, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles: Record<'sm' | 'md' | 'lg', CSSProperties> = {
  sm: { paddingLeft: 22, paddingRight: 22, paddingTop: 11, paddingBottom: 11, minHeight: 40, fontSize: '0.72rem' },
  md: { paddingLeft: 32, paddingRight: 32, paddingTop: 14, paddingBottom: 14, minHeight: 48, fontSize: '0.82rem' },
  lg: { paddingLeft: 40, paddingRight: 40, paddingTop: 18, paddingBottom: 18, minHeight: 56, fontSize: '0.88rem' },
}

export function PrimaryButton({ children, size = 'md', className = '', style, ...props }: PrimaryButtonProps): ReactNode {
  return (
    <motion.button
      type="button"
      className={`relative font-sans uppercase ${className}`}
      data-ripple
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 999,
        letterSpacing: '0.22em',
        cursor: 'pointer',
        userSelect: 'none',
        background: 'linear-gradient(135deg, rgba(196,149,42,0.24), rgba(180,90,30,0.16))',
        border: '1px solid rgba(196,149,42,0.50)',
        color: 'var(--color-cream)',
        boxShadow: '0 0 24px rgba(196,149,42,0.18), inset 0 1px 0 rgba(255,255,255,0.07)',
        overflow: 'hidden',
        ...sizeStyles[size],
        ...style,
      }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ boxShadow: '0 0 44px rgba(196,149,42,0.30), inset 0 1px 0 rgba(255,255,255,0.09)' }}
      transition={{ duration: 0.18 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 999, border: '1px solid rgba(196,149,42,0.35)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        aria-hidden
      />
      <span className="shimmer-sweep" aria-hidden />
      <span style={{ position: 'relative', zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        {children}
      </span>
    </motion.button>
  )
}
