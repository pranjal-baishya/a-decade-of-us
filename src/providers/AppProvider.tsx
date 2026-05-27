import { type ReactNode } from 'react'
import { ReducedMotionProvider } from './ReducedMotionProvider'
import { useLenis } from '@/hooks/useLenis'
import { ReadingModeProvider } from '@/contexts/ReadingModeContext'

interface AppProviderProps {
  children: ReactNode
}

function LenisMount(): null {
  useLenis()
  return null
}

export function AppProvider({ children }: AppProviderProps): ReactNode {
  return (
    <ReducedMotionProvider>
      <ReadingModeProvider>
        <LenisMount />
        {children}
      </ReadingModeProvider>
    </ReducedMotionProvider>
  )
}
