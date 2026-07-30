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
  secondaryCta: Cta
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
/* Chapter stage — desktop, motion allowed                             */
/* ------------------------------------------------------------------ */

/**
 * Pinned chapter transition. Each driver gets the full viewport: the stage is
 * `count * 100vh` tall and its inner shell is sticky, so scrolling advances
 * through the variables one at a time rather than scrolling past them.
 *
 * Per chapter:
 *  - the evidence record sits full-bleed behind the copy and creeps up in
 *    scale across its own segment, so a held frame still has movement in it;
 *  - each line of copy is masked by an `overflow-hidden` wrapper and slides up
 *    from 100% on a stagger (eyebrow, heading, body), which is what makes the
 *    change of chapter read as a cut rather than a cross-fade;
 *  - past chapters exit upward and future ones wait below, so the direction of
 *    travel always matches the direction you scrolled.
 *
 * `sectionProgress` is scrubbed, not stepped, so the scale creep and the
 * bottom rail track the scroll continuously.
 */
type ResolutionProps = Pick<TheProblemProps, 'resolutionEyebrow' | 'resolutionTitle' | 'production' | 'resolutionClosing' | 'primaryCta' | 'secondaryCta'>

/** One chapter's worth of copy. The frame is shared; only the body differs. */
type Chapter =
  | { kind: 'intro'; eyebrow: string; heading: string; body: string }
  | { kind: 'driver'; eyebrow: string; heading: string; body: string; accent: string; visual: string }
  | { kind: 'resolution'; eyebrow: string; heading: string; resolution: ResolutionProps }

const ChapterStage = ({ intro, drivers, resolution, variableLabel }: { intro: Pick<TheProblemProps, 'eyebrow' | 'title' | 'lede'>; drivers: Driver[]; resolution: ResolutionProps; variableLabel: string }) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  // One sequence: the section opens itself, the four variables build the
  // problem, and the last frame answers it — all in the same treatment, so the
  // turn reads as the payoff of one run rather than a new band underneath.
  const chapters: Chapter[] = [
    { kind: 'intro', eyebrow: intro.eyebrow, heading: intro.title, body: intro.lede },
    ...drivers.map(
      (d, i): Chapter => ({
        kind: 'driver',
        eyebrow: `${variableLabel} 0${i + 1}`,
        heading: d.variable,
        body: d.effect,
        accent: d.evidence,
        visual: d.evidence,
      }),
    ),
    { kind: 'resolution', eyebrow: resolution.resolutionEyebrow, heading: resolution.resolutionTitle, resolution },
  ]

  const count = chapters.length
  const active = Math.min(count - 1, Math.floor(progress * count))

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const max = el.offsetHeight - window.innerHeight
      setProgress(max <= 0 ? 0 : Math.max(0, Math.min(1, scrolled / max)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const jumpTo = (index: number) => {
    const el = stageRef.current
    if (!el) return
    // Document-absolute, not offsetTop: offsetTop is measured against the
    // nearest positioned ancestor, and this section sits inside one, so using it
    // sent every jump back to the first chapter.
    const stageTop = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: stageTop + (index / count) * el.offsetHeight + 8, behavior: 'smooth' })
  }

  return (
    <div ref={stageRef} className="relative hidden lg:block" style={{ height: `${count * 100}vh` }}>
      {/* The shell needs an opaque base: the per-chapter tint runs at 0.75, and
          the background slot below is translucent, so without this the tint
          composites over the white page and the whole stage washes out. H2H gets
          away with no base only because its background video is opaque. */}
      <div className="bg-default-950 sticky top-0 h-screen overflow-hidden">
        {/* LAYER 1 — one standing background behind every chapter, not per
            chapter. H2H runs a looping video here; EID has no footage or
            photography cleared, so this is the background image slot. */}
        <div aria-hidden="true" className="absolute inset-0">
          <Wireframe label="Background image — QC laboratory" ratio="wide" tone="dark" hideLabel className="!aspect-auto size-full !border-0" />
        </div>

        {chapters.map((chapter, index) => {
          const isActive = active === index
          const isPast = active > index
          const isFuture = active < index
          // 0 → 1 across this chapter's own slice of the scroll.
          const seg = Math.max(0, Math.min(1, progress * count - index))
          // Chapters alternate their tint so consecutive frames are not the same
          // flat colour — H2H alternates two near-blacks for the same reason.
          const tint = index % 2 === 0 ? 'var(--color-default-950)' : 'var(--color-primary-3)'

          // Masked line reveal: sits below the mask until its chapter is live.
          const line = (delay: string) => ({
            transform: `translateY(${isFuture ? '100%' : '0'})`,
            transitionDelay: delay,
          })

          return (
            <div key={chapter.heading} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}>
              <div className="relative size-full">
                {/* LAYER 2 — tint over the background, creeping in scale across
                    this chapter's own scroll slice. Held at 0.75 so the
                    background still reads through it. */}
                <div className="absolute inset-0 transition-transform duration-1000 ease-out" style={{ backgroundColor: tint, opacity: 0.75, transform: `scale(${1 + seg * 0.05})` }} />

                {/* LAYER 3 — glow off to the right, intensifying with progress. */}
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 50%, rgba(61, 82, 144, ${0.1 + seg * 0.06}) 0%, transparent 70%)` }} />

                {/* LAYER 4 — the chapter's own visual, opposite the copy, held
                    faint and scaling up as its chapter runs. Only the variable
                    chapters have a record to show: the intro and the resolution
                    carry no image the deck names, and inventing a caption for a
                    placeholder would put words in EID's mouth. */}
                {chapter.kind === 'driver' && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-[8%] hidden items-center justify-center transition-all duration-1000 ease-out lg:flex xl:right-[12%]"
                    style={{ opacity: isActive ? 0.22 : 0, transform: `translateY(-50%) scale(${0.8 + seg * 0.2})` }}
                  >
                    <Wireframe label={chapter.visual} ratio="square" tone="dark" className="w-[22rem] xl:w-[26rem]" />
                  </div>
                )}

                {/* LAYER 5 — copy. Past chapters leave upward, future ones wait
                    below, and the whole block eases up in scale as it lands. */}
                <div className="relative z-10 flex h-full items-center" style={{ paddingTop: '6rem' }}>
                  <div className="container">
                    <div
                      className="transition-all duration-1000"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: `translateY(${isPast ? '-80px' : isFuture ? '80px' : '0'}) scale(${isActive ? 1 : 0.95})`,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="transition-transform duration-1000 ease-out" style={line('100ms')}>
                          <Eyebrow label={chapter.eyebrow} dark />
                        </div>
                      </div>

                      <div className="mt-4 overflow-hidden">
                        {/* Every frame in this section uses the site's h2 —
                            28/36/42px, font-bold, Mona Sans, line-height 1.3
                            from the base rule — in white for the dark band. The
                            outlined weight-900 display type this used to carry
                            was a treatment the site uses nowhere else, so the
                            section spoke in a voice of its own. Motion is what
                            makes the sequence feel like a sequence; the type
                            does not need to. */}
                        <h2 className="max-w-3xl text-[28px] font-bold text-white transition-transform duration-1000 ease-out md:text-[36px] lg:text-[42px]" style={line('200ms')}>
                          {chapter.heading}
                        </h2>
                      </div>

                      {chapter.kind === 'resolution' ? (
                        /* Same frame and same type scale as the frames before
                           it: outlined heading, one body measure, the accent
                           rule. The three production modes move into the right
                           half — the column the variable frames leave to their
                           faint record — because stacking them under the copy
                           overflowed the viewport and forcing them to fit meant
                           shrinking the type out of step with the rest. */
                        <div className="grid grid-cols-12 gap-10">
                          <div className="col-span-7">
                            <div className="overflow-hidden">
                              <div className="transition-transform duration-1000 ease-out" style={line('400ms')}>
                                {/* Was text-primary-1, which is #3d5290 on a
                                    near-black band — 1.96:1, under half the 4.5:1
                                    minimum and genuinely unreadable. The blue rule
                                    keeps the accent; the words go white, since this
                                    line is the section's actual argument. */}
                                <p className="border-primary-1 border-s-[3px] ps-4 text-base font-medium text-white" style={{ maxWidth: '32rem' }}>
                                  {chapter.resolution.resolutionClosing}
                                </p>
                              </div>
                            </div>

                            <div className="mt-8 overflow-hidden">
                              <div className="flex flex-wrap gap-4 transition-transform duration-1000 ease-out" style={line('560ms')}>
                                <ArrowButton href={chapter.resolution.primaryCta.href} label={chapter.resolution.primaryCta.label} variant="primary" />
                                <ArrowButton href={chapter.resolution.secondaryCta.href} label={chapter.resolution.secondaryCta.label} variant="light" />
                              </div>
                            </div>
                          </div>

                          <div className="col-span-5 overflow-hidden">
                            <div className="divide-y divide-white/12 border-t border-white/12 transition-transform duration-1000 ease-out" style={line('480ms')}>
                              {chapter.resolution.production.map((item) => (
                                <div key={item.title} className="flex items-start gap-3 py-4">
                                  <Icon icon="tabler:check" className="text-primary-1 mt-1 size-5 shrink-0" />
                                  <div>
                                    <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                    <p className="text-default-200 mt-1.5 text-base leading-relaxed">{item.body}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="mt-6 overflow-hidden">
                            <div className="transition-transform duration-1000 ease-out" style={line('400ms')}>
                              <p className="text-default-200 text-lg leading-relaxed" style={{ maxWidth: chapter.kind === 'intro' ? '42rem' : '36rem' }}>
                                {chapter.body}
                              </p>
                            </div>
                          </div>

                          {chapter.kind === 'driver' && (
                            <div className="mt-5 overflow-hidden">
                              <div className="transition-transform duration-1000 ease-out" style={line('500ms')}>
                                {/* Same contrast problem as the closing line. This
                                    one is a figure caption for the record opposite
                                    it, so it lands at default-300 (~8:1) rather than
                                    white — legible without competing with the h2. */}
                                <p className="border-primary-1 text-default-300 border-s-[3px] ps-4 text-base font-medium" style={{ maxWidth: '32rem' }}>
                                  {chapter.accent}
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* LAYER 6 — scrubbed rail for this chapter. */}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
                  <div className="from-primary to-primary-1 h-full bg-linear-to-r" style={{ transform: `scaleX(${seg})`, transformOrigin: 'left', transition: 'transform 100ms linear' }} />
                </div>
              </div>
            </div>
          )
        })}

        {/* Chapter rail — jump straight to a frame. */}
        <div className="absolute end-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 sm:end-8 md:end-12">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.heading}
              type="button"
              onClick={() => jumpTo(index)}
              aria-label={chapter.heading}
              aria-current={active === index || undefined}
              className="focus-visible:ring-primary-1 relative h-10 w-[6px] overflow-hidden rounded-full bg-white/10 outline-none transition-all duration-300 focus-visible:ring-2"
            >
              <span className="bg-primary-1 absolute inset-x-0 bottom-0 rounded-full transition-all duration-500" style={{ height: active >= index ? '100%' : '0%', opacity: active >= index ? 1 : 0.3 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

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

const Resolution = ({ resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta, secondaryCta }: ResolutionProps) => {
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
          <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const TheProblem = ({ eyebrow, title, lede, drivers, variableLabel, resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta, secondaryCta }: TheProblemProps) => {
  const reduced = useReducedMotion()

  const resolution = { resolutionEyebrow, resolutionTitle, production, resolutionClosing, primaryCta, secondaryCta }

  // Desktop with motion gets the whole section as one pinned run: intro, the
  // four variables, then the resolution. Mobile and reduced-motion get the
  // same content laid out flat — a static header, an accordion, and the
  // resolution as the dark band it was, because a pinned sequence with no
  // motion is just six screens of nothing happening.
  if (!reduced) {
    return (
      <section data-note="problem">
        <ChapterStage intro={{ eyebrow, title, lede }} drivers={drivers} resolution={resolution} variableLabel={variableLabel} />

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
