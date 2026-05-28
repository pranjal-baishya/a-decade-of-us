import type { Photo } from '@/data/photoLibrary'

/**
 * Maximum number of photos shown in a single Year Chapter scrapbook spread.
 * Years with more than this get a "highlights" subset; the full set is still
 * available on the Album page. Years with ≤ this many photos show all of
 * them in BOTH places.
 */
export const HIGHLIGHTS_PER_YEAR = 15

/**
 * Pick a representative subset of photos for the Year Chapter.
 *
 *   1. Pinned photos (those tied to a curated MemoryCard for the year) are
 *      always included so the user's hand-written prose has its photo.
 *   2. The remaining slots are filled with EVENLY-SPACED samples across
 *      the year. This gives a Jan→Dec rhythm rather than just the first N
 *      taken on the same trip.
 *   3. The final list is returned chronologically so ScrapbookSpread keeps
 *      its date-ordered flow.
 */
export function pickHighlights(
  photos: readonly Photo[],
  cap: number,
  pinned: ReadonlySet<string>,
): Photo[] {
  if (photos.length <= cap) return [...photos]

  const pinnedPhotos = photos.filter((p) => pinned.has(p.src))
  const others       = photos.filter((p) => !pinned.has(p.src))

  // Already over cap from pinned alone — trim them in date order.
  if (pinnedPhotos.length >= cap) {
    return [...pinnedPhotos]
      .sort(byDate)
      .slice(0, cap)
  }

  const slots = cap - pinnedPhotos.length
  const picked: Photo[] =
    others.length <= slots
      ? [...others]
      : evenlySample(others, slots)

  const seen = new Set<string>()
  const all: Photo[] = []
  for (const p of [...pinnedPhotos, ...picked]) {
    if (!seen.has(p.id)) {
      seen.add(p.id)
      all.push(p)
    }
  }
  return all.sort(byDate)
}

function byDate(a: Photo, b: Photo): number {
  return a.date.localeCompare(b.date) || a.index - b.index
}

/** Pick `count` items spread evenly across `arr` (already sorted). */
function evenlySample<T>(arr: T[], count: number): T[] {
  if (count >= arr.length) return arr.slice()
  const result: T[] = []
  const step = arr.length / count
  for (let i = 0; i < count; i++) {
    const idx = Math.min(arr.length - 1, Math.floor(i * step + step / 2))
    result.push(arr[idx]!)
  }
  return result
}
