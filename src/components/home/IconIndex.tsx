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
 *   taken     centred column, icon above label, dashed separators, the lift and
 *             the colour change on hover.
 *   not taken the paragraph under each label. Strauss has four values with a
 *             sentence each to justify them; these are index entries, and the
 *             label is the whole content. Adding blurbs would put this section
 *             back at the height it was cut down from.
 *
 * The separator is drawn on the item, not between grid cells, and suppressed on
 * the last of each row — so it works at three columns, four, two and one
 * without a media query per arrangement.
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

const COL =
  'group relative flex flex-col items-center px-4 pt-2 pb-6 text-center transition-colors'

/* The dashed rule, drawn as a repeating gradient rather than a border so the
   dash length does not change with the column width. Hidden on the last item in
   each row at every breakpoint, and on the last item overall. */
const RULE =
  "after:pointer-events-none after:absolute after:end-0 after:top-6 after:bottom-6 after:w-px " +
  "after:bg-[repeating-linear-gradient(180deg,var(--color-default-300)_0_6px,transparent_6px_12px)] " +
  "last:after:hidden max-lg:[&:nth-child(2n)]:after:hidden max-sm:after:hidden"

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
  const nth = columns === 4 ? 'lg:[&:nth-child(4n)]:after:hidden' : 'lg:[&:nth-child(3n)]:after:hidden'

  return (
    <div className={`grid gap-y-10 sm:grid-cols-2 ${cols}`}>
      {items.map((item) => {
        const body = (
          <>
            <span className="text-primary mb-5 transition-transform duration-300 group-hover:-translate-y-2.5">
              <Icon icon={item.icon} className="size-14 lg:size-16" />
            </span>

            <span className="text-default-900 group-hover:text-primary text-[17px] leading-snug font-semibold text-balance transition-colors lg:text-[19px]">
              {t(locale, item.label)}
            </span>
          </>
        )

        return item.href ? (
          <Link key={item.label} href={item.href} className={`${COL} ${RULE} ${nth}`}>
            {body}
          </Link>
        ) : (
          <div key={item.label} className={`${COL} ${RULE} ${nth}`}>
            {body}
          </div>
        )
      })}
    </div>
  )
}
