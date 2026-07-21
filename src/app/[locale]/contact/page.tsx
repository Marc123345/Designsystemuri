import QuoteForm from '@/components/QuoteForm'
import { FeaturesRow, PageHero } from '@/components/sections'
import { ArrowButton, ChapterMarker, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { getProducts } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Contact EID | Request a Quote or Sample' },
    description:
      'Contact EID for industrial diamond and CBN quotes, samples, and technical specs. London manufacturer, real technical replies within one business day.',
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
        desc="Tell us the grade you need. Request a quote, order a sample, or ask a technical question. One form, and a real person who works with the material replies within one business day."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        primaryCta={{ label: 'Request a Quote', href: '/contact' }}
        secondaryCta={{ label: 'View Products', href: '/products' }}
      />

      {/* The panel copy sits beside the form rather than above it, so the
          pre-qualifying instruction is readable while the fields are filled. */}
      <section className="lg:py-30 py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <SectionHeading title="Tell us the grade you need." />
              <p className="mt-5 text-base text-default-600">
                Pick the closest product. Not sure? Choose &apos;Help me specify&apos; and describe
                your application. The dropdown pre-qualifies your enquiry so it arrives ready to
                action, and a real person replies within one business day.
              </p>
              <div className="mt-9">
                <ArrowButton
                  href="/resources/datasheets"
                  label="Download Datasheets"
                  variant="light"
                />
              </div>
            </div>

            <div className="rounded-md border border-default-200 bg-default-50 lg:p-10 p-6">
              <QuoteForm
                formTitle="Request a Quote"
                formDesc="Name, company, country, product, grade, size, quantity. Give us as much as you can and someone who works with the material replies within one business day."
                productOptions={productOptions}
              />
            </div>
          </div>

          <p className="mt-10 text-center text-base text-default-600">
            A real person replies within one business day, or email{' '}
            <a href={`mailto:${site.email}`} className="font-bold text-primary underline">
              {site.email}
            </a>
          </p>
        </div>
      </section>

      {/* COMPANY DETAILS + MAP */}
      <div className="container">
        <ChapterMarker index="02" label="Find Us" />
      </div>
      <section className="lg:py-24 py-16 pt-14">
        <div className="container">
          <SectionHeading eyebrow="Company details" title={site.name} />
          <ul className="mt-8 grid gap-4">
            <li className="flex gap-3">
              <Icon icon="tabler:map-pin" className="mt-0.5 size-6 shrink-0 text-primary" />
              <span className="text-base text-default-600">{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Icon icon="tabler:phone" className="mt-0.5 size-6 shrink-0 text-primary" />
              <span className="text-base text-default-600">
                Tel: {site.phone} · Fax: {site.fax}
              </span>
            </li>
            {/* WhatsApp is a persistent, shared channel — one tap reaches the
                London landline, so a reply is not blocked on one person. */}
            <li className="flex gap-3">
              <Icon
                icon="tabler:brand-whatsapp"
                className="mt-0.5 size-6 shrink-0 text-[#25d366]"
              />
              <span className="text-base text-default-600">
                WhatsApp:{' '}
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {site.whatsapp}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Icon icon="tabler:mail" className="mt-0.5 size-6 shrink-0 text-primary" />
              <a href={`mailto:${site.email}`} className="text-base text-primary underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="container pb-14">
        <ChapterMarker index="03" label="Why EID" />
      </div>
      <FeaturesRow
        items={[
          {
            title: 'ISO 9001 Certified',
            desc: 'Quality management certified across production and supply chain.',
            href: '/quality',
          },
          {
            title: 'In-House QC Laboratory',
            desc: 'Every batch tested before it ships, no surprises.',
            href: '/quality',
          },
          {
            title: "50+ Years' Experience",
            desc: 'Serving tool makers across Europe, the Middle East, and Asia.',
            href: '/about',
          },
          {
            title: 'Complete Superabrasive Range',
            desc: 'One supplier, one standard, one delivery to manage.',
            href: '/products',
          },
        ]}
      />
    </>
  )
}

export default ContactPage
