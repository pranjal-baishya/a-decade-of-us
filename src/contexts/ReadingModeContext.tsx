import { createContext, useState, type ReactNode } from 'react'

interface ReadingModeCtx {
  isReading: boolean
  toggle: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ReadingModeContext = createContext<ReadingModeCtx>({ isReading: false, toggle: () => {} })

export function ReadingModeProvider({ children }: { children: ReactNode }): ReactNode {
  const [isReading, setIsReading] = useState(false)
  const toggle = (): void => setIsReading((v) => !v)
  return (
    <ReadingModeContext value={{ isReading, toggle }}>
      {children}
    </ReadingModeContext>
  )
}
