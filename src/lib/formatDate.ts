/**
 * Canonical date formatting for A Decade of Us.
 * All dates are stored in varied formats (e.g. "May 2016", "May 29, 2016",
 * "MAY 29, 2016", "2019", "Jun 2021"). This utility normalises them so
 * every surface shows a consistent style.
 *
 * We intentionally keep the logic non-destructive: if we can't parse the
 * input we return it unchanged so nothing breaks.
 *
 * Canonical formats:
 *   formatLong  → "May 2016"  or "May 29, 2016"  (title-case, full)
 *   formatShort → "MAY 2016"  or "MAY 29, 2016"  (uppercase — for eyebrows)
 *   formatYear  → "2016"
 */

function toTitleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b\w+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
}

export function formatLong(input: string | undefined): string {
  if (!input) return ''
  return toTitleCase(input.trim())
}

export function formatShort(input: string | undefined): string {
  if (!input) return ''
  return input.trim().toUpperCase()
}

export function formatYear(input: string | undefined): string {
  if (!input) return ''
  const match = input.match(/\d{4}/)
  return match ? match[0] : input.trim()
}
