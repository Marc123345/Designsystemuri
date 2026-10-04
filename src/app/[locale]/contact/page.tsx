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
    <section
      data-note="contact-strauss-layout"
      className="relative isolate min-h-[calc(100svh-54px)] overflow-hidden bg-white pt-[108px] pb-8 lg:pt-[136px] lg:pb-16"
    >
      {/* EID House behind the navy half, under a navy scrim so the white type stays legible. */}
      <div aria-hidden className="bg-primary-3 absolute inset-y-0 left-0 w-full overflow-hidden lg:w-[66vw]">
        <Image
          src="https://static.wixstatic.com/media/10a9d7_aab23325442a47e8a1280bc0685b4e24~mv2.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover object-center"
        />
        <div className="bg-primary-3/80 absolute inset-0" />
      </div>

      <div className="container relative z-10">
        {/* Two columns that share a top line. The left is one compact group,
            eyebrow, title, then the details as a labelled list (the way a spec
            sheet reads), so it holds its own against the form card instead of
            being stretched or floated beside it. `lg:pt-*` matches the card's
            inner padding so the title sits level with the first field. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div className="text-white lg:pt-10 xl:pt-[54px]">
            <p className="font-mono text-[11px] tracking-[0.22em] text-white/70 uppercase">
              {t(locale, 'London Headquarters')}
            </p>
            <h1 className="mt-4 text-[48px] leading-[1.02] font-bold tracking-[-0.045em] text-white uppercase sm:text-[58px] lg:text-[66px] xl:text-[72px]">
              {t(locale, 'Contact Us')}
            </h1>
            <p className="mt-1 text-[28px] leading-none font-light tracking-[-0.025em] text-white sm:text-[32px] lg:text-[38px]">
              EID LTD.
            </p>

            <dl className="mt-10 border-t border-white/20 lg:mt-14">
              {[
                { label: t(locale, 'Address'), value: <span className="max-w-[34ch]">{site.address}</span> },
                { label: t(locale, 'Phone'), value: <a href={site.phoneHref} className="hover:text-white inline-flex min-h-11 items-center transition-colors lg:min-h-0">{site.phone}</a> },
                { label: t(locale, 'Email'), value: <a href={`mailto:${site.email}`} className="hover:text-white inline-flex min-h-11 items-center transition-colors lg:min-h-0">{site.email}</a> },
                { label: t(locale, 'Fax'), value: <span className="text-white/75">{site.fax}</span> },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[84px_minmax(0,1fr)] items-baseline gap-5 border-b border-white/20 py-3.5 sm:grid-cols-[120px_minmax(0,1fr)] lg:py-5">
                  <dt className="font-mono text-[11px] tracking-[0.22em] text-white/60 uppercase">{row.label}</dt>
                  <dd className="text-[16px] leading-[1.45] text-white/92 sm:text-[17px]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-[24px] border border-[#dfe3e8] bg-[#f5f5f5] px-3 py-5 text-[#111827] shadow-[0_30px_80px_-36px_rgba(2,25,59,0.32)] ring-1 ring-black/[0.02] sm:p-9 lg:p-10 xl:px-[58px] xl:py-[54px]">
            {/* Visible heading and intro removed at Marc's request; sr-only h2 keeps the heading order intact. */}
            <h2 className="sr-only">{t(locale, 'Contact us.')}</h2>
            <QuoteForm formTitle={t(locale, 'Contact EID')} heading={false} eager />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
