'use client'

import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { getProducts } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
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
export const PageHero = ({
  eyebrow,
  title,
  desc,
  crumbs,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  desc?: string
  crumbs: { label: string; href?: string }[]
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}) => (
  <section className="relative overflow-hidden border-b border-default-200 lg:pt-50 pt-35 lg:pb-20 pb-14">
    <div className="container-full relative z-10">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-default-500">
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

      <div className="mt-7 grid xl:grid-cols-4 xl:gap-20 gap-10 items-end">
        <div className="xl:col-span-3">
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25">
            <span className="size-2 bg-primary"></span>
            <span className="text-sm text-default-900">{eyebrow}</span>
          </div>
          <h1 className="mt-4 font-bold lg:text-6xl md:text-[48px] text-[34px]">{title}</h1>
        </div>

        <div>
          {desc && <p className="mb-7.5 text-base">{desc}</p>}
          <div className="flex flex-wrap gap-4">
            {primaryCta && <ArrowButton href={primaryCta.href} label={primaryCta.label} />}
            {secondaryCta && (
              <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] opacity-4"></div>
  </section>
)

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
}: {
  eyebrow?: string
  title: string
  desc?: string
  items: Card[]
  ctaHref?: string
  ctaLabel?: string
  /**
   * Only 4 or 3. Eight product groups sit 4-across (two clean rows of four);
   * six application hubs sit 3-across (two rows of three) and get a larger
   * card, since three across leaves room for it and the hubs carry more weight.
   */
  columns?: 4 | 3
}) => (
  <section className="lg:py-30 py-20">
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

      <div
        className={`mt-14 grid md:grid-cols-2 grid-cols-1 border-t border-s border-default-200 ${
          columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex flex-col border-b border-e border-default-200 transition-colors hover:bg-default-50 ${
              columns === 3 ? 'gap-5 p-10' : 'gap-4 p-8'
            }`}
          >
            <Icon
              icon={item.icon}
              className={`text-primary ${columns === 3 ? 'size-11' : 'size-9'}`}
            />
            <h3 className={`group-hover:text-primary ${columns === 3 ? 'text-2xl' : 'text-xl'}`}>
              {item.title}
            </h3>
            <p className={`text-default-600 ${columns === 3 ? 'text-lg' : 'text-base'}`}>
              {item.desc}
            </p>
            <span className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Learn more
              <Icon
                icon="tabler:arrow-narrow-right"
                className="size-5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>

      {ctaHref && ctaLabel && (
        <div className="mt-12">
          <ArrowButton href={ctaHref} label={ctaLabel} variant="dark" />
        </div>
      )}
    </div>
  </section>
)

/**
 * The template's signature medallion row — full-bleed circles that butt against
 * each other, alternating light, dark and image. Used once per page at most:
 * it is the loudest thing in the system and stops reading as special if repeated.
 *
 * Any medallion with `image: true` renders a wireframe circle, since EID has
 * supplied no photography yet.
 */
export const StatMedallions = ({
  items,
}: {
  items: { value?: string; label?: string; body?: string; tone?: 'light' | 'dark'; image?: boolean }[]
}) => (
  <section className="relative size-full overflow-hidden bg-default-100 lg:py-30 py-20">
    <div className="container-full relative z-10">
      <div className="flex flex-wrap justify-center">
        {items.map((item, i) => {
          if (item.image) {
            return (
              <div
                key={i}
                role="img"
                aria-label="Placeholder image: production floor"
                className="relative flex lg:size-112 size-72 items-center justify-center overflow-hidden rounded-full border border-dashed border-default-300 bg-default-50"
              >
                <svg
                  className="absolute inset-0 size-full text-default-200"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
                </svg>
                <span className="relative rounded bg-white/90 px-3 py-2 text-center text-xs uppercase tracking-[0.15em] text-default-500">
                  Production floor — London
                </span>
              </div>
            )
          }

          const dark = item.tone === 'dark'
          return (
            <div
              key={i}
              className={`flex lg:size-112 size-72 flex-col items-center justify-center overflow-hidden rounded-full p-10 text-center ${
                dark ? 'bg-default-950' : 'border border-default-300 bg-white'
              }`}
            >
              {/* leading-none: the theme's 1.3em line-height leaves the numeral
                  glyph taller than its line box, so the label collides with it. */}
              <div
                className={`lg:text-[58px] md:text-[34px] text-[28px] font-bold leading-none ${
                  dark ? 'text-white' : 'text-default-900'
                }`}
              >
                {item.value}
              </div>
              {item.label && (
                <div
                  className={`mt-3 text-sm uppercase leading-none tracking-[0.2em] ${
                    dark ? 'text-primary-1' : 'text-primary'
                  }`}
                >
                  {item.label}
                </div>
              )}
              {item.body && (
                <p className={`mt-5 lg:w-75 w-57 text-base ${dark ? 'text-default-300' : 'text-default-600'}`}>
                  {item.body}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>

    {/* The template's dashed column grid + film-grain wash. */}
    <div className="absolute inset-0 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
      ))}
    </div>
    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] opacity-4"></div>
  </section>
)

/**
 * Verified figures, set as a rule-separated band. Values are strings so a mixed
 * row ("50+", "100%", "ISO 9001") stays honest rather than being forced into a
 * number format that would need a unit invented for it.
 */
export const StatsBar = ({ items }: { items: { value: string; label: string }[] }) => (
  <section className="border-y border-default-200">
    <div className="container">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 divide-x divide-y divide-default-200 lg:divide-y-0">
        {items.map((item) => (
          <div key={item.label} className="px-8 py-10">
            <div className="text-4xl font-bold text-default-900">{item.value}</div>
            <div className="mt-2 text-sm text-default-500">{item.label}</div>
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
  <section className="border-y border-default-200 bg-default-50">
    <div className="container-full">
      <ul className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-6">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <Icon icon="tabler:circle-check" className="size-5 shrink-0 text-primary" />
            <span className="text-base font-medium text-default-900">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

/** Four verified proof points, directly under the hero. */
export const FeaturesRow = ({
  items,
}: {
  items: { title: string; desc: string; href: string }[]
}) => (
  <section className="border-y border-default-200 bg-default-50">
    <div className="container">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 divide-x divide-y divide-default-200 lg:divide-y-0">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="group flex flex-col gap-3 p-8">
            <h3 className="text-lg group-hover:text-primary">{item.title}</h3>
            <p className="text-base text-default-600">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
)

/** The three-pillar positioning block. */
export const Pillars = ({
  items,
}: {
  items: { meta: string; title: string; body: string; href: string; cta: string }[]
}) => (
  <section className="lg:pb-30 pb-20">
    <div className="container">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {items.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-4 border-t-2 border-primary pt-7">
            <div className="text-sm uppercase tracking-[0.2em] text-default-500">{pillar.meta}</div>
            <h3 className="text-2xl">{pillar.title}</h3>
            <p className="text-base text-default-600">{pillar.body}</p>
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
}: {
  eyebrow: string
  title: string
  desc: string
  features: { title: string; desc: string }[]
  ctaLabel: string
  ctaHref: string
}) => (
  <section className="relative size-full overflow-hidden lg:py-37.5 py-20 text-white">
    {/* Full-bleed backdrop. The template runs a photograph here; until EID
        supplies one this is the dark gradient plus the dashed column grid and
        film-grain wash, with a marker so the missing asset stays visible. */}
    <div className="absolute inset-0 bg-linear-to-br from-default-950 via-default-950 to-primary-3"></div>
    <div className="absolute inset-0 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-full w-0.5 border border-dashed border-white opacity-10"></div>
      ))}
    </div>
    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] opacity-6"></div>
    <div className="absolute bottom-5 end-5 hidden text-[10px] uppercase tracking-[0.15em] text-white/25 lg:block">
      Background image pending
    </div>

    <div className="container relative z-10">
      {/* The glass card: a translucent panel over the backdrop rather than a
          two-column split, so the claim reads as one block. */}
      <div className="max-w-2xl rounded-md border border-white/10 bg-default-900/50 [backdrop-filter:blur(5px)] lg:p-12.5 md:p-7.5 p-6">
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 px-3.5 py-1.25">
          <span className="size-2 bg-primary-1"></span>
          <span className="text-sm text-white">{eyebrow}</span>
        </div>

        <h2 className="mt-4 lg:text-[32px] md:text-[28px] text-2xl font-bold text-white">{title}</h2>
        <p className="mt-5 text-default-200">{desc}</p>

        <div className="mt-7.5 space-y-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-3">
              <Icon icon="tabler:check" className="mt-1 size-5 shrink-0 text-primary-1" />
              <div>
                <h3 className="text-base text-white">{feature.title}</h3>
                <p className="mt-1 text-base text-default-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9">
          <ArrowButton href={ctaHref} label={ctaLabel} variant="primary" />
        </div>
      </div>
    </div>
  </section>
)

/**
 * Accordion Q&A, built on native <details>/<summary> rather than the template's
 * JS accordion. Same look and the same plus-to-cross rotation, but the answers
 * are in the server-rendered HTML and expand without JavaScript — which is the
 * point of this block, since it is written for crawlers and AI answer engines
 * as much as for readers. FAQPage JSON-LD sits alongside it on the page.
 *
 * The first item is open by default so the block never reads as an empty list.
 */
export const Faq = ({
  eyebrow,
  title,
  desc,
  items,
}: {
  eyebrow: string
  title: string
  desc?: string
  items: { q: string; a: string }[]
}) => (
  <section className="lg:py-30 py-20">
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

      <div className="mt-14 space-y-4">
        {items.map((item, i) => (
          <details
            key={item.q}
            open={i === 0}
            className="group rounded-lg border border-default-200 bg-default-50 p-6 transition-colors open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
              <div className="flex items-start gap-5">
                <span className="mt-1 text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg">{item.q}</h3>
              </div>

              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Icon
                  icon="tabler:plus"
                  className="size-5 transition-transform duration-500 group-open:rotate-45"
                />
              </span>
            </summary>

            <p className="mt-5 ps-10 text-base text-default-600">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

/**
 * The cross-axis matrix, rendered. Products link to the applications they serve,
 * to sibling sections, and to quality/resources — this is the internal-link map
 * that used to be carried by separate URLs.
 */
export const CrossLinks = ({
  groups,
}: {
  groups: { title: string; links: { label: string; href: string }[] }[]
}) => {
  const populated = groups.filter((g) => g.links.length > 0)
  if (!populated.length) return null

  return (
    <section className="border-t border-default-200 lg:py-24 py-16">
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
          {populated.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-default-500">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-base text-default-700 hover:text-primary">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="text-base text-default-700 hover:text-primary">
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
export const SpecTable = ({ specs }: { specs: { label: string; value: string }[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse text-base">
      <thead>
        <tr className="border-b border-default-300">
          <th className="py-3 pe-4 text-start text-sm uppercase tracking-wider text-default-500">
            Attribute
          </th>
          <th className="py-3 text-start text-sm uppercase tracking-wider text-default-500">
            Detail
          </th>
        </tr>
      </thead>
      <tbody>
        {specs.map((spec) => (
          <tr key={spec.label} className="border-b border-default-200 align-top">
            <td className="py-3 pe-4 font-semibold text-default-900">{spec.label}</td>
            <td className="py-3 text-default-600">{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

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
}) => (
  <section className="relative size-full overflow-hidden bg-default-100 lg:py-30 py-20">
    <div className="container-full relative z-10">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-md border border-default-700 bg-default-950 px-5 py-7.5 transition-colors hover:border-primary-1"
          >
            <h3 className="mb-5 text-2xl text-white group-hover:text-primary-1">{item.title}</h3>

            <div className="mb-7.5 aspect-[4/3] w-full overflow-hidden rounded-md border border-dashed border-white/15 bg-white/5">
              <div className="flex size-full items-center justify-center p-4">
                <span className="text-center text-xs uppercase tracking-[0.15em] text-white/40">
                  {item.title} — product shot
                </span>
              </div>
            </div>

            <p className="mb-7.5 text-base text-default-400">{item.desc}</p>

            <div className="mt-auto divide-y divide-default-700">
              {item.rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-4">
                  <div className="text-sm text-default-400">{row.label}</div>
                  <div className="text-end text-sm text-white">{row.value}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div className="absolute inset-0 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
      ))}
    </div>
    <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] opacity-4"></div>
  </section>
)

/** On-page anchor nav for the merged product pages. */
export const JumpNav = ({ items }: { items: { id: string; label: string }[] }) => (
  <section className="border-b border-default-200 py-6">
    <div className="container flex flex-wrap items-center gap-3">
      <span className="text-sm uppercase tracking-[0.2em] text-default-500">On this page</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="rounded-2xl border border-default-300 px-3.5 py-1.5 text-sm text-default-800 transition-colors hover:border-primary hover:text-primary"
        >
          {item.label}
        </a>
      ))}
    </div>
  </section>
)

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
  const productOptions = ['Help me specify', ...getProducts(locale).map((p) => p.name)]

  return (
    <section className="lg:py-30 py-20">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

            <div className="mt-8 space-y-3 text-base text-default-600">
              <p>
                Email{' '}
                <a href={`mailto:${site.email}`} className="text-primary underline">
                  {site.email}
                </a>
              </p>
              <p>
                Call{' '}
                <a href={site.phoneHref} className="text-primary underline">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-md border border-default-200 bg-default-50 p-6 lg:p-10">
              <QuoteForm formTitle={formTitle} formDesc={formDesc} productOptions={productOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Closing conversion banner. */
export const BannerCTA = ({
  eyebrow,
  title,
  desc,
  ctaLabel,
  ctaHref,
  footnote,
}: {
  eyebrow: string
  title: string
  desc: string
  ctaLabel: string
  ctaHref: string
  footnote?: React.ReactNode
}) => (
  <section className="lg:pb-30 pb-20">
    <div className="container">
      <div className="rounded-md border border-default-200 bg-default-50 lg:p-16 p-8 text-center">
        <SectionHeading eyebrow={eyebrow} title={title} desc={desc} align="center" />
        <div className="mt-9 flex justify-center">
          <ArrowButton href={ctaHref} label={ctaLabel} />
        </div>
        {footnote && <p className="mt-7 text-base text-default-600">{footnote}</p>}
      </div>
    </div>
  </section>
)
