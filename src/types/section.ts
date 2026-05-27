export type MediaType = 'photo' | 'video' | 'audio' | 'letter' | 'ticket'

export interface MemoryCard {
  id: string
  title: string
  /** Display date, e.g. "Mar 2019" or "2019" */
  date: string
  /** Numeric year, used to bucket into year chapters */
  year?: number
  description: string
  imageUrl?: string
  placeId?: string
  featured?: boolean
  mediaType?: MediaType
  tags?: string[]
}

export interface YearChapter {
  year: number
  title: string
  summary: string
  /** Path to hero banner image */
  heroPhoto?: string
  /** IDs from MEMORIES that belong to this year */
  memoryIds: string[]
  /** IDs from PLACES that were visited this year */
  placeIds: string[]
  /** IDs from MESSAGES that belong to this year */
  messageIds?: string[]
  milestones?: Array<{ icon: string; label: string }>
}

export interface Place {
  id: string
  name: string
  /** Region / state, e.g. "West Bengal" */
  region: string
  /** Photos for this place. First entry is the hero shown in the grid; the rest appear in the gallery overlay when tapped. */
  photos?: string[]
  /** @deprecated — use `photos` instead. Kept for back-compat with older data; normalised by getPlacePhotos(). */
  photo?: string
  dates: string
  note: string
  /** Real-world latitude (decimal degrees) */
  lat: number
  /** Real-world longitude (decimal degrees) */
  lng: number
  /** Horizontal % position on the legacy abstract SVG (kept for back-compat) */
  xPct?: number
  /** Vertical % position on the legacy abstract SVG (kept for back-compat) */
  yPct?: number
  memoryIds?: string[]
}

export interface Message {
  id: string
  /** 'A' = partnerA (Pranjal), 'B' = partnerB (her) */
  sender: 'A' | 'B'
  text: string
  date: string
  year: number
}

export interface LittleThing {
  id: string
  /** Lucide icon name, e.g. "Music", "Coffee", "Heart" */
  iconName: string
  label: string
  detail: string
  category?: string
}

/** Legacy type aliases */
export type ChapterId = 'hero' | 'beginning' | 'growing' | 'hardYears' | 'choosing' | 'future' | 'reveal'
export type SectionId = ChapterId
export interface SectionMeta { id: ChapterId; number: number; label: string; eyebrow: string; heading: string; path: string }
export type EmotionalPhase = 'beginning' | 'growing' | 'difficult' | 'choosing' | 'future'
export interface DeviceCapability {
  deviceClass: 'low' | 'mid' | 'high'
  supportsWebGL: boolean
  prefersReducedMotion: boolean
  isTouchDevice: boolean
  isLowEndGPU: boolean
  pixelRatio: number
}
export interface ImageAsset { id: string; src: string; alt?: string; type: 'image'; format?: string; srcSet?: string; placeholder?: string }
export interface AudioAsset { id: string; src: string; type: 'audio'; duration?: number; mimeType?: string }
