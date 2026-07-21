'use client'

import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

export type Driver = {
  variable: string
  effect: string
  /** The document or instrument that proves this one. Changes with the step. */
  evidence: string
}

/**
 * The problem section, written for a tool maker qualifying a supplier.
 *
 * The four variables are disclosed one at a time against a pinned stage: the
 * section holds while you scroll, each parameter takes its turn, and the
 * evidence panel changes with it. One parameter at a time is the point — given
 * a table, this reader skims four rows; given one, they read it, and the
 * consequence lands before the next arrives.
 *
 * Three things keep it from being decoration:
 * - Every row is in the DOM and legible without JavaScript. The scroll only
 *   changes emphasis, so nothing is gated behind an effect that may not run.
 * - Below lg, and whenever prefers-reduced-motion is set, the stage is not
 *   pinned at all: the list renders in full, in order, with no hijack.
 * - The evidence label moves with the parameter, so the panel is making an
 *   argument rather than animating for its own sake.
 */
const TheProblem = ({
  eyebrow,
  title,
  lede,
  drivers,
  driversNote,
  resolutionTitle,
  production,
  resolutionClosing,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string
  title: string
  lede: string
  drivers: Driver[]
  driversNote: string
  resolutionTitle: string
  production: { title: string; body: string }[]
  resolutionClosing: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
}) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const wide = window.matchMedia('(min-width: 1024px)')

    const decide = () => setPinned(motionOk.matches && wide.matches)
    decide()
    motionOk.addEventListener('change', decide)
    wide.addEventListener('change', decide)
    return () => {
      motionOk.removeEventListener('change', decide)
      wide.removeEventListener('change', decide)
    }
  }, [])

  useEffect(() => {
    if (!pinned) {
      setActive(0)
      return
    }

    const onScroll = () => {
      const el = stageRef.current
      if (!el) return

      // How far through the stage the viewport has travelled, 0 → 1. The stage
      // is taller than the viewport by exactly the scroll distance we consume.
      const rect = el.getBoundingClientRect()
      const travel = el.offsetHeight - window.innerHeight
      const progress = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0

      // Bias slightly forward so the last step is reached before the stage
      // releases, rather than exactly on the final pixel.
      const index = Math.min(Math.floor(progress * drivers.length * 1.04), drivers.length - 1)
      setActive(index)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pinned, drivers.length])

  const current = drivers[active] ?? drivers[0]

  return (
    // No `overflow-hidden` here: it silently breaks `position: sticky` on any
    // descendant, so the stage below would scroll past instead of pinning. The
    // backdrop layers are inset-0 and clip themselves.
    <section className="relative size-full bg-default-900">
      <div className="absolute inset-0 z-1 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-full w-0.5 border border-dashed border-default-100 opacity-7"></div>
        ))}
      </div>

      <div className="container relative z-10 lg:pt-25 pt-20">
        <div className="flex lg:flex-row flex-col items-start justify-between gap-12.5 xl:gap-20">
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
      </div>

      {/* The stage. Its height is what the pinned panel scrolls through; when
          not pinned it collapses to the natural height of the list. */}
      <div
        ref={stageRef}
        className="relative z-10"
        style={pinned ? { height: `${(drivers.length + 1) * 90}vh` } : undefined}
      >
        <div className={pinned ? 'sticky top-0 flex h-screen items-center' : ''}>
          <div className="container w-full lg:py-0 py-16">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* The parameters. All four always rendered; only emphasis moves. */}
              <div className="lg:col-span-6">
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-default-400">
                    What drifts
                  </span>
                  {pinned && (
                    <span className="font-mono text-xs text-white/40">
                      {String(active + 1).padStart(2, '0')} / {String(drivers.length).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <ul className="space-y-1">
                  {drivers.map((d, i) => {
                    const isActive = !pinned || i === active
                    return (
                      <li
                        key={d.variable}
                        aria-current={pinned && i === active ? 'true' : undefined}
                        className={`border-s-2 ps-5 transition-all duration-500 ${
                          pinned && i === active
                            ? 'border-primary-1 py-4'
                            : pinned
                              ? 'border-white/10 py-3'
                              : 'border-primary-1 py-4'
                        }`}
                      >
                        <div
                          className={`text-lg transition-colors duration-500 lg:text-2xl ${
                            isActive ? 'text-white' : 'text-white/30'
                          }`}
                        >
                          {d.variable}
                        </div>

                        {/* When the stage is not pinned every consequence shows,
                            so the section still reads top to bottom. */}
                        {!pinned && <p className="mt-2 text-base text-default-400">{d.effect}</p>}
                      </li>
                    )
                  })}
                </ul>

                <p className="mt-10 font-mono text-sm text-white/40">{driversNote}</p>
              </div>

              {/* The consequence and its evidence, both changing with the step. */}
              {pinned && (
                <div className="lg:col-span-6">
                  <div key={current.variable} className="animate-[fadeUp_.5s_ease-out]">
                    <div className="mb-4 text-xs uppercase tracking-[0.15em] text-default-400">
                      What moves on your line
                    </div>
                    <p className="mb-10 text-xl text-white lg:text-2xl">{current.effect}</p>
                    <Wireframe label={current.evidence} ratio="wide" tone="dark" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container relative z-10 md:pb-25 pb-20 lg:pt-10 pt-0">
        <div className="border-t border-white/10 pt-14">
          <h3 className="mb-10 lg:text-[32px] md:text-[28px] text-2xl font-semibold text-white lg:max-w-3xl">
            {resolutionTitle}
          </h3>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {production.map((block) => (
              <div key={block.title} className="border-t-2 border-primary pt-5">
                <h4 className="mb-3 text-lg text-white">{block.title}</h4>
                <p className="text-base text-default-400">{block.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex lg:flex-row flex-col lg:items-center items-start gap-7.5">
            <p className="text-lg text-white lg:max-w-2xl">{resolutionClosing}</p>

            {/* The secondary is `light`, not `dark`: a dark shell on this dark
                band renders as an invisible button with a floating badge. */}
            <div className="flex grow flex-wrap gap-4 lg:justify-end">
              <ArrowButton href={primaryCta.href} label={primaryCta.label} />
              <ArrowButton href={secondaryCta.href} label={secondaryCta.label} variant="light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheProblem
