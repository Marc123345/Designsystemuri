import CanvasField from '@/components/CanvasField'
import CurtainGrid from '@/components/CurtainGrid'
import ApplicationIndex from '@/components/home/ApplicationIndex'
import HomeFaq from '@/components/home/HomeFaq'
import ProofPanel from '@/components/home/ProofPanel'
import QualityControlsStrip from '@/components/home/QualityControlsStrip'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, getProducts, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates(locale, '/') }
}

const faqs = [
  {
    q: 'Can you customize products for us?',
    a: 'Yes. Standard grades ship from stock, while custom specifications — including bespoke mesh/micron sizing, specific shape factors, custom CVD single crystal in all orientations — 100, 110, 111 — and specialized metallic PVD/electroless coatings — are made to order.',
  },
  {
    q: 'Do you offer diamond and CBN grades suitable for electroplated or vitrified tools?',
    a: 'Yes. We engineer and supply Diamond and CBN grits specifically optimized for both electroplated and vitrified bond manufacturing.',
  },
  {
    q: 'Can I download product specifications as a PDF?',
    a: 'Yes. All 18 technical datasheets and MSDS documents are completely ungated — no forms, logins, or email addresses required. You can download them directly from our Resources page or individual product pages. If you need a custom specification not listed, contact us and we will send it directly.',
  },
  {
    q: 'Are you ISO-registered, and can you supply COAs, retention samples, and references?',
    a: 'Yes. EID’s quality management system is ISO 9001 certified, covering everything from raw material inspection to final delivery. We routinely provide full documentation packs for supplier approval, including: ISO 9001 Certification and full lot-level traceability; Certificates of Analysis (COAs) available per lot on request; retention samples kept from every batch to check against future quality queries; and Kimberley Process compliance for all natural rough diamonds.',
  },
  {
    q: 'Do your raw diamond and CBN materials have a shelf life or specific storage requirements?',
    a: 'No, our raw diamond and CBN materials do not degrade and have an indefinite shelf life when stored correctly. To maintain optimal purity and performance, we recommend storing the materials in their original sealed containers in a dry, climate-controlled environment to prevent moisture contamination or ambient oxidation.',
  },
  {
    q: 'What are your standard lead times, and do you ship internationally?',
    a: 'Yes, we supply tool makers globally from our HQ in London (or from our Dublin facility, if EU exports are an advantage). Standard catalog grades ship directly from stock usually within 24 to 48 hours, while custom specifications, rounding, or specialized PVD/electroless coatings are made to order with lead times tailored to your project timeline.',
  },
  {
    q: 'Do you offer consignment stock options?',
    a: 'Yes, we provide tailored consignment inventory programs to support our partners’ supply chain security. However, these programs are restricted to high-volume enterprise accounts with stable, recurring production runs and are subject to minimum annual volume commitments.',
  },
  {
    q: "Why aren't prices listed on your website, and what do you need to provide a quote?",
    a: 'Pricing varies depending on your chosen material type, custom dimensions, or specialized requirements. To get a fast quotation, please contact us with your required product specifications, dimensions, and your target industry application.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const HOME_HUB_ORDER = ['dental', 'grinding-cutting-sawing-drilling', 'semiconductor-electronics', 'automotive-aerospace', 'tool-and-die', 'polishing-lapping']

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)
  const applications = getApplications(locale)

  const groupTiles = products.map((product) => ({
    title: product.name,
    href: `/products/${product.slug}`,
    image: { src: productImage(product.slug) ?? '', alt: '' },
  }))

  const hubEntries = HOME_HUB_ORDER.map((slug) => applications.find((application) => application.slug === slug))
    .filter((application): application is NonNullable<typeof application> => Boolean(application))
    .map((application) => ({ slug: application.slug, name: application.name }))

  return (
    <>
      <VideoHero
        title={t(locale, 'Industrial Diamond — Manufactured In-House Since 1970')}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20VIDEO%20HERO.mp4"
        minHeight="min-h-[60svh]"
        scrollCue
      />

      <section id="products" data-note="range" className="relative isolate py-12 lg:py-16">
        <CanvasField density="coarse" mark="end" />
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{t(locale, 'The range')}</p>
            <h2 className="mt-3 text-[26px] font-bold text-balance md:text-[32px] lg:text-[36px]">
              {t(locale, 'Every industrial diamond and CBN product, from one source.')}
            </h2>
          </div>

          <div className="mt-8 lg:mt-10">
            <CurtainGrid items={groupTiles} columns={4} revealed />
          </div>
        </div>
      </section>

      <ProofPanel
        eyebrow={t(locale, 'Why tool makers qualify EID')}
        title={t(locale, 'One accountable manufacturer, spec to delivery.')}
        ghost={t(locale, 'Industrial diamond')}
        aspect="landscape"
        pillars={[
          {
            meta: t(locale, 'Accountability'),
            title: t(locale, 'We control production, not just supply.'),
            href: '/about',
            image: {
              src: '/eid/qc-sieve.jpg',
              alt: t(locale, 'A technician operating a stack of laboratory test sieves beside a tray of graded grey diamond grit'),
            },
          },
          {
            meta: t(locale, 'Consistency'),
            title: t(locale, 'The same material, every reorder.'),
            href: '/quality',
            image: {
              src: '/eid/qc-batch-to-batch.jpg',
              alt: t(locale, 'Side-by-side scanning electron micrographs of two production lots of the same diamond grade'),
            },
          },
          {
            meta: t(locale, 'Breadth'),
            title: t(locale, 'The full range, one relationship.'),
            href: '/#products',
            image: {
              src: '/eid/qc-samples.jpg',
              alt: t(locale, 'A laboratory shelf of sample jars holding different grades of diamond material'),
            },
          },
        ]}
      />

      <section id="applications" data-note="applications" className="bg-canvas relative isolate py-10 lg:py-14">
        <CanvasField density="medium" />
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-primary-3 text-[34px] leading-none font-bold tracking-[-0.035em] md:text-[44px] lg:text-[52px]">
              {t(locale, 'Applications')}
            </h2>
            <p className="text-default-600 mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed md:text-base">
              {t(locale, 'Some of the places our diamond and CBN go to work.')}
            </p>
          </div>

          <div className="mt-7 lg:mt-8">
            <ApplicationIndex hubs={hubEntries} locale={locale} />
          </div>
        </div>
      </section>

      <QualityControlsStrip locale={locale} />

      <HomeFaq
        eyebrow={t(locale, 'Frequently asked')}
        title={t(locale, 'Straight answers about the material.')}
        desc={t(locale, 'The questions technical buyers ask before they qualify a superabrasive supplier. If yours is not here, ask us and someone who works with the material will answer.')}
        items={faqs.map((faq) => ({ q: t(locale, faq.q), a: t(locale, faq.a) }))}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export default Home
