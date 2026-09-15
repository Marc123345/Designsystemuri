import CurtainGrid from '@/components/CurtainGrid'
import ApplicationIndex from '@/components/home/ApplicationIndex'
import ProofPanel from '@/components/home/ProofPanel'
import QualityControlsStrip from '@/components/home/QualityControlsStrip'
import CanvasField from '@/components/CanvasField'
import { Faq } from '@/components/sections'
import { Eyebrow } from '@/components/ui'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
import { localeAlternates } from '@/lib/hreflang'
import { getApplications, getProducts, t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

const PATTERN = 'https://ik.imagekit.io/qcvroy8xpd/66130b346905fe180d5723adb240f26b00187552.png'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return { alternates: localeAlternates(locale, '/') }
}

const hero = {
  title: 'Industrial Diamond — Manufactured In-House Since 1970',
}

const faqs = [
  {
    q: 'Where are you based, and what does EID do to the material?',
    a: 'EID is based in London, England, at EID House, 12 St. Cross Street, EC1N 8UB, and has manufactured industrial diamond since 1970. Natural diamond grit, micron powder, rotary diamond and tool stones are manufactured in our own factory: raw material is crushed, shaped, graded and QC-passed here. Across the rest of the range — metal bond, resin bond, CBN, PCD, PCBN, CVD and MCD — the specification is ours, and the material is processed, coated, graded and inspected through our facility before it ships. All rough diamond is supplied through legitimate conflict-free sources under the Kimberley Process Certification Scheme.',
  },
  {
    q: 'Are you ISO-registered, and can you supply COAs, retention samples and references?',
    a: 'Yes to all of it. EID’s quality management system is ISO 9001 certified, covering incoming raw material inspection, manufacturing, testing, packaging and delivery. A certificate of analysis is available per lot on request, and a retention sample is kept from every batch, so a question raised months later can be checked against the exact material that shipped. The document set a procurement or quality department normally asks for is available: ISO 9001 certificate, COA per lot, safety data sheets, technical datasheets, Kimberley Process compliance for natural rough, and lot-level traceability from incoming raw material to shipped lot. Customer references can be arranged where the customer has agreed to act as one — tell us your application and we will point you at the closest match. If your supplier-approval pack asks for something not on that list, send it over and we will complete it.',
  },
  {
    q: 'Do you offer electroplated / electroplating diamonds?',
    a: 'Yes, and several grades are specified for it. In the natural range, NS-100-P and the MB series are recommended for electroplated tools. In CBN, EBN A and EBN AA are used in electroplated single-layer bonds. We also etch crystal surfaces specifically for electroplating, which improves nickel-to-diamond clamping in micro-engineering applications — that is covered in the coated sections of the [metal bond](/products/metal-bond#coated) and [CBN](/products/cbn#coated) pages, and in the Polish, Etch & CRT datasheet.',
  },
  {
    q: 'Can I download product specifications as a PDF?',
    a: 'Yes, and they are ungated: no form, no login, no email address. Eighteen technical datasheets covering the full range are published under [Resources](/resources/datasheets), each with grades, descriptions, size charts and coating options, and each product page links straight to its own sheet. Safety data sheets for natural, synthetic and CBN materials are published the same way under [MSDS](/resources/msds). If the exact specification you need is not on a published sheet, ask us and we will send it.',
  },
  {
    q: 'What industries and applications do you serve?',
    a: 'The material goes into your product. The main sectors are dental, semiconductor and advanced electronics, automotive and aerospace, tool and die, construction and stone, and optics. By operation, that means grinding, cutting, sawing and drilling; polishing and lapping; dressing and truing; and precision machining with PCD, PCBN, MCD and CVD single crystal. Tell us the material you are working and the finish you need and we will specify the grade.',
  },
  {
    q: 'Can you customise products and do the finishing in-house?',
    a: 'Yes. Standard grades ship from stock and custom specifications are made to order: custom mesh and micron sizing, shape factor to your requirement, and CVD single crystal grown to a specified orientation and face. Finishing is done in our own facility — electroless nickel and copper coating at 30%, 56%, 60% or any percentage you specify, metallic PVD coatings including Ti, TiC, TiN, TiCN, Si, Cu, Cr and Zr, surface polishing, etching for electroplating, and CRT crystal rounding for customised engineering applications.',
  },
  {
    q: 'Can you supply customers who feed into large OEMs such as Boeing or Rolls-Royce?',
    a: 'Yes — we supply tool makers whose tooling and components feed aerospace, automotive and energy programmes, and we are set up for the documentation those supply chains run on: ISO 9001, certificate of analysis per lot, retention samples, lot traceability from raw material to delivery, and safety data sheets. To be clear about what that does and does not mean: EID is approved as your supplier, not as a direct supplier to those OEMs, and any flow-down requirement in your own approval sits with you. Send us the requirement and we will tell you plainly whether we can meet it.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
  })),
}

const HOME_HUB_ORDER = [
  'dental',
  'grinding-cutting-sawing-drilling',
  'semiconductor-electronics',
  'automotive-aerospace',
  'tool-and-die',
  'polishing-lapping',
]

const Home = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  const products = getProducts(locale)
  const apps = getApplications(locale)

  const groupTiles = products.map((p) => ({
    title: p.name,
    href: `/products/${p.slug}`,
    image: { src: productImage(p.slug) ?? '', alt: '' },
  }))

  const hubEntries = HOME_HUB_ORDER.map((slug) => apps.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .map((a) => ({ slug: a.slug, name: a.name }))

  return (
    <>
      <VideoHero
        title={t(locale, hero.title)}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20VIDEO%20HERO.mp4"
        minHeight="min-h-[60svh]"
        scrollCue
      />

      <section
        id="products"
        data-note="range"
        className="relative isolate py-20 lg:py-30"
        style={{
          backgroundImage: `url(${PATTERN})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          backgroundSize: '720px auto',
        }}
      >
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>{t(locale, 'The range')}</Eyebrow>
            <h2
              className="mt-4 text-[30px] leading-[33px] sm:text-[36px] sm:leading-[39px]"
              style={{
                fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
              }}
            >
              <span className="text-[#6070A1]">
                {t(locale, 'Every industrial diamond and')}
                <br />
                {t(locale, 'CBN product,')}{' '}
              </span>
              <span className="text-black">{t(locale, 'from one source.')}</span>
            </h2>
          </div>

          <div className="mt-14 lg:mt-18">
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
              alt: t(locale, 'Side-by-side scanning electron micrographs of two production lots of the same diamond grade, showing matching crystal size and octahedral morphology, each panel with a 1 micrometre scale bar'),
            },
          },
          {
            meta: t(locale, 'Breadth'),
            title: t(locale, 'The full range, one relationship.'),
            href: '/#products',
            image: {
              src: '/eid/qc-samples.jpg',
              alt: t(locale, 'A laboratory shelf of sample jars, each holding a different grade of grey and translucent diamond material, coarse through to fine'),
            },
          },
        ]}
      />

      <section id="applications" data-note="applications" className="bg-canvas relative isolate py-14 lg:py-20">
        <CanvasField density="medium" />
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{t(locale, 'Applications')}</Eyebrow>
            <h2 className="mt-4 text-[24px] font-bold text-balance md:text-[30px] lg:text-[34px]">
              {t(locale, 'Where our diamond and CBN go to work.')}
            </h2>
          </div>

          <div className="mt-8 lg:mt-10">
            <ApplicationIndex hubs={hubEntries} locale={locale} />
          </div>
        </div>
      </section>

      <QualityControlsStrip locale={locale} />

      <Faq
        eyebrow={t(locale, 'Frequently asked')}
        title={t(locale, 'Straight answers about the material.')}
        desc={t(locale, 'The questions technical buyers ask before they qualify a superabrasive supplier. If yours is not here, ask us and someone who works with the material will answer.')}
        items={faqs.map((f) => ({ q: t(locale, f.q), a: t(locale, f.a) }))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

export default Home
