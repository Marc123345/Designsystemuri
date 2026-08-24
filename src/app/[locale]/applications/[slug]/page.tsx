import CurtainGrid from '@/components/CurtainGrid'
import { RichParagraphs } from '@/components/RichText'
import { CrossLinks, DarkFeatureList, PageHero, QuoteSection } from '@/components/sections'
import { ArrowButton, SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { applications } from '@/lib/applications'
import { applicationImage, productImage } from '@/lib/card-media'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getApplications, getProduct, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
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

const ApplicationPage = async ({ params }: { params: Promise<{ locale: Locale; slug: string }> }) => {
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
      image: productImage(parentSlug),
      title: ap.label,
      desc: ap.note,
      href: ap.href,
    }
  })

  const appImage = applicationImage(app.slug)
  const productLinks = serviceItems.map((s) => ({ label: s.title, href: s.href }))
  const guideLinks = (app.guides ?? []).map((g) => ({ label: g, href: '/resources/blog' }))
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
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Applications'), href: '/applications' }, { label: app.name }]}
        /* The hub's own card photograph, so the page a visitor clicks into
           opens on the picture they clicked. A hub with no image in the map
           falls through to the bordered header rather than to an empty band. */
        bgImage={applicationImage(app.slug)}
        variant="band"
      />

      {/* INTRO — prose + image, then the outcome as a full-width thesis band.
          The hub's core argument was previously a small label in the sidebar,
below the fold of the F-pattern scan; promoting it to its own band
          (heading left, argument right) gives it the weight it converts on.
          The intro CTA is dropped here: the hero one sentence up already
carries it, so a second identical button read as repetition. */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading eyebrow={app.eyebrow} title={headline} />

          <div className="mt-12 grid items-start gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <RichParagraphs className="text-default-600 text-lg leading-relaxed" paragraphs={bodyParas} />
            </div>

            <div className="lg:col-span-5">
              {/* The hub grid has carried an image per industry all along; this
                  page — the one a buyer lands on from search — rendered a grey
                  wireframe instead, because it never imported the map. Same
                  source as the hub, so the two agree and a replacement lands in
                  both at once.

                  ⚠ These are still placeholder stock, per the note in
                  card-media.ts. Nothing here depicts EID's premises, staff,
                  customers or output. */}
              {appImage ? (
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={appImage}
                    alt={`${app.name} — industrial diamond and CBN applications`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Wireframe label={`Application image — ${app.name}`} />
              )}
            </div>
          </div>

          <div className="border-default-200 mt-14 grid items-start gap-12 border-t pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-default-500 flex items-center gap-2.5 text-sm tracking-[0.2em] uppercase">
                <span aria-hidden="true" className="bg-primary size-2" />
                {t(locale, 'Why it matters')}
              </div>
              <h3 className="text-default-900 mt-4 text-2xl leading-snug font-bold md:text-[24px] lg:text-[28px]">{app.outcome.title}</h3>
            </div>
            <div className="lg:col-span-8">
              <p className="text-default-600 text-lg leading-relaxed">{app.outcome.body}</p>
              <div className="mt-8">
                <ArrowButton href="/contact" label={app.cta} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS USED

          The same grid the home page uses for the eight product groups, not a
          carousel. A carousel showed three of five grades and made a buyer
          press an arrow to discover the rest, on the page where the whole
          question is "which of these do I need". The grid shows all of them at
          once and the cards are the ones they have already seen on the home
          page, so a group is recognisable between the two.

          Columns follow the count: these hubs carry three to five products,
          and four columns would leave the five-product hubs with a single card
          stranded on its own row. */}
      <section className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
                <span className="bg-primary size-2"></span>
                <span className="text-default-900 text-sm">{app.productsTitle}</span>
              </div>
              <h2 className="mt-4 text-[28px] font-bold md:text-[36px] lg:text-[42px]">
                {t(locale, 'The material behind your tools.')}
              </h2>
            </div>
            <p className="text-default-600 lg:col-span-5">
              {t(
                locale,
                'Every grade quality-controlled through our own laboratory to the same standard, every time. Tell us your application and we will recommend the right product.',
              )}
            </p>
          </div>

          <div className="mt-14 lg:mt-18">
            <CurtainGrid
              items={serviceItems.map((item) => ({
                title: item.title,
                href: item.href,
                image: { src: item.image ?? '', alt: item.title },
              }))}
              columns={serviceItems.length % 4 === 0 ? 4 : 3}
              revealed
            />
          </div>

          <div className="mt-12">
            <ArrowButton href="/contact" label={app.cta} variant="dark" />
          </div>
        </div>
      </section>

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
        <QuoteSection eyebrow={t(locale, 'Tell us your application')} title={`${app.cta}.`} desc={app.ctaDesc} />
      </div>

      {/* CROSS-LINKS */}
      <CrossLinks
        groups={[
          { title: t(locale, 'Products for this application'), links: productLinks },
          {
            title: t(locale, 'Quality & resources'),
            links: [{ label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' }, { label: t(locale, 'Datasheets'), href: '/resources/datasheets' }, ...guideLinks],
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
