import { Icon } from '@iconify/react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

/**
 * The card and grid behind both index blocks on the homepage: the six
 * application hubs, and the four QC controls.
 *
 * ── One component, not two that look alike ──────────────────────────────────
 *
 * Marc asked for the QC block to use the same layout as the applications
 * block. Copying the markup would have satisfied that for exactly as long as
 * nobody edited either copy. They share this instead, so "the same layout" is
 * enforced rather than maintained.
 *
 * ── Tiles are optionally links ──────────────────────────────────────────────
 *
 * An application hub has its own page, so those tiles link and carry the arrow
 * and the "Explore" reveal. The four QC controls do not have a page each —
 * they are all explained on /quality — so those render as plain tiles and the
 * single CTA underneath carries the route. Four identical links to one page is
 * four chances to click the same thing.
 */

export interface IconIndexItem {
  label: string
  icon: string
  href?: string
}

const CARD = 'border-default-200 flex items-center gap-4 border bg-white px-5 py-5 transition-colors'

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
    <div className={`grid gap-3 sm:grid-cols-2 ${cols}`}>
      {items.map((item) => {
        const body = (
          <>
            <span className="bg-primary/5 text-primary group-hover:bg-primary flex size-12 shrink-0 items-center justify-center transition-colors group-hover:text-white">
              <Icon icon={item.icon} className="size-6" />
            </span>

            <span className="text-default-900 group-hover:text-primary text-[15px] leading-snug font-semibold transition-colors">
              {t(locale, item.label)}
            </span>

            {/* Only on the tiles that go somewhere. Width-animated rather than
                mounted on hover, so the row never reflows and the arrows stay
                in column whatever the label length — these run from "Dental"
                to "Grinding, Cutting, Sawing & Drilling". */}
            {item.href && (
              <span className="ms-auto flex shrink-0 items-center gap-1.5">
                <span className="text-primary max-w-0 overflow-hidden text-[13px] font-semibold whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-24 group-hover:opacity-100">
                  {t(locale, 'Explore')}
                </span>
                <Icon icon="tabler:arrow-narrow-right" className="text-default-400 group-hover:text-primary size-5 shrink-0 transition-all group-hover:translate-x-1" />
              </span>
            )}
          </>
        )

        return item.href ? (
          <Link key={item.label} href={item.href} className={`group hover:border-primary focus-visible:border-primary ${CARD}`}>
            {body}
          </Link>
        ) : (
          <div key={item.label} className={`group ${CARD}`}>
            {body}
          </div>
        )
      })}
    </div>
  )
}
