import type { Variants, Transition, TargetAndTransition } from 'framer-motion'

export type MotionVariants = Variants

export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

export type EasingName = 'cinematic' | 'spring' | 'gentle' | 'snappy' | 'linear'

export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: EasingName
  once?: boolean
  amount?: number | 'some' | 'all'
}

export interface RevealConfig extends AnimationConfig {
  direction?: AnimationDirection
  distance?: number
}

export interface StaggerConfig extends AnimationConfig {
  staggerChildren?: number
  delayChildren?: number
}

export interface ParallaxConfig {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  clamp?: boolean
}

export interface GlowConfig {
  color?: string
  intensity?: number
  radius?: number
  pulse?: boolean
}

export type AnimationState = 'idle' | 'entering' | 'visible' | 'exiting' | 'hidden'

export interface AnimationPreset {
  initial: TargetAndTransition
  animate: TargetAndTransition
  exit?: TargetAndTransition
  transition?: Transition
}
