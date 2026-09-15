import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import ScrollReveal from '@/components/ScrollReveal'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import type { CSSProperties } from 'react'

const VALUES = [
  {
    name: 'Innovation',
    body: 'Fifty-five years in, the range still grows with what tool makers ask for: new coatings, tighter classifications, crystal grown to a specified orientation. If the specification does not exist yet, that is the conversation to have.',
    image: '/eid/facility/crystal-microscopy.png',
    alt: 'Diamond crystals under the microscope during morphology inspection',
  },
  {
    name: 'Family',
    body: 'A small team that has been doing this a long time, and mostly the same people year after year. The person who answers a specification question is the person who grades against it — which is why the answer comes back the same twice.',
    image: '/eid/facility/diamond-grading-loupe.png',
    alt: 'A grader examining diamond grit through a loupe',
  },
  {
    name: 'Excellence',
    body: 'Built to perform, and documented so you can prove it. ISO 9001, a certificate of analysis per lot, a retention sample kept from every batch, and traceability from incoming raw material through to the lot that shipped.',
    image: '/eid/qc-samples.jpg',
    alt: 'A laboratory shelf of retention sample jars, one kept from every batch',
  },
  {
    name: 'Precision',
    body: 'Where microns are the unit of the argument. Every batch is measured rather than sampled and assumed, because a grade you have to re-qualify on each order is not a grade you can build a production run around.',
    image: '/eid/qc-inspection.jpg',
    alt: 'An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside',
  },
]

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="py-16 lg:py-24">
      <div className="container">
        <EvidencePanel className="px-5 py-9 sm:px-7 sm:py-11 lg:px-10 lg:py-12 xl:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="eid-sticky-copy lg:col-span-4">
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/55 uppercase">{t(locale, 'About EID')}</p>
              <h2 className="mt-4 text-[30px] leading-[1.02] font-bold text-white md:text-[36px] lg:text-[42px]">
                {t(locale, 'Our core values')}
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-white/72">
                {t(locale, 'Four things that have not changed since 1970, and that a buyer can check against every order.')}
              </p>

              <div className="mt-8 hidden items-center gap-3 text-[10px] font-semibold tracking-[0.18em] text-white/55 uppercase lg:flex">
                <span className="h-px w-10 bg-white/30" />
                {t(locale, 'Scroll through 01—04')}
              </div>
            </div>

            <div className="grid gap-8 lg:col-span-8 lg:gap-12 lg:pb-[18vh]">
              {VALUES.map((value, index) => (
                <div
                  key={value.name}
                  className="eid-sticky-card"
                  style={{ '--eid-sticky-top': `${6.5 + index * 1.15}rem` } as CSSProperties}
                >
                  <ScrollReveal delay={index * 0.045}>
                    <PhotoCard
                      className="ring-2 ring-white/85 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.72)]"
                      minHeight="min-h-[360px] lg:min-h-[58svh]"
                      weight="heavy"
                      eyebrow={String(index + 1).padStart(2, '0')}
                      title={t(locale, value.name)}
                      body={t(locale, value.body)}
                      image={value.image}
                      alt={t(locale, value.alt)}
                    />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </EvidencePanel>
      </div>
    </section>
  )
}

export default CoreValues
