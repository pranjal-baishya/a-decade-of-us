import { type ReactNode } from 'react'

type FloralVariant = 1 | 2 | 3 | 4

interface DriedFloralProps {
  variant?: FloralVariant
  size?: number
  rotate?: number
  opacity?: number
  color?: string
  className?: string
}

/**
 * Minimal SVG dried rose / floral sprig decoration.
 * Four variants for visual variety across spreads.
 */
export function DriedFloral({ variant = 1, size = 48, rotate = 0, opacity = 0.55, color = '#c4952a', className = '' }: DriedFloralProps): ReactNode {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, opacity, display: 'block', flexShrink: 0 }}
      aria-hidden
    >
      {variant === 1 && (
        /* Rose on stem */
        <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
          {/* Stem */}
          <path d="M20 50 C18 38 21 28 19 18" strokeWidth="1.2" />
          {/* Left leaf */}
          <path d="M19 32 C12 28 10 22 14 20 C15 24 17 28 19 32Z" strokeWidth="0.8" fill={color} fillOpacity="0.4" />
          {/* Right leaf */}
          <path d="M19 26 C26 22 28 16 24 14 C23 18 21 22 19 26Z" strokeWidth="0.8" fill={color} fillOpacity="0.3" />
          {/* Rose petals */}
          <path d="M19 18 C16 14 15 10 19 9 C23 10 22 14 19 18Z" strokeWidth="0.8" fill={color} fillOpacity="0.6" />
          <path d="M19 18 C14 15 13 11 16 9 C19 8 19 13 19 18Z" strokeWidth="0.7" fill={color} fillOpacity="0.5" />
          <path d="M19 18 C24 15 25 11 22 9 C19 8 19 13 19 18Z" strokeWidth="0.7" fill={color} fillOpacity="0.5" />
          <circle cx="19" cy="12" r="3.5" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="0.5" />
        </g>
      )}
      {variant === 2 && (
        /* Lavender sprig */
        <g stroke={color} strokeLinecap="round">
          <path d="M20 50 L20 20" strokeWidth="1.2" />
          <path d="M20 30 C16 25 14 21 16 18" strokeWidth="0.9" fill="none" />
          <path d="M20 30 C24 25 26 21 24 18" strokeWidth="0.9" fill="none" />
          <path d="M20 24 C17 20 15 16 17 13" strokeWidth="0.9" fill="none" />
          <path d="M20 24 C23 20 25 16 23 13" strokeWidth="0.9" fill="none" />
          {[18, 16, 14, 12, 10, 8].map((y, i) => (
            <circle key={i} cx={20 + (i % 2 === 0 ? -3 : 3)} cy={y} r={1.5} fill={color} fillOpacity="0.6" />
          ))}
        </g>
      )}
      {variant === 3 && (
        /* Simple leaf branch */
        <g stroke={color} strokeLinecap="round">
          <path d="M20 50 C20 40 19 30 20 15" strokeWidth="1.2" />
          <path d="M20 40 C14 34 11 27 14 23 C16 26 18 33 20 40Z" fill={color} fillOpacity="0.35" strokeWidth="0.8" />
          <path d="M20 32 C26 26 29 19 26 15 C24 18 22 25 20 32Z" fill={color} fillOpacity="0.35" strokeWidth="0.8" />
          <path d="M20 24 C14 18 13 12 16 10 C18 13 19 18 20 24Z" fill={color} fillOpacity="0.3" strokeWidth="0.7" />
          <circle cx="20" cy="13" r="2.5" fill={color} fillOpacity="0.5" />
          <circle cx="20" cy="10" r="1.8" fill={color} fillOpacity="0.4" />
        </g>
      )}
      {variant === 4 && (
        /* Double rose stems */
        <g stroke={color} strokeLinecap="round">
          <path d="M16 50 C15 40 16 28 15 18" strokeWidth="1.1" />
          <path d="M24 50 C25 40 24 28 25 18" strokeWidth="1.1" />
          <path d="M15 35 C10 30 9 24 12 22 C13 26 14 31 15 35Z" fill={color} fillOpacity="0.3" strokeWidth="0.7" />
          <path d="M25 28 C30 24 31 18 28 16 C26 20 25 24 25 28Z" fill={color} fillOpacity="0.3" strokeWidth="0.7" />
          <circle cx="15" cy="15" r="4" fill={color} fillOpacity="0.55" />
          <circle cx="25" cy="15" r="3.2" fill={color} fillOpacity="0.45" />
          <path d="M15 15 C13 11 12 8 15 7 C18 8 17 11 15 15Z" fill={color} fillOpacity="0.5" />
          <path d="M25 15 C23 11 22 8 25 7 C28 8 27 11 25 15Z" fill={color} fillOpacity="0.4" />
        </g>
      )}
    </svg>
  )
}
