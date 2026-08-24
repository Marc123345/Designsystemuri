'use client'

import CarouselCounter from '@/components/CarouselCounter'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { A11y, Keyboard, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

/**
 * "Inside the facility", built on the template's services slider.
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
  desc: string
  image: string
  alt: string
}

const FacilitySlider = ({ eyebrow, ghost, slides, href }: { eyebrow: string; ghost: string; slides: Slide[]; href: string }) => {
  const locale = useLocale() as Locale
  const [index, setIndex] = useState(0)

  return (
    <section data-note="facility" className="bg-default-100 relative isolate overflow-hidden pt-16 pb-20 lg:pt-20 lg:pb-28">
      {/* The reference's scrollbox. Two copies so the loop has no seam; the
          second is hidden from the accessibility tree along with the first. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-4 -z-10 flex w-full flex-nowrap select-none lg:top-6"
        aria-hidden
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            style={{ animationDuration: '70s', fontFamily: 'var(--font-heading)' }}
            className="infinite-scroll-inverse flex shrink-0 items-center gap-12 pe-12 text-[clamp(3rem,8vw,7.5rem)] leading-none font-bold whitespace-nowrap uppercase motion-reduce:animate-none"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="bg-linear-to-b from-transparent to-white bg-clip-text text-transparent"
              >
                {ghost}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="container">
        <div className="flex items-center justify-between gap-6">
          <div className="inline-flex w-fit items-center gap-1.5 border border-default-300 bg-white px-3.5 py-1.25">
            <span className="bg-primary-1 size-2"></span>
            <span className="text-default-900 text-sm">{eyebrow}</span>
          </div>
          <CarouselCounter index={index} total={slides.length} />
        </div>

        <div className="mt-10 lg:mt-14">
          <Swiper
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

                    <h3 className="text-default-900 mt-5 text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.08] font-bold">
                      {slide.title}
                    </h3>

                    <p className="text-default-600 mt-5 text-base leading-relaxed">{slide.desc}</p>

                    <div className="mt-9">
                      <ArrowButton href={href} label={t(locale, 'How we test it')} variant="light" />
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="relative aspect-4/3 overflow-hidden lg:aspect-16/11">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover object-center"
                      />
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

export default FacilitySlider
