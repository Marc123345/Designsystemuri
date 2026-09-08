import { Icon } from '@iconify/react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

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
 * This is the same six hubs, same destinations, at roughly half the height:
 * icon, label, arrow. It reads as an index, which is what it is — the section's
 * own note already called the hubs "an index into the range rather than a point
 * on it".
 *
 * ── Each tile still goes somewhere ──────────────────────────────────────────
 *
 * Compressing the section does not shorten the route: every tile links to its
 * full hub page exactly as the photo cards did. The depth is one click away,
 * the same as before — it is only the shopfront that got smaller.
 *
 * ── Icons ───────────────────────────────────────────────────────────────────
 *
 * All tabler, all resolved offline through src/lib/icons.ts. Adding a name here
 * means running `npm run icons` — the script fails loudly on a name that does
 * not exist in the set rather than shipping an empty span, so a typo cannot
 * reach production silently.
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {hubs.map((hub) => (
        <Link
          key={hub.slug}
          href={`/applications/${hub.slug}`}
          className="group border-default-200 hover:border-primary focus-visible:border-primary flex items-center gap-4 border bg-white px-5 py-5 transition-colors"
        >
          <span className="bg-primary/5 text-primary group-hover:bg-primary flex size-12 shrink-0 items-center justify-center transition-colors group-hover:text-white">
            <Icon icon={HUB_ICONS[hub.slug] ?? 'tabler:circle-check'} className="size-6" />
          </span>

          <span className="text-default-900 group-hover:text-primary text-[15px] leading-snug font-semibold transition-colors">
            {t(locale, hub.name)}
          </span>

          {/* Pushed to the end rather than sitting after the label, so the
              arrows line up down the column whatever the label length — and
              these labels run from "Dental" to "Grinding, Cutting, Sawing &
              Drilling". */}
          <Icon
            icon="tabler:arrow-narrow-right"
            className="text-default-400 group-hover:text-primary ms-auto size-5 shrink-0 transition-all group-hover:translate-x-1"
          />
        </Link>
      ))}
    </div>
  )
}
