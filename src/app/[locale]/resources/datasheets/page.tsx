import { RichText } from '@/components/RichText'
import { PageHero, QuoteSection } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { datasheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Diamond & CBN Product Datasheets | EID' },
    description: "Download technical datasheets for EID's full diamond and CBN range: grades, sizes, crystal types, coatings, and packaging. Ungated, free to download.",
    alternates: localeAlternates(locale, '/resources/datasheets'),
  }
}

const DatasheetsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Ungated · specifications, grades & sizing')}
        title={t(locale, 'Product Datasheets')}
        desc={t(locale, "Download technical datasheets for EID's full diamond and CBN range: grades, sizes, crystal types, coatings, and packaging. Ungated, free to download.")}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Datasheets') }]}
        secondaryCta={{ label: t(locale, 'MSDS'), href: '/resources/msds' }}
      />

      <section className="py-16 lg:py-24">
        <div className="container">
          {/* Deliberately ungated: no form, no login, no gate on a spec sheet. */}
          <SectionHeading eyebrow={t(locale, 'No form, no login')} title={t(locale, 'Product datasheets, free to download.')} />
          <p className="text-default-600 mt-5 max-w-3xl text-base">
            <RichText>{t(locale, 'Technical specifications for every EID product: grades, sizes, crystal types, coating options, and packaging. No form, no login. Download what you need, and if the exact spec you are after is not here, [ask us](/contact).')}</RichText>
          </p>
          <div className="mt-14 grid gap-10">
            {datasheets.map(({ group, sheets }) => (
              <div key={group}>
                <div className="border-default-200 text-default-500 border-b pb-2.5 text-sm tracking-[0.2em] uppercase">{t(locale, group)}</div>
                <div className="divide-default-200 divide-y">
                  {sheets.map((sheet) => (
                    <Link
                      key={sheet.key}
                      href={sheet.file}
                      // Native download rather than an in-tab PDF viewer: these
                      // are reference documents an engineer files, not reads once.
                      download
                      className="group flex flex-wrap items-center justify-between gap-4 py-5"
                    >
                      <div className="flex items-start gap-4">
                        <Icon icon="tabler:file-text" className="text-primary mt-0.5 size-6 shrink-0" />
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
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        eyebrow={t(locale, 'Need a spec not listed?')}
        title={t(locale, "Need a spec that isn't listed here?")}
        desc={t(locale, 'Tell us the product and the parameters you need, and we will send the datasheet or confirm a custom specification. Replies within one business day.')}
      />
    </>
  )
}

export default DatasheetsPage
