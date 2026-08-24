import GlobeSection from '@/components/GlobeSection'
import Marquee from '@/components/Marquee'
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
        /* Was /eid/home/hero.jpg, which is the home page's own hero — the two
           pages opened on the same photograph. The laboratory shot is unused
           elsewhere and is at least the room the reply will come from. */
        bgImage="/eid/home/qc.jpg"
      />

      {/* The panel copy sits beside the form rather than above it, so the
          pre-qualifying instruction is readable while the fields are filled.

          The opening paragraph here used to be the hero lede repeated word for
          word, about 400px below itself. Someone who reads both is being told
          the same sentence twice before reaching a single field, so the second
          copy is gone and the column now opens on the instruction that actually
          changes what they type. */}
      <section data-note="quote" className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow={t(locale, 'One form')} title={t(locale, 'Tell us the grade you need.')} />

              <p className="text-default-600 mt-5 text-base leading-relaxed">
                {t(
                  locale,
                  'The more you can tell us upfront, product, grade, size, and quantity, the faster we can give a useful answer instead of coming back with basic questions. Not sure of the exact grade? Give us the material you are working and the finish you need, and we will specify it for you.'
                )}
              </p>

              {/* Three routes, on the hairline grid the rest of the site uses,
                  rather than a sentence with two links buried in it. Anyone who
                  would rather phone than fill in a form is looking for a number,
                  and a number is easier to find in a column than in prose. */}
              <dl className="bg-default-200 mt-9 grid gap-px sm:grid-cols-3">
                {[
                  { label: t(locale, 'Email'), value: site.email, href: `mailto:${site.email}` },
                  { label: t(locale, 'Phone'), value: site.phone, href: site.phoneHref },
                  { label: t(locale, 'WhatsApp'), value: t(locale, 'Message us'), href: site.whatsappHref },
                ].map((row) => (
                  <div key={row.label} className="bg-white p-5">
                    <dt className="text-default-500 text-xs tracking-[0.18em] uppercase">{row.label}</dt>
                    <dd className="mt-2">
                      <a href={row.href} className="text-default-900 hover:text-primary text-[0.95rem] font-semibold break-words">
                        {row.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9">
                <ArrowButton href="/resources/datasheets" label={t(locale, 'Download Datasheets')} variant="light" />
              </div>
            </div>

            <div className="border-default-200 bg-default-50 border p-6 lg:p-10">
              {/* The form's own title was "Request a Quote", which is the page's
                  h1 — two identical headings on one screen, and the second one
                  told the visitor nothing the first had not. It names the fields
                  instead. */}
              <QuoteForm
                formTitle={t(locale, 'Your requirement')}
                formDesc={t(locale, 'Product, grade, size, and quantity if you have them. A specialist who understands the material replies within one business day.')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The range passing between the form and the shipping map, the same band
          About and the home page use to change subject. */}
      <Marquee
        items={[
          t(locale, 'Natural Diamond Grit'),
          t(locale, 'Micron Powder'),
          t(locale, 'CBN'),
          t(locale, 'PCBN'),
          t(locale, 'CVD Single Crystal'),
          t(locale, 'MCD'),
          t(locale, 'PCD Blanks'),
          t(locale, 'Metal Bond'),
          t(locale, 'Resin Bond'),
        ]}
        secondary={[
          t(locale, 'Samples on request'),
          t(locale, 'Technical specification support'),
          t(locale, 'One business day'),
          t(locale, 'Made in London'),
        ]}
      />

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
