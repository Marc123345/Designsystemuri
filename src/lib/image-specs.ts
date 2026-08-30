/**
 * Photography specs, attached to the placeholder they describe.
 *
 * Every empty image slot on the site carries a numbered pin. Clicking it opens
 * the spec for that exact slot: what the shot is, what has to be in frame, what
 * to avoid, and whether it blocks launch. The brief is therefore read in place,
 * standing in front of the gap it fills, rather than in a document that has to
 * be cross-referenced against a page.
 *
 * Written to be actionable by someone holding a camera on the factory floor, not
 * by a art director. Each spec says what the subject is, what must be visible
 * for the image to do its job, and the specific mistake that would make it
 * unusable — because "a photo of the lab" comes back as an empty room, and an
 * empty room does not evidence anything.
 *
 * Keyed by the Wireframe `label`. Slots without an entry fall back to
 * DEFAULT_SPEC, so a new placeholder is never unexplained.
 *
 * Labels pass through t(locale, …) on some slots, so on a non-English locale the
 * key misses and the default is shown. Reviewers work in English; not worth
 * translating a review layer.
 *
 * REVIEW ONLY, like the rest of the annotation layer. Removing
 * <AnnotationLayer /> from app/[locale]/layout.tsx takes this with it.
 */

export type ImageSpec = {
  /** The subject, in one sentence. */
  shot: string
  /** What must be visible for the image to do its job. */
  inFrame: string[]
  /** The specific mistake that makes this shot unusable. */
  avoid: string
  /** Where it appears and what it has to prove. */
  why: string
  orientation: 'Landscape' | 'Portrait' | 'Square-ish' | 'Wide (21:9)'
  priority: 1 | 2 | 3
}

export const PRIORITY_LABEL: Record<1 | 2 | 3, string> = {
  1: 'Priority 1 — blocks launch',
  2: 'Priority 2 — wanted for launch',
  3: 'Priority 3 — can follow later',
}

export const DEFAULT_SPEC: ImageSpec = {
  shot: 'Real work in progress — material, equipment or hands mid-process.',
  inFrame: ['Actual EID material or equipment', 'Evidence of the work happening, not just the tools at rest'],
  avoid: 'Staged arrangements, empty rooms, and anything with text or graphics in frame.',
  why: 'Placeholder without a specific spec yet — ask Marc before shooting.',
  orientation: 'Landscape',
  priority: 3,
}

/* ------------------------------------------------------------------ */
/* Facility — these fill section backgrounds across six pages          */
/* ------------------------------------------------------------------ */

const facility: Record<string, ImageSpec> = {
  'Hero image — diamond grit / production floor, London': {
    shot: 'Diamond grit in volume, or the production floor working. The single strongest image EID owns.',
    inFrame: [
      'Either: grit or powder in quantity — a tray, a scoop, a batch being handled — close enough that the individual crystals read',
      'Or: the floor mid-run, with a person in it',
      'Space on the left third that is relatively plain, because the headline sits over it',
    ],
    avoid: 'A busy centre. Text is overlaid on the left, so a subject dead-centre fights it. Also avoid anything so tight it cannot crop to 21:9.',
    why: 'The first thing every visitor sees, in all eight languages. It sets whether EID reads as a manufacturer or a trading company.',
    orientation: 'Wide (21:9)',
    priority: 1,
  },
  'Background image — QC laboratory': {
    shot: 'The QC laboratory as a room, with work happening in it.',
    inFrame: ['The bench and instruments in context, not one machine in isolation', 'At least one person working', 'Enough depth that the room reads as a real lab rather than a cupboard'],
    avoid: 'An empty room. It sits behind text at low opacity, so a cluttered or high-contrast centre makes the copy unreadable.',
    why: 'Used behind the QC band on the home, product and quality pages. One shot covers all three.',
    orientation: 'Wide (21:9)',
    priority: 1,
  },
  'Background image — QC laboratory, London': {
    shot: 'The QC laboratory as a room, with work happening in it.',
    inFrame: ['Same brief as the other QC laboratory background'],
    avoid: 'An empty room, or a busy centre that fights the overlaid copy.',
    why: 'Same shot as the other QC laboratory background — one image serves both slots.',
    orientation: 'Wide (21:9)',
    priority: 1,
  },
  'Background image — production floor, London': {
    shot: 'The production floor: natural diamond grit being crushed and graded.',
    inFrame: ['The crushing or grading equipment actually running', 'An operator', 'Material visible somewhere in shot — in a tray, a hopper, or in hand'],
    avoid: 'A clean, empty, end-of-shift floor. The point is that manufacturing happens here.',
    why: 'This is the in-house manufacturing claim made visible. Every competitor can say "we supply"; this is what says "we make".',
    orientation: 'Wide (21:9)',
    priority: 1,
  },
  'EID production floor, London — crushing and grading of natural diamond grit': {
    shot: 'The production floor, shown large — crushing and grading of natural diamond grit.',
    inFrame: ['Equipment mid-process', 'Hands or an operator', 'Material at some stage of being processed'],
    avoid: 'Anything soft or low-light. This runs at full width on the About page, so it is the one facility shot where sharpness matters.',
    why: 'The About page turns on the graduated production claim — natural made in-house, synthetic made to spec elsewhere. This image carries the first half.',
    orientation: 'Wide (21:9)',
    priority: 1,
  },
  'EID in-house QC laboratory — particle size distribution and morphology testing': {
    shot: 'Particle size distribution or morphology testing actually being run.',
    inFrame: ['The instrument in use, with a sample loaded', 'An operator reading or setting it', 'Ideally the screen or output visible, even if not legible'],
    avoid: 'A photo of an unattended instrument. The claim is that EID tests every lot; an idle machine does not show that.',
    why: 'Backs the "tested in our own laboratory" line that appears on every product page.',
    orientation: 'Wide (21:9)',
    priority: 2,
  },
  'Background image — tool maker at work': {
    shot: 'A tool maker using EID material, or EID material going into a tool.',
    inFrame: ['A workshop or production setting', 'Tooling being made or used', 'Hands at work'],
    avoid: 'Anything identifying a customer without their permission — logos, name boards, job sheets.',
    why: 'Sits behind the applications index. It shows EID material at the point it becomes someone else’s product.',
    orientation: 'Wide (21:9)',
    priority: 2,
  },
  'Background image — application in production': {
    shot: 'Material or tooling in a production environment, generic enough to sit under any industry.',
    inFrame: ['A production setting with real work in it'],
    avoid: 'Anything tied to one specific industry — this same image sits behind all six application pages, so a dental shot under the aerospace page would jar.',
    why: 'Shared background across all six application pages.',
    orientation: 'Wide (21:9)',
    priority: 2,
  },
  'Background image — particle sizing bench': {
    shot: 'The micron sizing bench, wide.',
    inFrame: ['The bench with its instruments', 'Ideally someone working at it'],
    avoid: 'A tight crop on one instrument — this is a background and needs width.',
    why: 'Background for the micron QC page.',
    orientation: 'Wide (21:9)',
    priority: 3,
  },
  'Background image — sieve grading bench': {
    shot: 'The mesh grading bench, wide.',
    inFrame: ['Sieve stacks and the shaker in context', 'Ideally someone working at it'],
    avoid: 'A tight crop — this is a background and needs width.',
    why: 'Background for the mesh QC page.',
    orientation: 'Wide (21:9)',
    priority: 3,
  },
}

/* ------------------------------------------------------------------ */
/* Applications — the biggest gap on the site                          */
/* ------------------------------------------------------------------ */

const applicationShot = (industry: string, subject: string, inFrame: string[], why: string): ImageSpec => ({
  shot: subject,
  inFrame,
  avoid: 'Customer logos, name boards or job paperwork unless you have their permission. If the finished tool cannot be shown, photograph the EID material that goes into it instead — that works just as well here.',
  why: `${why} Used twice: as the ${industry} card on the home and applications pages, and as the main image on the ${industry} page itself.`,
  orientation: 'Landscape',
  priority: 1,
})

const applications: Record<string, ImageSpec> = {
  Dental: applicationShot(
    'Dental',
    'Dental burs, rotary instruments or diamond discs — the tools EID natural grit and metal bond powder go into.',
    ['A set or tray of burs, or a single bur close enough that the diamond surface reads', 'Ideally the working end in focus', 'Scale of some kind — a hand, a holder, or several together'],
    'A dental instrument buyer needs to see EID understands their product, not just powder.',
  ),
  'Semiconductor & Advanced Electronics': applicationShot(
    'Semiconductor',
    'Wafer dicing, lapping or polishing — where fine micron and polycrystalline powders are used.',
    ['A wafer, substrate or dicing blade', 'The process in progress if possible', 'Clean, controlled surroundings — this sector reads cleanliness as competence'],
    'This is the most tolerance-sensitive sector EID serves; the image has to look precise.',
  ),
  'Automotive & Aerospace': applicationShot(
    'Automotive & Aerospace',
    'Hardened steel grinding or hard-turning with CBN, or PCD cutting aluminium or composites.',
    ['A grinding wheel, insert or turning tool in cut, or immediately after', 'Swarf or a finished surface if the machine cannot be shot running', 'The component being worked, if it can be shown'],
    'Buyers here qualify suppliers on documentation and consistency; the image should look like a controlled process, not a workshop.',
  ),
  'Tool & Die': applicationShot(
    'Tool & Die',
    'Cutting, dressing or precision tooling using single crystal, MCD or PCD/PCBN blanks.',
    ['A dresser, single-point tool or PCD/PCBN blank', 'Ideally mounted in the tool rather than loose', 'Close enough to see the diamond'],
    'This sector buys the highest-value products in the range.',
  ),
  'Grinding, Cutting, Sawing & Drilling': applicationShot(
    'Grinding & Cutting',
    'Segments, wheels or drill bits — the heavy end of the range in use.',
    ['A saw segment, grinding wheel or core bit', 'Cutting in progress if possible, or the tool against the material it cuts', 'Scale — these are larger products and should not look like the micron shots'],
    'The highest-volume application EID serves.',
  ),
  'Polishing & Lapping': applicationShot(
    'Polishing & Lapping',
    'Fine or optical finishing using micron and polycrystalline powders.',
    ['A lapping plate, polishing pad, or a finished optical surface', 'Slurry or compound if it is part of the process', 'The finish itself — a reflective surface reads well here'],
    'The finish is the product in this sector, so the image should show a result rather than only a machine.',
  ),
}

// The application pages label the same slot differently, so both keys resolve.
for (const name of Object.keys(applications)) {
  applications[`Application image — ${name}`] = applications[name]
}

/* ------------------------------------------------------------------ */
/* Product groups — shoot all eight as one matched set                 */
/* ------------------------------------------------------------------ */

const MATCHED_SET =
  'Shoot all eight product groups in one session: same background, same lighting, same distance, same angle. The existing tool stones shot — rough stones on plain mid-grey — is the reference to match. Mixed backgrounds are exactly what currently makes the range read as several different suppliers rather than one company.'

const productShot = (name: string, subject: string, inFrame: string[], priority: 1 | 2 = 2, extraAvoid = ''): ImageSpec => ({
  shot: subject,
  inFrame: [...inFrame, 'Material filling most of the frame — this renders as a square tile and gets cropped', 'Plain, even background, matched across all eight'],
  avoid: `${extraAvoid}${extraAvoid ? ' ' : ''}Scanned documents, charts or size tables — those are not photographs and are unreadable at card size. Also avoid coloured backgrounds that differ between products.`,
  why: `${MATCHED_SET} ${name} appears as a card on the home page and as the lead image on its own product page.`,
  orientation: 'Square-ish',
  priority,
})

const products: Record<string, ImageSpec> = {
  'Natural Diamond Grit & Powder': productShot('Natural grit', 'Natural diamond grit and micron powder — a representative sample.', [
    'Enough magnification that individual crystals and their shape read',
    'If possible, two sizes side by side to show the range',
  ]),
  CBN: productShot('CBN', 'CBN crystals — a representative sample.', ['Close enough that the amber colour and crystal form are obvious', 'The colour is the recognisable thing about CBN; do not wash it out']),
  'Single Crystal Diamond (CVD & MCD)': productShot(
    'Single crystal',
    'CVD and MCD single crystal plates.',
    ['Several plates, showing the cut faces', 'Light raked so the transparency and edges read'],
    2,
    '⚠ This note used to say the file here was a scanned partner sales flyer. That has not been true since the card set was regenerated — the slot holds a tray of CVD and MCD plates under tweezers, which works. A wide lab-bench alternative was tried and rejected for cropping to empty bench at 4:5. Downgraded from 1 to 2: a better shot is wanted, not blocking.',
  ),
  'Natural Tool Stones': productShot('Tool stones', 'Rough and shaped natural tool stones.', ['A handful of stones, showing both rough and shaped', 'The existing shot of these is the reference for the whole set']),
  'Metal Bond Diamond': productShot('Metal bond', 'Metal bond diamond — a representative sample.', ['Close enough to see the coating', 'If coated and uncoated can be shown together, better']),
  'Resin Bond Diamond': productShot('Resin bond', 'Resin bond diamond — a representative sample.', ['Close enough to see the friable, multi-crystalline structure', 'The green-yellow colour is characteristic; keep it accurate']),
  'Polycrystalline Diamond (CVD & PCD)': productShot(
    'PCD',
    'PCD blanks and CVD dressing logs.',
    ['Several blanks or logs together', 'The granular sintered surface visible'],
    2,
    '⚠ This note used to say the file here was a grade-selection table. That has not been true since the card set was regenerated — the slot holds blanks and inserts on a white bench, which works. A wide lab-bench alternative that also showed CVD dressing logs was tried and rejected for cropping to empty bench at 4:5; the dressing logs are still missing from the shot that ships. Downgraded from 1 to 2: a better shot is wanted, not blocking.',
  ),
  'Polycrystalline Diamond Powder': productShot('Polycrystalline powder', 'Polycrystalline micron powder.', [
    'Powder in quantity — a dish or a mound rather than a scatter',
    'If shot under magnification, no instrument readout burned into the frame',
  ]),
}

/* ------------------------------------------------------------------ */
/* Evidence records, QC steps and documents                            */
/* ------------------------------------------------------------------ */

const evidence: Record<string, ImageSpec> = {
  'Particle size distribution — D50 and span curve': {
    shot: 'A real D50 and span curve — on the analyser screen, or printed.',
    inFrame: ['The curve itself, filling most of the frame', 'Enough of the instrument or paper that it reads as real output rather than a stock graphic'],
    avoid: 'A made-up chart. The whole section argues that EID measures this; a fake curve undoes it. Redact a customer name if one is on the report.',
    why: 'Sits opposite the "particle size distribution" variable in the problem sequence on the home page. It is the evidence for that claim.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Crystal morphology — microscopy against the grade spec': {
    shot: 'A microscopy image being checked against the grade specification.',
    inFrame: ['The microscopy image or the scope view', 'The spec sheet or screen it is being compared to, if both can be in shot'],
    avoid: 'A bare microscope with nothing on it. The comparison is the point.',
    why: 'Evidence for the "crystal shape and friability" variable on the home page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Coating weight assay — target percentage per batch': {
    shot: 'A coating weight check in progress, or the result against target.',
    inFrame: ['The balance, assay or readout', 'The coated material if it can be included'],
    avoid: 'An empty bench.',
    why: 'Evidence for the "coating weight and coverage" variable on the home page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Certificate of analysis — sample lot': {
    shot: 'A certificate of analysis for a sample lot.',
    inFrame: ['The document, angled on a desk rather than scanned flat', 'The EID letterhead visible'],
    avoid: 'Showing a customer’s name or order number — redact or use a sample lot. A flat scan reads as a PDF; a photo on a desk reads as a working document.',
    why: 'Evidence for the "lot-to-lot variance" variable on the home page, and the COA claim appears on every product page.',
    orientation: 'Landscape',
    priority: 2,
  },

  'ISO 9001 certificate — scan pending from Uri': {
    shot: 'The ISO 9001 certificate.',
    inFrame: ['The whole certificate, square on', 'Certificate number, scope and issuing body all legible'],
    avoid: 'Angle, glare or a partial crop. This is the one image on the entire site where the text genuinely has to be readable.',
    why: 'The quality page rests on this credential, and procurement departments look for it specifically. A blurry certificate is worse than none.',
    orientation: 'Portrait',
    priority: 1,
  },

  'Incoming inspection — lab photo pending from Uri': {
    shot: 'Raw material arriving and being checked in.',
    inFrame: ['Incoming containers or sacks', 'The check being performed — sampling, weighing, logging', 'A person doing it'],
    avoid: 'A shot of boxes with nobody there. Shoot all five QC stages in one walk-through so they look like one process.',
    why: 'First of the five QC stages shown in sequence on the quality page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'In-process control — production floor photo pending from Uri': {
    shot: 'A check being made on the floor, mid-run.',
    inFrame: ['The production equipment running', 'A sample being taken or measured mid-process'],
    avoid: 'Breaking visual style from the other four QC stages.',
    why: 'Second of the five QC stages on the quality page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Final QC — laboratory photo pending from Uri': {
    shot: 'The laboratory check before a lot is released.',
    inFrame: ['The lab instrument in use', 'The sample being tested', 'The operator'],
    avoid: 'Breaking visual style from the other four QC stages.',
    why: 'Third of the five QC stages on the quality page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Certificate of analysis — document photo pending from Uri': {
    shot: 'A certificate of analysis being produced, printed or signed.',
    inFrame: ['The document and the hand or screen producing it'],
    avoid: 'Customer-identifying detail. Redact or use a sample lot.',
    why: 'Fourth of the five QC stages on the quality page.',
    orientation: 'Landscape',
    priority: 2,
  },
  'Retention samples — sample store photo pending from Uri': {
    shot: 'The retention sample store.',
    inFrame: ['Shelving with depth — rows of samples receding', 'Labels visible, even if not legible', 'Ideally a hand retrieving one'],
    avoid: 'A single sample jar on a bench. The volume is the proof: it shows EID can go back to a lot from months ago.',
    why: 'Fifth of the five QC stages. This one substantiates a claim customers actually test — "can you show me the material from that order".',
    orientation: 'Landscape',
    priority: 2,
  },

  /* ⚠ The four instrument slots below are FILLED as of this pass — the mesh-QC
     and micron-QC pages now render LabPhoto rather than a Wireframe, so these
     keys no longer resolve to anything on the site. They are kept because the
     brief is what the replacement has to beat: the images in the slots today
     are illustrative, and the day Uri sends photographs of EID's own bench,
     these are the shots to ask him for. */
  'Calibrated sieve stack & shaker — lab photo pending from Uri': {
    shot: 'The calibrated sieve stack assembled on the shaker, ideally running.',
    inFrame: ['The full stack, showing several mesh sizes', 'The shaker', 'Calibration labels or certificates if visible'],
    avoid: 'A single loose sieve.',
    why: 'The mesh QC page explains how mesh grading is verified; this is the equipment that does it.',
    orientation: 'Landscape',
    priority: 3,
  },
  'Optical & stereo microscopy — lab photo pending from Uri': {
    shot: 'The optical or stereo microscope, with someone using it.',
    inFrame: ['The scope', 'An operator at the eyepiece or screen', 'A sample loaded'],
    avoid: 'An unattended instrument.',
    why: 'Shows how crystal shape is verified on the mesh QC page.',
    orientation: 'Landscape',
    priority: 3,
  },
  'Laser diffraction analyser — lab photo pending from Uri': {
    shot: 'The laser diffraction analyser, ideally mid-measurement.',
    inFrame: ['The instrument', 'The screen or output if visible', 'A sample being run'],
    avoid: 'An unattended instrument.',
    why: 'The micron QC page turns on this instrument — it is how micron sizing is verified.',
    orientation: 'Landscape',
    priority: 3,
  },
  'Particle counter — lab photo pending from Uri': {
    shot: 'The particle counter in use.',
    inFrame: ['The instrument', 'A sample being run'],
    avoid: 'An unattended instrument.',
    why: 'Second verification method shown on the micron QC page.',
    orientation: 'Landscape',
    priority: 3,
  },
}

/* ------------------------------------------------------------------ */

const pillarShot = (subject: string, inFrame: string[], why: string): ImageSpec => ({
  shot: subject,
  inFrame,
  avoid: 'Anything abstract or stock-like. These sit beside hard claims, so they have to look like EID rather than like an idea.',
  why,
  orientation: 'Wide (21:9)',
  priority: 3,
})

const pillars: Record<string, ImageSpec> = {
  'Accountability — supporting image': pillarShot(
    'Production being controlled — a decision being made, not just a machine running.',
    ['A person inspecting, adjusting or rejecting something', 'The material or equipment they are working on'],
    'Sits beside the claim that EID controls production and the quality decision.',
  ),
  'Consistency — supporting image': pillarShot(
    'The same grade being measured across two batches.',
    ['Two samples or two lots together', 'The measurement being taken', 'Ideally the record being written'],
    'Sits beside the claim that ordering the same grade twice gets the same grade twice.',
  ),
  'Breadth — supporting image': pillarShot(
    'The range together in one frame — grit, powder and crystal side by side.',
    ['At least four distinct product types together', 'Arranged so the variety is obvious at a glance'],
    'Sits beside the claim that EID covers the whole range from one facility.',
  ),
}

export const imageSpecs: Record<string, ImageSpec> = {
  ...facility,
  ...applications,
  ...products,
  ...evidence,
  ...pillars,
}

export const getImageSpec = (label: string): ImageSpec => imageSpecs[label] ?? DEFAULT_SPEC
