export type Spec = { label: string; value: string };
export type Callout = { title: string; body: string | string[] };
export type CrossGroup = { title: string; links: { label: string; href: string }[] };

/**
 * A section is a former standalone product page, now folded into its parent.
 * Each keeps its own H2, anchor, spec table, applications list, and datasheet,
 * so the search intent that used to live on a separate URL still has a home.
 */
export type ProductSection = {
  id: string; // anchor, e.g. "grit" -> /products/natural-grit-powder#grit
  label: string; // short label for the on-page jump nav
  title: string; // H2
  /**
   * Paragraphs. Inline links use [label](href) — the deck places specific
   * in-prose links (PCBN <-> PCD, the single-crystal guide, the on-page jump
   * anchors) that carry internal-link equity between the merged pages, so they
   * have to survive as real links rather than flatten to plain text.
   */
  intro: string[];
  callouts?: Callout[];
  applicationsTitle?: string;
  applications?: string[];
  applicationsNote?: string; // the deck's closing line after the bullet list
  specsTitle?: string;
  specs?: Spec[];
  specsNote?: string; // e.g. "Need a size or grade not listed? Ask our technical team."
  enquiryCta?: { label: string; href: string }; // e.g. "Enquire about rotary diamonds"
  datasheet?: string; // download label
};

export type Product = {
  slug: string;
  name: string; // short label for nav / cards
  family: string; // the locked group this page IS (one page per group)
  h1: string;
  metaTitle: string;
  metaDesc: string;
  eyebrow: string;
  cardDesc: string; // one-liner for grids and the mega-menu
  intro: string[]; // hero/intro paragraphs
  sections: ProductSection[]; // one or more; single-section products render flat
  quality?: string; // custom QC paragraph
  qualityCta?: string; // deck's "See how our (mesh and micron) QC works" label
  overviewDesc?: string; // longer blurb for the /products overview list
  cta: string;
  crossLinks?: CrossGroup[]; // anchor-bearing product/related links from the copy deck
  crossApplications: string[]; // application hub slugs (names resolve per locale)
  guides?: string[]; // related guide titles (link to /resources)
};

// The eight locked product groups. One group = one page. Mesh and micron are
// forms within a product, not separate pages. Coatings are attribute sections
// on the bond and CBN pages, never a standalone page or a nav entry.
export const PRODUCT_FAMILIES = [
  "Natural Diamond Grit & Powder",
  "Metal Bond Diamond",
  "Resin Bond Diamond",
  "CBN",
  "Single Crystal Diamond (CVD & MCD)",
  "Polycrystalline Diamond (CVD & PCD)",
  "Natural Tool Stones",
  "Polycrystalline Diamond Powder",
] as const;

// Mega-menu reading order: 2-2-2-2 grid, four columns of two pages each.
export const MEGA_MENU_COLUMNS: string[][] = [
  ["natural-grit-powder", "metal-bond"],
  ["cbn", "resin-bond"],
  ["single-crystal", "polycrystalline-diamond"],
  ["tool-stones", "polycrystalline-powder"],
];

export const products: Product[] = [
  /* ====================== 1 · NATURAL DIAMOND GRIT & POWDER ================= */
  {
    slug: "natural-grit-powder",
    name: "Natural Diamond Grit & Powder",
    family: "Natural Diamond Grit & Powder",
    h1: "Natural Diamond Grit & Powder",
    metaTitle: "Diamond Grit & Micron Powder | Industrial Abrasive | EID",
    metaDesc:
      "Natural diamond grit in graded mesh sizes and micron powder for grinding, sawing, dressing, lapping, and polishing. Crushed and graded in-house, ISO 9001.",
    eyebrow: "Products · Group 1",
    cardDesc:
      "Natural mesh, micron powder, and rotary diamonds, crushed, sorted, and graded in-house for grinding, lapping, dressing, and drilling.",
    overviewDesc:
      "Crushed and graded in-house. Graded mesh grit for grinding, sawing, and dressing; fine micron powder for lapping and polishing; natural rotary diamonds for drilling and truing.",
    intro: [
      "Crushed, graded, and tested in our own factory.",
      "EID manufactures natural diamond grit and fine micron powder in-house. By controlling the entire crushing, shaping, and grading process, we hold a tight, repeatable size distribution on every order.",
      "This is the one page in the range that carries the fully in-house claim without qualification. EID makes this material from raw, start to finish. Standard grades ship from stock, and custom sizes are made to order. Jump to the [grit specs](#grit) or the [micron powder specs](#micron), or tell us the tool and the material and we will specify the grade.",
    ],
    sections: [
      {
        id: "grit",
        label: "Diamond Grit (Mesh)",
        title: "Natural diamond grit, in graded mesh sizes.",
        intro: [
          "EID manufactures natural diamond grit in standard and custom mesh sizes for grinding, sawing, dressing, and lapping. The raw material is crushed, shaped, and graded in-house, then QC-tested, so the size distribution stays tight and repeatable order to order.",
        ],
        applicationsTitle: "Where natural diamond grit is used",
        applications: [
          "Grinding wheels and segments for stone, glass, and construction.",
          "Saw blades and wire saws for stone and concrete.",
          "Dressing tools for truing grinding wheels.",
          "Lapping and rough-polishing of hard, brittle materials.",
        ],
        applicationsNote:
          "Note: for hardened or ferrous steels, use [CBN](/products/cbn) instead.",
        specsTitle: "Grit specifications",
        specs: [
          { label: "Mesh size range", value: "[confirm with Uri: FEPA and US mesh range, coarse to fine]" },
          { label: "Micron equivalent", value: "[confirm: micron range for the mesh grades]" },
          { label: "Crystal shape", value: "Blocky, semi-blocky, irregular [confirm available shapes]" },
          { label: "Friability / strength", value: "[confirm grade descriptors]" },
          { label: "Typical grades", value: "[confirm EID grade naming, if branded]" },
        ],
        specsNote:
          "Need a size or grade not listed? [Ask our technical team](/contact) and we will confirm availability and lead time.",
        datasheet: "Natural Grit datasheet",
      },
      {
        id: "rotary",
        label: "Rotary Diamonds",
        title: "Natural rotary diamonds.",
        intro: [
          "We supply selected natural rotary diamonds for dressing and truing. Provide your wheel and operation details, and we will match the appropriate stone.",
        ],
        enquiryCta: { label: "Enquire about rotary diamonds", href: "/contact" },
      },
      {
        id: "micron",
        label: "Micron Powder",
        title: "Natural diamond micron powder, graded in-house for lapping and polishing.",
        intro: [
          "EID supplies natural diamond micron powder for lapping, polishing, and fine surface finishing. Every batch is graded in-house to a tight particle size distribution for predictable finishes.",
          "Available from coarse to sub-micron as dry powder, suspension, or paste. Tell us your material and finish targets; we will match the grade and format.",
        ],
        applicationsTitle: "Where diamond micron powder is used",
        applications: [
          "Lapping of hard materials: ceramics, carbide, glass, and sapphire.",
          "Polishing optical components to sub-nanometer finishes.",
          "Superfinishing of PCD and PCBN cutting-tool inserts.",
          "Fine finishing of semiconductor and electronic substrates.",
        ],
        specsTitle: "Micron powder specifications",
        specs: [
          { label: "Size range", value: "[confirm with Uri: typical 0.25–100 µm, state the real range]" },
          { label: "Crystal type", value: "Monocrystalline and polycrystalline [confirm]" },
          { label: "Size distribution", value: "Controlled D50 and span [confirm D-values and tolerance]" },
          { label: "Measurement method", value: "[confirm with Uri: laser diffraction / Coulter counter]" },
          { label: "Formats", value: "Dry powder, water or oil suspension, paste" },
          { label: "Packaging", value: "Syringes, jars, bottles, or custom [confirm]" },
        ],
        specsNote: "Need a size or format not listed? [Ask our technical team](/contact).",
        datasheet: "Micron Powder datasheet",
      },
    ],
    quality:
      "Every production run is tested in our QC laboratory for mesh sizing, shape, strength, and micron particle size distribution. The ISO 9001 certified system ensures full traceability and includes a certificate of analysis for every lot. QC proves the consistency our grading builds.",
    qualityCta: "See how our mesh and micron QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "Within the range",
        links: [
          { label: "Metal Bond Diamond", href: "/products/metal-bond" },
          { label: "Natural Tool Stones", href: "/products/tool-stones" },
        ],
      },
      {
        title: "Step up in finish",
        links: [
          { label: "Polycrystalline Diamond Powder", href: "/products/polycrystalline-powder" },
        ],
      },
    ],
    crossApplications: [
      "grinding-cutting-sawing-drilling",
      "polishing-lapping",
      "semiconductor-electronics",
      "dental",
    ],
    guides: [
      "Diamond grit and micron size chart",
      "How size distribution affects tool performance",
      "Diamond vs CBN",
    ],
  },

  /* ============================ 2 · METAL BOND ============================= */
  {
    slug: "metal-bond",
    name: "Metal Bond Diamond",
    family: "Metal Bond Diamond",
    h1: "Metal Bond Diamond Powder",
    metaTitle: "Metal Bond Diamond Powder | Saw & Wheel Grades, Mesh & Micron",
    metaDesc:
      "Metal bond synthetic diamond in saw and wheel grades, coated and QC-upgraded for sintered tools. Mesh and micron, finished to your spec.",
    eyebrow: "Products · Group 2",
    cardDesc:
      "Saw and wheel grades for sintered, brazed, and electroplated tools, with in-house coating options.",
    overviewDesc:
      "Mesh and micron grades for diamond saws, grinding wheels, and sintered, brazed, and electroplated tools, with in-house coating options.",
    intro: [
      "Metal bond diamond powder, QC-upgraded for industrial consistency.",
      "Essential for high-pressure tools like saw segments and drill bits, EID's metal bond range is re-processed and QC-upgraded in-house. That gives tool makers production-ready consistency instead of a grade they have to re-qualify every order.",
    ],
    sections: [
      {
        id: "metal-bond",
        label: "Metal Bond Diamond",
        title: "How metal bond works.",
        intro: [
          "Metal bond holds diamond mechanically in a hard sintered matrix. As the bond wears, it exposes fresh diamond, making it ideal for aggressive cutting of stone, glass, and ceramics. Performance depends on matching crystal strength and morphology to the bond, which is where precise grade selection and in-house coating are critical.",
        ],
        applicationsTitle: "Where metal bond diamond is used",
        applications: [
          "Stone & Concrete — Saw blades, wire saw beads, and grinding cups.",
          "Construction & Mining — Core drill bits and segments.",
          "Precision Manufacturing — Electroplated and sintered tools for glass and ceramics.",
          "Dental — Sintered burs and rotary instruments.",
        ],
        specsTitle: "Specifications",
        specs: [
          { label: "Forms", value: "Mesh and micron" },
          { label: "Mesh size range", value: "[confirm with Uri]" },
          { label: "Micron size range", value: "[confirm]" },
          {
            label: "Grades",
            value: "Saw grade (high impact strength), wheel grade (controlled friability) [confirm]",
          },
          { label: "Crystal shape", value: "Blocky, semi-blocky [confirm]" },
          { label: "Coating options", value: "Electroless nickel, PVD metallic, copper [confirm available set]" },
          { label: "Packaging", value: "[confirm]" },
        ],
        datasheet: "Metal Bond datasheet",
      },
      {
        id: "coated",
        label: "Coated",
        title: "Coated metal bond diamond.",
        intro: [
          "In-house coating provides a metallurgical bond between the diamond and the metal matrix, preventing premature pull-out under load. By sourcing grit and coating from EID, you manage one relationship and receive a finished, production-ready abrasive.",
          "Tell us your bond and we will recommend the coating and weight. [Ask our technical team](/contact).",
        ],
      },
    ],
    quality:
      "ISO 9001 certified and fully traceable. We hold batch-to-batch consistency in crystal strength and coating weight, so your sintering results stay repeatable across every production run.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "Within the range",
        links: [
          { label: "Resin Bond Diamond (finer, friable work)", href: "/products/resin-bond" },
          { label: "Natural Diamond Grit & Powder", href: "/products/natural-grit-powder" },
        ],
      },
    ],
    crossApplications: ["dental", "grinding-cutting-sawing-drilling", "automotive-aerospace"],
    guides: ["Metal bond vs resin bond vs vitrified"],
  },

  /* ============================ 3 · RESIN BOND ============================= */
  {
    slug: "resin-bond",
    name: "Resin Bond Diamond",
    family: "Resin Bond Diamond",
    h1: "Resin Bond Diamond Powder",
    metaTitle: "Resin Bond Diamond Powder | Friable Mesh & Micron | EID",
    metaDesc:
      "Friable, multi-crystalline resin bond diamond in mesh and micron for fine grinding and polishing. Consistent, QC-controlled grades, coatings available.",
    eyebrow: "Products · Group 3",
    cardDesc:
      "Friable, multi-crystalline grades for fine grinding and polishing, with in-house coating options.",
    overviewDesc:
      "Friable, multi-crystalline grades in mesh and micron for fine grinding and polishing, coatings available.",
    intro: [
      "Resin bond diamond powder: friable grades for precision finishing.",
      "Resin bond diamond is engineered for controlled friability, exposing fresh cutting edges for superior fine grinding.",
      "EID supplies mesh and micron grades, quality-controlled in-house to your exact finish specifications.",
    ],
    sections: [
      {
        id: "resin-bond",
        label: "Resin Bond Diamond",
        title: "Why friability matters in a resin bond.",
        intro: [
          "Resin bonds release diamond more readily than metal bonds. Paired with multi-crystalline diamond, the crystal fractures in a governed way to present new cutting points rather than dulling.",
          "This protects the finish on carbide, ceramic, and glass by keeping tools sharp and cutting cool. Matching friability to the operation is the whole game.",
        ],
        applicationsTitle: "Where resin bond diamond is used",
        applications: [
          "Resin-bonded grinding wheels for carbide, ceramic, and glass.",
          "Polishing and fine finishing of precision components.",
          "Flexible abrasive products such as sheets, belts, and pads for glass and stone.",
          "Lapping and honing of technical ceramics and other hard, brittle materials.",
        ],
        applicationsNote:
          "Wherever the last few microns and the surface finish are the point, this is the bond family that gets there.",
        specsTitle: "Specifications",
        specs: [
          { label: "Forms", value: "Mesh and micron" },
          { label: "Mesh size range", value: "[confirm with Uri]" },
          { label: "Micron size range", value: "[confirm]" },
          {
            label: "Crystal type",
            value: "Monocrystalline (blocky to irregular), polycrystalline (self-sharpening) [confirm]",
          },
          { label: "Friability grades", value: "[confirm EID grade descriptors]" },
          { label: "Coating options", value: "Nickel, copper [confirm available set]" },
          { label: "Packaging", value: "[confirm]" },
        ],
        datasheet: "Resin Bond datasheet",
      },
      {
        id: "coated",
        label: "Coated",
        title: "Coated resin bond diamond.",
        intro: [
          "In a resin system, the coating does two jobs. It improves how the resin grips the diamond, so the crystal holds until it has done its work, and on metallic coatings it helps carry heat away from the cutting zone, which protects both the bond and the workpiece finish. Copper coating is a common choice for resin bonds for its thermal behaviour; nickel is used where retention is the priority.",
          "EID applies these coatings in-house, so a single order covers the grit and the coating. Tell us the resin system and we will recommend the coating. [Ask our technical team](/contact).",
        ],
      },
    ],
    quality:
      "The quality system is ISO 9001 certified, with a certificate of analysis per lot on request. For fine grinding and polishing, a grade that breaks down the same way every order is what keeps your finish predictable, and that consistency is what our QC confirms.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "Within the range",
        links: [
          { label: "Metal Bond Diamond (high-load cutting)", href: "/products/metal-bond" },
          { label: "Natural Diamond Grit & Powder", href: "/products/natural-grit-powder" },
        ],
      },
    ],
    crossApplications: [
      "semiconductor-electronics",
      "polishing-lapping",
      "grinding-cutting-sawing-drilling",
    ],
    guides: ["Metal bond vs resin bond vs vitrified"],
  },

  /* ================================ 4 · CBN =============================== */
  {
    slug: "cbn",
    name: "CBN",
    family: "CBN",
    h1: "CBN — Cubic Boron Nitride",
    metaTitle: "CBN Powder | Mesh, Micron & PCBN Blanks | EID",
    metaDesc:
      "Cubic boron nitride (CBN) powder in mesh and micron for grinding hardened and ferrous steels, plus PCBN discs and blanks for hard-turning. QC-controlled.",
    eyebrow: "Products · Group 4",
    cardDesc:
      "The superabrasive for hardened and ferrous steels, plus PCBN for finished cutting forms.",
    overviewDesc:
      "CBN powder in mesh and micron for hardened and ferrous steels, coated options, plus PCBN discs and blanks for hard-turning inserts.",
    intro: [
      "CBN: the superabrasive for hardened and ferrous metals.",
      "Cubic boron nitride is vital for grinding ferrous steels where diamond degrades. EID supplies CBN in mesh and micron grades, monocrystalline and microcrystalline, coated or uncoated, each batch graded and quality-controlled to your specification through our facility, plus [PCBN discs and blanks](#pcbn) for hard-turning inserts.",
      "With CBN and PCBN alongside the full diamond range, one supplier covers both the non-ferrous and the ferrous side of your production.",
    ],
    sections: [
      {
        id: "cbn",
        label: "CBN Powder",
        title: "CBN or diamond?",
        intro: [
          "Use diamond for non-ferrous materials like stone, glass, and carbide. Use CBN for ferrous materials like hardened steel and superalloys.",
          "Diamond is harder, but it reacts with iron at grinding temperatures. For gears, bearings, and crankshafts, CBN is the practical choice. For the full comparison with application charts, see the guide: [Diamond vs CBN](/resources).",
        ],
        applicationsTitle: "Where CBN is used",
        applications: [
          "Vitrified and resin-bonded CBN grinding wheels for hardened steel.",
          "Automotive crankshaft, camshaft, and gear grinding.",
          "Aerospace superalloy and turbine-component grinding.",
          "Tool-and-die grinding of hardened tool steels and HSS.",
          "Honing of cylinder and precision bores.",
        ],
        applicationsNote:
          "High-volume ferrous grinding where the wheel has to hold form across long production runs.",
        specsTitle: "CBN powder specifications",
        specs: [
          { label: "Forms", value: "Mesh and micron" },
          { label: "Mesh size range", value: "[confirm with Uri]" },
          { label: "Micron size range", value: "[confirm]" },
          { label: "Crystal type", value: "Monocrystalline (blocky, angular), microcrystalline [confirm]" },
          { label: "Toughness index", value: "[confirm with Uri]" },
          { label: "Coating options", value: "Nickel, titanium [confirm available set]" },
          { label: "Packaging", value: "[confirm]" },
        ],
        datasheet: "CBN datasheet",
      },
      {
        id: "coated",
        label: "Coated CBN",
        title: "Coated CBN.",
        intro: [
          "Coating CBN before it goes into a bonded wheel improves how the matrix holds it, so the crystal stays anchored through the grind instead of releasing early. Nickel improves retention in metal and resin systems; titanium suits vitrified bonds, where it helps the chemical bond between the CBN and the glass matrix.",
          "EID applies these coatings in-house, so the grit and the coating come from one order. Tell us the bond system and we will recommend the coating. [Ask our technical team](/contact).",
        ],
      },
      {
        id: "pcbn",
        label: "PCBN Discs & Blanks",
        title: "PCBN, the finished CBN form for hard-turning.",
        intro: [
          "PCBN discs and blanks are sintered composites used for hard-turning inserts. They offer significantly greater hot hardness than carbide. EID provides PCBN in various diameters and grain sizes, so one relationship covers the full diamond and CBN range.",
          "Where CBN powder goes into a grinding wheel, PCBN goes into a cutting edge.",
          "PCBN is for machining ferrous materials that are too hard for carbide and too valuable to grind slowly: hardened steel above roughly 45 HRC, cast iron, powder-metallurgy parts, and superalloys. It lets a shop hard-turn a finished part on a lathe instead of grinding it, which often removes a whole process step. PCBN is the ferrous counterpart to [PCD](/products/polycrystalline-diamond#pcd-blanks), which does the same job for non-ferrous materials like aluminium and composites.",
          "CBN content and grain size set the trade-off between wear resistance and toughness, so the grade follows the operation: high-CBN grades for interrupted cuts and roughing, lower-CBN grades for continuous finishing.",
        ],
        applicationsTitle: "Where PCBN is used",
        applications: [
          "Hard-turning and finish-machining inserts for hardened powertrain components.",
          "Finish machining of hardened gears and bearings.",
          "High-speed machining of cast iron brake rotors and cylinder liners.",
          "Turning of case-hardened and through-hardened steel parts.",
        ],
        applicationsNote:
          "Automotive and aerospace production is the core, wherever a hardened ferrous part needs a defined finish at production speed.",
        specsTitle: "PCBN specifications",
        specs: [
          { label: "Form", value: "Discs and blanks" },
          { label: "CBN content grades", value: "[confirm with Uri: high / low CBN grade set]" },
          { label: "Grain size", value: "[confirm range]" },
          { label: "Disc diameters", value: "[confirm]" },
          { label: "Thicknesses", value: "[confirm]" },
          { label: "Substrate", value: "Carbide-backed [confirm]" },
          { label: "Custom grades", value: "Available to spec" },
        ],
        datasheet: "PCBN datasheet",
      },
    ],
    quality:
      "The quality system is ISO 9001 certified, with a certificate of analysis per lot on request. In high-volume ferrous grinding, a CBN lot that matches the last one keeps the grinding line from needing a re-set. For an insert maker, a PCBN substrate and grade that match the last order keep insert performance repeatable.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "Counterpart",
        links: [
          {
            label: "PCD discs & blanks (non-ferrous machining)",
            href: "/products/polycrystalline-diamond#pcd-blanks",
          },
        ],
      },
      {
        title: "Related",
        links: [{ label: "Metal Bond Diamond (the non-ferrous side)", href: "/products/metal-bond" }],
      },
    ],
    crossApplications: [
      "automotive-aerospace",
      "tool-and-die",
      "grinding-cutting-sawing-drilling",
    ],
    guides: ["Diamond vs CBN"],
  },

  /* ========================= 5 · SINGLE CRYSTAL =========================== */
  {
    slug: "single-crystal",
    name: "Single Crystal Diamond (CVD & MCD)",
    family: "Single Crystal Diamond (CVD & MCD)",
    h1: "Single Crystal Diamond — CVD & MCD",
    metaTitle: "CVD Single Crystal & MCD Monocrystalline Diamond | EID",
    metaDesc:
      "White CVD single crystal grown to your orientation, and HPHT MCD monocrystalline diamond, for single-point and precision tooling. Made to spec, QC-tested.",
    eyebrow: "Products · Group 5",
    cardDesc:
      "CVD single crystal and MCD materials, made to spec for precision tooling, thermal, optical, and advanced applications.",
    overviewDesc:
      "White CVD single crystal grown to your orientation, and HPHT MCD for single-point and precision tooling.",
    intro: [
      "Single crystal diamond, CVD and MCD, for single-point precision tooling.",
      "EID provides two paths to precision: white CVD single crystal grown to your orientation, and HPHT MCD for reproducible edge geometry. Both are mechanical-grade crystals, inspected in-house, for the most demanding single-point tooling.",
      "Jump to [CVD single crystal](#cvd) or [MCD](#mcd), or tell us the tool and the tolerance and we will specify the crystal.",
    ],
    sections: [
      {
        id: "cvd",
        label: "CVD Single Crystal",
        title: "CVD single crystal diamond, grown to your exact orientation and specification.",
        intro: [
          "EID supplies white, mechanical-grade CVD single crystal for precision tooling. It is grown to your orientation through dedicated partners and finished in-house, so you get made-to-spec crystal inside a single-source relationship.",
          "Available in 2-point, 3-point, and 4-point orientation, custom sizes, and specific crystallographic faces.",
          "For single-point tools, the crystal's orientation and clarity decide the quality of the finished part. Natural diamond cannot supply that consistently; every stone is different. CVD single crystal is grown to a defined orientation with low dislocation density, so the cutting edge behaves the same way tool to tool. That predictability is why it is the material for dressing and shaping optical surfaces, turning contact lenses to sub-micron tolerance, and machining luxury watch components.",
        ],
        applicationsTitle: "Where CVD single crystal is used",
        applications: [
          "Single-point diamond dressing tools for precision grinding wheels.",
          "Turning and fly-cutting of infrared optics such as germanium, zinc selenide, and silicon.",
          "Precision machining of contact and intraocular lenses.",
          "Luxury watch component machining.",
          "Wire-drawing dies for fine wire.",
        ],
        applicationsNote:
          "Applications where the surface finish and the edge geometry are the specification, not a by-product.",
        specsTitle: "CVD single crystal specifications",
        specs: [
          { label: "Type", value: "CVD single crystal, white, mechanical grade" },
          {
            label: "Orientations",
            value: "2-point, 3-point, 4-point; ⟨100⟩, ⟨110⟩, ⟨111⟩ [confirm available faces]",
          },
          { label: "Sizes", value: "[confirm with Uri]" },
          { label: "Custom shapes / faces", value: "Available to spec" },
          { label: "Clarity", value: "Optical-grade, low dislocation density [confirm descriptors]" },
          { label: "Lead time", value: "Made to order [confirm typical lead time]" },
        ],
        specsNote: "Grown to your specification.",
        datasheet: "CVD Single Crystal datasheet",
      },
      {
        id: "mcd",
        label: "MCD",
        title: "MCD, high-pressure high-temperature monocrystalline diamond.",
        intro: [
          "MCD is an HPHT-grown crystal with predictable edge geometry. It is the reproducible alternative to natural stone, giving the same edge performance tool after tool.",
          "EID supplies MCD in a range of sizes, shapes, and orientations for turning, dressing, wire drawing, and scribing. Standard grades and made-to-spec crystals are both available.",
          "MCD, CVD single crystal, and natural diamond all give you a single crystal, and each suits a different job. MCD (HPHT) offers reproducible edge geometry at a lower cost than CVD, which makes it the workhorse for single-point turning and dressing where you need consistency across many tools. [CVD single crystal](#cvd) is grown to a specified orientation for the most demanding optical and precision work. Natural stone still has a place in specific dressing applications. If you are choosing between them, the guide walks through each: [CVD, HPHT (MCD), and natural diamond compared](/resources).",
        ],
        applicationsTitle: "Where MCD is used",
        applications: [
          "Single-point turning of non-ferrous metals such as aluminium, copper, and brass.",
          "Dressing of conventional and superabrasive grinding wheels.",
          "Wire-drawing dies for copper, aluminium, and gold fine wire.",
          "Scribing and cutting of semiconductor wafers and glass.",
          "Precision engraving tools.",
        ],
        applicationsNote: "Work where a defined, repeatable edge is the requirement.",
        specsTitle: "MCD specifications",
        specs: [
          { label: "Type", value: "HPHT monocrystalline diamond" },
          { label: "Shapes", value: "Plate, blocky, octahedral, custom [confirm]" },
          { label: "Sizes", value: "[confirm with Uri]" },
          { label: "Orientations", value: "⟨100⟩, ⟨110⟩, ⟨111⟩ [confirm]" },
          { label: "Quality grades", value: "[confirm EID grading system]" },
          { label: "Custom shapes", value: "Available to spec" },
        ],
        datasheet: "MCD datasheet",
      },
    ],
    quality:
      "Every CVD crystal is inspected for clarity, orientation accuracy, and dislocation density, and every MCD grade is checked against its specification for shape, size, and orientation, before anything ships. ISO 9001 certified, with documentation available per order. The reason to choose grown or HPHT single crystal over natural stone is reproducibility, so consistency is exactly what our QC verifies.",
    qualityCta: "See how our QC works",
    cta: "Request a Custom Quote",
    crossLinks: [
      {
        title: "Related",
        links: [
          {
            label: "CVD Polycrystalline dressing logs",
            href: "/products/polycrystalline-diamond#dressing-logs",
          },
          { label: "Natural Tool Stones (natural single-point dressing)", href: "/products/tool-stones" },
        ],
      },
    ],
    crossApplications: ["tool-and-die", "semiconductor-electronics"],
    guides: ["CVD, HPHT (MCD), and natural diamond compared"],
  },

  /* ==================== 6 · POLYCRYSTALLINE DIAMOND ======================= */
  {
    slug: "polycrystalline-diamond",
    name: "Polycrystalline Diamond (CVD & PCD)",
    family: "Polycrystalline Diamond (CVD & PCD)",
    h1: "Polycrystalline Diamond — PCD Blanks & CVD Dressing Logs",
    metaTitle: "CVD Polycrystalline Diamond & PCD Blanks | EID",
    metaDesc:
      "PCD discs and blanks for non-ferrous cutting-tool inserts, and CVD polycrystalline dressing logs for truing grinding wheels. Made to spec, QC-tested.",
    eyebrow: "Products · Group 6",
    cardDesc:
      "PCD blanks for cutting inserts and CVD dressing logs for truing wheels.",
    overviewDesc:
      "CVD polycrystalline logs for dressing and truing, and PCD discs and blanks for cutting tools.",
    intro: [
      "Polycrystalline diamond, for cutting inserts and for wheel dressing.",
      "EID offers a complete polycrystalline diamond range. PCD discs and blanks provide wear-resistant cutting edges for non-ferrous materials, and CVD polycrystalline logs deliver isotropic hardness for consistent wheel dressing.",
    ],
    sections: [
      {
        id: "pcd-blanks",
        label: "PCD Discs & Blanks",
        title: "PCD discs and blanks for cutting-tool inserts.",
        intro: [
          "PCD consists of diamond grains sintered onto a carbide substrate. It is far more wear-resistant than carbide for machining non-ferrous and abrasive materials. EID supplies PCD in various grades, where grain size determines the balance between wear resistance and surface finish.",
          "Where diamond powder goes into a tool as an abrasive, PCD goes in as a cutting edge. It is the non-ferrous counterpart to [PCBN](/products/cbn#pcbn), which does the same job on hardened ferrous parts.",
          "PCD machines materials that wear carbide out fast but are not ferrous: aluminium and aluminium alloys, copper and brass, carbon and glass-fibre composites, wood-based panels, and abrasive plastics. It holds a sharp edge far longer than carbide in these materials, which is what makes it economic for high-volume runs despite the higher tool cost.",
          "Grain size sets the trade-off. Coarser grains resist wear and suit abrasive, interrupted work; finer grains take a keener edge and give a better finish. The grade follows the material and the finish you need, which is the first thing to specify.",
          "Do not use PCD on ferrous materials; diamond reacts with iron at cutting temperature. For hardened steel and cast iron, [PCBN](/products/cbn#pcbn) is the right blank.",
        ],
        applicationsTitle: "Where PCD is used",
        applications: [
          "Turning, milling, and boring inserts for aluminium powertrain and structural components.",
          "Machining of aluminium airframe and structural parts.",
          "High-volume machining of composites for aerospace and wind energy.",
          "Cutting-tool inserts for wood-based panel and abrasive-plastic production.",
        ],
        applicationsNote:
          "Non-ferrous, high-volume work where edge life per insert drives the cost per part.",
        specsTitle: "PCD specifications",
        specs: [
          { label: "Form", value: "Discs and blanks" },
          { label: "Grain sizes", value: "[confirm with Uri: typical 2–25 µm range]" },
          { label: "Disc diameters", value: "[confirm]" },
          { label: "Thicknesses", value: "[confirm]" },
          { label: "Substrate", value: "Carbide-backed [confirm]" },
          { label: "Grades", value: "[confirm EID grade set by grain size / application]" },
          { label: "Custom grades", value: "Available to spec" },
        ],
        datasheet: "PCD datasheet",
      },
      {
        id: "dressing-logs",
        label: "CVD Dressing Logs",
        title: "CVD polycrystalline dressing logs, for truing and dressing wheels.",
        intro: [
          "CVD polycrystalline logs have a randomly oriented structure that gives isotropic hardness. That means consistent, long-lasting dressing without the weak cleavage planes found in natural stones. EID supplies the logs in standard and custom sizes, made to specification through our CVD growth partnership and finished in-house, in black polycrystalline grade.",
          "A natural diamond is a single crystal with cleavage planes, so it wears unevenly and can chip along a plane under load. A CVD polycrystalline log is built from countless small, randomly oriented crystals with no shared cleavage direction. As it dresses, it presents a uniform, self-renewing surface in every orientation, which keeps the dressing action consistent and the log lasting. For form dressing and CNC grinding centres, that consistency is what holds the wheel profile true across a production run.",
        ],
        applicationsTitle: "Where CVD dressing logs are used",
        applications: [
          "Rotary dressing of aluminium oxide and silicon carbide grinding wheels.",
          "Form dressing of profile grinding wheels.",
          "Stationary and traverse dressing in CNC grinding centres.",
          "A higher-consistency alternative to natural diamond dressing tools.",
        ],
        applicationsNote:
          "Wherever a wheel has to be trued repeatably and the dressing tool itself has to hold up.",
        specsTitle: "CVD polycrystalline specifications",
        specs: [
          { label: "Type", value: "CVD polycrystalline, black" },
          { label: "Log sizes", value: "[confirm with Uri: typical 3×3×3 mm to 10×10×10 mm]" },
          { label: "Custom sizes / shapes", value: "Available to spec" },
          { label: "Crystal structure", value: "Randomly oriented, isotropic hardness" },
          { label: "Lead time", value: "Made to order [confirm typical lead time]" },
        ],
        datasheet: "CVD Polycrystalline datasheet",
      },
    ],
    quality:
      "Every PCD grade is checked against its specification for grain size, substrate, and dimensional tolerance, and every CVD log is inspected for dimensions and structure, before shipping. ISO 9001 certified, with documentation available per order. For an insert maker, a blank that matches the last order keeps insert performance repeatable; for a dressing operation, a log that matches the last one keeps the wheel profile true.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote",
    crossLinks: [
      {
        title: "Counterpart",
        links: [
          { label: "PCBN discs & blanks (ferrous machining)", href: "/products/cbn#pcbn" },
        ],
      },
      {
        title: "Dressing alternatives",
        links: [
          { label: "Natural Tool Stones", href: "/products/tool-stones" },
          { label: "MCD (single-point dressing)", href: "/products/single-crystal#mcd" },
        ],
      },
    ],
    crossApplications: [
      "tool-and-die",
      "automotive-aerospace",
      "grinding-cutting-sawing-drilling",
    ],
    guides: ["CVD, HPHT (MCD), and natural diamond compared"],
  },

  /* ========================= 7 · NATURAL TOOL STONES ====================== */
  {
    slug: "tool-stones",
    name: "Natural Tool Stones",
    family: "Natural Tool Stones",
    h1: "Natural Diamond Tool Stones",
    metaTitle: "Natural Diamond Tool Stones | Dressing & Single-Point | EID",
    metaDesc:
      "Rough and shaped natural diamond tool stones for single-point dressing and set tools. Selected in-house for crystal quality and orientation.",
    eyebrow: "Products · Group 7",
    cardDesc: "Rough and shaped natural diamond for single-point dressing and set tools.",
    overviewDesc:
      "Rough and shaped natural diamond for single-point dressing and set tools.",
    intro: [
      "Natural diamond tool stones, hand-selected for precision.",
      "EID provides hand-selected natural tool stones, inspected in-house for orientation and crystal quality. Our selection ensures stones are free from inclusions, which protects tool life and finish.",
      "Available as rough stones for setting by the tool maker, or shaped to your specification. This is enquiry-led material, so the conversation usually starts with your application rather than a fixed catalogue.",
    ],
    sections: [
      {
        id: "tool-stones",
        label: "Natural Tool Stones",
        title: "Natural stone or a synthetic?",
        intro: [
          "Natural stones offer unique toughness, but variability is inherent. For high-volume reproducibility, [MCD](/products/single-crystal#mcd) or [CVD polycrystalline logs](/products/polycrystalline-diamond#dressing-logs) provide defect-controlled alternatives. We supply all three to match your specific operation.",
        ],
        applicationsTitle: "Where natural tool stones are used",
        applications: [
          "Single-point dressing of conventional grinding wheels in aluminium oxide and silicon carbide.",
          "Turning and profiling of non-ferrous and non-metallic materials.",
          "Specialty tooling where natural diamond's edge retention and thermal conductivity are the reason to choose it over a synthetic.",
        ],
        applicationsNote:
          "Natural stone still holds its place in dressing operations that suit its toughness.",
        specsTitle: "Specifications",
        specs: [
          { label: "Carat sizes", value: "[confirm with Uri]" },
          { label: "Shapes", value: "Rough, octahedral, macle, or shaped to drawing" },
          { label: "Quality grades", value: "[confirm EID grading / selection criteria]" },
          { label: "Setting", value: "Supplied loose for setting, or shaped to spec" },
        ],
        enquiryCta: { label: "Enquire about tool stones", href: "/contact" },
      },
    ],
    quality:
      "Because each stone is individual, selection is the quality step: every stone is inspected for crystal quality, orientation, and inclusions before it is matched to your application. ISO 9001 certified. Where you need documented consistency across a batch, we will tell you honestly whether natural stone or a synthetic alternative is the better fit.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote",
    crossLinks: [
      {
        title: "Alternatives",
        links: [
          { label: "MCD", href: "/products/single-crystal#mcd" },
          {
            label: "CVD Polycrystalline dressing logs",
            href: "/products/polycrystalline-diamond#dressing-logs",
          },
        ],
      },
      {
        title: "Related",
        links: [
          { label: "Natural Diamond Grit & Powder", href: "/products/natural-grit-powder" },
        ],
      },
    ],
    crossApplications: ["tool-and-die"],
    guides: ["CVD, HPHT (MCD), and natural diamond compared"],
  },

  /* ================== 8 · POLYCRYSTALLINE DIAMOND POWDER ================== */
  {
    slug: "polycrystalline-powder",
    name: "Polycrystalline Diamond Powder",
    family: "Polycrystalline Diamond Powder",
    h1: "Polycrystalline Diamond Micron Powder",
    metaTitle: "Polycrystalline Diamond Micron Powder (Polishing) | EID",
    metaDesc:
      "Detonation-synthesis polycrystalline diamond micron powder for the most demanding polishing. Rounded, no-cleavage particles for a finer, uniform finish.",
    eyebrow: "Products · Group 8",
    cardDesc:
      "Engineered polycrystalline powders for precision polishing, lapping, and advanced material finishing.",
    overviewDesc:
      "Polycrystalline diamond powder for precision polishing, lapping, and advanced surface finishing.",
    intro: [
      "Polycrystalline diamond powder: for uniform, sub-nanometer finishes.",
      "Polycrystalline diamond powder has rounded particles that micro-fracture to expose fresh edges rather than scratching. That mechanism makes it the choice for the finest, most uniform sub-nanometer finishes on optics and advanced materials.",
      "EID supplies it from sub-micron up, in dry powder, suspension, and paste. Tell us the material and the finish you need and we will match the grade and format.",
    ],
    sections: [
      {
        id: "polycrystalline-powder",
        label: "Polycrystalline Powder",
        title: "Why the polycrystalline particle polishes finer.",
        intro: [
          "Monocrystalline particles have sharp corners that can scratch surfaces. Detonation-synthesis polycrystalline particles are rounded and micro-fracture to expose fresh cutting points.",
          "This gradual breakdown produces lower, more uniform surface roughness, which is essential for nanometer-scale Ra specifications.",
        ],
        applicationsTitle: "Where polycrystalline micron powder is used",
        applications: [
          "Final polishing of optical components such as lenses, mirrors, and prisms to sub-nanometer Ra.",
          "Polishing of semiconductor wafers and electronic substrates.",
          "Superfinishing of PCD and PCBN cutting-tool inserts.",
          "Polishing of ceramic and sapphire substrates.",
          "Fine lapping of carbide and hardened-steel precision parts.",
        ],
        applicationsNote: "The last step, where surface quality is the deliverable.",
        specsTitle: "Specifications",
        specs: [
          { label: "Size range", value: "[confirm with Uri: typical 0.1–60 µm]" },
          { label: "Crystal type", value: "Polycrystalline, rounded, no cleavage" },
          { label: "Formats", value: "Dry powder, water or oil suspension, paste" },
          { label: "Size distribution", value: "Controlled D50 and span [confirm D-values]" },
          { label: "Packaging", value: "Syringes, bottles, or custom [confirm]" },
        ],
        datasheet: "Polycrystalline Powder datasheet",
      },
    ],
    quality:
      "Particle size distribution is measured on every batch, with controlled D50 and span, because in final polishing a single oversized particle can scratch the workpiece and cost the whole part. ISO 9001 certified, with a certificate of analysis per lot on request. Consistency at the top of the distribution is what protects the surface, and that is what our micron QC verifies.",
    qualityCta: "See how our micron QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "Step down in finish",
        links: [
          {
            label: "Natural Diamond Micron Powder (lapping and intermediate polishing)",
            href: "/products/natural-grit-powder#micron",
          },
        ],
      },
    ],
    crossApplications: ["polishing-lapping", "semiconductor-electronics"],
    guides: ["How size distribution affects tool performance"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsByFamily = (family: string) => products.filter((p) => p.family === family);
