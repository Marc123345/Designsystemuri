import AboutMosaic from '@/components/about/AboutMosaic'
import CoreValues from '@/components/about/CoreValues'
import SupplyReach from '@/components/about/SupplyReach'
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

const AboutPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <VideoHero
        title={t(locale, 'About EID — Industrial Diamond Manufacturer')}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4"
        minHeight="min-h-[42svh]"
        objectPosition="object-center"
      />

      <AboutMosaic />
      <CoreValues />
      <SupplyReach />
    </>
  )
}

export default AboutPage
