import { RichText } from '@/components/RichText'
import { BannerCTA, PageHero } from '@/components/sections'
import { ChapterMarker, SectionHeading } from '@/components/ui'
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
    title: { absolute: 'Diamond & CBN Product Datasheets | EID' },
    description:
      "Download technical datasheets for EID's full diamond and CBN range: grades, sizes, crystal types, coatings, and packaging. Ungated, free to download.",
    alternates: localeAlternates(locale, '/resources/datasheets'),
  }
}

// Grouped by the eight locked product groups so the list mirrors the catalogue.
const groups: { group: string; sheets: [string, string][] }[] = [
  {
    group: 'Natural Diamond Grit & Powder',
    sheets: [
      ['Natural Diamond Grit (Mesh)', 'Graded mesh sizes for grinding, sawing, and dressing.'],
      ['Natural Diamond Micron Powder', 'Fine powders for lapping and polishing.'],
    ],
  },
  {
    group: 'Metal Bond Diamond',
    sheets: [
      ['Metal Bond Diamond Powder', 'Saw and wheel grades, mesh and micron, coating options.'],
    ],
  },
  {
    group: 'Resin Bond Diamond',
    sheets: [['Resin Bond Diamond Powder', 'Friable grades, mesh and micron, coating options.']],
  },
  {
    group: 'CBN',
    sheets: [
      ['CBN Powder (Mesh & Micron)', 'For ferrous grinding, coating options.'],
      ['PCBN Discs & Blanks', 'CBN content grades and dimensions.'],
    ],
  },
  {
    group: 'Single Crystal Diamond',
    sheets: [
      ['CVD Single Crystal Diamond', 'Orientations, sizes, and faces.'],
      ['MCD (Monocrystalline Diamond)', 'Shapes, sizes, orientations.'],
    ],
  },
  {
    group: 'Polycrystalline Diamond',
    sheets: [
      ['PCD Discs & Blanks', 'Grain sizes and dimensions.'],
      ['CVD Polycrystalline Dressing Logs', 'Log sizes and shapes.'],
    ],
  },
  {
    group: 'Natural Tool Stones',
    sheets: [['Natural Diamond Tool Stones', 'Shapes, sizes, and grades.']],
  },
  {
    group: 'Polycrystalline Diamond Powder',
    sheets: [['Polycrystalline Diamond Micron Powder', 'Sizes and formats for polishing.']],
  },
]

const DatasheetsPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Ungated · specifications, grades & sizing"
        title="Product Datasheets"
        desc="Download technical datasheets for EID's full diamond and CBN range: grades, sizes, crystal types, coatings, and packaging. Ungated, free to download."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Datasheets' },
        ]}
        secondaryCta={{ label: 'MSDS', href: '/resources/msds' }}
      />

      <div className="container pt-20">
        <ChapterMarker index="01" label="Datasheets" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          {/* Deliberately ungated: no form, no login, no gate on a spec sheet. */}
          <SectionHeading
            eyebrow="No form, no login"
            title="Product datasheets, free to download."
          />
          <p className="mt-5 max-w-3xl text-base text-default-600">
            <RichText>
              {'Technical specifications for every EID product: grades, sizes, crystal types, coating options, and packaging. No form, no login. Download what you need, and if the exact spec you are after is not here, [ask us](/contact).'}
            </RichText>
          </p>
          <p className="mt-5 text-sm text-default-500">
            Placeholder downloads. Confirm available datasheets with Uri and upload the actual PDFs.
          </p>

          <div className="mt-14 grid gap-10">
            {groups.map(({ group, sheets }) => (
              <div key={group}>
                <div className="border-b border-default-200 pb-2.5 text-sm uppercase tracking-[0.2em] text-default-500">
                  {group}
                </div>
                <div className="divide-y divide-default-200">
                  {sheets.map(([name, desc]) => (
                    <div
                      key={name}
                      className="flex flex-wrap items-center justify-between gap-4 py-5"
                    >
                      <div className="flex items-start gap-4">
                        <Icon icon="tabler:file-text" className="mt-0.5 size-6 shrink-0 text-primary" />
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
            ))}
          </div>
        </div>
      </section>

      <BannerCTA
        eyebrow="Need a spec not listed?"
        title="Need a spec that isn't listed here?"
        desc="Tell us the product and the parameters you need, and we will send the datasheet or confirm a custom specification. Replies within one business day."
        ctaLabel="Contact us"
        ctaHref="/contact"
      />
    </>
  )
}

export default DatasheetsPage
