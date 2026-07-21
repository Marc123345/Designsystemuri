/**
 * A hub links across to the exact product page, and where useful the exact
 * section anchor, that serves it. Labels are explicit rather than derived from
 * the product name, because a hub often routes to a section ("Coated metal bond
 * diamond") rather than to the page as a whole.
 */
export type ApplicationProduct = { label: string; href: string; note: string };

export type Application = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  cardDesc: string;
  intro: string[];
  outcome: { title: string; body: string }; // the outcome-led block that makes a hub more than a product list
  productsTitle: string;
  products: ApplicationProduct[];
  why: { title: string; body: string };
  whyCta?: string; // deck's "See how our (micron) QC works" link after WHY
  cta: string;
  ctaDesc: string; // the deck gives each hub its own closing ask
  guides?: string[];
  relatedHubs?: string[]; // application slugs
};

// The six application hubs (Uri's locked applications axis). Copy is set verbatim
// from WEBSITE COPY · VOL. 03 · REBUILD, pages 13–18; card one-liners come from
// page 01 SECTION 6; meta from each hub's SEO METADATA block.
//
// Vol 03 conventions carried through here:
//  - every "Where X is used" heading is now "Typical Applications" (product pages);
//  - the term "QC-upgraded" is gone, replaced by "processed and graded to your
//    specification";
//  - quality claims are softened: particle size distribution and morphology on
//    every lot, with crystal strength and coating coverage only where the grade or
//    application requires it. Shape factor is attributed to mesh grades only.
export const applications: Application[] = [
  {
    slug: "dental",
    name: "Dental",
    h1: "Diamond for Dental Tool Manufacturers",
    metaTitle: "Diamond for Dental Tool Manufacturers | EID",
    metaDesc:
      "Natural diamond grit, metal bond, and fine powders for dental bur, rotary instrument, and disc makers. Consistent, sinterable grades from an in-house QC manufacturer.",
    eyebrow: "Application · Dental",
    cardDesc:
      "Natural grit and metal bond for sintered burs, rotary instruments, and diamond discs.",
    intro: [
      "Diamond for dental tool manufacturers.",
      "EID supplies the diamond that goes into dental burs, rotary instruments, diamond discs, and precision dental tools.",
      "For a dental instrument line, the material has to sinter and cut identically batch after batch, because a bur that performs differently from the last one fails inspection. That repeatability is why dental makers qualify EID and stay.",
    ],
    outcome: {
      title: "What consistent diamond does for a dental line",
      body: "A sintered bur is only as repeatable as the powder that goes into it. When sizing, crystal shape, or coating weight vary between lots, sintering drifts, retention changes, and burs that should be identical are not. That shows up as rejected product and warranty risk downstream. EID grades and inspects every lot for those variables, so your sintering process sees the same input each run. The payoff is fewer rejects, predictable instrument life, and a diamond supply you qualify once instead of re-checking every delivery.",
    },
    productsTitle: "The grades dental makers use",
    // Per Uri (19/7): natural (mesh) grit is the single most-used dental material,
    // so it leads the list, ahead of metal bond, coated metal bond, and micron powder.
    products: [
      {
        label: "Natural Diamond Grit, mesh",
        href: "/products/natural-grit-powder#grit",
        note: "The single most-used dental material, graded mesh grit for sintered burs and rotary instruments, crushed and graded in-house for tight, repeatable sizing.",
      },
      {
        label: "Metal Bond Diamond",
        href: "/products/metal-bond",
        note: "Saw and wheel grades for sintered dental burs and rotary instruments, with controlled crystal shape and size distribution.",
      },
      {
        label: "Coated metal bond diamond",
        href: "/products/metal-bond#coated",
        note: "Nickel-coated grades that improve retention in the sintered matrix, reducing pull-out and extending instrument life. Coated in-house, so grit and coating come from one order.",
      },
      {
        label: "Natural Diamond Micron Powder",
        href: "/products/natural-grit-powder#micron",
        note: "For fine finishing and polishing operations in dental instrument production.",
      },
    ],
    why: {
      title: "Why dental manufacturers choose EID",
      body: "Consistency, breadth, and a real technical reply. In-house grading and QC on every lot give the repeatability a dental line depends on. In-house coating means you do not manage a second vendor for retention. When you specify a grade for a new instrument, you talk to someone who works with the material, not a catalogue. ISO 9001 certified, with a certificate of analysis per lot.",
    },
    cta: "Request a Quote for Dental Diamond",
    ctaDesc:
      "Tell us the instrument, the grade, and the volume, and a real person replies within one business day.",
  },
  {
    slug: "semiconductor-electronics",
    name: "Semiconductor & Advanced Electronics",
    h1: "Diamond for Semiconductor & Advanced Electronics",
    metaTitle: "Diamond Powder for Semiconductor & Electronics | EID",
    metaDesc:
      "Fine and polycrystalline diamond micron powder for wafer dicing, lapping, thinning, and polishing in semiconductor and advanced electronics manufacturing.",
    eyebrow: "Application · Semiconductor & Advanced Electronics",
    cardDesc:
      "Fine micron and polycrystalline powders for dicing, lapping, and wafer polishing.",
    intro: [
      "Diamond for semiconductor and advanced electronics manufacturing.",
      "Semiconductor and electronics processes need the finest, most consistent diamond powder available, for dicing wafers, lapping and thinning substrates, and polishing to the finishes modern device fabrication demands. EID supplies monocrystalline and polycrystalline micron powders, plus MCD scribing tools and fine natural diamond, graded and verified for a tight, repeatable particle size distribution.",
      "The tolerance is unforgiving, and a single outlier particle is a scrapped wafer. Control at the top of the distribution is exactly what our QC is for.",
    ],
    outcome: {
      title: "Why size-distribution control decides yield",
      body: "At wafer scale, the cost of a defect is measured in die, not parts. An oversized particle in a lapping or polishing slurry can scratch a substrate and take out hundreds of devices in one pass. The defence is a powder with a tightly controlled D50, a narrow span, and no stray outliers, order after order. EID measures particle size distribution on every batch and grades to a controlled D50 and span, so the powder you qualify is the powder you receive. For a process where a single particle sets the failure mode, that is the specification that matters most.",
    },
    productsTitle: "The grades electronics makers use",
    // Deck bullet four combines CVD Single Crystal and MCD in one line ("for
    // scribing, cleaving, and precision semiconductor tooling"). Kept as two
    // entries here so each anchor gets its own link; the note is the shared one.
    products: [
      {
        label: "Polycrystalline Diamond Micron Powder",
        href: "/products/polycrystalline-powder",
        note: "Sub-micron and fine grades for final polishing of silicon, sapphire, SiC, and GaN wafers, where the rounded, no-cleavage particle gives the lowest, most uniform surface roughness.",
      },
      {
        label: "Natural & Synthetic Micron Powder",
        href: "/products/natural-grit-powder#micron",
        note: "For lapping and intermediate polishing of electronic substrates.",
      },
      {
        label: "Resin Bond Diamond",
        href: "/products/resin-bond",
        note: "For the fixed-abrasive tools used in fine grinding and thinning.",
      },
      {
        label: "CVD Single Crystal",
        href: "/products/single-crystal#cvd",
        note: "For scribing, cleaving, and precision semiconductor tooling.",
      },
      {
        label: "MCD",
        href: "/products/single-crystal#mcd",
        note: "For scribing, cleaving, and precision semiconductor tooling.",
      },
    ],
    why: {
      title: "Why electronics manufacturers choose EID",
      body: "Tight distribution, low outlier risk, and documentation you can put in a qualification file. Every batch is measured for particle size distribution with controlled D50 and minimal outliers, ISO 9001 certified, with a certificate of analysis per lot. When your process qualification depends on the input staying constant, in-house grading and QC are what let you lock the material in.",
    },
    whyCta: "See how our micron QC works",
    cta: "Request a Quote for Electronics-Grade Diamond",
    ctaDesc:
      "Tell us the substrate, the process step, and the grade or finish you need, and a real person replies within one business day.",
    guides: ["How size distribution affects tool performance"],
  },
  {
    slug: "automotive-aerospace",
    name: "Automotive & Aerospace",
    h1: "CBN & Diamond for Automotive & Aerospace",
    metaTitle: "CBN & Diamond for Automotive & Aerospace | EID",
    metaDesc:
      "CBN for hardened steel grinding, PCBN for hard-turning, PCD for aluminium and composites. Superabrasives for automotive and aerospace tool makers.",
    eyebrow: "Application · Automotive & Aerospace",
    cardDesc:
      "CBN and PCBN for hardened steel grinding and hard-turning; PCD for aluminium and composites.",
    intro: [
      "Superabrasives for automotive and aerospace tool makers.",
      "Automotive and aerospace production runs on high-volume machining of hard materials: hardened steel gears and shafts, cast iron blocks, aluminium structures, and carbon-fibre composites. The tools that cut and grind these parts rely on CBN and diamond superabrasives, and EID supplies the grades behind them.",
      "CBN powder for vitrified and resin-bonded grinding wheels, PCBN blanks for hard-turning inserts, PCD blanks for aluminium and composite machining, and CVD dressing logs to keep the wheels true. One supplier covers the ferrous and non-ferrous sides of the same line.",
    ],
    // Rewritten to Uri's process-parameter framing (19/7, 12:54 PM).
    outcome: {
      title: "Why batch consistency protects the line",
      body: "In high-volume grinding, abrasive consistency is a process parameter. Variations in crystal strength, particle size distribution, or grade behaviour change wheel wear, cutting action, and dressing frequency. EID controls these variables through in-house grading and QC testing, providing repeatable superabrasive performance from lot to lot. The same logic holds for PCBN and PCD inserts feeding a hard-turning or milling cell: the grade that arrives matches the grade you qualified.",
    },
    productsTitle: "The grades auto and aero makers use",
    products: [
      {
        label: "CBN Powder",
        href: "/products/cbn",
        note: "Grinding hardened steel crankshafts, camshafts, gears, and bearings, and superalloy and turbine-component grinding in aerospace.",
      },
      {
        label: "PCBN Discs & Blanks",
        href: "/products/cbn#pcbn",
        note: "Hard-turning and finish-machining inserts on hardened powertrain components and cast iron.",
      },
      {
        label: "PCD Discs & Blanks",
        href: "/products/polycrystalline-diamond#pcd-blanks",
        note: "Machining aluminium engine and structural parts and carbon-fibre aerospace components.",
      },
      {
        label: "CVD Polycrystalline Dressing Logs",
        href: "/products/polycrystalline-diamond#dressing-logs",
        note: "Truing and dressing the grinding wheels on automotive lines.",
      },
    ],
    why: {
      title: "Why automotive and aerospace tool makers choose EID",
      body: "Consistency at volume, backed by QC on every lot. A CBN lot that matches the last one keeps a grinding line running without a re-set, and in-house grading and testing are how EID delivers it. Covering both the ferrous grinding materials and the non-ferrous cutting materials from one supplier means fewer vendors qualifying into a process that does not tolerate surprises. ISO 9001 certified, with a certificate of analysis per lot.",
    },
    whyCta: "See how our QC works",
    cta: "Request a Quote for Automotive & Aerospace",
    ctaDesc:
      "Tell us the operation, the material you are cutting or grinding, and the grade, and a real person replies within one business day.",
    guides: ["Diamond vs CBN"],
  },
  {
    slug: "tool-and-die",
    name: "Tool & Die",
    h1: "Diamond & CBN for Tool & Die Makers",
    metaTitle: "Diamond & CBN for Tool & Die Makers | EID",
    metaDesc:
      "Single crystal, MCD, PCD and PCBN blanks, and natural tool stones for cutting-tool, single-point, and dressing-tool makers. Made-to-spec superabrasives.",
    eyebrow: "Application · Tool & Die",
    cardDesc:
      "Single crystal, MCD, and PCD/PCBN blanks for cutting, dressing, and precision tooling.",
    intro: [
      "Diamond and CBN for tool and die makers.",
      "Cutting-tool, single-point, and dressing-tool makers need superabrasives that hold a defined edge, tool after tool. EID supplies the single crystal, monocrystalline, and finished-blank materials that go into precision tooling: CVD single crystal grown to your orientation, HPHT MCD for reproducible single-point edges, PCD and PCBN blanks for cutting inserts, and natural tool stones for dressing.",
      "Whether you need one crystal to an exact spec or a repeatable grade across a run of tools, the material comes from one supplier with QC on every batch.",
    ],
    outcome: {
      title: "Reproducible edges, or one crystal to an exact spec",
      body: "Tool and die work pulls in two directions. Sometimes the requirement is reproducibility: the same defect-controlled edge across hundreds of identical single-point or cutting tools, so every part comes off the same. Sometimes it is precision to a single specification: a CVD crystal grown to a set orientation for an optical or watch-component tool where one geometry has to be exact. EID serves both. MCD gives the reproducible HPHT edge at production scale. CVD single crystal is grown to your exact orientation and face through our growth partnership, then finished and inspected in-house. The right answer depends on your tool, which is where the conversation with our technical team starts.",
    },
    productsTitle: "The materials tool and die makers use",
    products: [
      {
        label: "CVD Single Crystal Diamond",
        href: "/products/single-crystal#cvd",
        note: "Grown to your orientation for single-point turning, fly-cutting, and precision dressing tools.",
      },
      {
        label: "MCD (Monocrystalline Diamond)",
        href: "/products/single-crystal#mcd",
        note: "HPHT single crystal with reproducible edge geometry for single-point turning and dressing.",
      },
      {
        label: "PCD Discs & Blanks",
        href: "/products/polycrystalline-diamond#pcd-blanks",
        note: "Non-ferrous and composite cutting-tool inserts.",
      },
      {
        label: "PCBN Discs & Blanks",
        href: "/products/cbn#pcbn",
        note: "Hardened-ferrous hard-turning inserts.",
      },
      {
        label: "Natural Tool Stones",
        href: "/products/tool-stones",
        note: "Natural single-point and dressing stones, selected in-house.",
      },
    ],
    why: {
      title: "Why tool and die makers choose EID",
      body: "Made-to-spec capability plus a full material set from one supplier. For the demanding precision jobs, CVD single crystal is grown to your exact orientation and inspected here for clarity and orientation accuracy before it ships. For production tooling, MCD and finished blanks give a repeatable grade order to order. Because EID covers single crystal, MCD, PCD, PCBN, and natural stone, one supplier can match the material to the tool rather than pushing you toward the one line they carry. ISO 9001 certified.",
    },
    // EDITORIAL NOTE (deck page 16, not page copy): this is the hub the
    // Matzdorf-type optics and precision buyer lands on, since there is no
    // dedicated Optics hub in the locked six. Keep the made-to-spec CVD and MCD
    // story strong. If Uri adds an Optics & Precision hub later, much of this
    // precision content moves or duplicates there. Confirm before the per-page build.
    cta: "Request a Quote for Tool & Die",
    ctaDesc:
      "Tell us the tool, the material it machines, and the tolerance, and a real person replies within one business day.",
    guides: ["CVD, HPHT (MCD), and natural diamond compared"],
  },
  {
    slug: "grinding-cutting-sawing-drilling",
    name: "Grinding, Cutting, Sawing & Drilling",
    h1: "Diamond & CBN for Grinding, Cutting, Sawing & Drilling",
    metaTitle: "Diamond & CBN for Grinding, Cutting, Sawing & Drilling | EID",
    metaDesc:
      "Natural grit, metal bond, CBN, and resin bond diamond for saw segments, grinding wheels, drill bits, and cutting tools. Consistent grades, in-house QC.",
    eyebrow: "Application · Grinding, Cutting, Sawing & Drilling",
    cardDesc:
      "Natural grit, metal bond, and CBN for segments, wheels, and drill bits.",
    intro: [
      "Diamond and CBN for grinding, cutting, sawing, and drilling.",
      "Saw segments, grinding wheels, core drills, and cutting tools consume more diamond than any other application, and their performance depends on predictable crystal strength and size distribution. EID supplies the grit, powder, and coated abrasives that go into them: natural grit and metal bond for aggressive cutting, CBN for ferrous grinding, and resin bond for finer work.",
      "One supplier covers saw grade, wheel grade, and finishing grades across diamond and CBN, which simplifies procurement for a maker whose range spans quarry saws to precision wheels.",
    ],
    outcome: {
      title: "Predictable tools, and one supplier across the range",
      body: "A saw segment or a grinding wheel is only as consistent as the diamond in it. When crystal strength or size distribution drifts between lots, tool life and cutting speed drift with it, and a maker producing a range of tools ends up managing that variation across every product line at once. EID grades and inspects every lot, so each grade performs the same order to order, and covers saw grade, wheel grade, coated grit, and finishing powder from one relationship. For a maker running a broad catalogue, that combination of consistency and breadth takes cost and risk out of sourcing.",
    },
    productsTitle: "The grades these makers use",
    products: [
      {
        label: "Metal Bond Diamond",
        href: "/products/metal-bond",
        note: "Saw grade for segments, blades, and wire beads; wheel grade for grinding cups and profile wheels. Coated in-house for retention in sintered segments.",
      },
      {
        label: "Natural Diamond Grit",
        href: "/products/natural-grit-powder#grit",
        note: "Diamond segments and dressing tools.",
      },
      {
        label: "CBN Powder",
        href: "/products/cbn",
        note: "Grinding wheels working hardened and ferrous steels.",
      },
      {
        label: "Resin Bond Diamond",
        href: "/products/resin-bond",
        note: "Flexible abrasive pads and polishing sheets for glass and stone.",
      },
      {
        label: "CVD Polycrystalline Dressing Logs",
        href: "/products/polycrystalline-diamond#dressing-logs",
        note: "Truing and dressing the wheels these processes rely on.",
      },
    ],
    // PENDING URI'S GO-AHEAD (deck page 17): five optional keyword sub-sections
    // could be added to this hub to capture those terms without new top-level
    // pages — Stone & Construction, Composite Materials, Ceramics & Advanced
    // Materials, Electroplated Tools, Mining & Geological Tools. Each would be a
    // short block with an internal link to the relevant product. No copy exists
    // for them yet; do not invent it. Add here once Uri clears the list.
    why: {
      title: "Why grinding and cutting tool makers choose EID",
      body: "Volume, consistency, and range from one supplier. High-volume abrasive tool production depends on predictable crystal strength and size distribution, and in-house grading plus QC on every lot deliver it. In-house coating improves retention in sintered segments without a second vendor. And covering saw grade, wheel grade, and finishing grades from one relationship simplifies procurement across a broad product line. ISO 9001 certified, with a certificate of analysis per lot.",
    },
    // EDITORIAL NOTE (deck page 17, not page copy): this hub carries the KGS-type
    // stone, glass, and flexible-abrasive buyer, since there is no dedicated
    // Stone, Glass & Construction hub in the locked six. The stone, glass, and
    // construction language above is what keeps that buyer served — do not strip it.
    cta: "Request a Quote",
    ctaDesc:
      "Tell us the tool, the material it works, and the grade, and a real person replies within one business day.",
    guides: ["Metal bond vs resin bond vs vitrified", "Diamond vs CBN"],
  },
  {
    slug: "polishing-lapping",
    name: "Polishing & Lapping",
    h1: "Diamond for Polishing & Lapping",
    metaTitle: "Diamond Powder for Polishing & Lapping | EID",
    metaDesc:
      "Micron and polycrystalline diamond powder for fine and optical polishing and lapping. Tight size distribution, sub-nanometer finishes, in-house QC.",
    eyebrow: "Application · Polishing & Lapping",
    cardDesc: "Micron and polycrystalline powders for fine and optical finishing.",
    intro: [
      "Diamond for polishing and lapping.",
      "When the deliverable is the surface, the powder has to be consistent to the sub-micron. EID supplies monocrystalline and polycrystalline diamond micron powder for lapping and polishing across optics, precision components, and technical ceramics, graded in-house to a tight, repeatable particle size distribution and available as dry powder, suspension, or paste.",
      "The right grade depends on the finish and the stage, from intermediate lapping down to a final sub-nanometer polish. Tell us the material and the Ra and we will specify the powder and format.",
    ],
    outcome: {
      title: "Why consistency decides the finish",
      body: "In fine finishing, the surface is the specification, and the powder determines whether you hit it. A distribution that drifts between batches, or carries the occasional oversized particle, shows up as scratches, uneven Ra, and re-work. At the sub-nanometer end, one stray particle can cost the whole part. EID measures particle size distribution on every batch and grades to a controlled D50 and span, so the powder polishes the same way each order. For a process where the finish is the product, that repeatability is what keeps you off the re-work bench.",
    },
    productsTitle: "The grades finishers use, by stage",
    products: [
      {
        label: "Natural & Synthetic Micron Powder",
        href: "/products/natural-grit-powder#micron",
        note: "Lapping and intermediate polishing of hard, brittle materials.",
      },
      {
        label: "Polycrystalline Diamond Micron Powder",
        href: "/products/polycrystalline-powder",
        note: "The final, most demanding polish, where the rounded, no-cleavage particle gives the lowest and most uniform Ra.",
      },
      {
        label: "Resin Bond Diamond",
        href: "/products/resin-bond",
        note: "Fixed-abrasive tools for fine grinding and honing ahead of polishing.",
      },
    ],
    why: {
      title: "Why finishers choose EID",
      body: "Tight distribution, a grade for every stage, and QC you can document. Every batch is measured for particle size distribution with controlled D50 and span, ISO 9001 certified, with a certificate of analysis per lot. Because EID grades both the lapping powders and the final polycrystalline polish in-house, one supplier covers your whole finishing sequence, and the recommendation follows the finish you need rather than the single grade a vendor happens to stock.",
    },
    whyCta: "See how our micron QC works",
    cta: "Request a Quote or Sample",
    ctaDesc:
      "Tell us the material, the stage, and the finish you are targeting, and a real person replies within one business day.",
    guides: ["How size distribution affects tool performance"],
    relatedHubs: ["semiconductor-electronics"],
  },
];

export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);
