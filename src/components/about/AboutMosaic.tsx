import CountUp from '@/components/CountUp'
import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const STACKED = [
  { value: '55+', label: 'Years manufacturing' },
  { value: '8', label: 'Product groups' },
  { value: '100%', label: 'Batches tested' },
]

const STATEMENTS = [
  {
    label: 'Our vision',
    body: 'To be the supplier a tool maker never has to think about. Diamond and CBN that arrive to the same specification every time, from one source across the full range, so the variable our customers are managing is their process rather than their material.',
  },
  {
    label: 'Our mission',
    body: 'To manufacture, grade and quality-control superabrasives to a standard we can document rather than assert. Every batch is measured rather than sampled, every lot is traceable, and every grade is answered for by someone who works with the material, and the relationship is expected to outlast the order.',
  },
]

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

  return (
    <section data-note="about-mosaic" className="bg-default-50 py-16 lg:py-24">
      <div className="container">
        {/* Image-led company introduction, adapted from Marc's industrial
            reference: a dominant image on the left, a tighter company story on
            the right, then two compact advantage rows. The orange template
            styling is deliberately not carried over; the structure is, and the
            EID blue/radius/type system does the visual work. */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-18">
          <div className="rounded-card relative aspect-[7/5] overflow-hidden lg:col-span-7 lg:min-h-[520px]">
            <Image
              src="/eid/facility/hero-metrology-lab.png"
              alt={t(locale, 'Two technicians at a measuring microscope in the EID metrology laboratory')}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              priority={false}
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-primary-3/28 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 rounded-control border border-white/20 bg-primary-3/78 px-4 py-3 text-white backdrop-blur-md lg:bottom-7 lg:left-7">
              <span className="block font-mono text-[9px] tracking-[0.22em] text-white/65 uppercase">{t(locale, 'Since')}</span>
              <span className="mt-1 block text-[28px] leading-none font-bold">1970</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About EID')}</p>
            <h2 className="text-default-900 mt-4 max-w-[12ch] text-[34px] leading-[1.02] font-bold tracking-[-0.035em] text-balance md:text-[40px] lg:text-[46px]">
              {t(locale, 'One accountable source. Full range. Same specification.')}
            </h2>

            <p className="text-default-700 mt-6 text-[17px] leading-relaxed lg:text-[18px]">
              {t(
                locale,
                'With its headquarters in London, England, and worldwide marketing partners, EID has established a global reputation for quality, consistency and superior service.'
              )}
            </p>

            <div className="mt-9 space-y-7">
              {ADVANTAGES.map((advantage) => (
                <div key={advantage.n} className="flex items-start gap-5">
                  <span className="border-primary/20 bg-primary/5 text-primary rounded-control flex size-14 shrink-0 items-center justify-center border font-mono text-[11px] font-semibold tracking-[0.16em]">
                    {advantage.n}
                  </span>
                  <div className="border-primary/45 min-w-0 border-s-2 ps-5">
                    <h3 className="text-default-900 text-[19px] leading-tight font-semibold lg:text-[21px]">{t(locale, advantage.title)}</h3>
                    <p className="text-default-600 mt-2 text-[15px] leading-relaxed lg:text-base">{t(locale, advantage.body)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="grid auto-rows-fr grid-cols-2 gap-6 lg:col-span-6">
            <div className="rounded-card relative row-span-2 min-h-[420px] overflow-hidden lg:min-h-[520px]">
              <Image src="/eid/facility/sieve-stack-astm-e11.png" alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <span aria-hidden className="bg-primary-3/78 absolute inset-0" />

              <dl className="absolute inset-0 flex flex-col items-center justify-around p-5 text-center">
                {STACKED.map((f) => (
                  <div key={f.label}>
                    <dd className="text-[38px] leading-none font-bold text-white lg:text-[46px]"><CountUp value={f.value} /></dd>
                    <dt className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/75 uppercase">{t(locale, f.label)}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-card relative min-h-[200px] overflow-hidden lg:min-h-[248px]">
              <Image src="/eid/qc-lab.jpg" alt={t(locale, 'A technician at an optical inspection system in the EID quality laboratory')} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>

            <div className="rounded-card bg-primary relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden text-center lg:min-h-[248px]">
              <span className="text-[52px] leading-none font-bold text-white lg:text-[64px]"><CountUp value="80" /></span>
              <span className="mt-2 text-[11px] font-semibold tracking-[0.18em] text-white/85 uppercase">{t(locale, 'Countries supplied')}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-12 lg:col-span-6 lg:gap-16">
            {STATEMENTS.map((b) => (
              <div key={b.label} className="border-primary border-s-2 ps-7 lg:ps-9">
                <h2 className="text-default-900 text-[26px] leading-none font-bold lg:text-[32px]">{t(locale, b.label)}</h2>
                <p className="text-default-600 mt-5 text-[16px] leading-relaxed lg:text-[17px]">{t(locale, b.body)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMosaic
