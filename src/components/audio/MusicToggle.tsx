import { useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { COUPLE } from '@/data/couple'
import { assetUrl } from '@/lib/assetUrl'

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  ms: number,
  onDone?: () => void,
): void {
  const steps = 20
  const interval = ms / steps
  const delta = (to - from) / steps
  let step = 0
  audio.volume = Math.max(0, Math.min(1, from))
  const id = setInterval(() => {
    step++
    audio.volume = Math.max(0, Math.min(1, from + delta * step))
    if (step >= steps) {
      clearInterval(id)
      onDone?.()
    }
  }, interval)
}

/**
 * Fixed top-right music toggle.
 * Only renders when COUPLE.song is configured.
 * Fades music in/out with a smooth volume ramp.
 */
export function MusicToggle(): ReactNode {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!COUPLE.song) return
    const audio = new Audio(assetUrl(COUPLE.song))
    audio.loop = true
    audio.volume = 0
    audio.preload = 'metadata'
    audioRef.current = audio

    const saved = localStorage.getItem('adou-music')
    if (saved === 'on') {
      audio.play()
        .then(() => {
          fadeVolume(audio, 0, 0.35, 2000)
          setIsPlaying(true)
        })
        .catch(() => undefined)
    }

    // Listen for press-play event dispatched by PressPlay gate
    const handlePressPlay = (): void => {
      audio.play()
        .then(() => {
          fadeVolume(audio, 0, 0.35, 1800)
          setIsPlaying(true)
          localStorage.setItem('adou-music', 'on')
        })
        .catch(() => undefined)
    }
    window.addEventListener('adou:press-play', handlePressPlay)

    return () => {
      audio.pause()
      audio.src = ''
      window.removeEventListener('adou:press-play', handlePressPlay)
    }
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      fadeVolume(audio, audio.volume, 0, 800, () => audio.pause())
      setIsPlaying(false)
      localStorage.setItem('adou-music', 'off')
    } else {
      audio
        .play()
        .then(() => {
          fadeVolume(audio, 0, 0.35, 1500)
          setIsPlaying(true)
          localStorage.setItem('adou-music', 'on')
        })
        .catch(() => undefined)
    }
  }, [isPlaying])

  if (!COUPLE.song) return null

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
      className="fixed top-5 right-5 z-30 flex items-center justify-center w-10 h-10 rounded-full"
      style={{
        background: 'rgba(14,16,32,0.65)',
        border: `1px solid rgba(201,168,76,${isPlaying ? 0.5 : 0.2})`,
        backdropFilter: 'blur(10px)',
        color: isPlaying ? 'rgba(201,168,76,0.9)' : 'rgba(201,168,76,0.4)',
      }}
      whileTap={{ scale: 0.88 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.5, duration: 0.8 }}
    >
      {isPlaying ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
    </motion.button>
  )
}

function SpeakerOnIcon(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={i * 4 + 1}
          width={2}
          rx={1}
          y={5}
          height={4}
          fill="currentColor"
          animate={{ height: [4, 10, 5, 9, 4], y: [5, 2, 4.5, 2.5, 5] }}
          transition={{ duration: 0.85 + i * 0.12, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </svg>
  )
}

function SpeakerOffIcon(): ReactNode {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 5.5h2.5l3.5-3v11L4.5 10.5H2V5.5z" />
      <path
        d="M12 6l-4 4M8 6l4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
