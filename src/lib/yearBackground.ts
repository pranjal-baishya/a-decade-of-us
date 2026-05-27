/**
 * Maps each year chapter to one of four atmospheric background textures.
 *
 * Velvet  — quiet, premium, default romantic feel
 * Map     — vintage world map, used for travel-coded years
 * Leather — dark espresso leather journal, heavier emotional years
 * Starfield — starry night sky, reserved for the 10-year anniversary
 */
export type YearBgVariant = 'velvet' | 'map' | 'leather' | 'starfield'

const YEAR_BG: Record<number, YearBgVariant> = {
  2016: 'velvet',    // The Beginning
  2017: 'map',       // Growing (Guwahati trip)
  2018: 'leather',   // The Hard Year
  2019: 'map',       // Finding Our Way (Kolkata trip)
  2020: 'map',       // Quiet & Together (Udalguri trip)
  2021: 'velvet',    // Five Years milestone
  2022: 'map',       // The Mountains (Sikkim trip)
  2023: 'velvet',    // New Chapters
  2024: 'leather',   // Almost a Decade
  2025: 'velvet',    // Nine Years
  2026: 'starfield', // A Decade — the climactic finale
}

export function getYearBackground(year: number): YearBgVariant {
  return YEAR_BG[year] ?? 'velvet'
}

export const BG_IMAGE: Record<YearBgVariant, string> = {
  velvet:    '/backgrounds/year-velvet.jpg',
  map:       '/backgrounds/year-map.jpg',
  leather:   '/backgrounds/year-leather.jpg',
  starfield: '/backgrounds/year-starfield.jpg',
}

/** Opacity at which each background shows through — tuned so texture is visible
 *  but never competes with the photos / text above it. */
export const BG_OPACITY: Record<YearBgVariant, number> = {
  velvet:    0.45,
  map:       0.35,  // map has lots of contrast so lower opacity keeps text legible
  leather:   0.50,
  starfield: 0.55,
}
