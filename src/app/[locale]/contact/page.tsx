import Image from 'next/image'
import { Icon } from '@iconify/react'
import SalesLocations from '@/components/SalesLocations'
import QuoteForm from '@/components/QuoteForm'
import { PageHero } from '@/components/sections'
import { SectionHeading } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
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
      {/* No photograph, and that is the whole brief for this page.

          Uri's F5/F6 note is the strictest on the site: Contact is one screen,
          zero scrolling, everything above the footer in one view, on the
          Strauss model. A 52svh photographic hero spends more than half of that
          budget on a picture of a laboratory before the reader reaches a field.

          Dropping `bgImage` falls back to PageHero's compact bordered header,
          which is the same header the product and resource pages use — about
          200px, and it leaves the form the rest of the screen.

          Title is "Contact Us" per F5: "Tell us the grade you need" was too
          one-dimensional, and it turned away anyone with a technical question
          or a sample request. The eyebrow's one-business-day promise came off
          with it — he asked for that wording to go. */}
      <PageHero title={t(locale, 'Contact Us')} desc={t(locale, 'Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material.')} />

      {/* ── THE SPLIT: presence on the left, the form on the right ──────────
          Marc's brief, off Strauss's contacts page: half the page a picture,
          half the form, with the sales locations in a cube on the left.

          ── What was taken from Strauss, and what deliberately was not ──────

          Their page is credibility-first: it establishes the company as real
          places before it asks for anything, and it repeats identical location
          blocks so geography reads as a grid. That principle is the whole
          reason the left half exists here — a buyer sees a London laboratory,
          a London address and eleven territories before reaching a field.

          Three things from that model are NOT here, and none of them is an
          oversight:

           · A CARD PER OFFICE WITH ADDRESS, PHONE, FAX AND EMAIL. Strauss has
             three offices and publishes all three. EID has one — London — and
             the other eleven entries are sales territories we hold no
             addresses for. Building eleven identical cards would mean
             inventing ten sets of contact details. Uri also ruled it out
             directly in F6: "I'm not going to do that with the full
             information for all our sales locations… just showing the
             locations they could buy from."
           · INTENT-SEGMENTED ROUTES (general / technical / distributor).
             Uri's F5 is one form, and the form is a single Jotform endpoint.
             Three routes would mean three forms or a router field he has not
             asked for.
           · OFFICE PHOTOGRAPHY PER LOCATION. We hold one interior, of London.

          ── Why this photograph ─────────────────────────────────────────────

          A grader checking a tray of grit through a loupe, with the Shard and
          the City through the window behind her. On a page whose job is to
          prove a London company is real before it asks for an enquiry, having
          London actually in the frame does more than any caption would. It is
          also portrait (725x1080), which is the shape this column is.

          It carries a second thing the copy claims elsewhere: About's core
          values say the person who answers a specification question is the
          person who grades against it. This is that person, on the page where
          you write to her.

          ── One screen still ────────────────────────────────────────────────

          Uri's F5: contact is one view, no scrolling. Putting the locations
          beside the form instead of below it is what buys that back — the band
          they used to sit in was a whole extra section of height. Nothing was
          added to the page's height here; it was moved sideways. */}
      <section data-note="contact-split" className="py-12 lg:py-16">
        <div className="container">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            {/* ── LEFT: the picture, with presence over it ── */}
            {/* ⚠ `items-start` on the grid and `sticky` here, NOT `items-stretch`.
                Stretching was the obvious thing and it was wrong: the Jotform
                iframe auto-resizes to its content and measures 2024px, so the
                photograph column stretched to 2024px too — a two-metre-tall
                picture of a laboratory beside a form.

                Sticky instead, on the same `top-28` the FAQ's heading column
                uses. The panel sizes to its own content and holds while the
                form scrolls past, which is also the more useful behaviour: the
                address and the territories stay on screen the whole time
                someone is filling the form in.

                ⚠ A STICKY PANEL TALLER THAN THE WINDOW PINS AT ITS TOP AND
                HIDES ITS OWN BOTTOM EDGE — here that would permanently clip the
                cube, which is the whole point of the column. Same trap as the
                FAQ plate.

                The panel is 602px and the sticky offset is 112px, so it needs
                714px of window. Measured: 812px window clears with 98px to
                spare, 767px with 53px, and a 700px window MISSES BY 14px. That
                last one is not hypothetical — it is a small laptop, or any
                window that is not maximised.

                So the height query, rather than shaving another 14px off and
                calling it fixed: below 740px of viewport height the panel stops
                being sticky and simply scrolls with the page. Nothing is
                clipped, nothing is lost, and the behaviour degrades where it
                cannot fit instead of failing silently. If the content here
                grows, raise the 740 to match — panel height plus 112 plus a
                little slack. */}
              <div className="rounded-card relative isolate flex flex-col justify-between overflow-hidden p-6 lg:sticky lg:top-28 lg:p-8 [@media(max-height:740px)]:!static">
              <Image
                src="/eid/facility/diamond-grading-loupe.png"
                alt={t(locale, 'A grader examining a tray of diamond grit through a loupe in the London laboratory, the City skyline through the window behind')}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="-z-20 object-cover object-center"
              />
              {/* Two scrims, not one. A single bottom-up gradient would leave
                  the address at the top of the panel on bare photograph — and
                  the top of this frame is a lit ceiling panel, the brightest
                  part of it. So: a flat wash for the whole panel, then a
                  bottom-weighted one under the cube where the copy is densest. */}
              <span aria-hidden className="bg-primary-3/62 absolute inset-0 -z-10" />
              <span aria-hidden className="from-primary-3/85 absolute inset-0 -z-10 bg-linear-to-t via-transparent via-60% to-transparent" />
              {/* ⚠ A THIRD SCRIM, TOP-DOWN, AND IT IS NOT DECORATION. The
                  brightest thing in this frame is the lit ceiling panel across
                  the top — exactly where the address block sits. Under the
                  flat wash and the bottom gradient alone, "Headquarters"
                  measured 3.25:1 and the address itself 4.35:1 even in solid
                  white, both under the 4.5:1 floor. Measured by compositing
                  image plus every scrim to a canvas and sampling the worst
                  ground behind each line. */}
              <span aria-hidden className="from-primary-3/58 absolute inset-0 -z-10 bg-linear-to-b via-transparent via-45% to-transparent" />

              {/* TOP: the one office that is real, and the ways in. Strauss's
                  icon-labelled contact lines, with our set — fax included,
                  because EID publishes one and a technical buyer's purchasing
                  department still occasionally wants it. */}
              <div>
                <p className="font-mono text-[11px] tracking-[0.22em] text-white/85 uppercase">{t(locale, 'Headquarters')}</p>
                <p className="mt-2.5 max-w-[26ch] text-[1.02rem] leading-snug font-semibold text-white">{site.address}</p>

                <dl className="mt-5 flex flex-col gap-2">
                  {[
                    { icon: 'tabler:mail', label: t(locale, 'Email'), value: site.email, href: `mailto:${site.email}` },
                    { icon: 'tabler:phone', label: t(locale, 'Phone'), value: site.phone, href: site.phoneHref },
                    { icon: 'tabler:brand-whatsapp', label: t(locale, 'WhatsApp'), value: t(locale, 'Message us'), href: site.whatsappHref },
                    { icon: 'tabler:printer', label: t(locale, 'Fax'), value: site.fax },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <Icon icon={row.icon} className="size-4 shrink-0 text-white/70" aria-hidden />
                      <dt className="sr-only">{row.label}</dt>
                      <dd className="text-[0.95rem] text-white">
                        {row.href ? (
                          <a href={row.href} className="underline-offset-4 hover:underline">
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

              {/* BOTTOM: the cube. */}
              <div className="mt-8">
                <SalesLocations />
              </div>
            </div>

            {/* ── RIGHT: the form ── */}
            <div className="border-default-200 bg-default-50 rounded-card border p-6 lg:p-10">
              <SectionHeading eyebrow={t(locale, 'One form')} title={t(locale, 'Tell us what you need.')} />

              <div className="mt-8">
                <QuoteForm
                  formTitle={t(locale, 'Your requirement')}
                  /* ⚠ THE FIELDS ARE NOT IN THIS REPO. There is not a native
                     form control anywhere in src/ — this is Jotform
                     262084626654058 in a cross-origin iframe. Cutting the field
                     set down, restyling the inputs, matching the brand navy and
                     the 12px control radius all have to be done in the Jotform
                     builder; no amount of CSS here reaches inside that frame.
                     See the note in JotformEmbed for exactly what to change
                     there. This line is the most the codebase can do. */
                  formDesc={t(locale, 'Tell us the material you are working and the finish you need. Anything else — grade, size, quantity — can go in the message.')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
