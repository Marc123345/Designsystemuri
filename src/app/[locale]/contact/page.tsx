import GlobeSection from '@/components/GlobeSection'
import QuoteForm from '@/components/QuoteForm'
import { PageHero } from '@/components/sections'
import { ArrowButton, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Contact EID | Request a Quote or Sample' },
    description: 'Contact EID for industrial diamond and CBN quotes, samples, and technical specs. London manufacturer, real technical replies within one business day.',
    alternates: localeAlternates(locale, '/contact'),
  }
}

const ContactPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  // "Help me specify" leads the list so the buyer who cannot name a grade still
  // has a first-class option instead of guessing at a product family.

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'A real person replies within one business day')}
        title={t(locale, 'Request a Quote')}
        desc={t(locale, 'Request a quote, order a sample, or ask a technical question. One form, and a specialist who understands the material replies within one business day.')}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Contact') }]}
      />

      {/* The panel copy sits beside the form rather than above it, so the
pre-qualifying instruction is readable while the fields are filled. */}
      <section className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading title={t(locale, 'Tell us the grade you need.')} />
              <p className="text-default-600 mt-5 text-base">{t(locale, 'Request a quote, order a sample, or ask a technical question. One form, and a specialist who understands the material replies within one business day.')}</p>
              <p className="text-default-600 mt-5 text-base">
                {t(
                  locale,
                  'The more you can tell us upfront, product, grade, size, and quantity, the faster we can give a useful answer instead of coming back with basic questions. Not sure of the exact grade? Give us the material you are working and the finish you need, and we will specify it for you.'
                )}
              </p>
              <p className="text-default-600 mt-5 text-base">
                {t(locale, 'Prefer to talk first? Email')}{' '}
                <a href={`mailto:${site.email}`} className="text-primary underline">
                  {site.email}
                </a>{' '}
                {t(locale, 'or call')}{' '}
                <a href={site.phoneHref} className="text-primary underline">
                  {site.phone}
                </a>
                . {t(locale, 'You can also reach us on WhatsApp using the icon in the header.')}
              </p>
              <div className="mt-9">
                <ArrowButton href="/resources/datasheets" label={t(locale, 'Download Datasheets')} variant="light" />
              </div>
            </div>

            <div className="border-default-200 bg-default-50 border p-6 lg:p-10">
              <QuoteForm formTitle={t(locale, 'Request a Quote')} formDesc={t(locale, 'Tell us the product, grade, size, and quantity you need. A specialist who understands the material replies within one business day.')} />
            </div>
          </div>
        </div>
      </section>

      {/* "Do you ship to me?" is the question that follows the form, so the
          reach section answers it here as well as on the home page. Its CTA is
          repointed at the range — the default sends people to /contact, which
          on this page is a link back to where they already are. */}
      {/* /#products, not /products. There is no products hub route — the
          product pages are products/[slug] only — so /products 404s in every
          locale. The navbar's Products entry already points at the home page
          anchor for the same reason; this was the one place that did not. */}
      <GlobeSection ctaLabel={t(locale, 'See the full range')} ctaHref="/#products" />
    </>
  )
}

export default ContactPage
