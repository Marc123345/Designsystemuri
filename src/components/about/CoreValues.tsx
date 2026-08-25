import PhotoCard from '@/components/PhotoCard'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * Four values, four columns — Strauss's layout, EID's words.
 *
 * Uri, F1/F2, on Strauss's Our Core Values block: "all their values match ours
 * … that's really us", and the instruction was to copy the layout. Their four
 * are Innovation, Family, Excellence, Precision, set as four plain columns of
 * a heading and a short paragraph on a white ground, with nothing else in the
 * section. That is what this is.
 *
 * ── ⚠ One open decision: Precision, or Service? ─────────────────────────────
 *
 * His note allows for swapping one of the four for **Service**. Precision is
 * kept for now on the argument that it is the one value the rest of this site
 * actually evidences — the Quality page is four controls' worth of it — while
 * Service is a claim with nothing behind it on any page. If he wants Service
 * in, the honest swap is Family out rather than Precision: Family and Service
 * are both about how EID deals with people, and Precision is about the
 * material. That is his call, and it is a two-line change in the table below.
 *
 * The copy is written for EID rather than adapted from Strauss's, because
 * Strauss's paragraphs describe Strauss — a dental and industrial tool maker,
 * not a superabrasive supplier — and four sentences lifted off a competitor's
 * About page is the one thing on this site that would be recognisable as
 * lifted.
 */
const VALUES = [
  {
    name: 'Innovation',
    body: 'Fifty-five years in, the range still grows with what tool makers ask for: new coatings, tighter classifications, crystal grown to a specified orientation. If the specification does not exist yet, that is the conversation to have.',
    image: '/eid/facility/crystal-microscopy.png',
    alt: 'Diamond crystals under the microscope during morphology inspection',
  },
  {
    name: 'Family',
    body: 'A small team that has been doing this a long time, and mostly the same people year after year. The person who answers a specification question is the person who grades against it — which is why the answer comes back the same twice.',
    image: '/eid/facility/diamond-grading-loupe.png',
    alt: 'A grader examining diamond grit through a loupe',
  },
  {
    name: 'Excellence',
    body: 'Built to perform, and documented so you can prove it. ISO 9001, a certificate of analysis per lot, a retention sample kept from every batch, and traceability from incoming raw material through to the lot that shipped.',
    image: '/eid/qc-samples.jpg',
    alt: 'A laboratory shelf of retention sample jars, one kept from every batch',
  },
  {
    name: 'Precision',
    body: 'Where microns are the unit of the argument. Every batch is measured rather than sampled and assumed, because a grade you have to re-qualify on each order is not a grade you can build a production run around.',
    /* Was the SEM micrograph, which was the literal reading of "microns" but
       the wrong picture: an abstract grey texture that says nothing about
       measuring. This is the optical measurement rig with a crystal magnified
       on screen and its dimensions read out beside it — a machine in the act of
       measuring, which is what the paragraph is actually claiming. */
    image: '/eid/qc-inspection.jpg',
    alt: 'An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside',
  },
]

/* Span per tile. 7/5 alternating, inverted on the second row: no two adjacent
   tiles share a width and the row break lands in a different place each time.
   A 2x2 of equal boxes is a grid; this is a composition. */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7']

const CoreValues = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="core-values" className="py-16 lg:py-24">
      <div className="container">
        {/* Heading plus a one-line subtitle, which is Strauss's shape — theirs
            reads "Driving Technological Excellence to Deliver Superior
            Products" under "OUR CORE VALUES". The subtitle is what stops four
            abstract nouns arriving with no frame around them. */}
        <h2 className="text-[28px] font-bold md:text-[34px] lg:text-[38px]">{t(locale, 'Our core values')}</h2>
        <p className="text-default-600 mt-3 max-w-2xl text-[17px]">{t(locale, 'Four things that have not changed since 1970, and that a buyer can check against every order.')}</p>

        {/* ── On the site rule ──────────────────────────────────────────────
            These were white cards with the photograph beside or above the copy.
            They are PhotoCards now: the image fills the tile and the words sit
            on it, which is the rule everywhere on this site.

            The numeral went with the change. On a white card it was a quiet
            grey mark; over a photograph it would need its own contrast
            treatment to survive, and at that point it is competing with the
            heading rather than labelling the tile. PhotoCard's eyebrow slot
            carries it instead, at 11px mono — same job, no fight.

            Every photograph is still the thing its paragraph is about:
              Innovation → crystal grown and inspected for orientation
              Family     → the grader the copy says answers your call
              Excellence → the retention samples kept from every batch
              Precision  → an SEM micrograph, microns with a scale bar */}
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12">
          {VALUES.map((v, i) => (
            <PhotoCard
              key={v.name}
              className={SPANS[i]}
              minHeight="min-h-[340px] lg:min-h-[380px]"
              /* ⚠ `heavy` for contrast, not for looks. Found while auditing
                 /quality after its photographs changed: these four cards were
                 the WORST on the site, with the eyebrow numerals at 1.55-1.82:1
                 against the brightest part of each frame on the light scrim.
                 Raising PhotoCard's eyebrow to white/85 took them to 2.73; only
                 the heavier scrim clears 4.5:1. Two of these photographs are
                 bright by nature — a lit microscope stage and a white lab shelf
                 — so the cover has to come from the scrim. */
              weight="heavy"
              eyebrow={String(i + 1).padStart(2, '0')}
              title={t(locale, v.name)}
              body={t(locale, v.body)}
              image={v.image}
              alt={t(locale, v.alt)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoreValues
