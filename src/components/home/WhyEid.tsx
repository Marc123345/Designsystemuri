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
    <section data-note="why-eid" className="relative size-full py-20 lg:py-30">
      <div className="relative z-10 container">
        <div className="border-default-300 inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
          <span className="bg-primary size-2"></span>
          <span className="text-default-900 text-sm">{eyebrow}</span>
        </div>

        <div className="mt-7.5 mb-12.5 grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <h2 className="text-[28px] font-bold md:text-[36px] lg:text-[42px]">{title}</h2>

          <div className="flex md:ms-auto">
            <button type="button" className="whyeid-prev static! flex" aria-label="Previous">
              <span className="group bg-default-200 text-default-900! hover:bg-default-300 inline-flex! size-12! cursor-pointer items-center justify-center transition-all">
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

            <button type="button" className="whyeid-next group static!" aria-label="Next">
              <span className="bg-default-200 text-default-900! hover:bg-default-300 inline-flex! size-12! cursor-pointer items-center justify-center transition-all">
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

        <Swiper modules={[Navigation, EffectFade]} loop speed={800} slidesPerView={1} effect="fade" fadeEffect={{ crossFade: true }} spaceBetween={30} allowTouchMove={false} navigation={{ nextEl: '.whyeid-next', prevEl: '.whyeid-prev' }}>
          {pillars.map((pillar) => (
            <SwiperSlide key={pillar.title}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="bg-default-950 from-default-950 via-default-950 to-primary-3 flex h-full flex-col gap-5 bg-linear-to-tr p-10">
                    <div className="text-primary-1 text-sm tracking-[0.2em] uppercase">{pillar.meta}</div>

                    <h3 className="text-2xl text-white lg:text-[28px]">{pillar.title}</h3>
                    <p className="text-default-200">{pillar.body}</p>

                    <div className="mt-auto pt-4">
                      <ArrowButton href={pillar.href} label={pillar.cta} variant="light" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  {/* group-hover scale is the template's move; the wireframe
stands in until EID supplies photography. */}
                  <div className="group relative h-full overflow-hidden">
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
