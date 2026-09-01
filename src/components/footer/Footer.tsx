'use client'

import Backdrop from '@/components/Backdrop'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { footerColumns, legalLinks, site, trustPoints } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'

/**
 * Footer in the Supreme Home pattern: a split panel — brand-dark left, white
 * right — sitting over a solid brand-colour bottom bar. Recoloured Supreme red
 * -> EID blue, and squared off in line with the site's no-radius rule.
 *
 * The left panel carries identity and the ways to reach a person. The right
 * panel stays what this footer has always been: the complete site index, since
 * a menu cannot expose every page and section without clutter, and crawlers
 * need an internal-link map from every page.
 */
const Footer = () => {
  const locale = useLocale() as Locale

  return (
    /* `rounded-t-card`, top corners only, and `overflow-hidden` so the two
       dark panels inside are clipped by the corner rather than squaring it off
       again. It is the mirror of the heroes: they round the edge where the
       page continues past them, and the footer rounds the edge where the page
       arrives at it. */
    <footer data-note="footer" id="footer" className="rounded-t-card relative overflow-hidden">
      {/* ── SPLIT PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — the same brand blue as the header's angled block, so the top
            and bottom of the page close on one colour. The supplied logo
            artwork is white-on-transparent, which is exactly what this panel
            wants; used without correction. */}
        {/* Was a flat `bg-primary` sheet. Same shared backdrop as every other
            dark band now, so the footer belongs to the page rather than sitting
            on it as a printed block of colour. */}
        {/* `isolate` + a negative z on the backdrop, so it drops behind the
            panel's static children without every one of them needing its own
            `relative`. */}
        <div className="relative isolate overflow-hidden px-4 py-14 md:px-7.5 lg:px-12.5 lg:py-20">
          <Backdrop className="-z-10" />
          <Image src="/eid/logo-white.png" alt={site.name} width={650} height={221} className="mb-8 w-44" />

          <p className="mb-10 max-w-md text-[0.95rem] leading-[1.75] text-white/85">{t(locale, 'footerAbout')}</p>

          <h3 className="mb-5 text-lg font-semibold text-white">{t(locale, 'Contact')}</h3>
          <ul className="space-y-4 text-[0.93rem] text-white/85">
            <li className="flex items-start gap-3">
              <Icon icon="tabler:map-pin" className="mt-1 size-4 shrink-0 text-white/50" />
              <span>{site.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="tabler:phone" className="size-4 shrink-0 text-white/50" />
              <a href={site.phoneHref} className="inline-block py-px transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="tabler:mail" className="size-4 shrink-0 text-white/50" />
              <a href={`mailto:${site.email}`} className="inline-block break-all py-px transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>

          {/* Persistent WhatsApp Business channel: one tap opens a chat to the
              London landline, shared across the sales team, for the buyer who
              wants a fast answer rather than a form. */}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-control mt-8 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40">
            <Icon icon="tabler:brand-whatsapp" className="size-5" />
            {t(locale, 'WhatsApp us')}
          </a>

          {/* Trust bar — verified signals only. */}
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-8 text-[0.85rem] text-white/70">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Icon icon="tabler:circle-check" className="size-4 text-white/60" />
                {t(locale, point)}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — white. The complete index. */}
        <div className="relative flex flex-col bg-white px-4 py-14 md:px-7.5 lg:px-12.5 lg:py-20">
          {/* Two explicit columns rather than a flowing 2-up grid.
              Dropping the "Sections" column left three groups in a row-major
              grid, which put Products and Applications on row one and Company &
              Resources alone on row two — with the whole right half of that row
              empty, since Applications is the shortest list. Pinning Products
              to the first column and stacking the other two in the second fills
              the panel and keeps the longest list unbroken. */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {[footerColumns.slice(0, 1), footerColumns.slice(1)].map((group, i) => (
              <div key={i} className="space-y-9">
                {group.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-default-900 mb-5 text-lg font-semibold">{t(locale, column.title)}</h3>
                    {/* space-y-2.5 -> space-y-1 with padding on the links.
                        WCAG 2.2 AA 2.5.8 wants a 24px target; these measured
                        18px, and 28 of them stack in this block on every page,
                        which was the single most repeated failure on the site.
                        The padding grows the HIT AREA only — `inline-block` on
                        a text link with py-[3px] leaves the type where it was
                        and the rhythm of the column unchanged, because the
                        list gap shrinks by what each link gained. */}
                    <ul className="space-y-1">
                      {column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link href={link.href} className="text-default-500 hover:text-primary inline-block py-[3px] text-[0.88rem] transition-colors">
                            {t(locale, link.label)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      {/* Only the legal links remain here, so the row is end-aligned rather than
          a two-end split — justify-between with a single child would have parked
          it on the left, under the column of links above it. */}
      <div className="bg-primary-3 flex flex-col items-start justify-end gap-3 border-t border-white/15 px-4 py-5 sm:flex-row sm:items-center md:px-7.5 lg:px-12.5">
        <div className="flex items-center gap-6">
          {/* Terms and Privacy need real content before launch, so they are not
              linked to placeholder pages that would rank or mislead. */}
          {legalLinks
            .filter((link) => link.ready)
            .map((link) => (
              <a key={link.href} href={link.href} className="inline-block py-0.5 text-[0.8rem] text-white/80 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
