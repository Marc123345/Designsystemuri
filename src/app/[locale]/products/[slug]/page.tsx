import { RichParagraphs, RichText } from '@/components/RichText'
import Marquee from '@/components/Marquee'
import Wireframe from '@/components/Wireframe'
import { CatalogSpecs, CrossLinks, DarkFeatureList, JumpNav, PageHero, ProductPhoto, QuoteSection, SpecTable } from '@/components/sections'
import { ArrowLink, SectionHeading } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
import { getSectionDatasheet } from '@/lib/documents'
import { localeAlternates } from '@/lib/hreflang'
import { getApplication, getProduct, getSectionCatalog, t } from '@/lib/i18n-content'
import { products, type ProductSection } from '@/lib/products'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const p = getProduct(locale, slug)
  if (!p) return {}
  return {
    title: { absolute: p.metaTitle },
    description: p.metaDesc,
    alternates: localeAlternates(locale, `/products/${slug}`),
    // The image has to be restated. Declaring openGraph in a child does not
    // deep-merge with the root's — the keys not named here are dropped, so
    // omitting images left these eight pages with no card image at all while
    // every other route had one. Verified by re-running the metadata audit
    // over the built HTML rather than by assuming inheritance.
    openGraph: {
      title: p.metaTitle,
      description: p.metaDesc,
      url: `/products/${slug}`,
      type: 'website',
      siteName: 'EID Ltd',
      images: [{ url: '/eid/hero.png', width: 1200, height: 630, alt: `${p.name} — EID Ltd` }],
    },
    twitter: {
      title: p.metaTitle,
      description: p.metaDesc,
    },
  }
}

const ProductPage = async ({ params }: { params: Promise<{ locale: Locale; slug: string }> }) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const p = getProduct(locale, slug)
  if (!p) notFound()

  const [headline, ...bodyParas] = p.intro
  // A single-section product renders flat: no jump nav, no repeated section
  // heading chrome, because there is nothing to jump between.
  const isSplit = p.sections.length > 1

  // Every fact in the overview panel is derived from the catalogue rather than
  // written per product, so all eight pages carry the same shape of summary and
  // none of it can drift out of step with the grade data below it.
  const catalogued = p.sections.map((s) => ({ section: s, cat: getSectionCatalog(locale, p.slug, s.id) }))
  const allSeries = catalogued.flatMap(({ cat }) => cat?.series ?? [])
  const gradeCount = allSeries.reduce((n, s) => n + s.grades.length, 0)
  const spans = allSeries.map((s) => s.meshSpan).filter((m): m is [number, number] => Boolean(m))
  const micron = catalogued.map(({ cat }) => cat?.micronSizes).find((m) => m?.length)
  const coatings = catalogued.map(({ cat }) => cat?.coatings).find((c) => c?.length)
  // Lead image for the overview: the first catalogued section that has a photo.
  const leadImage = catalogued.map(({ cat }) => cat).find((c) => c?.image)

  const facts: { label: string; value: string }[] = [
    gradeCount > 0 ? { label: t(locale, 'Grades'), value: allSeries.length > 1 ? `${gradeCount} ${t(locale, 'across')} ${allSeries.length} ${t(locale, 'series')}` : `${gradeCount}` } : null,
    spans.length ? { label: t(locale, 'Mesh range'), value: `${Math.min(...spans.map((m) => m[0]))}–${Math.max(...spans.map((m) => m[1]))}` } : null,
    micron?.length ? { label: t(locale, 'Micron range'), value: `${micron[0]} ${t(locale, 'to')} ${micron[micron.length - 1]} µm` } : null,
    coatings?.length ? { label: t(locale, 'Coatings'), value: `${coatings.length} ${t(locale, 'options')}` } : null,
    { label: t(locale, 'Sections'), value: `${p.sections.length}` },
  ].filter((f): f is { label: string; value: string } => Boolean(f))

  const crossApplicationLinks = p.crossApplications
    .map((s) => getApplication(locale, s))
    .filter(Boolean)
    .map((ca) => ({ label: ca!.name, href: `/applications/${ca!.slug}` }))
  const guideLinks = (p.guides ?? []).map((g) => ({ label: g, href: '/resources/blog' }))
  const hasDatasheet = p.sections.some((s) => s.datasheet)

  // Product structured data. The layout already emits Organization for the
  // site; this is the per-product half the QA list asks for, and it is what
  // lets a search result show the range as a product rather than as a page.
  //
  // No `offers`: EID quotes per enquiry and publishes no prices, and inventing
  // an offer with no price would be describing a commercial reality that does
  // not exist. hasVariant carries the grades instead, which is the honest
  // structure — a family of graded materials rather than a priced SKU.
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.h1,
    description: p.metaDesc,
    category: p.family,
    brand: { '@type': 'Brand', name: 'EID Ltd' },
    manufacturer: { '@type': 'Organization', name: 'EID Ltd', url: 'https://www.eid-ltd.com' },
    url: `https://www.eid-ltd.com/products/${slug}`,
    ...(allSeries.length
      ? {
          hasVariant: allSeries.flatMap((s) =>
            s.grades.map((g) => ({
              '@type': 'Product',
              name: g.code,
              ...(g.desc ? { description: g.desc } : {}),
            })),
          ),
        }
      : {}),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <PageHero
        title={p.h1}
        desc={p.metaDesc}
        /* The group's own card render, so all eight product pages open on
           different material instead of the same bordered header. These are
           studio renders rather than EID's own output — fine behind a scrim
           where the job is to identify the group, and they argue nothing. */
        bgImage={productImage(p.slug)}
        variant="band"
      />

      {isSplit && <JumpNav items={p.sections.map((s) => ({ id: s.id, label: s.label }))} />}

      {/* OVERVIEW
          No eyebrow here: it used to repeat p.family, which is the H1 verbatim,
          so the page opened by saying its own name three times before it said
          anything. No CTA either — the hero carries the same one two hundred
          pixels above. The lede leads, and the panel beside it carries facts
          instead of an empty spec list. */}
      <section data-note="overview" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-default-900 max-w-3xl text-[26px] font-bold md:text-[32px] lg:text-[38px]">{headline}</h2>
              <RichParagraphs className="text-default-600 mt-7 text-base" paragraphs={bodyParas} />
            </div>

            <aside className="lg:col-span-5">
              {/* Sticky so the summary stays with the reader through a long
                  intro; top clears the fixed header and the jump nav. */}
              <div className="lg:sticky lg:top-40">
                {leadImage?.image ? <ProductPhoto image={leadImage.image} alt={`${p.name} — EID`} /> : <Wireframe label={`Product image — ${p.name}`} />}

                <dl className="border-default-200 divide-default-200 mt-7 divide-y border-t">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-6 py-3.5">
                      <dt className="text-default-500 text-xs tracking-wider uppercase">{f.label}</dt>
                      <dd className="text-default-900 text-right font-mono text-sm font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                {hasDatasheet && (
                  <Link href="/resources/datasheets" className="text-primary mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    <Icon icon="tabler:download" className="size-5" />
                    {t(locale, 'Datasheets for this range')}
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTIONS — each keeps its H2, anchor, applications, and spec table */}
      {p.sections.map((s, i) => (
        <ProductSectionBlock key={s.id} locale={locale} slug={p.slug} productName={p.name} section={s} gray={i % 2 === 1} showHeading={isSplit} />
      ))}

      {/* Between the grade detail and the closing argument. Industries lead
          and the credentials pass behind: someone this deep into a product
          page has the material, and what they are weighing is whether it is
          used in work like theirs and who stands behind it. */}
      <Marquee
        items={[
          t(locale, 'Dental'),
          t(locale, 'Semiconductor & electronics'),
          t(locale, 'Automotive & aerospace'),
          t(locale, 'Tool & die'),
          t(locale, 'Grinding & cutting'),
          t(locale, 'Polishing & lapping'),
        ]}
        secondary={[
          t(locale, 'Graded in-house'),
          t(locale, 'Coated in-house'),
          t(locale, 'ISO 9001 certified'),
          t(locale, 'Certificate of analysis per lot'),
          t(locale, 'Retention sample kept'),
        ]}
      />

      <DarkFeatureList
        bgLabel="Background image — QC laboratory"
        eyebrow={t(locale, 'Proven on every lot')}
        title={t(locale, 'Tested in our own laboratory.')}
        desc={p.quality ?? t(locale, 'Every production run is tested in our in-house QC laboratory for size distribution, crystal morphology, and strength. ISO 9001 certified. Full traceability from raw material to shipped product.')}
        ctaLabel={p.qualityCta ?? t(locale, 'See how our QC works')}
        ctaHref="/quality"
        features={[
          {
            title: t(locale, 'Particle size distribution'),
            desc: t(locale, 'Tight D50 and span, graded and verified on every batch.'),
          },
          {
            title: t(locale, 'Crystal strength & morphology'),
            desc: t(locale, 'Confirmed to perform as expected in your bond system.'),
          },
          {
            title: t(locale, 'Coating weight & coverage'),
            desc: t(locale, 'Every coated batch checked for target weight and uniformity.'),
          },
          {
            title: t(locale, 'ISO 9001 & traceability'),
            desc: t(locale, 'Certificate of analysis and retention samples on request.'),
          },
        ]}
      />

      <div className="pt-20">
        <QuoteSection eyebrow={t(locale, 'Made to your specification')} title={t(locale, 'Request a quote or a sample.')} desc={t(locale, 'Give us the grade, size, format, and application, and a real person replies within one business day.')} />
      </div>

      <CrossLinks
        groups={[
          // Vol 03 writes an explicit "On this page" group into crossLinks for
          // some products. Only synthesise one where the deck did not, or the
          // split pages would render the group twice.
          ...(isSplit && !(p.crossLinks ?? []).some((g) => g.title === 'On this page')
            ? [
                {
                  title: t(locale, 'On this page'),
                  links: p.sections.map((s) => ({
                    label: s.label,
                    href: `/products/${p.slug}#${s.id}`,
                  })),
                },
              ]
            : []),
          ...(p.crossLinks ?? []),
          { title: t(locale, 'Applications'), links: crossApplicationLinks },
          {
            title: t(locale, 'Quality & resources'),
            links: [
              { label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' },
              // Tool Stones is deliberately enquiry-led: the deck specifies no
              // datasheet for it, so we do not offer a download that has no file.
              ...(hasDatasheet ? [{ label: t(locale, 'Datasheets'), href: '/resources/datasheets' }] : []),
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

const ProductSectionBlock = ({ locale, slug, productName, section, gray, showHeading }: { locale: Locale; slug: string; productName: string; section: ProductSection; gray: boolean; showHeading: boolean }) => {
  const cat = getSectionCatalog(locale, slug, section.id)
  // EID's real PDF for this section, where one exists — the download links go
  // straight to the file rather than bouncing through the Resources index.
  const doc = getSectionDatasheet(slug, section.id)
  // The catalogue's real property table supersedes the copy deck's [confirm]
  // placeholder specs, so only fall back to the placeholder table where no
  // catalogue entry exists for this section.
  const hasCatalog = Boolean(cat)
  const hasDetail = Boolean(section.applications?.length || (!hasCatalog && section.specs?.length))

  return (
    <>
      <div className={gray ? 'bg-default-50' : ''}>
        {/* No scroll-mt here. The offset that clears the fixed header and the
            sticky JumpNav comes from html's scroll-padding-top, which JumpNav
            grows by its own measured height while it is mounted. Carrying both
            would add them together and drop the section a third of the way
            down the viewport. */}
        <section data-note="product-section" id={section.id} className="py-16 lg:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHeading eyebrow={showHeading ? section.label : undefined} title={section.title} />
                <div className="mt-7">
                  <RichParagraphs className="text-default-600 text-base" paragraphs={section.intro} />
                </div>

                {section.enquiryCta && (
                  <div className="mt-6">
                    <ArrowLink href={section.enquiryCta.href} label={section.enquiryCta.label} />
                  </div>
                )}
              </div>

              <div className="space-y-6 lg:col-span-5">
                {/* When the section has grade blocks, the photos live inside
those blocks (mirroring eid-ltd.com); only show a header
photo for single-image sections without a grade selector. */}
                {!cat?.series?.length && cat?.image ? <ProductPhoto image={cat.image} alt={`${section.title} — EID`} gallery={cat.imageGallery} /> : !cat ? <Wireframe label={`${section.label} — material / tooling shot`} ratio="landscape" /> : null}

                {section.callouts?.map((c) => (
                  <div key={c.title} className="border-primary border-t-2 pt-5">
                    <div className="text-default-500 text-sm tracking-[0.2em] uppercase">{c.title}</div>
                    {/* Callout bodies carry the deck's in-prose links (the
                          CBN-vs-diamond guide, the PCD ↔ PCBN counterparts), so
they have to go through RichText like every other
copy field rather than render as literal markdown. */}
                    {Array.isArray(c.body) ? (
                      <ul className="mt-3 space-y-2">
                        {c.body.map((b, i) => (
                          <li key={i} className="text-default-600 flex gap-2 text-base">
                            <Icon icon="tabler:check" className="text-primary mt-1 size-4 shrink-0" />
                            <span>
                              <RichText>{b}</RichText>
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-default-600 mt-3 text-base">
                        <RichText>{c.body}</RichText>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {hasDetail && (
              <div className="mt-16 grid gap-12 lg:grid-cols-2">
                {section.applications?.length ? (
                  <div>
                    <h3 className="text-2xl">{section.applicationsTitle ?? t(locale, 'Typical Applications')}</h3>
                    <ul className="mt-6 space-y-3">
                      {section.applications.map((a, i) => (
                        <li key={i} className="text-default-600 flex gap-2.5 text-base">
                          <Icon icon="tabler:check" className="text-primary mt-1 size-5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                    {section.applicationsNote && (
                      <p className="text-default-600 mt-6 text-base">
                        <RichText>{section.applicationsNote}</RichText>
                      </p>
                    )}
                  </div>
                ) : null}

                {!hasCatalog && section.specs?.length ? (
                  <div>
                    <h3 className="mb-6 text-2xl">{section.specsTitle ?? t(locale, 'Specifications')}</h3>
                    <SpecTable specs={section.specs} />
                    {section.specsNote && (
                      <p className="text-default-600 mt-5 text-base">
                        <RichText>{section.specsNote}</RichText>
                      </p>
                    )}
                    {section.datasheet && (
                      <a href={doc?.file ?? '/resources/datasheets'} download={doc ? '' : undefined} className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                        <Icon icon="tabler:download" className="size-5" />
                        {t(locale, 'Download the')} {section.datasheet} {t(locale, '(PDF)')}
                      </a>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {/* Real grade / size / coating / property data from eid-ltd.com */}
            {cat && (
              <div className="border-default-200 mt-16 border-t pt-14">
                <div className="mb-10 flex items-baseline gap-3">
                  <h3 className="text-2xl">{t(locale, 'Grades & specifications')}</h3>
                  {section.datasheet && (
                    <a href={doc?.file ?? '/resources/datasheets'} download={doc ? '' : undefined} className="text-primary inline-flex items-center gap-1.5 text-sm font-semibold">
                      <Icon icon="tabler:download" className="size-4" />
                      {section.datasheet}
                    </a>
                  )}
                </div>
                <CatalogSpecs cat={cat} sectionTitle={section.label} productName={productName} />
                {section.specsNote && (
                  <p className="text-default-600 mt-8 text-sm">
                    <RichText>{section.specsNote}</RichText>
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
