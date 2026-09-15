import CanvasField from '@/components/CanvasField'
import CountUp from '@/components/CountUp'
import ScrambleHeading from '@/components/ScrambleHeading'
import ScrollReveal from '@/components/ScrollReveal'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const STACKED = [
  { value: '100%', label: 'Batches tested' },
  { value: '4', label: 'Laboratory controls' },
  { value: '3', label: 'Standards met' },
]

const STATEMENTS = [
  {
    label: 'Measured, not sampled',
    body: 'A lot that was spot-checked is a lot you have to re-qualify on arrival. Every batch is measured — sieve and micron sizing, morphology, and a particle size distribution curve on record — so the grade you ordered last year is the grade that arrives this year, and the variable you are managing is your process rather than our material.',
  },
  {
    label: 'Documented, not asserted',
    body: 'Every lot leaves with a certificate of analysis, a retention sample is kept from every batch, and traceability runs from incoming raw material through to the lot that shipped. If a grade ever needs answering for, the record exists and so does the material it was taken from.',
  },
]

const QualityMosaic = () => {
  const locale = useLocale() as Locale
  const heading = t(locale, 'The Laboratory')

  return (
    <section data-note="quality-mosaic" className="bg-default-50 relative isolate overflow-hidden py-16 lg:py-22">
      <CanvasField density="fine" mark="start" />

      <div className="container">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-5">
            <div className="eid-sticky-viewport rounded-card bg-primary-3 relative flex overflow-hidden text-white">
              <Image
                src="/eid/quality/08-micron-powder-grade-comparison.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
              <span aria-hidden className="bg-primary-3/88 absolute inset-0" />
              <span aria-hidden className="from-primary-3 via-primary-3/82 absolute inset-0 bg-linear-to-t to-transparent" />

              <div className="relative z-10 flex w-full flex-col justify-between p-7 sm:p-9 lg:p-10 xl:p-12">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-white/58 uppercase">{t(locale, 'Quality control')}</p>
                  <ScrambleHeading
                    text={heading}
                    className="mt-4 text-[40px] leading-[0.96] font-bold tracking-[-0.045em] text-white md:text-[50px] lg:text-[58px]"
                  />

                  <p className="mt-6 text-[17px] leading-relaxed text-white/92 lg:text-[18px]">
                    {t(
                      locale,
                      'At EID, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.'
                    )}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-white/72 lg:text-base">
                    {t(
                      locale,
                      'QC is built into every stage, from raw material selection through grading, crushing, chemical cleaning, coating and final inspection. The in-house QC laboratory is the backbone of everything we ship, and all laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.'
                    )}
                  </p>
                </div>

                <dl className="mt-9 grid grid-cols-3 gap-px overflow-hidden rounded-control bg-white/18">
                  {STACKED.map((figure) => (
                    <div key={figure.label} className="bg-primary-3/88 px-3 py-4 text-center backdrop-blur-sm">
                      <dd className="text-[28px] leading-none font-bold text-white lg:text-[34px]"><CountUp value={figure.value} /></dd>
                      <dt className="mt-2 text-[9px] font-semibold tracking-[0.15em] text-white/65 uppercase lg:text-[10px]">{t(locale, figure.label)}</dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:col-span-7 lg:gap-12 lg:pb-[14vh]">
            <ScrollReveal>
              <figure className="rounded-card relative min-h-[360px] overflow-hidden lg:min-h-[58svh]">
                <Image
                  src="/eid/quality/09-digital-micrometer-diamond-measurement.png"
                  alt={t(locale, 'A digital micrometer closed on a diamond crystal, its display reading 3.000 mm')}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </ScrollReveal>

            <ScrollReveal>
              <article className="rounded-card border-default-200 bg-white p-7 shadow-[0_22px_70px_-42px_rgba(2,6,23,0.35)] sm:p-9 lg:p-10">
                <div className="border-primary border-s-2 ps-6 lg:ps-8">
                  <h3 className="text-primary-3 text-[30px] leading-none font-bold tracking-[-0.025em] lg:text-[36px]">{t(locale, STATEMENTS[0].label)}</h3>
                  <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, STATEMENTS[0].body)}</p>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <figure className="rounded-card relative min-h-[340px] overflow-hidden lg:min-h-[52svh]">
                <Image
                  src="/eid/quality/05-labeled-sample-storage-cabinet.png"
                  alt={t(locale, 'A stainless steel cabinet of barcode-labelled sample jars on lit shelves')}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </ScrollReveal>

            <ScrollReveal>
              <article className="rounded-card border-default-200 bg-white p-7 shadow-[0_22px_70px_-42px_rgba(2,6,23,0.35)] sm:p-9 lg:p-10">
                <div className="border-primary border-s-2 ps-6 lg:ps-8">
                  <h3 className="text-primary-3 text-[30px] leading-none font-bold tracking-[-0.025em] lg:text-[36px]">{t(locale, STATEMENTS[1].label)}</h3>
                  <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, STATEMENTS[1].body)}</p>
                </div>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href="/eid/iso-9001-eid.jpg"
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-card bg-primary hover:bg-primary-1 focus-visible:outline-primary flex min-h-[260px] flex-col items-center justify-center p-8 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span className="text-[58px] leading-none font-bold text-white lg:text-[72px]"><CountUp value="9001" /></span>
                <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'ISO certified')}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] text-white/85 uppercase">
                  {t(locale, 'See the certificate')}
                  <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M5 12h14m-4 4l4-4m-4-4l4 4" />
                  </svg>
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QualityMosaic
