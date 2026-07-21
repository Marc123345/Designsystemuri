import { RichParagraphs, RichText } from '@/components/RichText'
import Wireframe from '@/components/Wireframe'
import {
  QuoteSection,
  CrossLinks,
  DarkFeatureList,
  JumpNav,
  PageHero,
  SpecTable,
} from '@/components/sections'
import { ArrowButton, ArrowLink, ChapterMarker, SectionHeading } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getProduct } from '@/lib/i18n-content'
import { products, type ProductSection } from '@/lib/products'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const p = getProduct(locale, slug)
  if (!p) return {}
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDesc,
    alternates: localeAlternates(locale, `/products/${slug}`),
  }
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const p = getProduct(locale, slug)
  if (!p) notFound()

  const [headline, ...bodyParas] = p.intro
  // A single-section product renders flat: no jump nav, no repeated section
  // heading chrome, because there is nothing to jump between.
  const isSplit = p.sections.length > 1
  const leadSpecs = p.sections.find((s) => s.specs?.length)?.specs ?? []

  // Chapter numbers are assigned up front rather than incremented during render,
  // so the QC band cannot be numbered ahead of the sections above it.
  const chapterOrder = ['Overview', ...p.sections.map((s) => s.label), 'Quality Control']
  const chapterIndex = (label: string) => String(chapterOrder.indexOf(label) + 1).padStart(2, '0')

  const crossApplicationLinks = p.crossApplications
    .map((s) => getApplication(locale, s))
    .filter(Boolean)
    .map((ca) => ({ label: ca!.name, href: `/applications/${ca!.slug}` }))
  const guideLinks = (p.guides ?? []).map((g) => ({ label: g, href: '/resources' }))
  const hasDatasheet = p.sections.some((s) => s.datasheet)

  return (
    <>
      <PageHero
        eyebrow={p.eyebrow}
        title={p.h1}
        desc={p.metaDesc}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/#products' },
          { label: p.name },
        ]}
        primaryCta={{ label: p.cta, href: '/contact' }}
        secondaryCta={{ label: 'All Products', href: '/#products' }}
      />

      {isSplit && <JumpNav items={p.sections.map((s) => ({ id: s.id, label: s.label }))} />}

      {/* OVERVIEW */}
      <div className="container pt-20">
        <ChapterMarker index={chapterIndex('Overview')} label="Overview" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <SectionHeading eyebrow={p.family} title={headline} />

          <div className="mt-12 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <RichParagraphs className="text-base text-default-600" paragraphs={bodyParas} />
              <div className="mt-8">
                <ArrowButton href="/contact" label={p.cta} />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Wireframe label={`Product image — ${p.name}`} />

              {leadSpecs.length > 0 && (
                <div className="divide-y divide-default-200 border-t border-default-200">
                  {leadSpecs.slice(0, 3).map((s) => (
                    <div key={s.label} className="py-5">
                      <h4 className="text-base font-semibold text-default-900">{s.label}</h4>
                      <p className="mt-1 text-base text-default-600">{s.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS — each keeps its H2, anchor, applications, and spec table */}
      {p.sections.map((s, i) => (
        <ProductSectionBlock
          key={s.id}
          section={s}
          gray={i % 2 === 1}
          showHeading={isSplit}
          chapterIndex={chapterIndex(s.label)}
        />
      ))}

      <DarkFeatureList
          bgLabel="Background image — QC laboratory"
        eyebrow="Proven on every lot"
        title="Tested in our own laboratory."
        desc={
          p.quality ??
          'Every production run is tested in our in-house QC laboratory for size distribution, crystal morphology, and strength. ISO 9001 certified. Full traceability from raw material to shipped product.'
        }
        ctaLabel={p.qualityCta ?? 'See how our QC works'}
        ctaHref="/quality"
        features={[
          {
            title: 'Particle size distribution',
            desc: 'Tight D50 and span, graded and verified on every batch.',
          },
          {
            title: 'Crystal strength & morphology',
            desc: 'Confirmed to perform as expected in your bond system.',
          },
          {
            title: 'Coating weight & coverage',
            desc: 'Every coated batch checked for target weight and uniformity.',
          },
          {
            title: 'ISO 9001 & traceability',
            desc: 'Certificate of analysis and retention samples on request.',
          },
        ]}
      />

      <div className="pt-20">
        <QuoteSection
          eyebrow="Made to your specification"
          title="Request a quote or a sample."
          desc="Give us the grade, size, format, and application, and a real person replies within one business day."
        />
      </div>

      <CrossLinks
        groups={[
          // Vol 03 writes an explicit "On this page" group into crossLinks for
          // some products. Only synthesise one where the deck did not, or the
          // split pages would render the group twice.
          ...(isSplit && !(p.crossLinks ?? []).some((g) => g.title === 'On this page')
            ? [
                {
                  title: 'On this page',
                  links: p.sections.map((s) => ({
                    label: s.label,
                    href: `/products/${p.slug}#${s.id}`,
                  })),
                },
              ]
            : []),
          ...(p.crossLinks ?? []),
          { title: 'Applications', links: crossApplicationLinks },
          {
            title: 'Quality & resources',
            links: [
              { label: 'Quality, QC & ISO 9001', href: '/quality' },
              // Tool Stones is deliberately enquiry-led: the deck specifies no
              // datasheet for it, so we do not offer a download that has no file.
              ...(hasDatasheet ? [{ label: 'Datasheets', href: '/resources/datasheets' }] : []),
              ...guideLinks,
            ],
          },
        ]}
      />
    </>
  )
}

export default ProductPage

/* ------------------------------------------------------------------------- */

const ProductSectionBlock = ({
  section,
  gray,
  showHeading,
  chapterIndex,
}: {
  section: ProductSection
  gray: boolean
  showHeading: boolean
  chapterIndex: string
}) => {
  const hasDetail = Boolean(section.applications?.length || section.specs?.length)

  return (
    <>
      <div className={gray ? 'bg-default-50' : ''}>
        <div className="container pt-20">
          <ChapterMarker index={chapterIndex} label={section.label} />
        </div>

        <section id={section.id} className="scroll-mt-28 lg:py-24 py-16">
          <div className="container">
            <div className="grid lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow={showHeading ? section.label : undefined}
                  title={section.title}
                />
                <div className="mt-7">
                  <RichParagraphs
                    className="text-base text-default-600"
                    paragraphs={section.intro}
                  />
                </div>

                {section.enquiryCta && (
                  <div className="mt-6">
                    <ArrowLink href={section.enquiryCta.href} label={section.enquiryCta.label} />
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <Wireframe label={`${section.label} — material / tooling shot`} ratio="landscape" />

                {section.callouts?.map((c) => (
                    <div key={c.title} className="border-t-2 border-primary pt-5">
                      <div className="text-sm uppercase tracking-[0.2em] text-default-500">
                        {c.title}
                      </div>
                      {/* Callout bodies carry the deck's in-prose links (the
                          CBN-vs-diamond guide, the PCD ↔ PCBN counterparts), so
                          they have to go through RichText like every other
                          copy field rather than render as literal markdown. */}
                      {Array.isArray(c.body) ? (
                        <ul className="mt-3 space-y-2">
                          {c.body.map((b, i) => (
                            <li key={i} className="flex gap-2 text-base text-default-600">
                              <Icon
                                icon="tabler:check"
                                className="mt-1 size-4 shrink-0 text-primary"
                              />
                              <span>
                                <RichText>{b}</RichText>
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-base text-default-600">
                          <RichText>{c.body}</RichText>
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {hasDetail && (
              <div className="mt-16 grid lg:grid-cols-2 gap-12">
                {section.applications?.length ? (
                  <div>
                    <h3 className="text-2xl">{section.applicationsTitle ?? "Where it's used."}</h3>
                    <ul className="mt-6 space-y-3">
                      {section.applications.map((a, i) => (
                        <li key={i} className="flex gap-2.5 text-base text-default-600">
                          <Icon icon="tabler:check" className="mt-1 size-5 shrink-0 text-primary" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    {section.applicationsNote && (
                      <p className="mt-6 text-base text-default-600">
                        <RichText>{section.applicationsNote}</RichText>
                      </p>
                    )}
                  </div>
                ) : null}

                {section.specs?.length ? (
                  <div>
                    <h3 className="mb-6 text-2xl">{section.specsTitle ?? 'Specifications'}</h3>
                    <SpecTable specs={section.specs} />
                    {section.specsNote && (
                      <p className="mt-5 text-base text-default-600">
                        <RichText>{section.specsNote}</RichText>
                      </p>
                    )}
                    {section.datasheet && (
                      <Link
                        href="/resources/datasheets"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        <Icon icon="tabler:download" className="size-5" />
                        Download the {section.datasheet} (PDF)
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
