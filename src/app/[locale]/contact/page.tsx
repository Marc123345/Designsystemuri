import Backdrop from '@/components/Backdrop'
import Globe from '@/components/Globe'
import QuoteForm from '@/components/QuoteForm'
import SalesLocations from '@/components/SalesLocations'
import VideoHero from '@/components/VideoHero'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { Icon } from '@iconify/react'
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

            {/* ── RIGHT: who to reach, then the form ── */}
            <div className="flex flex-col gap-8">
              {/* ⚠ Dark type, not the white it carried on the photograph.
                  Moving a block off an image onto a light ground is not a
                  reposition — `text-white` here would be invisible. */}
              <div>
                {/* default-600, not the default-500 this eyebrow uses over on
                    the dark panels. On white, slate-500 measures 4.55:1 at
                    11px — it clears 4.5 by five hundredths, which is not a
                    margin, it is a rounding error. slate-600 is 7.0:1. */}
                <p className="text-default-600 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Headquarters')}</p>
                <p className="text-default-900 mt-2.5 max-w-[30ch] text-[1.05rem] leading-snug font-semibold">{site.address}</p>

                <dl className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                  {[
                    { icon: 'tabler:mail', label: t(locale, 'Email'), value: site.email, href: `mailto:${site.email}` },
                    { icon: 'tabler:phone', label: t(locale, 'Phone'), value: site.phone, href: site.phoneHref },
                    { icon: 'tabler:brand-whatsapp', label: t(locale, 'WhatsApp'), value: t(locale, 'Message us'), href: site.whatsappHref },
                    { icon: 'tabler:printer', label: t(locale, 'Fax'), value: site.fax },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <Icon icon={row.icon} className="text-primary size-4 shrink-0" aria-hidden />
                      <dt className="sr-only">{row.label}</dt>
                      <dd className="text-default-800 text-[0.95rem]">
                        {row.href ? (
                          <a href={row.href} className="hover:text-primary underline-offset-4 transition-colors hover:underline">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border-default-200 bg-default-50 rounded-card border p-6 lg:p-10">
                <SectionHeading eyebrow={t(locale, 'One form')} title={t(locale, 'Tell us what you need.')} />

                <div className="mt-8">
                  <QuoteForm
                    formTitle={t(locale, 'Your requirement')}
                    /* ⚠ THE FIELDS ARE NOT IN THIS REPO — Jotform
                       262084626654058 in a cross-origin iframe. Cutting the
                       field set down and restyling the controls are both
                       builder-side; see the note in JotformEmbed. */
                    formDesc={t(locale, 'Tell us the material you are working and the finish you need. Anything else — grade, size, quantity — can go in the message.')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
