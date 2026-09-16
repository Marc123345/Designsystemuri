'use client'

import Backdrop from '@/components/Backdrop'
import { Link, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { footerColumns, legalLinks, site, trustPoints } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'

const Footer = () => {
  const locale = useLocale() as Locale
  const pathname = usePathname()

  /* Uri's Contact reference ends immediately in the footer. The standard EID
     footer is intentionally comprehensive and several screens tall, which is
     the opposite of that one-page contact brief, so Contact gets the same legal
     closure in a compact bar rather than duplicating the full site directory. */
  if (pathname === '/contact') {
    return (
      <footer data-note="footer-contact" id="footer" className="bg-primary-3 border-t border-white/10 text-white">
        <div className="container flex flex-col gap-3 py-4 text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/72">
            <span className="font-semibold text-white">{site.name}</span>
            <span>{t(locale, 'London, United Kingdom')}</span>
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">{site.email}</a>
            <a href={site.phoneHref} className="transition-colors hover:text-white">{site.phone}</a>
          </div>
          <div className="flex items-center gap-5">
            {legalLinks.filter((link) => link.ready).map((link) => (
              <a key={link.href} href={link.href} className="text-white/65 transition-colors hover:text-white">{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer data-note="footer" id="footer" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
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
              <a href={site.phoneHref} className="inline-block py-px transition-colors hover:text-white">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="tabler:mail" className="size-4 shrink-0 text-white/50" />
              <a href={`mailto:${site.email}`} className="inline-block break-all py-px transition-colors hover:text-white">{site.email}</a>
            </li>
          </ul>

          <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="rounded-control mt-8 inline-flex items-center gap-2 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40">
            <Icon icon="tabler:brand-whatsapp" className="size-5" />
            {t(locale, 'WhatsApp us')}
          </a>

          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-8 text-[0.85rem] text-white/70">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Icon icon="tabler:circle-check" className="size-4 text-white/60" />
                {t(locale, point)}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col bg-white px-4 py-14 md:px-7.5 lg:px-12.5 lg:py-20">
          <div className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {[footerColumns.slice(0, 1), footerColumns.slice(1)].map((group, i) => (
              <div key={i} className="space-y-9">
                {group.map((column) => (
                  <div key={column.title}>
                    <h3 className="text-default-900 mb-5 text-lg font-semibold">{t(locale, column.title)}</h3>
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

      <div className="bg-primary-3 flex flex-col items-start justify-end gap-3 border-t border-white/15 px-4 py-5 sm:flex-row sm:items-center md:px-7.5 lg:px-12.5">
        <div className="flex items-center gap-6">
          {legalLinks.filter((link) => link.ready).map((link) => (
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
