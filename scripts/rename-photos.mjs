/**
 * Rename photos in /public/assets/ to a clean YYYY_MM_DD.ext format.
 *
 * Run with: node scripts/rename-photos.mjs           (dry-run preview)
 *           node scripts/rename-photos.mjs --apply  (actually rename)
 *
 * Processes /public/assets/ (the loose photo library) AND every
 * subdirectory inside it (per-place folders like /public/assets/kolkata/).
 * Each folder is treated independently — _2, _3 counters reset per folder.
 *
 * Strategy per file:
 *   1. Find the first 8 consecutive digits in its name and validate as a date
 *      (year 2014..current+1, month 1-12, day 1-31).
 *   2. Look for an optional 6-digit time (HHMMSS) immediately after the date
 *      for chronological sorting.
 *   3. If no date is found in the filename, fall back to the file's mtime
 *      (modification time) — useful for camera filenames like IMG_0608.HEIC.
 *   4. Build new name: YYYY_MM_DD.ext, with _2, _3, ... for duplicates.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS_DIR = path.resolve(__dirname, '../public/assets')

const APPLY = process.argv.includes('--apply')

const IMG_EXT = /\.(jpe?g|png|heic|heif|webp|avif|gif)$/i

const CURRENT_YEAR = new Date().getFullYear()

function pad2(n) { return String(n).padStart(2, '0') }
function timeKeyFromDate(d) {
  return `${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}`
}

/** Parse the first 8-digit YYYYMMDD from a filename and (optionally) a 6-digit HHMMSS that follows. */
function parseDate(filename) {
  const stem = filename.replace(IMG_EXT, '')

  // Already-clean format: YYYY_MM_DD or YYYY-MM-DD (with optional _n suffix).
  // If the file is already in our target shape, return its date so the rename
  // is a no-op. This makes the script idempotent — re-running won't churn files.
  const cleanMatch = stem.match(/^(\d{4})[-_](\d{2})[-_](\d{2})(?:[-_]\d+)?$/)
  if (cleanMatch) {
    const [, yyyy, mm, dd] = cleanMatch
    const yy = Number(yyyy), mo = Number(mm), da = Number(dd)
    if (yy >= 2014 && yy <= CURRENT_YEAR + 1 && mo >= 1 && mo <= 12 && da >= 1 && da <= 31) {
      return { yyyy, mm, dd, timeKey: '000000', iso: `${yyyy}-${mm}-${dd}`, source: 'clean' }
    }
  }

  // Walk the string looking for the first 8 consecutive digits that form a valid date.
  // We use a sliding window so that 14-digit runs (YYYYMMDDHHMMSS, no separator) also work.
  for (let i = 0; i <= stem.length - 8; i++) {
    const slice = stem.slice(i, i + 8)
    if (!/^\d{8}$/.test(slice)) continue

    // Skip runs longer than 14 digits (probably not a date)
    const before = stem[i - 1]
    if (before && /\d/.test(before)) continue   // never start mid-digit

    const yyyy = Number(slice.slice(0, 4))
    const mm   = Number(slice.slice(4, 6))
    const dd   = Number(slice.slice(6, 8))
    if (yyyy < 2014 || yyyy > CURRENT_YEAR + 1) continue
    if (mm < 1 || mm > 12) continue
    if (dd < 1 || dd > 31) continue

    // Look for HHMMSS right after this date (with or without a separator)
    const after = stem.slice(i + 8)
    const timeMatch = after.match(/^[_\-\s]?(\d{6})(?!\d)/)
    let timeKey = '000000'
    if (timeMatch) {
      const t = timeMatch[1]
      const hh = Number(t.slice(0, 2))
      const mi = Number(t.slice(2, 4))
      const ss = Number(t.slice(4, 6))
      if (hh < 24 && mi < 60 && ss < 60) timeKey = t
    }

    return {
      yyyy: slice.slice(0, 4),
      mm: slice.slice(4, 6),
      dd: slice.slice(6, 8),
      timeKey,
      iso: `${slice.slice(0, 4)}-${slice.slice(4, 6)}-${slice.slice(6, 8)}`,
    }
  }
  return null
}

/**
 * Build a rename plan for one folder. Returns { plan, fromMtime } where
 * fromMtime counts files whose date was inferred from mtime (no date in name).
 */
async function planFolder(folderAbs) {
  const entries = await fs.readdir(folderAbs)
  const items = []
  let fromMtime = 0

  for (const file of entries) {
    if (!IMG_EXT.test(file)) continue
    const full = path.join(folderAbs, file)
    const stat = await fs.stat(full)
    if (!stat.isFile()) continue

    let parsed = parseDate(file)
    if (!parsed) {
      const m = stat.mtime
      parsed = {
        yyyy: String(m.getFullYear()),
        mm: pad2(m.getMonth() + 1),
        dd: pad2(m.getDate()),
        timeKey: timeKeyFromDate(m),
        iso: `${m.getFullYear()}-${pad2(m.getMonth() + 1)}-${pad2(m.getDate())}`,
        source: 'mtime',
      }
      fromMtime++
    }
    const ext = (file.match(IMG_EXT)?.[0] ?? '.jpg')
      .toLowerCase()
      .replace('.jpeg', '.jpg')
    items.push({
      original: file,
      parsed,
      ext,
      sortKey: `${parsed.yyyy}${parsed.mm}${parsed.dd}_${parsed.timeKey}_${file}`,
    })
  }

  items.sort((a, b) => a.sortKey.localeCompare(b.sortKey))

  const byDate = new Map()
  for (const it of items) {
    const key = `${it.parsed.yyyy}_${it.parsed.mm}_${it.parsed.dd}`
    if (!byDate.has(key)) byDate.set(key, [])
    byDate.get(key).push(it)
  }

  const plan = []
  for (const [key, list] of byDate) {
    list.forEach((it, i) => {
      const suffix = list.length === 1 ? '' : `_${i + 1}`
      it.newName = `${key}${suffix}${it.ext}`
      plan.push(it)
    })
  }
  return { plan, fromMtime }
}

async function applyPlan(folderAbs, plan, label) {
  const temps = []
  for (let i = 0; i < plan.length; i++) {
    const it = plan[i]
    if (it.original === it.newName) continue
    const tempName = `__rename_${i}_${it.newName}`
    await fs.rename(path.join(folderAbs, it.original), path.join(folderAbs, tempName))
    temps.push({ tempName, finalName: it.newName })
  }
  for (const { tempName, finalName } of temps) {
    await fs.rename(path.join(folderAbs, tempName), path.join(folderAbs, finalName))
  }
  console.log(`  ✓ ${label.padEnd(28)} renamed ${temps.length}/${plan.length}`)
  return temps.length
}

function printPlan(label, plan, fromMtime) {
  console.log(`\n── ${label} ${'─'.repeat(Math.max(0, 56 - label.length))}`)
  for (const it of plan) {
    const tag = it.parsed.source === 'mtime' ? ' [mtime]' : ''
    if (it.original === it.newName) {
      console.log(`  (ok)         ${it.newName}${tag}`)
    } else {
      console.log(`  ${it.original.padEnd(40)} → ${it.newName}${tag}`)
    }
  }
  if (fromMtime > 0) {
    console.log(`  (${fromMtime} file(s) used file mtime as date — no date in filename)`)
  }
}

async function main() {
  // Discover folders to process: ASSETS_DIR itself + each subdirectory inside.
  let topEntries
  try {
    topEntries = await fs.readdir(ASSETS_DIR, { withFileTypes: true })
  } catch (e) {
    console.error(`Cannot read ${ASSETS_DIR}: ${e.message}`)
    process.exit(1)
  }

  const folders = [{ abs: ASSETS_DIR, label: 'assets/' }]
  for (const d of topEntries) {
    if (d.isDirectory()) {
      folders.push({ abs: path.join(ASSETS_DIR, d.name), label: `assets/${d.name}/` })
    }
  }

  console.log(`\nMode: ${APPLY ? 'APPLY (renaming)' : 'DRY-RUN (no changes — pass --apply to commit)'}`)
  console.log(`Folders: ${folders.length}`)

  const folderResults = []
  let totalDated = 0
  let totalMtime = 0

  for (const f of folders) {
    const { plan, fromMtime } = await planFolder(f.abs)
    folderResults.push({ ...f, plan, fromMtime })
    totalDated += plan.length - fromMtime
    totalMtime += fromMtime
    printPlan(f.label, plan, fromMtime)
  }

  console.log(`\nTotal: ${totalDated} from filename, ${totalMtime} from mtime fallback.`)

  if (!APPLY) {
    console.log('\nDry-run complete. Re-run with --apply to actually rename.\n')
    return
  }

  console.log('\nApplying renames...')
  let totalRenamed = 0
  for (const r of folderResults) {
    totalRenamed += await applyPlan(r.abs, r.plan, r.label)
  }
  console.log(`\nDone. Renamed ${totalRenamed} files across ${folders.length} folders.\n`)
}

main().catch((e) => { console.error(e); process.exit(1) })
