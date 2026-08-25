'use client'

import CarouselCounter from '@/components/CarouselCounter'
import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'
import { useId, useState } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageCard, type Card } from './sections'
import { ArrowButton, SectionHeading } from './ui'

/**
 * Swipeable version of the card grid, for the products a hub routes to.
 *
 * A hub carries between four and six products, which is exactly the count that
 * reads badly as a static grid — either a stranded row of one or a wall of six
 * competing for the same glance. Swiping puts them in a sequence the reader
 * controls, and the partial next card is what tells them there is one.
 *
 * Lives in its own file rather than in sections.tsx so Swiper is bundled only
 * on the routes that use it; sections.tsx is imported by every page.
 */
const CardCarousel = ({
  eyebrow,
  title,
  desc,
  items,
  ctaHref,
  ctaLabel,
  variant = 'text',
}: {
  eyebrow?: string
  title: string
  desc?: string
  items: Card[]
  ctaHref?: string
  ctaLabel?: string
  /** `image` uses the same hover-reveal tile as the card grids. */ variant?: 'text' | 'image'
}) => {
  // Swiper binds navigation by selector, so two carousels on one page would
  // otherwise share controls — whichever mounted last would win.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const prev = `cc-prev-${uid}`
  const next = `cc-next-${uid}`
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
    <button type="button" className={`${dir === 'prev' ? prev : next} group static! flex`} aria-label={dir === 'prev' ? 'Previous products' : 'Next products'}>
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
    <section className="py-20 lg:py-30">
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
            // The fractional counts leave the next card partly visible, which
            // is what signals the row can be swiped at all.
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
              <SwiperSlide key={item.title} className="h-auto!">
                {variant === 'image' ? (
                  // A slide at slidesPerView 3 is about as wide as a 3-across
                  // grid cell, so it takes the same `lg` tile and the cards match
                  // across the grids and the carousels.
                  <ImageCard item={item} size="lg" className="border" />
                ) : (
                  <Link href={item.href} className="group border-default-200 hover:border-primary hover:bg-default-50 rounded-card flex h-full flex-col gap-5 border p-8 transition-colors">
                    <Icon icon={item.icon} className="text-primary size-10" />
                    <h3 className="group-hover:text-primary text-xl">{item.title}</h3>
                    <p className="text-default-600 text-base">{item.desc}</p>
                    <span className="text-primary mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold">
                      Learn more
                      <Icon icon="tabler:arrow-narrow-right" className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {ctaHref && ctaLabel && (
          <div className="mt-12">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="dark" />
          </div>
        )}
      </div>
    </section>
  )
}

export default CardCarousel
