import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

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

const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="py-16 lg:py-24">
      <div className="container">
        <EvidencePanel className="px-5 py-9 sm:px-7 sm:py-11 lg:px-10 lg:py-12 xl:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[28px] font-bold text-white md:text-[34px] lg:text-[38px]">
              {t(locale, 'Our core values')}
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-white/72">
              {t(locale, 'Four things that have not changed since 1970, and that a buyer can check against every order.')}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:gap-6 lg:mt-12 lg:grid-cols-12">
            {VALUES.map((v, i) => (
              <PhotoCard
                key={v.name}
                className={`${SPANS[i]} ring-2 ring-white/85`}
                minHeight="min-h-[340px] lg:min-h-[380px]"
                weight="heavy"
                eyebrow={String(i + 1).padStart(2, '0')}
                title={t(locale, v.name)}
                body={t(locale, v.body)}
                image={v.image}
                alt={t(locale, v.alt)}
              />
            ))}
          </div>
        </EvidencePanel>
      </div>
    </section>
  )
}

export default CoreValues
