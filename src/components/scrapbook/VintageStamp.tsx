import { type ReactNode } from 'react'

interface VintageStampProps {
  year: number | string
  label?: string
  size?: number
  rotate?: number
  opacity?: number
  className?: string
}

/**
 * SVG vintage postage stamp with perforated edge, postmark ring, and year.
 * Self-contained — drop anywhere as an absolutely-positioned decoration.
 */
export function VintageStamp({ year, label, size = 72, rotate = 4, opacity = 0.92, className = '' }: VintageStampProps): ReactNode {
  const perf = 6    // perforation dot count per side
  const r    = 2.5  // perforation radius
  const pad  = 7    // padding inside perforations
  const inner = size - pad * 2

  const dots: Array<{ cx: number; cy: number }> = []
  // Top & bottom rows
  for (let i = 0; i <= perf; i++) {
    const x = pad + (i / perf) * inner
    dots.push({ cx: x, cy: r })
    dots.push({ cx: x, cy: size - r })
  }
  // Left & right cols (skip corners already placed)
  for (let i = 1; i < perf; i++) {
    const y = pad + (i / perf) * inner
    dots.push({ cx: r, cy: y })
    dots.push({ cx: size - r, cy: y })
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, opacity, display: 'block' }}
      aria-hidden
    >
      {/* Background */}
      <rect x={pad} y={pad} width={inner} height={inner} fill="rgba(237,226,200,0.10)" rx={1.5} />
      {/* Fine border */}
      <rect x={pad + 1.5} y={pad + 1.5} width={inner - 3} height={inner - 3} stroke="rgba(196,149,42,0.55)" strokeWidth="0.8" rx={1} fill="none" />

      {/* Perforation dots */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={r} fill="rgba(10,8,6,0.9)" />
      ))}

      {/* Postmark circle (faint ring) */}
      <circle cx={size / 2} cy={size / 2} r={size * 0.3} stroke="rgba(196,149,42,0.30)" strokeWidth="0.8" fill="none" strokeDasharray="3 2" />

      {/* Year number */}
      <text
        x={size / 2}
        y={size * 0.54}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.22}
        fontFamily='"Playfair Display", serif'
        fontWeight="500"
        fill="rgba(228,169,60,0.9)"
        letterSpacing="0.05em"
      >
        {year}
      </text>

      {/* Optional label below year */}
      {label && (
        <text
          x={size / 2}
          y={size * 0.72}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size * 0.095}
          fontFamily='"Caveat", cursive'
          fill="rgba(196,149,42,0.60)"
          letterSpacing="0.04em"
        >
          {label.length > 14 ? label.slice(0, 13) + '…' : label}
        </text>
      )}

      {/* Decorative rose silhouette (minimal SVG path) */}
      <text
        x={size / 2}
        y={size * 0.32}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={size * 0.15}
        fill="rgba(196,149,42,0.35)"
      >
        ✦
      </text>
    </svg>
  )
}
