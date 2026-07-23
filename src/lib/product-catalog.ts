/**
 * Real catalogue data scraped from the legacy eid-ltd.com product pages:
 * grade/series names, mesh and micron size ranges, coatings, and product
 * properties. Kept separate from products.ts (the copy deck) so the marketing
 * prose and the hard spec data can evolve independently, and so the 990-line
 * copy file stays untouched. Keyed by [product slug][section id]; the product
 * page merges a section's catalogue entry in where one exists and renders the
 * richer grade / size / photo layout, falling back to the copy-deck spec table
 * where it does not.
 *
 * Source: https://www.eid-ltd.com/ (natural-mesh, natural-micron,
 * natural-rotarydiamond, metal-bond-*, resin-bond-*, ebn-*, toolstones,
 * polycrystalline-micron, cvd-*, pcd, pcbn, mcd).
 */

export type Grade = { code: string; tag?: string; desc?: string; image?: string }
export type GradeSeries = {
  title: string
  /** Size-range label shown as the block heading, mirroring eid-ltd.com
   *  ("12-60 Mesh", "60-500 Mesh"). Falls back to `title` when absent. */
  range?: string
  note?: string
  /** Default photo for the block; a grade's own `image` overrides it. */
  image?: string
  grades: Grade[]
}
export type MeshGroup = { label: string; sizes: string[] }

export type SectionCatalog = {
  /** Registry key in product-images.ts for the lead product photo. */
  image?: string
  /** Additional photos rendered as a small gallery (tool stones, PCD chart). */
  imageGallery?: string[]
  imageRatio?: 'landscape' | 'portrait' | 'square'
  /** Grade / series cards. */
  series?: GradeSeries[]
  /** Mesh size ranges, grouped (e.g. saw grades vs wheel grades). */
  meshSizes?: MeshGroup[]
  /** Micron powder size ranges, rendered as a compact chip grid. */
  micronSizes?: string[]
  micronNote?: string
  /** Coating options. */
  coatings?: string[]
  /** Hard property rows, replacing the copy deck's [confirm] placeholders. */
  properties?: { label: string; value: string }[]
}

// The micron powder size range is shared across the natural, bonded, CBN, and
// polycrystalline lines (identical size chart on every micron page).
const MICRON_STD = [
  '0-0.20', '0-0.25', '0-0.50', '0.25-0.75', '0-1', '0.50-1', '0.50-1.5',
  '0.75-1.25', '0-2', '1-2', '1-3', '2-4', '3-5', '3-6', '4-6', '4-8', '5-10',
  '6-12', '8-12', '8-16', '10-20', '12-22', '15-25', '20-30', '20-40', '30-40',
  '30-50', '40-50', '40-60',
]

const NS_SIZES = [
  '16/18', '18/20', '20/25', '20/30', '25/30', '30/35', '30/40', '35/40',
  '35/45', '40/45', '40/50', '45/50', '45/60', '50/60', '50/70',
]
const WHEEL_SIZES = [
  '60/70', '60/80', '70/80', '80/100', '100/120', '120/140', '140/170',
  '170/200', '200/230', '230/270', '270/325', '325/400', '400/500',
]

export const catalog: Record<string, Record<string, SectionCatalog>> = {
  /* ============================ 1 · NATURAL ============================ */
  'natural-grit-powder': {
    grit: {
      image: 'ns-100-p',
      series: [
        {
          title: 'NS Series — Saw Diamond',
          range: '12–60 Mesh',
          image: 'ns-100-p',
          grades: [
            { code: 'NS-100-P', tag: 'Blocky', image: 'ns-100-p', desc: 'A specially engineered natural diamond abrasive, consisting of super blocky well shaped crystals. Its thermal properties allow exposure to very high temperatures without affecting its crystal strength. Its sharp cutting edges make it ideal for the drilling and sawing of concrete, reinforced plastics, masonry and marble. Ideal for electroplating tools.' },
            { code: 'NS-1-P', tag: 'Regular', image: 'ns-100-p', desc: 'Regular-shape saw diamond in the NS series, for the drilling and sawing of concrete, reinforced plastics, masonry and marble.' },
            { code: 'NS-1-S', tag: 'Sharp', image: 'ns-100-p', desc: 'Sharper, more friable crystal in the NS series for free-cutting saw and drilling applications.' },
          ],
        },
        {
          title: 'MB Series — Wheel Diamond',
          range: '60–500 Mesh',
          image: 'mb-100-p',
          grades: [
            { code: 'MB-100-P', tag: 'Blocky', image: 'mb-100-p', desc: 'The flagship product of the EID Natural diamond range: a strong engineered blocky natural diamond abrasive, free of all metal inclusions. Its sharp cutting edges make it ideal for use in free-cutting diamond tools and dental burs, and for the drilling and grinding of glass, ceramics, plastics and tungsten carbide. For electroplated and metal bonds.' },
            { code: 'MB-1-P', tag: 'Regular', image: 'mb-100-p', desc: 'Regular-shape wheel diamond in the MB series for grinding of glass, ceramics, plastics and tungsten carbide.' },
            { code: 'MB-1-S', tag: 'Sharp', image: 'mb-100-p', desc: 'Sharper, free-cutting crystal in the MB series for wheel and lapping applications on hard, brittle materials.' },
          ],
        },
      ],
      meshSizes: [
        { label: 'NS (saw) sizes', sizes: NS_SIZES },
        { label: 'MB (wheel) sizes', sizes: WHEEL_SIZES },
      ],
    },
    rotary: {
      image: 'wd-aaa',
      series: [
        {
          title: 'WD Series — Wholestone',
          note: 'Mined diamonds in their natural state, for rotary dresser applications, surface-set drill bits and casing shoes.',
          image: 'wd-aaa',
          grades: [
            { code: 'WD-AAA', tag: 'Premium', image: 'wd-aaa' },
            { code: 'WD-AA', tag: 'Select', image: 'wd-aa' },
            { code: 'WD-A', tag: 'Standard', image: 'wd-a' },
          ],
        },
        {
          title: 'RD Series — Rotary Dresser',
          note: 'The most efficient and economic means of dressing grinding wheels, for automotive, aerospace and precision engineering. RD90 is the top of the range; RD85 and other shape factors are available per client requirement.',
          image: 'rd90',
          grades: [
            { code: 'RD90', tag: 'Top grade', image: 'rd90' },
            { code: 'RD10', tag: 'Standard', image: 'rd10' },
            { code: 'Congo RD', tag: 'Congo', image: 'congo-rd' },
          ],
        },
      ],
      meshSizes: [
        { label: 'By weight', sizes: ['1 ct', '3/4 ct', '1/2 ct', '1/3 ct'] },
        { label: 'Stones per carat', sizes: ['5-6 spc', '6-8 spc', '8-10 spc', '…', '500 spc'] },
        { label: 'Mesh', sizes: ['16/18', '…', '60/80'] },
      ],
      properties: [
        { label: 'Shape factor', value: 'Customisable per client requirement (RD series)' },
      ],
    },
    micron: {
      image: 'mb1um-2-4',
      series: [
        {
          title: 'MB-1-UM — Natural Micron Powder',
          note: 'Strong, blocky, well-shaped particles with the right mixture of smooth surfaces and sharp edges for optimal results.',
          image: 'mb1um-2-4',
          grades: [
            { code: 'MB-1-UM 2-4', tag: '2–4 µm', image: 'mb1um-2-4' },
            { code: 'MB-1-UM 12-22', tag: '12–22 µm', image: 'mb1um-12-22' },
            { code: 'MB-1-UM 30-40', tag: '30–40 µm', image: 'mb1um-30-40' },
          ],
        },
      ],
      micronSizes: MICRON_STD,
      properties: [
        { label: 'Colour', value: 'Brilliant white' },
        { label: 'Crystal structure', value: 'Octahedral surfaces based on cubic configuration' },
        { label: 'Insulation', value: 'Superior natural insulation' },
      ],
    },
  },

  /* =========================== 2 · METAL BOND =========================== */
  'metal-bond': {
    mesh: {
      image: 'esn-770',
      series: [
        {
          title: 'ESN Series — Saw Grade',
          image: 'esn-770',
          grades: [
            { code: 'ESN 770', tag: 'Top strength', image: 'esn-770', desc: 'Supreme strength in the ESN series — uniform cubo-octahedral crystals with ultimate thermal stability, free from visible inclusions.' },
            { code: 'ESN 750' }, { code: 'ESN 700' }, { code: 'ESN 600' },
            { code: 'ESN 500' }, { code: 'ESN 400' }, { code: 'ESN 300' },
            { code: 'ESN 200' }, { code: 'ESN 75' }, { code: 'ESN 50' },
          ],
        },
        {
          title: 'EDA Series — Wheel Grade',
          image: 'eda-2395',
          grades: [
            { code: 'EDA 2395', tag: 'Extra tough', image: 'eda-2395', desc: 'Extra tough abrasive with well-defined cubo-octahedral crystals, free from harmful inclusions. High thermal stability and impact resistance.' },
            { code: 'EDA 2360' }, { code: 'EDA 2300' }, { code: 'EDA 2215' },
            { code: 'EDA 2125' }, { code: 'EDA 2050' }, { code: 'EDA 2025' },
          ],
        },
      ],
      meshSizes: [
        { label: 'ESN (saw) sizes', sizes: NS_SIZES },
        { label: 'EDA (wheel) sizes', sizes: WHEEL_SIZES.filter((s) => s !== '60/80' && s !== '230/270') },
      ],
      coatings: ['Nickel 30%', 'Nickel 56%', 'Nickel 60%', 'Custom %'],
    },
    micron: {
      image: 'metal-bond-micron',
      series: [
        {
          title: 'EID Metal Bond Micron Powder',
          note: 'Superior metal-bond retention, resistance to disintegration at very high temperatures and added strength — ideal for the most sensitive lapping and finishing applications.',
          image: 'metal-bond-micron',
          grades: [
            { code: 'MB500-um', tag: 'Premium Plus', image: 'metal-bond-micron', desc: 'Highest level of milled blocky shape and extra-tight curve grading, where sensitive controlled engineering is desired.' },
            { code: 'MB400-um', tag: 'Premium' },
            { code: 'MB300-um', tag: 'Standard' },
            { code: 'MB200-um', tag: 'Economy' },
            { code: 'EGM', tag: 'Variant' },
          ],
        },
      ],
      micronSizes: MICRON_STD,
      properties: [
        { label: 'Crystal shape', value: 'Blocky cubo-octahedral, with a variety of cutting edges' },
        { label: 'Strength', value: 'High particle strength' },
      ],
    },
    coated: {
      coatings: ['Nickel 30%', 'Nickel 56%', 'Nickel 60%', 'Custom % on request'],
    },
  },

  /* =========================== 3 · RESIN BOND =========================== */
  'resin-bond': {
    mesh: {
      image: 'resin-bond-mesh',
      series: [
        {
          title: 'EDA Series — Friable Grit',
          image: 'resin-bond-mesh',
          grades: [
            { code: 'EDA 2023', tag: 'Wheel', image: 'resin-bond-mesh', desc: 'Crystals of irregular shape; rough, mosaic structure for excellent bond retention and controlled micro-fracturing. The product of choice in high-quality resin and vitrified bonds for wet & dry grinding of tungsten carbide.' },
            { code: 'EDA 2021' },
            { code: 'EDA 2020' },
            { code: 'EFRD-S', tag: 'Fine' },
          ],
        },
      ],
      meshSizes: [
        { label: 'Sizes', sizes: ['50/60', ...WHEEL_SIZES.filter((s) => s !== '60/80')] },
      ],
      coatings: ['Nickel 30% (EDA 2023-30n)', 'Nickel 56% (EDA 2023-56n)', 'Nickel 60%', 'Copper (EDA 2023-50c)', 'Custom %'],
    },
    micron: {
      image: 'erd-um',
      series: [
        {
          title: 'ERD-um — Resin Bond Micron Powder',
          note: 'Friability, mosaic structure and irregular blocky particle shape: the grain fractures to create new sharp cutting points, for fast cutting without particle loss in resin bond wheels.',
          image: 'erd-um',
          grades: [
            { code: 'ERD-um', tag: 'Blocky', image: 'erd-um', desc: 'High surface toughness and tightly graded particles for soft polishing and grinding of ceramics, carbides, glass and hard materials requiring excellent surface finish.' },
            { code: 'ERD-um', tag: 'Standard', image: 'erd-um' },
          ],
        },
      ],
      micronSizes: MICRON_STD,
    },
    coated: {
      coatings: ['Nickel 30 / 56 / 60%', 'Copper', 'Custom % on request'],
    },
  },

  /* ============================== 4 · CBN ============================== */
  cbn: {
    mesh: {
      image: 'ebn-aa',
      series: [
        {
          title: 'EBN Series — CBN Mesh',
          note: 'For electroplated, metal, vitrified and resin bonds — grinding and lapping of steel, camshafts, crankshafts, gears, valve stems, drive shafts, CV joints, piston pins, surgical knives and steel blades.',
          image: 'ebn-aa',
          grades: [
            { code: 'EBN AA', tag: 'Amber', image: 'ebn-aa', desc: 'Amber-coloured, angular yet semi-blocky crystal. High thermal stability, medium-to-high strength, good adaptability and prolonged tool life. Ideal in single-layer, metal and vitrified bonds.' },
            { code: 'EBN A', tag: 'Amber', image: 'ebn-aa' },
            { code: 'EBN 415' }, { code: 'EBN 8000' }, { code: 'EBN 6000' },
            { code: 'EBN 5000' }, { code: 'EBN 2000' },
          ],
        },
      ],
      meshSizes: [
        { label: 'Sizes', sizes: ['20/30', '30/40', '40/45', '45/50', '50/60', '60/70', '70/80', '80/100', '100/120', '120/140', '140/170', '170/200', '200/230', '230/270', '270/325', '325/400', '400/500'] },
      ],
      properties: [
        { label: 'Hardness', value: 'Second only to diamond' },
        { label: 'High-temp resistance', value: '2× that of diamond' },
        { label: 'Wear resistance', value: '4× that of traditional abrasives' },
        { label: 'Thermal conductivity', value: 'Extraordinarily high' },
      ],
    },
    micron: {
      image: 'cbn-a-micron',
      imageGallery: ['cbn-a-micron', 'cbn-b-micron', 'ebn-b-4-8'],
      series: [
        {
          title: 'EBN Micron Powder',
          note: 'Medium-high toughness, high thermal stability and macro-fracture characteristics — angular shape with defined cutting edges. For lapping, honing and polishing in automotive, aerospace and scientific instruments.',
          image: 'cbn-a-micron',
          grades: [
            { code: 'EBN-A', tag: 'Amber', image: 'cbn-a-micron', desc: 'Amber CBN micron powder, e.g. EBN-A-UM 20-30.' },
            { code: 'EBN-B', tag: 'Black', image: 'cbn-b-micron', desc: 'Black CBN micron powder, e.g. EBN-B-UM 5-10 and EBN-B-UM 4-8.' },
          ],
        },
      ],
      micronSizes: MICRON_STD,
      properties: [
        { label: 'Suited to', value: 'Hard tool steels, alloyed steels and super-alloys' },
      ],
    },
    coated: {
      coatings: ['Available on mesh grades for single-layer and metal/vitrified bonds'],
    },
    pcbn: {
      image: 'pcbn',
      imageGallery: ['pcbn', 'pcbn-edn', 'pcbn-esn'],
      series: [
        {
          title: 'High CBN-content',
          image: 'pcbn',
          grades: [
            { code: 'ETN10', desc: 'Gray cast iron cylinder boring; nodular cast iron turning.' },
            { code: 'ETN16', desc: 'Brake drum turning; TiAl6V4 turning; internal gear turning; ball-nose end milling.' },
          ],
        },
        {
          title: 'Low CBN-content',
          image: 'pcbn',
          grades: [
            { code: 'ETN35C', desc: 'Finish machining of difficult grey cast irons (milling) and hardened steels.' },
            { code: 'ETN35N', desc: 'Severe interrupted turning of hardened and die steels.' },
            { code: 'ETN40C', desc: 'Continuous & interrupted hardened-steel turning.' },
            { code: 'ETN45N', desc: 'Continuous and interrupted turning of hardened steels.' },
            { code: 'ETN45C', desc: 'Case-hardened steel finish turning; moderate interrupted hard turning.' },
            { code: 'ETN55N', desc: 'Continuous turning with exceptional surface finish; provides toughness.' },
          ],
        },
      ],
      properties: [
        { label: 'ETN — single layer', value: 'Ø 51.0 / 61.0 / 74.0 mm · 1.5 / 2.0 / 2.4 / 3.2 / 4.8 mm thick' },
        { label: 'EDN — double layer', value: 'Ø 51.0 / 61.0 / 74.0 mm · 3.2 / 4.8 / 6.4 mm thick' },
        { label: 'ESN — solid', value: 'Ø 45.0 / 55.0 mm · 3.3 / 5.0 mm thick' },
      ],
    },
  },

  /* ===================== 5 · SINGLE CRYSTAL (CVD & MCD) ===================== */
  'single-crystal': {
    cvd: {
      image: 'cvd-single-crystal',
      series: [
        {
          title: 'CVD Single Crystal',
          note: 'Supplied through EID’s exclusive global partnership with Diamond Elements. Full grade, size and property data in the CVD single-crystal brochure — ask our technical team.',
          image: 'cvd-single-crystal',
          grades: [{ code: 'Made to specification', image: 'cvd-single-crystal' }],
        },
      ],
    },
    mcd: {
      image: 'mcd',
      series: [
        {
          title: 'MCD — Monocrystalline Diamond (HPHT)',
          note: 'Grown by combining carbon and transitional metals at very high pressure and temperature. Excellent thermal conductivity, wear resistance and repeatable chemical, physical and thermal characteristics.',
          image: 'mcd',
          grades: [
            { code: 'Grade 1', tag: 'Flawless', desc: 'Flawless crystal.' },
            { code: 'Grade 2 & 3', desc: 'Various levels of internal inclusions.' },
          ],
        },
      ],
      properties: [
        { label: 'Shapes', value: 'Topped octahedron, rhombic-dodecahedron, plate-like crystals' },
        { label: 'Colour', value: 'Yellow' },
        { label: 'Dimensions', value: 'Up to 8 × 8 × 1.60–1.70 mm; typically up to 5 mm diameter' },
        { label: 'Orientation', value: 'Supplied in 100 orientation (4-point diamond)' },
        { label: 'Surface finish', value: '0.025 micron or better on the workpiece' },
      ],
    },
  },

  /* ================= 6 · POLYCRYSTALLINE DIAMOND (CVD & PCD) ================= */
  'polycrystalline-diamond': {
    'pcd-blanks': {
      image: 'pcd',
      imageGallery: ['pcd', 'pcd-grades-chart'],
      series: [
        {
          title: 'Grades',
          note: 'Three industrial-standard grain grades for machining non-ferrous and non-metallic materials.',
          image: 'pcd',
          grades: [
            { code: 'Fine', image: 'pcd' }, { code: 'Medium', image: 'pcd' }, { code: 'Coarse', image: 'pcd' },
          ],
        },
        {
          title: 'Types',
          image: 'pcd',
          grades: [
            { code: 'S-type', tag: 'Standard', desc: 'Standard-type PCD.' },
            { code: 'X-type', tag: 'Tough', desc: 'Higher toughness / thermal stability.' },
            { code: 'U-type', tag: 'Ultra-hard', desc: 'Higher diamond concentration / higher wear resistance.' },
            { code: 'SF', tag: 'Submicron', desc: 'Submicron PCD grade (new offering).' },
          ],
        },
      ],
      properties: [
        { label: 'Disc sizes', value: 'Ø 75 mm · Ø 62 mm · Ø 52 mm' },
      ],
    },
    'dressing-logs': {
      image: 'cvd-polycrystalline',
      series: [
        {
          title: 'CVD Polycrystalline — Grades',
          note: 'Diamond with no binder phase, produced by DC arc plasma-jet technology. High wear resistance to chipping and fracture, with uniform wear over the entire length of the dresser.',
          image: 'cvd-polycrystalline',
          grades: [
            { code: 'HQ', tag: 'High grade', image: 'cvd-polycrystalline' },
            { code: 'SQ', tag: 'Standard grade', image: 'cvd-polycrystalline' },
          ],
        },
      ],
      properties: [
        { label: 'Thermal conductivity', value: '800–2000 W/mK (approaching 2000 W/mK for optical quality)' },
        { label: 'Form', value: 'Rectangular logs in various lengths and cross-sections; non-standard dimensions on request' },
        { label: 'Friction', value: 'Very low coefficient; high fracture strength and toughness' },
      ],
    },
  },

  /* ========================= 7 · NATURAL TOOL STONES ========================= */
  'tool-stones': {
    'tool-stones': {
      image: 'toolstone-1',
      imageGallery: [
        'toolstone-1', 'toolstone-2', 'toolstone-3', 'toolstone-4',
        'toolstone-5', 'toolstone-6', 'toolstone-7', 'toolstone-8',
      ],
      series: [
        {
          title: 'Dressers',
          image: 'toolstone-1',
          grades: [
            { code: 'Octahedron Dresser', image: 'toolstone-1', desc: '50 spc – 5 ct+ · single point to 6 usable points · yellow / brown · S. Africa, Canada, Australia.' },
            { code: 'Dodecahedron Dresser', image: 'toolstone-2', desc: '50 spc – 5 ct+ · single point to 6 usable points · yellow / brown.' },
            { code: 'Bruting Dresser', image: 'toolstone-3', desc: '10 spc – 1.5 ct · economy range of clean stones for bruting on a point · brown.' },
            { code: 'Processed Longs', image: 'toolstone-4', desc: '150 spc – 2 spc · 2 quality levels · multi-point / roller dresser applications.' },
          ],
        },
        {
          title: 'Sawn & shaped',
          image: 'toolstone-5',
          grades: [
            { code: 'Window Triangle', image: 'toolstone-5', desc: '30 spc – 1.5 ct+ · thickness customisable · white / yellow / brown.' },
            { code: 'Cushion Triangle', image: 'toolstone-6', desc: '30 spc – 1.5 ct+ · thickness customisable · white / yellow / brown.' },
            { code: 'Sawn 2/4 Point Cape', image: 'toolstone-7', desc: '15 spc – 3/4 ct · long/wide or square/elongated · mainly African.' },
            { code: 'Sawn 2/4 Point Brown', image: 'toolstone-8', desc: '15 spc – 3/4 ct · long/wide or square/elongated · mainly African.' },
            { code: 'Natural Longs', image: 'toolstone-9', desc: '50 spc – 1 ct · specially selected with 3:1 ratio · crown / yellow.' },
            { code: 'Shapes', image: 'toolstone-10', desc: '10 spc – 1.5 ct · flat squashed or round pancake · yellow / brown · Africa.' },
            { code: 'Flats', image: 'toolstone-11', desc: '10 spc – 2 ct · flat window or blockier · yellow / brown.' },
          ],
        },
        {
          title: 'Drilling & specials',
          image: 'toolstone-12',
          grades: [
            { code: 'Die Stone', image: 'toolstone-12', desc: '100 spc – 1/2 ct · crystal or round · wire-drawing · selected by polariscope, perfectly clean.' },
            { code: 'Processed Drills', image: 'toolstone-13', desc: '300 spc – 1 ct · various rounded levels · all drilling applications · Congo / Australian.' },
            { code: 'Natural Drills', image: 'toolstone-14', desc: 'Full size / quality range · brown · all drilling applications.' },
            { code: 'Congo Rounds', image: 'toolstone-15', desc: '10 spc – 4 ct+ · drilling, bruting, opening scives · 2 quality levels.' },
            { code: 'Congo Cubes', image: 'toolstone-16', desc: '10 spc – 4 ct+ · dressing / bruting · 2 quality levels.' },
            { code: 'Natural Rounds', image: 'toolstone-1', desc: '20 spc – 2 ct · perfect ball-shaped clean material · hardness testing, gauge tooling.' },
            { code: 'Castings', image: 'toolstone-2', desc: '300 spc – 1 ct · "kicker" applications · various.' },
            { code: 'Carbonado', image: 'toolstone-3', desc: '10 spc – 10 ct · dressing / drilling · quality level 1.' },
          ],
        },
      ],
    },
  },

  /* ==================== 8 · POLYCRYSTALLINE DIAMOND POWDER ==================== */
  'polycrystalline-powder': {
    'polycrystalline-powder': {
      image: 'poly-micron',
      series: [
        {
          title: 'Grades',
          note: 'A black powder produced through a shock-synthesis process using controlled explosions. Its polycrystalline structure enables controlled micro-fracturing, resists major cleavage fractures, and tolerates three times higher operating pressures than monocrystalline diamond.',
          image: 'poly-micron',
          grades: [
            { code: 'EDD-UM', tag: 'Premium', image: 'poly-micron', desc: 'Premium grade for high-end engineering and precision finishing — sapphire boules, high-end optical components.' },
            { code: 'EDD-X-UM', tag: 'Standard', image: 'poly-micron' },
          ],
        },
      ],
      micronSizes: MICRON_STD,
      micronNote: 'Ranges from 12-22 up to 40-60 are available in EDD-UM only. Recommended for lapping and finishing sapphire, ruby, ferrites, ceramics and other non-metal oxides.',
    },
  },
}

export const getSectionCatalog = (slug: string, sectionId: string): SectionCatalog | undefined =>
  catalog[slug]?.[sectionId]
