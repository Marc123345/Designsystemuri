import Backdrop from '@/components/Backdrop'
import Globe from '@/components/Globe'
import QuoteForm from '@/components/QuoteForm'
import SalesLocations from '@/components/SalesLocations'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Contact EID | Industrial Diamond & CBN Enquiries' },
    description: 'Contact EID for industrial diamond and CBN quotes, samples and technical specifications. One form, routed to someone who works with the material.',
    alternates: localeAlternates(locale, '/contact'),
  }
}

const ContactPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  // "Help me specify" leads the list so the buyer who cannot name a grade still
  // has a first-class option instead of guessing at a product family.

  return (
    <>
      {/* The shared VideoHero, on Marc's instruction that Contact carries the
          same hero as the rest of the site. Interior configuration exactly:
          48svh like About and Quality rather than the home page's 60, no
          supporting line, no scroll cue — the heading carries it.

          ── ⚠ THIS REVERSES A DELIBERATE DECISION, SO IT IS RECORDED ────────

          This page ran a compact bordered PageHero with no photograph, and the
          reason was Uri's F5/F6 note — the strictest brief on the site:
          Contact is one screen, zero scrolling, everything above the footer in
          one view. A film band spends roughly 400px of that budget before the
          reader reaches a field.

          Marc's call is the shared hero, and consistency across five pages is
          a real argument against a one-page exception. But the one-screen
          brief is Uri's and it is now definitively not met. Worth him seeing
          it rather than discovering it — and if it comes back, the fix is this
          block, not the split below, which is what bought the height back in
          the first place.

          ── The clip ────────────────────────────────────────────────────────

          The wireframe rather than the laboratory footage, for two reasons.
          The lab clip already runs on Home and Quality, and a third page would
          make it wallpaper. And this page is not about a process — it is about
          reaching the company — so the abstract brand mark is the honest
          choice where a picture of grading would be borrowed.

          `object-center` because that composition is centred by construction,
          the same reason About sets it.

          ── The lede came off ───────────────────────────────────────────────

          "Request a quote, order a sample, or ask a technical question. One
          form, routed to someone who works with the material." About and
          Quality carry a headline alone, so matching them means dropping it —
          and it was already half-duplicated by the panel below, whose eyebrow
          is literally "One form". The file has a standing note about this page
          saying the same sentence twice; this is that note being honoured
          rather than worked around. The metadata description keeps the wording
          for search. */}
      <VideoHero title={t(locale, 'Contact Us')} video="https://ik.imagekit.io/qcvroy8xpd/EID%20NEW.mp4" minHeight="min-h-[48svh]" objectPosition="object-center" />

      {/* ── THE SPLIT: the globe on the left, the ask on the right ─────────

          Marc's revision: the whole left half is one visual, and that visual is
          the globe rather than a photograph with information laid over it.

          ── What moved, and why it had to ───────────────────────────────────

          The left panel used to carry the address, four contact lines and the
          eleven territories over a photograph. All of that came off. The
          address and the contact lines are now in the right column, in dark
          type on the light ground — NOT the same components recoloured: they
          were white-on-photograph and every colour in them had to change with
          the ground.

          The eleven territories stayed on the left, as chips at the foot of the
          globe, and that pairing is deliberate. The globe shows reach — London
          hub, arcs to five continents — but it NAMES NOTHING. A buyer scanning
          for "do you sell in Taiwan" gets no answer from an arc. The picture
          and the fact have to sit together or the panel is decoration.

          ── Why <Globe> and not <GlobeSection> ──────────────────────────────

          ⚠ GlobeSection cannot go here and it is worth knowing before trying.
          It is itself a two-column layout — copy left, globe right, inside a
          full-bleed container — so dropping it into half a canvas gives two
          columns inside one column, at half the width each. What this uses is
          the <Globe> underneath it, which is standalone, square, and sizes to
          its box.

          Backdrop is the same dark surface every full-bleed band on the site
          sits on, so the panel is the site's dark ground rather than a new one.

          ── Cost, stated plainly ────────────────────────────────────────────

          This puts WebGL on the contact page. Globe defers all three.js work to
          a client effect and gates itself below 1024px, so the server render is
          two divs and a phone never starts a context — but on desktop this page
          now initialises a globe it previously did not. It is the same
          component About already pays for, and the visitor here has usually
          come from a page that loaded it. */}
      <section data-note="contact-split" className="py-12 lg:py-16">
        <div className="container">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {/* ── LEFT: the globe, and the territories it cannot name ── */}
            <div className="rounded-card relative isolate flex flex-col overflow-hidden p-6 lg:sticky lg:top-28 lg:p-8 [@media(max-height:820px)]:!static">
              <Backdrop />

              {/* The globe takes the room, the chips take the foot. `flex-1`
                  with `min-h-0` so the globe absorbs the slack rather than the
                  gap above the chips growing. */}
              <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center py-2">
                <Globe size={420} />
              </div>

              <div className="relative z-10 mt-6 border-t border-white/12 pt-6">
                <SalesLocations />
              </div>
            </div>

            {/* ── RIGHT: the form, and nothing above it ──────────────────────
                ⚠ THE HEADQUARTERS BLOCK THAT SAT HERE IS GONE, at Marc's
                request: the address, the email, phone, WhatsApp and fax rows,
                the "One form" eyebrow, the "Tell us what you need." heading and
                the form's own title and description. The card below is now the
                whole column.

                None of that contact detail is lost to the site — the footer
                carries address, phone, email and WhatsApp on every page
                including this one, and the organisation schema in the locale
                layout carries the same NAP for search. What changed is that
                this page leads with the form rather than with a directory the
                reader has already scrolled past on the way down. */}
            <div className="flex flex-col gap-8">
              <div className="border-default-200 bg-default-50 rounded-card border p-6 lg:p-10">
                {/* ⚠ sr-only, AND THAT IS THE POINT. Marc removed the visible
                    "Tell us what you need." heading from above this form, which
                    is a deliberate design decision and stays. But it was the
                    only h2 in this page's main content, so removing it left the
                    document jumping h1 -> h3 with nothing between (axe:
                    heading-order), and a screen-reader user landing here had no
                    named section for the form at all. This restores the
                    structure without restoring the words on screen. */}
                <h2 className="sr-only">{t(locale, 'Request a quote')}</h2>
                {/* `heading={false}` hides the h3 and the description; the
                    title stays as the iframe's accessible name. See QuoteForm.

                    ⚠ THE FIELDS ARE NOT IN THIS REPO — Jotform 262084626654058
                    in a cross-origin iframe. Cutting the field set down and
                    restyling the controls are both builder-side; see the note
                    in JotformEmbed. */}
                <QuoteForm formTitle={t(locale, 'Your requirement')} heading={false} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
