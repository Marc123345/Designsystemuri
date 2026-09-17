import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import Image from 'next/image'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Quality Control & Laboratory Standards | EID Ltd' },
    description: 'Every batch of EID diamond and CBN powder undergoes laboratory validation — sieve and micron sizing, morphology, chemical cleaning and optional toughness testing — against FEPA, ISO 6106 and ANSI standards.',
    alternates: localeAlternates(locale, '/quality'),
  }
}

const controls = [
  {
    n: '01',
    title: 'Size & Morphology: Mesh',
    points: [
      ['Precision size separation', 'Mechanical test sieves separate and sort diamond grit into uniform sizes.'],
      ['Morphological sorting', 'Automated shape-sorting tables separate different crystal shapes.'],
      ['Visual microscope check', 'Microscope checks monitor batch appearance, colour consistency, crystal structure and uniformity.'],
      ['Image Pro validation', 'Final batches are documented for size distribution and shape factor.'],
    ],
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded diamond grit',
  },
  {
    n: '02',
    title: 'Size & Morphology: Micron',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on particle size distribution equipment.'],
      ['SEM verification', 'Scanning electron microscopy verifies final grain morphology and size consistency.'],
    ],
    image: '/eid/qc-micron-sem.jpg',
    alt: 'Scanning electron micrograph of micron diamond powder',
  },
  {
    n: '03',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing removes surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'Treatment clears crystal surfaces to support bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks confirm cleaned material is consistent.'],
    ],
    image: '/eid/surface-enhancements.jpg',
    alt: 'Detailed view of treated diamond surface morphology',
  },
  {
    n: '04',
    title: 'Toughness (TI / TTI)',
    note: 'Available on request for advanced applications',
    points: [
      ['Targeted mechanical evaluation', 'Room-temperature Toughness Index milling tests are available for specialised high-impact projects.'],
      ['Thermal stability testing', 'Optional Thermal Toughness Index testing measures crystal stability for extreme-heat environments.'],
    ],
    image: '/eid/quality/01-automated-hardness-test-station.png',
    alt: 'Automated toughness testing station with a guarded sample stage',
  },
] as const

const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section data-note="quality-hero" className="bg-primary-3 rounded-b-card relative isolate flex min-h-[330px] items-end overflow-hidden text-white lg:min-h-[360px]">
        <Image
          src="/eid/facility/crystal-microscopy.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div aria-hidden className="bg-primary-3/52 absolute inset-0 -z-10" />
        <div aria-hidden className="from-default-950/88 via-default-950/30 absolute inset-0 -z-10 bg-linear-to-t to-transparent" />

        <div className="container pb-9 pt-28 lg:pb-10 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/70 uppercase">{t(locale, 'Quality control')}</p>
            <h1 className="mt-3 text-[32px] leading-[1.02] font-bold tracking-[-0.04em] text-white md:text-[42px] lg:text-[48px]">
              {t(locale, 'Our Quality Control & Laboratory Standards')}
            </h1>
            <p className="mx-auto mt-4 max-w-[70ch] text-[15px] leading-relaxed text-white/82 lg:text-base">
              {t(locale, 'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.')}
            </p>
          </div>
        </div>
      </section>

      <section data-note="quality-proof" className="border-default-200 border-b bg-default-50 py-7 lg:py-8">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_160px]">
            <article className="rounded-card border-default-200 border bg-white p-5 lg:p-6">
              <h2 className="text-primary-3 text-[20px] font-semibold">{t(locale, 'The Laboratory')}</h2>
              <p className="text-default-600 mt-3 text-[14px] leading-relaxed">
                {t(locale, 'QC is built into every stage, from raw material selection through grading, cleaning, coating and final inspection. Laboratory testing follows FEPA, ISO 6106 and ANSI standards.')}
              </p>
            </article>

            <article className="rounded-card border-default-200 border bg-white p-5 lg:p-6">
              <h2 className="text-primary-3 text-[20px] font-semibold">{t(locale, 'Measured, not sampled')}</h2>
              <p className="text-default-600 mt-3 text-[14px] leading-relaxed">
                {t(locale, 'Every batch is measured for the controls that define its grade, so repeat orders can be checked against a documented specification rather than a spot-check.')}
              </p>
            </article>

            <article className="rounded-card border-default-200 border bg-white p-5 lg:p-6">
              <h2 className="text-primary-3 text-[20px] font-semibold">{t(locale, 'Documented, not asserted')}</h2>
              <p className="text-default-600 mt-3 text-[14px] leading-relaxed">
                {t(locale, 'Lot traceability, certificates of analysis on request and retained batch samples give buyers a record to return to when a grade needs answering for.')}
              </p>
            </article>

            <article className="bg-primary rounded-card flex min-h-[132px] flex-col items-center justify-center p-5 text-center text-white sm:min-h-[150px] lg:min-h-0">
              <span className="font-mono text-[10px] tracking-[0.22em] text-white/65 uppercase">ISO</span>
              <strong className="mt-2 text-[19px] leading-none tracking-[-0.03em] text-white">9001:2015</strong>
              <span className="mt-2 text-[10px] font-semibold tracking-[0.14em] text-white/82 uppercase">{t(locale, 'Certified')}</span>
            </article>
          </div>
        </div>
      </section>

      <section data-note="qc-controls" className="py-8 lg:py-10">
        <div className="container">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{t(locale, 'The four controls')}</p>
              <h2 className="text-primary-3 mt-2 text-[28px] leading-tight font-bold tracking-[-0.03em] md:text-[34px]">{t(locale, 'What buyers need to see.')}</h2>
            </div>
            <p className="text-default-500 hidden max-w-[38ch] text-right text-[13px] leading-relaxed lg:block">
              {t(locale, 'Mesh, micron, chemical cleaning and optional toughness testing are separate controls — not steps in a sequence.')}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {controls.map((control) => (
              <article key={control.n} className="rounded-card border-default-200 overflow-hidden border bg-white">
                <div className="relative aspect-[16/5] min-h-[150px] overflow-hidden bg-default-100">
                  <Image src={control.image} alt={t(locale, control.alt)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <span aria-hidden className="from-primary-3/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.2em] text-white/85 uppercase">{control.n}</span>
                </div>

                <div className="p-5 lg:p-6">
                  <h3 className="text-[20px] font-bold tracking-[-0.02em] text-default-900 lg:text-[22px]">{t(locale, control.title)}</h3>
                  {'note' in control && control.note ? <p className="text-default-500 mt-1.5 text-[12px] italic">{t(locale, control.note)}</p> : null}

                  <dl className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
                    {control.points.map(([label, body]) => (
                      <div key={label} className="border-default-200 border-t pt-3">
                        <dt className="text-[13px] font-semibold text-default-900">{t(locale, label)}</dt>
                        <dd className="text-default-600 mt-1 text-[12.5px] leading-relaxed">{t(locale, body)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-3 py-9 text-white lg:py-10">
        <div className="container">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2 className="text-[25px] font-bold text-white md:text-[28px]">{t(locale, 'Test our consistency')}</h2>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-white/72">
                {t(locale, 'Contact our technical team to arrange a sample batch tailored to your exact specifications.')}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ArrowButton href="/contact" label={t(locale, 'Contact us / request a sample')} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default QualityPage
