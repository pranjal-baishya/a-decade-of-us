import { type ReactNode } from 'react'

interface ReducedMotionProviderProps {
  children: ReactNode
}

/**
 * Pass-through provider kept for future expansion of motion preferences.
 * Components currently use the `useReducedMotion` hook directly which reads
 * the `prefers-reduced-motion` media query at the source.
 */
export function ReducedMotionProvider({ children }: ReducedMotionProviderProps): ReactNode {
  return <>{children}</>
}
