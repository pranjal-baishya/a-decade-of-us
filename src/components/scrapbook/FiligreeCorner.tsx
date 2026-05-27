import { type ReactNode } from 'react'

type Corner = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'

interface FiligreeCornerProps {
  corner?: Corner
  size?: number
  opacity?: number
  color?: string
  className?: string
}

/**
 * Ornate gold filigree scroll corner decoration.
 * Mirrors itself to face the correct corner via CSS transform.
 */
export function FiligreeCorner({ corner = 'bottom-right', size = 64, opacity = 0.55, color = '#c4952a', className = '' }: FiligreeCornerProps): ReactNode {
  // Base drawing is for bottom-right; mirror as needed
  const flipH = corner === 'bottom-left' || corner === 'top-left'
  const flipV = corner === 'top-right'   || corner === 'top-left'
  const scaleX = flipH ? -1 : 1
  const scaleY = flipV ? -1 : 1

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `scale(${scaleX}, ${scaleY})`, opacity, display: 'block' }}
      aria-hidden
    >
      <g stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Main corner flourish */}
        <path d="M60 60 C50 58 38 55 28 45 C18 35 15 23 13 13" strokeWidth="1.2" />
        {/* Outer curl */}
        <path d="M60 60 C58 52 55 40 50 35 C45 30 38 28 32 30 C28 32 26 36 30 38 C34 40 36 36 33 33" strokeWidth="0.9" />
        {/* Inner leaf curl */}
        <path d="M48 48 C44 44 42 38 45 34 C47 31 51 32 50 36 C49 39 46 38 46 35" strokeWidth="0.8" />
        {/* Small scroll */}
        <path d="M36 56 C32 52 31 46 35 43 C38 41 41 44 39 47 C37 49 34 47 36 44" strokeWidth="0.8" />
        {/* Decorative dots */}
        <circle cx="20" cy="20" r="1.5" fill={color} stroke="none" fillOpacity="0.7" />
        <circle cx="28" cy="52" r="1.2" fill={color} stroke="none" fillOpacity="0.6" />
        <circle cx="52" cy="28" r="1.2" fill={color} stroke="none" fillOpacity="0.6" />
        {/* Star accent */}
        <text x="54" y="58" fontSize="6" fill={color} fillOpacity="0.65" fontFamily="serif" textAnchor="middle">✦</text>
        <text x="42" y="62" fontSize="4.5" fill={color} fillOpacity="0.5" fontFamily="serif" textAnchor="middle">✦</text>
        {/* Tiny leaves */}
        <path d="M40 42 C38 38 40 34 43 35 C43 38 42 40 40 42Z" fill={color} fillOpacity="0.3" strokeWidth="0.5" />
        <path d="M22 42 C20 38 18 34 21 33 C23 36 23 39 22 42Z" fill={color} fillOpacity="0.25" strokeWidth="0.5" />
      </g>
    </svg>
  )
}
