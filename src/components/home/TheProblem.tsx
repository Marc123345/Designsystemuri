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
 * Interaction (unchanged from the rework):
 * 1. All four drivers stay on screen as a QC-ledger deck; the active row
 * opens to show its effect while the others compress to their name.
 * 2. Scroll drives a continuous progress rail beside the deck (scrubbed,
 * not stepped). Rows are also clickable and jump to their segment.
 * 3. The evidence panel swaps with a layered transition: incoming record
 * clips in from the top over the outgoing one, outgoing fades under it.
 * 4. Mobile and reduced-motion get a single-open accordion with the
 * evidence record inside each expanded row. Keyboard + aria wired.
 * 5. Resolution sits on a dark band so problem -> resolution reads as a
 * register change, with a once-only staggered reveal.
 */

import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import { Icon } from '@iconify/react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'

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
/* Eyebrow — the site's bordered pill                                  */
/* ------------------------------------------------------------------ */

const Eyebrow = ({ label, dark = false }: { label: string; dark?: boolean }) => (
  <div className={`inline-flex items-center gap-1.5 border px-3.5 py-1.25 ${dark ? 'border-white/15' : 'border-default-300 bg-white'}`}>
    <span className={`size-2 ${dark ? 'bg-primary-1' : 'bg-primary'}`}></span>
    <span className={`text-sm ${dark ? 'text-white' : 'text-default-900'}`}>{label}</span>
  </div>
)

/* ------------------------------------------------------------------ */
/* Deck row — desktop pinned stage                                     */
/* ------------------------------------------------------------------ */

const DeckRow = ({ driver, active, onSelect }: { driver: Driver; active: boolean; onSelect: () => void }) => (
  <button type="button" onClick={onSelect} aria-current={active || undefined} className="group/row border-default-200 focus-visible:ring-primary/60 w-full border-t py-5 text-start outline-none focus-visible:ring-2">
    <span className="flex items-baseline gap-3">
      <span aria-hidden="true" className={`block size-2 shrink-0 self-center transition-colors duration-300 ${active ? 'bg-primary' : 'bg-default-300 group-hover/row:bg-default-400'}`} />
      <span className={`text-lg font-bold transition-colors duration-300 sm:text-xl ${active ? 'text-default-900' : 'text-default-400 group-hover/row:text-default-600'}`}>{driver.variable}</span>
    </span>

    {/* Progressive disclosure: 0fr -> 1fr, no height measuring needed */}
    <span className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none" style={{ gridTemplateRows: active ? '1fr' : '0fr' }}>
      <span className="block overflow-hidden">
        <span className={`text-default-600 block max-w-md ps-5 pt-3 text-base leading-relaxed transition-opacity delay-100 duration-300 motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-0'}`}>{driver.effect}</span>
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
    <div ref={stageRef} className="relative hidden lg:block" style={{ height: `${(count + 1) * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container grid w-full grid-cols-12 items-center gap-10">
          {/* Deck + rail */}
          <div className="col-span-5 flex gap-6">
            <div aria-hidden="true" className="bg-default-200 relative w-0.5 shrink-0 self-stretch">
              <motion.div className="bg-primary absolute inset-x-0 top-0 origin-top" style={{ scaleY: scrollYProgress, height: '100%' }} />
            </div>

            <div className="border-default-200 flex-1 border-b">
              {drivers.map((driver, i) => (
                <DeckRow key={driver.variable} driver={driver} active={i === active} onSelect={() => jumpTo(i)} />
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
                  <Wireframe label={drivers[active].evidence} ratio="landscape" className="h-full" />
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

const Resolution = ({ resolutionTitle, production, resolutionClosing, primaryCta, secondaryCta }: Pick<TheProblemProps, 'resolutionTitle' | 'production' | 'resolutionClosing' | 'primaryCta' | 'secondaryCta'>) => {
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
    <section data-note="problem" className="relative size-full overflow-hidden py-20 text-white lg:py-37.5">
      {/* Signature dark band: gradient base + noise overlay, matching
          DarkFeatureList so the register change reads as one system. */}
      <div className="from-default-950 via-default-950 to-primary-3 absolute inset-0 bg-linear-to-br"></div>
      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-position-[50%] bg-repeat opacity-6"></div>

      <motion.div className="relative z-10 container" variants={parent} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15% 0px' }}>
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

const TheProblem = ({ eyebrow, title, lede, drivers, resolutionTitle, production, resolutionClosing, primaryCta, secondaryCta }: TheProblemProps) => {
  const reduced = useReducedMotion()

  return (
    <section className="bg-white">
      {/* Header */}
      <div className="container pt-20 pb-12 lg:pt-30 lg:pb-16">
        <Eyebrow label={eyebrow} />
        <h2 className="text-default-900 mt-4 max-w-3xl text-[28px] leading-tight font-bold md:text-[36px] lg:text-[42px]">{title}</h2>
        <p className="text-default-600 mt-6 max-w-2xl text-lg leading-relaxed">{lede}</p>
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

      <Resolution resolutionTitle={resolutionTitle} production={production} resolutionClosing={resolutionClosing} primaryCta={primaryCta} secondaryCta={secondaryCta} />
    </section>
  )
}

export default TheProblem
