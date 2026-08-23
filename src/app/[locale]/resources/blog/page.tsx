import { PageHero, QuoteSection } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Blog | Industrial Diamond & Superabrasive Insights | EID Ltd' },
    description: 'News, application notes, and technical insight on industrial diamond and CBN from EID Ltd, London-based superabrasive manufacturer.',
    alternates: localeAlternates(locale, '/resources/blog'),
  }
}

const posts = [
  {
    category: 'Application Note',
    title: 'Why batch-to-batch consistency is the real cost driver in diamond tooling',
  },
  { category: 'Technical', title: 'Reading a particle size distribution: D10, D50, D90 and span' },
  { category: 'Materials', title: 'When CBN beats diamond: a field guide for ferrous grinding' },
  { category: 'Industry', title: 'What dental bur makers actually need from a diamond supplier' },
  { category: 'Process', title: 'Inside our QC laboratory: how a batch gets approved to ship' },
  { category: 'Materials', title: 'CVD vs HPHT (MCD): choosing a single-crystal route' },
]

const BlogPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'News, application notes & technical insight')}
        title={t(locale, 'The EID Blog')}
        desc={t(locale, 'News, application notes, and technical insight on industrial diamond and CBN from EID Ltd, London-based superabrasive manufacturer.')}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Blog') }]}
      />

      {/* FEATURED */}
      <section className="py-16 lg:py-24">
        <div className="container">
          {/* The disclosure sits above the titles, not under them.
              It used to be a line at the very bottom of the page, below seven
              cards whose "Read article" and "Read" links all went to /contact —
              so anyone who clicked the second card met a contact form having
              never seen the note. Titles with no link and the caveat first is
              honest at a glance; the questions CTA at the foot of the page is
              still there for anyone who wants to ask. */}
          <p className="text-default-600 mb-10 text-base">{t(locale, 'Coming soon. Content hub launches with the site.')}</p>
          <div className="border-primary bg-default-50 border-t-2 p-8 lg:p-12">
            <span className="border-default-300 text-default-900 inline-flex w-fit items-center gap-1.5 border bg-white px-3.5 py-1.25 text-sm">{t(locale, 'Application Note')}</span>
            <h2 className="mt-4 max-w-3xl text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'Why batch-to-batch consistency is the real cost driver in diamond tooling')}</h2>
            <p className="text-default-600 mt-5 max-w-3xl text-base">{t(locale, 'Procurement optimises for price per carat. The bigger number is what an inconsistent batch costs downstream: rejected product, recalibrated lines, lost trust.')}</p>
          </div>
        </div>
      </section>

      {/* POST GRID */}
      <section className="border-default-200 bg-default-50 mt-14 border-y py-16 lg:py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.title} className="flex flex-col gap-4">
                <span className="border-default-300 text-default-900 inline-flex w-fit items-center gap-1.5 border bg-white px-3.5 py-1.25 text-sm">{t(locale, p.category)}</span>
                <h3 className="text-xl">{t(locale, p.title)}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20">
        <QuoteSection eyebrow={t(locale, 'Have a technical question?')} title={t(locale, 'Ask our team, we may write about it.')} desc={t(locale, "Send us your application question and we'll point you to the right grade, or cover it in a future guide.")} />
      </div>
    </>
  )
}

export default BlogPage
