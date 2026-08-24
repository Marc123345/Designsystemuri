'use client'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import Image from 'next/image'

/**
 * The ISO certificate card that sits at the foot of a hero.
 *
 * It was written inline in the home hero. Every hero carrying a photograph now
 * wants it, so it lives here rather than being copied — the clip-path corner,
 * the 21rem width and the `pe-24` that keeps it clear of the fixed WhatsApp
 * button are the kind of numbers that drift apart the moment there are two of
 * them.
 *
 * Desktop only: below lg a hero has no room for it and the footer carries the
 * trust line instead.
 */
const HeroCertificate = () => {
  const locale = useLocale() as Locale

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 hidden lg:block">
      <div className="container">
        <div className="flex justify-end pe-24">
          <Link
            href="/quality"
            className="group border-primary-1 bg-primary-3/92 pointer-events-auto flex w-[21rem] items-start gap-4 border-b-2 p-5 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.8)] transition-colors hover:bg-primary-3"
            style={{ clipPath: 'polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)' }}
          >
            <span className="relative block w-16 shrink-0 overflow-hidden border border-white/15">
              <Image
                src="/eid/iso-9001-eid.jpg"
                alt={t(locale, 'EID Limited ISO 9001:2015 certificate of registration')}
                width={755}
                height={1064}
                sizes="64px"
                className="h-auto w-full"
              />
            </span>

            <span className="min-w-0">
              <span className="block text-base font-semibold text-white">{t(locale, 'ISO 9001:2015')}</span>
              <span className="mt-1.5 block text-xs leading-[1.5] text-white/65">{t(locale, 'Certified quality management system, audited and current.')}</span>
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white">
                {t(locale, 'See how our QC works')}
                <svg viewBox="0 0 24 24" aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroCertificate
