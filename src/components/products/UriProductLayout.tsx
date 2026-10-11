import UriGradeModule, { type UriGradeGroup, type UriGradeOption } from '@/components/products/UriGradeModule'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
import { getProduct, getSectionCatalog } from '@/lib/i18n-content'
import { RichText } from '@/components/RichText'
import { getProductImageSrc } from '@/lib/product-images'
import { T } from '@/components/products/uriType'
import Image from 'next/image'

type Slug =
  | 'natural-grit-powder'
  | 'metal-bond'
  | 'resin-bond'
  | 'cbn'
  | 'single-crystal'
  | 'polycrystalline-diamond'
  | 'tool-stones'
  | 'polycrystalline-powder'


const IMAGE = {
  natural: 'https://ik.imagekit.io/qcvroy8xpd/eid-product-natural-grit-powder.png',
  metal: 'https://ik.imagekit.io/qcvroy8xpd/eid-product-metal-bond-diamond.png',
  resin: 'https://ik.imagekit.io/qcvroy8xpd/eid-product-resin-bond-diamond.png',
}

const compactSizes = (sizes: string[] | undefined, max = 11) => {
  if (!sizes?.length) return []
  if (sizes.length <= max) return sizes
  return [...sizes.slice(0, max - 2), '…', sizes[sizes.length - 1]]
}

const AtAGlance = ({
  items,
  align = 'center',
  accent = false,
}: {
  items: { href: string; title: string; big: string; small?: string }[]
  align?: 'left' | 'center'
  accent?: boolean
}) => (
  <section className="border-primary/10 bg-canvas border-b py-8 lg:py-10" data-note="uri-product-glance">
    <div className="container">
      <div className={`text-primary-3 mb-4 ${T.eyebrow} ${align === 'center' ? 'text-center' : 'text-left'}`}>At a glance</div>

      <div className={`grid auto-rows-fr items-stretch gap-3 lg:gap-4 ${items.length === 1 ? 'md:grid-cols-1' : items.length === 2 ? 'md:grid-cols-2' : items.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : 'md:grid-cols-3'}`}>
        {items.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={`group bg-primary-3 border-primary-1/35 relative flex h-full min-h-[180px] w-full self-stretch overflow-hidden rounded-card border p-5 text-white shadow-[0_20px_55px_-42px_rgba(28,39,73,0.68)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-primary-2 hover:shadow-[0_26px_65px_-40px_rgba(28,39,73,0.78)] focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2 md:p-6 ${align === 'center' ? 'text-center' : 'text-left'}`}
          >
            <span aria-hidden className={`absolute inset-x-0 top-0 h-1 ${accent ? 'bg-champagne' : 'bg-primary-1'}`} />
            <span aria-hidden className="bg-primary-1/10 absolute -right-10 -top-12 size-32 rounded-full transition-transform duration-500 group-hover:scale-125" />

            <div className="relative z-10 flex h-full w-full flex-1 flex-col">
              <div className={`flex items-start gap-3 ${align === 'center' ? 'justify-center' : 'justify-between'}`}>
                <strong className="block text-[15px] font-bold tracking-[-0.01em] text-white uppercase lg:text-base">{item.title}</strong>
                {align === 'left' ? (
                  <span className="text-champagne/75 shrink-0 font-mono text-[10px] tracking-[0.18em]">{String(index + 1).padStart(2, '0')}</span>
                ) : null}
              </div>

              <span className="mt-3 block text-[15px] leading-snug font-semibold text-white/92">{item.big}</span>
              {item.small ? <span className="mt-1.5 block text-[13px] leading-relaxed text-white/65">{item.small}</span> : null}

              <span className={`border-white/12 text-champagne mt-auto flex items-center gap-2 border-t pt-4 uppercase ${T.label} ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
                View range
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
)

const Chapter = ({
  id,
  eyebrow,
  title,
  children,
  stats,
  accent = false,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  stats: { label: string; value: string }[]
  accent?: boolean
}) => (
  <section
    id={id}
    className={`scroll-mt-28 py-3 lg:py-4 ${accent ? 'bg-canvas' : 'bg-white'}`}
    data-note="uri-product-chapter"
  >
    <div className="container">
      <div className="bg-primary-3 relative overflow-hidden rounded-card px-6 py-7 text-white shadow-[0_22px_60px_-44px_rgba(28,39,73,0.72)] sm:px-7 lg:px-9 lg:py-9">
        {accent ? <span aria-hidden className="bg-champagne absolute inset-y-0 left-0 w-1.5" /> : null}
        <div className="flex items-start justify-between gap-10 lg:gap-14">
          <div className="max-w-4xl">
            <div className={`${accent ? 'text-champagne' : 'text-white/70'} ${T.eyebrow}`}>{eyebrow}</div>
            <h2 className={`mt-2.5 text-white ${T.h2}`}>{title}</h2>
            <div className={`mt-4 max-w-[78ch] text-white/88 ${T.body}`}>{children}</div>
          </div>
          <dl className={`hidden min-w-[185px] shrink-0 border-l pl-7 text-right lg:block ${accent ? 'border-champagne/45' : 'border-white/15'}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="mb-3 last:mb-0">
                <dt className={`${accent ? 'text-champagne' : 'text-white/60'} uppercase ${T.label}`}>{stat.label}</dt>
                <dd className="mt-1 text-base font-bold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  </section>
)

const ModuleWrap = ({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) => (
  <section className={`py-8 lg:py-11 ${accent ? 'bg-canvas' : ''}`} data-note="uri-product-module">
    <div className="container">{children}</div>
  </section>
)

const Coatings = ({ resin = false, accent = false }: { resin?: boolean; accent?: boolean }) => (
  <>
    <span id="coated" className="block scroll-mt-28" aria-hidden />
    <section id="coating-options" className={`scroll-mt-28 py-3 lg:py-4 ${accent ? 'bg-canvas' : 'bg-white'}`} data-note="uri-product-coatings-title">
      <div className="container">
        <div className="bg-primary-3 relative overflow-hidden rounded-card px-6 py-6 text-white shadow-[0_22px_60px_-44px_rgba(28,39,73,0.72)] sm:px-7 lg:px-9 lg:py-7">
          {accent ? <span aria-hidden className="bg-champagne absolute inset-y-0 left-0 w-1.5" /> : null}
          <div className={`${accent ? 'text-champagne' : 'text-white/70'} ${T.eyebrow}`}>Coating options</div>
          <h2 className={`mt-2.5 text-white ${T.h2}`}>Electroless Nickel &amp; PVD Coatings</h2>
        </div>
      </div>
    </section>

    <section className={`border-y py-10 lg:py-12 ${accent ? 'border-champagne bg-[linear-gradient(110deg,var(--color-champagne-light)_-30%,var(--color-canvas)_38%,white_100%)]' : 'border-default-200 bg-default-50'}`} data-note="uri-product-coatings">
      <div className="container">
        <div className="grid items-start gap-9 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <h3 className={`text-primary-3 ${T.h3}`}>Electroless Nickel &amp; PVD Coatings</h3>
            <p className={`text-default-600 mt-3 max-w-2xl ${T.body}`}>
              {'Metal bond diamond is available with our nickel coatings in 30%, 56%, 60% and custom percentages, with either spiky or smooth nickel morphology. We also offer PVD metallic coatings for specialised requirements.'}
            </p>
            <div className={`mt-5 ${T.small}`}>
              <Link href="/contact" className="text-primary inline-flex min-h-11 items-center font-bold lg:inline lg:min-h-0">Discuss coating requirements →</Link>
              <Link href="/contact" className="text-primary flex min-h-11 items-center font-bold tracking-[0.06em] uppercase lg:mt-1.5 lg:block lg:min-h-0">Request a quote →</Link>
            </div>
          </div>

          <div>
            <div className={`text-default-500 uppercase ${T.label}`}>Nickel coatings</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {(resin
                ? ['Electroless Nickel 30%', 'Electroless Nickel 56%', 'Electroless Nickel 60%', 'Copper', 'Custom %']
                : ['Electroless Nickel 30%', 'Electroless Nickel 56%', 'Electroless Nickel 60%', 'Custom %']
              ).map((item) => (
                <span key={item} className={`${accent ? 'border-champagne' : 'border-default-200'} rounded-control border bg-white px-3 py-2.5 font-semibold ${T.chip}`}>{item}</span>
              ))}
            </div>

            <div className={`text-default-500 mt-5 uppercase ${T.label}`}>PVD metallic coatings</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Titanium', 'Copper', 'TN', 'TiC', 'TiN', 'TiCN', 'Si', 'Cr', 'Zr', 'Al', 'AlN', 'Others'].map((item) => (
                <span key={item} className={`${accent ? 'border-champagne' : 'border-default-200'} rounded-control border bg-white px-3 py-2.5 font-semibold ${T.chip}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

const ProcessStrip = ({ steps, accent = false }: { steps: { n: string; title: string; note: string }[]; accent?: boolean }) => (
  <div className={`bg-primary-3 mt-6 grid overflow-hidden rounded-card text-white shadow-[0_10px_24px_rgba(9,42,77,0.10)] sm:grid-cols-2 ${steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
    {steps.map((step, index) => (
      <div key={step.n} className="relative border-white/15 p-4 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0">
        <span className={`${accent ? 'text-champagne' : 'text-white/60'} ${T.eyebrow}`}>{step.n}</span>
        <strong className={`mt-2 block ${T.control}`}>{step.title}</strong>
        <small className="mt-1 block text-sm leading-snug text-white/75">{step.note}</small>
        {index < steps.length - 1 ? <span aria-hidden className="absolute -right-2 top-4 z-10 hidden bg-primary-3 px-1 text-[15px] text-white/60 lg:block">→</span> : null}
      </div>
    ))}
  </div>
)

const Spectrum = ({
  title,
  from,
  to,
  points,
  note,
  accent = false,
}: {
  title: string
  from: string
  to: string
  points: { title: string; lines: string[] }[]
  note?: string
  accent?: boolean
}) => (
  <div className={`relative mt-6 overflow-hidden rounded-card border bg-white p-5 shadow-[0_18px_55px_-42px_rgba(28,39,73,0.28)] lg:p-7 ${accent ? 'border-champagne border-t-4' : 'border-default-200'}`}>
    <div className={`${accent ? 'text-champagne-deep' : 'text-primary'} ${T.eyebrow}`}>{title}</div>
    {note ? <p className={`text-default-500 mt-2 max-w-3xl ${T.small}`}>{note}</p> : null}
    <div className={`text-default-500 mt-4 flex justify-between gap-6 uppercase ${T.label}`}>
      <span>{from}</span>
      <span className="text-right">{to}</span>
    </div>
    <div className="bg-default-300 relative my-2.5 h-0.5" />
    <div className={`grid gap-2.5 ${points.length === 10 ? 'grid-cols-2 sm:grid-cols-5 xl:grid-cols-10' : points.length === 7 ? 'grid-cols-2 sm:grid-cols-4 xl:grid-cols-7' : points.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
      {points.map((point) => (
        <div key={point.title} className={`${accent ? 'border-champagne-deep' : 'border-primary'} border-t-3 px-2 pt-3 text-center`}>
          <strong className={`text-primary-3 block ${points.length > 4 ? 'text-xs font-bold' : T.control}`}>{point.title}</strong>
          {point.lines.map((line) => <span key={line} className="text-default-500 mt-1 block text-sm leading-snug">{line}</span>)}
        </div>
      ))}
    </div>
  </div>
)

const Insight = ({
  kicker,
  title,
  children,
  steps,
  spectra,
  accent = false,
}: {
  kicker: string
  title: string
  children: React.ReactNode
  steps: { n: string; title: string; note: string }[]
  spectra: React.ReactNode
  accent?: boolean
}) => (
  <section className={`relative overflow-hidden border-y py-12 lg:py-16 ${accent ? 'border-champagne bg-[linear-gradient(120deg,var(--color-champagne-light)_0%,white_44%,#f1f4f8_100%)]' : 'border-default-200 bg-white'}`} data-note="uri-product-insight">
    {accent ? <span aria-hidden className="bg-champagne absolute inset-y-0 left-0 w-1.5" /> : null}
    <div className="container relative">
      <div className="max-w-5xl">
        <div className={`${accent ? 'text-champagne-deep' : 'text-primary'} ${T.eyebrow}`}>{kicker}</div>
        <h2 className={`text-primary-3 mt-2 ${T.h2}`}>{title}</h2>
        <div className={`text-default-600 mt-3 max-w-3xl ${T.body}`}>{children}</div>
        <ProcessStrip steps={steps} accent={accent} />
        {spectra}
      </div>
    </div>
  </section>
)

const sourceOption = (
  id: string,
  label: string,
  detail: string | undefined,
  title: string,
  subtitle: string,
  description: string,
  image: string,
  sizes?: string[],
  sizeLabel?: string,
  specs?: { label: string; value: string }[],
): UriGradeOption => ({ id, label, detail, title, subtitle, description, image, sizes, sizeLabel, specs })

const catalogGroups = ({
  locale,
  slug,
  section,
  image,
  fallbacks,
}: {
  locale: Locale
  slug: Slug
  section: string
  image: string
  fallbacks: string[]
}): UriGradeGroup[] => {
  const cat = getSectionCatalog(locale, slug, section)
  if (!cat?.series?.length) return []

  return cat.series.map((series, seriesIndex) => {
    const sectionSizes =
      series.sizes ??
      cat.meshSizes?.[seriesIndex]?.sizes ??
      cat.micronSizes

    return {
      label: series.title.toUpperCase(),
      options: series.grades.map((grade, gradeIndex) => ({
        id: `${section}-${seriesIndex}-${gradeIndex}-${grade.code}-${grade.tag ?? ''}`,
        label: grade.code,
        title: grade.code,
        subtitle: grade.tag ?? series.short ?? '',
        description: grade.desc ?? series.note ?? fallbacks[seriesIndex] ?? fallbacks[0] ?? '',
        image: getProductImageSrc(grade.image ?? series.image ?? cat.image) ?? image,
        sizes: compactSizes(sectionSizes),
        sizeLabel: cat.micronSizes ? 'AVAILABLE SIZES (µm)' : 'AVAILABLE SIZES (MESH)',
      })),
    }
  })
}

const NATURAL_MESH_PHOTO = {
  superBlocky: 'https://ik.imagekit.io/qcvroy8xpd/super%20blocky.png',
  blocky: 'https://ik.imagekit.io/qcvroy8xpd/blocky.png',
  sharp: 'https://ik.imagekit.io/qcvroy8xpd/sharp.png',
}
const NATURAL_MICRON_PHOTO = 'https://ik.imagekit.io/qcvroy8xpd/natural%20micron.jpg'
const NATURAL_MICRON_SEM = 'https://ik.imagekit.io/qcvroy8xpd/MB-1-UM%2012-22%20jpg.jpg'

// Hero copy for the Uri layouts that carry their own wording; the product page
// falls back to the catalogue h1 and meta description for anything not listed.
export const URI_HERO: Partial<Record<Slug, { eyebrow: string; desc: string }>> = {
  'natural-grit-powder': {
    eyebrow: 'Natural Diamond',
    desc: 'Natural industrial diamond in graded mesh, micron powder and rotary grades — processed in-house for controlled morphology, precision sizing and consistent abrasive performance.',
  },
}

const NaturalLayout = () => {
  const image = IMAGE.natural
  const meshSeries = [
    { label: 'NS SERIES', sizes: ['16/18', '18/20', '20/25', '20/30', '25/30', '30/35', '30/40', '35/40', '35/45', '40/45', '40/50', '45/50', '45/60', '50/60', '50/70'] },
    { label: 'MB SERIES', sizes: ['60/70', '60/80', '70/80', '80/100', '100/120', '120/140', '140/170', '170/200', '200/230', '230/270', '270/325', '325/400', '400/500'] },
  ]
  const micronSizes = ['0–0.20', '0–0.25', '0–0.50', '0.25–0.75', '0–1', '0.50–1', '0.50–1.5', '0.75–1.25', '0–2', '1–2', '1–3', '2–4', '3–5', '3–6', '4–6', '4–8', '5–10', '6–12', '8–12', '8–16', '10–20', '12–22', '15–25', '20–30', '20–40', '30–40', '30–50', '40–50', '40–60']
  const rotarySeries = [
    { label: 'AVAILABLE DRILLING SIZES', sizes: ['1 CARAT', '3/4 CT', '1/2 CT', '1/3 CT', '5–6 SPC', '6–8 SPC', '8–10 SPC', 'THROUGH TO 500 SPC'] },
    { label: 'AVAILABLE MESH SIZES', sizes: ['16/18', '18/20', '20/25', '25/30', '30/40', '40/50', '50/60', '60/80'] },
  ]
  const shapeNote = { lead: 'Shape factors:', text: 'Additional shape factors are available to suit specific client requirements.' }

  const meshOption = (id: string, label: string, code: string, subtitle: string, description: string, photo: string): UriGradeOption => ({
    ...sourceOption(id, label, code, code, subtitle, description, photo, undefined, 'AVAILABLE SIZES (MESH)'),
    sizeSeries: meshSeries,
  })

  const mesh: UriGradeGroup[] = [{
    options: [
      meshOption('natural-super-blocky', 'SUPER BLOCKY', 'NS-100-P / MB-100-P', 'SUPER BLOCKY · HIGHER STRENGTH', 'A high-strength, engineered natural diamond abrasive characterised by well-shaped, super-blocky crystals, excellent thermal stability and sharp cutting edges. Developed for demanding drilling, sawing and grinding applications across materials including concrete, masonry, glass, ceramics, plastics and tungsten carbide. Well suited to electroplated and metal-bond tooling, including free-cutting diamond tools and dental burs.', NATURAL_MESH_PHOTO.superBlocky),
      meshOption('natural-blocky', 'BLOCKY', 'NS-1-P / MB-1-P', 'BLOCKY · BALANCED MORPHOLOGY', 'A versatile natural diamond abrasive engineered for dependable, free-cutting performance across everyday industrial tooling. Its strong, well-formed crystals combine sharp cutting edges with controlled wear and good thermal stability, providing an effective balance of cutting efficiency, tool life and cost. Designed for sawing, drilling and grinding stone, concrete, masonry and refractories, and well suited to metal-bond and electroplated tools.', NATURAL_MESH_PHOTO.blocky),
      meshOption('natural-sharp', 'SHARP', 'NS-1-S / MB-1-S', 'SHARP · FREE-CUTTING', 'A sharp, angular natural diamond abrasive developed for fast, free-cutting action and efficient material removal. Its more irregular morphology provides aggressive cutting edges for applications where cutting speed and an open abrasive action are prioritised.', NATURAL_MESH_PHOTO.sharp),
    ],
  }]

  const micron: UriGradeGroup[] = [{
    options: [
      {
        ...sourceOption('natural-micron', 'MB-1-UM', undefined, 'MB-1-UM', '', 'A precision-sized natural diamond powder combining the inherent hardness and cutting efficiency of natural diamond with tightly controlled particle sizing. Available across a broad micron range, MB-1-UM delivers consistent abrasive action and surface finish for precision lapping, polishing and fine grinding applications.', NATURAL_MICRON_PHOTO, micronSizes, 'AVAILABLE SIZES (µm)'),
        gallery: [
          { src: NATURAL_MICRON_SEM, alt: 'SEM micrograph of MB-1-UM natural diamond micron powder, 12–22 micrometres', caption: 'MB-1-UM · SEM MORPHOLOGY · 12–22 µm', className: 'h-[235px] md:h-[260px] [&_img]:object-[center_43%]' },
          { src: NATURAL_MICRON_PHOTO, alt: 'EID MB-1-UM natural diamond micron powder in labelled sample containers', caption: 'MB-1-UM · NATURAL MICRON RANGE', className: 'h-[154px] md:h-[170px]' },
        ],
      },
    ],
  }]

  const rotaryOption = (code: string, subtitle: string, description: string): UriGradeOption => ({
    ...sourceOption(`rotary-${code}`, code, undefined, code, subtitle, description, image),
    sizeSeries: rotarySeries,
    note: shapeNote,
  })

  const rotary: UriGradeGroup[] = [
    {
      label: 'Wholestone Diamonds',
      options: [
        rotaryOption('WD-AAA', 'Wholestone Diamond', 'Premium natural Wholestone diamond selected for the highest degree of natural crystal form in the range.'),
        rotaryOption('WD-AA', 'Wholestone Diamond', 'High-quality natural Wholestone diamond with a highly crystalline natural form, selected slightly below WD-AAA in crystal definition.'),
        rotaryOption('WD-A', 'Wholestone Diamond', 'Selected natural Wholestone diamond with good natural crystal form, grading slightly below WD-AA in crystal definition.'),
      ],
    },
    {
      label: 'Rotary Diamonds',
      options: [
        rotaryOption('RD90', 'Rotary Diamond', 'A top-quality natural diamond grade selected for rotary dressing applications, offering strong, well-formed crystals for consistent dressing performance.'),
        rotaryOption('RD10', 'Rotary Diamond', 'A lightly tumbled natural diamond grade with a more rounded morphology, developed for rotary dressing applications requiring a less angular crystal profile.'),
        rotaryOption('RD CONGO', 'Rotary Diamond', 'A natural diamond grade with characteristics comparable to RD90, produced specifically from selected Congo-origin natural diamond raw material for rotary dressing applications.'),
      ],
    },
  ]

  return (
    <>
      <AtAGlance align="left" accent items={[
        { href: '#mesh', title: 'Natural Mesh', big: '3 grades', small: '12–500 mesh' },
        { href: '#micron', title: 'Natural Micron', big: '1 grade', small: '0–0.25 → 40–60 µm' },
        { href: '#rotary', title: 'Natural Rotary', big: '2 product lines · 6 grades' },
      ]} />

      <span id="grit" className="block scroll-mt-28" aria-hidden />
      <Chapter accent id="mesh" eyebrow="01 / NATURAL MESH" title="Natural Mesh" stats={[{ label: 'Grades', value: '3' }, { label: 'Size range', value: '16/18 → 400/500 mesh' }]}>
        Natural diamond grit engineered across distinct crystal morphologies to balance strength, durability and cutting action for demanding industrial abrasive applications.
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule
          accent="champagne"
          groups={mesh}
          variant="tiles"
          axis={{ from: '← Higher toughness', to: 'More free-cutting →' }}
          selectorNote={{ lead: 'NS / MB designation refers to sizing range.', text: 'Grade characteristics and morphology remain consistent across both designations.' }}
        />
      </ModuleWrap>

      <Chapter accent id="micron" eyebrow="02 / NATURAL MICRON" title="Natural Micron" stats={[{ label: 'Grades', value: '1' }, { label: 'Size range', value: '0–0.20 → 40–60 µm' }]}>
        Precision-graded natural diamond powder engineered around the exceptional hardness and cutting efficiency of natural diamond. Strong, well-shaped crystalline particles combine controlled blocky morphology with sharp cutting edges to deliver consistent abrasive action, efficient material removal and high-quality surface finishes across precision lapping, polishing and fine grinding applications.
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" groups={micron} variant="none" />
      </ModuleWrap>

      <Chapter accent id="rotary" eyebrow="03 / NATURAL ROTARY" title="Natural Rotary Diamonds" stats={[{ label: 'Product lines', value: '2' }, { label: 'Grades', value: '6' }]}>
        <div className="grid gap-5 md:grid-cols-2 md:gap-9">
          <p><strong className="text-white">Wholestone Diamonds</strong> — Our Wholestone Rough Industrial diamonds are mined diamonds in their natural state, before any processing or polishing has occurred.</p>
          <p><strong className="text-white">Rotary Diamonds</strong> — Rotary Diamond Dressers provide an efficient, economical means of dressing grinding wheels to the correct form, tolerance and condition for exceptional accuracy.</p>
        </div>
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" groups={rotary} variant="grouped-tiles" ctaLead="Need a grade or selection not listed?" />
      </ModuleWrap>

      <Insight
        accent
        kicker="Technical insight · From raw diamond to controlled abrasive"
        title="How Natural Diamond Becomes a Precision Abrasive"
        steps={[
          { n: '01', title: 'RAW NATURAL DIAMOND', note: 'Selected industrial feedstock' },
          { n: '02', title: 'CONTROLLED CRUSHING', note: 'Raw diamond is reduced for further processing' },
          { n: '03', title: 'ADVANCED CHEMICAL CLEANING', note: 'Residual processing contaminants are removed' },
          { n: '04', title: 'PRECISION GRADING & SHAPING', note: 'Controlled sizing and morphology to application requirements' },
          { n: '05', title: 'CONTROLLED ABRASIVE', note: 'Defined size, shape & cutting behaviour' },
        ]}
        spectra={
          <Spectrum
            accent
            title="Grade characteristics · Morphology"
            from="Higher toughness / durability"
            to="More free-cutting / aggressive"
            points={[
              { title: 'SUPER BLOCKY', lines: ['Well-formed crystals · strength · durability'] },
              { title: 'BLOCKY', lines: ['Strong crystalline form · balanced cutting action'] },
              { title: 'SHARP', lines: ['Angular · aggressive material removal'] },
            ]}
          />
        }
      >
        Natural diamond begins with inherent variation in crystal structure, shape and strength. Through controlled crushing, advanced chemical cleaning, precision grading and shaping, that variable raw material is transformed into repeatable industrial abrasive grades with defined particle size and morphology. The result is a controlled balance between crystal strength, durability and cutting action for different tooling requirements.
      </Insight>
    </>
  )
}

const MB_IMAGES: Record<string, string> = {
  // Metal Bond grade images served from EID's ImageKit account.
  'ESN 770': 'https://ik.imagekit.io/qcvroy8xpd/esn770.png?updatedAt=1791721766504',
  'ESN 750': 'https://ik.imagekit.io/qcvroy8xpd/esn%20750.png?updatedAt=1791721758854',
  'ESN 700': 'https://ik.imagekit.io/qcvroy8xpd/esn%20700%20.png?updatedAt=1791721765020',
  'ESN 600': 'https://ik.imagekit.io/qcvroy8xpd/esn%20600.png?updatedAt=1791721757836',
  'ESN 500': 'https://ik.imagekit.io/qcvroy8xpd/esn%20500.png?updatedAt=1791721762744',
  'ESN 400': 'https://ik.imagekit.io/qcvroy8xpd/esn%20400.png?updatedAt=1791721767060',
  'ESN 300': 'https://ik.imagekit.io/qcvroy8xpd/esn%20300.png?updatedAt=1791721761549',
  'ESN 200': 'https://ik.imagekit.io/qcvroy8xpd/esn%20200.png?updatedAt=1791721763845',
  'ESN 75': 'https://ik.imagekit.io/qcvroy8xpd/esn%2075.png?updatedAt=1791721765913',
  'ESN 50': 'https://ik.imagekit.io/qcvroy8xpd/esn%2050.png?updatedAt=1791721758442',

  'EDA 2395': 'https://ik.imagekit.io/qcvroy8xpd/eda%202395.png?updatedAt=1791211257504',
  'EDA 2360': 'https://ik.imagekit.io/qcvroy8xpd/eda%202360.png?updatedAt=1791211254599',
  'EDA 2300': 'https://ik.imagekit.io/qcvroy8xpd/eda%202300.png?updatedAt=1791211254329',
  'EDA 2215': 'https://ik.imagekit.io/qcvroy8xpd/eda%202215.png?updatedAt=1791211262137',
  'EDA 2125': 'https://ik.imagekit.io/qcvroy8xpd/eda%202125.png?updatedAt=1791211253397',
  'EDA 2050': 'https://ik.imagekit.io/qcvroy8xpd/eda%202050.png?updatedAt=1791211254004',
  'EDA 2025': 'https://ik.imagekit.io/qcvroy8xpd/eda%202025.png?updatedAt=1791211261262',

  'MB500-um': 'https://ik.imagekit.io/qcvroy8xpd/mb%20500%20um%20jpg%20copy.jpg?updatedAt=1791211258108',
  'MB400-um': 'https://ik.imagekit.io/qcvroy8xpd/mb%20400-um%20jpg%20%20copy.jpg?updatedAt=1791211258629',
  'MB300-um': 'https://ik.imagekit.io/qcvroy8xpd/mb300-um%20jpg%20copy.jpg?updatedAt=1791211254948',
  'MB200-um': 'https://ik.imagekit.io/qcvroy8xpd/mb200-um%20jpg%20copy.jpg?updatedAt=1791211257934',
  EGM: 'https://ik.imagekit.io/qcvroy8xpd/EGM%20copy.jpg?updatedAt=1791211260649',
}

const MB_MICRON_BOTTLES = 'https://ik.imagekit.io/qcvroy8xpd/mb%20micron%20bottles.JPG?updatedAt=1791211261220'

const applyMetalImages = (groups: UriGradeGroup[], withMicronGallery = false): UriGradeGroup[] =>
  groups.map((group) => ({
    ...group,
    options: group.options.map((option) => {
      const gradeImage = MB_IMAGES[option.label] ?? option.image
      return {
        ...option,
        image: gradeImage,
        ...(withMicronGallery
          ? {
              gallery: [
                {
                  src: gradeImage,
                  alt: `${option.title} metal bond diamond micron powder`,
                  caption: `${option.title} · METAL BOND MICRON`,
                  className: 'h-[235px] md:h-[260px]',
                },
                {
                  src: MB_MICRON_BOTTLES,
                  alt: 'EID metal bond micron powder range in labelled sample bottles',
                  caption: 'EID · METAL BOND MICRON RANGE',
                  className: 'h-[154px] md:h-[170px]',
                },
              ],
            }
          : {}),
      }
    }),
  }))

const MetalLayout = ({ locale }: { locale: Locale }) => {
  const image = IMAGE.metal
  const meshGroups = catalogGroups({
    locale,
    slug: 'metal-bond',
    section: 'mesh',
    image,
    fallbacks: [
      'Synthetic diamond grit engineered for sawing and drilling applications, with low, well-distributed metallic inclusion content for high thermal stability and particle strength.',
      'Synthetic diamond grit developed for precision abrasive tooling, with a broad range of grades for metal, resin, vitrified and electroplated bond systems.',
    ],
  })
  const micronGroups = applyMetalImages(catalogGroups({
    locale,
    slug: 'metal-bond',
    section: 'micron',
    image,
    fallbacks: ['EID Metal Bond Synthetic Diamond Powders combine strong bond retention, high particle strength and thermal stability for demanding lapping, finishing and grinding applications.'],
  }), true)
  const meshGroupsWithImages = applyMetalImages(meshGroups)

  return (
    <>
      <AtAGlance align="left" accent items={[
        { href: '#metal-bond-mesh', title: 'Metal Bond Mesh', big: '16/18 → 400/500 mesh', small: '2 series · 17 grades' },
        { href: '#metal-bond-micron', title: 'Metal Bond Micron', big: '0–0.20 → 40–60 µm', small: '1 series · 5 grades' },
        { href: '#coating-options', title: 'Coating Options', big: 'Electroless Nickel & PVD', small: 'Coating technologies' },
      ]} />

      <span id="mesh" className="block scroll-mt-28" aria-hidden />
      <Chapter accent id="metal-bond-mesh" eyebrow="01 / METAL BOND MESH" title="Metal Bond Mesh" stats={[{ label: 'Series', value: '2' }, { label: 'Grades', value: '17' }]}>
        <p><strong className="text-white">ESN “Saw Grade” Series</strong> — Synthetic diamond grit engineered for sawing and drilling applications, with low, well-distributed metallic inclusion content for high thermal stability and particle strength.</p>
        <p className="mt-2"><strong className="text-white">EDA “Wheel Grade” Series</strong> — Synthetic diamond grit developed for precision abrasive tooling, with a broad range of grades for metal, resin, vitrified and electroplated bond systems.</p>
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" selectorTitle="SELECT SERIES & GRADE" groups={meshGroupsWithImages} variant="rows" />
      </ModuleWrap>

      <span id="micron" className="block scroll-mt-28" aria-hidden />
      <Chapter accent id="metal-bond-micron" eyebrow="02 / METAL BOND MICRON" title="Metal Bond Micron" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '5' }]}>
        EID Metal Bond Synthetic Diamond Powders combine strong bond retention, high particle strength and thermal stability for demanding lapping, finishing and grinding applications. Their blocky cubo-octahedral morphology and multiple cutting edges provide controlled abrasive performance across applications including glass, tungsten carbide and stone surfacing.
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" groups={micronGroups} variant="buttons" />
      </ModuleWrap>

      <Coatings accent />

      <Insight
        accent
        kicker="Technical insight · Bond behaviour"
        title="How Metal Bond Works"
        steps={[
          { n: '01', title: 'DIAMOND PARTICLE', note: 'Strength & morphology' },
          { n: '02', title: 'BOND RETENTION', note: 'Held in hard matrix' },
          { n: '03', title: 'CONTROLLED WEAR', note: 'Bond gradually recedes' },
          { n: '04', title: 'FRESH EXPOSURE', note: 'Cutting action maintained' },
        ]}
        spectra={
          <>
            <Spectrum
              accent
              title="ESN series · Saw grade"
              note="The two Metal Bond Mesh series are shown separately because ESN Saw Grades and EDA Wheel Grades are engineered for different tooling environments."
              from="Higher strength / thermal stability"
              to="More free-cutting / cost-effective"
              points={[
                { title: 'ESN 770', lines: ['Supreme strength'] },
                { title: 'ESN 750', lines: ['Extremely high strength'] },
                { title: 'ESN 700', lines: ['Extremely high strength'] },
                { title: 'ESN 600', lines: ['High strength'] },
                { title: 'ESN 500', lines: ['High strength'] },
                { title: 'ESN 400', lines: ['General purpose'] },
                { title: 'ESN 300', lines: ['Medium strength'] },
                { title: 'ESN 200', lines: ['Medium strength'] },
                { title: 'ESN 75', lines: ['Medium–low strength'] },
                { title: 'ESN 50', lines: ['Free cutting'] },
              ]}
            />
            <Spectrum
              accent
              title="EDA series · Wheel grade"
              from="Higher toughness / impact resistance"
              to="More free-cutting / lower abrasive strength"
              points={[
                { title: 'EDA 2395', lines: ['Extra tough'] },
                { title: 'EDA 2360', lines: ['High toughness'] },
                { title: 'EDA 2300', lines: ['Impact resistant'] },
                { title: 'EDA 2215', lines: ['High strength'] },
                { title: 'EDA 2125', lines: ['Life / finish balance'] },
                { title: 'EDA 2050', lines: ['Fast cutting'] },
                { title: 'EDA 2025', lines: ['Free cutting'] },
              ]}
            />
          </>
        }
      >
        Metal bond holds diamond mechanically within a hard, wear-resistant matrix. As the bond gradually wears, diamond particles are exposed to maintain cutting action. Performance depends on matching the <strong>strength, shape and thermal stability of the diamond to the bond and application</strong>, while selected coatings can further influence diamond retention and bond interaction.
      </Insight>
    </>
  )
}

const ResinLayout = ({ locale }: { locale: Locale }) => {
  const image = IMAGE.resin
  const meshGroups = catalogGroups({
    locale,
    slug: 'resin-bond',
    section: 'mesh',
    image,
    fallbacks: ['Crystals of irregular shape with a rough, mosaic structure for excellent bond retention and controlled micro-fracturing. A proven choice for high-quality resin and vitrified bonds in wet and dry grinding of tungsten carbide.'],
  })
  const micronGroups = catalogGroups({
    locale,
    slug: 'resin-bond',
    section: 'micron',
    image,
    fallbacks: ['High surface toughness and tightly graded particles for resin bond wheels and tools. Effective for soft polishing and grinding of ceramics, carbides, glass and other hard materials where excellent surface finish is required.'],
  })

  return (
    <>
      <AtAGlance align="left" accent items={[
        { href: '#resin-bond-mesh', title: 'Resin Bond Mesh', big: '50/60 → 400/500 mesh', small: '1 series · 4 grades' },
        { href: '#resin-bond-micron', title: 'Resin Bond Micron', big: '0–0.20 → 40–60 µm', small: '1 series · 2 grades' },
        { href: '#coating-options', title: 'Coating Options', big: 'Electroless Nickel & PVD', small: 'Coating technologies' },
      ]} />

      <span id="mesh" className="block scroll-mt-28" aria-hidden />
      <Chapter accent id="resin-bond-mesh" eyebrow="01 / RESIN BOND MESH" title="Resin Bond Mesh" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '4' }]}>
        EID Resin Bond Mesh is engineered for resin-bonded diamond wheels and non-ferrous grinding applications. Its multi-crystalline mosaic structure, rough surface and controlled friability continuously expose fresh cutting edges for fast, consistent cutting and long tool life.
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" groups={meshGroups} variant="rows" />
      </ModuleWrap>

      <span id="micron" className="block scroll-mt-28" aria-hidden />
      <Chapter accent id="resin-bond-micron" eyebrow="02 / RESIN BOND MICRON" title="Resin Bond Micron" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '2' }]}>
        EID Resin Bond Synthetic Diamond Powders combine friability, mosaic structure and irregular blocky particle morphology for soft polishing, lapping and fine grinding. Under stress, the diamond fractures to expose fresh cutting points, supporting fast cutting and excellent surface finish.
      </Chapter>
      <ModuleWrap accent>
        <UriGradeModule accent="champagne" groups={micronGroups} variant="buttons" />
      </ModuleWrap>

      <Coatings resin accent />

      <Insight
        accent
        kicker="Technical insight · Crystal behaviour"
        title="Why Friability Matters in a Resin Bond"
        steps={[
          { n: '01', title: 'DIAMOND CRYSTAL', note: 'Friable structure' },
          { n: '02', title: 'MICRO-FRACTURE', note: 'Controlled breakdown' },
          { n: '03', title: 'FRESH EDGES', note: 'New cutting points' },
          { n: '04', title: 'CONTINUED CUTTING', note: 'Sharp, cool action' },
        ]}
        spectra={
          <Spectrum
            accent
            title="Grade characteristics"
            from="Higher strength / bond retention"
            to="Higher friability / micro-fracturing"
            points={[
              { title: 'EDA 2023', lines: ['Intermediate strength', 'Controlled micro-fracturing'] },
              { title: 'EFRD-S', lines: ['Self-sharpening', 'High bond retention'] },
              { title: 'EDA 2021', lines: ['Friable', 'Cost-effective grinding'] },
              { title: 'EDA 2020', lines: ['Highest friability', 'Precision surface finish'] },
            ]}
          />
        }
      >
        A resin bond is softer than a metal bond and releases diamond more readily. Paired with a friable, multi-crystalline diamond, the crystal breaks down in a controlled way, continually exposing fresh cutting points rather than glazing over. This helps the tool stay sharp and cut cool, protecting surface finish on carbide, ceramic and glass. <strong>The grade determines how quickly this breakdown occurs, making the right level of friability an important part of matching the diamond to the application.</strong>
      </Insight>
    </>
  )
}

const GenericSectionImage = ({ image, alt }: { image?: string; alt: string }) => {
  const src = getProductImageSrc(image)
  if (!src) return null
  return (
    <div className="border-champagne relative min-h-[280px] overflow-hidden rounded-card border bg-[#f7f6f2] shadow-[0_18px_55px_-42px_rgba(28,39,73,0.28)] md:min-h-[360px]">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      <span aria-hidden className="from-primary-3/18 absolute inset-0 bg-linear-to-t to-transparent" />
    </div>
  )
}

const GenericDataCard = ({
  properties,
  coatings,
  micronNote,
  specs,
}: {
  properties?: { label: string; value: string }[]
  coatings?: string[]
  micronNote?: string
  specs?: { label: string; value: string }[]
}) => {
  const rows = properties?.length ? properties : specs
  if (!rows?.length && !coatings?.length && !micronNote) return null

  return (
    <div className="border-champagne rounded-card border bg-white p-6 shadow-[0_18px_55px_-42px_rgba(28,39,73,0.28)] lg:p-8">
      <div className={`text-champagne-deep ${T.eyebrow}`}>Technical details</div>
      {rows?.length ? (
        <dl className="border-champagne/70 mt-4 divide-y divide-champagne/70 border-y">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[170px_1fr] sm:gap-5">
              <dt className={`text-default-500 uppercase ${T.label}`}>{row.label}</dt>
              <dd className={`text-default-700 ${T.small}`}>{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {coatings?.length ? (
        <div className={rows?.length ? 'mt-5' : 'mt-4'}>
          <div className={`text-default-500 uppercase ${T.label}`}>Available coatings</div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {coatings.map((item) => (
              <span key={item} className={`border-champagne rounded-control border bg-champagne-light/45 px-3 py-2 text-default-700 ${T.chip}`}>{item}</span>
            ))}
          </div>
        </div>
      ) : null}
      {micronNote ? <p className={`text-default-600 mt-5 ${T.small}`}>{micronNote}</p> : null}
    </div>
  )
}

const GenericApplications = ({
  title,
  items,
  note,
}: {
  title?: string
  items?: string[]
  note?: string
}) => {
  if (!items?.length) return null
  return (
    <div className="bg-primary-3 rounded-card p-6 text-white shadow-[0_22px_60px_-44px_rgba(28,39,73,0.72)] lg:p-8">
      <div className={`text-champagne ${T.eyebrow}`}>{title ?? 'Typical applications'}</div>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className={`flex gap-3 text-white/88 ${T.body}`}>
            <span aria-hidden className="bg-champagne mt-[0.62em] size-1.5 shrink-0 rounded-full" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {note ? (
        <div className={`mt-6 border-t border-white/15 pt-5 text-white/75 [&_a]:text-white [&_a]:underline ${T.small}`}>
          <RichText>{note}</RichText>
        </div>
      ) : null}
    </div>
  )
}

const GenericCallouts = ({ callouts }: { callouts?: { title: string; body: string | string[] }[] }) => {
  if (!callouts?.length) return null
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {callouts.map((callout) => (
        <div key={callout.title} className="border-champagne rounded-card border bg-champagne-light/40 p-6 lg:p-7">
          <div className={`text-champagne-deep ${T.eyebrow}`}>{callout.title}</div>
          <div className={`text-default-600 mt-3 space-y-3 [&_a]:text-primary [&_a]:underline ${T.small}`}>
            {(Array.isArray(callout.body) ? callout.body : [callout.body]).map((body, index) => (
              <p key={index}><RichText>{body}</RichText></p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const genericSectionStats = (cat: ReturnType<typeof getSectionCatalog>, index: number, total: number) => {
  const series = cat?.series?.length ?? 0
  const grades = cat?.series?.reduce((sum, item) => sum + item.grades.length, 0) ?? 0
  if (series || grades) {
    return [
      ...(series ? [{ label: 'Series', value: String(series) }] : []),
      ...(grades ? [{ label: 'Grades', value: String(grades) }] : []),
    ].slice(0, 2)
  }
  if (cat?.micronSizes?.length) return [{ label: 'Sizes', value: String(cat.micronSizes.length) }]
  if (cat?.properties?.length) return [{ label: 'Properties', value: String(cat.properties.length) }]
  return [{ label: 'Section', value: `${index + 1} of ${total}` }]
}

const genericAtAGlance = (locale: Locale, slug: Slug, sections: ReturnType<typeof getProduct> extends infer P ? any[] : never) =>
  sections.map((section: any) => {
    const cat = getSectionCatalog(locale, slug, section.id)
    const series = cat?.series?.length ?? 0
    const grades = cat?.series?.reduce((sum, item) => sum + item.grades.length, 0) ?? 0
    const sizes = cat?.micronSizes
    return {
      href: `#${section.id}`,
      title: section.label,
      big: grades ? `${grades} grade${grades === 1 ? '' : 's'}` : series ? `${series} series` : 'Product range',
      small: sizes?.length ? `${sizes[0]} → ${sizes[sizes.length - 1]} µm` : cat?.properties?.length ? `${cat.properties.length} technical properties` : 'View details',
    }
  })

const GenericLayout = ({ slug, locale }: { slug: Slug; locale: Locale }) => {
  const product = getProduct(locale, slug)
  if (!product) return null
  const image = productImage(slug) ?? ''

  return (
    <>
      <AtAGlance align="left" accent items={genericAtAGlance(locale, slug, product.sections)} />

      {product.sections.map((section, index) => {
        const cat = getSectionCatalog(locale, slug, section.id)
        const groups = cat?.series?.length
          ? catalogGroups({
              locale,
              slug,
              section: section.id,
              image,
              fallbacks: section.intro,
            })
          : []
        const optionCount = groups.reduce((sum, group) => sum + group.options.length, 0)
        const variant: 'grouped-tiles' | 'rows' | 'buttons' | 'none' =
          optionCount <= 1 ? 'none' : groups.length > 1 ? 'grouped-tiles' : optionCount > 6 ? 'rows' : 'buttons'
        const details = Boolean(cat?.properties?.length || cat?.coatings?.length || cat?.micronNote || section.specs?.length)
        const supporting = Boolean(section.applications?.length || section.callouts?.length || details || section.enquiryCta || section.datasheet)

        return (
          <div key={section.id}>
            <Chapter
              accent
              id={section.id}
              eyebrow={`${String(index + 1).padStart(2, '0')} / ${section.label.toUpperCase()}`}
              title={section.title}
              stats={genericSectionStats(cat, index, product.sections.length)}
            >
              {section.intro.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className={`${paragraphIndex ? 'mt-3' : ''} [&_a]:text-white [&_a]:underline [&_a]:decoration-champagne/70`}>
                  <RichText>{paragraph}</RichText>
                </p>
              ))}
            </Chapter>

            {(groups.length || supporting) ? (
              <ModuleWrap accent>
                <div className="space-y-6 lg:space-y-8">
                  {groups.length ? (
                    <UriGradeModule
                      accent="champagne"
                      selectorTitle={groups.length > 1 ? 'SELECT SERIES & GRADE' : 'SELECT GRADE'}
                      groups={groups}
                      variant={variant}
                    />
                  ) : null}

                  {!groups.length && cat?.image ? <GenericSectionImage image={cat.image} alt={`${section.title} — EID`} /> : null}

                  <GenericCallouts callouts={section.callouts} />

                  {(section.applications?.length || details) ? (
                    <div className={`grid gap-6 ${section.applications?.length && details ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
                      <GenericApplications title={section.applicationsTitle} items={section.applications} note={section.applicationsNote} />
                      <GenericDataCard
                        properties={cat?.properties}
                        coatings={cat?.coatings}
                        micronNote={cat?.micronNote}
                        specs={section.specs}
                      />
                    </div>
                  ) : null}

                  {(section.enquiryCta || section.datasheet) ? (
                    <div className="border-champagne flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5">
                      {section.enquiryCta ? (
                        <Link href={section.enquiryCta.href} className="text-primary text-sm font-semibold hover:underline">
                          {section.enquiryCta.label} →
                        </Link>
                      ) : null}
                      {section.datasheet ? (
                        <Link href="/resources/datasheets" className="text-primary text-sm font-semibold hover:underline">
                          {section.datasheet} →
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </ModuleWrap>
            ) : null}
          </div>
        )
      })}
    </>
  )
}

const UriProductLayout = ({ slug, locale }: { slug: Slug; locale: Locale }) => {
  if (slug === 'natural-grit-powder') return <NaturalLayout />
  if (slug === 'metal-bond') return <MetalLayout locale={locale} />
  if (slug === 'resin-bond') return <ResinLayout locale={locale} />
  return <GenericLayout slug={slug} locale={locale} />
}

const URI_PRODUCT_SLUGS: Slug[] = [
  'natural-grit-powder',
  'metal-bond',
  'resin-bond',
  'cbn',
  'single-crystal',
  'polycrystalline-diamond',
  'tool-stones',
  'polycrystalline-powder',
]

export const isUriProductLayout = (slug: string): slug is Slug =>
  URI_PRODUCT_SLUGS.includes(slug as Slug)

export default UriProductLayout
