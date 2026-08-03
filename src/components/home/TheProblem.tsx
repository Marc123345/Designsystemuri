'use client'

/**
 * TheProblem — "Why suppliers get replaced"
 *
 * Rework of the pinned section, styled to the eid-v2 design system:
 *  - `.container` for width, not max-w-6xl; site heading scale + font-bold;
 * bordered eyebrow pill ( border, size-2 bg-primary dot);
 *  - the resolution is the site's signature full-bleed dark band
 *    (from-default-950 via-default-950 to-primary-3 gradient + noise overlay),
 * matching DarkFeatureList, rather than a floating card.
 *
 * Interaction:
 * 1. Desktop: a pinned chapter transition. Each driver holds the full
 * viewport, its evidence record sits full-bleed behind the copy and
 * creeps in scale, and each line of copy slides up from behind a mask on
 * a stagger, so advancing reads as a cut rather than a cross-fade.
 * 2. Scroll is scrubbed, not stepped: the per-chapter rail and the scale
 * creep track it continuously. A side rail jumps straight to a variable.
 * 3. Mobile and reduced-motion get a single-open accordion with the
 * evidence record inside each expanded row. Keyboard + aria wired.
 * 4. Resolution sits on a dark band so problem -> resolution reads as a
 * register change, with a once-only staggered reveal.
 */

import ChapterRun, { type Frame } from '@/components/ChapterRun'
import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import { Icon } from '@iconify/react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Driver = {
  variable: string
  effect: string
  evidence: string
}

type ProductionItem = {
  title: string
  body: string
}

type Cta = {
  label: string
  href: string
}

type TheProblemProps = {
  eyebrow: string
  title: string
  lede: string
  drivers: Driver[]
  /** Prefix for each variable chapter's eyebrow; the component numbers them. */
  variableLabel: string
  /** Eyebrow for the closing chapter. */
  resolutionEyebrow: string
  resolutionTitle: string
  production: ProductionItem[]
  resolutionClosing: string
  primaryCta: Cta
}

/* ------------------------------------------------------------------ */
/* Eyebrow — the site's bordered pill                                  */
/* ------------------------------------------------------------------ */

const Eyebrow = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-1.5 border px-3.5 py-1.25 ${dark ? 'border-white/15' : 'border-default-300 bg-white'}`}>
    <span className={`size-2 ${dark ? 'bg-primary-1' : 'bg-primary'}`}></span>
    <span className={`text-sm ${dark ? 'text-white' : 'text-default-900'}`}>{label}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/* Frames for the pinned run                                           */
/* ------------------------------------------------------------------ */

type ResolutionProps = Pick<TheProblemProps, 'resolutionEyebrow' | 'resolutionTitle' | 'production' | 'resolutionClosing' | 'primaryCta'>

/**
 * One sequence: the section opens itself, the four variables build the problem,
 * and the last frame answers it — all in the same treatment, so the turn reads
 * as the payoff of one run rather than a new band underneath.
 */
const buildFrames = ({ intro, drivers, resolution, variableLabel }: { intro: Pick<TheProblemProps, 'eyebrow' | 'title' | 'lede'>; drivers: Driver[]; resolution: ResolutionProps; variableLabel: string }): Frame[] => [
  { eyebrow: intro.eyebrow, heading: intro.title, body: [intro.lede] },

  ...drivers.map(
    (d, i): Frame => ({
      eyebrow: `${variableLabel} 0${i + 1}`,
      heading: d.variable,
      body: [d.effect],
      accent: d.evidence,
      visual: d.evidence,
    }),
  ),

  {
    eyebrow: resolution.resolutionEyebrow,
    heading: resolution.resolutionTitle,
    accent: resolution.resolutionClosing,
    footer: (
      <div className="flex flex-wrap gap-4">
        <ArrowButton href={resolution.primaryCta.href} label={resolution.primaryCta.label} variant="primary" />
      </div>
    ),
    // The three production modes take the right column at full opacity: stacking
    // them under the copy overflowed the viewport, and forcing them to fit meant
    // shrinking the type out of step with the rest of the run.
    aside: (
      <div className="divide-y divide-white/12 border-t border-white/12">
        {resolution.production.map((item) => (
          <div key={item.title} className="flex items-start gap-3 py-4">
            <Icon icon="tabler:check" className="text-primary-1 mt-1 size-5 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-default-200 mt-1.5 text-base leading-relaxed">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
]

/* ------------------------------------------------------------------ */
/* Accordion stage — mobile, and any width with reduced motion         */
/* ------------------------------------------------------------------ */

const AccordionStage = ({ drivers, className = '' }: { drivers: Driver[]; className?: string }) => {
  const [open, setOpen] = useState(0)

  return (
    <div className={`container ${className}`}>
      <div className="border-default-200 border-b">
        {drivers.map((driver, i) => {
          const isOpen = i === open
          return (
            <div key={driver.variable} className="border-default-200 border-t">
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`driver-panel-${i}`} className="focus-visible:ring-primary/60 flex w-full items-center justify-between gap-4 py-5 text-start outline-none focus-visible:ring-2">
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className={`block size-2 shrink-0 transition-colors duration-300 motion-reduce:transition-none ${isOpen ? 'bg-primary' : 'bg-default-300'}`} />
                  <span className={`text-lg font-bold ${isOpen ? 'text-default-900' : 'text-default-500'}`}>{driver.variable}</span>
                </span>
                <span aria-hidden="true" className={`text-default-400 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>

              <div id={`driver-panel-${i}`} role="region" aria-label={driver.variable} className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <div className="overflow-hidden">
                  <div className="space-y-5 ps-5 pb-6">
                    <p className="text-default-600 max-w-prose text-base leading-relaxed">{driver.effect}</p>
                    <Wireframe label={driver.evidence} ratio="wide" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Resolution band — the site's full-bleed dark band                   */
/* ------------------------------------------------------------------ */

const Resolution = ({ resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta }: ResolutionProps) => {
  const reduced = useReducedMotion()

  const parent = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.09 },
    },
  }

  const child = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE },
    },
  }

  return (
    <section className="relative size-full overflow-hidden py-20 text-white lg:py-37.5">
      {/* Signature dark band: gradient base + noise overlay, matching
          DarkFeatureList so the register change reads as one system. */}
      <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br"></div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6"></div>

      <motion.div className="relative z-10 container" variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px' }}>
        <motion.div variants={child} className="mb-5">
          <Eyebrow label={resolutionEyebrow} dark />
        </motion.div>
        <motion.h3 variants={child} className="max-w-2xl text-2xl leading-snug font-bold text-white md:text-[28px] lg:text-[32px]">
          {resolutionTitle}
        </motion.h3>

        {/* Progressive disclosure: the three production modes read as a list of
titles, each opening to its detail on demand — the same native
            <details>/<summary> accordion (plus rotates to a cross) the FAQ and
            DarkFeatureList use. `name` makes it exclusive: opening one closes
the others, so only the mode you're reading is expanded. First open
so it never reads as an empty list. */}
        <div className="mt-10 max-w-2xl divide-y divide-white/10 border-y border-white/10">
          {production.map((item, i) => (
            <motion.div key={item.title} variants={child}>
              <details name="eid-production" open={i === 0} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                  <Icon icon="tabler:check" className="text-primary-1 size-5 shrink-0" />
                  <h4 className="flex-1 text-base text-white">{item.title}</h4>
                  <Icon icon="tabler:plus" className="size-4 shrink-0 text-white/60 transition-transform duration-500 group-open:rotate-45" />
                </summary>
                <p className="text-default-300 mt-2 ps-8 text-base leading-relaxed">{item.body}</p>
              </details>
            </motion.div>
          ))}
        </div>

        <motion.p variants={child} className="text-default-200 mt-14 max-w-2xl text-lg leading-relaxed">
          {resolutionClosing}
        </motion.p>

        <motion.div variants={child} className="mt-8 flex flex-wrap gap-4">
          <ArrowButton href={primaryCta.href} label={primaryCta.label} variant="primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const TheProblem = ({ eyebrow, title, lede, drivers, variableLabel, resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta }: TheProblemProps) => {
  const reduced = useReducedMotion()

  const resolution = { resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta }

  // Desktop with motion gets the whole section as one pinned run: intro, the
  // four variables, then the resolution. Mobile and reduced-motion get the
  // same content laid out flat — a static header, an accordion, and the
  // resolution as the dark band it was, because a pinned sequence with no
  // motion is just six screens of nothing happening.
  if (!reduced) {
    return (
      <section data-note="problem">
        <ChapterRun frames={buildFrames({ intro: { eyebrow, title, lede }, drivers, resolution, variableLabel })} note="problem-run" />

        <div className="bg-white lg:hidden">
          <div className="container pt-20 pb-12">
            <Eyebrow label={eyebrow} />
            <h2 className="text-default-900 mt-4 max-w-3xl text-[28px] leading-tight font-bold md:text-[36px]">{title}</h2>
            <p className="text-default-600 mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>
          </div>
          <AccordionStage drivers={drivers} className="pb-20" />
          <Resolution {...resolution} />
        </div>
      </section>
    )
  }

  return (
    <section data-note="problem" className="bg-white">
      <div className="container pt-20 pb-12 lg:pt-30 lg:pb-16">
        <Eyebrow label={eyebrow} />
        <h2 className="text-default-900 mt-4 max-w-3xl text-[28px] leading-tight font-bold md:text-[36px] lg:text-[42px]">{title}</h2>
        <p className="text-default-600 mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>
      </div>

      <AccordionStage drivers={drivers} className="pb-20" />
      <Resolution {...resolution} />
    </section>
  )
}

export default TheProblem
