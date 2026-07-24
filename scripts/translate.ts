/**
 * Machine-translate the English source copy into every non-English locale using
 * Google Cloud Translate (v2 REST), and write one JSON bundle per locale plus a
 * generated index that i18n-content merges in.
 *
 *   GOOGLE_TRANSLATE_API_KEY=xxx npm run translate          # generate all
 *   npm run translate -- --dry                              # validate, no API
 *   GOOGLE_TRANSLATE_API_KEY=xxx npm run translate -- de fr # only some locales
 *
 * What it translates: the prose fields of products, applications, and the grade
 * catalogue. It never translates slugs, hrefs, anchor ids, image keys, grade
 * codes, or size lists (see KEEP_KEYS). Markdown links and bold are protected by
 * routing the request through Translate's HTML mode, so [label](/href) keeps its
 * href and **bold** survives — only the human-readable text is translated.
 *
 * Output is machine translation for review; hand-written overrides in
 * i18n-content.ts are layered on top and always win.
 */
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { products } from '../src/lib/products.ts'
import { applications } from '../src/lib/applications.ts'
import { catalog } from '../src/lib/product-catalog.ts'
import { primaryNav, resourceMenu, footerColumns, trustPoints, legalLinks } from '../src/lib/site.ts'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(HERE, '../src/lib/i18n-generated')
const SRC_DIR = join(HERE, '../src')

/* -------------------------------- UI harvest --------------------------------- */
// UI chrome is translated via t(locale, "English"), keyed by the English source.
// We discover every source string two ways: scan the codebase for t() literals,
// and read the structural labels out of site.ts. A few entries are keyed by a
// symbol rather than their English text (e.g. footerAbout) — those map key ->
// English source here so the translation lands under the key t() looks up.
const KEYED: Record<string, string> = {
  footerAbout:
    'Manufacturer and finisher of the complete range of industrial diamond and superabrasive materials, supplying tool makers worldwide from London.',
}

const T_LITERAL = /\bt\(\s*[A-Za-z0-9_.]+\s*,\s*(['"`])((?:\\.|(?!\1)[\s\S])*?)\1\s*\)/g

const walkSource = (dir: string): string[] => {
  const out: string[] = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'i18n-generated') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walkSource(p))
    else if (/\.tsx?$/.test(e.name)) out.push(p)
  }
  return out
}

// key -> English source. key === source for plain literals; differs for KEYED.
const harvestUi = (): Map<string, string> => {
  const map = new Map<string, string>()
  for (const file of walkSource(SRC_DIR)) {
    const src = readFileSync(file, 'utf8')
    let m: RegExpExecArray | null
    while ((m = T_LITERAL.exec(src))) {
      const raw = m[2]
      if (raw.includes('${')) continue // interpolated — cannot translate statically
      const val = raw.replace(/\\(['"`\\])/g, '$1').replace(/\\n/g, '\n')
      if (val.trim()) map.set(val, val)
    }
  }
  for (const s of trustPoints) map.set(s, s)
  for (const n of primaryNav) map.set(n.label, n.label)
  for (const r of resourceMenu) map.set(r.label, r.label)
  for (const c of footerColumns) {
    map.set(c.title, c.title)
    for (const l of c.links) map.set(l.label, l.label)
  }
  for (const l of legalLinks) map.set(l.label, l.label)
  for (const p of products) map.set(p.name, p.name)
  for (const a of applications) map.set(a.name, a.name)
  for (const [k, v] of Object.entries(KEYED)) map.set(k, v) // key -> English value
  return map
}

const ALL_LOCALES = ['de', 'es', 'it', 'ja', 'fr', 'ko', 'zh'] as const
const argv = process.argv.slice(2)
const DRY = argv.includes('--dry')
// --auto is the build-time mode (npm prebuild): if the key is absent it skips
// cleanly (English fallback), and any translation error is swallowed so a flaky
// API can never fail the production build.
const AUTO = argv.includes('--auto')
const picked = argv.filter((a) => !a.startsWith('--'))
const LOCALES = picked.length ? (picked as string[]) : (ALL_LOCALES as readonly string[])

// Keys whose string values are structural, not prose — never translated.
const KEEP_KEYS = new Set([
  'slug', 'family', 'href', 'id', 'image', 'imageGallery', 'imageRatio',
  'code', 'sizes', 'micronSizes',
])

/* ----------------------------- markdown <-> html ----------------------------- */
// Translate's html format preserves tags and their attributes, so we tunnel
// markdown links/bold through as tags and convert back afterwards.
const mdToHtml = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, (_, t) => `<b>${t}</b>`)

const decodeEntities = (s: string) =>
  s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#3?9;/g, "'").replace(/&#160;|&nbsp;/g, ' ')

const htmlToMd = (s: string) =>
  decodeEntities(
    s
      .replace(/<a href="([^"]*)">([^<]*)<\/a>/g, (_, h, t) => `[${t}](${h})`)
      .replace(/<b>([^<]*)<\/b>/g, (_, t) => `**${t}**`),
  )

/* ------------------------------ string harvesting ---------------------------- */
const collect = (value: unknown, key: string | undefined, out: Set<string>) => {
  if (typeof value === 'string') {
    if (key && KEEP_KEYS.has(key)) return
    if (value.trim()) out.add(value)
    return
  }
  if (Array.isArray(value)) {
    if (key && KEEP_KEYS.has(key)) return // e.g. sizes: string[]
    value.forEach((v) => collect(v, key, out))
    return
  }
  if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) collect(v, k, out)
  }
}

const rebuild = (value: unknown, key: string | undefined, map: Map<string, string>): unknown => {
  if (typeof value === 'string') {
    if (key && KEEP_KEYS.has(key)) return value
    return map.get(value) ?? value
  }
  if (Array.isArray(value)) {
    if (key && KEEP_KEYS.has(key)) return value
    return value.map((v) => rebuild(v, key, map))
  }
  if (value && typeof value === 'object') {
    const o: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) o[k] = rebuild(v, k, map)
    return o
  }
  return value
}

/* ------------------------------- translate v2 -------------------------------- */
const KEY = process.env.GOOGLE_TRANSLATE_API_KEY
// Batch by BOTH segment count and total characters, so a run of long paragraphs
// can't push a single request past Translate's size limit (~128 segments /
// ~30k chars). Caps: 100 segments and 12k chars per request.
const batchStrings = (arr: string[]): string[][] => {
  const out: string[][] = []
  let cur: string[] = []
  let chars = 0
  for (const s of arr) {
    if (cur.length && (cur.length >= 100 || chars + s.length > 12_000)) {
      out.push(cur)
      cur = []
      chars = 0
    }
    cur.push(s)
    chars += s.length
  }
  if (cur.length) out.push(cur)
  return out
}

const translateBatch = async (texts: string[], target: string): Promise<string[]> => {
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: texts, source: 'en', target, format: 'html' }),
    },
  )
  if (!res.ok) throw new Error(`Translate ${target} failed ${res.status}: ${await res.text()}`)
  const json = (await res.json()) as { data: { translations: { translatedText: string }[] } }
  return json.data.translations.map((t) => t.translatedText)
}

/* --------------------------------- driver ------------------------------------ */
const productsBySlug = Object.fromEntries(products.map((p) => [p.slug, p]))
const applicationsBySlug = Object.fromEntries(applications.map((a) => [a.slug, a]))

const run = async () => {
  // Harvest every unique prose string across the datasets and the UI chrome.
  const strings = new Set<string>()
  collect(products, undefined, strings)
  collect(applications, undefined, strings)
  collect(catalog, undefined, strings)
  const uiMap = harvestUi() // key -> English source
  for (const source of uiMap.values()) if (source.trim()) strings.add(source)
  const unique = [...strings]
  const htmlForms = unique.map(mdToHtml)

  console.log(
    `Harvested ${unique.length} unique strings ` +
      `(${htmlForms.reduce((n, s) => n + s.length, 0).toLocaleString()} chars) ` +
      `across products, applications, catalogue, and ${uiMap.size} UI strings.`,
  )

  if (DRY) {
    console.log('\n--dry: no API calls. Sample round-trips:')
    for (const s of unique.slice(0, 6)) {
      const rt = htmlToMd(mdToHtml(s))
      console.log(`  ok=${rt === s}  ${JSON.stringify(s.slice(0, 90))}`)
    }
    const withLinks = unique.filter((s) => /\[[^\]]+\]\([^)]+\)/.test(s))
    console.log(`\n${withLinks.length} strings contain markdown links (href-protected).`)
    console.log(`Would write bundles for: ${LOCALES.join(', ')}`)
    return
  }

  if (!KEY) {
    if (AUTO) {
      console.log('GOOGLE_TRANSLATE_API_KEY not set — skipping translation generation (English fallback).')
      return
    }
    throw new Error('GOOGLE_TRANSLATE_API_KEY is not set. Run with the key, or use --dry.')
  }

  const indexLines: string[] = []
  for (const locale of LOCALES) {
    console.log(`\n→ ${locale}`)
    const translated = new Map<string, string>()
    const batches = batchStrings(unique)
    let done = 0
    for (const batch of batches) {
      const htmlBatch = batch.map(mdToHtml)
      const outHtml = await translateBatch(htmlBatch, locale)
      outHtml.forEach((h, i) => translated.set(batch[i], htmlToMd(h)))
      done += batch.length
      process.stdout.write(`  ${done}/${unique.length}\r`)
    }

    const bundle = {
      products: Object.fromEntries(
        Object.entries(productsBySlug).map(([slug, p]) => [slug, rebuild(p, undefined, translated)]),
      ),
      applications: Object.fromEntries(
        Object.entries(applicationsBySlug).map(([slug, a]) => [slug, rebuild(a, undefined, translated)]),
      ),
      catalog: Object.fromEntries(
        Object.entries(catalog).map(([slug, sections]) => [
          slug,
          Object.fromEntries(
            Object.entries(sections).map(([id, sec]) => [id, rebuild(sec, undefined, translated)]),
          ),
        ]),
      ),
      ui: Object.fromEntries(
        [...uiMap].map(([key, source]) => [key, translated.get(source) ?? source]),
      ),
    }
    writeFileSync(join(OUT_DIR, `${locale}.json`), JSON.stringify(bundle, null, 2))
    indexLines.push(locale)
    console.log(`  wrote ${locale}.json`)
  }

  // Rewrite the index to import whatever bundles now exist.
  const imports = indexLines.map((l) => `import ${l} from './${l}.json'`).join('\n')
  const entries = indexLines.map((l) => `  ${l}: ${l} as GeneratedBundle,`).join('\n')
  const index = `import type { Locale } from '@/i18n/routing'

/**
 * Machine-translated content, generated by \`npm run translate\`. DO NOT edit by
 * hand — re-run the generator. Hand-written overrides in i18n-content.ts are
 * layered on top of these and always win.
 */
export type GeneratedBundle = {
  products?: Record<string, Record<string, unknown>>
  applications?: Record<string, Record<string, unknown>>
  catalog?: Record<string, Record<string, Record<string, unknown>>>
  ui?: Record<string, string>
}

${imports}

export const generated: Partial<Record<Locale, GeneratedBundle>> = {
${entries}
}
`
  writeFileSync(join(OUT_DIR, 'index.ts'), index)
  console.log(`\nDone. Generated ${indexLines.length} locale bundle(s).`)
}

mkdirSync(OUT_DIR, { recursive: true })
run().catch((e) => {
  console.error(e)
  // In build-time mode, never block the deploy — fall back to English.
  if (AUTO) {
    console.warn('Translation generation failed; continuing build with English fallback.')
    process.exit(0)
  }
  process.exit(1)
})
