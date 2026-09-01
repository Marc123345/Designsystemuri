import Image from 'next/image'

import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The ISO 9001 certificate, shown rather than claimed.
 *
 * ── Why this is a section and not a badge ───────────────────────────────────
 *
 * The quality page already said "ISO 9001" three ways: a 64px "9001" in the
 * mosaic, a line in the compliance paragraph, and a chip in the footer strip.
 * All three are the site asserting its own credential. This is the only place
 * that hands over the document and lets a reader check it — issuer, scope,
 * number and expiry, which is the exact set a procurement department looks up
 * before it opens an account.
 *
 * image-specs.ts has said since it was written that this is "the one image on
 * the entire site where the text genuinely has to be readable", and marked it
 * Priority 1. The scan has been sitting unreferenced in public/eid/ the whole
 * time.
 *
 * ── The layout, and why the facts are beside the scan rather than under it ──
 *
 * A certificate reproduced at column width is decoration: nobody reads 8pt
 * legal type on a phone. So the scan runs at a size where the headline fields
 * are legible, and everything a reader actually needs is ALSO set as real text
 * beside it — selectable, translatable, indexable, and readable at any width.
 * The image is the evidence; the list is the answer.
 *
 * The full scan is linked rather than lightboxed. A new tab gives the reader
 * the browser's own zoom, rotate and save, which is what someone verifying a
 * certificate wants; a modal would give them a smaller picture and a close
 * button. `noopener` because it is a cross-tab link to our own asset.
 *
 * ── ⚠ THE SCOPE LINE IS QUOTED VERBATIM AND MUST STAY THAT WAY ─────────────
 *
 * "TRADING, SORTING AND SALES OF NATURAL INDUSTRIAL DIAMOND TOOL STONES. SALES
 * AND SUPPLY OF A FULL RANGE OF NATURAL AND SYNTHETIC DIAMOND POWDERS IN BOTH
 * MESH AND MICRON."
 *
 * That is what the registration covers, word for word off the document. It
 * describes trading, sorting, sales and supply — it does not say manufacturing.
 * Paraphrasing it into something that sounded closer to the rest of the site's
 * language would be the single most damaging edit anyone could make to this
 * page, because the audience for a certificate is precisely the audience that
 * reads the scope line and then reads it again on the issuer's register.
 *
 * See the note flagged to Marc alongside this: the page around it claims
 * in-house manufacturing, and this document does not evidence that claim.
 * Resolving the two is Uri's call, not a code change.
 */

const CERT = '/eid/iso-9001-eid.jpg'

/** Straight off the document. Do not restate these from memory. */
const FIELDS: { label: string; value: string }[] = [
  { label: 'Standard', value: 'ISO 9001:2015' },
  { label: 'Certificate number', value: '224122015' },
  { label: 'Issued by', value: 'Citation ISO Certification Limited' },
  { label: 'Accreditation', value: 'ASCB (Accreditation Services Worldwide)' },
  { label: 'Registered entity', value: 'EID Limited, 12 St. Cross Street, London EC1N 8UB' },
  { label: 'Original approval', value: '2 February 2015' },
  { label: 'Current certificate', value: '5 February 2026' },
  { label: 'Valid until', value: '6 March 2029' },
]

const SCOPE =
  'Trading, sorting and sales of natural industrial diamond tool stones. Sales and supply of a full range of natural and synthetic diamond powders in both mesh and micron.'

const TheCertificate = () => {
  const locale = useLocale() as Locale

  return (
    /* `id` so the mosaic's 9001 tile can point at it. No `scroll-mt` — the
       global scroll-padding-top in _general.css already clears the fixed
       navbar for every anchor and every focus move; adding one here would
       stack two offsets and land the heading a bar's height too low. */
    <section id="certificate" data-note="certificate" className="py-16 lg:py-24">
      <div className="container">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* ── THE SCAN ────────────────────────────────────────────────────
              `rounded-card` and a hairline, like every other framed thing on
              this site. The shadow is the one place on the page that uses one,
              and it is tuned rather than borrowed: navy at 8% rather than
              black, so on a white ground the card lifts without the grey halo
              a black shadow leaves. A certificate should read as a sheet of
              paper sitting on the page.

              `sizes` is honest about the rendered width — this is a 755px
              source and the column is ~470px at lg, so without it Next would
              ship the full file to every viewport. */}
          <a
            href={CERT}
            target="_blank"
            rel="noopener noreferrer"
            className="group focus-visible:outline-primary rounded-card border-default-200 relative block overflow-hidden border bg-white focus-visible:outline-2 focus-visible:outline-offset-2 lg:col-span-5"
            style={{ boxShadow: '0 18px 40px -24px rgba(28,39,73,0.28)' }}
          >
            <Image
              src={CERT}
              alt={t(locale, 'EID Limited ISO 9001:2015 certificate of registration, issued by Citation ISO Certification Limited, certificate number 224122015')}
              width={755}
              height={1064}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </a>

          <div className="lg:col-span-7">
            <div className="border-default-300 rounded-control inline-flex items-center gap-1.5 border bg-white px-3.5 py-1.25">
              <span className="bg-primary size-2" />
              <span className="text-default-900 text-sm">{t(locale, 'Certification')}</span>
            </div>

            <h2 className="mt-4 text-[28px] font-bold md:text-[34px] lg:text-[38px]">{t(locale, 'The certificate itself, not a badge.')}</h2>

            <p className="text-default-600 mt-5 text-[17px] leading-relaxed">
              {t(
                locale,
                'Our quality management system is certified to ISO 9001:2015 and independently audited. The registration details below are reproduced from the certificate; open the scan to read it in full or save a copy for your supplier file.'
              )}
            </p>

            {/* Hairline rows rather than a bordered table. The page has one
                real table already — this is eight facts, and a table head
                reading "Attribute / Detail" over them would be furniture for
                its own sake. Definition list because that is what it is. */}
            <dl className="border-default-200 mt-9 border-t">
              {FIELDS.map((f) => (
                <div key={f.label} className="border-default-200 grid gap-1 border-b py-3.5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="text-default-500 font-mono text-[11px] tracking-[0.18em] uppercase sm:pt-1">{t(locale, f.label)}</dt>
                  <dd className="text-default-900">{f.value}</dd>
                </div>
              ))}
            </dl>

            {/* ⚠ VERBATIM. See the file header before touching a word of it. */}
            <div className="border-primary bg-default-50 rounded-card mt-8 border-s-2 p-6 lg:p-7">
              <p className="text-default-500 font-mono text-[11px] tracking-[0.18em] uppercase">{t(locale, 'Certified scope')}</p>
              <p className="text-default-700 mt-3 leading-relaxed">{SCOPE}</p>
            </div>

            {/* ⚠ Was hand-rolled here, with the same shell classes as the
                navbar's old Contact button and none of the motion. `external`
                because CERT is a raw asset path, not a route. */}
            <ArrowButton href={CERT} label={t(locale, 'View the full certificate')} external className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheCertificate
