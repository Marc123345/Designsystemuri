import Image from 'next/image'
import { RichText } from '@/components/RichText'
import DocList from '@/components/resources/DocList'
import SectionBanner from '@/components/SectionBanner'
import { PageHero, QuoteSection } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { datasheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

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
        /* Was the metrology bench, which is another all-white room and washed
           out the same way. Rows of labelled sample jars carry some tone and
           are nearer the point of this page: every grade on file, on a shelf. */
        bgImage="/eid/qc-samples.jpg"
        variant="band"
      />

      {/* The blue cut. Every content page on this site runs
          SectionBanner -> section, and the resources pages were the last that
          did not — which is why they read as a hero followed by a list rather
          than as pages with a structure. */}
      <SectionBanner
        label={t(locale, 'Datasheets')}
        body={t(locale, 'Every grade on file — specifications, sizing, coatings and packaging. Ungated.')}
        shade={1}
      />

      <section data-note="downloads" className="py-16 lg:py-24">
        <div className="container">
          {/* ── INTRO, AS A BENTO ────────────────────────────────────────────
              Was a SectionHeading and a paragraph on white: correct, and flat.
              The page's whole proposition — that nothing here is gated — was a
              10px eyebrow above a heading, which is the least emphasis the
              system has.

              7/5: the claim on brand navy, the shelf of graded samples beside
              it. The dark panel is what gives this page a floor; without it
              the page is white from the hero to the footer. */}
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="rounded-card bg-primary flex flex-col justify-between p-7 lg:col-span-7 lg:p-10">
              <div>
                <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                  <span className="bg-primary-1 size-2" />
                  <span className="text-sm text-white">{t(locale, 'No form, no login')}</span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-white md:text-[30px] lg:text-[34px]">{t(locale, 'Product datasheets, free to download.')}</h2>

                <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-white/85">
                  {/* ⚠ RichText renders links `text-primary` — brand navy, which
                      on this brand-navy panel is invisible. Same trap as the
                      FAQ cards; overridden locally rather than globally,
                      because every other consumer of RichText is on white. */}
                  <span className="[&_a]:text-white [&_a]:decoration-white/60">
                    <RichText>{t(locale, 'Technical specifications for every EID product: grades, sizes, crystal types, coating options, and packaging. No form, no login. Download what you need, and if the exact spec you are after is not here, [ask us](/contact).')}</RichText>
                  </span>
                </p>
              </div>

              {/* The count is the argument. "Ungated" is a promise; a number is
                  the evidence for it, and it is derived rather than typed so it
                  cannot drift from the registry. */}
              <dl className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-control bg-white/15">
                {[
                  { v: String(datasheets.reduce((n, g) => n + g.sheets.length, 0)), k: 'Datasheets' },
                  { v: String(datasheets.length), k: 'Product groups' },
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
                src="/eid/qc-samples.jpg"
                alt={t(locale, 'A laboratory shelf of labelled sample jars, coarse grit at the front graduating to fine powder along the row')}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mt-14 lg:mt-16">
            <DocList groups={datasheets} icon="tabler:file-text" />
          </div>
        </div>
      </section>

      {/* The band that closes About, Quality and Contact, so the resources
          pages end on the site's rhythm rather than dropping straight from a
          list of links into the contact block. */}
      <QuoteSection
        eyebrow={t(locale, 'Need a spec not listed?')}
        title={t(locale, "Need a spec that isn't listed here?")}
        desc={t(locale, 'Tell us the product and the parameters you need, and we will send the datasheet or confirm a custom specification.')}
      />
    </>
  )
}

export default DatasheetsPage
