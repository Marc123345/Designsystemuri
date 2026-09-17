/**
 * EID's published PDFs — the technical datasheets and the safety data sheets,
 * served from /public/eid/docs rather than linked back to the legacy Wix site,
 * so the new site owns its own downloads.
 *
 * Source: https://www.eid-ltd.com/datasheets and https://www.eid-ltd.com/msds.
 * Each file keeps EID's original artwork and content; only the filename changed,
 * from a Wix hash to something a customer can recognise in a downloads folder.
 *
 * Every entry here points at a file that exists. If EID revises a sheet, replace
 * the PDF at the same path and nothing else needs to change.
 */

export type Doc = {
  /** Registry key, and the product-page anchor it belongs to. */
  key: string
  title: string
  desc: string
  file: string
}

const DOCS = '/eid/docs'

export const datasheets: { group: string; sheets: Doc[] }[] = [
  {
    group: 'Natural Diamond Grit & Powder',
    sheets: [
      {
        key: 'natural-mesh',
        title: 'Natural Diamond Grit (Mesh)',
        desc: 'NS saw and MB wheel grades, blocky to sharp, with the full mesh size list.',
        file: `${DOCS}/eid-natural-mesh-datasheet.pdf`,
      },
      {
        key: 'natural-micron',
        title: 'Natural Diamond Micron Powder',
        desc: 'MB-1-UM powders for lapping and polishing, with the micron size chart.',
        file: `${DOCS}/eid-natural-micron-datasheet.pdf`,
      },
      {
        key: 'natural-rotary',
        title: 'Natural Rotary Diamond (Wholestone)',
        desc: 'WD-AAA, WD-AA and WD-A wholestone for rotary dressing and drilling.',
        file: `${DOCS}/eid-natural-rotary-diamond-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Natural Tool Stones',
    sheets: [
      {
        key: 'tool-stones',
        title: 'Natural Diamond Tool Stones',
        desc: 'Dressers, triangles, sawn points, die stones and drills, with sizes and colours.',
        file: `${DOCS}/eid-natural-tool-stones-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Metal Bond Diamond',
    sheets: [
      {
        key: 'metal-bond-mesh',
        title: 'Metal Bond Diamond (Mesh)',
        desc: 'ESN saw grades 500 to 770, graded by crystal strength.',
        file: `${DOCS}/eid-metal-bond-mesh-datasheet.pdf`,
      },
      {
        key: 'metal-bond-micron',
        title: 'Metal Bond Diamond (Micron)',
        desc: 'MB 200 to MB 500 milled powders and EGM as-grown micron, with the size chart.',
        file: `${DOCS}/eid-metal-bond-micron-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Resin Bond Diamond',
    sheets: [
      {
        key: 'resin-bond-mesh',
        title: 'Resin Bond Diamond (Mesh)',
        desc: 'EDA friable grits and EFRD-S, with sizes and nickel coating options.',
        file: `${DOCS}/eid-resin-bond-mesh-datasheet.pdf`,
      },
      {
        key: 'resin-bond-micron',
        title: 'Resin Bond Diamond (Micron)',
        desc: 'ERD-um blocky and standard powders, with the size chart.',
        file: `${DOCS}/eid-resin-bond-micron-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'CBN',
    sheets: [
      {
        key: 'cbn-mesh',
        title: 'CBN Powder (Mesh)',
        desc: 'EBN AA, EBN A and the EBN 415 hybrid-coated crystal.',
        file: `${DOCS}/eid-cbn-mesh-datasheet.pdf`,
      },
      {
        key: 'cbn-micron',
        title: 'CBN Powder (Micron)',
        desc: 'EBN-A-um amber and EBN-B-um black powders, with the size chart.',
        file: `${DOCS}/eid-cbn-micron-datasheet.pdf`,
      },
      {
        key: 'pcbn',
        title: 'PCBN Discs & Blanks',
        desc: 'ETN, EDN and ESN configurations, CBN content grades and blank dimensions.',
        file: `${DOCS}/eid-pcbn-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Single Crystal Diamond',
    sheets: [
      {
        key: 'cvd-single-crystal',
        title: 'CVD Single Crystal Diamond',
        desc: 'The Diamond Elements range, for which EID is the exclusive global sales partner.',
        file: `${DOCS}/eid-cvd-single-crystal-datasheet.pdf`,
      },
      {
        key: 'mcd',
        title: 'MCD (Monocrystalline Diamond)',
        desc: 'HPHT single crystal: shapes, qualities, dimensions and physical properties.',
        file: `${DOCS}/eid-mcd-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Polycrystalline Diamond',
    sheets: [
      {
        key: 'pcd',
        title: 'PCD Discs & Blanks',
        desc: 'Fine, medium and coarse grades in standard, extra tough and ultra tough types.',
        file: `${DOCS}/eid-pcd-datasheet.pdf`,
      },
      {
        key: 'cvd-polycrystalline',
        title: 'CVD Polycrystalline Dressing Logs',
        desc: 'DC arc plasma jet dresser blanks, HQ and SQ grades, with log dimensions.',
        file: `${DOCS}/eid-cvd-polycrystalline-datasheet.pdf`,
      },
      {
        key: 'poly-micron',
        title: 'Polycrystalline Diamond Micron Powder',
        desc: 'EDD-um and EDD-X-um shock-synthesis powders, with the size chart.',
        file: `${DOCS}/eid-polycrystalline-micron-powder-datasheet.pdf`,
      },
    ],
  },
  {
    group: 'Surface Enhancement',
    sheets: [
      {
        key: 'coatings',
        title: 'Coatings',
        desc: 'Electroless nickel (smooth and spiky), copper, and metallic PVD, with sizes and percentages.',
        file: `${DOCS}/eid-surface-enhancement-coatings-datasheet.pdf`,
      },
      {
        key: 'polish-etch-crt',
        title: 'Polish, Etch & CRT',
        desc: 'Surface polishing, etching for electroplating, and crystal rounding technology.',
        file: `${DOCS}/eid-surface-enhancement-polish-etch-crt-datasheet.pdf`,
      },
    ],
  },
]

/**
 * Safety sheets, one per material family. EID publishes three; the rest of the
 * range is covered by whichever of these three the material belongs to. We list
 * only what exists — a stale or invented safety document is a liability.
 */
export const safetySheets: Doc[] = [
  {
    key: 'msds-natural',
    title: 'Natural Diamond',
    desc: 'Natural diamond grit, micron powder, rotary diamond and tool stones.',
    file: `${DOCS}/eid-msds-natural.pdf`,
  },
  {
    key: 'msds-synthetic',
    title: 'Synthetic Diamond',
    desc: 'Metal bond, resin bond, polycrystalline, CVD and MCD diamond products.',
    file: `${DOCS}/eid-msds-synthetic.pdf`,
  },
  {
    key: 'msds-cbn',
    title: 'CBN (Cubic Boron Nitride)',
    desc: 'CBN mesh and micron powders, and PCBN blanks.',
    file: `${DOCS}/eid-msds-cbn.pdf`,
  },
]

/** Flat lookup so a product page can link straight to its own datasheet. */
export const datasheetByKey: Record<string, Doc> = Object.fromEntries(datasheets.flatMap((g) => g.sheets).map((s) => [s.key, s]))

/**
 * Maps a product page's section to its datasheet. Keyed by `${slug}:${sectionId}`
 * so the two-section pages (grit vs micron) each get the right file.
 */
const SECTION_DOCS: Record<string, string> = {
  'natural-grit-powder:grit': 'natural-mesh',
  'natural-grit-powder:micron': 'natural-micron',
  'natural-grit-powder:rotary': 'natural-rotary',
  'metal-bond:mesh': 'metal-bond-mesh',
  'metal-bond:micron': 'metal-bond-micron',
  'metal-bond:coated': 'coatings',
  'resin-bond:mesh': 'resin-bond-mesh',
  'resin-bond:micron': 'resin-bond-micron',
  'resin-bond:coated': 'coatings',
  'cbn:mesh': 'cbn-mesh',
  'cbn:micron': 'cbn-micron',
  'cbn:coated': 'coatings',
  'cbn:pcbn': 'pcbn',
  'single-crystal:cvd': 'cvd-single-crystal',
  'single-crystal:mcd': 'mcd',
  'polycrystalline-diamond:pcd-blanks': 'pcd',
  'polycrystalline-diamond:dressing-logs': 'cvd-polycrystalline',
  'tool-stones:tool-stones': 'tool-stones',
  'polycrystalline-powder:polycrystalline-powder': 'poly-micron',
}

export const getSectionDatasheet = (slug: string, sectionId: string): Doc | undefined => {
  const key = SECTION_DOCS[`${slug}:${sectionId}`]
  return key ? datasheetByKey[key] : undefined
}
