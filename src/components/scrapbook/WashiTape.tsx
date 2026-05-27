import { type ReactNode, type CSSProperties } from 'react'

type WashiColor = 'gold' | 'blush' | 'sepia' | 'sage'

interface WashiTapeProps {
  color?: WashiColor
  rotate?: number
  width?: number
  height?: number
  style?: CSSProperties
  className?: string
}

const GRADIENTS: Record<WashiColor, string> = {
  gold:  'linear-gradient(110deg, #c8a030 0%, #f0d878 28%, #a87820 52%, #ecd068 75%, #c8a030 100%)',
  blush: 'linear-gradient(110deg, #b87060 0%, #d8a898 30%, #985848 52%, #d8a898 75%, #b87060 100%)',
  sepia: 'linear-gradient(110deg, #98702a 0%, #c09858 30%, #785018 52%, #c09858 75%, #98702a 100%)',
  sage:  'linear-gradient(110deg, #6a8a6a 0%, #98b890 30%, #507850 52%, #98b890 75%, #6a8a6a 100%)',
}

/**
 * Decorative washi tape strip — stands alone (not tied to PolaroidPhoto).
 * Position it absolutely with the `style` prop.
 */
export function WashiTape({ color = 'gold', rotate = 0, width = 40, height = 13, style, className = '' }: WashiTapeProps): ReactNode {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width,
        height,
        borderRadius: 2,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.85,
        boxShadow: '0 1px 4px rgba(0,0,0,0.35)',
        backgroundImage: `${GRADIENTS[color]},
          repeating-linear-gradient(135deg, transparent 0px, transparent 4px, rgba(255,255,255,0.09) 4px, rgba(255,255,255,0.09) 5.5px)`,
        backgroundBlendMode: 'multiply',
        ...style,
      }}
    />
  )
}
