import { COUPLE } from '@/data/couple'

export interface DaysCounter {
  years: number
  totalDays: number
}

export function useDaysCounter(): DaysCounter {
  const start = new Date(COUPLE.anniversaryDate)
  const now   = new Date()
  const diffMs = Math.max(0, now.getTime() - start.getTime())

  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const years     = Math.floor(totalDays / 365.25)

  return { years, totalDays }
}
