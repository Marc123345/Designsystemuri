import CanvasField from '@/components/CanvasField'
import ScrambleHeading from '@/components/ScrambleHeading'
import ScrollReveal from '@/components/ScrollReveal'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const ADVANTAGES = [
  {
    n: '01',
    title: 'Quality & consistency',
    body: 'Manufacturing, grading and QC run through our own facilities to one specification.',
  },
  {
    n: '02',
    title: 'Global service',
    body: 'Sales and technical support run from London, with processing and logistics supporting toolmakers worldwide.',
  },
] as const

const FACTS = [
  { value: '1970', label: 'Manufacturing since' },
  { value: '8', label: 'Product groups' },
  { value: '100%', label: 'Batches tested' },
] as const

/**
 * About should explain the company, not make the visitor operate another
 * carousel. Uri's review repeatedly asks for less congestion and less scrolling,
 * so the old six-slide story/vision/mission rail is replaced by three static,
 * already-supported facts that can be read in one glance.
 */
const AboutMosaic = () => {
  const locale = useLocale() as Locale
  const introTitle = t(locale, 'One accountable source. Full range. Same specification.')

  return (
    <section data-note="about-mosaic" className="bg-default-50 relative isolate overflow-hidden py-14 lg:py-18">
      <CanvasField grain={false} mark="end" />

      <div className="container">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-card relative aspect-[7/5] overflow-hidden">
              <Image
                src="/eid/facility/hero-metrology-lab.png"
                alt={t(locale, 'Two technicians at a measuring microscope in the EID metrology laboratory')}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
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

        <div className="border-default-200 mt-10 grid overflow-hidden rounded-card border bg-white sm:grid-cols-3 lg:mt-12">
          {FACTS.map((fact, index) => (
            <div key={fact.label} className={`p-5 text-center lg:p-6 ${index ? 'border-default-200 border-t sm:border-t-0 sm:border-s' : ''}`}>
              <p className="text-primary text-[30px] leading-none font-bold tracking-[-0.04em] lg:text-[36px]">{fact.value}</p>
              <p className="text-default-600 mt-2 font-mono text-[10px] tracking-[0.18em] uppercase">{t(locale, fact.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
