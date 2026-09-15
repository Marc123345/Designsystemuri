'use client'

import CarouselCounter from '@/components/CarouselCounter'
import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'
import { useId, useState } from 'react'
import { A11y, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageCard, type Card } from './sections'
import { ArrowButton, SectionHeading } from './ui'

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
  variant?: 'text' | 'image'
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const prev = `cc-prev-${uid}`
  const next = `cc-next-${uid}`
  const [index, setIndex] = useState(0)
  const [steps, setSteps] = useState(1)

  const track = (s: { snapIndex: number; snapGrid: number[] }) => {
    setIndex(s.snapIndex)
    setSteps(Math.max(1, s.snapGrid.length))
  }

  const arrow = (dir: 'prev' | 'next') => (
    <button type="button" className={`${dir === 'prev' ? prev : next} group static! flex`} aria-label={dir === 'prev' ? 'Previous products' : 'Next products'}>
      <span className="eid-icon-button">
        <span className="relative block overflow-hidden">
          <span className={`eid-motion-emphasized block ${dir === 'prev' ? 'group-hover:-translate-x-7' : 'group-hover:translate-x-7'}`}>
            <Icon icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'} className="flex size-6" />
          </span>
          <span className={`eid-motion-emphasized absolute top-0 ${dir === 'prev' ? 'start-7 group-hover:start-0' : 'end-7 group-hover:end-0'}`}>
            <Icon icon={dir === 'prev' ? 'tabler:arrow-narrow-left' : 'tabler:arrow-narrow-right'} className="flex size-6" />
          </span>
        </span>
      </span>
    </button>
  )

  return (
    <section className="eid-section">
      <div className="container">
        <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
          <SectionHeading eyebrow={eyebrow} title={title} desc={desc} />

          <div className="flex items-center gap-5 md:ms-auto">
            <div className="flex gap-2">
              {arrow('prev')}
              {arrow('next')}
            </div>
            <CarouselCounter index={index} total={steps} />
          </div>
        </div>

        <div className="eid-stack">
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
              <SwiperSlide key={item.title} className="h-auto!">
                {variant === 'image' ? (
                  <ImageCard item={item} size="lg" className="rounded-card border" />
                ) : (
                  <Link href={item.href} className="eid-card eid-card-interactive group flex h-full flex-col gap-5 p-[var(--space-card)]">
                    <Icon icon={item.icon} className="text-primary size-10" />
                    <h3 className="group-hover:text-primary">{item.title}</h3>
                    <p className="body text-default-600">{item.desc}</p>
                    <span className="small text-primary mt-auto inline-flex items-center gap-2 pt-2 font-semibold">
                      Learn more
                      <Icon icon="tabler:arrow-narrow-right" className="eid-motion-base size-5 transition-transform group-hover:translate-x-1" />
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
