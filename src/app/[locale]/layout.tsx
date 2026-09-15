import { SITE_ORIGIN } from '@/app/sitemap'
import '@/assets/css/style.css'
import favicon from '@/assets/images/favicon.svg'
import SiteIntro from '@/components/SiteIntro'
import WhatsAppButton from '@/components/WhatsAppButton'
import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import { routing } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Crimson_Text, Noto_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

/* Mirrors the Ask Afrika pairing while using Next's font pipeline instead of
   an external Google Fonts stylesheet. */
const crimsonText = Crimson_Text({
  variable: '--font-crimson',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const notoSans = Noto_Sans({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
})

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EID Ltd',
  legalName: 'EID Ltd.',
  url: 'https://www.eid-ltd.com',
  description: 'London-based manufacturer of the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
  email: site.email,
  telephone: site.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'EID House, 12 St Cross Street',
    addressLocality: 'London',
    postalCode: 'EC1N 8UB',
    addressCountry: 'GB',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phone,
    email: site.email,
    contactType: 'sales',
    areaServed: 'Worldwide',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'Industrial Diamond & CBN Manufacturer | EID Ltd',
    template: '%s | EID Ltd',
  },
  icons: { icon: favicon.src },
  description: 'EID manufactures the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    siteName: 'EID Ltd',
    locale: 'en_GB',
    title: 'Industrial Diamond & CBN Manufacturer | EID Ltd',
    description: 'EID manufactures the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
    images: [{ url: '/eid/hero.png', width: 1200, height: 630, alt: 'EID Ltd — industrial diamond and CBN manufacturer, London' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial Diamond & CBN Manufacturer | EID Ltd',
    description: 'EID manufactures the full industrial diamond and CBN range, graded and QC-tested in-house. ISO 9001.',
    images: ['/eid/hero.png'],
  },
}

const LocaleLayout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${crimsonText.variable} ${notoSans.variable} antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
          <SiteIntro />
          <aside aria-label={t(locale, 'Quick contact')}>
            <WhatsAppButton />
          </aside>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
