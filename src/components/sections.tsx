'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'
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
}: {
  eyebrow?: string
  title: string
  desc?: string
  items: Card[]
  ctaHref?: string
  ctaLabel?: string
}) => (
  <section className="lg:py-30 py-20">
    <div className="container">
      <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

      <div className="mt-14 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 border-t border-s border-default-200">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col gap-4 border-b border-e border-default-200 p-8 transition-colors hover:bg-default-50"
          >
            <Icon icon={item.icon} className="size-9 text-primary" />
            <h3 className="text-xl group-hover:text-primary">{item.title}</h3>
            <p className="text-base text-default-600">{item.desc}</p>
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
  <section className="relative overflow-hidden lg:py-30 py-20 text-white">
    <div className="absolute inset-0 bg-linear-to-br from-default-950 via-default-950 to-primary-3"></div>

    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-2xl border border-white/15 px-3.5 py-1.25">
            <span className="size-2 bg-primary-1"></span>
            <span className="text-sm text-white">{eyebrow}</span>
          </div>
          <h2 className="mt-4 lg:text-[42px] md:text-[36px] text-[28px] font-bold text-white">{title}</h2>
          <p className="mt-5 text-default-300">{desc}</p>
          <div className="mt-9">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="primary" />
          </div>
        </div>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {features.map((feature) => (
            <div key={feature.title} className="flex gap-4 py-6">
              <Icon icon="tabler:circle-check" className="mt-1 size-6 shrink-0 text-primary-1" />
              <div>
                <h3 className="text-lg text-white">{feature.title}</h3>
                <p className="mt-1.5 text-base text-default-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

/**
 * Plain visible Q&A, deliberately not an accordion, so crawlers and AI answer
 * engines read the answers without executing JS. FAQPage JSON-LD sits alongside.
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

      <div className="mt-14 divide-y divide-default-200 border-t border-default-200">
        {items.map((item, i) => (
          <div key={item.q} className="grid md:grid-cols-12 gap-6 py-8">
            <div className="md:col-span-1 text-sm font-semibold text-primary">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="md:col-span-4 text-lg">{item.q}</h3>
            <p className="md:col-span-7 text-base text-default-600">{item.a}</p>
          </div>
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
