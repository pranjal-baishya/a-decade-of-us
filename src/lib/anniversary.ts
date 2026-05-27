import { COUPLE } from '@/data/couple'

/** Returns true when today's month+day matches the anniversary date */
export function isAnniversaryToday(): boolean {
  const today = new Date()
  const [, month, day] = COUPLE.anniversaryDate.split('-').map(Number)
  return today.getMonth() + 1 === month && today.getDate() === day
}
