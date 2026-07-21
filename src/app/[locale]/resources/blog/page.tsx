import { QuoteSection, PageHero } from '@/components/sections'
import { ArrowLink, ChapterMarker } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Blog | Industrial Diamond & Superabrasive Insights | EID Ltd' },
    description:
      'News, application notes, and technical insight on industrial diamond and CBN from EID Ltd, London-based superabrasive manufacturer.',
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
        eyebrow="News, application notes & technical insight"
        title="The EID Blog"
        desc="News, application notes, and technical insight on industrial diamond and CBN from EID Ltd, London-based superabrasive manufacturer."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Blog' },
        ]}
        secondaryCta={{ label: 'Resources & Guides', href: '/resources' }}
      />

      {/* FEATURED */}
      <div className="container pt-20">
        <ChapterMarker index="01" label="Featured" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <div className="border-t-2 border-primary bg-default-50 lg:p-12 p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25 text-sm text-default-900">
              Application Note
            </span>
            <h2 className="mt-4 max-w-3xl lg:text-[42px] md:text-[36px] text-[28px] font-bold">
              Why batch-to-batch consistency is the real cost driver in diamond tooling
            </h2>
            <p className="mt-5 max-w-3xl text-base text-default-600">
              Procurement optimises for price per carat. The bigger number is what an inconsistent
              batch costs downstream: rejected product, recalibrated lines, lost trust.
            </p>
            <div className="mt-7">
              <ArrowLink href="/contact" label="Read article" />
            </div>
          </div>
        </div>
      </section>

      {/* POST GRID */}
      <div className="container">
        <ChapterMarker index="02" label="Latest Posts" />
      </div>
      <section className="border-y border-default-200 bg-default-50 lg:py-24 py-16 mt-14">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-12">
            {posts.map((p) => (
              <article key={p.title} className="flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25 text-sm text-default-900">
                  {p.category}
                </span>
                <h3 className="text-xl">{p.title}</h3>
                <div className="mt-auto pt-2">
                  <ArrowLink href="/contact" label="Read" />
                </div>
              </article>
            ))}
          </div>
          {/* Nothing is published yet — say so rather than imply a live archive. */}
          <p className="mt-12 text-center text-sm text-default-500">
            Coming soon. Content hub launches with the site.
          </p>
        </div>
      </section>

      <div className="pt-20">
        <QuoteSection
          eyebrow="Have a technical question?"
          title="Ask our team, we may write about it."
          desc="Send us your application question and we'll point you to the right grade, or cover it in a future guide."
        />
      </div>
    </>
  )
}

export default BlogPage
