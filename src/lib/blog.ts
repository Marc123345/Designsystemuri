/**
 * The blog, as data.
 *
 * Same rule as products.ts and applications.ts: copy is data, not JSX. One
 * entry feeds the index card, the article page, the metadata, the sitemap and
 * the Article schema, so none of them can drift from the others.
 *
 * ── ⚠ WHAT THESE ARTICLES MAY AND MAY NOT SAY ───────────────────────────────
 *
 * They are technical explainers, not evidence. The site's standing rules apply
 * here harder than anywhere else, because prose makes it easy to slide:
 *
 *  · NO INVENTED EID NUMBERS. Instrument makes, calibration intervals and real
 *    D-value tolerances are `[confirm with Uri]` everywhere else on this site.
 *    None of them appear here. Where a figure is given it is a published
 *    industry standard (FEPA, ISO 6106, ANSI B74.16) or arithmetic anyone can
 *    check, never a claim about EID's own process.
 *  · NEVER SAY EID RUNS REACTORS. CVD material is grown to specification by a
 *    growth partner and finished in-house. The single-crystal piece says so in
 *    those words; do not smooth it out.
 *  · The graduated production claim holds throughout: natural grit and powder
 *    in-house, bonded and CBN grades produced to order then QC-upgraded.
 *  · No customer names, no case studies, no testimonials — none exist.
 *
 * ── Voice ───────────────────────────────────────────────────────────────────
 *
 * The site's, which is short declaratives and concrete consequences. The
 * reader is a process engineer or a buyer who already knows what an abrasive
 * is. No opening rhetorical questions, no "in today's market", no adjective
 * doing the work a number should do.
 */

/** A paragraph string may carry inline `[label](/href)` links — see RichText. */
export type Block =
  | { h2: string }
  | { p: string }
  | { list: string[] }
  /** A pulled-aside caveat. Used for the honest limits, not for emphasis. */
  | { note: string }
  | { table: { head: [string, string]; rows: [string, string][] } }

export type Post = {
  slug: string
  category: string
  title: string
  /** The standfirst. Also the card description and the meta description base. */
  dek: string
  metaTitle: string
  metaDesc: string
  image: string
  alt: string
  /** ISO date. All six were written in one sitting; pretending otherwise would
      put a false date in the Article schema. */
  published: string
  readMinutes: number
  body: Block[]
}

export const posts: Post[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'batch-to-batch-consistency-cost-driver',
    category: 'Application Note',
    title: 'Why batch-to-batch consistency is the real cost driver in diamond tooling',
    dek: 'Procurement optimises for price per carat. The bigger number is what an inconsistent batch costs downstream: rejected product, recalibrated lines, lost trust.',
    metaTitle: 'Batch Consistency: The Real Cost in Diamond Tooling | EID',
    metaDesc:
      'Price per carat is the visible number. Inconsistent abrasive costs more downstream in rejects, re-dressing and requalification. How to specify and verify consistency.',
    image: '/eid/qc-batch-to-batch.jpg',
    alt: 'Side-by-side scanning electron micrographs of two production lots at the same magnification, each with a 1 micrometre scale bar',
    published: '2026-09-01',
    readMinutes: 6,
    body: [
      {
        p: 'There are two prices on every drum of diamond. The one on the invoice is per carat and it is easy to compare. The one that decides whether the purchase was a good idea is paid later, on the production floor, and it does not appear on any quotation.',
      },
      {
        p: 'That second price is the cost of variation. It is the reject rate when a sintered part comes out different from the last run, the hours spent re-dressing a wheel that is breaking down faster than it should, and the requalification work that follows a supplier change nobody wanted to make.',
      },

      { h2: 'The number on the invoice, and the number on the floor' },
      {
        p: 'A saving of a few percent per carat is real and it is measurable on the day. Against it sits a set of costs that are just as real and much harder to attribute, because they surface weeks later and in a different department.',
      },
      {
        list: [
          'Scrapped or downgraded product when a batch sinters or plates differently from the one it was qualified against.',
          'Shorter intervals between dressing cycles, which costs wheel life and machine time at once.',
          'Process re-tuning: feed rates, dwell, coolant, sintering profile, all adjusted to compensate for material that moved.',
          'Requalification, which on a regulated product line means documentation as well as testing.',
          'The failures a customer finds rather than you do, which cost more than all of the above combined.',
        ],
      },
      {
        p: 'None of these is caused by a bad abrasive. They are caused by a *different* abrasive arriving under the same grade name.',
      },

      { h2: 'Where variation actually enters' },
      {
        p: 'Four variables account for most of what a tool maker experiences as inconsistency. Each is measurable, which means each can be specified and each can be verified on arrival.',
      },
      {
        list: [
          'Particle size distribution. Two lots can share a nominal grade and a midpoint and still differ at the tails, which is where surface finish and breakdown behaviour are decided. See [reading a particle size distribution](/resources/blog/reading-a-particle-size-distribution).',
          'Crystal shape and friability. Blocky, well-formed crystals survive load and cut cool; irregular or highly friable crystals break down sooner. The same mesh size can arrive in either form.',
          'Coating weight and coverage. In a sintered or plated bond, retention depends on the coating. A lot that assays lower than the last one loses grit sooner, and the tool wears in a way the operator reads as poor abrasive quality.',
          'Lot-to-lot variance in all of the above. A single strong lot proves nothing. What matters is whether the tenth lot looks like the first.',
        ],
      },

      { h2: 'Specify consistency; do not hope for it' },
      {
        p: 'Consistency is not a quality a supplier either has or lacks. It is a property of what gets measured, recorded and kept — which means it can be written into a purchase specification rather than discovered afterwards.',
      },
      {
        list: [
          'Ask for the distribution, not just the grade designation. A D50 or a mesh fraction on its own does not describe the material.',
          'Ask for a certificate of analysis per lot, not per shipment and not per year.',
          'Ask whether retention samples are kept, and for how long. If a grade needs answering for in eight months, the answer depends on whether the material still exists.',
          'Ask what happens to a lot that measures outside specification. The useful answer describes a process; the unhelpful answer is that it does not happen.',
          'Ask which standard the grading is against — FEPA, ISO 6106 and ANSI B74.16 do not all draw the boundaries in the same place.',
        ],
      },
      {
        note: 'Comparing two suppliers on price per carat is only valid when both are quoting the same distribution, the same shape factor and the same coating weight. Very often they are not, and the cheaper number is cheaper for a reason that shows up later.',
      },

      { h2: 'What this looks like at EID' },
      {
        p: 'Every lot is measured rather than spot-checked, graded in our own laboratory, and shipped with a certificate of analysis. A retention sample is kept from every batch, so a grade can be answered for after the fact with the material itself and not only with a record of it. The detail is on the [quality page](/quality).',
      },
      {
        p: 'The commercial argument is narrower than it sounds. It is not that our material is better than everyone else’s. It is that the material you qualify is the material that keeps arriving, so the variable you manage is your own process rather than your supply.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'reading-a-particle-size-distribution',
    category: 'Technical',
    title: 'Reading a particle size distribution: D10, D50, D90 and span',
    dek: 'A D50 is a midpoint, not a description. What the D-values actually tell you, why two powders that share one can behave completely differently, and which number predicts finish.',
    metaTitle: 'D10, D50, D90 and Span in Diamond Powder Explained | EID',
    metaDesc:
      'What D-values tell you about a micron diamond powder, why two powders with the same D50 behave differently, and how span predicts surface finish and breakdown.',
    image: '/eid/quality/08-micron-powder-grade-comparison.png',
    alt: 'Sixteen dishes of micron diamond powder laid out in order from finest to coarsest',
    published: '2026-09-01',
    readMinutes: 7,
    body: [
      {
        p: 'Micron diamond powder is bought on a number and used on a curve. The number is usually the D50, and on its own it describes a powder about as well as an average age describes a crowd.',
      },

      { h2: 'What each D-value means' },
      {
        p: 'The D-values are percentiles of the cumulative size distribution by volume. Each one answers the same question at a different point: below what size does this fraction of the material sit?',
      },
      {
        table: {
          head: ['Value', 'What it tells you'],
          rows: [
            ['D10', 'Ten percent of the volume is finer than this. The fine tail — the fraction that packs into the bond, loads a pad, or slows stock removal.'],
            ['D50', 'The midpoint. Half above, half below. The figure most grades are named after, and the one that hides the most.'],
            ['D90', 'Ninety percent is finer than this. The coarse tail, and the practical ceiling on the finish you can hold.'],
            ['Span', '(D90 − D10) ÷ D50. A single number for how wide the distribution is, normalised so powders of different sizes can be compared.'],
          ],
        },
      },

      { h2: 'Span is the number that predicts finish' },
      {
        p: 'Two powders can share a D50 exactly and behave nothing alike, because the D50 says where the middle is and nothing about how far the material spreads either side of it. Span is the correction. A tight span means most of the material is doing the same job; a wide one means the powder contains a coarse population and a fine population that behave as two different abrasives in the same dish.',
      },
      {
        p: 'The coarse tail sets the deepest scratch. In lapping and polishing, that scratch is the finish — a small fraction of oversize particles will decide the result no matter what the other ninety-odd percent are doing. The fine tail sets the cutting rate: too much of it and the powder polishes when it was bought to remove stock.',
      },
      {
        note: 'This is why a rejected surface finish so often traces to a supply change that "kept the same D50". The specification was met and the distribution moved.',
      },

      { h2: 'Method changes the number' },
      {
        p: 'A distribution is not read directly. It is inferred from a measurement, and different techniques infer it differently — laser diffraction, electrical sensing zone and sedimentation each make their own assumptions about particle shape and each will return a slightly different curve for the same powder.',
      },
      {
        p: 'None of them is wrong. They are simply not interchangeable, which matters when a supplier quotes one number and an incoming inspection measures another. Compare like with like: same technique, same dispersion, same optical model where one applies, before concluding that a lot is out of specification.',
      },

      { h2: 'Shape is the variable the curve cannot see' },
      {
        p: 'Every one of these techniques reports an equivalent spherical diameter. Diamond is not spherical. A blocky crystal and a flat, splintery one of the same reported size will not cut the same, will not pack the same and will not break down the same, and no D-value will separate them.',
      },
      {
        p: 'That is the reason morphology is checked alongside sizing rather than assumed from it, and the reason a grade specification that names only D-values is incomplete.',
      },

      { h2: 'What to put on a purchase specification' },
      {
        list: [
          'D10, D50 and D90 with tolerances, not the D50 alone.',
          'A maximum span, or an explicit oversize limit if the coarse tail is what your process is sensitive to.',
          'The measurement technique the values refer to.',
          'A morphology requirement, in words if not in numbers.',
          'A certificate of analysis per lot carrying the actual measured values rather than the nominal grade.',
        ],
      },
      {
        p: 'EID grades micron powder against the whole curve rather than a single figure, and every lot ships with its measured values. The method is described on the [quality page](/quality); the powders themselves are under [natural diamond grit and powder](/products/natural-grit-powder) and [polycrystalline diamond powder](/products/polycrystalline-powder).',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'when-cbn-beats-diamond-ferrous-grinding',
    category: 'Materials',
    title: 'When CBN beats diamond: a field guide for ferrous grinding',
    dek: 'Diamond is the harder material and the wrong one for steel. The reason is chemistry rather than hardness, and it decides the abrasive before any other consideration does.',
    metaTitle: 'CBN vs Diamond for Grinding Steel: When to Use Which | EID',
    metaDesc:
      'Diamond reacts with iron at grinding temperatures; CBN does not. A practical guide to choosing between CBN and diamond for ferrous and non-ferrous work.',
    image: '/eid/cbn.jpg',
    alt: 'Cubic boron nitride crystals at high magnification',
    published: '2026-09-01',
    readMinutes: 6,
    body: [
      {
        p: 'Diamond is the hardest material available and it is the wrong abrasive for hardened steel. That is not a trade-off between cost and performance. It is chemistry, and it does not negotiate.',
      },

      { h2: 'Why diamond fails on ferrous material' },
      {
        p: 'Diamond is carbon. Iron has an appetite for carbon at temperature, and a grinding interface is hot — locally far hotter than the bulk workpiece. Under those conditions carbon diffuses out of the diamond and into the ferrous workpiece, and the abrasive wears chemically as well as mechanically.',
      },
      {
        p: 'The result is a wheel that loses its cutting points faster than its hardness would predict. Operators read this as poor wheel quality; it is a material mismatch. Cubic boron nitride is not carbon, so the reaction has nothing to work with. It is softer than diamond and it lasts far longer in the application, which is the entire argument for it.',
      },

      { h2: 'Where each one belongs' },
      {
        table: {
          head: ['Workpiece', 'Abrasive'],
          rows: [
            ['Hardened tool and die steels, typically above about 45 HRC', 'CBN'],
            ['Case-hardened and through-hardened gears, shafts, bearing races', 'CBN'],
            ['Grey and ductile cast iron', 'CBN, in most production grinding'],
            ['Nickel and cobalt superalloys', 'CBN, with diamond used in specific finishing cases'],
            ['Tungsten carbide and cermets', 'Diamond'],
            ['Aluminium, copper, brass and other soft non-ferrous metals', 'Diamond'],
            ['Ceramics, glass, sapphire, quartz', 'Diamond'],
            ['Carbon-fibre and glass-fibre composites', 'Diamond'],
            ['Concrete, stone, asphalt', 'Diamond'],
          ],
        },
      },
      {
        note: 'Soft or annealed steel is the awkward middle. It is ferrous, so the chemistry still applies, but it is often ground with conventional abrasives at a cost per part that neither superabrasive can beat. The question there is whether a superabrasive is warranted at all.',
      },

      { h2: 'Choosing within CBN' },
      {
        p: 'Having settled on CBN, three properties do the rest of the work.',
      },
      {
        list: [
          'Toughness and friability. A tough crystal holds its edge and suits heavy stock removal and rigid machines; a more friable crystal fractures to expose fresh cutting points and suits finishing, lighter machines and work where cutting forces must stay low.',
          'Crystal size and distribution, which set the achievable finish and the stock removal rate in the same way they do for diamond.',
          'Coating. Nickel or titanium coatings improve retention in resin and metal bonds and change the thermal behaviour of the bond interface. In a resin-bonded wheel this is usually the difference between a wheel that holds its grit and one that sheds it.',
        ],
      },
      {
        p: 'EID supplies CBN in mesh and micron sizes, coated and uncoated — the range is under [CBN](/products/cbn), and the applications it most often serves are [automotive and aerospace](/applications/automotive-aerospace) and [grinding, cutting, sawing and drilling](/applications/grinding-cutting-sawing-drilling).',
      },

      { h2: 'Signs you have the wrong abrasive' },
      {
        list: [
          'A diamond wheel on ferrous work that wears far faster than its specification suggests, with no obvious loading.',
          'Burn or thermal damage on the part at feeds the wheel should tolerate.',
          'A wheel that glazes rather than breaking down, which usually means the grade is too tough for the machine and the operation rather than the wrong material.',
          'Wheel life that varies more between lots than between operators. That is a consistency problem, not a selection problem — see [batch-to-batch consistency](/resources/blog/batch-to-batch-consistency-cost-driver).',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'what-dental-bur-makers-need-from-a-diamond-supplier',
    category: 'Industry',
    title: 'What dental bur makers actually need from a diamond supplier',
    dek: 'A sintered bur is only as repeatable as the powder that goes into it. Most inspection failures on a dental line trace back to a variable the specification never named.',
    metaTitle: 'Diamond Grit for Dental Burs: What Bur Makers Need | EID',
    metaDesc:
      'Sintering drift, poor retention and inspection failures in dental instrument production usually trace to the powder. What belongs in a diamond specification for burs.',
    image: '/eid/home/app-dental.jpg',
    alt: 'Diamond-coated dental burs',
    published: '2026-09-01',
    readMinutes: 6,
    body: [
      {
        p: 'Dental instrument production is a repeatability problem wearing the clothes of a materials problem. The diamond has been hard enough for a century. What decides whether a line runs is whether this month’s powder behaves like last month’s.',
      },

      { h2: 'The failure mode is drift, not defect' },
      {
        p: 'A bur that fails inspection rarely fails because the diamond was poor. It fails because something moved: the grit sat slightly differently in the bond, the plating took slightly differently, the cutting profile came out slightly outside the window. Individually none of those is dramatic. Together they are the reject rate.',
      },
      {
        p: 'And a dental line has less tolerance for drift than most. The instruments are small, the tolerances are tight relative to the particle size, and the product is regulated — so a change that would be absorbed elsewhere becomes a documentation exercise here.',
      },

      { h2: 'The four variables that move a dental line' },
      {
        list: [
          'Sizing distribution. On a small instrument the coarse tail is a disproportionate share of the cutting surface. A distribution that widens between lots changes the cut and the finish before the nominal grade has moved at all.',
          'Crystal shape. Blocky crystals seat and retain differently from splintery ones. Shape also determines how aggressively a new bur cuts before it settles.',
          'Coating weight and coverage. Retention in the sintered or plated matrix depends on it. A lot assaying low sheds grit early and the instrument dulls faster than the last batch, which reads on the floor as a quality problem.',
          'Cleanliness. Residues from processing affect wetting and bonding. This is the variable nobody specifies and everybody notices.',
        ],
      },

      { h2: 'Coated or uncoated' },
      {
        p: 'For sintered and plated dental instruments the usual answer is coated. A nickel coating increases the surface area the bond has to grip and reduces pull-out, which extends useful instrument life at the same grit size. The coating percentage is a specification in its own right, not a supplier default — and it should appear on the certificate of analysis with a measured value, not a nominal one.',
      },
      {
        p: 'EID coats in-house, which matters less as a capability than as a supply-chain fact: the grit and its coating come from the same order and the same record, so a retention problem has one place to be answered rather than two.',
      },

      { h2: 'What belongs on a dental specification' },
      {
        list: [
          'The size distribution with tolerances, not the grade name alone.',
          'A stated coating type and weight percentage, with the assay reported per lot.',
          'A morphology requirement.',
          'A certificate of analysis per lot with measured values.',
          'Retention samples held by the supplier, so a batch can be re-examined if an instrument is questioned months later.',
        ],
      },
      {
        note: 'If a supplier cannot produce the measured values for a lot they shipped last year, then for regulatory purposes that lot is undocumented, whatever its quality was.',
      },
      {
        p: 'The grades dental makers use most are set out on the [dental applications page](/applications/dental): natural diamond grit in mesh sizes, [metal bond](/products/metal-bond) including [coated grades](/products/metal-bond#coated), and [natural diamond micron powder](/products/natural-grit-powder#micron) for finishing.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'inside-our-qc-laboratory',
    category: 'Process',
    title: 'Inside our QC laboratory: how a batch gets approved to ship',
    dek: 'Every lot is measured rather than sampled. What a batch is checked for before it leaves, what record goes with it, and what stays behind after it has gone.',
    metaTitle: 'Inside the EID QC Laboratory: How a Batch Is Approved | EID',
    metaDesc:
      'Every lot is measured, not sampled. The checks a batch passes before it ships, the certificate of analysis that goes with it, and the retention sample that stays.',
    image: '/eid/qc-lab.jpg',
    alt: 'A technician at an optical measurement system in the EID quality laboratory',
    published: '2026-09-01',
    readMinutes: 5,
    body: [
      {
        p: 'A lot that was spot-checked is a lot the customer has to re-qualify on arrival. That is the whole reason the laboratory works the way it does: the checks below run on every production lot, not on a sample of lots.',
      },

      { h2: 'Sizing' },
      {
        p: 'Mesh grit and micron powder are different measurement problems and are handled as such. Mesh material is graded mechanically against a calibrated sieve stack, and the buying criteria are the size fraction, the shape factor and how the grit breaks down under load. Micron powder is measured by particle counting and controlled on D-values across the whole distribution rather than on a midpoint — the reasoning is in [reading a particle size distribution](/resources/blog/reading-a-particle-size-distribution).',
      },

      { h2: 'Morphology' },
      {
        p: 'Crystal shape is inspected optically against the grade specification. Two lots can size identically and still cut differently if the shape has moved, so this is checked rather than inferred from the sizing result.',
      },

      { h2: 'Cleaning' },
      {
        p: 'Advanced chemical cleaning removes processing residues before final inspection. It is the least visible of the controls and the one most often felt downstream, because residues affect wetting, bonding and retention in the customer’s process rather than in ours.',
      },

      { h2: 'Toughness, on request' },
      {
        p: 'Toughness index and thermal toughness index are run where the grade or the application requires them — work in which size and shape alone do not predict tool life. These are by request rather than universal, and the request is worth making for heavy stock removal and for anything with a sintering step.',
      },

      { h2: 'The record, and what stays behind' },
      {
        p: 'A lot that passes ships with a certificate of analysis carrying its measured values. A retention sample is kept from every batch, and traceability runs from incoming raw material through to the lot that shipped.',
      },
      {
        p: 'That last part is the one that earns its keep. A record proves what was measured; a retention sample allows the material itself to be re-examined when a question arrives eight months later and the original is long since consumed.',
      },

      { h2: 'What the certification covers' },
      {
        p: 'The quality management system is certified to ISO 9001:2015 and independently audited. The certificate is reproduced in full on the [quality page](/quality#certificate), including its registered scope — worth reading rather than taking on trust, which is the point of publishing it.',
      },
      {
        note: 'Laboratory testing is carried out to FEPA, ISO 6106 and ANSI standards. Instrument makes, models and calibration intervals are not published here; they are available on request as part of a supplier qualification pack.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: 'cvd-vs-hpht-single-crystal-diamond',
    category: 'Materials',
    title: 'CVD vs HPHT (MCD): choosing a single-crystal route',
    dek: 'Two ways to grow a single diamond crystal, two different sets of defects left behind. The growth route is a specification, not a manufacturing detail.',
    metaTitle: 'CVD vs HPHT MCD Single Crystal Diamond: How to Choose | EID',
    metaDesc:
      'Two growth routes for single-crystal diamond and two different defect profiles. How CVD and HPHT MCD differ in inclusions, orientation and dressing tool life.',
    image: '/eid/cvd-single-crystal.jpg',
    alt: 'A single-crystal CVD diamond plate',
    published: '2026-09-01',
    readMinutes: 7,
    body: [
      {
        p: 'Single-crystal diamond is specified by what it has to do — dress a wheel, turn a mirror finish, draw a wire — and the growth route decides how well it will do it. The two routes produce material that is chemically the same and behaves differently.',
      },

      { h2: 'How each is grown' },
      {
        p: 'HPHT monocrystalline diamond, usually written MCD, is grown at high pressure and high temperature from carbon dissolved in a molten metal solvent. It is the older route and the one that most closely reproduces the conditions under which natural diamond formed.',
      },
      {
        p: 'CVD material is grown from a carbon-bearing gas — typically methane in hydrogen — dissociated into a plasma at low pressure, depositing carbon layer by layer onto a substrate. The crystal is built up rather than precipitated.',
      },

      { h2: 'What each route leaves behind' },
      {
        p: 'The difference that matters in use is not the growth method but the defect population it produces.',
      },
      {
        table: {
          head: ['', 'What to expect'],
          rows: [
            ['HPHT (MCD)', 'Well-formed cubo-octahedral habit. May carry metallic inclusions from the solvent and nitrogen in the lattice, which affects colour and can act as a fracture initiator. Growth sectors differ in hardness and wear.'],
            ['CVD', 'Grown as plates or layers rather than as a natural habit, so it is supplied cut and oriented. Can be produced to very high chemical purity. Carries its own strain and dislocation structure from layer growth, and behaves differently again depending on growth conditions.'],
          ],
        },
      },
      {
        p: 'Neither profile is better in the abstract. A metallic inclusion is irrelevant in a tool that never loads that part of the crystal and fatal in one that does.',
      },

      { h2: 'Orientation is the specification that gets forgotten' },
      {
        p: 'Diamond is not equally hard in every direction, and it cleaves preferentially on certain planes. For single-point dressing, the orientation of the crystal relative to the working point determines both wear rate and the risk of catastrophic fracture rather than gradual wear.',
      },
      {
        p: 'That makes orientation a purchase specification, not a finishing detail — and it is the main reason single-crystal material is bought to a drawing rather than to a grade name.',
      },

      { h2: 'Choosing by operation' },
      {
        list: [
          'Single-point and form dressing: orientation and fracture behaviour dominate. Both routes are used; consistency between replacement tools matters more than the route itself.',
          'Precision turning of non-ferrous metals and polymers: chemical purity and edge quality dominate, which tends to favour high-purity CVD.',
          'Wire drawing dies: hardness uniformity around the aperture matters more than anything else, so growth-sector variation is the property to interrogate.',
          'Anywhere the part is ferrous: neither. Diamond and iron react at temperature — see [when CBN beats diamond](/resources/blog/when-cbn-beats-diamond-ferrous-grinding).',
        ],
      },

      { h2: 'What to specify' },
      {
        list: [
          'The operation and the machine, before any material property. A supplier who is told the job can recommend the route; one who is given only a grade name cannot.',
          'Orientation, explicitly.',
          'Dimensional tolerance and edge preparation.',
          'Inclusion and colour limits where the application is sensitive to them.',
          'Consistency requirements between deliveries, which for a dressing tool matters more than any single crystal’s specification.',
        ],
      },
      {
        note: 'EID supplies both routes. CVD material is grown to specification by a growth partner and finished in-house; we do not operate growth reactors, and any supplier claiming otherwise should be asked to show you the plant.',
      },
      {
        p: 'The range is set out under [single crystal diamond (CVD & MCD)](/products/single-crystal), with polycrystalline alternatives under [polycrystalline diamond](/products/polycrystalline-diamond) where a defect-controlled, repeatable edge is worth more than a single crystal’s hardness. The application these most often serve is [tool and die](/applications/tool-and-die).',
      },
    ],
  },
]

export const getPost = (slug: string) => posts.find((p) => p.slug === slug)
