'use client'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { footerColumns, legalLinks, site, trustPoints } from '@/lib/site'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'

/**
 * The footer is the complete site index. A mega-menu cannot expose every page
 * and section without clutter, so the full link set lives here — for power
 * users, and to give crawlers an internal-link map from every page.
 */
const Footer = () => {
  const locale = useLocale() as Locale

  return (
    <footer id="footer" className="relative overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-default-950 via-default-950 to-primary-3"></div>

      <div className="flex items-stretch md:justify-center justify-between xl:gap-80.5 lg:gap-75 md:gap-45 gap-0 absolute inset-0">
        <div className="border border-dashed border-default-100 w-0.5 h-full opacity-7"></div>
        <div className="border border-dashed border-default-100 w-0.5 h-full opacity-7"></div>
        <div className="border border-dashed border-default-100 w-0.5 h-full opacity-7"></div>
        <div className="border border-dashed border-default-100 w-0.5 h-full opacity-7"></div>
        <div className="border border-dashed border-default-100 w-0.5 h-full opacity-7"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 lg:pt-40 pt-25">
        <div className="grid xl:grid-cols-6 lg:gap-20 gap-12">
          {/* Identity + contact */}
          <div className="xl:col-span-2">
            <div className="lg:w-105">
              {/* The supplied artwork is white-on-transparent, which is exactly
                  what this dark panel wants — used here without correction. */}
              <Image
                src="/eid/logo-white.png"
                alt={site.name}
                width={650}
                height={221}
                className="mb-6.5 w-44"
              />
              <p className="sr-only">{site.name}</p>

              <p className="text-default-400 mb-7">{t(locale, 'footerAbout')}</p>

              <ul className="space-y-3 text-default-400">
                <li>
                  <span className="text-white/50">{t(locale, 'Call Us:')} </span>
                  <a href={site.phoneHref} className="hover:text-white">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <span className="text-white/50">{t(locale, 'Email Us:')} </span>
                  <a href={`mailto:${site.email}`} className="hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li>
                  <span className="text-white/50">{t(locale, 'Based In:')} </span>
                  {site.address}
                </li>
              </ul>

              {/* Persistent WhatsApp Business channel: one tap opens a chat to the
                  London landline, shared across the sales team, for the buyer who
                  wants a fast answer rather than a form. */}
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-white/40"
              >
                <Icon icon="tabler:brand-whatsapp" className="size-5" />
                WhatsApp us
              </a>
            </div>
          </div>

          {/* The full index */}
          <div className="xl:col-span-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-8">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h5 className="md:text-xl text-lg text-white mb-6">{t(locale, column.title)}</h5>
                  <ul className="space-y-3 text-sm">
                    {column.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link href={link.href} className="text-default-400 hover:text-primary-1">
                          {t(locale, link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border border-dashed h-px border-default-100 opacity-10 my-14 md:-mx-7.5 -mx-4"></div>

        {/* Trust bar — verified signals only */}
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/70">
          {trustPoints.map((point) => (
            <li key={point} className="flex items-center gap-2">
              <Icon icon="tabler:circle-check" className="size-4 text-primary-1" />
              {t(locale, point)}
            </li>
          ))}
        </ul>

        <div className="border border-dashed h-px border-default-100 opacity-10 my-14 md:-mx-7.5 -mx-4"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-white/60">
          <p>
            © {site.name}. {site.location}.
          </p>

          <div className="flex items-center gap-6">
            {/* Terms and Privacy need real content before launch, so they are not
                linked to placeholder pages that would rank or mislead. */}
            {legalLinks
              .filter((link) => link.ready)
              .map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </div>

      {/* Huge background text */}
      <div className="lg:text-[15em] md:text-[7em] text-[4em] lg:-mt-25 translate-y-1/2 font-bold text-white/5 text-center leading-none pointer-events-none">
        EID<sup className="text-[0.75em]">®</sup>
      </div>
    </footer>
  )
}

export default Footer
