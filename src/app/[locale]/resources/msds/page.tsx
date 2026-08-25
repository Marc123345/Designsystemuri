import { RichText } from '@/components/RichText'
import Image from 'next/image'
import DocList from '@/components/resources/DocList'
import SectionBanner from '@/components/SectionBanner'
import { PageHero, QuoteSection } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { safetySheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

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
        /* A micrograph with its own scale bar, for the page that carries the
        handling documents. */
        bgImage="/eid/qc-batch-to-batch.jpg"
        variant="band"
      />

      {/* Shade 2, against Datasheets' 1. The two resources pages sit beside
          each other in the footer and the mega-menu, so giving them different
          cuts is the cheapest way to make it obvious which one you are on. */}
      <SectionBanner
        label={t(locale, 'Safety')}
        body={t(locale, 'Handling, storage, disposal and regulatory information — current documents only.')}
        shade={2}
      />

      <section data-note="downloads" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="rounded-card bg-primary flex flex-col justify-between p-7 lg:col-span-7 lg:p-10">
              <div>
                <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                  <span className="bg-primary-1 size-2" />
                  <span className="text-sm text-white">{t(locale, 'No form, no login')}</span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-white md:text-[30px] lg:text-[34px]">{t(locale, 'Safety data sheets, free to download.')}</h2>

                <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-white/85">
                  {/* Link override — see the identical note on the datasheets
                      page. RichText's `text-primary` is invisible on navy. */}
                  <span className="[&_a]:text-white [&_a]:decoration-white/60">
                    <RichText>{t(locale, "Safety data sheets for EID's diamond and CBN products, covering handling, storage, disposal, and regulatory information. No form, no login. If you need a document that isn't listed, or a specific regional format, [ask us](/contact).")}</RichText>
                  </span>
                </p>
              </div>

              {/* ⚠ THREE, AND THE NUMBER IS THE POINT. The build caution above
                  says an entry with no current document behind it is left off
                  rather than shipped stale, which is why this list is three and
                  not the seven a speculative version once had. Deriving the
                  figure from the registry means it can never claim more sheets
                  than exist. */}
              <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-control bg-white/15">
                {[
                  { v: String(safetySheets.length), k: 'Current sheets' },
                  { v: '0', k: 'Forms to fill in' },
                ].map((s) => (
                  <div key={s.k} className="bg-primary px-4 py-4">
                    <dd className="text-[26px] leading-none font-bold text-white lg:text-[30px]">{s.v}</dd>
                    <dt className="mt-2 text-[10px] font-semibold tracking-[0.18em] text-white/75 uppercase">{t(locale, s.k)}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-card relative min-h-[260px] overflow-hidden lg:col-span-5">
              <Image
                src="/eid/quality/10-chemical-rinse-beaker-diamonds.png"
                alt={t(locale, 'Diamond crystals suspended in a beaker of clear chemical rinse under a fume hood')}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-14 lg:mt-16">
            {/* A shield rather than a document icon: these are the safety set,
                and the distinction is worth keeping at a glance when the two
                resources pages otherwise look identical. */}
            <DocList groups={[{ sheets: safetySheets }]} icon="tabler:shield" />
          </div>
        </div>
      </section>

      {/* The band that closes About, Quality and Contact, so the resources
          pages end on the site's rhythm rather than dropping straight from a
          list of links into the contact block. */}
      <QuoteSection
        eyebrow={t(locale, 'Need a safety document not listed?')}
        title={t(locale, "Need a safety document that isn't listed?")}
        desc={t(locale, 'Tell us the product and the regional format you need, and we will send the current MSDS.')}
      />
    </>
  )
}

export default MsdsPage
