import IconIndex from '@/components/home/IconIndex'
import type { Locale } from '@/i18n/routing'

/**
 * The six application hubs as a compact icon index.
 *
 * ── What this replaced, and why ─────────────────────────────────────────────
 *
 * Six landscape photo cards in a 3x2 CurtainGrid. Measured, that section ran
 * 946px against a 767px viewport — 1.23 screens for what is, functionally, a
 * six-item index. The photographs were doing no work the labels were not
 * already doing: a reader scanning for "Dental" finds it by reading the word,
 * not by recognising a gloved hand. Six full-bleed images is the treatment you
 * give a gallery, not a menu.
 *
 * Compressing the section does not shorten the route: every tile still links to
 * its full hub page exactly as the photo cards did.
 *
 * ── Icons ───────────────────────────────────────────────────────────────────
 *
 * All tabler, resolved offline through src/lib/icons.ts. Adding a name here
 * means running `npm run icons` — the script fails loudly on a name that does
 * not exist rather than shipping an empty span.
 *
 * The card and grid themselves live in IconIndex, shared with the QC controls
 * block below it so the two stay identical by construction.
 */

const HUB_ICONS: Record<string, string> = {
  dental: 'tabler:dental',
  'grinding-cutting-sawing-drilling': 'tabler:tools',
  'semiconductor-electronics': 'tabler:cpu',
  'automotive-aerospace': 'tabler:plane',
  'tool-and-die': 'tabler:settings',
  'polishing-lapping': 'tabler:diamond',
}

export interface HubEntry {
  slug: string
  name: string
}

export default function ApplicationIndex({ hubs, locale }: { hubs: HubEntry[]; locale: Locale }) {
  return (
    <IconIndex
      locale={locale}
      columns={3}
      items={hubs.map((hub) => ({
        label: hub.name,
        icon: HUB_ICONS[hub.slug] ?? 'tabler:circle-check',
        href: `/applications/${hub.slug}`,
      }))}
    />
  )
}
