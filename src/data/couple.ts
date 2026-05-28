/**
 * ─────────────────────────────────────────────────────────────────────────
 *   PERSONALIZATION — edit ONLY this file to make the app personal
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  partnerA       = your name (appears in "with love, ...")
 *  partnerB       = her name (appears in "Made for ...", hero reveal, final card)
 *  anniversaryDate = the date you became a couple (YYYY-MM-DD)
 *  song           = path to an mp3 inside public/ (e.g. '/audio/song.mp3')
 *                   set to null to disable background music
 *
 * Example with music enabled:
 *   song: '/audio/our-song.mp3'   ← drop file in public/audio/
 */
export interface CoupleConfig {
  partnerA: string
  partnerB: string
  anniversaryDate: string
  song: string | null
}

export const COUPLE: CoupleConfig = {
  partnerA: 'Pranjal',          // ← your name
  partnerB: 'Pari',             // ← her name
  anniversaryDate: '2016-05-29', // ← the day it started
  song: null,                   // ← e.g. '/audio/our-song.mp3'
}
