import PhotoCard from '@/components/PhotoCard'
import { Link } from '@/i18n/navigation'
import { posts } from '@/lib/blog'
import { PageHero } from '@/components/sections'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Blog | Industrial Diamond & Superabrasive Insights | EID Ltd' },
    description: 'News, application notes, and technical insight on industrial diamond and CBN from EID Ltd, London-based superabrasive manufacturer.',
    alternates: localeAlternates(locale, '/resources/blog'),
  }
}

/**
 * ⚠ THE "IN PREPARATION" MARKERS ARE GONE BECAUSE THE POSTS EXIST NOW.
 *
 * The rule this file carried was: these cards must not offer a click while
 * there is nothing behind them — no href, no "Read", an explicit marker on
 * each one, and if posts are ever written, add `href` and remove the marker
 * IN THE SAME COMMIT. That is what happened. All six are written, they live in
 * lib/blog.ts, and every card now points at a real article.
 *
 * The rule itself has not been repealed. Anything added to `posts` without a
 * body is a card promising a page that does not exist, which is the failure
 * the note was written about — an earlier version of this page had "Read
 * article" on seven cards all pointing at /contact.
 *
 * ── The photographs ─────────────────────────────────────────────────────────
 *
 * Each is the subject of its post, from the existing library — nothing new was
 * added. The batch-consistency piece gets the two-lot SEM comparison, the PSD
 * piece gets the graded powder series, and so on. A category chip over a grey
 * card was the old treatment; it gave six identical objects with nothing to
 * tell them apart but their titles.
 */

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

      {/* ── ⚠ THE BLUE CUT UNDER THE HERO IS GONE ────────────────────────
          Marc's call, and the same one already applied to the application
          hubs: a PageHero carries an eyebrow, an h1 and a lede, so a
          full-bleed band immediately under it saying the same thing in
          eleven-pixel mono was the page introducing itself twice before it
          said anything.

          The four cuts on the home page are a different thing and are still
          there — they sit BETWEEN sections of equal weight, which is the beat
          Uri's V1 note asks for ("a very, very thin banner with a bit of
          wording, prepping for the products — and then the products"). These
          three sat under a hero, which is not that. */}
      {/* ── THE LEAD PIECE ─────────────────────────────────────────────────
          Was a grey box with a left border: the pre-radius language, and flat.
          It is a full-bleed frame with the type over it now, which is the rule
          everywhere else on this site — and the picture is the argument the
          piece makes, two lots of the same grade matching at 1 micrometre.

          Deliberately NOT a link and deliberately no "Read" affordance. */}
      <section data-note="lead-post" className="py-14 lg:py-20">
        <div className="container">
          {/* A link now. `group` drives the same slow image scale every other
              photographic card on the site uses on hover. */}
          <Link href={`/resources/blog/${posts[0].slug}`} className="group focus-visible:outline-primary rounded-card relative isolate flex min-h-[380px] flex-col justify-end overflow-hidden p-7 focus-visible:outline-2 focus-visible:outline-offset-2 lg:min-h-[440px] lg:p-10">
            <Image src={posts[0].image} alt={t(locale, posts[0].alt)} fill sizes="100vw" className="-z-20 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]" priority />
            <span aria-hidden className="from-primary-3/95 via-primary-3/84 to-primary-3/58 absolute inset-0 -z-10 bg-linear-to-t via-55%" />

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-control inline-flex items-center gap-1.5 border border-white/25 px-3.5 py-1.25 text-sm text-white">{t(locale, posts[0].category)}</span>
              <span className="rounded-control inline-flex items-center gap-1.5 border border-white/30 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white uppercase">
                {posts[0].readMinutes} {t(locale, 'min read')}
              </span>
            </div>

            <h2 className="mt-5 max-w-[24ch] text-[26px] font-bold text-white md:text-[34px] lg:text-[40px]">{t(locale, posts[0].title)}</h2>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/85">{t(locale, posts[0].dek)}</p>

            <span aria-hidden className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-white">
              {t(locale, 'Read the article')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* ── THE REST, AS PHOTOCARDS ────────────────────────────────────────
          The site's card, on the core-values span pattern — 7/5, 5/7 — so no
          two adjacent tiles share a width and the row break moves. Six items
          over three rows of that pattern.

          `href` is set now that the articles exist — PhotoCard renders a plain
          article without one, which is what held this page back. The `note`
          slot carries the read time where it used to carry the marker. */}
      <section data-note="posts" className="pb-16 lg:pb-24">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-12">
            {posts.slice(1).map((p, i) => (
              <PhotoCard
                key={p.title}
                className={['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-7', 'lg:col-span-5'][i]}
                minHeight="min-h-[300px] lg:min-h-[340px]"
                weight="heavy"
                href={`/resources/blog/${p.slug}`}
                eyebrow={t(locale, p.category)}
                title={t(locale, p.title)}
                note={`${p.readMinutes} ${t(locale, 'min read')}`}
                image={p.image}
                alt={t(locale, p.alt)}
              />
            ))}
          </div>
        </div>
      </section>

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
    </>
  )
}

export default BlogPage
