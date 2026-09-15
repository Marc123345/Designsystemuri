import ArcStory, { type ArcStoryItem } from '@/components/ArcStory'
import CanvasField from '@/components/CanvasField'
import ScrambleHeading from '@/components/ScrambleHeading'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const VISION =
  'To be the supplier a tool maker never has to think about. Diamond and CBN that arrive to the same specification every time, from one source across the full range, so the variable our customers are managing is their process rather than their material.'

const MISSION =
  'To manufacture, grade and quality-control superabrasives to a standard we can document rather than assert. Every batch is measured rather than sampled, every lot is traceable, and every grade is answered for by someone who works with the material, and the relationship is expected to outlast the order.'

const ADVANTAGES = [
  {
    n: '01',
    title: 'Quality & consistency',
    body: 'Manufacturing, grading and QC run through our own facilities to one specification.',
  },
  {
    n: '02',
    title: 'Global service',
    body: 'Sales and technical support run from London, with customers on every continent.',
  },
] as const

const AboutMosaic = () => {
  const locale = useLocale() as Locale

  const storyItems: ArcStoryItem[] = [
    {
      kicker: '01',
      value: '55+',
      title: t(locale, 'Years manufacturing'),
      image: { src: '/eid/facility/sieve-stack-astm-e11.png', alt: '' },
      tone: 'navy',
      panel: 'overlay',
    },
    {
      kicker: '02',
      value: '8',
      title: t(locale, 'Product groups'),
      tone: 'blue',
    },
    {
      kicker: '03',
      value: '100%',
      title: t(locale, 'Batches tested'),
      image: {
        src: '/eid/qc-lab.jpg',
        alt: t(locale, 'A technician at an optical inspection system in the EID quality laboratory'),
      },
      tone: 'navy',
      panel: 'overlay',
    },
    {
      kicker: '04',
      value: '80',
      title: t(locale, 'Countries supplied'),
      tone: 'navy',
    },
    {
      kicker: '05',
      title: t(locale, 'Our vision'),
      body: t(locale, VISION),
      tone: 'light',
    },
    {
      kicker: '06',
      title: t(locale, 'Our mission'),
      body: t(locale, MISSION),
      tone: 'light',
    },
  ]

  const introTitle = t(locale, 'One accountable source. Full range. Same specification.')

  return (
    <section data-note="about-mosaic" className="bg-default-50 relative isolate overflow-hidden py-14 lg:py-18">
      <CanvasField grain={false} mark="end" />

      <div className="container">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <div className="eid-sticky-viewport eid-sticky-viewport--compact rounded-card relative aspect-[7/5] overflow-hidden lg:aspect-auto">
              <Image
                src="/eid/facility/hero-metrology-lab.png"
                alt={t(locale, 'Two technicians at a measuring microscope in the EID metrology laboratory')}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                priority={false}
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary-3/48 via-primary-3/5 to-transparent" />

              <div className="absolute bottom-5 left-5 rounded-control border border-white/20 bg-primary-3/82 px-4 py-3 text-white backdrop-blur-md lg:bottom-7 lg:left-7">
                <span className="block font-mono text-[9px] tracking-[0.22em] text-white/65 uppercase">{t(locale, 'Since')}</span>
                <span className="mt-1 block text-[28px] leading-none font-bold">1970</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ScrollReveal>
              <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
              <ScrambleHeading
                text={introTitle}
                className="text-primary-3 mt-4 max-w-[12ch] text-[40px] leading-[0.98] font-bold tracking-[-0.045em] text-balance md:text-[50px] lg:text-[58px]"
              />

              <p className="text-default-700 mt-5 text-[17px] leading-relaxed lg:text-[18px]">
                {t(
                  locale,
                  'With its headquarters in London, England, and worldwide marketing partners, EID has established a global reputation for quality, consistency and superior service.'
                )}
              </p>
            </ScrollReveal>

            <div className="mt-8 grid gap-4">
              {ADVANTAGES.map((advantage, index) => (
                <ScrollReveal key={advantage.n} delay={index * 0.06}>
                  <div className="rounded-card border-default-200 bg-white/86 flex items-start gap-4 border p-5 shadow-[0_18px_50px_-40px_rgba(2,6,23,0.35)] backdrop-blur-sm lg:p-6">
                    <span className="border-primary/20 bg-primary/5 text-primary rounded-control flex size-12 shrink-0 items-center justify-center border font-mono text-[10px] font-semibold tracking-[0.16em]">
                      {advantage.n}
                    </span>
                    <div className="border-primary/45 min-w-0 border-s-2 ps-4">
                      <h3 className="text-primary-3 text-[20px] leading-tight font-semibold lg:text-[22px]">{t(locale, advantage.title)}</h3>
                      <p className="text-default-600 mt-2 text-[15px] leading-relaxed lg:text-base">{t(locale, advantage.body)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <ArcStory items={storyItems} ariaLabel={t(locale, 'EID manufacturing, quality, reach, vision and mission')} cardHeight={440} />
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
