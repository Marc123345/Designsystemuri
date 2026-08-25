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

          {/* The signature frame of the new set: a digital micrometer closed on
              a diamond crystal, reading 3.000 mm. The paragraph beside it says
              every batch is validated rather than sampled, and this is a
              measurement being taken — the claim, happening.

              ⚠ WHAT THIS SWAP COST, so nobody re-litigates it blind. The
              previous frame was the QC laboratory with an ISO 9001 notice
              visibly on the wall, chosen because the second paragraph here
              ends on a list of standards and that was the only photograph in
              which the certification was part of the room rather than
              asserted in text. That is gone; the standards are now text only
              on this page. The mosaic's 9001 tile a section below is where a
              buyer meets the credential as an object instead.

              ⚠ The source is square (1024x1024) and this frame is 16:10, so
              roughly a third of the height is cropped away. `object-center`
              is right for this one — the micrometer jaw and the crystal sit
              dead centre — but it is not automatically right for the others.
              Every square image placed in a non-square slot on this page had
              its crop checked. */}
          <div className="rounded-card relative aspect-16/10 overflow-hidden lg:col-span-6">
            <Image
              src="/eid/quality/09-digital-micrometer-diamond-measurement.png"
              alt={t(locale, 'A digital micrometer closed on a diamond crystal, its display reading 3.000 mm')}
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
