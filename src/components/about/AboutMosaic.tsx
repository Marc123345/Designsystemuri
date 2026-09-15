import AboutCrystalScene from '@/components/about/AboutCrystalScene'
import CountUp from '@/components/CountUp'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import { useLocale } from 'next-intl'

const STATEMENTS = [
  {
    number: '01',
    label: 'Our vision',
    body: 'To be the supplier a tool maker never has to think about. Diamond and CBN that arrive to the same specification every time, from one source across the full range, so the variable our customers are managing is their process rather than their material.',
  },
  {
    number: '02',
    label: 'Our mission',
    body: 'To manufacture, grade and quality-control superabrasives to a standard we can document rather than assert. Every batch is measured rather than sampled, every lot is traceable, and every grade is answered for by someone who works with the material, and the relationship is expected to outlast the order.',
  },
]

const AboutMosaic = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="about-mosaic" className="bg-default-50 overflow-hidden">
      {/* Company story + the one interactive visual on the page. */}
      <div className="container py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About')}</p>
            <h2 className="text-default-900 mt-4 max-w-[10ch] text-[38px] leading-[0.98] font-bold sm:text-[46px] lg:text-[58px]">
              {t(locale, 'The Company')}
            </h2>

            <p className="text-default-800 mt-8 max-w-[34rem] text-[19px] leading-[1.55] lg:text-[21px]">
              {t(
                locale,
                'With its headquarters in London, England, and worldwide marketing partners, EID has established a global reputation for quality, consistency and superior service.'
              )}
            </p>
            <p className="text-default-600 mt-6 max-w-[34rem] text-base leading-relaxed lg:text-[17px]">
              {t(
                locale,
                'Today EID has customers on every continent. Our sales team speaks more than ten dialects, but we all speak the same language — the right product at the right price, when and where you require it.'
              )}
            </p>

            <div className="border-default-200 mt-10 flex items-center gap-4 border-t pt-5">
              <span className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">{t(locale, 'Measured from every angle')}</span>
              <span aria-hidden className="bg-primary h-px flex-1" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-card bg-primary-3 relative min-h-[560px] overflow-hidden sm:min-h-[640px] lg:min-h-[720px]">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(94,126,183,0.42),transparent_46%)]" />
              <div className="absolute inset-0">
                <AboutCrystalScene />
              </div>

              <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between gap-5 sm:inset-x-7 sm:bottom-7">
                <div className="max-w-[18rem]">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-white/55 uppercase">{t(locale, 'Material · grading · measurement')}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">
                    {t(locale, 'The same discipline that shapes the material shapes how EID works: controlled, measured and repeatable.')}
                  </p>
                </div>

                <div className="rounded-control relative hidden aspect-[4/3] w-[38%] max-w-[260px] overflow-hidden border border-white/20 bg-white/5 shadow-2xl sm:block">
                  <Image
                    src="/eid/facility/hero-metrology-lab.png"
                    alt={t(locale, 'Two technicians at a measuring microscope in the EID metrology laboratory')}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-primary-3/45 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof becomes one cinematic evidence band instead of a grid of equal cards. */}
      <div className="container pb-16 lg:pb-24">
        <div className="rounded-card bg-primary-3 relative overflow-hidden text-white">
          <svg aria-hidden viewBox="0 0 1200 720" className="absolute inset-0 h-full w-full text-white/[0.055]" fill="none">
            <circle cx="936" cy="222" r="174" stroke="currentColor" />
            <circle cx="936" cy="222" r="126" stroke="currentColor" strokeDasharray="5 10" />
            <path d="M936 48v348M762 222h348" stroke="currentColor" />
            <path d="M74 616 342 370 566 616" stroke="currentColor" />
            <path d="m342 370-82 246m82-246 88 246" stroke="currentColor" />
          </svg>

          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14 xl:p-16">
            <div className="lg:col-span-7">
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/55 uppercase">{t(locale, 'Proof, not claims')}</p>
              <div className="mt-5 flex items-end gap-4">
                <span className="text-[clamp(5.5rem,13vw,11rem)] leading-[0.78] font-bold tracking-[-0.07em]"><CountUp value="100%" /></span>
              </div>
              <h3 className="mt-7 max-w-[12ch] text-[28px] leading-tight font-bold sm:text-[34px] lg:text-[40px]">
                {t(locale, 'Every batch tested before it ships.')}
              </h3>
              <p className="mt-5 max-w-[38rem] text-base leading-relaxed text-white/68 lg:text-[17px]">
                {t(locale, 'Measurement is not a final visual check. It is the thread running through grading, inspection, traceability and release.')}
              </p>
            </div>

            <div className="lg:col-span-5 lg:justify-self-end">
              <div className="relative mx-auto aspect-square w-full max-w-[360px] rounded-full border border-white/15 p-4 sm:p-5">
                <span aria-hidden className="absolute inset-[8%] rounded-full border border-dashed border-white/20" />
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/eid/qc-lab.jpg"
                    alt={t(locale, 'A technician at an optical inspection system in the EID quality laboratory')}
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                  <span aria-hidden className="absolute inset-0 bg-primary-3/12" />
                </div>
                <span aria-hidden className="absolute top-1/2 left-0 h-px w-full bg-white/12" />
                <span aria-hidden className="absolute top-0 left-1/2 h-full w-px bg-white/12" />
              </div>
            </div>
          </div>

          <div className="relative grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative min-h-[210px] overflow-hidden border-white/10 sm:border-r lg:min-h-[250px]">
              <Image src="/eid/facility/sieve-stack-astm-e11.png" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-primary-3/70" />
              <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.2em] text-white/70 uppercase sm:bottom-7 sm:left-7">{t(locale, 'Grading discipline')}</span>
            </div>

            <div className="flex min-h-[210px] flex-col justify-end border-white/10 p-6 sm:border-r sm:p-7 lg:min-h-[250px]">
              <span className="text-[52px] leading-none font-bold lg:text-[62px]"><CountUp value="55+" /></span>
              <span className="mt-3 font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">{t(locale, 'Years manufacturing')}</span>
            </div>
            <div className="flex min-h-[210px] flex-col justify-end border-t border-white/10 p-6 sm:p-7 lg:min-h-[250px] lg:border-t-0 lg:border-r">
              <span className="text-[52px] leading-none font-bold lg:text-[62px]"><CountUp value="8" /></span>
              <span className="mt-3 font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">{t(locale, 'Product groups')}</span>
            </div>
            <div className="flex min-h-[210px] flex-col justify-end border-t border-white/10 p-6 sm:p-7 lg:min-h-[250px] lg:border-t-0">
              <span className="text-[52px] leading-none font-bold lg:text-[62px]"><CountUp value="80" /></span>
              <span className="mt-3 font-mono text-[10px] tracking-[0.18em] text-white/60 uppercase">{t(locale, 'Countries supplied')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vision and mission become manifesto pages, not two more cards. */}
      <div className="container relative pb-20 lg:pb-30">
        <svg aria-hidden viewBox="0 0 900 520" className="pointer-events-none absolute top-2 right-[-12%] hidden h-[520px] w-[900px] text-primary/[0.07] lg:block" fill="none">
          <path d="M450 28 718 154 760 338 450 492 140 338 182 154Z" stroke="currentColor" strokeWidth="1.3" />
          <path d="m450 28-142 238 142 226 142-226L450 28Z" stroke="currentColor" />
          <path d="M182 154 308 266 140 338M718 154 592 266l168 72M308 266h284" stroke="currentColor" />
        </svg>

        <div className="border-default-200 relative grid border-t lg:grid-cols-2">
          {STATEMENTS.map((statement, index) => (
            <article
              key={statement.label}
              className={`relative py-12 sm:py-16 lg:min-h-[520px] lg:py-20 ${index === 0 ? 'lg:border-default-200 lg:border-r lg:pr-16' : 'border-default-200 border-t lg:border-t-0 lg:pl-16'}`}
            >
              <span className="text-primary/16 absolute top-8 right-0 text-[96px] leading-none font-bold tracking-[-0.06em] sm:text-[132px] lg:top-14 lg:text-[180px]">
                {statement.number}
              </span>
              <div className="relative max-w-[36rem]">
                <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{statement.number}</p>
                <h2 className="text-default-900 mt-5 text-[34px] leading-none font-bold sm:text-[42px] lg:text-[52px]">{t(locale, statement.label)}</h2>
                <p className="text-default-700 mt-8 text-[18px] leading-[1.65] lg:text-[20px]">{t(locale, statement.body)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
