import { type ReactNode, type ButtonHTMLAttributes, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles: Record<'sm' | 'md' | 'lg', CSSProperties> = {
  sm: { paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, minHeight: 38, fontSize: '0.7rem' },
  md: { paddingLeft: 28, paddingRight: 28, paddingTop: 13, paddingBottom: 13, minHeight: 44, fontSize: '0.78rem' },
  lg: { paddingLeft: 36, paddingRight: 36, paddingTop: 16, paddingBottom: 16, minHeight: 50, fontSize: '0.82rem' },
}

export function SecondaryButton({ children, size = 'md', className = '', style, ...props }: SecondaryButtonProps): ReactNode {
  return (
    <motion.button
      type="button"
      className={`font-sans uppercase ${className}`}
      data-ripple
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 999,
        letterSpacing: '0.22em',
        cursor: 'pointer',
        background: 'transparent',
        border: '1px solid rgba(196,149,42,0.30)',
        color: 'rgba(196,149,42,0.85)',
        ...sizeStyles[size],
        ...style,
      }}
      whileHover={{ background: 'rgba(196,149,42,0.08)', borderColor: 'rgba(196,149,42,0.55)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
}
