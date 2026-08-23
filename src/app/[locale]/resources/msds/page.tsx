import { RichText } from '@/components/RichText'
import { PageHero, QuoteSection } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { safetySheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Diamond & CBN Safety Data Sheets (MSDS) | EID' },
    description: "Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login.",
    alternates: localeAlternates(locale, '/resources/msds'),
  }
}

// BUILD CAUTION (highest priority in the set, internal — not page copy):
// MSDS documents must be current, accurate, and in the correct regional format.
// The EU uses SDS under REACH/CLP rather than "MSDS", so confirm with Uri whether
// these should be titled SDS for the DE, IT, and other EU-facing versions. Do not
// publish placeholder or out-of-date safety sheets. If Uri cannot supply a current
// document for a material, leave that entry off rather than shipping a stale one.
//
// EID publishes three safety sheets, one per material family, and the registry
// in lib/documents.ts lists exactly those three. The earlier seven-entry list
// was speculative: per the caution above, an entry with no current document
// behind it is left off rather than shipped stale.

const MsdsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Handling, storage & regulatory information')}
        title={t(locale, 'Material Safety Data Sheets (MSDS)')}
        desc={t(locale, "Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login.")}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'MSDS') }]}
      />

      <section data-note="downloads" className="py-16 lg:py-24">
        <div className="container">
          {/* Deliberately ungated: a safety document behind a form is a liability,
not a lead magnet. */}
          <SectionHeading eyebrow={t(locale, 'No form, no login')} title={t(locale, 'Safety data sheets, free to download.')} />
          <p className="text-default-600 mt-5 max-w-3xl text-base">
            <RichText>{t(locale, "Safety data sheets for EID's diamond and CBN products, covering handling, storage, disposal, and regulatory information. No form, no login. If you need a document that isn't listed, or a specific regional format, [ask us](/contact).")}</RichText>
          </p>
          <div className="divide-default-200 border-default-200 mt-14 divide-y border-t">
            {safetySheets.map((sheet) => (
              <Link key={sheet.key} href={sheet.file} download className="group flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="flex items-start gap-4">
                  <Icon icon="tabler:shield" className="text-primary mt-0.5 size-6 shrink-0" />
                  <div>
                    <h3 className="text-default-900 group-hover:text-primary text-base font-semibold">{t(locale, sheet.title)}</h3>
                    <p className="text-default-600 mt-1 text-base">{t(locale, sheet.desc)}</p>
                  </div>
                </div>
                <span className="border-default-300 text-default-800 group-hover:border-primary group-hover:text-primary inline-flex items-center gap-2 border px-3.5 py-1.5 text-sm font-semibold transition-colors">
                  <Icon icon="tabler:download" className="text-primary size-5" />
                  PDF
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        eyebrow={t(locale, 'Need a safety document not listed?')}
        title={t(locale, "Need a safety document that isn't listed?")}
        desc={t(locale, 'Tell us the product and the regional format you need, and we will send the current MSDS. Replies within one business day.')}
      />
    </>
  )
}

export default MsdsPage
