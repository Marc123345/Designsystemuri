'use client'

import CarouselCounter from '@/components/CarouselCounter'
import { ArrowButton } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import Image from 'next/image'
import { useState } from 'react'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

/**
 * The template's services slider: a numbered slide, copy down one side, a
 * photograph down the other, an oversized wordmark drifting behind, diamonds
 * for pagination.
 *
 * Used twice. On About it is "Inside the facility"; on Quality it is the four
 * QC controls. It was written for the first and generalised for the second
 * rather than copied, because two sliders that are meant to look identical stop
 * being identical the first time one of them is touched.
 *
 * A slide takes either a paragraph (`desc`) or a list of labelled points, and
 * either a photograph or a Wireframe naming the shot that is still outstanding.
 * The About slides use the first of each; Quality's use the second and third.
 *
 * ── Why About needed it ─────────────────────────────────────────────────────
 *
 * The band was a static contact sheet: one wide photograph with three smaller
 * ones under it and a paragraph alongside. It showed the room but it could not
 * say what happens in it — four pictures sharing a single caption means each
 * one is decoration for the other three.
 *
 * One operation per slide fixes that. Each frame gets its own number, its own
 * heading and its own sentence, so the section reads as a sequence of things
 * EID does to the material rather than a wall of interior photography. The
 * visitor advances it, which is the point: a buyer checking whether we can size
 * to their spec stops on the sieve slide and reads it.
 *
 * The copy is lifted from the four controls already documented on /quality.
 * Nothing here is a new claim — this is the same process stated in the About
 * page's voice, and the button sends anyone who wants the detail to the page
 * that carries it.
 *
 * The ghost wordmark behind is the reference's `.scrollbox`: oversized type
 * fading up into the ground, drifting against the slide direction. It sits
 * behind everything at -z-10 and is aria-hidden — it is texture, and the
 * heading it echoes is on the slide itself.
 */
type Slide = {
  n: string
  title: string
  /** A paragraph, or `points` — not both. */
  desc?: string
  /** Labelled points, for a slide carrying detail rather than a sentence. */
  points?: readonly (readonly [string, string])[]
  /** Qualifier under the heading, e.g. that a control is optional. */
  note?: string
  image?: string
  alt?: string
  /** Names the photograph still outstanding, when there is no `image`. */
  imageLabel?: string
}

const SplitSlider = ({
  eyebrow,
  slides,
  href,
  ctaLabel,
  dataNote = 'split-slider',
}: {
  /** Omitted where the section already carries a SectionHeading above it. */
  eyebrow?: string
  /** Retained for call-site compatibility; no longer rendered. */
  ghost?: string
  slides: readonly Slide[]
  href?: string
  ctaLabel?: string
  dataNote?: string
}) => {
  const [index, setIndex] = useState(0)

  return (
    <section data-note={dataNote} className="bg-default-100 relative isolate overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28">
      {/* The reference's scrollbox — a giant ghost word scrolling behind the
          section — is gone. Uri's V1 note calls out the moving-word animations
          twice ("reminds me of the stock market"), and this was the second of
          the two; the first was the Marquee strip, now removed site-wide.

          The `ghost` prop is kept on the signature and simply not rendered, so
          the nine call sites did not all have to change in the same pass. It
          reads as an unused prop deliberately, not as a leftover. */}

      <div className="container">
        <div className="flex items-center justify-between gap-6">
          {eyebrow ? (
            <div className="border-default-300 inline-flex w-fit items-center gap-1.5 border bg-white px-3.5 py-1.25">
              <span className="bg-primary-1 size-2"></span>
              <span className="text-default-900 text-sm">{eyebrow}</span>
            </div>
          ) : (
            <span />
          )}
          <CarouselCounter index={index} total={slides.length} />
        </div>

        <div className="mt-10 lg:mt-14">
          <Swiper
            className="eid-slider"
            modules={[Pagination, Keyboard, A11y]}
            grabCursor
            loop
            spaceBetween={40}
            slidesPerView={1}
            keyboard={{ enabled: true }}
            a11y={{ enabled: true }}
            pagination={{ clickable: true, bulletClass: 'eid-bullet', bulletActiveClass: 'eid-bullet-active' }}
            onSlideChange={(s) => setIndex(s.realIndex)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.n} className="h-auto!">
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  {/* Text first, as the reference has it. */}
                  <div className="lg:col-span-5">
                    <p className="text-primary-1 text-lg font-semibold">{slide.n}</p>

                    {/* A slide with points carries four of them plus their
                        bodies, so its heading steps down: at the paragraph
                        slides' size the copy below it never fits the frame. */}
                    <h3
                      className={`text-default-900 mt-5 leading-[1.08] font-bold ${
                        slide.points ? 'text-[clamp(1.6rem,2.6vw,2.15rem)]' : 'text-[clamp(1.9rem,4vw,3.25rem)]'
                      }`}
                    >
                      {slide.title}
                    </h3>

                    {slide.note && <p className="text-default-500 mt-2 text-sm italic">{slide.note}</p>}

                    {slide.desc && <p className="text-default-600 mt-5 text-base leading-relaxed">{slide.desc}</p>}

                    {slide.points && (
                      <ul className="mt-6 space-y-4">
                        {slide.points.map(([label, body]) => (
                          <li key={label} className="border-default-200 border-t pt-3.5">
                            <span className="text-default-900 block text-[0.95rem] font-semibold">{label}</span>
                            <span className="text-default-600 mt-1.5 block text-[0.95rem] leading-relaxed">{body}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {href && ctaLabel && (
                      <div className="mt-9">
                        <ArrowButton href={href} label={ctaLabel} variant="light" />
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-7">
                    <div className="rounded-card relative aspect-4/3 overflow-hidden lg:aspect-16/11">
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt={slide.alt ?? ''}
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-cover object-center"
                        />
                      ) : (
                        <Wireframe label={slide.imageLabel ?? ''} className="!aspect-auto h-full border-0" />
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default SplitSlider
