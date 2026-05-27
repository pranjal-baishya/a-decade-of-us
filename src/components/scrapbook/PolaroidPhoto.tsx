import { type ReactNode, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

type TapeVariant = 'top' | 'corners' | 'top-left' | 'top-right' | false
type TapeColor   = 'gold' | 'blush' | 'sepia'
type PolaroidSize = 'xs' | 'sm' | 'md' | 'lg'

interface PolaroidPhotoProps {
  src?: string
  alt?: string
  caption?: string
  date?: string
  rotate?: number
  size?: PolaroidSize
  tape?: TapeVariant
  tapeColor?: TapeColor
  onClick?: () => void
  className?: string
  style?: CSSProperties
  /** Entry animation delay */
  delay?: number
  /** Disable hover lift */
  noHover?: boolean
  /** Custom cursor attr */
  'data-cursor'?: string
}

const SIZE_MAP: Record<PolaroidSize, { outer: number; bottom: number; photo: number }> = {
  xs: { outer: 68,  bottom: 18, photo: 52  },
  sm: { outer: 90,  bottom: 22, photo: 70  },
  md: { outer: 130, bottom: 30, photo: 100 },
  lg: { outer: 180, bottom: 40, photo: 138 },
}

const TAPE_GRADIENTS: Record<TapeColor, string> = {
  gold:  'linear-gradient(110deg, #d4af37 0%, #f4e4a8 30%, #b8860b 52%, #f4e4a8 72%, #d4af37 100%)',
  blush: 'linear-gradient(110deg, #c4806e 0%, #e4b0a0 35%, #a05848 55%, #e4b0a0 75%, #c4806e 100%)',
  sepia: 'linear-gradient(110deg, #a07828 0%, #c8a860 35%, #806018 55%, #c8a860 75%, #a07828 100%)',
}

function TapeStrip({ color = 'gold', rotate = 0, top = -8, left = '50%', width = 32, translateX = '-50%' }: {
  color?: TapeColor; rotate?: number; top?: number; left?: string | number; width?: number; translateX?: string
}): ReactNode {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top,
        left,
        width,
        height: 12,
        transform: `translateX(${translateX}) rotate(${rotate}deg)`,
        background: TAPE_GRADIENTS[color],
        opacity: 0.88,
        borderRadius: 2,
        zIndex: 10,
        boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
        /* Diagonal stripe texture */
        backgroundImage: `${TAPE_GRADIENTS[color]}, repeating-linear-gradient(
          135deg,
          transparent 0px,
          transparent 4px,
          rgba(255,255,255,0.08) 4px,
          rgba(255,255,255,0.08) 5px
        )`,
        backgroundBlendMode: 'multiply',
      }}
    />
  )
}

export function PolaroidPhoto({
  src,
  alt = '',
  caption,
  date,
  rotate = 0,
  size = 'md',
  tape = 'top',
  tapeColor = 'gold',
  onClick,
  className = '',
  style,
  delay = 0,
  noHover = false,
  'data-cursor': dataCursor,
}: PolaroidPhotoProps): ReactNode {
  const dim = SIZE_MAP[size]
  const captionSize = size === 'xs' ? '0.48rem' : size === 'sm' ? '0.55rem' : size === 'md' ? '0.68rem' : '0.78rem'

  return (
    <motion.div
      className={`relative select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        width: dim.outer,
        flexShrink: 0,
        zIndex: 'auto',
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.85, rotate: rotate * 0.5 }}
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.55, ease: EASE.cinema, delay }}
      whileHover={noHover ? undefined : {
        scale: 1.08,
        rotate: rotate * 0.2,
        zIndex: 30,
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      data-cursor={dataCursor}
      data-ripple={onClick ? '' : undefined}
    >
      {/* Washi tape strips */}
      {tape === 'top' && <TapeStrip color={tapeColor} />}
      {tape === 'top-left' && <TapeStrip color={tapeColor} rotate={-12} top={-6} left="20%" translateX="0" />}
      {tape === 'top-right' && <TapeStrip color={tapeColor} rotate={12} top={-6} left="65%" translateX="0" />}
      {tape === 'corners' && (
        <>
          <TapeStrip color={tapeColor} rotate={-18} top={-5} left="12%" width={24} translateX="0" />
          <TapeStrip color={tapeColor} rotate={18} top={-5} left="70%" width={24} translateX="0" />
        </>
      )}

      {/* Polaroid frame */}
      <div
        style={{
          background: 'var(--color-paper-cream)',
          borderRadius: 3,
          padding: `6px 6px ${dim.bottom}px 6px`,
          boxShadow: 'var(--shadow-polaroid)',
          position: 'relative',
        }}
      >
        {/* Photo area */}
        <div
          style={{
            width: '100%',
            aspectRatio: '1/1',
            background: '#2a2018',
            overflow: 'hidden',
          }}
        >
          {src ? (
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-cover photo-grade"
              loading="lazy"
              data-cursor={dataCursor}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a1410, #241c14)' }}
            >
              <span style={{ color: 'rgba(196,149,42,0.3)', fontSize: captionSize }}>
                {date ?? ''}
              </span>
            </div>
          )}
        </div>

        {/* Caption area */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: dim.bottom,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 2,
            gap: 1,
          }}
        >
          {caption && (
            <p
              className="handwriting"
              style={{
                color: 'var(--color-ink-dark)',
                fontSize: captionSize,
                lineHeight: 1.1,
                textAlign: 'center',
                letterSpacing: '0.01em',
                maxWidth: '95%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {caption}
            </p>
          )}
          {date && (
            <p
              className="handwriting-casual"
              style={{
                color: 'var(--color-ink-gold)',
                fontSize: `calc(${captionSize} * 0.85)`,
                lineHeight: 1,
                textAlign: 'center',
              }}
            >
              {date}
            </p>
          )}
        </div>

        {/* Subtle inner shadow — like a real photo print */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            right: 6,
            height: dim.photo,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.25)',
          }}
        />
      </div>
    </motion.div>
  )
}
