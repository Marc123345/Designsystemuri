'use client'

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
    <footer id="footer" className="relative">
      {/* ── SPLIT PANEL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — the same brand blue as the header's angled block, so the top
            and bottom of the page close on one colour. The supplied logo
            artwork is white-on-transparent, which is exactly what this panel
            wants; used without correction. */}
        <div className="bg-primary relative px-4 py-14 md:px-7.5 lg:px-12.5 lg:py-20">
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
              <a href={site.phoneHref} className="transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="tabler:mail" className="size-4 shrink-0 text-white/50" />
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>

          {/* Persistent WhatsApp Business channel: one tap opens a chat to the
              London landline, shared across the sales team, for the buyer who
              wants a fast answer rather than a form. */}
          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40">
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
          <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-default-900 mb-5 text-lg font-semibold">{t(locale, column.title)}</h3>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-default-500 hover:text-primary text-[0.88rem] transition-colors">
                        {t(locale, link.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div className="border-default-200 mt-12 border-t pt-10">
            <p className="text-default-900 text-[clamp(28px,3vw,42px)] leading-[1.08] font-bold tracking-tight">
              {t(locale, 'Graded in-house.')}
              <br />
              <span className="text-primary">{t(locale, 'Proven before it ships.')}</span>
            </p>

            <Link href="/contact" className="text-primary group mt-7 inline-flex items-center gap-2.5 text-[0.92rem] font-bold">
              {t(locale, 'Request a Quote')}
              <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-primary-3 flex flex-col items-start justify-between gap-3 border-t border-white/15 px-4 py-5 sm:flex-row sm:items-center md:px-7.5 lg:px-12.5">
        <p className="text-[0.82rem] text-white/85">
          © {site.name}. {site.location}.
        </p>

        <div className="flex items-center gap-6">
          {/* Terms and Privacy need real content before launch, so they are not
              linked to placeholder pages that would rank or mislead. */}
          {legalLinks
            .filter((link) => link.ready)
            .map((link) => (
              <a key={link.href} href={link.href} className="text-[0.8rem] text-white/80 transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
