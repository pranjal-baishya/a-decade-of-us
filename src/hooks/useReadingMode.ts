import { useContext } from 'react'
import { ReadingModeContext } from '@/contexts/ReadingModeContext'

export function useReadingMode(): { isReading: boolean; toggle: () => void } {
  return useContext(ReadingModeContext)
}
