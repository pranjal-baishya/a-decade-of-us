/**
 * Generates src/data/photoLibrary.ts from the files in /public/assets/.
 *
 * Run: node scripts/generate-photo-manifest.mjs
 *
 * Why a generated file (instead of import.meta.glob)?
 *   /public/ assets are static and not bundled, so Vite's glob can't see them.
 *   Generating a TS manifest gives us a tiny, type-safe list of photo metadata
 *   that powers Year Chapters, Album, etc. with zero runtime cost.
 *
 * Includes both:
 *   - loose photos from /public/assets/*.jpg              (placeId = undefined)
 *   - per-place photos from /public/assets/<place>/*.jpg  (placeId = folder name)
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.resolve(__dirname, '../public/assets')
const OUT_FILE = path.resolve(__dirname, '../src/data/photoLibrary.ts')

const NAME_RE = /^(\d{4})_(\d{2})_(\d{2})(?:_(\d+))?\.jpe?g$/i

function makePhoto(file, year, month, day, index, src, placeId) {
  const yyyy = String(year)
  const mm = String(month).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  const idSuffix = index > 0 ? `-${index}` : ''
  const idPrefix = placeId ? `pl-${placeId}` : 'p'
  return {
    id: `${idPrefix}-${yyyy}-${mm}-${dd}${idSuffix}`,
    src,
    date: `${yyyy}-${mm}-${dd}`,
    year,
    month,
    day,
    index,
    placeId: placeId ?? null,
    sortKey: `${yyyy}${mm}${dd}_${String(index).padStart(2, '0')}_${placeId ?? ''}`,
  }
}

async function readPhotosFrom(folderAbs, urlPrefix, placeId) {
  let entries
  try {
    entries = await fs.readdir(folderAbs)
  } catch (e) {
    if (e.code === 'ENOENT') return []
    throw e
  }
  return entries
    .filter((f) => NAME_RE.test(f))
    .map((file) => {
      const m = file.match(NAME_RE)
      const [, yyyy, mm, dd, n] = m
      const index = n ? Number(n) : 0
      return makePhoto(
        file,
        Number(yyyy),
        Number(mm),
        Number(dd),
        index,
        `${urlPrefix}/${file}`,
        placeId,
      )
    })
}

async function main() {
  const top = await fs.readdir(ASSETS_DIR, { withFileTypes: true })
  const placeFolders = top.filter((d) => d.isDirectory()).map((d) => d.name).sort()

  const loose = await readPhotosFrom(ASSETS_DIR, '/assets', null)
  const placePhotos = []
  for (const place of placeFolders) {
    const photos = await readPhotosFrom(path.join(ASSETS_DIR, place), `/assets/${place}`, place)
    placePhotos.push(...photos)
  }

  const photos = [...loose, ...placePhotos].sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  const byYear = new Map()
  for (const p of photos) {
    if (!byYear.has(p.year)) byYear.set(p.year, [])
    byYear.get(p.year).push(p)
  }

  // Build the TS source
  const banner = `/**
 * AUTO-GENERATED — DO NOT EDIT BY HAND.
 *
 * Regenerate with: node scripts/generate-photo-manifest.mjs
 *
 * Source: /public/assets/*.jpg  (loose, chronologically named photos)
 * Per-place photos live in /public/assets/<place>/ and are wired in places.ts.
 */
`

  const photoLines = photos.map((p) => {
    const placeField = p.placeId ? `, placeId: '${p.placeId}'` : ''
    return `  { id: '${p.id}', src: '${p.src}', date: '${p.date}', year: ${p.year}, month: ${p.month}, day: ${p.day}, index: ${p.index}${placeField} },`
  }).join('\n')

  const yearsSorted = [...byYear.keys()].sort((a, b) => a - b)
  const byYearLines = yearsSorted.map((y) => {
    const ids = byYear.get(y).map((p) => p.id)
    return `  ${y}: [${ids.map((id) => `byId['${id}']!`).join(', ')}],`
  }).join('\n')

  const out = `${banner}
export interface Photo {
  id: string
  src: string
  /** ISO date string, e.g. "2018-05-29" */
  date: string
  year: number
  /** 1-12 */
  month: number
  /** 1-31 */
  day: number
  /** 0 if the date is unique; otherwise 1, 2, 3... in chronological order within the day. */
  index: number
  /** Set when the photo lives in a per-place folder. Matches an id from PLACES. */
  placeId?: string
}

export const PHOTOS: readonly Photo[] = [
${photoLines}
] as const

const byId: Record<string, Photo> = Object.fromEntries(PHOTOS.map((p) => [p.id, p]))

/** Photos grouped by year, each list is chronological. */
export const PHOTOS_BY_YEAR: Readonly<Record<number, readonly Photo[]>> = {
${byYearLines}
}

/** Sorted list of years that have at least one photo. */
export const PHOTO_YEARS: readonly number[] = [${yearsSorted.join(', ')}]

/** Get all photos taken in a given year (empty array if none). */
export function getPhotosByYear(year: number): readonly Photo[] {
  return PHOTOS_BY_YEAR[year] ?? []
}

/** Find the first photo of a given year, or undefined. */
export function getFirstPhotoOfYear(year: number): Photo | undefined {
  return PHOTOS_BY_YEAR[year]?.[0]
}

/** Total photo count. */
export const PHOTO_COUNT = PHOTOS.length
`

  await fs.writeFile(OUT_FILE, out, 'utf8')

  console.log(`\nWrote ${path.relative(path.resolve(__dirname, '..'), OUT_FILE)}`)
  console.log(`  ${photos.length} photos across ${yearsSorted.length} years`)
  for (const y of yearsSorted) {
    console.log(`    ${y}: ${byYear.get(y).length}`)
  }
  console.log()
}

main().catch((e) => { console.error(e); process.exit(1) })
