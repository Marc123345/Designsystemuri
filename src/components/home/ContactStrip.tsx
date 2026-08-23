'use client'

import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'

/**
 * The homepage conversion block, shrunk to a strip.
 *
 * What was here: a twelve-column section with a 42px heading, a lede, contact
 * details and the full Jotform embed in a bordered panel — the same form that
 * is the entire point of /contact, rendered a second time at the bottom of the
 * home page and adding roughly a thousand pixels and a third-party script to
 * it.
 *
 * Uri's note was that the form belongs on the contact page, or if it stays on
 * both, that the homepage copy should be "far smaller and shorter", under
 * "Tell us what you need", and that the "A real person replies within one
 * business day" line should go.
 *
 * So home keeps the ask and the two direct channels — email and phone, both
 * live links, which is what a technical buyer with a specific question reaches
 * for anyway — and the form itself is left where it is on /contact. The strip
 * is a screen shorter and drops the Jotform script from the homepage's critical
 * path entirely.
 */
const ContactStrip = ({ title, desc }: { title: string; desc: string }) => {
  const locale = useLocale() as Locale

  return (
    <section data-note="contact-strip" className="border-default-200 bg-default-50 border-t py-14 lg:py-18">
      <div className="container">
        <div className="grid gap-9 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="text-[26px] font-bold md:text-[32px] lg:text-[38px]">{title}</h2>
            <p className="text-default-600 mt-4 max-w-2xl text-base">{desc}</p>
          </div>

          {/* col-span-7, and the two channels side by side rather than stacked
              and pushed to the right edge. Stacked-and-right-aligned left a
              third of the strip empty across the middle, which on a band this
              short reads as a layout that failed to fill rather than as space. */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-start gap-x-10 gap-y-4 text-base sm:flex-nowrap">
              <a href={`mailto:${site.email}`} className="text-default-700 hover:text-primary group inline-flex items-center gap-3 transition-colors">
                <span className="border-default-200 text-primary group-hover:border-primary flex size-10 shrink-0 items-center justify-center border bg-white transition-colors">
                  <Icon icon="tabler:mail" className="size-5" />
                </span>
                <span>
                  <span className="text-default-500 block text-xs tracking-[0.18em] uppercase">{t(locale, 'Email')}</span>
                  {site.email}
                </span>
              </a>

              <a href={site.phoneHref} className="text-default-700 hover:text-primary group inline-flex items-center gap-3 transition-colors">
                <span className="border-default-200 text-primary group-hover:border-primary flex size-10 shrink-0 items-center justify-center border bg-white transition-colors">
                  <Icon icon="tabler:phone" className="size-5" />
                </span>
                <span>
                  <span className="text-default-500 block text-xs tracking-[0.18em] uppercase">{t(locale, 'Call')}</span>
                  {site.phone}
                </span>
              </a>
            </div>

            <div className="mt-8">
              <ArrowButton href="/contact" label={t(locale, 'Contact')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
