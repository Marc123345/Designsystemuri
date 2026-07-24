import { RichParagraphs } from '@/components/RichText'
import Wireframe from '@/components/Wireframe'
import CardCarousel from '@/components/CardCarousel'
import { QuoteSection, CrossLinks, DarkFeatureList, PageHero } from '@/components/sections'
import { ArrowButton, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getApplications, getProduct, t } from '@/lib/i18n-content'
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
          { label: t(locale, 'Home'), href: '/' },
          { label: t(locale, 'Applications'), href: '/applications' },
          { label: app.name },
        ]}
        primaryCta={{ label: app.cta, href: '/contact' }}
        secondaryCta={{ label: t(locale, 'All Applications'), href: '/applications' }}
      />

      {/* INTRO — the outcome block rides alongside the prose, because a hub has
          to be more than a product list. */}
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
      <CardCarousel
        eyebrow={app.productsTitle}
        title={t(locale, 'The material behind your tools.')}
        desc={t(locale, 'Every grade quality-controlled through our own laboratory to the same standard, every time. Tell us your application and we will recommend the right product.')}
        items={serviceItems}
        ctaHref="/contact"
        ctaLabel={app.cta}
      />

      {/* WHY EID */}
      <div className="pt-14">
        <DarkFeatureList
          bgLabel="Background image — application in production"
          eyebrow={t(locale, 'The EID advantage')}
          title={app.why.title}
          desc={app.why.body}
          ctaLabel={app.whyCta ?? t(locale, 'See how our QC works')}
          ctaHref="/quality"
          features={[
            {
              title: t(locale, 'Batch-to-batch consistency'),
              desc: t(locale, 'Re-order and get the same material, tested on every production run.'),
            },
            {
              title: t(locale, 'Full range, one supplier'),
              desc: t(locale, 'Everything this application needs from a single relationship and standard.'),
            },
            {
              title: t(locale, 'In-house QC laboratory'),
              desc: t(locale, 'Size distribution, crystal strength, morphology, and coating coverage.'),
            },
            {
              title: t(locale, 'ISO 9001 & traceability'),
              desc: t(locale, 'Certificate of analysis and retention samples available on request.'),
            },
          ]}
        />
      </div>

      {/* CTA */}
      <div className="pt-20">
        <QuoteSection
          eyebrow={t(locale, 'Tell us your application')}
          title={`${app.cta}.`}
          desc={app.ctaDesc}
        />
      </div>

      {/* CROSS-LINKS */}
      <CrossLinks
        groups={[
          { title: t(locale, 'Products for this application'), links: productLinks },
          {
            title: t(locale, 'Quality & resources'),
            links: [
              { label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' },
              { label: t(locale, 'Datasheets'), href: '/resources/datasheets' },
              ...guideLinks,
            ],
          },
          ...(relatedHubLinks.length ? [{ title: t(locale, 'Related hub'), links: relatedHubLinks }] : []),
          {
            title: t(locale, 'Other applications'),
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
