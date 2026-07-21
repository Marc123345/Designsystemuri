'use client'

import { ArrowButton } from '@/components/ui'
import { site } from '@/lib/site'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export type HeroSlide = { eyebrow: string; title: string; desc: string }

/**
 * Three slides, because the positioning takes three beats to land: what we
 * make, that we control production, and that re-orders match. Fade rather than
 * slide so the static furniture around it (stats, coordinates) stays put.
 */
const Hero = ({
  slides,
  metaStats,
}: {
  slides: HeroSlide[]
  metaStats: { value: string; label: string }[]
}) => {
  return (
    <section className="relative size-full overflow-hidden lg:pt-50 pt-35">
      <div className="container-full relative z-10">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          autoplay={{ delay: 6500, disableOnInteraction: false }}
          allowTouchMove={false}
          className="mb-16"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="grid xl:grid-cols-4 items-end xl:gap-20 gap-12.5">
                <div className="xl:col-span-3">
                  <div className="inline-flex items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25">
                    <span className="size-2 bg-primary"></span>
                    <span className="text-sm text-default-900">{slide.eyebrow}</span>
                  </div>

                  <h1 className="mt-4 font-bold lg:text-6xl md:text-[48px] text-[34px]">
                    {slide.title}
                  </h1>
                </div>

                <div>
                  <p className="mb-7.5 text-base">{slide.desc}</p>
                  <ArrowButton href="/products" label="Browse the Full Range" variant="dark" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Static furniture: stats stay put while the message rotates. */}
        <div className="grid md:grid-cols-3 grid-cols-1 border-t border-default-200">
          {metaStats.map((stat) => (
            <div key={stat.label} className="border-b border-default-200 py-7 md:border-b-0">
              <div className="text-3xl font-bold text-default-900">{stat.value}</div>
              <div className="mt-1 text-sm text-default-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-10 flex justify-between pt-6">
          <div className="text-sm text-default-900">Based in: {site.location}</div>
          <a href="#footer" className="text-center text-sm uppercase transition-colors hover:text-primary">
            Scroll Down
          </a>
          <div className="hidden text-sm text-default-900 md:block">ISO 9001 Certified</div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-stretch justify-between md:justify-center gap-0 md:gap-45 lg:gap-75 xl:gap-80.5">
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
        <div className="h-full w-0.5 border border-dashed border-default-900 opacity-7"></div>
      </div>

      <div className="absolute inset-0 size-full bg-[url(../images/bg-noice.gif)] bg-auto bg-repeat bg-position-[50%] object-cover opacity-4"></div>
    </section>
  )
}

export default Hero
