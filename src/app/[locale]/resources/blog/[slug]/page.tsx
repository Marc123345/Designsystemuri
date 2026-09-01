import Image from 'next/image'

import { RichText } from '@/components/RichText'
import { CrossLinks, PageHero } from '@/components/sections'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { getPost, posts, type Block } from '@/lib/blog'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { SITE_ORIGIN } from '@/app/sitemap'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: { absolute: post.metaTitle },
    description: post.metaDesc,
    alternates: localeAlternates(locale, `/resources/blog/${slug}`),
    /* ⚠ RESTATED, NOT INHERITED. Declaring `openGraph` in a child does not
       deep-merge with the root's — keys not named here are dropped. The
       products route learned this the hard way and left eight pages with no
       card image; the note there is worth reading before trimming this. */
    openGraph: {
      title: post.metaTitle,
      description: post.metaDesc,
      url: `/resources/blog/${slug}`,
      type: 'article',
      siteName: 'EID Ltd',
      publishedTime: post.published,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.alt }],
    },
  }
}

/**
 * One article.
 *
 * ── The measure is the design decision ──────────────────────────────────────
 *
 * The body runs in a single column capped at ~68 characters rather than across
 * the container. Everything else on this site is a two-column layout because
 * everything else is scanned; this is the one page type that is READ, start to
 * finish, and a line longer than about 75 characters loses the reader on the
 * return sweep. That is why the article is not `lg:grid-cols-12` like its
 * neighbours — it is not an inconsistency to tidy up.
 *
 * ── No prose plugin ─────────────────────────────────────────────────────────
 *
 * @tailwindcss/typography is installed and deliberately unused here. `prose`
 * would style this content with its own type scale and colours, which are not
 * this site's, and the first thing anyone would do is override half of it.
 * The block set is small enough — heading, paragraph, list, note, table — that
 * styling each one against the site's own tokens is less code than the
 * overrides would be, and it cannot drift from the rest of the site.
 */
const renderBlock = (b: Block, i: number) => {
  if ('h2' in b)
    return (
      <h2 key={i} className="text-default-900 mt-14 text-[24px] leading-snug font-bold lg:mt-16 lg:text-[28px]">
        {b.h2}
      </h2>
    )

  if ('p' in b)
    return (
      <p key={i} className="text-default-700 mt-6 text-[17px] leading-[1.75] lg:text-[18px]">
        <RichText>{b.p}</RichText>
      </p>
    )

  if ('list' in b)
    return (
      <ul key={i} className="mt-6 space-y-3">
        {b.list.map((item) => (
          <li key={item} className="text-default-700 relative ps-6 text-[17px] leading-[1.75] lg:text-[18px]">
            {/* The site's square dot rather than a disc — the same mark the
                eyebrow chips carry, at list scale. `top-[0.7em]` rather than a
                fixed pixel offset so it stays on the first line's optical
                centre at any of the sizes above. */}
            <span aria-hidden className="bg-primary absolute start-0 top-[0.7em] size-1.5" />
            <RichText>{item}</RichText>
          </li>
        ))}
      </ul>
    )

  if ('note' in b)
    return (
      /* The honest caveat, marked as an aside rather than folded into the
         argument. Same brand rule and tinted ground as the certified-scope
         block on /quality, so a reader who has seen one recognises the other. */
      <aside key={i} className="border-primary bg-default-50 rounded-card mt-10 border-s-2 p-6 lg:p-7">
        <p className="text-default-700 text-[16px] leading-relaxed">
          <RichText>{b.note}</RichText>
        </p>
      </aside>
    )

  return (
    <div key={i} className="mt-10 overflow-x-auto" tabIndex={0} role="region" aria-label={b.table.head[0] || 'Table'}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-default-300 border-b">
            {b.table.head.map((h) => (
              <th key={h} className="text-default-500 py-3 pe-6 text-sm tracking-wider uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map(([k, v]) => (
            <tr key={k} className="border-default-200 border-b align-top">
              <th scope="row" className="text-default-900 w-[34%] py-4 pe-6 text-left font-semibold">
                {k}
              </th>
              <td className="text-default-600 py-4 leading-relaxed">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ArticlePage = async ({ params }: { params: Promise<{ locale: Locale; slug: string }> }) => {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const post = getPost(slug)
  if (!post) notFound()

  const others = posts.filter((p) => p.slug !== slug).slice(0, 4)

  /* Article schema. `image` and `datePublished` are what a rich result needs;
     `author` and `publisher` are the organisation because these are house
     technical notes, not bylined columns — inventing a person to satisfy a
     schema field would be a fabricated credential. */
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDesc,
    image: `${SITE_ORIGIN}${post.image}`,
    datePublished: post.published,
    dateModified: post.published,
    author: { '@type': 'Organization', name: 'EID Ltd', url: SITE_ORIGIN },
    publisher: { '@type': 'Organization', name: 'EID Ltd', url: SITE_ORIGIN },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_ORIGIN}/resources/blog/${slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <PageHero eyebrow={`${post.category} · ${post.readMinutes} min read`} title={post.title} desc={post.dek} bgImage={post.image} variant="band" />

      <article data-note="article" className="py-16 lg:py-24">
        <div className="container">
          {/* ~68 characters. See the note above — this is the one page type on
              the site that is read rather than scanned. */}
          <div className="mx-auto max-w-[68ch]">
            {post.body.map(renderBlock)}

            <div className="border-default-200 mt-14 border-t pt-10 lg:mt-16">
              <p className="text-default-600 text-[17px] leading-relaxed">
                {t(locale, 'Tell us the material you are working and the finish you need, and we will recommend a grade.')}
              </p>
              <div className="mt-6">
                <ArrowButton href="/contact" label={t(locale, 'Request a Quote')} />
              </div>
            </div>
          </div>
        </div>
      </article>

      <CrossLinks
        groups={[
          { title: t(locale, 'More from the blog'), links: others.map((p) => ({ label: p.title, href: `/resources/blog/${p.slug}` })) },
          {
            title: t(locale, 'Quality & resources'),
            links: [
              { label: t(locale, 'Quality, QC & ISO 9001'), href: '/quality' },
              { label: t(locale, 'Datasheets'), href: '/resources/datasheets' },
              { label: t(locale, 'All articles'), href: '/resources/blog' },
            ],
          },
        ]}
      />
    </>
  )
}

export default ArticlePage
