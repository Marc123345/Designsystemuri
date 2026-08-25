import Image from 'next/image'
import PhotoCard from '@/components/PhotoCard'
import SectionBanner from '@/components/SectionBanner'
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

/**
 * ⚠ NONE OF THESE ARE PUBLISHED, AND THE PAGE HAS TO KEEP SAYING SO.
 *
 * The disclosure ("Coming soon") is not decoration and it is not a
 * placeholder to delete when the design is signed off. An earlier version of
 * this page had "Read article" on every card, all seven pointing at /contact,
 * with the caveat at the very bottom — so a reader who clicked the second card
 * met a contact form having never seen it.
 *
 * That is the constraint on everything below. These cards may look like the
 * rest of the site, but they must not offer a click: no href, no "Read", and
 * an explicit marker on each one. If posts are ever written, add `href` here
 * and remove the marker in the same commit — not before.
 *
 * ── The photographs ─────────────────────────────────────────────────────────
 *
 * Each is the subject of its post, from the existing library — nothing new was
 * added. The batch-consistency piece gets the two-lot SEM comparison, the PSD
 * piece gets the graded powder series, and so on. A category chip over a grey
 * card was the old treatment; it gave six identical objects with nothing to
 * tell them apart but their titles.
 */
const posts = [
  {
    category: 'Application Note',
    title: 'Why batch-to-batch consistency is the real cost driver in diamond tooling',
    image: '/eid/qc-batch-to-batch.jpg',
    alt: 'Side-by-side scanning electron micrographs of two production lots at the same magnification, each with a 1 micrometre scale bar',
  },
  {
    category: 'Technical',
    title: 'Reading a particle size distribution: D10, D50, D90 and span',
    image: '/eid/quality/08-micron-powder-grade-comparison.png',
    alt: 'Sixteen dishes of micron diamond powder laid out in order from finest to coarsest',
  },
  {
    category: 'Materials',
    title: 'When CBN beats diamond: a field guide for ferrous grinding',
    image: '/eid/cbn.jpg',
    alt: 'Cubic boron nitride crystals at high magnification',
  },
  {
    category: 'Industry',
    title: 'What dental bur makers actually need from a diamond supplier',
    image: '/eid/home/app-dental.jpg',
    alt: 'Diamond-coated dental burs',
  },
  {
    category: 'Process',
    title: 'Inside our QC laboratory: how a batch gets approved to ship',
    image: '/eid/qc-lab.jpg',
    alt: 'A technician at an optical measurement system in the EID quality laboratory',
  },
  {
    category: 'Materials',
    title: 'CVD vs HPHT (MCD): choosing a single-crystal route',
    image: '/eid/cvd-single-crystal.jpg',
    alt: 'A single-crystal CVD diamond plate',
  },
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
        /* Material macro rather than a room — the blog is about the grit, not the
        building. */
        bgImage="/eid/home/hero-grit.jpg"
        variant="band"
      />

      {/* ⚠ THE DISCLOSURE COMES FIRST, IN THE CUT, BEFORE ANY TITLE.
          Not at the foot of the page and not in small type under the grid.
          Every reader meets it before they meet a headline they cannot read.
          See the note on `posts`. */}
      <SectionBanner
        label={t(locale, 'Coming soon')}
        body={t(locale, 'The content hub launches with the site. These are the first pieces in preparation — none are published yet.')}
        shade={1}
      />

      {/* ── THE LEAD PIECE ─────────────────────────────────────────────────
          Was a grey box with a left border: the pre-radius language, and flat.
          It is a full-bleed frame with the type over it now, which is the rule
          everywhere else on this site — and the picture is the argument the
          piece makes, two lots of the same grade matching at 1 micrometre.

          Deliberately NOT a link and deliberately no "Read" affordance. */}
      <section data-note="lead-post" className="py-14 lg:py-20">
        <div className="container">
          <article className="rounded-card relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden p-7 lg:min-h-[440px] lg:p-10">
            <Image src={posts[0].image} alt={t(locale, posts[0].alt)} fill sizes="100vw" className="-z-20 object-cover object-center" priority />
            <span aria-hidden className="from-primary-3/95 via-primary-3/84 to-primary-3/58 absolute inset-0 -z-10 bg-linear-to-t via-55%" />

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-control inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-1.25 text-sm text-white">{t(locale, posts[0].category)}</span>
              {/* ⚠ Solid white and a heavier scrim behind it. At white/75 over this
                  frame the marker measured 2.81:1 — and of everything on this
                  page it is the one line that must be legible, because it is
                  what says the headline above it cannot be read yet. */}
              <span className="rounded-control inline-flex items-center gap-1.5 border border-white/30 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white uppercase">{t(locale, 'In preparation')}</span>
            </div>

            <h2 className="mt-5 max-w-[24ch] text-[26px] font-bold text-white md:text-[34px] lg:text-[40px]">{t(locale, posts[0].title)}</h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/85">
              {t(locale, 'Procurement optimises for price per carat. The bigger number is what an inconsistent batch costs downstream: rejected product, recalibrated lines, lost trust.')}
            </p>
          </article>
        </div>
      </section>

      {/* ── THE REST, AS PHOTOCARDS ────────────────────────────────────────
          The site's card, on the core-values span pattern — 7/5, 5/7 — so no
          two adjacent tiles share a width and the row break moves. Six items
          over three rows of that pattern.

          `href` is omitted on purpose: PhotoCard renders a plain article
          without it, so nothing here is clickable. The `note` slot carries the
          marker. */}
      <section data-note="posts" className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            {posts.slice(1).map((p, i) => (
              <PhotoCard
                key={p.title}
                className={['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-7', 'lg:col-span-5'][i]}
                minHeight="min-h-[300px] lg:min-h-[340px]"
                weight="heavy"
                eyebrow={t(locale, p.category)}
                title={t(locale, p.title)}
                note={t(locale, 'In preparation')}
                image={p.image}
                alt={t(locale, p.alt)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="pt-20">
      {/* The band that closes About, Quality and Contact, so the resources
          pages end on the site's rhythm rather than dropping straight from a
          list of links into the contact block. */}
        <QuoteSection eyebrow={t(locale, 'Have a technical question?')} title={t(locale, 'Ask our team, we may write about it.')} desc={t(locale, "Send us your application question and we'll point you to the right grade, or cover it in a future guide.")} />
      </div>
    </>
  )
}

export default BlogPage
