import CountUp from '@/components/CountUp'
import { RichText } from '@/components/RichText'
import DocList from '@/components/resources/DocList'
import { PageHero } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { datasheets } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

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

  const stats = [
    { v: String(datasheets.reduce((n, group) => n + group.sheets.length, 0)), k: 'Datasheets' },
    { v: String(datasheets.length), k: 'Product groups' },
    { v: '0', k: 'Forms to fill in' },
  ]

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Ungated · specifications, grades & sizing')}
        title={t(locale, 'Product Datasheets')}
        desc={t(locale, "Download technical datasheets for EID's full diamond and CBN range: grades, sizes, crystal types, coatings, and packaging. Ungated, free to download.")}
        bgImage="/eid/qc-samples.jpg"
        variant="band"
      />

      <section data-note="downloads" className="py-16 lg:py-24">
        <div className="container">
          {/* The resource proposition pins while the long technical index moves
              beside it. This is the reference's sticky-copy/scrolling-gallery
              pattern applied to a document page rather than decorative cards. */}
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <div className="lg:col-span-5">
              <div className="eid-sticky-copy rounded-card bg-primary overflow-hidden text-white shadow-[0_28px_90px_-48px_rgba(2,6,23,0.55)]">
                <div className="p-7 lg:p-9 xl:p-10">
                  <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                    <span className="bg-primary-1 size-2" />
                    <span className="text-sm text-white">{t(locale, 'No form, no login')}</span>
                  </div>

                  <h2 className="mt-5 text-2xl leading-tight font-bold text-white md:text-[30px] lg:text-[34px]">
                    {t(locale, 'Product datasheets, free to download.')}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-white/82">
                    <span className="[&_a]:text-white [&_a]:decoration-white/60">
                      <RichText>{t(locale, 'Technical specifications for every EID product: grades, sizes, crystal types, coating options, and packaging. No form, no login. Download what you need, and if the exact spec you are after is not here, [ask us](/contact).')}</RichText>
                    </span>
                  </p>

                  <dl className="rounded-control mt-8 grid grid-cols-3 gap-px overflow-hidden bg-white/15">
                    {stats.map((stat) => (
                      <div key={stat.k} className="bg-primary px-3 py-4 sm:px-4">
                        <dd className="text-[25px] leading-none font-bold text-white lg:text-[29px]"><CountUp value={stat.v} /></dd>
                        <dt className="mt-2 text-[9px] font-semibold tracking-[0.14em] text-white/68 uppercase lg:text-[10px]">{t(locale, stat.k)}</dt>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="relative aspect-[16/9] w-full overflow-hidden border-t border-white/12">
                  <Image
                    src="/eid/qc-samples.jpg"
                    alt={t(locale, 'A laboratory shelf of labelled sample jars, coarse grit at the front graduating to fine powder along the row')}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                  />
                  <span aria-hidden className="bg-primary-3/12 absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pb-[10vh]">
              <DocList groups={datasheets} icon="tabler:file-text" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default DatasheetsPage
