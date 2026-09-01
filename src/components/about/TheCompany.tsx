import Image from 'next/image'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * "THE COMPANY" — the block Strauss opens their About page on.
 *
 * Their shape is three lines and a paragraph:
 *
 *   ABOUT              ← small kicker
 *   STRAUSS & CO.      ← the name, light
 *   THE COMPANY        ← the heading, heavy
 *   [one paragraph of company history, set large]
 *
 * That is the "bigger and more dominant" treatment Uri asked for by name in
 * F1/F2 — his note is that the words at the top of this page matter more than
 * the picture behind them, and Strauss's answer is to set the opening
 * paragraph at 20px rather than at body size and give it nothing to compete
 * with.
 *
 * ── The copy is EID's own, and it is not new ────────────────────────────────
 *
 * The paragraph is the heritage wording from the previous EID site, which Uri
 * supplied verbatim in §2 of the written feedback and asked to have brought
 * across. It was living on the reach band at the foot of this page; this is
 * where it belongs — it is the company statement, so it opens the page about
 * the company.
 *
 * Nothing here is invented. That matters on this particular block, because an
 * About page is exactly where a supplier's claims get read closely, and
 * "global reputation for quality, consistency and superior service" is EID's
 * sentence rather than one written for them.
 */
const TheCompany = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="the-company" className="py-16 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Copy left, media right — their arrangement exactly.

              The accent rule down the left edge is their device: a 3px bar in
              the brand colour running the full height of the copy block, which
              is what makes a heading and a paragraph read as a quoted
              statement rather than as body text that happens to start here.
              Ours is 2px, because every other rule on this site is a hairline
              and 3px would be the one heavy line. */}
          <div className="border-primary border-s-2 ps-7 lg:col-span-6 lg:ps-9">
            <p className="text-default-500 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, 'About')}</p>
            <h2 className="text-default-900 mt-4 text-[32px] leading-none font-bold lg:text-[42px]">{t(locale, 'The Company')}</h2>

            {/* 18-20px, not 16. Uri's note is that the wording at the top of
                About is what people take away, so it gets the weight a heading
                would normally carry. */}
            <p className="text-default-700 mt-6 text-[18px] leading-relaxed lg:text-[19px]">
              {t(
                locale,
                'With its headquarters in London, England, and worldwide marketing partners, EID has established a global reputation for quality, consistency and superior service.'
              )}
            </p>
            <p className="text-default-600 mt-5 text-base leading-relaxed">
              {t(
                locale,
                'Today EID has customers on every continent. Our sales team speaks more than ten dialects, but we all speak the same language — the right product at the right price, when and where you require it.'
              )}
            </p>
          </div>

          {/* Their slot holds a company film. EID has one — the hero clip — but
              running it twice on two pages would make it wallpaper, so this is
              a still until Uri supplies a second. 16:9 either way, so a film
              drops into the same box with no layout change.

              ⚠ PLACEHOLDER. /eid/facility/hero-metrology-lab.png is EID's own
              metrology bench, which is at least a picture of the company this
              paragraph is describing. */}
          <div className="rounded-card relative aspect-16/10 overflow-hidden lg:col-span-6">
            <Image src="/eid/facility/hero-metrology-lab.png" alt={t(locale, 'Two technicians at a measuring microscope in the EID metrology laboratory')} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheCompany
