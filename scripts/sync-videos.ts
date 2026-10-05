/**
 * Copies every ImageKit video rendition the site uses into public/video/ so the
 * site's own CDN serves them. Why: see the note on videoSources() in
 * src/components/videoSources.ts (ImageKit caches video per User-Agent).
 *
 *   npm run videos
 *
 * Re-run after uploading or replacing a clip in ImageKit, then commit
 * public/video/ and src/lib/video-manifest.json. Clips are found by scanning
 * src/ for ImageKit .mp4 URLs, so a new hero video is picked up automatically.
 * File names carry a content hash, so a replaced clip gets a new URL and the
 * year-long immutable cache can never serve a stale copy.
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { VIDEO_LADDER, videoVariantUrl } from '../src/components/videoSources'

const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public', 'video')
const MANIFEST = join(ROOT, 'src', 'lib', 'video-manifest.json')
const URL_RE = /https:\/\/ik\.imagekit\.io\/qcvroy8xpd\/[^'"`\s)?]+\.mp4/g

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(name) ? [p] : []
  })

const slug = (url: string) =>
  decodeURIComponent(url.split('/').pop()!.replace(/\.mp4$/, ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

async function main() {
  const clips = [...new Set(walk(join(ROOT, 'src')).flatMap((f) => readFileSync(f, 'utf8').match(URL_RE) ?? []))].sort()
  if (!clips.length) throw new Error('No ImageKit .mp4 URLs found under src/')

  rmSync(OUT, { recursive: true, force: true })
  mkdirSync(OUT, { recursive: true })
  const manifest: Record<string, Record<string, string>> = {}

  for (const clip of clips) {
    manifest[clip] = {}
    for (const webm of [true, false]) {
      for (const { w } of VIDEO_LADDER) {
        const src = videoVariantUrl(clip, w, webm)
        const res = await fetch(src)
        const type = res.headers.get('content-type') ?? ''
        const ext = webm ? 'webm' : 'mp4'
        if (!res.ok || !type.includes(ext)) throw new Error(`${src} -> ${res.status} ${type}`)
        const buf = Buffer.from(await res.arrayBuffer())
        const hash = createHash('sha256').update(buf).digest('hex').slice(0, 10)
        const file = `${slug(clip)}.${w ?? 'full'}.${hash}.${ext}`
        writeFileSync(join(OUT, file), buf)
        manifest[clip][`${ext}-${w ?? 'full'}`] = `/video/${file}`
        console.log(`${(buf.length / 1024).toFixed(0).padStart(5)} KB  ${file}`)
      }
    }
  }

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`\n${clips.length} clips -> public/video/, manifest -> src/lib/video-manifest.json`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
