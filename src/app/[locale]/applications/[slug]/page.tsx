import { RichParagraphs } from '@/components/RichText'
import Wireframe from '@/components/Wireframe'
import { QuoteSection, CardGrid, CrossLinks, DarkFeatureList, PageHero } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getApplications, getProduct } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const a = getApplication(locale, slug)
  if (!a) return {}
  return {
    title: { absolute: a.metaTitle },
    description: a.metaDesc,
    alternates: localeAlternates(locale, `/applications/${slug}`),
  }
}

const familyIcon: Record<string, string> = {
  'Natural Diamond Grit & Powder': 'tabler:diamond',
  'Metal Bond Diamond': 'tabler:blade',
  'Resin Bond Diamond': 'tabler:stack-2',
  CBN: 'tabler:gauge',
  'Single Crystal Diamond (CVD & MCD)': 'tabler:cube',
  'Polycrystalline Diamond (CVD & PCD)': 'tabler:grid-dots',
  'Natural Tool Stones': 'tabler:mountain',
  'Polycrystalline Diamond Powder': 'tabler:bolt',
}

const ApplicationPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const app = getApplication(locale, slug)
  if (!app) notFound()

  const [headline, ...bodyParas] = app.intro

  // A hub routes to the exact product page, and often to the exact section
  // anchor within it, so the label and href come from the hub rather than from
  // the product record. The icon still keys off the parent product's family.
  const serviceItems = app.products.map((ap) => {
    const parentSlug = ap.href.replace('/products/', '').split('#')[0]
    const prod = getProduct(locale, parentSlug)
    return {
      icon: (prod ? familyIcon[prod.family] : undefined) || 'tabler:diamond',
      title: ap.label,
      desc: ap.note,
      href: ap.href,
    }
  })

  const productLinks = serviceItems.map((s) => ({ label: s.title, href: s.href }))
  const guideLinks = (app.guides ?? []).map((g) => ({ label: g, href: '/resources' }))
  const relatedHubLinks = (app.relatedHubs ?? [])
    .map((h) => getApplication(locale, h))
    .filter(Boolean)
    .map((h) => ({ label: h!.name, href: `/applications/${h!.slug}` }))

  return (
    <>
      <PageHero
        eyebrow={app.eyebrow}
        title={app.h1}
        desc={app.metaDesc}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Applications', href: '/applications' },
          { label: app.name },
        ]}
        primaryCta={{ label: app.cta, href: '/contact' }}
        secondaryCta={{ label: 'All Applications', href: '/applications' }}
      />

      {/* INTRO — the outcome block rides alongside the prose, because a hub has
          to be more than a product list. */}
      <div className="container pt-20">
        <ChapterMarker index="01" label="Overview" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <SectionHeading eyebrow={app.eyebrow} title={headline} />

          <div className="mt-12 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RichParagraphs className="text-base text-default-600" paragraphs={bodyParas} />
              <div className="mt-8">
                <ArrowButton href="/contact" label={app.cta} />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Wireframe label={`Application image — ${app.name}`} />

              <div className="border-t-2 border-primary pt-5">
                <div className="text-sm uppercase tracking-[0.2em] text-default-500">
                  {app.outcome.title}
                </div>
                <p className="mt-3 text-base text-default-600">{app.outcome.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS USED */}
      <div className="container">
        <ChapterMarker index="02" label="Products Used" />
      </div>
      <CardGrid
        eyebrow={app.productsTitle}
        title="The material behind your tools."
        desc="Every grade quality-controlled through our own laboratory to the same standard, every time. Tell us your application and we will recommend the right product."
        items={serviceItems}
        ctaHref="/contact"
        ctaLabel={app.cta}
      />

      {/* WHY EID — dark band; the chapter marker sits above it */}
      <div className="container">
        <ChapterMarker index="03" label="Why EID" />
      </div>
      <div className="pt-14">
        <DarkFeatureList
          bgLabel="Background image — application in production"
          eyebrow="The EID advantage"
          title={app.why.title}
          desc={app.why.body}
          ctaLabel={app.whyCta ?? 'See how our QC works'}
          ctaHref="/quality"
          features={[
            {
              title: 'Batch-to-batch consistency',
              desc: 'Re-order and get the same material, tested on every production run.',
            },
            {
              title: 'Full range, one supplier',
              desc: 'Everything this application needs from a single relationship and standard.',
            },
            {
              title: 'In-house QC laboratory',
              desc: 'Size distribution, crystal strength, morphology, and coating coverage.',
            },
            {
              title: 'ISO 9001 & traceability',
              desc: 'Certificate of analysis and retention samples available on request.',
            },
          ]}
        />
      </div>

      {/* CTA */}
      <div className="pt-20">
        <QuoteSection
          eyebrow="Tell us your application"
          title={`${app.cta}.`}
          desc={app.ctaDesc}
        />
      </div>

      {/* CROSS-LINKS */}
      <CrossLinks
        groups={[
          { title: 'Products for this application', links: productLinks },
          {
            title: 'Quality & resources',
            links: [
              { label: 'Quality, QC & ISO 9001', href: '/quality' },
              { label: 'Datasheets', href: '/resources/datasheets' },
              ...guideLinks,
            ],
          },
          ...(relatedHubLinks.length ? [{ title: 'Related hub', links: relatedHubLinks }] : []),
          {
            title: 'Other applications',
            links: getApplications(locale)
              .filter((o) => o.slug !== app.slug)
              .map((o) => ({ label: o.name, href: `/applications/${o.slug}` })),
          },
        ]}
      />
    </>
  )
}

export default ApplicationPage
