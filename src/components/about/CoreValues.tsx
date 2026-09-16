import EvidencePanel from '@/components/EvidencePanel'
import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

const VALUES = [
  {
    name: 'Innovation',
    body: 'New coatings, tighter classifications and crystal orientations shaped around tool-maker requirements.',
    image: '/eid/facility/crystal-microscopy.png',
    alt: 'Diamond crystals under the microscope during morphology inspection',
  },
  {
    name: 'Family',
    body: 'A long-standing team with direct access to the people who work with the material.',
    image: '/eid/facility/diamond-grading-loupe.png',
    alt: 'A grader examining diamond grit through a loupe',
  },
  {
    name: 'Excellence',
    body: 'ISO 9001, lot traceability, certificates of analysis and retained batch samples.',
    image: '/eid/qc-samples.jpg',
    alt: 'A laboratory shelf of retention sample jars, one kept from every batch',
  },
  {
    name: 'Precision',
    body: 'Measured and graded so repeat orders arrive to the same specification.',
    image: '/eid/qc-inspection.jpg',
    alt: 'An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside',
  },
] as const

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="py-8 lg:py-10">
      <div className="container">
        <EvidencePanel className="px-5 py-6 sm:px-7 sm:py-7 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <h2 className="text-[28px] leading-none font-bold tracking-[-0.035em] text-white md:text-[34px]">{t(locale, 'Our core values')}</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => (
                <PhotoCard
                  key={value.name}
                  className="ring-1 ring-white/70 shadow-[0_18px_55px_-34px_rgba(0,0,0,0.65)]"
                  minHeight="min-h-[210px] lg:min-h-[220px]"
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
