import { BannerCTA, CardGrid, PageHero } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getProducts } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Industrial Diamond & CBN Products | Full Range | EID' },
    description:
      "Browse EID's full range of industrial diamond and CBN: natural grit and powder, metal and resin bond, CBN and PCBN, CVD, MCD, PCD, and polishing powder.",
    alternates: localeAlternates(locale, '/products'),
  }
}

export const familyIcon: Record<string, string> = {
  'Natural Diamond Grit & Powder': 'tabler:diamond',
  'Metal Bond Diamond': 'tabler:blade',
  'Resin Bond Diamond': 'tabler:stack-2',
  CBN: 'tabler:gauge',
  'Single Crystal Diamond (CVD & MCD)': 'tabler:cube',
  'Polycrystalline Diamond (CVD & PCD)': 'tabler:grid-dots',
  'Natural Tool Stones': 'tabler:mountain',
  'Polycrystalline Diamond Powder': 'tabler:bolt',
}

const ProductsOverview = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)

  // Eight groups, eight pages. The card blurb is the page's own card copy, not a
  // list of children, because there are no children: the mesh and micron splits,
  // coatings, PCBN, and PCD blanks are sections inside each page.
  const familyCards = products.map((p) => ({
    icon: familyIcon[p.family] || 'tabler:diamond',
    title: p.name,
    // The deck gives the overview page its own, longer blurb per product,
    // distinct from the shorter card used on the home page.
    desc: p.overviewDesc ?? p.cardDesc,
    href: `/products/${p.slug}`,
  }))

  return (
    <>
      <PageHero
        eyebrow="The complete range · one manufacturer"
        title="Industrial Diamond & CBN Products"
        desc="EID's full range: natural grit and powder, metal and resin bond, CBN and PCBN, CVD single crystal, MCD, PCD, and polishing powder."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
        primaryCta={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCta={{ label: 'Applications We Serve', href: '/applications' }}
      />

      <div className="container pt-20">
        <ChapterMarker index="01" label="The Range" />
      </div>
      <CardGrid
        eyebrow="The full range · one source"
        title="The complete diamond and CBN range, from one manufacturer."
        desc="From in-house processed grit and powder to custom-grown CVD single crystal, every product is quality-controlled to our specifications — a single-source quality standard across the entire range. Mesh, micron, coatings, grades, and sizing are configured within each family to match your application."
        items={familyCards}
        ctaHref="/contact"
        ctaLabel="Request a Quote"
      />

      {/* Each card names the sections it contains, so a buyer looking for a
          former standalone page (rotary diamonds, PCBN, coatings) can see which
          product page absorbed it. */}
      <div className="container">
        <ChapterMarker index="02" label="All Products" />
      </div>
      <section className="lg:py-30 py-20 pt-14">
        <div className="container">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-12">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Icon
                    icon={familyIcon[p.family] || 'tabler:diamond'}
                    className="size-7 text-primary"
                  />
                  <h3 className="text-xl group-hover:text-primary">{p.name}</h3>
                </div>
                <p className="text-base text-default-600">{p.overviewDesc ?? p.cardDesc}</p>
                {p.sections.length > 1 && (
                  <p className="text-sm text-default-500">
                    Contains: {p.sections.map((sec) => sec.label).join(' · ')}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                  View product
                  <Icon
                    icon="tabler:arrow-narrow-right"
                    className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Route the application-first buyer to a person rather than to more cards. */}
      <section className="border-y border-default-200 bg-default-50 lg:py-24 py-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Help me specify"
                title="Not sure which grade fits your process?"
              />
              <p className="mt-5 text-base text-default-600">
                Share the material you are processing, your application, and the finish you need, and
                our technical team will direct you to the right product and grade. This is what we do
                before every quote. You can also start from your{' '}
                <Link href="/applications" className="text-primary underline">
                  application
                </Link>{' '}
                or read the{' '}
                <Link href="/resources" className="text-primary underline">
                  technical guides
                </Link>{' '}
                if you are still comparing options.
              </p>
            </div>
            <div className="lg:col-span-5 flex lg:justify-end">
              <ArrowButton href="/contact" label="Talk to our technical team" />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-20">
        <BannerCTA
          eyebrow="Whatever your application"
          title="Request a quote for any product."
          desc={`One form covers all ${products.length} product families. Give us the grade, size, and quantity, and a real person replies within one business day.`}
          ctaLabel="Request a Quote or Sample"
          ctaHref="/contact"
          footnote={
            <>
              Email{' '}
              <a href={`mailto:${site.email}`} className="text-primary underline">
                {site.email}
              </a>{' '}
              · Call{' '}
              <a href={site.phoneHref} className="text-primary underline">
                {site.phone}
              </a>
            </>
          }
        />
      </div>
    </>
  )
}

export default ProductsOverview
