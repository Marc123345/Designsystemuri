'use client'

import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export type Driver = {
  variable: string
  effect: string
  /** The document or instrument that proves this one. Changes with the step. */
  evidence: string
}

/** The system's easing — the same curve the buttons slide on. */
const EASE = 'cubic-bezier(0.19,1,0.22,1)'

/**
 * Reveals its target once, when it first enters the viewport.
 *
 * Returns `true` immediately when motion is not wanted or IntersectionObserver
 * is unavailable, so the content is never left hidden by a effect that did not
 * run. useLayoutEffect sets the starting state before paint, so there is no
 * flash of the revealed state on hydration.
 */
const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(true)

  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return

    const el = ref.current
    if (!el) return

    setShown(false)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, shown }
}

/**
 * The problem section, written for a tool maker qualifying a supplier.
 *
 * The four variables are disclosed one at a time against a pinned stage, then
 * the section hands off to the production model that answers them.
 *
 * On smoothness: the scroll handler is rAF-throttled and writes the progress
 * rail straight to the DOM, so a scroll frame never triggers a React render —
 * only crossing a step boundary does. The panels are stacked in one grid cell
 * and crossfade rather than remounting, so nothing reflows mid-transition.
 *
 * On the hand-off: the stage releases into the resolution, whose heading,
 * three production blocks and closing line stagger in as they enter view, so
 * the answer arrives as a sequence rather than all at once under the fold.
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
  const locale = useLocale() as Locale
  const stageRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)

  const resolution = useReveal<HTMLDivElement>()

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
      activeRef.current = 0
      return
    }

    let frame = 0

    const measure = () => {
      frame = 0
      const el = stageRef.current
      if (!el) return

      const travel = el.offsetHeight - window.innerHeight
      const progress =
        travel > 0 ? Math.min(Math.max(-el.getBoundingClientRect().top / travel, 0), 1) : 0

      // The rail moves every frame, so it is written straight to the node.
      // Routing it through state would re-render the section on every scroll.
      if (railRef.current) railRef.current.style.transform = `scaleY(${progress})`

      const index = Math.min(Math.floor(progress * drivers.length * 1.04), drivers.length - 1)
      if (index !== activeRef.current) {
        activeRef.current = index
        setActive(index)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pinned, drivers.length])

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

      <div
        ref={stageRef}
        className="relative z-10"
        style={pinned ? { height: `${(drivers.length + 1) * 90}vh` } : undefined}
      >
        <div className={pinned ? 'sticky top-0 flex h-screen items-center' : ''}>
          <div className="container w-full lg:py-0 py-16">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="mb-8 flex items-baseline gap-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-default-400">
                    {t(locale, 'What drifts')}
                  </span>
                  {pinned && (
                    <span className="font-mono text-xs text-white/40">
                      {String(active + 1).padStart(2, '0')} / {String(drivers.length).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="relative">
                  {/* Continuous rail behind the list. It fills with scroll
                      rather than snapping per step, which is what carries the
                      motion between one parameter and the next. */}
                  {pinned && (
                    <>
                      <div className="absolute inset-y-0 start-0 w-0.5 bg-white/10" />
                      <div
                        ref={railRef}
                        className="absolute inset-y-0 start-0 w-0.5 origin-top bg-primary-1"
                        style={{ transform: 'scaleY(0)' }}
                      />
                    </>
                  )}

                  <ul className={pinned ? 'ps-5' : ''}>
                    {drivers.map((d, i) => {
                      const isActive = !pinned || i === active
                      return (
                        <li
                          key={d.variable}
                          aria-current={pinned && i === active ? 'true' : undefined}
                          className={pinned ? 'py-3.5' : 'border-s-2 border-primary-1 py-4 ps-5'}
                        >
                          <div
                            className={`text-lg lg:text-2xl ${isActive ? 'text-white' : 'text-white/25'}`}
                            style={{ transition: `color .6s ${EASE}, opacity .6s ${EASE}` }}
                          >
                            {d.variable}
                          </div>

                          {!pinned && <p className="mt-2 text-base text-default-400">{d.effect}</p>}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <p className="mt-10 font-mono text-sm text-white/40">{driversNote}</p>
              </div>

              {/* Every step is mounted and stacked in one grid cell, so the
                  change is a crossfade with no reflow and no remount. */}
              {pinned && (
                <div className="lg:col-span-6">
                  <div className="grid">
                    {drivers.map((d, i) => (
                      <div
                        key={d.variable}
                        aria-hidden={i !== active}
                        className="[grid-area:1/1]"
                        style={{
                          opacity: i === active ? 1 : 0,
                          transform: i === active ? 'none' : 'translateY(14px)',
                          transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
                          pointerEvents: i === active ? 'auto' : 'none',
                        }}
                      >
                        <div className="mb-4 text-xs uppercase tracking-[0.15em] text-default-400">
                          {t(locale, 'What moves on your line')}
                        </div>
                        <p className="mb-10 text-xl text-white lg:text-2xl">{d.effect}</p>
                        <Wireframe label={d.evidence} ratio="wide" tone="dark" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The hand-off. Heading, blocks and closing stagger in on entry so the
          answer arrives as a sequence rather than all at once. */}
      <div ref={resolution.ref} className="container relative z-10 md:pb-25 pb-20 lg:pt-10 pt-0">
        <div
          className="border-t border-white/10 pt-14"
          style={{
            opacity: resolution.shown ? 1 : 0,
            transition: `opacity .8s ${EASE}`,
          }}
        >
          <h3
            className="mb-10 lg:text-[32px] md:text-[28px] text-2xl font-semibold text-white lg:max-w-3xl"
            style={{
              opacity: resolution.shown ? 1 : 0,
              transform: resolution.shown ? 'none' : 'translateY(18px)',
              transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
            }}
          >
            {resolutionTitle}
          </h3>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {production.map((block, i) => (
              <div
                key={block.title}
                className="border-t-2 border-primary pt-5"
                style={{
                  opacity: resolution.shown ? 1 : 0,
                  transform: resolution.shown ? 'none' : 'translateY(18px)',
                  transition: `opacity .7s ${EASE} ${120 + i * 110}ms, transform .7s ${EASE} ${120 + i * 110}ms`,
                }}
              >
                <h4 className="mb-3 text-lg text-white">{block.title}</h4>
                <p className="text-base text-default-400">{block.body}</p>
              </div>
            ))}
          </div>

          <div
            className="mt-12 flex lg:flex-row flex-col lg:items-center items-start gap-7.5"
            style={{
              opacity: resolution.shown ? 1 : 0,
              transform: resolution.shown ? 'none' : 'translateY(18px)',
              transition: `opacity .7s ${EASE} 480ms, transform .7s ${EASE} 480ms`,
            }}
          >
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
