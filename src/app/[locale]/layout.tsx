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
  // Absolute URLs for Open Graph are built from this. Without it, next/metadata
  // emits relative og:image paths, which no scraper resolves.
  //
  // It has to be SITE_ORIGIN rather than a literal, because that is what
  // canonicals and hreflang already use. Hardcoding the real domain here while
  // those still resolved to the Vercel URL had the same page claiming two
  // different origins — og:url on eid-ltd.com, rel=canonical on
  // designsystemuri.vercel.app.
  //
  // AT LAUNCH: set NEXT_PUBLIC_SITE_URL to https://www.eid-ltd.com in the
  // Vercel project. Until then everything consistently points at the review
  // deployment, which is correct for a build that is not the real site yet.
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'Industrial Diamond & CBN Manufacturer | EID Ltd',
    template: '%s | EID Ltd',
  },
  icons: { icon: favicon.src },
  description: 'EID manufactures the full industrial diamond and CBN range: grit, powder, CVD single crystal, MCD, PCD and PCBN, graded and QC-tested in-house. ISO 9001.',
  robots: 'index, follow',
  // The site had no Open Graph or Twitter tags of any kind, so every page
  // shared into LinkedIn, WhatsApp or Slack arrived as a bare URL with no
  // title, description or image. For a supplier whose buyers pass links around
  // internally, that is the first impression a lot of people get.
  //
  // Declared here so every route inherits it; pages with their own
  // generateMetadata override the parts they care about.
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
    <html lang={locale} className={`${geist.variable} ${monaSans.variable} antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

        {/* Every video, poster and rendition comes from ImageKit, and the
            intro's clip is requested within milliseconds of the page painting.
            Without this the browser pays a DNS lookup plus a TLS handshake
            before the first byte of it arrives — on a phone that is commonly
            200-400ms of nothing happening, at the exact moment the brand
            moment is meant to start.

            `crossOrigin` is required: media is fetched anonymously, and a
            preconnect that does not match the eventual request's CORS mode
            opens a connection the browser then cannot reuse. */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="" />

        {/* The `.site-loader` noscript rule that used to sit here is gone with
            SiteLoader. It hid the overlay for visitors without JavaScript,
            because a script-dismissed panel would otherwise cover the site
            permanently. SiteIntro cannot create that problem: it renders
            nothing until its effect runs, so no-JS means no overlay at all. */}
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
          {/* Outside the page wrapper so it floats above every route. */}
          {/* Mounted here rather than as a loading.tsx boundary: a Suspense
              boundary lasts only as long as the server render, and these routes
              are prerendered, so it was invisible. Because the layout is not
              remounted on client navigation, this shows on a full page load and
              not again as you move around the site. */}
          <SiteIntro />
          {/* ⚠ WRAPPED IN A LANDMARK, and the wrapper is the whole point.
              The button is fixed-position and mounted here rather than inside
              any page, so it sat outside header, main and footer — axe flagged
              it on all seven pages, and a screen-reader user navigating by
              landmark never met the site's most persistent contact route. An
              `aside` with a name puts it on that list. The link inside already
              carries its own accessible name. */}
          <aside aria-label={t(locale, 'Quick contact')}>
            <WhatsAppButton />
          </aside>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
