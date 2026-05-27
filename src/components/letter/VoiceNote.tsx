import { useEffect, useRef, useState, type ReactNode } from 'react'

interface VoiceNoteProps {
  audioUrl: string
  label?: string
}

/**
 * Voice note audio player. Click play -> the real audio plays.
 * The waveform is a stylized visualization (not pulled from the audio file).
 */
export function VoiceNote({ audioUrl, label = 'A voice note' }: VoiceNoteProps): ReactNode {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = (): void => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration)
    }
    const onEnd = (): void => {
      setIsPlaying(false)
      setProgress(0)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = (): void => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  const BAR_COUNT = 36

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{
        background: 'rgba(7,8,15,0.5)',
        border: '1px solid rgba(196,128,110,0.15)',
      }}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
        className="flex shrink-0 items-center justify-center rounded-full transition-transform active:scale-95"
        style={{
          width: 48,
          height: 48,
          background: 'rgba(196,128,110,0.16)',
          border: '1px solid rgba(196,128,110,0.4)',
          color: 'rgba(196,128,110,0.95)',
        }}
      >
        {isPlaying ? (
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
            <rect x="2" y="2" width="3" height="12" rx="0.5" />
            <rect x="9" y="2" width="3" height="12" rx="0.5" />
          </svg>
        ) : (
          <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden>
            <path d="M2 1.5L12.5 8L2 14.5V1.5Z" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className="font-sans text-xs tracking-[0.2em] uppercase mb-2"
          style={{ color: 'rgba(196,128,110,0.65)' }}
        >
          {label}
        </p>

        {/* Waveform — bars below progress index are highlighted */}
        <div className="flex h-6 items-end gap-0.5" aria-hidden>
          {Array.from({ length: BAR_COUNT }, (_, i) => {
            const h = 18 + Math.sin(i * 0.9) * 14 + Math.sin(i * 2.1) * 8
            const isPlayed = i / BAR_COUNT <= progress
            return (
              <div
                key={i}
                className="rounded-full flex-1"
                style={{
                  height: `${h}%`,
                  backgroundColor: isPlayed
                    ? 'rgba(212, 145, 90, 0.85)'
                    : 'rgba(196, 128, 110, 0.30)',
                  minWidth: 2,
                  transition: 'background-color 100ms linear',
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
