import { RichParagraphs, RichText } from '@/components/RichText'
import Wireframe from '@/components/Wireframe'
import { CatalogSpecs, CrossLinks, JumpNav, PageHero, ProductPhoto, SpecTable } from '@/components/sections'
import { ArrowLink } from '@/components/ui'
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
            }))
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

      {/* ── OVERVIEW ─────────────────────────────────────────────────────
          About's `TheCompany` block on the left, the product's own summary as a
          bento on the right.

          ── The rule down the left edge ─────────────────────────────────────
          A 2px brand bar with a mono kicker over the heading, and the opening
          paragraph set at 18-19px rather than at body size. That is the block
          that opens About and Quality and every application hub, and it is
          Uri's F1/F2 note applied here: the words at the top of a page are what
          a reader takes away, so they get the weight a heading would carry.

          The kicker is "The range" rather than `p.family`. The old note on this
          section is still true — the family name IS the H1, so printing it here
          would open the page by saying its own name twice. A kicker says what
          kind of block this is, not which product you are on.

          ── The facts moved onto navy ───────────────────────────────────────
          Not one figure changed: same `facts` array, same derivation from the
          catalogue, same order. What changed is the ground. On white under a
          hairline they were the quietest thing on a page whose whole job is to
          answer "what sizes, how many grades, which coatings" — the four
          questions a buyer arrives with. Every other page on this site puts its
          answer on a solid brand tile; this one now does too.

          Sticky is kept. A grade table runs long, and the summary is what a
          reader checks back against while they scroll it. */}
      <section data-note="overview" className="py-16 lg:py-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ⚠ THE RULE IS ON THE INNER DIV, NOT ON THE GRID CELL, and that
                is not tidiness. A grid cell stretches to the row's height, and
                this row's height comes from the sticky aside — photo plus the
                facts tile, which on a long product runs a couple of hundred
                pixels past the copy. With the border on the cell, the brand bar
                carried on down the page beside nothing at all. On the inner div
                it is content-height and stops where the words stop. */}
            <div className="lg:col-span-7">
              <div className="border-primary border-s-2 ps-7 lg:ps-9">
                <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'The range')}</p>
                <h2 className="text-default-900 mt-4 text-[26px] leading-tight font-bold md:text-[32px] lg:text-[38px]">{headline}</h2>

                <RichParagraphs className="text-default-700 mt-6 text-[18px] leading-relaxed lg:text-[19px]" paragraphs={bodyParas.slice(0, 1)} />
                {bodyParas.length > 1 && <RichParagraphs className="text-default-600 mt-5 text-base leading-relaxed" paragraphs={bodyParas.slice(1)} />}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="flex flex-col gap-6 lg:sticky lg:top-40">
                {leadImage?.image ? <ProductPhoto image={leadImage.image} alt={`${p.name} — EID`} /> : <Wireframe label={`Product image — ${p.name}`} />}

                <div className="rounded-card bg-primary p-6 lg:p-7">
                  <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                    <span className="bg-primary-1 size-2" />
                    <span className="text-sm text-white">{t(locale, 'At a glance')}</span>
                  </div>

                  {/* Still a `dl`, and still label/value pairs — a spec summary
                      is a description list whatever colour it sits on. Only the
                      ink and the rules changed: white/70 for the terms at 11px
                      mono tracking, which is the eyebrow scale used everywhere
                      else, and white hairlines instead of slate ones. */}
                  <dl className="mt-5 divide-y divide-white/15">
                    {facts.map((f) => (
                      <div key={f.label} className="flex items-baseline justify-between gap-6 py-3">
                        <dt className="text-[11px] tracking-[0.18em] text-white/70 uppercase">{f.label}</dt>
                        <dd className="text-right font-mono text-sm font-semibold text-white">{f.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {hasDatasheet && (
                    /* White, not `text-primary`. The same trap the two
                       resources pages document: brand navy on a brand-navy
                       panel is invisible. */
                    <Link href="/resources/datasheets" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition-colors hover:underline">
                      <Icon icon="tabler:download" className="size-5" />
                      {t(locale, 'Datasheets for this range')}
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTIONS — each keeps its H2, anchor, applications, and spec table */}
      {p.sections.map((s, i) => (
        <ProductSectionBlock key={s.id} locale={locale} slug={p.slug} productName={p.name} section={s} gray={i % 2 === 1} showHeading={isSplit} />
      ))}

      {/* ── ⚠ THE QUOTE BLOCK IS GONE FROM EVERY PAGE BUT /contact ───────
          Marc's call, applied site-wide: the eyebrow, "Request a quote or a
          sample.", the email and phone lines, and the embedded Jotform.

          It was on seven pages — this one, the application hubs, both QC pages
          and all three resources pages — which meant the site shipped the same
          cross-origin form seven times over, each instance a second full copy
          of the contact page pasted onto the foot of something else. /contact
          is the header button on every page, it is in the footer, and the
          floating WhatsApp control sits over all of it.

          Each page's own eyebrow/title/desc strings went with it. They were
          Uri's per-page wording, so if the block ever returns it returns with
          them — check this file's history rather than writing new ones. */}
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
  /* The copy-deck attribute table only renders where the catalogue has nothing
     real to show — the same rule as before, named once so the layout below can
     size its columns from it instead of re-deriving the condition twice. */
  const showSpecs = Boolean(!hasCatalog && section.specs?.length)
  const hasDetail = Boolean(section.applications?.length || showSpecs)

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
              {/* The same ruled statement the overview above opens on, and
                  About, and Quality, and every application hub — so a reader
                  moving down a five-section product page meets one kind of
                  section head rather than two.

                  It was `SectionHeading`: a bordered white eyebrow chip over an
                  h2. The chip is the right device for a section that has to
                  announce itself across a page break; it is the wrong one four
                  times down a single page, where it reads as four separate
                  pages stacked. The rule carries the same information with a
                  fraction of the weight, and `section.label` is unchanged
                  wording in the kicker slot. */}
              <div className="lg:col-span-7">
                {/* Inner div carries the rule — see the note on the overview
                    block. The column beside this one holds a photo and any
                    number of callouts, so the row height is never the copy's. */}
                <div className="border-primary border-s-2 ps-7 lg:ps-9">
                  {showHeading && <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{section.label}</p>}
                  <h2 className={`text-default-900 text-[26px] leading-tight font-bold md:text-[30px] lg:text-[34px] ${showHeading ? 'mt-4' : ''}`}>{section.title}</h2>

                  <RichParagraphs className="text-default-700 mt-6 text-[17px] leading-relaxed lg:text-[18px]" paragraphs={section.intro.slice(0, 1)} />
                  {section.intro.length > 1 && <RichParagraphs className="text-default-600 mt-4 text-base leading-relaxed" paragraphs={section.intro.slice(1)} />}

                  {section.enquiryCta && (
                    <div className="mt-7">
                      <ArrowLink href={section.enquiryCta.href} label={section.enquiryCta.label} />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 lg:col-span-5">
                {/* When the section has grade blocks, the photos live inside
those blocks (mirroring eid-ltd.com); only show a header
photo for single-image sections without a grade selector. */}
                {!cat?.series?.length && cat?.image ? <ProductPhoto image={cat.image} alt={`${section.title} — EID`} gallery={cat.imageGallery} /> : !cat ? <Wireframe label={`${section.label} — material / tooling shot`} ratio="landscape" /> : null}

                {/* Ruled on the left, like every other aside on the site,
                    rather than capped with a top border. Same 2px brand bar as
                    the section head it sits beside, so an explainer reads as a
                    quieter member of the same family instead of as a different
                    component. */}
                {section.callouts?.map((c) => (
                  <div key={c.title} className="border-primary border-s-2 ps-6">
                    <div className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{c.title}</div>
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

            {/* ── TYPICAL APPLICATIONS + SPECIFICATIONS, AS A BENTO ────────
                Two plain columns of h3-and-a-list on white before. Every word
                is unchanged; what changed is that the applications list is now
                the page's brand tile.

                That is not decoration. On a product page the applications list
                is the closest thing to an argument — it is the block that says
                "this is the work this material is for", and it was set in the
                same weight as the attribute table beside it. Every other page
                on this site puts its argument on navy. This one now does.

                7/5 when there is a spec table to sit beside it, 8 on its own so
                the tile still runs short of the full measure and the row keeps
                the asymmetry the rest of the site is built on. */}
            {hasDetail && (
              <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12">
                {section.applications?.length ? (
                  <div className={`rounded-card bg-primary p-7 lg:p-9 ${showSpecs ? 'lg:col-span-7' : 'lg:col-span-8'}`}>
                    <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
                      <span className="bg-primary-1 size-2" />
                      <span className="text-sm text-white">{section.applicationsTitle ?? t(locale, 'Typical Applications')}</span>
                    </div>

                    {/* ⚠ WHITE TICKS, NOT `primary-1` — and this is a lesson
                        the site has already learnt once. The note on
                        AboutMosaic says it plainly: primary-1 is #3d5290 and on
                        a navy ground it is barely separable from it. That note
                        was written about 11px labels; these are 20px marks and
                        they were just as invisible, measured against #2c3c6c on
                        the tile below. Contrast wins over palette on a marker
                        that has a job to do. `primary-1` is fine where it
                        already appears — the square dot inside a
                        white-bordered chip, which is decorative and framed. */}
                    <ul className="mt-6 space-y-3.5">
                      {section.applications.map((a, i) => (
                        <li key={i} className="flex gap-3 text-base leading-relaxed text-white/90">
                          <Icon icon="tabler:check" className="mt-1 size-5 shrink-0 text-white/75" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    {section.applicationsNote && (
                      <p className="mt-7 border-t border-white/15 pt-6 text-base leading-relaxed text-white/80">
                        {/* ⚠ RichText renders its links `text-primary` — brand
                            navy, invisible on a brand-navy panel. Same trap the
                            two resources pages document, overridden locally for
                            the same reason: every other consumer of RichText is
                            on white. These notes carry the deck's real in-prose
                            links, so they have to stay clickable AND visible. */}
                        <span className="[&_a]:text-white [&_a]:decoration-white/60">
                          <RichText>{section.applicationsNote}</RichText>
                        </span>
                      </p>
                    )}
                  </div>
                ) : null}

                {showSpecs ? (
                  <div className={`border-default-200 bg-default-50 rounded-card border p-7 lg:p-8 ${section.applications?.length ? 'lg:col-span-5' : 'lg:col-span-8'}`}>
                    <h3 className="text-default-900 text-xl font-bold lg:text-2xl">{section.specsTitle ?? t(locale, 'Specifications')}</h3>
                    <div className="mt-6">
                      <SpecTable specs={section.specs!} />
                    </div>
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
                <div className="mb-10 flex flex-wrap items-baseline gap-3">
                  <h3 className="text-default-900 text-2xl font-bold">{t(locale, 'Grades & specifications')}</h3>
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
