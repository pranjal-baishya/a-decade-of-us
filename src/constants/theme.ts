export const COLORS = {
  background: {
    midnight: '#07080f',
    navyDeep: '#0a0c18',
    navy: '#0d1020',
    navyLight: '#141728',
    cosmicNavy: '#0e1020',
    warmCharcoal: '#1c1814',
  },
  accent: {
    gold: '#c9a84c',
    goldLight: '#e2c47a',
    goldDim: '#8a6e2a',
    sunsetGold: '#d4915a',
    roseGold: '#c4806e',
    roseGoldStrong: '#d4917e',
    blush: '#f4c2c2',
    blushDim: '#c49090',
  },
  text: {
    ivory: '#faf6f0',
    ivoryMuted: '#d4cfc8',
    gray: '#8a8a9a',
    grayDark: '#5a5a6a',
  },
  glow: {
    gold: 'rgba(201, 168, 76, 0.12)',
    goldStrong: 'rgba(201, 168, 76, 0.30)',
    roseGold: 'rgba(196, 128, 110, 0.15)',
    roseGoldStrong: 'rgba(196, 128, 110, 0.35)',
    sunset: 'rgba(212, 145, 90, 0.18)',
    white: 'rgba(255, 255, 255, 0.04)',
  },
} as const

/**
 * Three-point cinematic lighting rig values.
 * Key: warm 3500K   Fill: cool 5500K   Rim: rose-gold
 */
export const CINEMATIC_LIGHTING = {
  key: {
    color: '#ffc88a',
    intensity: 1.8,
    position: [3, 4, 2] as [number, number, number],
  },
  fill: {
    color: '#8a90c0',
    intensity: 0.3,
    position: [-4, 2, 3] as [number, number, number],
  },
  rim: {
    color: '#d4917e',
    intensity: 1.5,
    position: [0, -2, -4] as [number, number, number],
  },
  ambient: {
    color: '#0e0c18',
    intensity: 0.25,
  },
} as const

export const FONTS = {
  serif: '"Playfair Display", Georgia, "Times New Roman", serif',
  sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
} as const

export const SPACING = {
  chapterMinHeight: '100dvh',
  sectionPaddingY: {
    mobile: '5rem',
    tablet: '7rem',
    desktop: '10rem',
  },
  containerMaxWidth: '1280px',
  contentMaxWidth: '760px',
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const DURATION = {
  instant: 0.1,
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  cinematic: 1.6,
  dramatic: 2.4,
} as const

export const Z_INDEX = {
  scene: 0,
  overlay: 1,
  raised: 10,
  modal: 30,
  toast: 40,
  loading: 50,
} as const

/** Per-chapter color accents used to shift the 3D lighting + HTML theme */
export const CHAPTER_PALETTE = {
  hero: { primary: '#c4806e', secondary: '#c9a84c', bg: '#07080f' },
  beginning: { primary: '#c9a84c', secondary: '#e2c47a', bg: '#0a0c18' },
  growing: { primary: '#e2c47a', secondary: '#d4915a', bg: '#0d1020' },
  hardYears: { primary: '#6a7a9a', secondary: '#8a9ab0', bg: '#08090e' },
  choosing: { primary: '#d4917e', secondary: '#c4806e', bg: '#0e0c12' },
  future: { primary: '#d4915a', secondary: '#e2c47a', bg: '#0d100a' },
  reveal: { primary: '#c9a84c', secondary: '#d4917e', bg: '#07080f' },
} as const
