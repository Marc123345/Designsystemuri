'use client'

import { ArrowButton } from '@/components/ui'
import { Icon } from '@iconify/react'
import Image from 'next/image'

/**
 * Quality, as a band rather than a chapter.
 *
 * On home this used to be `DarkFeatureList`: a two-column full-bleed section
 * with a paragraph, four expanded checkpoints and an empty image slot, running
 * about 900px tall. Uri's note was to make it "a lot thinner, on a banner using
 * the page width instead of long", and the reasoning holds — the QC argument is
 * made properly on /quality, and its job on the homepage is to say the argument
 * exists and hand the reader the link.
 *
 * So the four checkpoints lose their sentences and become a row of labels
 * across the full width, which is the shape that actually earns the width: four
 * short strings side by side are read in one pass, where four stacked
 * title-plus-description pairs are read as a list to work through.
 *
 * The long-form component still exists and is still used on /quality, where the
 * sentences belong. Only the homepage call site changed.
 */
const QcBanner = ({ eyebrow, title, desc, checks, ctaLabel, ctaHref }: { eyebrow: string; title: string; desc: string; checks: string[]; ctaLabel: string; ctaHref: string }) => (
  <section data-note="qc-banner" className="relative isolate overflow-hidden">
    <Image src="/eid/home/qc.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
    {/* Two layers, not one: a flat brand wash to pull the photograph onto the
        palette, then a left-weighted gradient so the copy column clears
        contrast without flattening the whole frame to a solid colour. */}
    <div aria-hidden className="bg-primary-3/82 absolute inset-0 -z-10" />
    <div aria-hidden className="from-default-950 absolute inset-0 -z-10 bg-linear-to-r to-transparent to-70%" />

    <div className="container">
      <div className="py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 border border-white/20 px-3.5 py-1.25">
              <span className="bg-primary-1 size-2"></span>
              <span className="text-sm text-white">{eyebrow}</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white md:text-[30px] lg:text-[34px]">{title}</h2>
            <p className="mt-4 max-w-2xl text-base text-white/80">{desc}</p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="light" />
          </div>
        </div>

        {/* The four checkpoints as one rule-separated row. */}
        <ul className="mt-11 grid gap-x-8 gap-y-4 border-t border-white/15 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {checks.map((check) => (
            <li key={check} className="flex items-start gap-2.5 text-[0.95rem] text-white/85">
              <Icon icon="tabler:circle-check" className="text-primary-1 mt-0.5 size-5 shrink-0" />
              {check}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

export default QcBanner
