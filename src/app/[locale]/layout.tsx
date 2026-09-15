import { SITE_ORIGIN } from '@/app/sitemap'
import '@/assets/css/eid.css'
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
import { Geist, Mona_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

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
    /* UI Upgrade: Added scroll-smooth for anchor links and custom selection colors 
       so highlighting text feels branded. */
    <html lang={locale} className={`scroll-smooth ${geist.variable} ${monaSans.variable} antialiased selection:bg-primary selection:text-white`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="" />
      </head>

      <body className="relative min-h-screen bg-white text-default-900" suppressHydrationWarning>

        {/* UI Upgrade: The Tactile Film Grain. 
            This sits above the background but below the content (z-0). It adds a microscopic 
            texture to the entire site, giving it a physical, premium feel that suits 
            industrial diamond manufacturing perfectly. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-multiply"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        <NextIntlClientProvider>
          {/* Ensure page content sits above the global noise */}
          <div className="relative z-10 flex min-h-screen flex-col">
            <AppProvidersWrapper>{children}</AppProvidersWrapper>
          </div>

          <SiteIntro />

          {/* UI Upgrade: The WhatsApp button container. 
              Assuming WhatsAppButton manages its own fixed positioning, we add a subtle 
              drop-shadow and a group class here to allow for cohesive hover states. */}
          <aside
            aria-label={t(locale, 'Quick contact')}
            className="group fixed bottom-6 right-6 z-[999] isolate"
          >
            {/* Optional glow effect behind the button that activates on hover */}
            <div className="absolute inset-0 -z-10 rounded-full bg-green-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
            <WhatsAppButton />
          </aside>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
