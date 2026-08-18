'use client'

import GradeSelector from '@/components/GradeSelector'
import { RichText } from '@/components/RichText'
import Wireframe from '@/components/Wireframe'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import type { SectionCatalog } from '@/lib/product-catalog'
import { SHOW_PHOTOS, getProductImage } from '@/lib/product-images'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import QuoteForm from './QuoteForm'
import { ArrowButton, ArrowLink, SectionHeading } from './ui'

export type Card = {
  icon: string
  title: string
  desc: string
  href: string
}

/**
 * Interior page hero. Every page below home opens with the same block —
 * breadcrumb, eyebrow, H1, lede — so depth in the site is always legible.
 */
export const PageHero = ({ eyebrow, title, desc, crumbs, primaryCta, secondaryCta }: { eyebrow?: string; title: string; desc?: string; crumbs: { label: string; href?: string }[]; primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string } }) => (
  <section data-note="page-hero" className="border-default-200 relative overflow-hidden border-b pt-35 pb-14 lg:pt-50 lg:pb-20">
    <div className="relative z-10 container">
      <nav aria-label="Breadcrumb">
        <ol className="text-default-500 flex flex-wrap items-center gap-2 text-sm">
          {crumbs.map((crumb, i) => (
            <li key={crumb.label} className="flex items-center gap-2">
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-primary">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-default-900">{crumb.label}</span>
              )}
              {i < crumbs.length - 1 && <Icon icon="tabler:chevron-right" className="size-4" />}
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-7 grid items-end gap-10 xl:grid-cols-4 xl:gap-20">
        <div className="xl:col-span-3">
          {eyebrow && (
            <div className="border-default-300 mb-4 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
              <span className="bg-primary size-2"></span>
              <span className="text-default-900 text-sm">{eyebrow}</span>
            </div>
          )}
          <h1 className="text-[34px] font-bold md:text-[48px] lg:text-6xl">{title}</h1>
        </div>

        <div>
          {desc && <p className="mb-7.5 text-base">{desc}</p>}
          <div className="flex flex-wrap gap-4">
            {primaryCta && <ArrowButton href={primaryCta.href} label={primaryCta.label} />}
            {secondaryCta && <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />}
          </div>
        </div>
      </div>
    </div>

    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-4"></div>
  </section>
)

/**
 * The image tile used by every product and application card on the site — the
 * home grids, the /applications grid, and the carousels on the application and
 * about pages. Defined once and shared, because "the same card everywhere" is
 * a promise that breaks the moment there are two copies of it.
 *
 * `size` maps to how wide the cell is: `lg` for a 3-across cell or a carousel
 * slide (~427px, so a square lands ~427 tall), `sm` for a 4-across cell
 * (~320px, so 4:5 lands ~400 tall). Both end up roughly the same height, which
 * is what makes the grids read as one system.
 *
 * Two things this has to get right, because a hover-only card gets them wrong
 * by default: the reveal is bound to focus-visible as well as hover so it is
 * reachable by keyboard, and below `lg` — where there is no hover at all — the
 * copy is simply always visible, since a touch user would otherwise be handed a
 * grid of unlabelled boxes. The text stays in the DOM throughout, translated and
 * faded rather than `hidden`, so crawlers and screen readers still read it.
 */
export const ImageCard = ({ item, size = 'sm', className = '' }: { item: Card; size?: 'sm' | 'lg'; className?: string }) => {
  const locale = useLocale() as Locale
  const large = size === 'lg'

  return (
    <Link href={item.href} className={`group border-default-200 focus-visible:outline-primary relative flex flex-col justify-end overflow-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 ${large ? 'aspect-square' : 'aspect-[4/5]'} ${className}`}>
      {/* The slot the real photograph will occupy. */}
      <Wireframe label={item.title} ratio="portrait" className="absolute inset-0 !aspect-auto size-full !border-0" />

      {/* Scrim. Always present below lg so the copy on top of it stays legible;
          on lg it fades in with the reveal. */}
      <div className="from-default-950 via-default-950/80 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100" />

      <div className={`relative ${large ? 'p-9' : 'p-7'}`}>
        <Icon icon={item.icon} className={`mb-4 text-white/70 transition duration-500 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100 ${large ? 'size-11' : 'size-9'}`} />
        <h3 className={`text-white transition duration-500 lg:translate-y-3 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0 ${large ? 'text-2xl' : 'text-xl'}`}>{item.title}</h3>
        <p className={`mt-3 text-white/75 transition duration-500 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100 ${large ? 'text-lg' : 'text-base'}`}>{item.desc}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition duration-500 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
          {t(locale, 'Learn more')}
          <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

/**
 * The workhorse grid: product groups on home and /products, application hubs on
 * home and /applications. Borderless cards separated by rules rather than boxes,
 * so a long list of eight or more reads as a catalogue and not as clutter.
 */
export const CardGrid = ({
  eyebrow,
  title,
  desc,
  items,
  ctaHref,
  ctaLabel,
  columns = 4,
  ctaCard = false,
  variant = 'text',
  note,
}: {
  note?: string
  eyebrow?: string
  title: string
  desc?: string
  items: Card[]
  ctaHref?: string
  ctaLabel?: string
  /**
   * `image` turns each card into a full-bleed image tile whose copy is hidden
   * until hover. The text stays in the DOM (translated and faded, never
   * `hidden`) so it is still read by crawlers and screen readers.
   *
   * Two things this has to get right, because a hover-only card gets them wrong
   * by default: the reveal is bound to focus-visible as well as hover, so it is
   * reachable by keyboard; and below `lg` — where there is no hover at all — the
   * copy is simply always visible, since a touch user would otherwise be handed
   * a grid of unlabelled boxes.
   */
  variant?: 'text' | 'image'
  /**
   * Only 4 or 3. Three-across gets the larger card treatment — more padding, a
   * bigger icon and a step up in type — because the wider column has room for
   * it and it gives the group more weight on the page.
   */
  columns?: 4 | 3
  /**
   * Renders the CTA as the final cell of the grid instead of a button beneath it.
   *
   * This exists because 3-across only divides cleanly into multiples of three.
   * Eight product groups leave one empty cell, and since the cards draw their own
   * right and bottom borders, an empty cell shows as an unclosed corner. The CTA
   * tile fills exactly the leftover cells at each breakpoint, so the grid closes
   * — and the action ends up inside the grid, which reads better than a button
   * floating below it.
   *
   * Leave this off where the item count already divides evenly (the six
   * application hubs), or the tile would add a whole redundant row.
   */
  ctaCard?: boolean
}) => {
  const locale = useLocale() as Locale

  // Cells left over on the final row, per breakpoint. A remainder of 0 means the
  // items already close the row, so the tile takes a full row of its own.
  const span = (cols: number) => cols - (items.length % cols) || cols
  const lgSpanClass = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' }[span(columns)]
  const mdSpanClass = span(2) === 2 ? 'md:col-span-2' : 'md:col-span-1'
  const showCtaCard = ctaCard && ctaHref && ctaLabel

  return (
    <section data-note={note} className="py-20 lg:py-30">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

        <div className={`border-default-200 mt-14 grid grid-cols-1 border-s border-t md:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
          {items.map((item) =>
            variant === 'image' ? (
              <ImageCard key={item.href} item={item} size={columns === 3 ? 'lg' : 'sm'} className="border-e border-b" />
            ) : (
              <Link key={item.href} href={item.href} className={`group border-default-200 hover:bg-default-50 flex flex-col border-e border-b transition-colors ${columns === 3 ? 'gap-5 p-10' : 'gap-4 p-8'}`}>
                <Icon icon={item.icon} className={`text-primary ${columns === 3 ? 'size-11' : 'size-9'}`} />
                <h3 className={`group-hover:text-primary ${columns === 3 ? 'text-2xl' : 'text-xl'}`}>{item.title}</h3>
                <p className={`text-default-600 ${columns === 3 ? 'text-lg' : 'text-base'}`}>{item.desc}</p>
                <span className="text-primary mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold">
                  {t(locale, 'Learn more')}
                  <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            )
          )}

          {showCtaCard && (
            <Link href={ctaHref} className={`group bg-default-900 border-default-900 hover:bg-primary flex flex-col justify-end border-e border-b transition-colors ${mdSpanClass} ${lgSpanClass} ${columns === 3 ? 'gap-5 p-10' : 'gap-4 p-8'}`}>
              <Icon icon="tabler:arrow-narrow-right" className={`text-white/40 transition-transform duration-300 group-hover:translate-x-2 ${columns === 3 ? 'size-11' : 'size-9'}`} />
              <h3 className={`text-white ${columns === 3 ? 'text-2xl' : 'text-xl'}`}>{ctaLabel}</h3>
            </Link>
          )}
        </div>

        {ctaHref && ctaLabel && !showCtaCard && (
          <div className="mt-12">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="dark" />
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * The template's signature medallion row — full-bleed circles that butt against
 * each other, alternating light, dark and image. Used once per page at most:
 * it is the loudest thing in the system and stops reading as special if repeated.
 *
 * Any medallion with `image: true` renders a wireframe circle, since EID has
 * supplied no photography yet.
 */
export const StatMedallions = ({ items }: { items: { value?: string; label?: string; body?: string; tone?: 'light' | 'dark'; image?: boolean }[] }) => {
  const locale = useLocale() as Locale
  return (
    <section className="bg-default-100 relative size-full overflow-hidden py-20 lg:py-30">
      <div className="relative z-10 container">
        <div className="flex flex-wrap justify-center">
          {items.map((item, i) => {
            if (item.image) {
              return (
                <div key={i} role="img" aria-label="Placeholder image: production floor" className="border-default-300 bg-default-50 relative flex size-72 items-center justify-center overflow-hidden rounded-full border border-dashed lg:size-112">
                  <svg className="text-default-200 absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <span className="text-default-500 relative bg-white/90 px-3 py-2 text-center text-xs tracking-[0.15em] uppercase">{t(locale, 'Production floor — London')}</span>
                </div>
              )
            }

            const dark = item.tone === 'dark'
            return (
              <div key={i} className={`flex size-72 flex-col items-center justify-center overflow-hidden rounded-full p-10 text-center lg:size-112 ${dark ? 'bg-default-950' : 'border-default-300 border bg-white'}`}>
                {/* leading-none: the theme's 1.3em line-height leaves the numeral
glyph taller than its line box, so the label collides with it. */}
                <div className={`text-[28px] leading-none font-bold md:text-[34px] lg:text-[58px] ${dark ? 'text-white' : 'text-default-900'}`}>{item.value}</div>
                {item.label && <div className={`mt-3 text-sm leading-none tracking-[0.2em] uppercase ${dark ? 'text-primary-1' : 'text-primary'}`}>{item.label}</div>}
                {item.body && <p className={`mt-5 w-57 text-base lg:w-75 ${dark ? 'text-default-300' : 'text-default-600'}`}>{item.body}</p>}
              </div>
            )
          })}
        </div>
      </div>

      {/* The template's dashed column grid + film-grain wash. */}
      <div className="absolute inset-0 flex items-stretch justify-between gap-0 md:justify-center md:gap-45 lg:gap-75 xl:gap-80.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        ))}
      </div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-4"></div>
    </section>
  )
}

/**
 * Verified figures, set as a rule-separated band. Values are strings so a mixed
 * row ("50+", "100%", "ISO 9001") stays honest rather than being forced into a
 * number format that would need a unit invented for it.
 */
export const StatsBar = ({ items }: { items: { value: string; label: string }[] }) => (
  <section className="border-default-200 border-y">
    <div className="container">
      <div className="divide-default-200 grid grid-cols-1 divide-x divide-y md:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="px-8 py-10">
            <div className="text-default-900 text-4xl font-bold">{item.value}</div>
            <div className="text-default-500 mt-2 text-sm">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/**
 * Trust bar: proof points as icon plus label, evenly spaced, no sentences.
 * Deliberately terse — it sits directly under the hero, where a buyer is
 * scanning for credentials rather than reading.
 */
export const TrustBar = ({ items }: { items: string[] }) => (
  <section data-note="trust-bar" className="border-default-200 bg-default-50 border-y">
    <div className="container">
      <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <Icon icon="tabler:circle-check" className="text-primary size-5 shrink-0" />
            <span className="text-default-900 text-base font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

/** Four verified proof points, directly under the hero. */
export const FeaturesRow = ({ items }: { items: { title: string; desc: string; href: string }[] }) => (
  <section className="border-default-200 bg-default-50 border-y">
    <div className="container">
      <div className="divide-default-200 grid grid-cols-1 divide-x divide-y md:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="group flex flex-col gap-3 p-8">
            <h3 className="group-hover:text-primary text-lg">{item.title}</h3>
            <p className="text-default-600 text-base">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

/** The three-pillar positioning block. */
export const Pillars = ({ items }: { items: { meta: string; title: string; body: string; href: string; cta: string }[] }) => (
  <section className="pb-20 lg:pb-30">
    <div className="container">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {items.map((pillar) => (
          <div key={pillar.title} className="border-primary flex flex-col gap-4 border-t-2 pt-7">
            <div className="text-default-500 text-sm tracking-[0.2em] uppercase">{pillar.meta}</div>
            <h3 className="text-2xl">{pillar.title}</h3>
            <p className="text-default-600 text-base">{pillar.body}</p>
            <div className="mt-auto pt-3">
              <ArrowLink href={pillar.href} label={pillar.cta} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/** Dark QC block — the differentiator, given its own full-bleed section. */
export const DarkFeatureList = ({
  eyebrow,
  title,
  desc,
  features,
  ctaLabel,
  ctaHref,
  bgLabel = 'Background image — QC laboratory',
}: {
  eyebrow: string
  title: string
  desc: string
  features: { title: string; desc: string }[]
  ctaLabel: string
  ctaHref: string
  /** Names the photograph this slot is waiting on. */
  bgLabel?: string
}) => {
  const locale = useLocale() as Locale
  return (
    <section data-note="qc" className="relative size-full overflow-hidden py-20 text-white lg:py-37.5">
      {/* Full-bleed background image slot. The template runs a photograph here.
        Until EID supplies one this renders as a wireframe — dashed frame,
diagonals and a centred label — over a dark base that keeps the glass
card legible. Replace the whole block with a single <Image fill /> when
the photography lands. */}
      <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br"></div>

      <div role="img" aria-label={`Placeholder image: ${bgLabel}`} className="absolute inset-4 border border-dashed border-white/20">
        <svg className="absolute inset-0 size-full text-white/10" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
          <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="absolute inset-x-0 bottom-6 flex justify-center lg:bottom-10">
          <span className="bg-default-950/70 border border-white/15 px-3 py-2 text-center text-[11px] tracking-[0.15em] text-white/50 uppercase">{t(locale, bgLabel)}</span>
        </div>
      </div>

      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6"></div>

      <div className="relative z-10 container">
        {/* The glass card: a translucent panel over the backdrop rather than a
two-column split, so the claim reads as one block. */}
        <div className="bg-default-900/50 max-w-2xl border border-white/10 p-6 [backdrop-filter:blur(5px)] md:p-7.5 lg:p-12.5">
          <div className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.25">
            <span className="bg-primary-1 size-2"></span>
            <span className="text-sm text-white">{eyebrow}</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white md:text-[28px] lg:text-[32px]">{title}</h2>
          <p className="text-default-200 mt-5">{desc}</p>

          {/* Progressive disclosure: the four proof points read as a list of
titles, each expanding to its detail on demand. Native
            <details>/<summary> like the FAQ — server-rendered, no JS, and the
plus rotates to a cross on open. First item open so it never reads
as an empty list. */}
          <div className="mt-7.5 divide-y divide-white/10 border-y border-white/10">
            {features.map((feature, i) => (
              <details key={feature.title} open={i === 0} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                  <Icon icon="tabler:check" className="text-primary-1 size-5 shrink-0" />
                  <h3 className="flex-1 text-base text-white">{feature.title}</h3>
                  <Icon icon="tabler:plus" className="size-4 shrink-0 text-white/60 transition-transform duration-500 group-open:rotate-45" />
                </summary>
                <p className="text-default-300 mt-2 ps-8 text-base">{feature.desc}</p>
              </details>
            ))}
          </div>

          <div className="mt-9">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="primary" />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Accordion Q&A, built on native <details>/<summary> rather than the template's
 * JS accordion. Same look and the same plus-to-cross rotation, but the answers
 * are in the server-rendered HTML and expand without JavaScript — which is the
 * point of this block, since it is written for crawlers and AI answer engines
 * as much as for readers. FAQPage JSON-LD sits alongside it on the page.
 *
 * The first item is open by default so the block never reads as an empty list.
 */
/**
 * Nine questions is a long list, and it used to render as nine bordered, filled
 * boxes stacked down the full page width — the wall this grid already rejected
 * everywhere else. CardGrid's rule applies here unchanged: rules, not boxes, so
 * a long list reads as a catalogue rather than as clutter.
 *
 * Two columns from lg, with the heading pinned. A single column meant the title
 * scrolled away five questions in, leaving the reader in an unlabelled stack of
 * accordions, and it stretched every question to the full container width.
 *
 * Still `<details>`: it opens without JavaScript, is keyboard-operable and
 * announces its own expanded state, none of which a div-and-state accordion
 * gets for free.
 */
export const Faq = ({ eyebrow, title, desc, items }: { eyebrow: string; title: string; desc?: string; items: { q: string; a: string }[] }) => (
  <section data-note="faq" className="py-20 lg:py-30">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
        </div>

        <div className="border-default-200 divide-default-200 divide-y border-t lg:col-span-8">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <div className="flex items-start gap-5">
                  {/* default-500, not 400: on white, slate-400 is 2.56:1 and
                      fails 1.4.3 outright. slate-500 is 4.76:1. */}
                  <span className="text-default-500 group-open:text-primary mt-1 text-sm font-semibold tabular-nums transition-colors">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="group-hover:text-primary group-open:text-primary text-lg transition-colors">{item.q}</h3>
                </div>

                {/* Square, like every other control in the system — this badge
                    was the one rounded-full element on the page. */}
                <span className="border-default-300 text-default-600 group-open:border-primary group-open:bg-primary flex size-8 shrink-0 items-center justify-center border transition-colors group-open:text-white">
                  <Icon icon="tabler:plus" className="size-4 transition-transform duration-500 group-open:rotate-45" />
                </span>
              </summary>

              <p className="text-default-600 ps-10 pb-7 text-base">
                <RichText>{item.a}</RichText>
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  </section>
)

/**
 * The cross-axis matrix, rendered. Products link to the applications they serve,
 * to sibling sections, and to quality/resources — this is the internal-link map
 * that used to be carried by separate URLs.
 */
export const CrossLinks = ({ groups }: { groups: { title: string; links: { label: string; href: string }[] }[] }) => {
  const populated = groups.filter((g) => g.links.length > 0)
  if (!populated.length) return null

  return (
    <section data-note="cross-links" className="border-default-200 border-t py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {populated.map((group) => (
            <div key={group.title}>
              <h3 className="text-default-500 mb-5 text-sm tracking-[0.2em] uppercase">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-default-700 hover:text-primary text-base">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-default-700 hover:text-primary text-base">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Two-column attribute table used by every product spec block. */
export const SpecTable = ({ specs }: { specs: { label: string; value: string }[] }) => {
  const locale = useLocale() as Locale
  return (
    // tabIndex and role make the scroll region reachable by keyboard. Chrome
    // focuses an overflowing container on its own; Firefox and Safari do not,
    // so without this a keyboard user cannot scroll to the columns that sit
    // off-screen at narrow widths (WCAG 2.1.1).
    <div className="overflow-x-auto" tabIndex={0} role="region" aria-label={t(locale, 'Specifications')}>
      <table className="w-full border-collapse text-base">
        <thead>
          <tr className="border-default-300 border-b">
            <th className="text-default-500 py-3 pe-4 text-start text-sm tracking-wider uppercase">{t(locale, 'Attribute')}</th>
            <th className="text-default-500 py-3 text-start text-sm tracking-wider uppercase">{t(locale, 'Detail')}</th>
          </tr>
        </thead>
        <tbody>
          {specs.map((spec) => (
            <tr key={spec.label} className="border-default-200 border-b align-top">
              <td className="text-default-900 py-3 pe-4 font-semibold">{spec.label}</td>
              <td className="text-default-600 py-3">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------------- */
/* Real catalogue layout — product photo, grade cards, size chips, coatings.  */
/* Driven by src/lib/product-catalog.ts (data scraped from eid-ltd.com).      */
/* ------------------------------------------------------------------------- */

const Chip = ({ children }: { children: React.ReactNode }) => <span className="border-default-200 bg-default-50 text-default-700 inline-flex items-center border px-2.5 py-1 text-sm">{children}</span>

/**
 * Product image slot, backed by EID's own catalogue photography (the microscope
 * grade shots and product stills from eid-ltd.com, registered in
 * product-images.ts). Slots with no photo on record still fall back to the
 * labelled wireframe, so a missing asset stays visible rather than silently
 * shipping the wrong picture.
 */
export const ProductPhoto = ({ image, alt }: { image: string; alt: string; gallery?: string[] }) => {
  const src = getProductImage(image)
  // Held on the wireframe while the product imagery is reconsidered; the switch
  // for the whole products area is SHOW_PHOTOS in product-images.ts.
  if (!SHOW_PHOTOS || !src) return <Wireframe label={alt} ratio="landscape" />
  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" placeholder="blur" />
    </div>
  )
}

/** The full grade / size / coating / property block for a catalogued section. */
export const CatalogSpecs = ({ cat, sectionTitle, productName }: { cat: SectionCatalog; sectionTitle: string; productName: string }) => {
  const locale = useLocale() as Locale
  return (
    <div className="space-y-14">
      {/* One panel per section holding every series, rather than one panel per
          series: two near-identical dark cards stacked a viewport apart read as
          two different controls when they are the same control twice. */}
      {cat.series?.length ? <GradeSelector series={cat.series} fallbackImage={cat.image} sectionTitle={sectionTitle} productName={productName} /> : null}

      {cat.meshSizes?.length ? (
        <div>
          <h4 className="text-default-500 text-sm tracking-wider uppercase">{t(locale, 'Available mesh sizes')}</h4>
          <div className="mt-4 space-y-4">
            {cat.meshSizes.map((g) => (
              <div key={g.label}>
                <div className="text-default-700 text-sm font-medium">{g.label}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {g.sizes.map((s, i) => (
                    <Chip key={s + i}>{s}</Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {cat.micronSizes?.length ? (
        <div>
          <h4 className="text-default-500 text-sm tracking-wider uppercase">
            {t(locale, 'Micron size ranges')} <span className="text-default-500 normal-case">(µm)</span>
          </h4>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {cat.micronSizes.map((s, i) => (
              <Chip key={s + i}>{s}</Chip>
            ))}
          </div>
          {cat.micronNote && <p className="text-default-600 mt-4 max-w-3xl text-sm">{cat.micronNote}</p>}
        </div>
      ) : null}

      {/* The Properties attribute table is deliberately not rendered: it repeated
what the grade descriptions and size lists already say. Coating options
stay — they are a real ordering choice, not a restatement. */}
      {cat.coatings?.length ? (
        <div>
          <h4 className="text-default-500 mb-4 text-sm tracking-wider uppercase">{t(locale, 'Coating options')}</h4>
          <div className="flex flex-wrap gap-1.5">
            {cat.coatings.map((c, i) => (
              <Chip key={c + i}>{c}</Chip>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

/**
 * Dark catalogue cards with a divided attribute list — the template's product
 * card, carrying EID's real data: what each page contains, and which
 * applications it serves. The image slot is a wireframe until EID supplies
 * product photography.
 */
export const SpecCards = ({
  items,
}: {
  items: {
    title: string
    desc: string
    href: string
    rows: { label: string; value: string }[]
  }[]
}) => {
  const locale = useLocale() as Locale
  return (
    <section className="bg-default-100 relative size-full overflow-hidden py-20 lg:py-30">
      <div className="relative z-10 container">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="group border-default-700 bg-default-950 hover:border-primary-1 flex flex-col border px-5 py-7.5 transition-colors">
              <h3 className="group-hover:text-primary-1 mb-5 text-2xl text-white">{item.title}</h3>

              <div className="mb-7.5 aspect-[4/3] w-full overflow-hidden border border-dashed border-white/15 bg-white/5">
                <div className="flex size-full items-center justify-center p-4">
                  <span className="text-center text-xs tracking-[0.15em] text-white/40 uppercase">
                    {item.title} {t(locale, '— product shot')}
                  </span>
                </div>
              </div>

              <p className="text-default-400 mb-7.5 text-base">{item.desc}</p>

              <div className="divide-default-700 mt-auto divide-y">
                {item.rows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 py-4">
                    <div className="text-default-400 text-sm">{row.label}</div>
                    <div className="text-end text-sm text-white">{row.value}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex items-stretch justify-between gap-0 md:justify-center md:gap-45 lg:gap-75 xl:gap-80.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="border-default-900 h-full w-0.5 border border-dashed opacity-7"></div>
        ))}
      </div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-4"></div>
    </section>
  )
}

/** On-page anchor nav for the merged product pages. */
/**
 * Sticky section nav with scrollspy. On a long product page this keeps the
 * section anchors pinned through the vertical (F-pattern) scan and marks the
 * section currently in view (Nielsen: visibility of system status, recognition
 * over recall). Sticks below the fixed header (top-0, ~84px) and reuses the
 * header's own translucent-blur treatment so the two bars read as one system.
 */
export const JumpNav = ({ items }: { items: { id: string; label: string }[] }) => {
  const locale = useLocale() as Locale
  const [active, setActive] = useState(items[0]?.id ?? '')
  const navRef = useRef<HTMLElement>(null)

  // This bar sticks below the fixed header, so on the pages that carry it there
  // are two layers of chrome for an anchor or a focused element to land behind.
  // The base offset in _general.css only accounts for the header, so JumpNav
  // adds its own measured height to it while mounted and puts it back on the
  // way out. Measured rather than hardcoded: the bar wraps to two rows on
  // narrow screens and on the products with the most sections.
  useEffect(() => {
    const root = document.documentElement
    const base = window.matchMedia('(min-width: 1024px)').matches ? 112 : 92

    const apply = () => {
      const h = navRef.current?.offsetHeight ?? 0
      root.style.setProperty('--eid-scroll-offset', `${base + h}px`)
    }

    apply()
    const ro = new ResizeObserver(apply)
    if (navRef.current) ro.observe(navRef.current)
    window.addEventListener('resize', apply)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', apply)
      root.style.removeProperty('--eid-scroll-offset')
    }
  }, [])

  useEffect(() => {
    const sections = items.map((it) => document.getElementById(it.id)).filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const io = new IntersectionObserver(
      (entries) => {
        // The section whose top is highest within the detection band wins, so
        // the active pill tracks the one currently under the sticky nav.
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Detection band: a thin strip just below the header + this nav, down to
      // 30% of the viewport — a section goes active as its top passes under.
      { rootMargin: '-150px 0px -70% 0px', threshold: 0 }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [items])

  return (
    <nav ref={navRef} data-note="jump-nav" aria-label={t(locale, 'On this page')} className="border-default-200 bg-body-bg/95 sticky top-[84px] z-40 border-b backdrop-blur-md">
      <div className="container flex flex-wrap items-center gap-3 py-4">
        <span className="text-default-500 text-sm tracking-[0.2em] uppercase">{t(locale, 'On this page')}</span>
        {items.map((item) => {
          const isActive = item.id === active
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'true' : undefined}
              className={`border px-3.5 py-1.5 text-sm transition-colors ${isActive ? 'border-primary bg-primary text-white' : 'border-default-300 text-default-800 hover:border-primary hover:text-primary'}`}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * Closing conversion block: the page's own ask beside the actual quote form.
 *
 * Replaces the button-to-/contact pattern everywhere. A buyer who has read a
 * product page should be able to ask about that grade without loading another
 * page. Each page keeps its own eyebrow, heading and lede; the form itself is
 * identical site-wide, so the field set and the reply promise never drift.
 *
 * Product options resolve from the active locale here rather than being passed
 * in, so a page only supplies its copy. products.ts is already in the client
 * bundle via the navbar, so this adds no weight.
 */
export const QuoteSection = ({
  eyebrow,
  title,
  desc,
  formTitle = 'Request a Quote',
  formDesc = 'Tell us the product, grade, size, and quantity you need. A specialist who understands the material replies within one business day.',
}: {
  eyebrow: string
  title: string
  desc: string
  formTitle?: string
  formDesc?: string
}) => {
  const locale = useLocale() as Locale

  return (
    <section data-note="quote" className="py-20 lg:py-30">
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

            <div className="text-default-600 mt-8 space-y-3 text-base">
              <p>
                {t(locale, 'Email')}{' '}
                <a href={`mailto:${site.email}`} className="text-primary underline">
                  {site.email}
                </a>
              </p>
              <p>
                {t(locale, 'Call')}{' '}
                <a href={site.phoneHref} className="text-primary underline">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-default-200 bg-default-50 border p-6 lg:p-10">
              <QuoteForm formTitle={t(locale, formTitle)} formDesc={t(locale, formDesc)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Closing conversion banner. */
export const BannerCTA = ({ eyebrow, title, desc, ctaLabel, ctaHref, footnote }: { eyebrow: string; title: string; desc: string; ctaLabel: string; ctaHref: string; footnote?: React.ReactNode }) => (
  <section className="pb-20 lg:pb-30">
    <div className="container">
      <div className="border-default-200 bg-default-50 border p-8 text-center lg:p-16">
        <SectionHeading eyebrow={eyebrow} title={title} desc={desc} align="center" />
        <div className="mt-9 flex justify-center">
          <ArrowButton href={ctaHref} label={ctaLabel} />
        </div>
        {footnote && <p className="text-default-600 mt-7 text-base">{footnote}</p>}
      </div>
    </div>
  </section>
)
