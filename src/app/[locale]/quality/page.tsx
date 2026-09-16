import { PageHero } from '@/components/sections'
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
      ['Morphological sorting', 'Automated shape-sorting tables separate the different crystal shapes — from sharp, fast-cutting grains to tough, blocky crystals.'],
      ['Visual microscope check', 'Microscope checks run throughout production to monitor batch appearance, colour consistency, crystal structure and general uniformity.'],
      ['Image Pro validation', 'Final batches are processed through image analysis software, documenting size distribution and shape factor together.'],
    ],
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded diamond grit',
  },
  {
    n: '02',
    title: 'Size & Morphology: Micron',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on Malvern particle size distribution equipment, generating a distribution curve.'],
      ['SEM verification', 'Scanning electron microscopy inspects final grain morphology and confirms the absence of oversized or undersized particles.'],
    ],
    image: '/eid/qc-micron-sem.jpg',
    alt: 'Scanning electron micrograph of micron diamond powder with the particle size distribution visible',
  },
  {
    n: '03',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing strips surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'The treatment clears crystal surfaces, allowing better bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks under the microscope confirm the cleaned material is consistent.'],
    ],
    image: '/eid/surface-enhancements.jpg',
    alt: 'Detailed view of treated diamond surface morphology',
  },
  {
    n: '04',
    title: 'Toughness (TI / TTI)',
    note: 'Available on request for advanced applications',
    points: [
      ['Targeted mechanical evaluation', 'Standard size and shape controls meet almost every everyday application. Room-temperature Toughness Index milling tests are available for specialised high-impact projects.'],
      ['Thermal stability testing', 'For extreme-heat environments, optional Thermal Toughness Index testing measures how well crystals hold up during tool manufacturing.'],
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
      <PageHero
        eyebrow={t(locale, 'Quality control')}
        title={t(locale, 'Our Quality Control & Laboratory Standards')}
        desc={t(
          locale,
          'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.'
        )}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Quality') }]}
      />

      <div className="border-default-200 border-b">
        <div className="container flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
          <span className="text-default-600 text-sm">
            {t(locale, 'All laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.')}
          </span>
          <span className="border-default-300 text-default-900 ms-auto inline-flex items-center gap-2 rounded-control border px-3 py-1.5 text-xs tracking-[0.18em] uppercase">
            <span className="bg-primary size-2" aria-hidden />
            {t(locale, 'ISO 9001:2015 certified')}
          </span>
        </div>
      </div>

      <section data-note="qc-controls" className="py-12 lg:py-16">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            {controls.map((control) => (
              <article key={control.n} className="rounded-card border-default-200 overflow-hidden border bg-white">
                <div className="relative aspect-[16/7] overflow-hidden bg-default-100">
                  <Image src={control.image} alt={t(locale, control.alt)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <span aria-hidden className="from-primary-3/65 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase">{control.n}</span>
                </div>

                <div className="p-6 lg:p-7">
                  <h2 className="text-[21px] font-bold tracking-[-0.02em] text-default-900 lg:text-[24px]">{t(locale, control.title)}</h2>
                  {'note' in control && control.note && <p className="text-default-500 mt-2 text-sm italic">{t(locale, control.note)}</p>}

                  <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                    {control.points.map(([label, body]) => (
                      <div key={label} className="border-default-200 border-t pt-3.5">
                        <dt className="text-[0.92rem] font-semibold text-default-900">{t(locale, label)}</dt>
                        <dd className="text-default-600 mt-1.5 text-[0.9rem] leading-relaxed">{t(locale, body)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-3 py-12 text-white lg:py-14">
        <div className="container">
          <div className="grid items-center gap-7 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-[26px] font-bold md:text-[30px]">{t(locale, 'Test our consistency')}</h2>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-white/72">
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
