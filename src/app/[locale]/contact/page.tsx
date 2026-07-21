import QuoteForm from '@/components/QuoteForm'
import { PageHero, TrustBar } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import Wireframe from '@/components/Wireframe'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getProducts } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
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
  const productOptions = ['Help me specify', ...getProducts(locale).map((p) => p.name)]

  return (
    <>
      <PageHero
        eyebrow="A real person replies within one business day"
        title="Contact Us / Request a Quote"
        desc="Request a quote, order a sample, or ask a technical question. One form, and a specialist who understands the material replies within one business day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        primaryCta={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCta={{ label: 'View Products', href: '/products' }}
      />

      {/* The panel copy sits beside the form rather than above it, so the
          pre-qualifying instruction is readable while the fields are filled. */}
      <section className="py-20 lg:py-30">
        <div className="container">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading title="Tell us the grade you need." />
              <p className="text-default-600 mt-5 text-base">Request a quote, order a sample, or ask a technical question. One form, and a specialist who understands the material replies within one business day.</p>
              <p className="text-default-600 mt-5 text-base">
                The more you can tell us upfront, product, grade, size, and quantity, the faster we can give a useful answer instead of coming back with basic questions. Not sure of the exact grade? Give us the material you are working and the finish you need, and we will specify
                it for you.
              </p>
              <p className="text-default-600 mt-5 text-base">
                Prefer to talk first? Email{' '}
                <a href={`mailto:${site.email}`} className="text-primary underline">
                  {site.email}
                </a>{' '}
                or call{' '}
                <a href={site.phoneHref} className="text-primary underline">
                  {site.phone}
                </a>
                . You can also reach us on WhatsApp using the icon in the header.
              </p>
              <div className="mt-9">
                <ArrowButton href="/resources/datasheets" label="Download Datasheets" variant="light" />
              </div>
            </div>

            <div className="border-default-200 bg-default-50 rounded-md border p-6 lg:p-10">
              <QuoteForm formTitle="Request a Quote" formDesc="Tell us the product, grade, size, and quantity you need. A specialist who understands the material replies within one business day." productOptions={productOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY DETAILS + MAP */}
      <div className="container">
        <ChapterMarker index="02" label="Find Us" />
      </div>
      <section className="py-16 pt-14 lg:py-24">
        <div className="container">
          <SectionHeading eyebrow="Company details" title={site.name} />
          <ul className="mt-8 grid gap-4">
            <li className="flex gap-3">
              <Icon icon="tabler:map-pin" className="text-primary mt-0.5 size-6 shrink-0" />
              <span className="text-default-600 text-base">EID House, 12 St. Cross Street, London, EC1N 8UB, England</span>
            </li>
            <li className="flex gap-3">
              <Icon icon="tabler:phone" className="text-primary mt-0.5 size-6 shrink-0" />
              <span className="text-default-600 text-base">Tel: {site.phone}</span>
            </li>
            {/* WhatsApp is a persistent, shared channel — one tap reaches the
                London landline, so a reply is not blocked on one person. */}
            <li className="flex gap-3">
              <Icon icon="tabler:brand-whatsapp" className="mt-0.5 size-6 shrink-0 text-[#25d366]" />
              <span className="text-default-600 text-base">
                WhatsApp:{' '}
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  {site.whatsapp}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Icon icon="tabler:mail" className="text-primary mt-0.5 size-6 shrink-0" />
              <a href={`mailto:${site.email}`} className="text-primary text-base underline">
                {site.email}
              </a>
            </li>
          </ul>

          {/* A map is optional and low priority for a B2B manufacturer whose
              buyers order remotely, so it stays small and below the form. */}
          <div className="mt-10 max-w-[420px]">
            <Wireframe label="Map — EID House, 12 St. Cross Street, London EC1N 8UB" ratio="square" />
          </div>
        </div>
      </section>

      <div className="container pb-14">
        <ChapterMarker index="03" label="Why EID" />
      </div>
      <TrustBar items={['ISO 9001 Certified', 'In-House QC Laboratory', "50+ Years' Experience", 'Complete Superabrasive Range']} />
    </>
  )
}

export default ContactPage
