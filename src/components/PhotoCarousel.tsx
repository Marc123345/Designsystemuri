'use client'

import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import { useId } from 'react'
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
const PhotoCarousel = ({
  eyebrow,
  title,
  desc,
  items,
}: {
  eyebrow?: string
  title: string
  desc?: string
  items: { label: string; ratio?: 'landscape' | 'wide' | 'portrait' | 'square' }[]
}) => {
  const locale = useLocale() as Locale
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const prev = `pc-prev-${uid}`
  const next = `pc-next-${uid}`

  const arrow = (dir: 'prev' | 'next') => (
    <button
      type="button"
      className={`${dir === 'prev' ? prev : next} static! group flex`}
      aria-label={dir === 'prev' ? t(locale, 'Previous photos') : t(locale, 'Next photos')}
    >
      <span
        className={`inline-flex! size-12! cursor-pointer items-center justify-center rounded bg-default-100 text-default-900! transition-all hover:bg-default-200 ${
          dir === 'prev' ? 'rounded-es-2xl' : 'rounded-ee-2xl'
        }`}
      >
        <span className="relative block overflow-hidden">
          <span
            className={`block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${
              dir === 'prev' ? 'group-hover:-translate-x-7' : 'group-hover:translate-x-7'
            }`}
          >
            <Icon
              icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'}
              className="flex size-6"
            />
          </span>
          <span
            className={`absolute top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] ${
              dir === 'prev' ? 'start-7 group-hover:start-0' : 'end-7 group-hover:end-0'
            }`}
          >
            <Icon
              icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'}
              className="flex size-6"
            />
          </span>
        </span>
      </span>
    </button>
  )

  return (
    <section className="lg:py-24 py-16">
      <div className="container">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />
          <div className="flex md:ms-auto">
            {arrow('prev')}
            {arrow('next')}
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
