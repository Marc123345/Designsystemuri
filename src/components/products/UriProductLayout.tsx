import UriGradeModule, { type UriGradeGroup, type UriGradeOption } from '@/components/products/UriGradeModule'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { productImage } from '@/lib/card-media'
import { getSectionCatalog } from '@/lib/i18n-content'
import { getProductImageSrc } from '@/lib/product-images'
import { T } from '@/components/products/uriType'

type Slug = 'natural-grit-powder' | 'metal-bond' | 'resin-bond'


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

const AtAGlance = ({ items, align = 'center' }: { items: { href: string; title: string; big: string; small?: string }[]; align?: 'left' | 'center' }) => (
  <section className="border-default-200 bg-default-50 border-b py-6 lg:py-7" data-note="uri-product-glance">
    <div className="container">
      <div className={`text-default-500 mb-3 ${T.eyebrow} ${align === 'center' ? 'text-center' : 'text-left'}`}>At a glance</div>
      <div className="border-default-200 grid overflow-hidden rounded-card border bg-white md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`border-default-200 group p-5 transition-colors hover:bg-default-50 md:border-r md:last:border-r-0 max-md:border-b max-md:last:border-b-0 ${align === 'center' ? 'text-center' : 'text-left'}`}
          >
            <strong className="text-primary-3 block text-base font-bold uppercase">{item.title}</strong>
            <span className="text-default-800 mt-2 block text-sm font-semibold">{item.big}</span>
            {item.small ? <span className="text-default-500 mt-1 block text-sm">{item.small}</span> : null}
            <span className={`text-primary mt-2.5 block uppercase ${T.label}`}>View range ↓</span>
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
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
  stats: { label: string; value: string }[]
}) => (
  <section id={id} className="bg-primary-3 scroll-mt-28 py-7 text-white lg:py-8" data-note="uri-product-chapter">
    <div className="container">
      <div className="flex items-start justify-between gap-10">
        <div className="max-w-4xl">
          <div className={`text-white/70 ${T.eyebrow}`}>{eyebrow}</div>
          <h2 className={`mt-2 text-white ${T.h2}`}>{title}</h2>
          <div className={`mt-3 text-white/88 ${T.body}`}>{children}</div>
        </div>
        <dl className="hidden min-w-[150px] shrink-0 text-right lg:block">
          {stats.map((stat) => (
            <div key={stat.label} className="mb-2 last:mb-0">
              <dt className={`text-white/60 uppercase ${T.label}`}>{stat.label}</dt>
              <dd className="mt-0.5 text-base font-bold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
)

const ModuleWrap = ({ children }: { children: React.ReactNode }) => (
  <section className="py-5 lg:py-8" data-note="uri-product-module">
    <div className="container">{children}</div>
  </section>
)

const Coatings = ({ resin = false }: { resin?: boolean }) => (
  <>
    <span id="coated" className="block scroll-mt-28" aria-hidden />
    <section id="coating-options" className="bg-primary-3 scroll-mt-28 py-4 text-white" data-note="uri-product-coatings-title">
      <div className="container">
        <div className={`text-white/70 ${T.eyebrow}`}>Coating options</div>
        <h2 className={`mt-2 text-white ${T.h2}`}>Electroless Nickel &amp; PVD Coatings</h2>
      </div>
    </section>

    <section className="border-default-200 bg-default-50 border-y py-8 lg:py-10" data-note="uri-product-coatings">
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
                <span key={item} className={`border-default-200 rounded-[4px] border bg-white px-3 py-2 font-semibold ${T.chip}`}>{item}</span>
              ))}
            </div>

            <div className={`text-default-500 mt-5 uppercase ${T.label}`}>PVD metallic coatings</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Titanium', 'Copper', 'TN', 'TiC', 'TiN', 'TiCN', 'Si', 'Cr', 'Zr', 'Al', 'AlN', 'Others'].map((item) => (
                <span key={item} className={`border-default-200 rounded-[4px] border bg-white px-3 py-2 font-semibold ${T.chip}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)

const ProcessStrip = ({ steps }: { steps: { n: string; title: string; note: string }[] }) => (
  <div className={`bg-primary-3 mt-6 grid overflow-hidden rounded-card text-white shadow-[0_10px_24px_rgba(9,42,77,0.10)] sm:grid-cols-2 ${steps.length === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
    {steps.map((step, index) => (
      <div key={step.n} className="relative border-white/15 p-4 sm:border-r sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:last:border-r-0">
        <span className={`text-white/60 ${T.eyebrow}`}>{step.n}</span>
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
}: {
  title: string
  from: string
  to: string
  points: { title: string; lines: string[] }[]
  note?: string
}) => (
  <div className="border-default-200 relative mt-5 overflow-hidden rounded-card border bg-white p-5 shadow-[0_8px_22px_rgba(26,43,58,0.05)] lg:p-6">
    <div className={`text-primary ${T.eyebrow}`}>{title}</div>
    {note ? <p className={`text-default-500 mt-2 max-w-3xl ${T.small}`}>{note}</p> : null}
    <div className={`text-default-500 mt-4 flex justify-between gap-6 uppercase ${T.label}`}>
      <span>{from}</span>
      <span className="text-right">{to}</span>
    </div>
    <div className="bg-default-300 relative my-2.5 h-0.5" />
    <div className={`grid gap-2 ${points.length === 10 ? 'grid-cols-2 lg:grid-cols-10' : points.length === 7 ? 'grid-cols-2 lg:grid-cols-7' : points.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'}`}>
      {points.map((point) => (
        <div key={point.title} className="border-primary border-t-3 px-2 pt-3 text-center">
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
}: {
  kicker: string
  title: string
  children: React.ReactNode
  steps: { n: string; title: string; note: string }[]
  spectra: React.ReactNode
}) => (
  <section className="border-default-200 relative overflow-hidden border-y bg-white py-12 lg:py-14" data-note="uri-product-insight">
    <div className="container relative">
      <div className="max-w-5xl">
        <div className={`text-primary ${T.eyebrow}`}>{kicker}</div>
        <h2 className={`text-primary-3 mt-2 ${T.h2}`}>{title}</h2>
        <div className={`text-default-600 mt-3 max-w-3xl ${T.body}`}>{children}</div>
        <ProcessStrip steps={steps} />
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
      <AtAGlance align="left" items={[
        { href: '#mesh', title: 'Natural Mesh', big: '3 grades', small: '12–500 mesh' },
        { href: '#micron', title: 'Natural Micron', big: '1 grade', small: '0–0.25 → 40–60 µm' },
        { href: '#rotary', title: 'Natural Rotary', big: '2 product lines · 6 grades' },
      ]} />

      <span id="grit" className="block scroll-mt-28" aria-hidden />
      <Chapter id="mesh" eyebrow="01 / NATURAL MESH" title="Natural Mesh" stats={[{ label: 'Grades', value: '3' }, { label: 'Size range', value: '16/18 → 400/500 mesh' }]}>
        Natural diamond grit engineered across distinct crystal morphologies to balance strength, durability and cutting action for demanding industrial abrasive applications.
      </Chapter>
      <ModuleWrap>
        <UriGradeModule
          groups={mesh}
          variant="tiles"
          axis={{ from: '← Higher toughness', to: 'More free-cutting →' }}
          selectorNote={{ lead: 'NS / MB designation refers to sizing range.', text: 'Grade characteristics and morphology remain consistent across both designations.' }}
        />
      </ModuleWrap>

      <Chapter id="micron" eyebrow="02 / NATURAL MICRON" title="Natural Micron" stats={[{ label: 'Grades', value: '1' }, { label: 'Size range', value: '0–0.20 → 40–60 µm' }]}>
        Precision-graded natural diamond powder engineered around the exceptional hardness and cutting efficiency of natural diamond. Strong, well-shaped crystalline particles combine controlled blocky morphology with sharp cutting edges to deliver consistent abrasive action, efficient material removal and high-quality surface finishes across precision lapping, polishing and fine grinding applications.
      </Chapter>
      <ModuleWrap>
        <UriGradeModule groups={micron} variant="none" />
      </ModuleWrap>

      <Chapter id="rotary" eyebrow="03 / NATURAL ROTARY" title="Natural Rotary Diamonds" stats={[{ label: 'Product lines', value: '2' }, { label: 'Grades', value: '6' }]}>
        <div className="grid gap-5 md:grid-cols-2 md:gap-9">
          <p><strong className="text-white">Wholestone Diamonds</strong> — Our Wholestone Rough Industrial diamonds are mined diamonds in their natural state, before any processing or polishing has occurred.</p>
          <p><strong className="text-white">Rotary Diamonds</strong> — Rotary Diamond Dressers provide an efficient, economical means of dressing grinding wheels to the correct form, tolerance and condition for exceptional accuracy.</p>
        </div>
      </Chapter>
      <ModuleWrap>
        <UriGradeModule groups={rotary} variant="grouped-tiles" ctaLead="Need a grade or selection not listed?" />
      </ModuleWrap>

      <Insight
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
  const micronGroups = catalogGroups({
    locale,
    slug: 'metal-bond',
    section: 'micron',
    image,
    fallbacks: ['EID Metal Bond Synthetic Diamond Powders combine strong bond retention, high particle strength and thermal stability for demanding lapping, finishing and grinding applications.'],
  })

  return (
    <>
      <AtAGlance items={[
        { href: '#metal-bond-mesh', title: 'Metal Bond Mesh', big: '16/18 → 400/500 mesh', small: '2 series · 17 grades' },
        { href: '#metal-bond-micron', title: 'Metal Bond Micron', big: '0–0.20 → 40–60 µm', small: '1 series · 5 grades' },
        { href: '#coating-options', title: 'Coating Options', big: 'Electroless Nickel & PVD', small: 'Coating technologies' },
      ]} />

      <span id="mesh" className="block scroll-mt-28" aria-hidden />
      <Chapter id="metal-bond-mesh" eyebrow="01 / METAL BOND MESH" title="Metal Bond Mesh" stats={[{ label: 'Series', value: '2' }, { label: 'Grades', value: '17' }]}>
        <p><strong className="text-white">ESN “Saw Grade” Series</strong> — Synthetic diamond grit engineered for sawing and drilling applications, with low, well-distributed metallic inclusion content for high thermal stability and particle strength.</p>
        <p className="mt-2"><strong className="text-white">EDA “Wheel Grade” Series</strong> — Synthetic diamond grit developed for precision abrasive tooling, with a broad range of grades for metal, resin, vitrified and electroplated bond systems.</p>
      </Chapter>
      <ModuleWrap>
        <UriGradeModule selectorTitle="SELECT SERIES & GRADE" groups={meshGroups} variant="rows" />
      </ModuleWrap>

      <span id="micron" className="block scroll-mt-28" aria-hidden />
      <Chapter id="metal-bond-micron" eyebrow="02 / METAL BOND MICRON" title="Metal Bond Micron" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '5' }]}>
        EID Metal Bond Synthetic Diamond Powders combine strong bond retention, high particle strength and thermal stability for demanding lapping, finishing and grinding applications. Their blocky cubo-octahedral morphology and multiple cutting edges provide controlled abrasive performance across applications including glass, tungsten carbide and stone surfacing.
      </Chapter>
      <ModuleWrap>
        <UriGradeModule groups={micronGroups} variant="buttons" />
      </ModuleWrap>

      <Coatings />

      <Insight
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
      <AtAGlance items={[
        { href: '#resin-bond-mesh', title: 'Resin Bond Mesh', big: '50/60 → 400/500 mesh', small: '1 series · 4 grades' },
        { href: '#resin-bond-micron', title: 'Resin Bond Micron', big: '0–0.20 → 40–60 µm', small: '1 series · 2 grades' },
        { href: '#coating-options', title: 'Coating Options', big: 'Electroless Nickel & PVD', small: 'Coating technologies' },
      ]} />

      <span id="mesh" className="block scroll-mt-28" aria-hidden />
      <Chapter id="resin-bond-mesh" eyebrow="01 / RESIN BOND MESH" title="Resin Bond Mesh" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '4' }]}>
        EID Resin Bond Mesh is engineered for resin-bonded diamond wheels and non-ferrous grinding applications. Its multi-crystalline mosaic structure, rough surface and controlled friability continuously expose fresh cutting edges for fast, consistent cutting and long tool life.
      </Chapter>
      <ModuleWrap>
        <UriGradeModule groups={meshGroups} variant="rows" />
      </ModuleWrap>

      <span id="micron" className="block scroll-mt-28" aria-hidden />
      <Chapter id="resin-bond-micron" eyebrow="02 / RESIN BOND MICRON" title="Resin Bond Micron" stats={[{ label: 'Series', value: '1' }, { label: 'Grades', value: '2' }]}>
        EID Resin Bond Synthetic Diamond Powders combine friability, mosaic structure and irregular blocky particle morphology for soft polishing, lapping and fine grinding. Under stress, the diamond fractures to expose fresh cutting points, supporting fast cutting and excellent surface finish.
      </Chapter>
      <ModuleWrap>
        <UriGradeModule groups={micronGroups} variant="buttons" />
      </ModuleWrap>

      <Coatings resin />

      <Insight
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

const UriProductLayout = ({ slug, locale }: { slug: Slug; locale: Locale }) => {
  if (slug === 'natural-grit-powder') return <NaturalLayout />
  if (slug === 'metal-bond') return <MetalLayout locale={locale} />
  return <ResinLayout locale={locale} />
}

export const isUriProductLayout = (slug: string): slug is Slug =>
  slug === 'natural-grit-powder' || slug === 'metal-bond' || slug === 'resin-bond'

export default UriProductLayout
