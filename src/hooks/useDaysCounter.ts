import { COUPLE } from '@/data/couple'

export interface DaysCounter {
  years: number
  totalDays: number
}

/**
 * How many years and days since the anniversary.
 *
 * Years are calendar-accurate (full anniversaries elapsed) — not derived
 * from days/365.25 which drifts. We also treat the EVE of the anniversary
 * as "already there": on the day before the anniversary the counter shows
 * the new year, so the milestone reads correctly throughout the celebration
 * day instead of flipping at midnight.
 */
export function useDaysCounter(): DaysCounter {
  // Parse the anniversary as a LOCAL-TZ date so day comparisons are stable.
  const [yyyy, mm, dd] = COUPLE.anniversaryDate.split('-').map(Number) as [number, number, number]
  const start = new Date(yyyy, mm - 1, dd)
  const now = new Date()

  const diffMs = Math.max(0, now.getTime() - start.getTime())
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  // Calendar-year math.
  let years = now.getFullYear() - start.getFullYear()
  const annivThisYear = new Date(now.getFullYear(), start.getMonth(), start.getDate())

  // If we're before this year's anniversary, normally subtract one — but
  // keep the higher count if we're already inside the 24h "eve" window.
  if (now < annivThisYear) {
    const dayMs = 24 * 60 * 60 * 1000
    const msUntil = annivThisYear.getTime() - now.getTime()
    if (msUntil > dayMs) years -= 1
  }

  return { years, totalDays }
}
