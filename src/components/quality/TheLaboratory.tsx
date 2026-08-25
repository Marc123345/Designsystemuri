import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * "THE LABORATORY" — About's opening block, on the Quality page.
 *
 * Marc's instruction for this page is the About layout exactly, in three
 * sections, with this page's own pictures and words. So this is TheCompany
 * with nothing about the composition changed: the same 6/6 split, the same
 * accent rule down the left edge of the copy, the same 11px mono kicker, the
 * same 32/42px heading, the same 18-19px opening paragraph with a 16px one
 * under it, and the same 16:10 media panel on the right.
 *
 * ── Where the copy came from ────────────────────────────────────────────────
 *
 * Both paragraphs were already on this page. The first is the hero's own
 * supporting paragraph, which is where it stopped working: About's hero
 * carries a headline and nothing else, and matching that meant this page's
 * hero lost its 60-word lede. It was never hero copy anyway — it is the
 * statement of what the laboratory does, so it opens the block about the
 * laboratory, exactly as About's heritage paragraph opens TheCompany.
 *
 * The second absorbs the compliance strip that used to sit as its own thin
 * ruled band under the hero. Three sections was the instruction, and a
 * standards list is not a section — it is the second sentence of the
 * laboratory statement. The ISO 9001 badge that shared that strip is now the
 * solid tile in the mosaic, where a credential reads as a figure rather than
 * as a footnote.
 *
 * Nothing here is new wording. That matters on this page more than on About:
 * quality claims are the ones a buyer checks, and every standard named is one
 * EID already published.
 */
const TheLaboratory = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="the-laboratory" className="py-16 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="border-primary border-s-2 ps-7 lg:col-span-6 lg:ps-9">
            <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'Quality control')}</p>
            <h2 className="text-default-900 mt-4 text-[32px] leading-none font-bold lg:text-[42px]">{t(locale, 'The Laboratory')}</h2>

            <p className="text-default-700 mt-6 text-[18px] leading-relaxed lg:text-[19px]">
              {t(
                locale,
                'At E.I.D, every single batch of diamond and CBN powder undergoes strict laboratory validation to guarantee total product consistency, lot after lot.'
              )}
            </p>
            <p className="text-default-600 mt-5 text-base leading-relaxed">
              {t(
                locale,
                'QC is built into every stage, from raw material selection through grading, crushing, chemical cleaning, coating and final inspection. The in-house QC laboratory is the backbone of everything we ship, and all laboratory testing is compliant with international FEPA, ISO 6106 and ANSI standards.'
              )}
            </p>
          </div>

          {/* About's slot holds a still of the metrology bench — a picture of
              the company the paragraph describes. The parallel here is the
              laboratory itself: the optical measurement instrument with a
              crystal magnified on screen, a technician at the controls, and
              the ISO 9001 sign on the wall behind them.

              That last detail is why this frame rather than a micrograph. The
              paragraph beside it ends on a list of standards, and this is the
              only photograph in the library where the certification is visibly
              part of the room instead of being asserted in text.

              ⚠ Shared with About, which uses it as a small tile in its mosaic.
              It is the only true photograph of the laboratory we hold, and the
              laboratory page has the better claim on it. If it should be
              unique to one page, the honest fix is a new frame for About's
              tile rather than a worse one here. */}
          <div className="rounded-card relative aspect-16/10 overflow-hidden lg:col-span-6">
            <Image
              src="/eid/qc-lab.jpg"
              alt={t(locale, 'A technician at an optical measurement system in the EID quality laboratory, a diamond crystal magnified on screen and an ISO 9001 certification notice on the wall behind')}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheLaboratory
