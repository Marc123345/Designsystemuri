import { Icon } from '@iconify/react'
import Link from 'next/link'
import type { Locale } from '@/i18n/routing'
import type { Doc } from '@/lib/documents'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The download list, shared by /resources/datasheets and /resources/msds.
 *
 * ── What it replaces ────────────────────────────────────────────────────────
 *
 * Both pages carried their own copy of the same markup: a square-bordered
 * `divide-y` list of rows with a bordered "PDF" pill on the right. It was the
 * site's pre-radius language, and it was the last of it — every other block
 * had moved to 24px plates and 12px controls while these two stayed square.
 * Two copies also meant two places to fix anything, and they had already
 * drifted (one had group headings, the other did not).
 *
 * ── Why a plate with hairlines rather than cards ────────────────────────────
 *
 * Nineteen datasheets as nineteen rounded cards is nineteen objects to scan.
 * The device used everywhere else on this site for a long list is a `gap-px`
 * grid over a grey ground inside ONE rounded plate: the gaps become hairlines
 * and the list reads as a single object with rules through it. Same reasoning
 * as the country grid — see SalesLocations' history — and the same reason the
 * radius goes on the outer plate rather than on each row.
 *
 * ⚠ The hairlines are `gap-px` over `bg-default-200`, NOT borders. If a row's
 * background is ever made transparent the rules will vanish, because there is
 * nothing drawing them except the plate showing through the gaps.
 *
 * ── Hover ───────────────────────────────────────────────────────────────────
 *
 * The whole row is the link, and the affordance is the row lifting to white
 * with the pill filling brand navy — not a colour change on the title alone,
 * which is easy to miss on a row this wide. `transition-colors` only: these
 * rows are stacked tightly and a transform on one would nudge its neighbours'
 * rendering.
 */
const DocList = ({ groups, icon = 'tabler:file-text' }: { groups: { group?: string; sheets: readonly Doc[] }[]; icon?: string }) => {
  const locale = useLocale() as Locale

  return (
    <div className="grid gap-10">
      {groups.map(({ group, sheets }, gi) => (
        <div key={group ?? gi}>
          {group && (
            <p className="text-default-500 mb-4 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, group)}</p>
          )}

          <div className="bg-default-200 rounded-card grid gap-px overflow-hidden">
            {sheets.map((sheet) => (
              <Link
                key={sheet.key}
                href={sheet.file}
                // Native download rather than an in-tab PDF viewer: these are
                // reference documents an engineer files, not reads once.
                download
                className="group flex flex-wrap items-center justify-between gap-4 bg-white px-5 py-5 transition-colors hover:bg-default-50 lg:px-7"
              >
                <div className="flex items-start gap-4">
                  <span className="border-default-200 text-primary group-hover:border-primary group-hover:bg-primary rounded-control flex size-10 shrink-0 items-center justify-center border bg-white transition-colors group-hover:text-white">
                    <Icon icon={icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-default-900 group-hover:text-primary text-base font-semibold transition-colors">{t(locale, sheet.title)}</h3>
                    <p className="text-default-600 mt-1 text-[0.95rem]">{t(locale, sheet.desc)}</p>
                  </div>
                </div>

                <span className="border-default-300 text-default-800 group-hover:border-primary group-hover:bg-primary rounded-control inline-flex items-center gap-2 border px-3.5 py-1.5 text-sm font-semibold transition-colors group-hover:text-white">
                  <Icon icon="tabler:download" className="size-4.5" />
                  PDF
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DocList
