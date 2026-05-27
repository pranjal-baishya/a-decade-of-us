import type { Variants } from 'framer-motion'
import { transitions } from './transitions'

/* ─── Fade ───────────────────────────────────────────────────────────────── */

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.slow },
  exit: { opacity: 0, transition: transitions.fast },
}

/* ─── Reveal (directional fade + translate) ─────────────────────────────── */

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: transitions.cinematic },
  exit: { opacity: 0, y: -20, transition: transitions.fast },
}

export const revealDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: transitions.cinematic },
  exit: { opacity: 0, y: 20, transition: transitions.fast },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: transitions.cinematic },
  exit: { opacity: 0, x: -20, transition: transitions.fast },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: transitions.cinematic },
  exit: { opacity: 0, x: 20, transition: transitions.fast },
}

/* ─── Scale ──────────────────────────────────────────────────────────────── */

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
  exit: { opacity: 0, scale: 0.95, transition: transitions.fast },
}

export const scaleInGentle: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.cinematic },
  exit: { opacity: 0, scale: 0.98, transition: transitions.fast },
}

/* ─── Stagger container ──────────────────────────────────────────────────── */

export function staggerContainer(staggerDelay = 0.12, delayChildren = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  }
}

/* ─── Page transitions ───────────────────────────────────────────────────── */

export const pageTransition: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.page },
  exit: { opacity: 0, transition: transitions.normal },
}

/* ─── Loading screen ─────────────────────────────────────────────────────── */

export const loadingExit: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] },
  },
}

/* ─── Glow pulse ─────────────────────────────────────────────────────────── */

export const glowPulse: Variants = {
  hidden: { opacity: 0.4 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/* ─── Drift (slow float) ─────────────────────────────────────────────────── */

export const driftY: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [-6, 6, -6],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}
