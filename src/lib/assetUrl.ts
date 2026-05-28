/**
 * Resolve a public-folder asset path against Vite's configured base URL.
 *
 * Why this exists:
 *   On GitHub Pages we serve under /a-decade-of-us/. Vite rewrites paths in
 *   bundled HTML/CSS to respect that base, but absolute paths in runtime
 *   `<img src="/foo.jpg">` JSX are NOT rewritten — they request the root
 *   domain and 404. Wrapping every dynamic image src with this helper keeps
 *   things working in dev (base=/), GH Pages (base=/a-decade-of-us/), and
 *   Vercel (base=/) without code changes.
 *
 * Examples:
 *   assetUrl('/assets/2016_05_31.jpg')
 *     → '/a-decade-of-us/assets/2016_05_31.jpg'   (when base is /a-decade-of-us/)
 *     → '/assets/2016_05_31.jpg'                  (when base is /)
 *
 *   assetUrl('https://example.com/foo.jpg')
 *     → 'https://example.com/foo.jpg'             (left untouched)
 */
export function assetUrl(p: string | undefined): string {
  if (!p) return ''
  // Already a fully-qualified URL — don't touch it.
  if (/^https?:\/\//i.test(p) || p.startsWith('data:') || p.startsWith('blob:')) {
    return p
  }
  const base = import.meta.env.BASE_URL // always ends with '/'
  return base + p.replace(/^\/+/, '')
}
