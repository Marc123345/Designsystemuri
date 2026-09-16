import Backdrop from '@/components/Backdrop'
import QuoteForm from '@/components/QuoteForm'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import Image from 'next/image'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Contact EID | Industrial Diamond & CBN Enquiries' },
    description: 'Contact EID for industrial diamond and CBN quotes, samples and technical specifications.',
    alternates: localeAlternates(locale, '/contact'),
  }
}

const ContactPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <section data-note="contact-compact" className="bg-primary-3 relative isolate overflow-hidden pt-[94px] pb-5 text-white lg:pt-[112px] lg:pb-6">
      <Backdrop />

      <div className="relative z-10 container">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-card border border-white/12 bg-white/[0.035] shadow-[0_26px_80px_-42px_rgba(0,0,0,0.55)] backdrop-blur-sm lg:grid-cols-[0.72fr_1.28fr]">
          <div className="p-5 sm:p-6 lg:p-7 xl:p-8">
            <p className="font-mono text-[9px] tracking-[0.22em] text-white/55 uppercase">{t(locale, 'Contact')}</p>
            <h1 className="mt-3 text-[38px] leading-[0.94] font-semibold tracking-[-0.045em] text-white md:text-[48px] lg:text-[54px]">
              {t(locale, 'Contact Us')}
            </h1>
            <p className="mt-4 max-w-[38ch] text-[14px] leading-relaxed text-white/72">
              {t(locale, 'Tell us the product or application and our team will route your enquiry to the right person.')}
            </p>

            {/* The actual EID House photograph from the current eid-ltd.com
                About page. Uri specifically asked for the London office image
                here rather than another decorative globe/map. */}
            <div className="rounded-control relative mt-5 aspect-[16/7] overflow-hidden border border-white/10 bg-white/5">
              <Image
                src="https://static.wixstatic.com/media/10a9d7_aab23325442a47e8a1280bc0685b4e24~mv2.jpg"
                alt={t(locale, 'EID House, London headquarters in Hatton Garden')}
                fill
                sizes="(min-width: 1024px) 34vw, 100vw"
                className="object-cover"
              />
              <span aria-hidden className="from-primary-3/40 absolute inset-0 bg-linear-to-t to-transparent" />
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="font-mono text-[9px] tracking-[0.18em] text-white/45 uppercase">{t(locale, 'Global Headquarters')}</p>
              <p className="mt-1.5 text-[15px] font-semibold text-white">{t(locale, 'London, United Kingdom')}</p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-white/58">{site.address}</p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              <div>
                <p className="text-[12px] font-semibold text-white">{t(locale, 'Middle East')}</p>
                <p className="mt-1 text-[10px] leading-snug text-white/48">{t(locale, 'Primary processing')}</p>
              </div>
              <div className="border-s border-white/10 ps-3">
                <p className="text-[12px] font-semibold text-white">{t(locale, 'United States')}</p>
                <p className="mt-1 text-[10px] leading-snug text-white/48">{t(locale, 'Secondary processing')}</p>
              </div>
              <div className="border-s border-white/10 ps-3">
                <p className="text-[12px] font-semibold text-white">{t(locale, 'Agent network')}</p>
                <p className="mt-1 text-[10px] leading-snug text-white/48">{t(locale, '7 major industrial countries')}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white p-4 text-default-900 sm:p-5 lg:border-s lg:border-t-0 lg:p-6">
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-default-200 pb-3">
              <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-default-900 md:text-[22px]">{t(locale, 'Tell us what you need.')}</h2>
              <span className="text-primary hidden font-mono text-[8px] tracking-[0.18em] uppercase sm:block">EID · London</span>
            </div>
            <QuoteForm formTitle={t(locale, 'Contact EID')} heading={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
