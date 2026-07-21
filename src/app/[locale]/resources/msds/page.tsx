import { RichText } from '@/components/RichText'
import { QuoteSection, PageHero } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Diamond & CBN Safety Data Sheets (MSDS) | EID' },
    description:
      "Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login.",
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
// Grouped one entry per material family, not by the eight-page catalogue: safety
// documents genuinely group by material, and coated abrasives carry different
// handling information even though coatings are no longer a standalone product line.
const msds: [string, string][] = [
  [
    'Natural Diamond (Grit & Powder)',
    'Handling and safety for natural diamond abrasive products.',
  ],
  ['Synthetic Diamond (Metal Bond & Resin Bond)', 'For synthetic bonded diamond powders.'],
  ['CBN (Cubic Boron Nitride)', 'For CBN mesh and micron products.'],
  [
    'CVD Diamond (Single Crystal & Polycrystalline)',
    'For CVD single crystal and polycrystalline products.',
  ],
  ['MCD (Monocrystalline Diamond)', 'For HPHT monocrystalline products.'],
  ['PCD / PCBN', 'For polycrystalline diamond and CBN discs and blanks.'],
  [
    'Coated Diamond & CBN Products',
    'Handling and safety for coated (nickel, copper, titanium) abrasives.',
  ],
]

const MsdsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Handling, storage & regulatory information"
        title="Material Safety Data Sheets (MSDS)"
        desc="Download safety data sheets for EID's industrial diamond and CBN products. Handling, storage, disposal, and regulatory information. Free, no login."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'MSDS' },
        ]}
        secondaryCta={{ label: 'Datasheets', href: '/resources/datasheets' }}
      />

      <section className="lg:py-24 py-16">
        <div className="container">
          {/* Deliberately ungated: a safety document behind a form is a liability,
              not a lead magnet. */}
          <SectionHeading eyebrow="No form, no login" title="Safety data sheets, free to download." />
          <p className="mt-5 max-w-3xl text-base text-default-600">
            <RichText>
              {"Safety data sheets for EID's diamond and CBN products, covering handling, storage, disposal, and regulatory information. No form, no login. If you need a document that isn't listed, or a specific regional format, [ask us](/contact)."}
            </RichText>
          </p>
          <div className="mt-14 divide-y divide-default-200 border-t border-default-200">
            {msds.map(([name, desc]) => (
              <div key={name} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div className="flex items-start gap-4">
                  <Icon icon="tabler:shield" className="mt-0.5 size-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="text-base font-semibold text-default-900">{name}</h3>
                    <p className="mt-1 text-base text-default-600">{desc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-2xl border border-default-300 px-3.5 py-1.5 text-sm font-semibold text-default-800">
                  <Icon icon="tabler:download" className="size-5 text-primary" />
                  PDF
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection
        eyebrow="Need a safety document not listed?"
        title="Need a safety document that isn't listed?"
        desc="Tell us the product and the regional format you need, and we will send the current MSDS. Replies within one business day."
      />
    </>
  )
}

export default MsdsPage
