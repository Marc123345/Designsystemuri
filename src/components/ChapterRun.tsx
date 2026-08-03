'use client'

import Wireframe from '@/components/Wireframe'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Pinned chapter run — the site's one long-form scroll set piece.
 *
 * Each frame holds the full viewport: the run is `frames.length * 100vh` tall
 * and its inner shell is sticky, so scrolling advances through the frames one at
 * a time rather than scrolling past them.
 *
 * Per frame:
 *  - one standing background sits behind the whole run, not per frame;
 *  - a tint over it creeps in scale across that frame's own scroll slice, so a
 *    held frame still has movement in it;
 *  - a glow off to the right intensifies with progress;
 *  - the frame's own record sits faint opposite the copy, scaling up as its
 *    frame runs;
 *  - every line of copy is masked by an `overflow-hidden` wrapper and slides up
 *    from 100% on a stagger, which is what makes a change of frame read as a cut
 *    rather than a cross-fade;
 *  - past frames leave upward and future ones wait below, so the direction of
 *    travel always matches the direction you scrolled.
 *
 * Progress is scrubbed, not stepped, so the scale creep and the per-frame rail
 * track the scroll continuously. A side rail jumps straight to a frame.
 *
 * Lives here rather than inside one page's section because two pages now use it,
 * and "the same design and animation" stops being true the moment there are two
 * copies of it to keep in step.
 *
 * Desktop and motion only. Callers are responsible for the flat fallback: a
 * pinned sequence with no motion is just N screens of nothing happening.
 */
export type Frame = {
  eyebrow: string
  heading: string
  /** Body paragraphs, in order. */
  body?: string[]
  /** Quiet line on a rule, under the body. */
  accent?: string
  /** Label for the faint record opposite the copy. Omit for no record. */
  visual?: string
  /** Content for the right column at full opacity. Suppresses `visual`. */
  aside?: ReactNode
  /** Content under the body — buttons, usually. */
  footer?: ReactNode
}

const ChapterRun = ({ frames, note }: { frames: Frame[]; note?: string }) => {
  const stageRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const count = frames.length
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
    // nearest positioned ancestor, and these sections sit inside one, so using
    // it sent every jump back to the first frame.
    const stageTop = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: stageTop + (index / count) * el.offsetHeight + 8, behavior: 'smooth' })
  }

  return (
    <div ref={stageRef} data-note={note} className="relative hidden lg:block" style={{ height: `${count * 100}vh` }}>
      {/* The shell needs an opaque base: the per-frame tint runs at 0.75, and the
          background slot below is translucent, so without this the tint
          composites over the white page and the whole stage washes out. */}
      <div className="bg-default-950 sticky top-0 h-screen overflow-hidden">
        {/* One standing background behind every frame. EID has no footage or
            photography cleared, so this is the background image slot. */}
        <div aria-hidden="true" className="absolute inset-0">
          <Wireframe label="Background image — QC laboratory" ratio="wide" tone="dark" hideLabel className="!aspect-auto size-full !border-0" />
        </div>

        {frames.map((frame, index) => {
          const isActive = active === index
          const isPast = active > index
          const isFuture = active < index
          // 0 → 1 across this frame's own slice of the scroll.
          const seg = Math.max(0, Math.min(1, progress * count - index))
          // Frames alternate their tint so consecutive screens are not the same
          // flat colour.
          const tint = index % 2 === 0 ? 'var(--color-default-950)' : 'var(--color-primary-3)'

          // Masked line reveal: sits below the mask until its frame is live.
          const line = (delay: string) => ({
            transform: `translateY(${isFuture ? '100%' : '0'})`,
            transitionDelay: delay,
          })

          const copy = (
            <>
              <div className="overflow-hidden">
                <div className="transition-transform duration-1000 ease-out" style={line('100ms')}>
                  <div className="inline-flex items-center gap-1.5 border border-white/15 px-3.5 py-1.25">
                    <span className="bg-primary-1 size-2" />
                    <span className="text-sm text-white">{frame.eyebrow}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden">
                {/* The site's h2 — 28/36/42px, font-bold, Mona Sans and
                    line-height 1.3 from the base rule — in white for the dark
                    band. Motion is what makes the run read as a sequence; the
                    type does not need to. */}
                <h2 className="max-w-3xl text-[28px] font-bold text-white transition-transform duration-1000 ease-out md:text-[36px] lg:text-[42px]" style={line('200ms')}>
                  {frame.heading}
                </h2>
              </div>

              {frame.body?.length ? (
                <div className="mt-6 overflow-hidden">
                  <div className="space-y-4 transition-transform duration-1000 ease-out" style={line('400ms')}>
                    {frame.body.map((p) => (
                      <p key={p} className="text-default-200 text-lg leading-relaxed" style={{ maxWidth: '38rem' }}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}

              {frame.accent && (
                <div className="mt-5 overflow-hidden">
                  <div className="transition-transform duration-1000 ease-out" style={line('500ms')}>
                    <p className="border-primary-1 text-default-300 border-s-[3px] ps-4 text-base font-medium" style={{ maxWidth: '32rem' }}>
                      {frame.accent}
                    </p>
                  </div>
                </div>
              )}

              {frame.footer && (
                <div className="mt-8 overflow-hidden">
                  <div className="transition-transform duration-1000 ease-out" style={line('600ms')}>
                    {frame.footer}
                  </div>
                </div>
              )}
            </>
          )

          return (
            <div key={frame.heading} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}>
              <div className="relative size-full">
                {/* The tint was a flat fill, which read as printed colour laid
                    over the frame rather than as depth. It is now the same
                    diagonal ramp the rest of the site's dark bands use — the
                    frame's own tone into the deep blue — so the panel has a
                    near and a far side. */}
                <div
                  className="absolute inset-0 transition-transform duration-1000 ease-out"
                  style={{ background: `linear-gradient(to bottom right, ${tint} 0%, ${tint} 45%, var(--color-primary-3) 100%)`, opacity: 0.75, transform: `scale(${1 + seg * 0.05})` }}
                />
                {/* Two blooms rather than one, at opposite corners and different
                    scales, so the surface does not settle into a flat sheet. */}
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 45%, rgba(61, 82, 144, ${0.14 + seg * 0.1}) 0%, transparent 68%)` }} />
                <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 12% 88%, rgba(28, 40, 82, ${0.24 + seg * 0.1}) 0%, transparent 60%)` }} />
                {/* Vignette — holds the centre forward of the edges. */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 45%, transparent 32%, rgba(0,0,0,0.45) 100%)' }} />

                {/* The frame's own record, held faint, opposite the copy. Only
                    where the frame names one — inventing a caption for a
                    placeholder would put words in EID's mouth. */}
                {frame.visual && !frame.aside && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-[8%] hidden items-center justify-center transition-all duration-1000 ease-out lg:flex xl:right-[12%]"
                    style={{ opacity: isActive ? 0.22 : 0, transform: `translateY(-50%) scale(${0.8 + seg * 0.2})` }}
                  >
                    <Wireframe label={frame.visual} ratio="square" tone="dark" className="w-[22rem] xl:w-[26rem]" />
                  </div>
                )}

                <div className="relative z-10 flex h-full items-center" style={{ paddingTop: '6rem' }}>
                  <div className="container">
                    <div
                      className="transition-all duration-1000"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: `translateY(${isPast ? '-80px' : isFuture ? '80px' : '0'}) scale(${isActive ? 1 : 0.95})`,
                      }}
                    >
                      {frame.aside ? (
                        <div className="grid grid-cols-12 gap-10">
                          <div className="col-span-7">{copy}</div>
                          <div className="col-span-5 overflow-hidden">
                            <div className="transition-transform duration-1000 ease-out" style={line('480ms')}>
                              {frame.aside}
                            </div>
                          </div>
                        </div>
                      ) : (
                        copy
                      )}
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5">
                  <div className="from-primary to-primary-1 h-full bg-linear-to-r" style={{ transform: `scaleX(${seg})`, transformOrigin: 'left', transition: 'transform 100ms linear' }} />
                </div>
              </div>
            </div>
          )
        })}

        <div className="absolute end-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 sm:end-8 md:end-12">
          {frames.map((frame, index) => (
            <button
              key={frame.heading}
              type="button"
              onClick={() => jumpTo(index)}
              aria-label={frame.heading}
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

export default ChapterRun
