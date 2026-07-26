'use client'

/**
 * TheProblem — "Why suppliers get replaced"
 *
 * Rework of the pinned section. What changed vs the old version:
 *
 * 1. The 04/04 counter and one-slide-at-a-time panel are gone. All four
 *    drivers stay on screen as a QC-ledger deck; the active row opens to
 *    show its effect while the others compress to their variable name.
 *    The reader always sees the full scope of the problem.
 * 2. Scroll drives a continuous progress rail beside the deck (scrubbed,
 *    not stepped). Rows are also clickable and jump to their segment.
 * 3. The evidence panel swaps with a layered transition: incoming record
 *    clips in from the top over the outgoing one (550ms, custom ease),
 *    outgoing fades under it. Row text moves faster than the panel so the
 *    two layers read as separate materials.
 * 4. Mobile and reduced-motion get the same hierarchy, not a flattened
 *    dump: a single-open accordion with the evidence record inside each
 *    expanded row. Keyboard and aria wired throughout.
 * 5. Resolution block moves to a dark band so problem -> resolution reads
 *    as a register change, with a once-only staggered reveal.
 *
 * Assumes framer-motion. If eid-v2 imports from 'motion/react', change
 * the import line only.
 */

import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'

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
  resolutionTitle: string
  production: ProductionItem[]
  resolutionClosing: string
  primaryCta: Cta
  secondaryCta: Cta
}

/* ------------------------------------------------------------------ */
/* Deck row — desktop pinned stage                                     */
/* ------------------------------------------------------------------ */

const DeckRow = ({
  driver,
  active,
  onSelect,
}: {
  driver: Driver
  active: boolean
  onSelect: () => void
}) => (
  <button
    type="button"
    onClick={onSelect}
    aria-current={active || undefined}
    className="group/row w-full border-t border-default-200 py-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
  >
    <span className="flex items-baseline gap-3">
      <span
        aria-hidden="true"
        className={`block size-2 shrink-0 self-center rounded-[2px] transition-colors duration-300 ${
          active ? 'bg-primary' : 'bg-default-300 group-hover/row:bg-default-400'
        }`}
      />
      <span
        className={`text-lg font-medium transition-colors duration-300 sm:text-xl ${
          active ? 'text-default-900' : 'text-default-400 group-hover/row:text-default-600'
        }`}
      >
        {driver.variable}
      </span>
    </span>

    {/* Progressive disclosure: 0fr -> 1fr, no height measuring needed */}
    <span
      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      style={{ gridTemplateRows: active ? '1fr' : '0fr' }}
    >
      <span className="block overflow-hidden">
        <span
          className={`block max-w-md ps-5 pt-3 text-base leading-relaxed text-default-500 transition-opacity delay-100 duration-300 motion-reduce:transition-none ${
            active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {driver.effect}
        </span>
      </span>
    </span>
  </button>
)

/* ------------------------------------------------------------------ */
/* Pinned stage — desktop, motion allowed                              */
/* ------------------------------------------------------------------ */

const PinnedStage = ({ drivers }: { drivers: Driver[] }) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const count = drivers.length

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)))
    if (next !== active) setActive(next)
  })

  const jumpTo = (index: number) => {
    const el = stageRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const segment = (el.offsetHeight - window.innerHeight) / count
    window.scrollTo({
      top: top + segment * index + segment * 0.5,
      behavior: 'smooth',
    })
  }

  return (
    <div
      ref={stageRef}
      className="relative hidden lg:block"
      style={{ height: `${(count + 1) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-10 px-6">
          {/* Deck + rail */}
          <div className="col-span-5 flex gap-6">
            <div
              aria-hidden="true"
              className="relative w-px shrink-0 self-stretch bg-default-200"
            >
              <motion.div
                className="absolute inset-x-0 top-0 origin-top bg-primary"
                style={{ scaleY: scrollYProgress, height: '100%' }}
              />
            </div>

            <div className="flex-1 border-b border-default-200">
              {drivers.map((driver, i) => (
                <DeckRow
                  key={driver.variable}
                  driver={driver}
                  active={i === active}
                  onSelect={() => jumpTo(i)}
                />
              ))}
            </div>
          </div>

          {/* Evidence panel */}
          <div className="col-span-7 self-center">
            <div className="relative aspect-[4/3] w-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  style={{ zIndex: 1 }}
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)' }}
                  exit={{
                    zIndex: 0,
                    opacity: 0,
                    transition: { duration: 0.35, delay: 0.2 },
                  }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  <Wireframe
                    label={drivers[active].evidence}
                    ratio="landscape"
                    className="h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Accordion stage — mobile, and any width with reduced motion         */
/* ------------------------------------------------------------------ */

const AccordionStage = ({
  drivers,
  className = '',
}: {
  drivers: Driver[]
  className?: string
}) => {
  const [open, setOpen] = useState(0)

  return (
    <div className={`mx-auto max-w-6xl px-6 ${className}`}>
      <div className="border-b border-default-200">
        {drivers.map((driver, i) => {
          const isOpen = i === open
          return (
            <div key={driver.variable} className="border-t border-default-200">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`driver-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 py-5 text-start outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`block size-2 shrink-0 rounded-[2px] transition-colors duration-300 motion-reduce:transition-none ${
                      isOpen ? 'bg-primary' : 'bg-default-300'
                    }`}
                  />
                  <span
                    className={`text-lg font-medium ${
                      isOpen ? 'text-default-900' : 'text-default-500'
                    }`}
                  >
                    {driver.variable}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`text-default-400 transition-transform duration-300 motion-reduce:transition-none ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>

              <div
                id={`driver-panel-${i}`}
                role="region"
                aria-label={driver.variable}
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="space-y-5 pb-6 ps-5">
                    <p className="max-w-prose text-base leading-relaxed text-default-500">
                      {driver.effect}
                    </p>
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
/* Resolution band                                                     */
/* ------------------------------------------------------------------ */

const Resolution = ({
  resolutionTitle,
  production,
  resolutionClosing,
  primaryCta,
  secondaryCta,
}: Pick<
  TheProblemProps,
  'resolutionTitle' | 'production' | 'resolutionClosing' | 'primaryCta' | 'secondaryCta'
>) => {
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
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-6 lg:pb-32 lg:pt-20">
      <motion.div
        className="rounded-lg bg-default-950 px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-16"
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
      >
        <motion.h3
          variants={child}
          className="max-w-2xl text-2xl font-medium leading-snug sm:text-3xl"
        >
          {resolutionTitle}
        </motion.h3>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {production.map((item) => (
            <motion.div
              key={item.title}
              variants={child}
              className="border-t border-white/15 pt-5"
            >
              <h4 className="text-lg font-medium">{item.title}</h4>
              <p className="mt-3 text-base leading-relaxed text-white/60">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={child}
          className="mt-14 max-w-2xl text-lg leading-relaxed text-white/80"
        >
          {resolutionClosing}
        </motion.p>

        <motion.div variants={child} className="mt-8 flex flex-wrap gap-3">
          <ArrowButton
            href={primaryCta.href}
            label={primaryCta.label}
            variant="primary"
          />
          <ArrowButton
            href={secondaryCta.href}
            label={secondaryCta.label}
            variant="light"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const TheProblem = ({
  eyebrow,
  title,
  lede,
  drivers,
  resolutionTitle,
  production,
  resolutionClosing,
  primaryCta,
  secondaryCta,
}: TheProblemProps) => {
  const reduced = useReducedMotion()

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-24 lg:pb-20 lg:pt-32">
        <p className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.15em] text-default-500">
          <span aria-hidden="true" className="block size-2 rounded-[2px] bg-primary" />
          {eyebrow}
        </p>
        <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-tight text-default-900 sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-default-500">
          {lede}
        </p>
      </div>

      {/* Drivers: pinned deck on desktop, accordion on mobile.
          Reduced motion gets the accordion at every width. */}
      {reduced ? (
        <AccordionStage drivers={drivers} className="pb-20" />
      ) : (
        <>
          <PinnedStage drivers={drivers} />
          <AccordionStage drivers={drivers} className="pb-20 lg:hidden" />
        </>
      )}

      <Resolution
        resolutionTitle={resolutionTitle}
        production={production}
        resolutionClosing={resolutionClosing}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </section>
  )
}

export default TheProblem
