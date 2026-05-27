/**
 * Maps each year to an emotional phase and a cinematic background tint.
 * The tint is applied as a soft-light overlay in CinematicBackground.
 */
export type EmotionalPhase =
  | 'beginning'
  | 'growing'
  | 'hardYears'
  | 'choosing'
  | 'mountains'
  | 'future'
  | 'neutral'

const YEAR_PHASE: Record<number, EmotionalPhase> = {
  2016: 'beginning',
  2017: 'growing',
  2018: 'hardYears',
  2019: 'choosing',
  2020: 'choosing',
  2021: 'growing',
  2022: 'mountains',
  2023: 'future',
  2024: 'future',
  2025: 'future',
  2026: 'future',
}

export function getYearPhase(year: number): EmotionalPhase {
  return YEAR_PHASE[year] ?? 'neutral'
}

/** CSS color string for the soft-light tint overlay, or null for neutral */
export const PHASE_TINT: Record<EmotionalPhase, string | null> = {
  beginning: 'rgba(196,149,42,0.07)',   // warm amber — first spark
  growing:   'rgba(180,160,80,0.06)',   // golden warmth — building
  hardYears: 'rgba(70,90,140,0.06)',    // cool blue — difficult
  choosing:  'rgba(120,160,100,0.05)',  // soft green — renewal
  mountains: 'rgba(100,140,160,0.06)', // cool cyan — mountains
  future:    'rgba(200,140,70,0.07)',   // warm gold — horizon
  neutral:   null,
}
