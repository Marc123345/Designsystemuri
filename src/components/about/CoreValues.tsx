import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const VALUES = [
  {
    name: 'Innovation',
    body: 'Fifty-five years in, the range still grows with what tool makers ask for: new coatings, tighter classifications, crystal grown to a specified orientation.',
    image: '/eid/facility/crystal-microscopy.png',
    alt: 'Diamond crystals under the microscope during morphology inspection',
  },
  {
    name: 'Family',
    body: 'A small team that has been doing this a long time, with direct access to the people who work with the material.',
    image: '/eid/facility/diamond-grading-loupe.png',
    alt: 'A grader examining diamond grit through a loupe',
  },
  {
    name: 'Excellence',
    body: 'Built to perform and documented to prove it: ISO 9001, lot traceability, certificates of analysis and retention samples.',
    image: '/eid/qc-samples.jpg',
    alt: 'A laboratory shelf of retention sample jars, one kept from every batch',
  },
  {
    name: 'Precision',
    body: 'Measured, graded and controlled so repeat orders arrive to the same specification.',
    image: '/eid/qc-inspection.jpg',
    alt: 'An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside',
  },
] as const

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="py-10 lg:py-12">
      <div className="container">
        <EvidencePanel className="px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-9">
          <div className="flex flex-col gap-7">
            <div className="text-center">
              <h2 className="text-[30px] leading-none font-bold tracking-[-0.035em] text-white md:text-[38px]">{t(locale, 'Our core values')}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => (
                <PhotoCard
                  key={value.name}
                  className="ring-1 ring-white/70 shadow-[0_18px_55px_-34px_rgba(0,0,0,0.65)]"
                  minHeight="min-h-[230px] lg:min-h-[250px]"
                  weight="heavy"
                  title={t(locale, value.name)}
                  body={t(locale, value.body)}
                  image={value.image}
                  alt={t(locale, value.alt)}
                />
              ))}
            </div>
          </div>
        </EvidencePanel>
      </div>
    </section>
  )
}

export default CoreValues
