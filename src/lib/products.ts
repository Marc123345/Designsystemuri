export type Spec = { label: string; value: string };
export type Callout = { title: string; body: string | string[] };
export type CrossGroup = { title: string; links: { label: string; href: string }[] };

/**
 * A section is a former standalone product page — or, on the bond and CBN
 * pages, one sizing world (mesh / micron) — now folded into its parent.
 * Each keeps its own H2, anchor, spec table, applications list, and datasheet,
 * so the search intent that used to live on a separate URL still has a home.
 *
 * Mesh and micron are separate sizing systems and do not correlate, so the
 * deck (Uri, 19/7) gives each its own section and its own spec table. Never
 * merge them back into a single "forms: mesh and micron" table.
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
  /**
   * The deck's explainer blocks ("How metal bond works", "Why friability
   * matters", "CBN or diamond?", "Where PCD fits") land here, on the first
   * section of the page. Rendered between the intro and the applications list.
   */
  callouts?: Callout[];
  applicationsTitle?: string; // always "Typical Applications" per the 19/7 revision
  applications?: string[];
  applicationsNote?: string; // the deck's closing line after the bullet list
  specsTitle?: string;
  /**
   * Verified attribute rows (Form, Formats, Custom grades, etc.). The hard
   * grade / size / coating data lives in lib/product-catalog.ts and is merged
   * in by the product page; these rows carry the copy-deck attributes that sit
   * alongside it.
   */
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
  overviewDesc?: string; // longer blurb for the mega-menu and homepage product grid
  cta: string;
  crossLinks?: CrossGroup[]; // anchor-bearing product/related links from the copy deck
  crossApplications: string[]; // application hub slugs (names resolve per locale)
  guides?: string[]; // related guide titles (link to /resources)
};

// The eight locked product groups. One group = one page. Mesh and micron are
// forms within a product, not separate pages, but they do get their own
// sections and spec tables on the bond and CBN pages. Coatings are attribute
// sections on those pages, never a standalone page or a nav entry.
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
      "Natural mesh, micron powder, and rotary diamond, crushed, sorted, and graded in-house for grinding, lapping, dressing, and drilling.",
    overviewDesc:
      "Crushed and graded in-house. Mesh grit for grinding, sawing, and dressing; micron powder for lapping and polishing; natural rotary diamonds for drilling and truing.",
    intro: [
      "Natural diamond grit and powder, crushed and graded in our own factory.",
      "EID manufactures natural diamond in two forms from one in-house process: graded grit in mesh sizes for grinding, sawing, and dressing, and fine micron powder for lapping and polishing. Raw material is crushed, shaped, and graded in-house, then verified before shipping, so sizing stays tight and repeatable from one order to the next.",
      "This is the one page in the range that carries the fully in-house claim without qualification: EID makes this material from raw, start to finish. Standard grades ship from stock, custom sizes are made to order. Jump to the [grit specs](#grit) or the [micron powder specs](#micron), or tell us the tool and the material and we will specify the grade.",
    ],
    sections: [
      {
        id: "grit",
        label: "Diamond Grit (Mesh)",
        title: "Natural diamond grit, in graded mesh sizes.",
        intro: [
          "EID manufactures natural diamond grit in standard and custom mesh sizes for grinding, sawing, dressing, and lapping. Crushed, shaped, and graded in-house, then verified, so sizing holds order to order.",
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Grinding wheels and segments for stone, glass, and construction materials.",
          "Saw blades and wire saws for stone and concrete.",
          "Dressing tools for truing conventional grinding wheels.",
          "Lapping and rough-polishing of hard, brittle materials.",
        ],
        applicationsNote:
          "The common thread is non-ferrous, non-metallic work where natural diamond's hardness and edge retention earn their place. For hardened or ferrous steels, diamond wears too fast; use [CBN](/products/cbn) instead.",
        specsTitle: "Grit specifications",
        specs: [
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
          "We also supply natural rotary diamonds for dressing and truing, selected in-house from natural grades. These are enquiry-led rather than stocked to a fixed catalogue. Tell us the wheel and the dressing operation and we will match the stone.",
        ],
        enquiryCta: { label: "Enquire about rotary diamonds", href: "/contact" },
      },
      {
        id: "micron",
        label: "Micron Powder",
        title: "Natural diamond micron powder, graded in-house for lapping and polishing.",
        intro: [
          "EID supplies natural diamond micron powder for lapping, polishing, and fine surface finishing. Every batch is graded in our own laboratory to a tight, repeatable particle size distribution, which is the difference between a predictable finish and a surface you have to re-work.",
          "Available from coarse micron down to sub-micron, as dry powder, water or oil suspension, and paste. Tell us the material and the finish you are targeting and we will match the grade and format.",
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Lapping of hard, brittle materials such as ceramics, carbide, glass, and sapphire.",
          "Polishing of optical components toward sub-nanometer surface finish.",
          "Superfinishing of PCD and PCBN cutting-tool inserts.",
          "Fine finishing of semiconductor and electronic substrates.",
        ],
        applicationsNote:
          "Where the specification is a surface quality rather than a stock-removal rate, this is the grade family that gets you there.",
        specsTitle: "Micron powder specifications",
        specs: [
          { label: "Formats", value: "Dry powder, water or oil suspension, paste" },
        ],
        specsNote: "Need a size or format not listed? [Ask our technical team](/contact).",
        datasheet: "Micron Powder datasheet",
      },
    ],
    quality:
      "Every run is graded and inspected in our QC laboratory: mesh grit for sizing and shape factor, micron powder for particle size distribution with controlled D50 and span. The quality system is ISO 9001 certified, with full traceability from raw material to shipped lot and a certificate of analysis on request. Grading is how the consistency is built; QC is how it is proven.",
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
    ],
    guides: [
      "Diamond grit and micron size chart",
      "How size distribution affects tool performance",
      "Diamond vs CBN",
    ],
  },

  /* ============================ 2 · METAL BOND =============================
   * Mesh and micron split into their own sections with their own spec tables
   * (Uri, 19/7). "How metal bond works" rides as a callout on the mesh section.
   */
  {
    slug: "metal-bond",
    name: "Metal Bond Diamond",
    family: "Metal Bond Diamond",
    h1: "Metal Bond Diamond Powder",
    metaTitle: "Metal Bond Diamond Powder | Saw & Wheel Grades, Mesh & Micron",
    metaDesc:
      "Metal bond synthetic diamond in saw and wheel grades, coated and graded for sintered tools. Mesh and micron, finished to your spec.",
    eyebrow: "Products · Group 2",
    cardDesc:
      "Saw and wheel grades for sintered and brazed tools, in mesh and micron, with in-house coating options.",
    overviewDesc:
      "Mesh and micron grades for diamond saws, grinding wheels, and sintered, brazed, and electroplated tools, with in-house coating options.",
    intro: [
      "Metal bond diamond powder, graded to your spec in mesh and micron.",
      "Metal bond diamond is the workhorse for tools that cut under high pressure and heat: stone saw segments, core drill bits, grinding cups, and sintered dental burs. EID supplies it in saw grade, wheel grade, and custom formulations, coated or uncoated, produced to order and then processed and graded through our facility to meet your specification. That grading pass is what separates a grade you can build a production run around from one you re-qualify every order.",
      "Two forms, each with its own sizing world: [mesh](#mesh) for aggressive, high-load cutting, and [micron](#micron) for finer wheels and precision tools. Jump to either, or tell us the tool and the bond and we will specify the grade.",
    ],
    sections: [
      {
        id: "mesh",
        label: "Metal Bond Mesh",
        title: "Metal bond diamond, mesh grades for high-load cutting.",
        intro: [
          "Mesh grades cover the coarse-to-medium range that goes into segmented and sintered tools cutting hard, non-ferrous material at volume. Saw grade carries high impact strength for interrupted, high-load work; wheel grade runs a controlled friability for grinding cups and profile wheels.",
        ],
        callouts: [
          {
            title: "How metal bond works",
            body: "Metal bond holds diamond mechanically in a hard sintered matrix. The bond wears slowly and exposes fresh diamond as it goes, which suits aggressive cutting of stone, concrete, glass, ceramics, and composites. Retention depends on matching crystal strength and shape to the bond, which is where grade selection and [coating](#coated) do the work.",
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Stone and concrete saw blades, segments, and wire saw beads.",
          "Core drill bits for construction and mining.",
          "Diamond grinding cups and profile wheels for stone and glass.",
          "Sintered dental burs and rotary instruments.",
        ],
        applicationsNote:
          "High-load work where the tool has to keep cutting predictably run after run.",
        specsTitle: "Metal bond mesh specifications",
        specs: [
          { label: "Form", value: "Mesh" },
          {
            label: "Grades",
            value: "Saw grade (high impact strength), wheel grade (controlled friability)",
          },
        ],
        datasheet: "Metal Bond datasheet",
      },
      {
        id: "micron",
        label: "Metal Bond Micron",
        title: "Metal bond diamond, micron grades for fine and precision tools.",
        intro: [
          "Micron grades cover the fine end of metal bond, for precision grinding wheels, small sintered tools, and fine dental and rotary work where sizing is measured rather than sieved. Mesh and micron are separate sizing systems and do not correlate, so specify by the one your process uses.",
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Precision metal-bond grinding wheels.",
          "Fine sintered segments and cups.",
          "Small-diameter and profile tools.",
          "Fine dental instruments.",
        ],
        applicationsNote:
          "Where the finish and the wheel form matter as much as stock removal.",
        specsTitle: "Metal bond micron specifications",
        specs: [
          { label: "Form", value: "Micron" },
        ],
        datasheet: "Metal Bond datasheet",
      },
      {
        id: "coated",
        label: "Coated Metal Bond",
        title: "Coated metal bond diamond.",
        intro: [
          "Coating a particle before it goes into the bond gives the matrix more to hold. The coating adds surface area and a metallurgical bond between the diamond and the sintered metal, so the crystal stays anchored under load instead of pulling out early. The result is longer tool life from the same diamond.",
          "EID coats in-house, so the grit and the coating come from one supplier rather than a shipment out to a second vendor and back. Electroless nickel is the standard for sintered metal bond tools, applied at your target weight percentage; PVD and copper options are available where the bond calls for them.",
          "Tell us your bond and we will recommend the coating and weight. [Ask our technical team](/contact).",
        ],
      },
    ],
    quality:
      "The quality system is ISO 9001 certified, and every lot is traceable from incoming material through QC to delivery, with a certificate of analysis on request. Our lab measures particle size distribution and morphology on every lot, with coating weight and coverage checked on coated grades, and crystal strength where the grade calls for it. For a sintered tool, consistent sizing and coating weight are what keep your sinter results repeatable.",
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
    crossApplications: ["dental", "grinding-cutting-sawing-drilling"],
    guides: ["Metal bond vs resin bond vs vitrified"],
  },

  /* ============================ 3 · RESIN BOND =============================
   * Mesh and micron split into their own sections with their own spec tables
   * (Uri, 19/7). The friability explainer rides as a callout on the mesh section.
   */
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
      "Friable, multi-crystalline grades for fine grinding and polishing, in mesh and micron, with in-house coating options.",
    overviewDesc:
      "Friable, multi-crystalline grades in mesh and micron for fine grinding and polishing, coatings available.",
    intro: [
      "Resin bond diamond powder, friable grades in mesh and micron.",
      "Resin bond diamond is built to fracture in a controlled way as it cuts, exposing fresh edges rather than dulling. That makes it the grade for fine grinding, polishing, and finishing, where surface quality outweighs aggressive stock removal. EID supplies it in mesh and micron, monocrystalline and polycrystalline, coated or uncoated, each grade processed and graded to your specification.",
      "[Mesh](#mesh) and [micron](#micron) sit in separate sizing systems; specify by the one your process runs on.",
    ],
    sections: [
      {
        id: "mesh",
        label: "Resin Bond Mesh",
        title: "Resin bond mesh, for resin-bonded wheels and flexible abrasives.",
        intro: [
          "Mesh grades cover the coarser friable range for resin-bonded grinding wheels and flexible abrasive products, where the bond releases grit steadily and the crystal renews its own edges.",
        ],
        callouts: [
          {
            title: "Why friability matters in a resin bond",
            body: "A resin bond is softer than a metal bond and releases the diamond more readily. Pair it with a friable, multi-crystalline crystal and the diamond breaks down in a governed way, presenting new cutting points instead of glazing over. The tool stays sharp and cuts cool, which protects the finish on carbide, ceramic, and glass. The grade sets how fast that breakdown runs, so matching friability to the operation is the decision that matters.",
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Resin-bonded grinding wheels for carbide, ceramic, and glass.",
          "Flexible abrasive sheets, belts, and pads for glass and stone.",
          "Fine grinding ahead of a polishing stage.",
        ],
        specsTitle: "Resin bond mesh specifications",
        specs: [
          { label: "Form", value: "Mesh" },
          {
            label: "Crystal type",
            value: "Monocrystalline (blocky to irregular), polycrystalline (self-sharpening)",
          },
        ],
        datasheet: "Resin Bond datasheet",
      },
      {
        id: "micron",
        label: "Resin Bond Micron",
        title: "Resin bond micron, for polishing and fine finishing.",
        intro: [
          "Micron grades take the friable structure down to the fine and sub-micron sizing used in polishing, honing, and final finishing, where the last few microns and the surface are the point.",
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Polishing and fine finishing of precision components.",
          "Lapping and honing of technical ceramics and other hard, brittle materials.",
          "Fixed-abrasive finishing where a controlled, self-renewing edge protects the surface.",
        ],
        specsTitle: "Resin bond micron specifications",
        specs: [
          { label: "Form", value: "Micron" },
        ],
        datasheet: "Resin Bond datasheet",
      },
      {
        id: "coated",
        label: "Coated Resin Bond",
        title: "Coated resin bond diamond.",
        intro: [
          "In a resin system the coating does two jobs. It improves how the resin grips the diamond, so the crystal holds until it has done its work, and on metallic coatings it carries heat away from the cutting zone, which protects both the bond and the workpiece finish. Copper is a common choice for its thermal behaviour; nickel is used where retention is the priority.",
          "EID coats in-house, so a single order covers the grit and the coating. Tell us the resin system and we will recommend the coating. [Ask our technical team](/contact).",
        ],
      },
    ],
    quality:
      "The quality system is ISO 9001 certified, with a certificate of analysis per lot on request. Our lab measures particle size distribution and morphology on every lot, with coating checked on coated grades. For fine grinding and polishing, a grade that breaks down the same way each order is what keeps your finish predictable.",
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
    crossApplications: ["semiconductor-electronics", "polishing-lapping"],
    guides: ["Metal bond vs resin bond vs vitrified"],
  },

  /* ================================ 4 · CBN ===============================
   * Four sections: mesh, micron, coated, PCBN (Uri, 19/7). "CBN or diamond?"
   * rides as a callout on the mesh section. PCBN keeps its own H2, spec table,
   * and #pcbn anchor — the old /products/pcbn URL 301s to it.
   */
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
      "The superabrasive for hardened and ferrous steels, in mesh and micron, plus PCBN for finished cutting forms.",
    overviewDesc:
      "CBN powder in mesh and micron for hardened and ferrous steels, coated options, plus PCBN discs and blanks for hard-turning inserts.",
    intro: [
      "CBN, the superabrasive for ferrous metals.",
      "Cubic boron nitride is the second-hardest material after diamond, and the only superabrasive that grinds hardened and ferrous steels efficiently. Diamond reacts with iron at grinding temperatures and wears fast; CBN stays stable and keeps cutting. EID supplies CBN in mesh and micron, monocrystalline and microcrystalline, coated or uncoated, each grade processed and graded to your specification, plus [PCBN discs and blanks](#pcbn) for hard-turning inserts.",
      "With CBN and PCBN alongside the full diamond range, one supplier covers the ferrous and non-ferrous sides of your production. Jump to [CBN mesh](#mesh), [CBN micron](#micron), [coated CBN](#coated), or [PCBN](#pcbn).",
    ],
    sections: [
      {
        id: "mesh",
        label: "CBN Mesh",
        title: "CBN mesh, for grinding wheels working hardened steel.",
        intro: [
          "Mesh grades cover the coarse-to-medium CBN range that goes into vitrified and resin-bonded grinding wheels for ferrous work at volume, monocrystalline for toughness on interrupted cuts, microcrystalline where a self-sharpening action suits the wheel.",
        ],
        callouts: [
          {
            title: "CBN or diamond?",
            body: [
              "Use diamond for non-ferrous and non-metallic materials: stone, glass, ceramics, carbide, composites. Use CBN for ferrous materials: hardened steel, cast iron, superalloys, high-speed steel. The deciding factor is heat and chemistry, not just hardness. Diamond is harder, but it degrades against iron at grinding temperatures, so for hardened gears, bearings, crankshafts, and camshafts, CBN is the practical choice.",
              "For the full comparison with application charts, see the guide: [Diamond vs CBN](/resources).",
            ],
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Vitrified and resin-bonded CBN grinding wheels for hardened steel.",
          "Automotive crankshaft, camshaft, and gear grinding.",
          "Aerospace superalloy and turbine-component grinding.",
          "Tool-and-die grinding of hardened tool steels and HSS.",
        ],
        applicationsNote:
          "High-volume ferrous grinding where the wheel has to hold form across long runs.",
        specsTitle: "CBN mesh specifications",
        specs: [
          { label: "Form", value: "Mesh" },
        ],
        datasheet: "CBN datasheet",
      },
      {
        id: "micron",
        label: "CBN Micron",
        title: "CBN micron, for finish grinding, honing, and superfinishing.",
        intro: [
          "Micron grades take CBN down to the fine sizing used in finish grinding, honing, and superfinishing of ferrous parts, sized by measurement rather than sieve.",
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Honing of cylinder and precision bores.",
          "Finish grinding of hardened bearings and gears.",
          "Superfinishing of ferrous precision components where the surface is the deliverable.",
        ],
        specsTitle: "CBN micron specifications",
        specs: [
          { label: "Form", value: "Micron" },
        ],
        datasheet: "CBN datasheet",
      },
      {
        id: "coated",
        label: "Coated CBN",
        title: "Coated CBN.",
        intro: [
          "Coating CBN before it goes into a bonded wheel improves how the matrix holds it, so the crystal stays anchored through the grind instead of releasing early. Nickel improves retention in metal and resin systems; titanium suits vitrified bonds, where it helps the chemical bond between the CBN and the glass matrix. EID coats in-house, so the grit and the coating come from one order. Tell us the bond system and we will recommend the coating. [Ask our technical team](/contact).",
        ],
      },
      {
        id: "pcbn",
        label: "PCBN Discs & Blanks",
        title: "PCBN, the finished CBN form for hard-turning.",
        intro: [
          "PCBN discs and blanks are the starting material for cutting-tool inserts that machine hardened ferrous parts. CBN grains are sintered under high pressure and temperature into a dense composite that offers significantly greater hot hardness and wear resistance than conventional carbide, then supplied as discs or blanks ready to be cut into inserts. EID supplies PCBN in a range of diameters, thicknesses, CBN contents, and grain sizes.",
          "Where CBN powder goes into a grinding wheel, PCBN goes into a cutting edge. Both come from one supplier here, alongside the full diamond range.",
        ],
        callouts: [
          {
            title: "Where PCBN fits",
            body: [
              "PCBN machines ferrous materials that are too hard for carbide and too valuable to grind slowly: hardened steel above roughly 45 HRC, cast iron, powder-metallurgy parts, and superalloys. It lets a shop hard-turn a finished part on a lathe instead of grinding it, which often removes a whole process step. PCBN is the ferrous counterpart to [PCD](/products/polycrystalline-diamond#pcd-blanks), which does the same job for non-ferrous materials like aluminium and composites.",
              "CBN content and grain size set the trade-off between wear resistance and toughness: high-CBN grades for interrupted cuts and roughing, lower-CBN grades for continuous finishing.",
            ],
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Hard-turning and finish-machining inserts for hardened powertrain components.",
          "Finish machining of hardened gears and bearings.",
          "High-speed machining of cast iron brake rotors and cylinder liners.",
          "Turning of case-hardened and through-hardened steel.",
        ],
        applicationsNote:
          "Automotive and aerospace production is the core, wherever a hardened ferrous part needs a defined finish at production speed.",
        specsTitle: "PCBN specifications",
        specs: [
          { label: "Form", value: "Discs and blanks" },
          { label: "Custom grades", value: "Available to spec" },
        ],
        datasheet: "PCBN datasheet",
      },
    ],
    quality:
      "The quality system is ISO 9001 certified, with a certificate of analysis per lot on request. Our lab measures particle size distribution and morphology on every lot, with crystal strength and coating checked where the grade requires it. In high-volume ferrous grinding, a lot that matches the last one keeps the line from a re-set; for an insert maker, a PCBN substrate and grade that match the last order keep insert performance repeatable.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote or Sample",
    crossLinks: [
      {
        title: "On this page",
        links: [
          { label: "CBN mesh", href: "#mesh" },
          { label: "CBN micron", href: "#micron" },
          { label: "Coated CBN", href: "#coated" },
          { label: "PCBN", href: "#pcbn" },
        ],
      },
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
      "Made to spec for precision tooling, thermal, optical, and advanced applications.",
    overviewDesc:
      "White CVD single crystal grown to your orientation, and HPHT MCD for single-point and precision tooling.",
    intro: [
      "Single crystal diamond, CVD and MCD, for single-point precision tooling.",
      "For single-point and precision tools, a defined, repeatable crystal is the specification. EID supplies two routes to it: white CVD single crystal grown to your orientation, and HPHT MCD for a reproducible edge at production scale. Both are mechanical grade, not gemstones, and both come from one supplier alongside the rest of the diamond range.",
      "Jump to [CVD single crystal](#cvd) or [MCD](#mcd), or tell us the tool and the tolerance and we will specify the crystal.",
    ],
    sections: [
      {
        id: "cvd",
        label: "CVD Single Crystal",
        title: "CVD single crystal diamond, grown to your exact orientation and specification.",
        intro: [
          "EID supplies white, mechanical-grade CVD single crystal for single-point precision tooling, not gemstones. It is grown to your orientation and specification through an established growth partnership, then finished and inspected in-house, so you get made-to-spec crystal inside a single-source relationship.",
          "Available in 2-point, 3-point, and 4-point orientation, custom sizes, and specific crystallographic faces.",
        ],
        callouts: [
          {
            title: "Why CVD single crystal",
            body: "For single-point tools, orientation and clarity decide the finished part. Natural diamond cannot supply that consistently; every stone is different. CVD single crystal is grown to a defined orientation with low dislocation density, so the cutting edge behaves the same tool to tool. That predictability is why it dresses and shapes optical surfaces, turns contact lenses to sub-micron tolerance, and machines luxury watch components.",
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Single-point diamond dressing tools for precision grinding wheels.",
          "Turning and fly-cutting of infrared optics such as germanium, zinc selenide, and silicon.",
          "Precision machining of contact and intraocular lenses.",
          "Luxury watch component machining.",
          "Wire-drawing dies for fine wire.",
        ],
        applicationsNote:
          "Applications where surface finish and edge geometry are the specification, not a by-product.",
        specsTitle: "CVD single crystal specifications",
        specs: [
          { label: "Type", value: "CVD single crystal, white, mechanical grade" },
          {
            label: "Orientations",
            value: "2-point, 3-point, 4-point; ⟨100⟩, ⟨110⟩, ⟨111⟩",
          },
          { label: "Custom shapes / faces", value: "Available to spec" },
        ],
        specsNote:
          "**Grown to your specification.** Every crystal is grown to the orientation, size, and face you specify, then inspected here for clarity, orientation accuracy, and dislocation density before it ships. If your application needs a face or geometry outside the standard set, send the drawing and we will confirm feasibility and lead time.",
        datasheet: "CVD Single Crystal datasheet",
      },
      {
        id: "mcd",
        label: "MCD",
        title: "MCD, high-pressure high-temperature monocrystalline diamond.",
        intro: [
          "MCD is grown under high pressure and high temperature into a single, defect-controlled crystal with predictable edge geometry and wear behaviour. It is the reproducible alternative to natural diamond for single-point and precision tooling, giving the tool maker the same edge order after order.",
          "EID supplies MCD in a range of sizes, shapes, and orientations for turning, dressing, wire drawing, and scribing. Standard grades and made-to-spec crystals both available.",
        ],
        callouts: [
          {
            title: "Where MCD fits among single crystals",
            body: "MCD, CVD single crystal, and natural diamond all give a single crystal, and each suits a different job. MCD (HPHT) offers reproducible edge geometry at a lower cost than CVD, which makes it the workhorse for single-point turning and dressing where you need consistency across many tools. [CVD single crystal](#cvd) is grown to a specified orientation for the most demanding optical and precision work. Natural stone still has a place in specific dressing applications. The guide walks through each: [CVD, HPHT (MCD), and natural diamond compared](/resources).",
          },
        ],
        applicationsTitle: "Typical Applications",
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
          { label: "Custom shapes", value: "Available to spec" },
        ],
        datasheet: "MCD datasheet",
      },
    ],
    quality:
      "Every CVD crystal is inspected for clarity, orientation accuracy, and dislocation density, and every MCD grade is checked against its specification for shape, size, and orientation, before anything ships. The quality system is ISO 9001 certified, with documentation per order. The reason to choose grown or HPHT single crystal over natural stone is reproducibility, so that is what our QC verifies.",
    qualityCta: "See how our QC works",
    cta: "Request a Custom Quote",
    crossLinks: [
      {
        title: "On this page",
        links: [
          { label: "CVD single crystal", href: "#cvd" },
          { label: "MCD", href: "#mcd" },
        ],
      },
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
    crossApplications: ["tool-and-die", "semiconductor-electronics", "polishing-lapping"],
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
      "EID supplies two polycrystalline diamond products for two different jobs. PCD discs and blanks are the starting material for cutting-tool inserts that machine non-ferrous and abrasive materials. CVD polycrystalline logs true and dress grinding wheels. Both are finished superabrasive forms beyond powder, and both come from one supplier.",
      "Jump to [PCD blanks](#pcd-blanks) or [CVD dressing logs](#dressing-logs), or tell us the operation and we will point you to the right form.",
    ],
    sections: [
      {
        id: "pcd-blanks",
        label: "PCD Discs & Blanks",
        title: "PCD discs and blanks for cutting-tool inserts.",
        intro: [
          "PCD discs and blanks are the starting material for insert makers machining non-ferrous and abrasive materials. Diamond grains are sintered under high pressure onto a carbide substrate, giving a cutting material far harder and more wear-resistant than carbide alone, supplied ready to be laser-cut or EDM-cut into finished inserts. EID supplies PCD in a range of diameters, thicknesses, grain sizes, and grades.",
          "Where diamond powder goes into a tool as an abrasive, PCD goes in as a cutting edge. It is the non-ferrous counterpart to [PCBN](/products/cbn#pcbn), which does the same job on hardened ferrous parts.",
        ],
        callouts: [
          {
            title: "Where PCD fits",
            body: [
              "PCD machines materials that wear carbide out fast but are not ferrous: aluminium and aluminium alloys, copper and brass, carbon and glass-fibre composites, wood-based panels, and abrasive plastics. It holds a sharp edge far longer than carbide in these materials, which is what makes it economic for high-volume runs despite the higher tool cost.",
              "Grain size sets the trade-off: coarser grains resist wear and suit abrasive, interrupted work; finer grains take a keener edge and give a better finish. The grade follows the material and the finish, which is the first thing to specify.",
              "Do not use PCD on ferrous materials; diamond reacts with iron at cutting temperature. For hardened steel and cast iron, [PCBN](/products/cbn#pcbn) is the right blank.",
            ],
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Turning, milling, and boring inserts for aluminium powertrain and structural components.",
          "Machining of aluminium airframe and structural parts.",
          "High-volume machining of composites for aerospace and wind energy.",
          "Cutting-tool inserts for wood-based panel and abrasive-plastic production.",
        ],
        applicationsNote:
          "Non-ferrous, high-volume work where edge life per insert drives cost per part.",
        specsTitle: "PCD specifications",
        specs: [
          { label: "Form", value: "Discs and blanks" },
          { label: "Custom grades", value: "Available to spec" },
        ],
        datasheet: "PCD datasheet",
      },
      {
        id: "dressing-logs",
        label: "CVD Dressing Logs",
        title: "CVD polycrystalline dressing logs, for truing and dressing wheels.",
        intro: [
          "CVD polycrystalline diamond logs true and dress conventional and superabrasive grinding wheels. The crystal structure is randomly oriented, so the log is equally hard in every direction, with no weak planes and no preferential wear. That gives more consistent, longer-lasting dressing than a natural stone, which wears along its cleavage.",
          "EID supplies the logs in standard and custom sizes, made to specification through our CVD growth partnership and finished in-house. Available in black polycrystalline grade.",
        ],
        callouts: [
          {
            title: "Why a polycrystalline log dresses better",
            body: "A natural diamond is a single crystal with cleavage planes, so it wears unevenly and can chip along a plane under load. A CVD polycrystalline log is built from countless small, randomly oriented crystals with no shared cleavage direction. As it dresses, it presents a uniform, self-renewing surface in every orientation, which holds the dressing action consistent and the log lasting. For form dressing and CNC grinding centres, that consistency is what holds the wheel profile true across a run.",
          },
        ],
        applicationsTitle: "Typical Applications",
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
          { label: "Custom sizes / shapes", value: "Available to spec" },
          { label: "Crystal structure", value: "Randomly oriented, isotropic hardness" },
        ],
        datasheet: "CVD Polycrystalline datasheet",
      },
    ],
    quality:
      "Every PCD grade is checked against its specification for grain size, substrate, and dimensional tolerance, and every CVD log is inspected for dimensions and structure, before shipping. The quality system is ISO 9001 certified, with documentation per order. For an insert maker, a blank that matches the last order keeps insert performance repeatable; for a dressing operation, a log that matches the last one keeps the wheel profile true.",
    qualityCta: "See how our QC works",
    cta: "Request a Quote",
    crossLinks: [
      {
        title: "On this page",
        links: [
          { label: "PCD discs & blanks", href: "#pcd-blanks" },
          { label: "CVD polycrystalline dressing logs", href: "#dressing-logs" },
        ],
      },
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
      "Natural diamond tool stones, selected for precision dressing and single-point applications.",
      "EID supplies natural diamond tool stones for dressing, turning, and single-point applications. Each stone is inspected and selected in-house for crystal quality, orientation, and freedom from inclusions, because those directly affect the performance and life of a single-point tool.",
      "Available as rough stones for setting by the tool maker, or shaped to your specification. This is enquiry-led material, so the conversation usually starts with your application rather than a fixed catalogue.",
    ],
    sections: [
      {
        id: "tool-stones",
        label: "Natural Tool Stones",
        title: "Natural diamond tool stones.",
        intro: [
          "Selected stone by stone rather than graded to a catalogue line, so the recommendation starts from your dressing or single-point operation.",
        ],
        callouts: [
          {
            title: "Natural stone or a synthetic?",
            body: "Natural tool stones are tough and well suited to specific dressing and single-point jobs, and every stone is individual, which is both their character and their variability. Where you need reproducibility across many identical tools, [MCD](/products/single-crystal#mcd) gives a defect-controlled, repeatable edge, and [CVD polycrystalline logs](/products/polycrystalline-diamond#dressing-logs) give uniform hardness for rotary and form dressing. We supply all three, so the recommendation follows your operation rather than what we happen to stock.",
          },
        ],
        applicationsTitle: "Typical Applications",
        applications: [
          "Single-point dressing of conventional grinding wheels in aluminium oxide and silicon carbide.",
          "Turning and profiling of non-ferrous and non-metallic materials.",
          "Specialty tooling where natural diamond's edge retention and thermal conductivity are the reason to choose it over a synthetic.",
        ],
        applicationsNote:
          "Natural stone still holds its place in dressing operations that suit its toughness.",
        specsTitle: "Specifications",
        specs: [
          { label: "Shapes", value: "Rough, octahedral, macle, or shaped to drawing" },
          { label: "Setting", value: "Supplied loose for setting, or shaped to spec" },
        ],
        enquiryCta: { label: "Enquire about tool stones", href: "/contact" },
      },
    ],
    quality:
      "Because each stone is individual, selection is the quality step: every stone is inspected for crystal quality, orientation, and inclusions before it is matched to your application. The quality system is ISO 9001 certified. Where you need documented consistency across a batch, we will tell you honestly whether natural stone or a synthetic alternative is the better fit.",
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
    metaTitle: "Polycrystalline Diamond Powder | Micron Polishing Grades | EID",
    metaDesc:
      "Detonation-synthesis polycrystalline diamond micron powder for the most demanding polishing. Rounded, no-cleavage particles for a finer, uniform finish.",
    eyebrow: "Products · Group 8",
    cardDesc:
      "Engineered polycrystalline powders for precision polishing, lapping, and advanced material finishing.",
    overviewDesc:
      "Polycrystalline diamond powder for precision polishing, lapping, and advanced surface finishing.",
    intro: [
      "Polycrystalline diamond micron powder, for the finest polish.",
      "Polycrystalline diamond powder is made by detonation synthesis, which produces rounded, multi-crystalline particles with no cleavage planes. During polishing, controlled fracture exposes fresh micro-cutting edges rather than letting the particle wear flat, so it polishes finer and more uniformly than monocrystalline powder of the same size. It is the grade for the most demanding polishing and lapping work.",
      "EID supplies it from sub-micron up, in dry powder, suspension, and paste. Tell us the material and the finish and we will match the grade and format.",
    ],
    sections: [
      {
        id: "polycrystalline-powder",
        label: "Polycrystalline Powder",
        title: "Why the polycrystalline particle polishes finer.",
        intro: [
          "A monocrystalline particle has cleavage planes and sharp corners; under pressure it can plough the surface and leave fine scratches. A detonation-synthesis polycrystalline particle is rounded and built from countless tiny crystals with no cleavage direction. Rather than gouging, it breaks down gradually into fresh cutting points, which produces a lower, more uniform surface roughness. Where the specification is measured in nanometers of Ra, that is the reason to choose this powder.",
        ],
        applicationsTitle: "Typical Applications",
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
          { label: "Crystal type", value: "Polycrystalline, rounded, no cleavage" },
          { label: "Formats", value: "Dry powder, water or oil suspension, paste" },
        ],
        datasheet: "Polycrystalline Powder datasheet",
      },
    ],
    quality:
      "Particle size distribution is measured on every batch, with controlled D50 and span, because in final polishing a single oversized particle can scratch the workpiece and cost the whole part. The quality system is ISO 9001 certified, with a certificate of analysis per lot on request. Control at the top of the distribution is what protects the surface, and that is what our micron QC verifies.",
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
