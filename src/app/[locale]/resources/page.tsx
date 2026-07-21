import { RichText } from '@/components/RichText'
import { BannerCTA, PageHero, Pillars } from '@/components/sections'
import { ArrowButton, ArrowLink, ChapterMarker, SectionHeading } from '@/components/ui'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
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
    title: { absolute: 'Diamond & CBN Technical Guides & Resources | EID' },
    description:
      "Technical guides on choosing superabrasives: diamond vs CBN, grit size charts, bond systems, and size distribution. Written by EID's technical team.",
    alternates: localeAlternates(locale, '/resources'),
  }
}

const guides: { title: string; desc: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Diamond vs CBN: which superabrasive for your application?',
    desc: 'Diamond is the hardest material, but it cannot grind hardened steel and CBN can. When to use each, with a material-compatibility chart and application examples.',
    links: [
      { label: 'CBN', href: '/products/cbn' },
      { label: 'Metal Bond', href: '/products/metal-bond' },
    ],
  },
  {
    title: 'Diamond grit & micron size chart (mesh-to-micron)',
    desc: 'A reference chart mapping FEPA, US mesh, and micron sizes, so you can convert between the sizing systems your specs and your suppliers use.',
    links: [
      { label: 'Natural Grit', href: '/products/natural-grit-powder#grit' },
      { label: 'Natural Micron', href: '/products/natural-grit-powder#micron' },
    ],
  },
  {
    title: 'Metal bond, resin bond, and vitrified: choosing a bond system',
    desc: 'The bond holds the diamond, and the bond you choose sets how the tool cuts, how long it lasts, and what it can work. A comparison of the three major systems.',
    links: [
      { label: 'Metal Bond', href: '/products/metal-bond' },
      { label: 'Resin Bond', href: '/products/resin-bond' },
    ],
  },
  {
    title: 'How diamond size distribution affects tool performance',
    desc: 'What D50, D10, D90, and span actually mean, and why a tight distribution changes the way your tool cuts and finishes.',
    links: [
      { label: 'Micron QC', href: '/micron-qc' },
      { label: 'Quality & QC', href: '/quality' },
    ],
  },
  {
    title: 'CVD, HPHT (MCD), and natural diamond compared',
    desc: 'Three ways to get a single crystal, and when each is the right choice for single-point and precision tooling.',
    links: [
      { label: 'CVD Single Crystal', href: '/products/single-crystal#cvd' },
      { label: 'MCD', href: '/products/single-crystal#mcd' },
      { label: 'Natural Tool Stones', href: '/products/tool-stones' },
    ],
  },
  {
    title: 'Diamond and CBN by application',
    desc: 'Which grades serve dental, semiconductor, automotive and aerospace, and tool and die, and why, with links through to the application hubs.',
    links: [{ label: 'Applications', href: '/applications' }],
  },
]

const ResourcesPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow="Written by EID's technical team"
        title="Resources & Guides"
        desc="Technical guides on choosing superabrasives: diamond vs CBN, grit size charts, bond systems, and size distribution. Written by EID's technical team."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }]}
        secondaryCta={{ label: 'Read the blog', href: '/resources/blog' }}
      />

      {/* INTRO — the research-stage entry point that feeds the product pages */}
      <section className="lg:pt-24 pt-16">
        <div className="container">
          <SectionHeading
            eyebrow="Where to start"
            title="Technical guides for choosing the right superabrasive."
          />
          <p className="mt-5 max-w-3xl text-base text-default-600">
            <RichText>
              {'Reference charts, comparisons, and application notes to help you match the diamond or CBN grade to your process, written by the people who grade and test the material. If you are still deciding between options, start here. If you already know the grade, the [product pages](/products) carry the specs.'}
            </RichText>
          </p>
        </div>
      </section>

      {/* GUIDES — blog-grid style cards */}
      <div className="container pt-20">
        <ChapterMarker index="01" label="Guides" />
      </div>
      <section className="lg:py-24 py-16">
        <div className="container">
          <SectionHeading
            eyebrow="Technical knowledge"
            title="Guides, charts, and application notes."
            align="center"
          />

          <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-12">
            {guides.map((g) => (
              <article key={g.title} className="flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-2xl border border-default-300 px-3.5 py-1.25 text-sm text-default-900">
                  Guide
                </span>
                <h3 className="text-xl">{g.title}</h3>
                <p className="text-base text-default-600">{g.desc}</p>
                <p className="text-sm text-default-500">
                  Links to:{' '}
                  {g.links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 ? ' · ' : ''}
                      <Link href={l.href} className="text-primary underline underline-offset-2">
                        {l.label}
                      </Link>
                    </span>
                  ))}
                </p>
                <div className="mt-auto pt-2">
                  <ArrowLink href="/contact" label="Read" />
                </div>
                {/* The six guides are still unwritten; the note is deliberate, so
                    nobody ships a card that promises a document that does not exist. */}
                <p className="text-sm text-default-500">
                  Guide not yet written; deck defers the six guides to a later batch.
                </p>
              </article>
            ))}

            <article className="flex flex-col justify-center gap-4 bg-default-50 p-7">
              <Icon icon="tabler:diamond" className="size-7 text-primary" />
              <h3 className="text-xl">Have a technical question?</h3>
              <p className="text-base text-default-600">
                Our team answers application and specification questions directly.
              </p>
              <div className="pt-2">
                <ArrowButton href="/contact" label="Contact us" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* THE REST OF RESOURCES — Phase 2 consolidates guides, the blog, the
          datasheets, and the SDS library under this one section. */}
      <div className="container pt-6">
        <ChapterMarker index="02" label="Downloads & Blog" />
      </div>
      <section className="pt-14">
        <Pillars
          items={[
            {
              meta: 'Blog',
              title: 'Technical comparisons & notes',
              body: 'The comparison content that earns search traffic: application notes, materials explainers, and news from the laboratory.',
              href: '/resources/blog',
              cta: 'Read the blog',
            },
            {
              meta: 'Reference',
              title: 'Datasheets',
              body: 'Technical specifications as page content with a downloadable PDF each: grades, sizes, crystal types, coatings. Ungated, no form.',
              href: '/resources/datasheets',
              cta: 'Browse datasheets',
            },
            {
              meta: 'Safety',
              title: 'MSDS',
              body: 'Safety data sheets covering handling, storage, disposal, and regulatory information. Ungated, no login.',
              href: '/resources/msds',
              cta: 'Browse MSDS',
            },
          ]}
        />
      </section>

      <BannerCTA
        eyebrow="Can't find what you need?"
        title="Have a technical question the guides don't answer?"
        desc="Tell us the material, the process, and the finish you need, and someone who works with the material will help you specify. Replies within one business day."
        ctaLabel="Contact our technical team"
        ctaHref="/contact"
      />
    </>
  )
}

export default ResourcesPage
