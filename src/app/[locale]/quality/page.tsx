import PhotoCard from '@/components/PhotoCard'
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
    title: 'Mesh Grading & Morphology Control',
    points: [
      ['Precision size separation', 'Mechanical test sieves separate and sort diamond grit into uniform sizes.'],
      ['Morphological sorting', 'Automated shape-sorting tables separate different crystal shapes.'],
      ['Visual microscope check', 'Microscope checks monitor batch appearance, colour consistency, crystal structure and uniformity.'],
      ['Image Pro validation', 'Final batches are documented for size distribution and shape factor.'],
    ],
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-mesh-size-morphology.png',
    alt: 'Mesh diamond size and morphology quality-control imagery',
  },
  {
    n: '02',
    title: 'Micron Grading & Morphology Control',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on particle size distribution equipment.'],
      ['SEM verification', 'Scanning electron microscopy verifies final grain morphology and size consistency.'],
    ],
    image: '/eid/quality/malvern-mastersizer-3000.webp',
    alt: 'Malvern Mastersizer 3000 particle-size analyser used for micron grading',
  },
  {
    n: '03',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing removes surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'Treatment clears crystal surfaces to support bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks confirm cleaned material is consistent.'],
    ],
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-advanced-chemical-cleaning.png',
    alt: 'Advanced chemical cleaning quality-control imagery',
  },
  {
    n: '04',
    title: 'Toughness (TI / TTI)',
    note: 'Available on request for advanced applications',
    points: [
      ['Targeted mechanical evaluation', 'Room-temperature Toughness Index milling tests are available for specialised high-impact projects.'],
      ['Thermal stability testing', 'Optional Thermal Toughness Index testing measures crystal stability for extreme-heat environments.'],
    ],
    image: 'https://ik.imagekit.io/qcvroy8xpd/eid-qc-toughness.png',
    alt: 'Diamond toughness testing quality-control imagery',
  },
] as const

const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <section data-note="quality-hero" className="bg-primary-3 rounded-b-card relative isolate flex min-h-[330px] items-end overflow-hidden text-white lg:min-h-[360px]">
        <Image
          src="https://ik.imagekit.io/qcvroy8xpd/eid-hero-quality-control.png"
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
            <p className="font-mono text-[11px] tracking-[0.22em] text-white/70 uppercase">{t(locale, 'Quality control')}</p>
            <h1 className="mt-3 text-[32px] leading-[1.02] font-bold tracking-[-0.04em] text-white md:text-[42px] lg:text-[48px]">
              {t(locale, 'Our Quality Control & Laboratory Standards')}
            </h1>
            <p className="mx-auto mt-4 max-w-[70ch] text-[15px] leading-relaxed text-white/82 lg:text-base">
              {t(locale, 'At E.I.D, quality control is integrated throughout our manufacturing processes. Through precision grading, advanced laboratory testing and rigorous batch inspection, we maintain consistent product specifications and reliable abrasive performance, lot after lot.')}
            </p>
          </div>
        </div>
      </section>

      <section data-note="quality-proof" className="border-primary/10 border-b bg-canvas py-8 lg:py-10">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <PhotoCard
              image="/eid/quality/03-sample-preparation-pipette.png"
              alt={t(locale, 'A gloved hand pipetting into a test tube of micron diamond powder, a centrifuge on the bench behind')}
              eyebrow="01"
              title={t(locale, 'The Laboratory')}
              body={t(locale, 'QC is built into every stage, from raw material selection through grading, cleaning, coating and final inspection. Laboratory testing follows FEPA, ISO 6106 and ANSI standards.')}
              minHeight="min-h-[260px] lg:min-h-[285px]"
            />
            <PhotoCard
              image="/eid/qc-micron-sem.jpg"
              alt={t(locale, 'Scanning electron micrograph of micron diamond powder')}
              eyebrow="02"
              title={t(locale, 'Measured, not sampled')}
              body={t(locale, 'Every batch is measured for the controls that define its grade, so repeat orders can be checked against a documented specification rather than a spot-check.')}
              minHeight="min-h-[260px] lg:min-h-[285px]"
            />
            <PhotoCard
              image="/eid/quality/05-labeled-sample-storage-cabinet.png"
              alt={t(locale, 'Barcode-labelled retained batch samples in EID storage')}
              eyebrow="03"
              title={t(locale, 'Documented, not asserted')}
              body={t(locale, 'Lot traceability, certificates of analysis on request and retained batch samples give buyers a record to return to when a grade needs answering for.')}
              minHeight="min-h-[260px] lg:min-h-[285px]"
            />
            <article className="border-primary/15 rounded-card flex min-h-[260px] flex-col overflow-hidden border bg-white lg:min-h-[285px]">
              <a
                href="/eid/iso-9001-eid.jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(locale, 'View ISO 9001:2015 certificate')}
                className="relative block min-h-[160px] flex-1 bg-white"
              >
                <Image
                  src="/eid/iso-9001-eid.jpg"
                  alt={t(locale, 'EID Limited ISO 9001:2015 certificate')}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain p-3"
                />
              </a>
              <div className="bg-primary-3 px-4 py-4 text-white lg:px-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase">04 · Certification</p>
                <h3 className="mt-2 text-[17px] leading-tight font-bold text-white">ISO 9001:2015 Certified</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-semibold">
                  <a href="/eid/iso-9001-eid.jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-white/45 underline-offset-4 hover:decoration-white">
                    {t(locale, 'View certificate')}
                  </a>
                  <a href="/eid/iso-9001-eid.jpg" download="EID-ISO-9001-2015-Certificate.jpg" className="underline decoration-white/45 underline-offset-4 hover:decoration-white">
                    {t(locale, 'Download certificate')}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section data-note="qc-controls" className="bg-[linear-gradient(180deg,var(--color-canvas)_0%,white_26%,white_100%)] py-9 lg:py-12">
        <div className="container">
          <div className="bg-primary-3 relative mb-6 overflow-hidden rounded-card px-6 py-6 text-white shadow-[0_20px_58px_-42px_rgba(28,39,73,0.62)] sm:px-7 lg:flex lg:items-end lg:justify-between lg:gap-8 lg:px-9 lg:py-7">
            <span aria-hidden className="bg-primary-1 absolute inset-y-0 left-0 w-1.5" />
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-champagne uppercase">{t(locale, 'The four controls')}</p>
              <h2 className="mt-2 text-[28px] leading-tight font-bold tracking-[-0.03em] text-white md:text-[34px]">{t(locale, 'Our Quality Control Processes')}</h2>
            </div>
            <p className="mt-4 max-w-[54ch] text-[13px] leading-relaxed text-white/80 lg:mt-0 lg:text-right">
              {t(locale, 'Precision grading, advanced morphology analysis, chemical cleaning and toughness testing ensure consistent abrasive quality across our product range')}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {controls.map((control) => (
              <article key={control.n} className="border-primary/20 rounded-card overflow-hidden border bg-white shadow-[0_16px_48px_-40px_rgba(28,39,73,0.45)]">
                <div className="relative aspect-[16/5] min-h-[150px] overflow-hidden bg-default-100">
                  <Image src={control.image} alt={t(locale, control.alt)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                  <span aria-hidden className="from-primary-3/78 absolute inset-0 bg-linear-to-t via-primary-3/10 to-transparent" />
                  <span className="bg-primary-3/92 absolute bottom-3 left-4 rounded-control border border-white/15 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-white uppercase">{control.n}</span>
                </div>

                <div className="bg-primary-3 border-t border-white/10 px-5 py-4 text-white lg:px-6 lg:py-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                    <h3 className="text-[20px] font-bold tracking-[-0.02em] text-white lg:text-[22px]">{t(locale, control.title)}</h3>
                    {'note' in control && control.note ? <p className="text-[12px] italic text-white/68">{t(locale, control.note)}</p> : null}
                  </div>
                </div>

                <div className="p-5 lg:p-6">
                  <dl className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
                    {control.points.map(([label, body]) => (
                      <div key={label} className="border-primary/15 border-t pt-3">
                        <dt className="text-primary-3 text-[13px] font-semibold">{t(locale, label)}</dt>
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
    </>
  )
}

export default QualityPage
