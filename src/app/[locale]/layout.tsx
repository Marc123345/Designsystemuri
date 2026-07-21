import favicon from '@/assets/images/favicon.svg'
import WhatsAppButton from '@/components/WhatsAppButton'
import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import { Geist, Mona_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import '@/assets/css/style.css'

const geist = Geist({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const monaSans = Mona_Sans({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})

// Organization / LocalBusiness structured data (real EID NAP details).
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EID Ltd',
  legalName: 'EID Ltd.',
  url: 'https://www.eid-ltd.com',
  description:
    'London-based manufacturer of the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
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
  title: {
    default: 'Industrial Diamond & CBN Manufacturer | EID Ltd',
    template: '%s | EID Ltd',
  },
  icons: { icon: favicon.src },
  description:
    'EID manufactures the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
  robots: 'index, follow',
}

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) => {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${geist.variable} ${monaSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
          {/* Outside the page wrapper so it floats above every route. */}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
