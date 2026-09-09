import { Icon } from '@iconify/react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

/**
 * The index grid behind both blocks on the homepage: the six application hubs,
 * and the four QC controls.
 *
 * ── After Strauss's core-values row ─────────────────────────────────────────
 *
 * Marc's reference. The shape there is a centred column per item — a large icon
 * on its own, the label under it — with a dashed rule running between columns,
 * and on hover the icon lifts while the label takes the brand colour. It reads
 * as a set of related things rather than a stack of cards, which is exactly
 * what six hubs and four controls are.
 *
 * What is taken and what is not:
 *
 *   taken     centred column, icon above label, the lift and the colour
 *             change on hover.
 *   dropped   their dashed separators. They were the first pass and they sat
 *             on the bare page ground, which is what made both blocks read
 *             flat — see the depth note below.
 *   not taken the paragraph under each label. Strauss has four values with a
 *             sentence each to justify them; these are index entries, and the
 *             label is the whole content. Adding blurbs would put this section
 *             back at the height it was cut down from.
 *   not taken their bare icon on the page ground. That is Strauss's language,
 *             not ours — this site puts an icon in a bordered white control at
 *             `rounded-control`, taking `border-default-200` and going
 *             `border-primary` on hover, the same treatment as the contact
 *             rows and the mobile menu button. The structure is the reference;
 *             the parts are this design system's.
 *
 * ── DEPTH: A PLATE, NOT A ROW OF ICONS ON THE PAGE ──────────────────────────
 *
 * Marc's note — both blocks read flat. They were: an icon and a word centred on
 * the page ground, with a dashed rule between columns and nothing behind any of
 * it. Two sections of the home page with no surface at all.
 *
 * The fix is the device this site already uses for a set of related rows, not a
 * new one: a `gap-px` grid over a grey ground inside ONE rounded plate, so the
 * gaps become hairlines and the whole thing reads as a single raised object.
 * Same construction as DocList and the country grid in SalesLocations. The
 * plate gets a soft, wide shadow so it lifts off `--color-canvas` (#fbfbfd),
 * which is otherwise within a hair of white.
 *
 * This also retires the dashed-rule bookkeeping. The old separator was drawn on
 * each item with `after:` and suppressed per breakpoint with nth-child rules —
 * one per arrangement. `gap-px` draws every divider, at every column count,
 * with no rules at all, including the horizontal ones the dashed version never
 * had.
 *
 * ⚠ The hairlines are the plate showing through the gaps. If a cell's
 * background is ever made transparent, the rules vanish — there is nothing else
 * drawing them.
 *
 * Depth at the element level too: the icon control carries a hairline shadow at
 * rest and lifts into a primary-tinted one on hover, so the thing under the
 * cursor is the thing standing up off the plate.
 *
 * ── One component, not two that look alike ──────────────────────────────────
 *
 * Both blocks share this, so "the same layout" is enforced rather than
 * maintained by hand.
 *
 * ── Tiles are optionally links ──────────────────────────────────────────────
 *
 * An application hub has its own page. The four QC controls do not — they are
 * all explained on /quality — so those render as plain columns and the single
 * CTA underneath carries the route.
 */

export interface IconIndexItem {
  label: string
  icon: string
  href?: string
}

/* The cell. Padding is even now that it sits inside a plate rather than free on
   the page — the old `pt-2 pb-6` was compensating for having no surface. Kept
   deliberately tight: Marc's original brief on both blocks was that they must
   not take space down the page, and depth is not a licence to grow them. */
const CELL =
  'group relative flex flex-col items-center bg-white px-5 py-8 text-center transition-colors hover:bg-default-50 lg:py-10'

export default function IconIndex({
  items,
  locale,
  columns = 3,
}: {
  items: IconIndexItem[]
  locale: Locale
  columns?: 3 | 4
}) {
  const cols = columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'

  return (
    <div
      className={`bg-default-200 rounded-card grid gap-px overflow-hidden shadow-[0_1px_2px_rgba(2,6,23,0.04),0_24px_48px_-28px_rgba(2,6,23,0.28)] sm:grid-cols-2 ${cols}`}
    >
      {items.map((item) => {
        const body = (
          <>
            {/* The site's icon control, at index scale. size-9 elsewhere; here
                it carries the cell on its own, so it is sized up rather than
                restyled. The resting shadow is a single hairline of one — just
                enough to sit the control on the cell rather than in it. */}
            <span className="border-default-200 text-primary group-hover:border-primary group-hover:bg-primary rounded-control mb-5 flex size-16 items-center justify-center border bg-white shadow-[0_1px_2px_rgba(2,6,23,0.06)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:text-white group-hover:shadow-[0_12px_26px_-10px_var(--color-primary)] lg:size-20">
              <Icon icon={item.icon} className="size-8 lg:size-9" />
            </span>

            <span className="text-default-900 group-hover:text-primary text-[17px] leading-snug font-semibold text-balance transition-colors lg:text-[19px]">
              {t(locale, item.label)}
            </span>
          </>
        )

        return item.href ? (
          <Link key={item.label} href={item.href} className={CELL}>
            {body}
          </Link>
        ) : (
          <div key={item.label} className={CELL}>
            {body}
          </div>
        )
      })}
    </div>
  )
}
