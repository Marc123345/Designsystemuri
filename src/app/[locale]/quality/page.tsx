import { PageHero } from '@/components/sections'
import Marquee from '@/components/Marquee'
import SplitSlider from '@/components/SplitSlider'
import { ArrowButton, SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Quality Control & Laboratory Standards | EID Ltd' },
    description:
      'Every batch of EID diamond and CBN powder undergoes laboratory validation — sieve and micron sizing, morphology, chemical cleaning and optional toughness testing — against FEPA, ISO 6106 and ANSI standards.',
    alternates: localeAlternates(locale, '/quality'),
  }
}

/**
 * The four controls, as Uri specified them.
 *
 * Two notes on how they are rendered.
 *
 * The spec heads each card with an emoji. The rest of this site has none, and
 * uses Iconify throughout — a line icon carries the same "here is the marker
 * for this card" job in the register the page is already written in. Swap the
 * `icon` values for the emoji if that reads better on review; nothing else
 * changes.
 *
 * Every card names the photograph it wants. Three of the four already exist in
 * the library and are wired in. The fourth — the T.I. milling and crush chamber
 * — does not, so that slot is a labelled Wireframe naming the shot, the same
 * placeholder the rest of the site uses for an outstanding asset.
 */
const controls = [
  {
    n: '01',
    icon: 'tabler:ruler-measure',
    title: 'Size & Morphology: Mesh',
    points: [
      ['Precision size separation', 'Mechanical test sieves separate and sort diamond grit into uniform sizes.'],
      ['Morphological sorting', 'Automated shape-sorting tables separate the different crystal shapes — from sharp, fast-cutting grains to tough, blocky crystals.'],
      ['Visual microscope check', 'Microscope checks run throughout production to monitor batch appearance, colour consistency, crystal structure and general uniformity.'],
      ['Image Pro validation', 'Final batches are processed through image analysis software, documenting size distribution and shape factor together.'],
    ],
    image: '/eid/qc-sieve.jpg',
    alt: 'A technician operating a stack of laboratory test sieves beside a tray of graded diamond grit',
  },
  {
    n: '02',
    icon: 'tabler:microscope',
    title: 'Size & Morphology: Micron',
    points: [
      ['Advanced particle separation', 'Sedimentation and centrifugation classify micron and sub-micron sizes.'],
      ['Malvern PSD reporting', 'Every lot is measured on Malvern particle size distribution equipment, generating a distribution curve.'],
      ['SEM verification', 'Scanning electron microscopy inspects final grain morphology and confirms the absence of oversized or undersized particles.'],
    ],
    image: '/eid/qc-micron-sem.jpg',
    alt: 'Scanning electron micrograph of micron diamond powder with the particle size distribution visible',
  },
  {
    n: '03',
    icon: 'tabler:droplet',
    title: 'Advanced Chemical Cleaning',
    points: [
      ['Targeted impurity removal', 'Chemical washing strips surface impurities, processing dust and metallic residues where high purity is required.'],
      ['Surface purity control', 'The treatment clears crystal surfaces, allowing better bond adhesion during tool manufacturing.'],
      ['Visual purity inspection', 'Optical checks under the microscope confirm the cleaned material is consistent.'],
    ],
    image: '/eid/qc-batch-to-batch.jpg',
    alt: 'Scanning electron micrograph of cleaned diamond crystals against a 1 micron scale bar',
  },
  {
    n: '04',
    icon: 'tabler:hammer',
    title: 'Toughness (TI / TTI)',
    note: 'Optional — the three controls above run on every batch; this one is by request.',
    points: [
      ['Toughness Index (TI)', 'A room-temperature milling test that measures how the crystal breaks down under impact. For high-impact work where size and shape alone do not predict tool life.'],
      ['Thermal Toughness Index (TTI)', 'The same measurement after a heat cycle, for crystals that have to survive the temperatures of tool manufacturing.'],
    ],
    imageLabel: 'T.I. milling and crush chamber equipment — photograph pending',
  },
] as const

const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <PageHero
        eyebrow={t(locale, 'Quality control')}
        title={t(locale, 'Our Quality Control & Laboratory Standards')}
        desc={t(
          locale,
          'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot. Our QC is built into every stage, from raw material selection through grading, crushing, chemical cleaning, coating and final inspection, and the in-house QC laboratory is the backbone of everything we ship.'
        )}
        crumbs={[{ label: t(locale, 'Home'), href: '/' }, { label: t(locale, 'Quality') }]}
        /* Was qc-lab.jpg. That is a white-walled laboratory with no dark
           values in it at all, and under the hero scrim it went to flat grey —
           the room was there and nothing in it could be seen. This one holds
           its tone: a dark-suited grader, a navy tray, the skyline behind. It
           is also the page's subject, which the wide lab shot was only
           adjacent to. */
        bgImage="/eid/facility/diamond-grading-loupe.png"
      />

      {/* COMPLIANCE — one thin strip, not a section. Both statements are
          credentials rather than an argument, so they sit on a single rule
          under the hero and take a line each on a phone. */}
      <div className="border-default-200 border-b">
        <div className="container flex flex-wrap items-center gap-x-10 gap-y-3 py-5">
          <span className="text-default-600 text-sm">
            {t(locale, 'All laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.')}
          </span>
          <span className="border-default-300 text-default-900 ms-auto inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-[0.18em] uppercase">
            <span className="bg-primary size-2" aria-hidden />
            {t(locale, 'ISO 9001:2015 certified')}
          </span>
        </div>
      </div>

      {/* THE FOUR CONTROLS — the thing a buyer came for, so it opens the page
          rather than following an argument about why the laboratory exists.
          Two by two on desktop; each card is a photograph, a numbered heading
          and its bullets. */}
      {/* THE FOUR CONTROLS — the thing a buyer came for, so it opens the page
          rather than following an argument about why the laboratory exists.

          Was a 2x2 grid of cards. Four cards side by side means four
          photographs at a quarter size each and four bullet lists competing for
          the same glance — the page showed everything at once and emphasised
          nothing. One control at a time, on the same slider About uses, gives
          each stage a full-width photograph and its own reading, and a buyer
          checking whether we can hold their micron spec stops on 02 and stays
          there. */}
      <section data-note="qc-controls" className="py-16 lg:py-24">
        <div className="container">
          <SectionHeading
            eyebrow={t(locale, 'Four controls')}
            title={t(locale, 'What every batch is put through before it ships.')}
            desc={t(
              locale,
              'Sizing, morphology, cleaning and final inspection. Each one is a stage with its own equipment and its own record, which is what lets us answer a question about a lot months after it left.'
            )}
          />
        </div>
      </section>

      {/* No eyebrow badge on this one: the SectionHeading directly above it is
          already the label, and the slider carrying a second would be the same
          words twice in 200px. */}
      <SplitSlider
        dataNote="qc-slider"
        ghost={t(locale, 'Quality control')}
        slides={controls.map((c) => ({
          n: c.n,
          title: t(locale, c.title),
          note: 'note' in c && c.note ? t(locale, c.note) : undefined,
          points: c.points.map(([label, body]) => [t(locale, label), t(locale, body)] as const),
          image: 'image' in c ? c.image : undefined,
          alt: 'alt' in c ? t(locale, c.alt) : undefined,
          imageLabel: 'imageLabel' in c ? t(locale, c.imageLabel) : undefined,
        }))}
      />

      {/* The standards band, in the same place About and Contact put theirs —
          between the argument and the close. Every term here is one the four
          controls above already name, so it is a recap in the site's loudest
          voice rather than a new claim in a quiet one. */}
      <Marquee
        items={[
          t(locale, 'FEPA'),
          t(locale, 'ISO 6106'),
          t(locale, 'ANSI'),
          t(locale, 'ISO 9001:2015'),
        ]}
        secondary={[
          t(locale, 'Test sieves'),
          t(locale, 'Shape sorting'),
          t(locale, 'Malvern PSD'),
          t(locale, 'SEM verification'),
          t(locale, 'Chemical cleaning'),
          t(locale, 'Image Pro validation'),
        ]}
      />

      {/* CTA — the page ends here, and the footer follows. */}
      <section className="bg-primary-3 py-16 text-white lg:py-20">
        <div className="container">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <h2 className="text-[26px] font-bold md:text-[32px]">{t(locale, 'Test our consistency')}</h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-white/75">
                {t(
                  locale,
                  "Don't guess on your superabrasive performance. Contact our technical team to arrange a sample batch tailored to your exact specifications."
                )}
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <ArrowButton href="/contact" label={t(locale, 'Contact us / request a sample')} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default QualityPage
