'use client'

import Wireframe from '@/components/Wireframe'
import { ArrowButton } from '@/components/ui'
import { Icon } from '@iconify/react'
import { EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export type Pillar = {
  meta: string
  title: string
  body: string
  cta: string
  href: string
}

/**
 * The template's RealResults layout: a fade-through slider where each slide is
 * a dark copy panel beside a large visual, driven by prev/next controls in the
 * section header rather than dots.
 *
 * One pillar at a time replaces the three-column grid. The pillars are the
 * positioning argument, and a reader given three columns skims all three;
 * given one, they read it.
 *
 * Navigation elements are scoped with a component-specific class, because
 * Swiper resolves `navigation` by selector and a bare .swiper-button-next
 * would bind whichever instance mounted last if another slider is ever added.
 */
const WhyEid = ({ eyebrow, title, pillars }: { eyebrow: string; title: string; pillars: Pillar[] }) => {
  return (
    <section className="relative size-full lg:py-30 py-20">
      <div className="container relative z-10">
        <div className="inline-flex items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25">
          <span className="size-2 bg-primary"></span>
          <span className="text-sm text-default-900">{eyebrow}</span>
        </div>

        <div className="mt-7.5 mb-12.5 grid md:grid-cols-2 grid-cols-1 items-end gap-8">
          <h2 className="lg:text-[42px] md:text-[36px] text-[28px] font-bold">{title}</h2>

          <div className="flex md:ms-auto">
            <button
              type="button"
              className="whyeid-prev static! flex"
              aria-label="Previous"
            >
              <span className="group inline-flex! size-12! cursor-pointer items-center justify-center rounded rounded-es-2xl bg-default-200 text-default-900! transition-all hover:bg-default-300">
                <span className="relative block overflow-hidden">
                  <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-7">
                    <Icon icon="tabler:arrow-narrow-left" className="flex size-6" />
                  </span>
                  <span className="absolute start-7 top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:start-0">
                    <Icon icon="tabler:arrow-narrow-left" className="flex size-6" />
                  </span>
                </span>
              </span>
            </button>

            <button type="button" className="whyeid-next static! group" aria-label="Next">
              <span className="inline-flex! size-12! cursor-pointer items-center justify-center rounded rounded-ee-2xl bg-default-200 text-default-900! transition-all hover:bg-default-300">
                <span className="relative block overflow-hidden">
                  <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-7">
                    <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
                  </span>
                  <span className="absolute end-7 top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:end-0">
                    <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
                  </span>
                </span>
              </span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, EffectFade]}
          loop
          speed={800}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={30}
          allowTouchMove={false}
          navigation={{ nextEl: '.whyeid-next', prevEl: '.whyeid-prev' }}
        >
          {pillars.map((pillar) => (
            <SwiperSlide key={pillar.title}>
              <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-5">
                <div className="lg:col-span-2">
                  <div className="flex h-full flex-col gap-5 rounded-md bg-default-950 bg-linear-to-tr from-default-950 via-default-950 to-primary-3 p-10">
                    <div className="text-sm uppercase tracking-[0.2em] text-primary-1">
                      {pillar.meta}
                    </div>

                    <h3 className="lg:text-[28px] text-2xl text-white">{pillar.title}</h3>
                    <p className="text-default-200">{pillar.body}</p>

                    <div className="mt-auto pt-4">
                      <ArrowButton href={pillar.href} label={pillar.cta} variant="light" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  {/* group-hover scale is the template's move; the wireframe
                      stands in until EID supplies photography. */}
                  <div className="group relative h-full overflow-hidden rounded-md">
                    <div className="transition-transform duration-500 group-hover:scale-105">
                      <Wireframe label={`${pillar.meta} — supporting image`} ratio="wide" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default WhyEid
