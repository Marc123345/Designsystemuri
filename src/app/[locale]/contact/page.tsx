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

      {/* The panel copy sits beside the form rather than above it, so the
          pre-qualifying instruction is readable while the fields are filled.

          The opening paragraph here used to be the hero lede repeated word for
          word, about 400px below itself. Someone who reads both is being told
          the same sentence twice before reaching a single field, so the second
          copy is gone and the column now opens on the instruction that actually
          changes what they type. */}
      <section data-note="quote" className="py-12 lg:py-16">
        <div className="container">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <div>
              {/* "Tell us what you need" is Uri's own heading from the written
                  doc, and it replaces "Tell us the grade you need" — which he
                  struck by name in F5 for being one-dimensional. The paragraph
                  under it is his too, verbatim.

                  What is gone with it is the four-line instruction about
                  supplying product, grade, size and quantity upfront. His note
                  on the form is that those fields come out entirely and people
                  put it in the message; an instruction telling them to supply
                  four things the form no longer asks for is worse than none. */}
              {/* Heading only. The sentence that used to follow it is the
                  hero's lede word for word, 300px above itself — the same
                  duplication that got the previous version of this paragraph
                  cut, reintroduced by moving Uri's copy block onto a page that
                  already carried it. On a page whose brief is one screen with
                  no scrolling, saying it twice costs the sales grid its slot. */}
              <SectionHeading eyebrow={t(locale, 'One form')} title={t(locale, 'Tell us what you need.')} />

              {/* Three routes, on the hairline grid the rest of the site uses,
                  rather than a sentence with two links buried in it. Anyone who
                  would rather phone than fill in a form is looking for a number,
                  and a number is easier to find in a column than in prose. */}
              <dl className="bg-default-200 mt-8 grid gap-px sm:grid-cols-3">
                {[
                  { label: t(locale, 'Email'), value: site.email, href: `mailto:${site.email}` },
                  { label: t(locale, 'Phone'), value: site.phone, href: site.phoneHref },
                  { label: t(locale, 'WhatsApp'), value: t(locale, 'Message us'), href: site.whatsappHref },
                ].map((row) => (
                  <div key={row.label} className="bg-white p-5">
                    <dt className="text-default-500 text-xs tracking-[0.18em] uppercase">{row.label}</dt>
                    <dd className="mt-2">
                      <a href={row.href} className="text-default-900 hover:text-primary text-[0.95rem] font-semibold break-words">
                        {row.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* The datasheets button is gone — Uri, F6: "remove the data
                  sheets block from this page." Resources carries the whole
                  library and the footer links it from every page. */}
            </div>

            <div className="border-default-200 bg-default-50 rounded-card border p-6 lg:p-10">
              {/* The form's own title was "Request a Quote", which is the page's
                  h1 — two identical headings on one screen, and the second one
                  told the visitor nothing the first had not. It names the fields
                  instead. */}
              <QuoteForm
                formTitle={t(locale, 'Your requirement')}
                /* Was "Product, grade, size, and quantity if you have them. A
                   specialist ... replies within one business day." Both halves
                   are struck by Uri's F5/F6 note: grade, size and quantity come
                   out of the form entirely and go in the message, and the
                   one-business-day promise comes off the page.

                   ⚠ THE FIELDS THEMSELVES ARE NOT IN THIS REPO. There is not a
                   single native form control in src/ — the form is Jotform
                   262084626654058 in a cross-origin iframe, so removing the
                   grade / size / quantity fields and cutting the set down to
                   Name, Country, Email, Phone, Company, Product, Message has to
                   be done in the Jotform builder. This line is the most the
                   codebase can do about it. */
                formDesc={t(locale, 'Tell us the material you are working and the finish you need. Anything else — grade, size, quantity — can go in the message.')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* GlobeSection used to close this page. Uri, F6: not the full block
          with contact details for every sales location — just the countries a
          buyer can purchase from, small, at the end, closing the page. The
          corrected full version is canonical on About. */}
      <SalesLocations />
    </>
  )
}

export default ContactPage
