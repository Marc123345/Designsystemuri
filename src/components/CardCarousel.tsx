'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'
import { useId } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Card } from './sections'
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
}: {
  eyebrow?: string
  title: string
  desc?: string
  items: Card[]
  ctaHref?: string
  ctaLabel?: string
}) => {
  // Swiper binds navigation by selector, so two carousels on one page would
  // otherwise share controls — whichever mounted last would win.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const prev = `cc-prev-${uid}`
  const next = `cc-next-${uid}`

  const arrow = (dir: 'prev' | 'next') => (
    <button
      type="button"
      className={`${dir === 'prev' ? prev : next} static! group flex`}
      aria-label={dir === 'prev' ? 'Previous products' : 'Next products'}
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
    <section className="lg:py-30 py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 grid-cols-1 items-end gap-8">
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
            // The fractional counts leave the next card partly visible, which
            // is what signals the row can be swiped at all.
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 2.1 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{ nextEl: `.${next}`, prevEl: `.${prev}` }}
            a11y={{ enabled: true }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.href} className="h-auto!">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-5 rounded-md border border-default-200 p-8 transition-colors hover:border-primary hover:bg-default-50"
                >
                  <Icon icon={item.icon} className="size-10 text-primary" />
                  <h3 className="text-xl group-hover:text-primary">{item.title}</h3>
                  <p className="text-base text-default-600">{item.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-primary">
                    Learn more
                    <Icon
                      icon="tabler:arrow-narrow-right"
                      className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
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
