/**
 * One-off image optimization script.
 * Run with: node scripts/optimize-images.mjs
 *
 * Recompresses everything in /public/ in-place:
 *  - assets/*.jpg       → max 1600px wide, q80 JPG progressive (real photo library)
 *  - memories/*.jpg     → max 1400px wide, q82 JPG progressive
 *  - backgrounds/*.jpg  → max 1600px wide, q78 JPG progressive
 *  - og-image.jpg       → 1200x630 q85 JPG progressive
 *  - pwa-192.png        → 192x192 PNG with full compression
 *  - pwa-512.png        → 512x512 PNG with full compression
 *
 * Writes optimized files in place. Reports before/after sizes.
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import heicConvert from 'heic-convert'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '../public')

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  return Math.round(bytes / 1024) + ' KB'
}

async function optimize(src, transformer, label) {
  const input = await fs.readFile(src)
  const before = input.length
  const output = await transformer(sharp(input)).toBuffer()
  await fs.writeFile(src, output)
  const after = output.length
  const saved = ((1 - after / before) * 100).toFixed(1)
  console.log(`${label.padEnd(36)} ${fmt(before).padStart(8)} → ${fmt(after).padStart(8)}  (-${saved}%)`)
  return { before, after }
}

async function main() {
  let totalBefore = 0
  let totalAfter = 0

  // Helper: re-encode every supported image in a folder to JPEG (1600px, q80).
  // Handles .jpg/.jpeg/.png/.heic/.heif transparently — output is always .jpg.
  async function processAssetsFolder(folderAbs, label) {
    let entries
    try {
      entries = await fs.readdir(folderAbs)
    } catch (e) {
      if (e.code === 'ENOENT') return { count: 0, before: 0, after: 0 }
      throw e
    }
    const files = entries.filter((f) => /\.(jpe?g|png|heic|heif)$/i.test(f))
    if (files.length === 0) return { count: 0, before: 0, after: 0 }

    console.log(`\n── /public/${label}/ ${'─'.repeat(Math.max(0, 56 - label.length))}`)
    let folderBefore = 0
    let folderAfter = 0
    for (const f of files.sort()) {
      const src = path.join(folderAbs, f)
      const input = await fs.readFile(src)
      const before = input.length
      const isHeic = /\.(heic|heif)$/i.test(f)

      // For HEIC: sharp's bundled libheif can fail on Apple HEVC variants.
      // Decode via heic-convert (pure JS) first to get a JPEG buffer,
      // then run that through sharp for resize/compression.
      let pipelineInput = input
      if (isHeic) {
        try {
          const jpegBuf = await heicConvert({ buffer: input, format: 'JPEG', quality: 0.95 })
          pipelineInput = Buffer.from(jpegBuf)
        } catch (e) {
          console.log(`  ⚠ ${f}: HEIC decode failed (${e.message}) — skipped`)
          continue
        }
      }
      const output = await sharp(pipelineInput)
        .rotate()
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true, mozjpeg: true })
        .toBuffer()

      // Always end up with .jpg on disk
      const finalName = f.replace(/\.(png|jpeg|heic|heif)$/i, '.jpg')
      const dst = path.join(folderAbs, finalName)
      await fs.writeFile(dst, output)
      if (path.resolve(dst) !== path.resolve(src)) await fs.unlink(src)

      const after = output.length
      const saved = ((1 - after / before) * 100).toFixed(1)
      console.log(`${label}/${finalName.padEnd(30)} ${fmt(before).padStart(8)} → ${fmt(after).padStart(8)}  (-${saved}%)`)
      folderBefore += before; folderAfter += after
    }
    return { count: files.length, before: folderBefore, after: folderAfter }
  }

  // assets/*.jpg (loose photo library) + assets/<place>/*.jpg (per-place folders)
  const assetsDir = path.join(PUBLIC, 'assets')
  try {
    const top = await fs.readdir(assetsDir, { withFileTypes: true })
    const subdirs = top.filter((d) => d.isDirectory()).map((d) => d.name).sort()
    const root = await processAssetsFolder(assetsDir, 'assets')
    totalBefore += root.before; totalAfter += root.after
    for (const sub of subdirs) {
      const r = await processAssetsFolder(path.join(assetsDir, sub), `assets/${sub}`)
      totalBefore += r.before; totalAfter += r.after
    }
  } catch (e) {
    if (e.code !== 'ENOENT') throw e
  }

  // memories/*.jpg
  const memoriesDir = path.join(PUBLIC, 'memories')
  const memEntries = (await fs.readdir(memoriesDir)).filter((f) => /\.jpe?g$/i.test(f))
  console.log('\n── /public/memories/ ───────────────────────────────────')
  for (const f of memEntries.sort()) {
    const { before, after } = await optimize(
      path.join(memoriesDir, f),
      (s) => s.rotate().resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 82, progressive: true, mozjpeg: true }),
      `memories/${f}`,
    )
    totalBefore += before; totalAfter += after
  }

  // backgrounds/*.jpg
  const bgDir = path.join(PUBLIC, 'backgrounds')
  const bgEntries = (await fs.readdir(bgDir)).filter((f) => /\.jpe?g$/i.test(f))
  console.log('\n── /public/backgrounds/ ────────────────────────────────')
  for (const f of bgEntries.sort()) {
    const { before, after } = await optimize(
      path.join(bgDir, f),
      (s) => s.rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
              .jpeg({ quality: 78, progressive: true, mozjpeg: true }),
      `backgrounds/${f}`,
    )
    totalBefore += before; totalAfter += after
  }

  // og-image
  console.log('\n── /public/og-image.jpg ─────────────────────────────────')
  {
    const src = path.join(PUBLIC, 'og-image.jpg')
    const { before, after } = await optimize(
      src,
      (s) => s.rotate().resize({ width: 1200, height: 630, fit: 'cover' })
              .jpeg({ quality: 85, progressive: true, mozjpeg: true }),
      'og-image.jpg',
    )
    totalBefore += before; totalAfter += after
  }

  // pwa-192 + pwa-512
  console.log('\n── /public/pwa-* ────────────────────────────────────────')
  for (const [file, size] of [['pwa-192.png', 192], ['pwa-512.png', 512]]) {
    const src = path.join(PUBLIC, file)
    const { before, after } = await optimize(
      src,
      (s) => s.resize({ width: size, height: size, fit: 'cover' })
              .png({ compressionLevel: 9, palette: true, quality: 90 }),
      file,
    )
    totalBefore += before; totalAfter += after
  }

  console.log('\n──────────────────────────────────────────────────────────')
  console.log(`Total before:  ${fmt(totalBefore).padStart(8)}`)
  console.log(`Total after:   ${fmt(totalAfter).padStart(8)}`)
  console.log(`Saved:         ${fmt(totalBefore - totalAfter).padStart(8)}  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`)
  console.log('──────────────────────────────────────────────────────────\n')
}

main().catch((e) => { console.error(e); process.exit(1) })
