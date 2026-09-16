import AboutMosaic from '@/components/about/AboutMosaic'
import CoreValues from '@/components/about/CoreValues'
import GlobeSection from '@/components/GlobeSection'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'About EID | Industrial Diamond Manufacturer, London' },
    description: 'EID has manufactured and quality-controlled industrial diamond and CBN since 1970, with its global headquarters in London and processing facilities serving toolmakers worldwide.',
    alternates: localeAlternates(locale, '/about'),
  }
}

/**
 * Uri's direction for About is to keep it short and company-focused: who EID
 * is, its evidence, its values, and its real production/logistics footprint.
 * QC process detail stays on /quality rather than being repeated here.
 */
const AboutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <VideoHero
        title={t(locale, 'About EID — Industrial Diamond Manufacturer')}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4"
        minHeight="min-h-[48svh]"
        objectPosition="object-center"
      />

      <AboutMosaic />
      <CoreValues />

      <GlobeSection
        eyebrow={t(locale, 'Global logistics reach')}
        title={t(locale, 'Production infrastructure. Global logistics reach.')}
        desc={t(
          locale,
          'Global headquarters in London, a primary processing plant in the Middle East Hub, a secondary processing facility in the United States, local technical representation across 7 major industrial countries, and established secure trade routes to toolmakers worldwide.'
        )}
      />

      <div aria-hidden className="h-12 lg:h-16" />
    </>
  )
}

export default AboutPage
