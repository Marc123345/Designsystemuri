import Backdrop from '@/components/Backdrop'
import QuoteForm from '@/components/QuoteForm'
import SalesLocations from '@/components/SalesLocations'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Contact EID | Industrial Diamond & CBN Enquiries' },
    description: 'Contact EID for industrial diamond and CBN quotes, samples and technical specifications. One form, routed to someone who works with the material.',
    alternates: localeAlternates(locale, '/contact'),
  }
}

/**
 * Uri's contact brief is the opposite of another marketing page: no separate
 * cinematic hero, no globe taking a screen, and no directory before the form.
 * The contact statement and routes live in the left half; the form starts in
 * the right half immediately, following the compact contact-page reference he
 * reviewed in the videos.
 */
const ContactPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const contactRows = [
    { label: 'Address', value: site.address, href: undefined, icon: 'tabler:map-pin' },
    { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: 'tabler:mail' },
    { label: 'Phone', value: site.phone, href: site.phoneHref, icon: 'tabler:phone' },
    { label: 'WhatsApp', value: site.whatsapp, href: site.whatsappHref, icon: 'tabler:brand-whatsapp' },
  ] as const

  return (
    <section data-note="contact-split" className="bg-primary-3 relative isolate min-h-[100svh] overflow-hidden pt-[104px] pb-8 text-white lg:pt-[124px] lg:pb-10">
      <Backdrop />

      <div className="relative z-10 container">
        <div className="grid items-start gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-6">
          <div className="rounded-card border border-white/12 bg-white/[0.035] p-6 backdrop-blur-sm lg:p-8 xl:p-10">
            <p className="font-mono text-[10px] tracking-[0.23em] text-white/55 uppercase">{t(locale, 'Get in touch')}</p>
            <h1 className="mt-4 max-w-[9ch] text-[42px] leading-[0.94] font-semibold tracking-[-0.045em] text-white md:text-[54px] lg:text-[64px]">
              {t(locale, 'Contact Us')}
            </h1>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-white/72">
              {t(locale, 'Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material.')}
            </p>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {contactRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[32px_1fr] gap-3 py-4">
                  <span className="mt-0.5 flex size-8 items-center justify-center rounded-control border border-white/15 text-white/70">
                    <Icon icon={row.icon} className="size-4" />
                  </span>
                  <div>
                    <dt className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase">{t(locale, row.label)}</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-white/88">
                      {row.href ? (
                        <a href={row.href} className="transition-colors hover:text-white">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-7 border-t border-white/10 pt-6">
              <SalesLocations />
            </div>
          </div>

          <div className="rounded-card border-default-200 bg-white p-5 text-default-900 shadow-[0_26px_80px_-42px_rgba(0,0,0,0.52)] sm:p-7 lg:p-8 xl:p-10">
            <div className="mb-5 flex items-end justify-between gap-6 border-b border-default-200 pb-5">
              <div>
                <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{t(locale, 'One form')}</p>
                <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.025em] text-default-900 md:text-[28px]">{t(locale, 'Tell us what you need.')}</h2>
              </div>
              <span className="hidden font-mono text-[9px] tracking-[0.18em] text-default-400 uppercase sm:block">EID · London</span>
            </div>

            <QuoteForm formTitle={t(locale, 'Your requirement')} heading={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
