export type MediaType = 'image' | 'video' | 'audio'

export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'avif'

export interface MediaAsset {
  id: string
  src: string
  alt?: string
  type: MediaType
  width?: number
  height?: number
  placeholder?: string
}

export interface ImageAsset extends MediaAsset {
  type: 'image'
  format?: ImageFormat
  srcSet?: string
}

export interface AudioAsset extends MediaAsset {
  type: 'audio'
  duration?: number
  mimeType?: string
}

export type DeviceClass = 'low' | 'mid' | 'high'

export interface DeviceCapability {
  deviceClass: DeviceClass
  supportsWebGL: boolean
  prefersReducedMotion: boolean
  isTouchDevice: boolean
  isLowEndGPU: boolean
  pixelRatio: number
}
