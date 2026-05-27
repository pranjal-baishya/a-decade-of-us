import { createElement, type ReactNode, type CSSProperties } from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  as?: 'h1' | 'h2' | 'h3'
  align?: 'left' | 'center' | 'right'
  className?: string
  style?: CSSProperties
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  as = 'h2',
  align = 'center',
  className = '',
  style,
}: SectionHeaderProps): ReactNode {
  const alignClass = align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-2 ${alignClass} ${className}`} style={style}>
      {eyebrow && (
        <p
          className="font-sans tracking-[0.38em] uppercase"
          style={{ color: 'var(--color-amber)', fontSize: '0.68rem', opacity: 0.85 }}
        >
          {eyebrow}
        </p>
      )}
      {createElement(
        as,
        {
          className: 'font-serif leading-[1.1]',
          style: { fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--color-cream)', fontWeight: 500 },
        },
        title,
      )}
      {subtitle && (
        <p
          className="font-serif italic"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--color-cream-dim)', lineHeight: 1.6, maxWidth: 480, textAlign: align }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
