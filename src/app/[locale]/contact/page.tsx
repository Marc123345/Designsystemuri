import QuoteForm from '@/components/QuoteForm'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
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
    <section
      data-note="contact-strauss-layout"
      className="relative isolate min-h-[calc(100svh-54px)] overflow-hidden bg-white pt-[82px] pb-8 lg:pt-[102px] lg:pb-10"
    >
      <div aria-hidden className="bg-primary-3 absolute inset-y-0 left-0 w-full lg:w-[66vw]" />

      <div className="container relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(520px,0.92fr)] lg:gap-10 xl:gap-[70px]">
          <div className="text-white">
            <h1 className="text-white text-[48px] leading-[1.02] font-bold tracking-[-0.045em] uppercase sm:text-[58px] lg:text-[66px] xl:text-[72px]">
              {t(locale, 'Contact Us')}
            </h1>
            <p className="mt-1 text-[28px] leading-none font-light tracking-[-0.025em] text-white sm:text-[32px] lg:text-[38px]">
              EID LTD.
            </p>

            <div className="mt-8 lg:mt-10">
              <span className="inline-flex rounded-[5px] border border-white/55 bg-white/[0.08] px-4 py-2 text-[12px] leading-none font-semibold tracking-[0.04em] text-white uppercase sm:text-[13px]">
                {t(locale, 'Headquarters')}
              </span>

              <div className="mt-4 border-y border-white/45 py-7 lg:py-8">
                <div className="grid items-center gap-7 sm:grid-cols-[minmax(0,1fr)_210px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_227px]">
                  <div>
                    <h2 className="text-[28px] leading-[1.08] font-semibold tracking-[-0.02em] text-white uppercase sm:text-[31px]">
                      {t(locale, 'London Headquarters')}
                    </h2>
                    <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.45] text-white/90 sm:text-[17px]">
                      {site.address}
                    </p>

                    <div className="mt-7 flex flex-col gap-4 text-[15px] text-white/92 sm:text-[16px]">
                      <a href={site.phoneHref} className="group flex w-fit items-center gap-3 rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                        <Icon icon="tabler:phone" className="size-5 shrink-0 text-white/80" />
                        <span>{t(locale, 'Phone')}: {site.phone}</span>
                      </a>
                      <a href={`mailto:${site.email}`} className="group flex w-fit items-center gap-3 rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                        <Icon icon="tabler:mail" className="size-5 shrink-0 text-white/80" />
                        <span>{site.email}</span>
                      </a>
                      <div className="flex items-center gap-3 text-white/78">
                        <Icon icon="tabler:printer" className="size-5 shrink-0 text-white/80" />
                        <span>{t(locale, 'Fax')}: {site.fax}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative mx-auto aspect-square w-full max-w-[227px] overflow-hidden rounded-[20px] border border-white/20 bg-white/10 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.5)]">
                    <Image
                      src="https://static.wixstatic.com/media/10a9d7_aab23325442a47e8a1280bc0685b4e24~mv2.jpg"
                      alt={t(locale, 'EID House, London headquarters in Hatton Garden')}
                      fill
                      sizes="227px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#dfe3e8] bg-[#f5f5f5] p-7 text-[#111827] shadow-[0_30px_80px_-36px_rgba(2,25,59,0.32)] ring-1 ring-black/[0.02] sm:p-9 lg:p-10 xl:px-[58px] xl:py-[54px]">
            {/* Visible heading and intro removed at Marc's request; sr-only h2 keeps the heading order intact. */}
            <h2 className="sr-only">{t(locale, 'Contact us.')}</h2>
            <QuoteForm formTitle={t(locale, 'Contact EID')} heading={false} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
