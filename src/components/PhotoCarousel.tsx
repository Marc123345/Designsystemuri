'use client'

import CarouselCounter from '@/components/CarouselCounter'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import { useId, useState } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SectionHeading } from './ui'

/**
 * Swipeable row of images, for the QC-step photos on the Quality page. Same
 * Swiper setup and prev/next chrome as CardCarousel, but each slide is a
 * Wireframe (or, once EID supplies the photography, a real image) rather than a
 * link card. Until the photos land, the labelled wireframes read as a sequence
 * the visitor controls instead of a static wall of empty slots.
 */
const PhotoCarousel = ({ eyebrow, title, desc, items }: { eyebrow?: string; title: string; desc?: string; items: { label: string; ratio?: 'landscape' | 'wide' | 'portrait' | 'square' }[] }) => {
  const locale = useLocale() as Locale
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const prev = `pc-prev-${uid}`
  const next = `pc-next-${uid}`
  // snapIndex / snapGrid, not activeIndex / items.length: at three slides per
  // view the carousel has fewer stops than slides, so counting slides would
  // show a total the counter can never reach. snapGrid is Swiper's own list of
  // stop positions and re-derives itself on breakpoint change.
  const [index, setIndex] = useState(0)
  const [steps, setSteps] = useState(1)
  const track = (s: { snapIndex: number; snapGrid: number[] }) => {
    setIndex(s.snapIndex)
    setSteps(Math.max(1, s.snapGrid.length))
  }

  const arrow = (dir: 'prev' | 'next') => (
    <button type="button" className={`${dir === 'prev' ? prev : next} group static! flex`} aria-label={dir === 'prev' ? t(locale, 'Previous photos') : t(locale, 'Next photos')}>
      <span className={`bg-default-100 text-default-900! hover:bg-default-200 inline-flex! size-12! cursor-pointer items-center justify-center transition-all ${dir === 'prev' ? '' : ''}`}>
        <span className="rounded-card relative block overflow-hidden">
          <span className={`block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${dir === 'prev' ? 'group-hover:-translate-x-7' : 'group-hover:translate-x-7'}`}>
            <Icon icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'} className="flex size-6" />
          </span>
          <span className={`absolute top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${dir === 'prev' ? 'start-7 group-hover:start-0' : 'end-7 group-hover:end-0'}`}>
            <Icon icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'} className="flex size-6" />
          </span>
        </span>
      </span>
    </button>
  )

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
          <div className="flex items-center gap-6 md:ms-auto">
            <div className="flex">
              {arrow('prev')}
              {arrow('next')}
            </div>
            <CarouselCounter index={index} total={steps} />
          </div>
        </div>

        <div className="mt-14">
          <Swiper
            modules={[Navigation, A11y]}
            grabCursor
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ nextEl: `.${next}`, prevEl: `.${prev}` }}
            a11y={{ enabled: true }}
            onSlideChange={track}
            onSnapIndexChange={track}
            onResize={track}
            onAfterInit={track}
          >
            {items.map((item) => (
              <SwiperSlide key={item.label} className="h-auto!">
                <Wireframe label={item.label} ratio={item.ratio ?? 'landscape'} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default PhotoCarousel
