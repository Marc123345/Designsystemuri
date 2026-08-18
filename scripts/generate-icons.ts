/**
 * Regenerates src/lib/icons.ts from the tabler icons the site actually uses.
 *
 * Why this exists: icons.ts is the offline icon collection, and its whole point
 * is that <Icon> renders from local data instead of calling the Iconify API at
 * runtime. That guarantee only holds if the file lists every tabler:* name in
 * the codebase, and it was maintained by hand — so it drifted. Seven icons were
 * referenced without being registered, including the mobile menu button on
 * every page, and one of them (tabler:lens) does not exist in tabler at all, so
 * it could never have rendered by any route.
 *
 * The file already told whoever came next to "regenerate". There was nothing to
 * regenerate it with. This is that.
 *
 *   npm run icons
 *
 * It scans src/ for tabler:<name>, resolves each against the local
 * @iconify/json data (following aliases), and rewrites icons.ts. Names that do
 * not exist in the set are reported and the script exits non-zero rather than
 * writing a file that silently omits them — a missing icon should fail loudly
 * here, not render as an empty span in production.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type IconData = { body: string; width?: number; height?: number }
type TablerSet = {
  icons: Record<string, IconData>
  aliases?: Record<string, { parent: string }>
  width?: number
  height?: number
}

const SRC = 'src'
const OUT = 'src/lib/icons.ts'
const SET = 'node_modules/@iconify/json/json/tabler.json'

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(tsx?|mts|cts)$/.test(path) ? [path] : []
  })

const tabler: TablerSet = JSON.parse(readFileSync(SET, 'utf8'))

// Collect every tabler:<name> in the source, ignoring the generated file itself
// so last run's output cannot keep an icon alive after its last real use.
const used = new Set<string>()
for (const file of walk(SRC)) {
  if (file.endsWith('lib/icons.ts')) continue
  for (const match of readFileSync(file, 'utf8').matchAll(/tabler:([a-z0-9-]+)/g)) {
    used.add(match[1])
  }
}

/** Aliases point at a parent icon; the body lives on the parent. */
const resolve = (name: string): IconData | null => {
  const direct = tabler.icons[name]
  if (direct) return direct
  const alias = tabler.aliases?.[name]
  return alias ? (tabler.icons[alias.parent] ?? null) : null
}

const names = [...used].sort()
const missing = names.filter((n) => !resolve(n))

if (missing.length) {
  console.error(`\n  ${missing.length} icon name(s) not present in the tabler set:\n`)
  for (const name of missing) console.error(`    tabler:${name}`)
  console.error('\n  These render as nothing. Fix the name at the call site, then re-run.\n')
  process.exit(1)
}

const quote = (name: string) => (/^[a-z][a-z0-9]*$/.test(name) ? name : `'${name}'`)

const body = names
  .map((name) => {
    const icon = resolve(name)!
    const extra = [icon.width && icon.width !== tabler.width ? `      width: ${icon.width},` : '', icon.height && icon.height !== tabler.height ? `      height: ${icon.height},` : ''].filter(Boolean).join('\n')
    return `    ${quote(name)}: {\n      body: ${JSON.stringify(icon.body)},\n${extra ? extra + '\n' : ''}    },`
  })
  .join('\n')

writeFileSync(
  OUT,
  `// AUTO-GENERATED — do not edit by hand. Run \`npm run icons\` to regenerate.
//
// Registers only the tabler icons the site actually uses, so <Icon> from
// @iconify/react resolves them from local data with no runtime Iconify API
// call. The generator scans src/ for tabler:* names, so adding an icon anywhere
// and re-running is all that is needed — and a name that does not exist in the
// tabler set fails the generator instead of rendering as an empty span.
import { addCollection } from '@iconify/react'

addCollection({
  prefix: 'tabler',
  width: ${tabler.width ?? 24},
  height: ${tabler.height ?? 24},
  icons: {
${body}
  },
})
`,
)

console.log(`  Wrote ${OUT} — ${names.length} icons.`)
