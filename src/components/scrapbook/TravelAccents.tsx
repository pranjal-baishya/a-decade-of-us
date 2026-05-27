import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'

interface TicketStubProps {
  destination: string
  date: string
  from?: string
  rotate?: number
  opacity?: number
}

/**
 * SVG train/bus ticket stub — used for travel-coded year chapters.
 */
export function TicketStub({ destination, date, from = 'Home', rotate = -3, opacity = 0.75 }: TicketStubProps): ReactNode {
  return (
    <motion.div
      style={{ display: 'inline-block', transform: `rotate(${rotate}deg)`, opacity }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE.cinema, delay: 0.3 }}
      aria-hidden
    >
      <svg
        width="120"
        height="54"
        viewBox="0 0 120 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Ticket body */}
        <rect x="1" y="1" width="118" height="52" rx="4" fill="rgba(237,226,200,0.12)" stroke="rgba(196,149,42,0.45)" strokeWidth="0.8" />
        {/* Perforation line */}
        <line x1="30" y1="2" x2="30" y2="52" stroke="rgba(196,149,42,0.30)" strokeWidth="0.6" strokeDasharray="3 2" />
        {/* Serrated left edge (small circles) */}
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx="30" cy={10 + i * 7} r="2.5" fill="rgba(10,8,6,0.9)" />
        ))}
        {/* From/to text */}
        <text x="8" y="18" fontSize="6" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.55)" letterSpacing="0.05em">
          {from.toUpperCase().slice(0, 6)}
        </text>
        <text x="8" y="28" fontSize="7" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.80)" letterSpacing="0.04em">
          →
        </text>
        <text x="8" y="39" fontSize="6" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.75)" letterSpacing="0.05em">
          {destination.toUpperCase().slice(0, 7)}
        </text>
        {/* Destination & date on right side */}
        <text x="40" y="22" fontSize="9" fontFamily='"Allura", cursive' fill="rgba(228,169,60,0.85)" letterSpacing="0.02em">
          {destination}
        </text>
        <text x="40" y="35" fontSize="6.5" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.60)" letterSpacing="0.06em">
          {date}
        </text>
        <text x="40" y="46" fontSize="5.5" fontFamily='"Poppins", sans-serif' fill="rgba(196,149,42,0.35)" letterSpacing="0.08em">
          ADMIT ONE
        </text>
      </svg>
    </motion.div>
  )
}

interface PassportStampProps {
  place: string
  date: string
  rotate?: number
  opacity?: number
}

/**
 * Faded oval passport stamp — used on travel year chapters.
 */
export function PassportStamp({ place, date, rotate = 8, opacity = 0.6 }: PassportStampProps): ReactNode {
  return (
    <motion.div
      style={{ display: 'inline-block', transform: `rotate(${rotate}deg)`, opacity }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE.cinema, delay: 0.4 }}
      aria-hidden
    >
      <svg
        width="80"
        height="56"
        viewBox="0 0 80 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Outer oval */}
        <ellipse cx="40" cy="28" rx="38" ry="26" stroke="rgba(196,149,42,0.55)" strokeWidth="1.2" />
        {/* Inner oval */}
        <ellipse cx="40" cy="28" rx="32" ry="20" stroke="rgba(196,149,42,0.30)" strokeWidth="0.6" />
        {/* Place name arced at top (approximated as straight for SVG simplicity) */}
        <text x="40" y="20" textAnchor="middle" fontSize="8" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.80)" letterSpacing="0.08em">
          {place.toUpperCase().slice(0, 10)}
        </text>
        {/* Date */}
        <text x="40" y="31" textAnchor="middle" fontSize="7" fontFamily='"Caveat", cursive' fill="rgba(196,149,42,0.65)" letterSpacing="0.06em">
          {date}
        </text>
        {/* DEPARTED text */}
        <text x="40" y="41" textAnchor="middle" fontSize="5.5" fontFamily='"Poppins", sans-serif' fill="rgba(196,149,42,0.40)" letterSpacing="0.15em">
          DEPARTED
        </text>
      </svg>
    </motion.div>
  )
}

