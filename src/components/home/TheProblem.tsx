import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'

/**
 * The template's WhatWeManufacture layout, carrying the deck's problem
 * statement: a dark full-bleed band where the eyebrow sits far left and the
 * claim is pushed right, a wide image runs beneath it, and a closing statement
 * with the actions sits at the foot.
 *
 * The problem section earns the whole page, so it gets the dark treatment and
 * the width rather than being a two-column block like everything above it.
 */
const TheProblem = ({
  eyebrow,
  title,
  lede,
  closing,
  imageLabel,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  lede: string
  closing: string
  imageLabel: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}) => (
  <section className="relative size-full overflow-hidden bg-default-900">
    {/* The template's dashed column grid, carried across the dark band. */}
    <div className="absolute inset-0 z-1 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="h-full w-0.5 border border-dashed border-default-100 opacity-7"></div>
      ))}
    </div>

    <div className="container relative z-10 lg:py-25 py-20">
      <div className="mb-20 flex lg:flex-row flex-col items-start justify-between gap-12.5 xl:gap-20">
        <div className="inline-flex items-center gap-7.5 rounded-2xl border border-default-800 bg-default-950 px-3.5 py-1.25">
          <span className="size-2 bg-primary"></span>
          <span className="text-sm text-default-100">{eyebrow}</span>
        </div>

        <div className="lg:ms-auto lg:max-w-2xl">
          <h2 className="mb-5 lg:text-[52px] md:text-[40px] text-[30px] font-bold leading-tight text-white">
            {title}
          </h2>
          <p className="text-default-400">{lede}</p>
        </div>
      </div>

      <Wireframe label={imageLabel} ratio="panorama" tone="dark" />
    </div>

    <div className="container relative z-10 md:pb-25 pb-20">
      <div className="flex lg:flex-row flex-col lg:items-center items-start gap-7.5">
        <h3 className="lg:text-[32px] md:text-[28px] text-2xl font-semibold text-white lg:max-w-3xl">
          {closing}
        </h3>

        {/* The secondary is `light`, not `dark`: a dark shell on this dark band
            renders as an invisible button with a floating arrow badge. */}
        <div className="flex grow flex-wrap gap-4 lg:justify-end">
          <ArrowButton href={primaryCta.href} label={primaryCta.label} />
          <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />
        </div>
      </div>
    </div>
  </section>
)

export default TheProblem
