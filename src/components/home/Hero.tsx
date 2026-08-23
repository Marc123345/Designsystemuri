import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ArrowButton } from '@/components/ui'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import Image from 'next/image'

/**
 * The hero: one statement, two pictures, and a card that hangs into the page.
 *
 * Built to the Construz `hero-1` shape Marc marked up, restated in this site's
 * vocabulary rather than copied:
 *
 *  - full-bleed photograph with the header sitting on it rather than above it;
 *  - copy held in the left half;
 *  - a hard-edged image panel down the right, divided by a rule of brand colour
 *    (the reference uses a 5px orange border; here it is a 2px brand rule,
 *    because every other division on this site is a hairline);
 *  - and the reference's signature move — a chamfered card positioned so it
 *    hangs out of the section and overlaps the one below.
 *
 * ── Full height ─────────────────────────────────────────────────────────────
 *
 * `min-h-svh` at every breakpoint now, not `92svh` on mobile. The old value
 * deliberately let the products band show a sliver above the fold; the brief
 * here is that the hero owns the screen until you scroll, and the overhanging
 * card does the job that sliver was doing — it is the thing that says the page
 * continues.
 *
 * `svh` rather than `vh` for the same reason as before: on mobile browsers
 * `vh` counts the retracting chrome, so a 100vh hero is clipped on first paint
 * and only fits after a scroll.
 *
 * The reference's chamfered stat card, hung off the bottom edge so it broke
 * into the section below, was built here and then removed. It carried the 1970
 * date and the ISO 9001 line. Nothing replaced it — those facts now live on the
 * proof panel's own plates and in the footer trust line — and with it gone the
 * hero has no cue that the page continues, which is worth knowing rather than
 * rediscovering.
 */
const Hero = ({ title, desc }: { title: string; desc: string }) => {
  const locale = useLocale() as Locale

  /**
   * The headline is authored as two beats around an em-dash, and the break has
   * to land on the dash.
   *
   * CSS cannot be trusted to do it. Greedy wrapping fills each line as far as
   * it can, and the two halves here are within one character of each other —
   * "Industrial Diamond — Manufactured" is 33 characters, "Manufactured
   * In-House Since 1970" is 32 — so the range of container widths that happens
   * to break correctly is about one character wide. Any change to the type
   * scale, the font, or the words moves it. `text-balance` was worse again: it
   * evened the line lengths by hyphenating through "In-House".
   *
   * So the break is explicit. Split on the dash, keep the dash on the first
   * beat, and let the second beat be one unbroken line. A title with no dash —
   * a translation, or a future rewrite — falls through unchanged and wraps
   * however it likes.
   */
  const beats = title.split('—')
  const twoBeat = beats.length === 2

  return (
    <section data-note="hero" className="relative flex min-h-svh w-full items-center">
      {/* The ground. `priority` because this is the LCP element on the
          highest-traffic page in the site — left lazy it is fetched after the
          CSS and the fonts, which is exactly the wrong order for the one image
          the score is measured against.

          Graded diamond grit, coarse at one end of the frame and fine at the
          other, which is mesh grading made visible — the thing the headline is
          claiming. Biased left of centre so the brightest cluster sits out to
          the right rather than behind the words.

          ⚠ The source is 1024×1024 and that is its ceiling; the CDN's larger
          variants are upscales with no extra detail in them. A native
          2560px-wide render of the same shot drops in with no code change. */}
      <Image src="/eid/home/hero-grit.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[32%_46%]" />

      {/* Legibility. Two gradients rather than one flat sheet: the vertical one
          seats the copy on the bottom edge, the horizontal one darkens the left
          where the words actually are, so the right of the frame keeps its
          detail and the image still reads as a photograph. */}
      <div aria-hidden className="from-default-950/95 via-default-950/45 absolute inset-0 -z-10 bg-linear-to-t via-55% to-transparent" />
      <div aria-hidden className="from-default-950/96 via-default-950/62 absolute inset-0 -z-10 bg-linear-to-r via-40% to-transparent to-80%" />

      {/* The facility panel. A second photograph held in the right of the frame
          behind a brand rule, so the hero carries both halves of the claim at
          once: the material on the left, the place it is graded on the right.

          From xl only, and that is arithmetic rather than taste. The headline's
          second beat is 32 characters; at 46px it needs about 760px of measure.
          A 1024px viewport minus the container padding leaves 964px, and giving
          36% of that to a panel leaves 578px — the headline drops to three
          lines with "1970" orphaned again, which is the exact fault this
          section was rebuilt to remove. Above 1280px both fit. Below it the
          grit photograph runs full width and the hero is the stronger for
          having one subject rather than two crammed. */}
      {/* The wipe is on this panel and deliberately not on the grit photograph
          behind the copy. That one is the LCP element on the site's
          highest-traffic page, and an animation that uncovers it progressively
          is exactly the kind of thing that moves the moment the browser calls
          it painted. The panel is the half of the frame where the reveal reads
          anyway — it has a hard brand rule down its edge for the wipe to pull
          away from.
          
          The panel used to carry /eid/qc-lab.jpg, which tile 01 of the proof
          panel carried as well — the same photograph twice on one page. It is
          now the inspection bench, which is a different room doing a different
          job, and at 848×1264 it is close enough to this strip's 2:3 that
          almost nothing is cropped. */}
      <div aria-hidden className="border-primary-1 eid-wipe-in absolute inset-y-0 end-0 -z-10 hidden w-[36%] border-s-2 xl:block">
        <Image src="/eid/qc-inspection.jpg" alt="" fill sizes="36vw" className="object-cover object-center" />
        {/* Pulled toward the palette and darkened at its inner edge, so the
            join reads as one photograph lit two ways rather than as two images
            pasted together. */}
        <div className="bg-primary-3/28 absolute inset-0" />
        <div className="from-default-950/85 absolute inset-0 bg-linear-to-r to-transparent to-38%" />
      </div>

      {/* Centred, not bottom-anchored. Measured on the old arrangement there
          were 394px of image above the copy and 112px below it — a 3.5:1 split
          that read as the text having slid to the floor rather than as a
          composition. The padding is deliberately top-heavy rather than equal:
          the header is fixed and overlays the first ~96px of this section, so
          padding that is symmetrical in the box is visibly low on the screen.
          The extra top padding pays that back. */}
      <div className="relative z-10 w-full pt-32 pb-24 lg:pt-36 lg:pb-28">
        <div className="container">
          {/* Held clear of the facility panel from lg up, so the longest line
              of the headline stops before the brand rule rather than running
              under it. */}
          <div className="max-w-[42rem] lg:max-w-none xl:pe-[36%]">
            <h1 className="max-w-[20ch] text-[34px] leading-[1.05] font-bold tracking-tight text-white md:max-w-none md:text-[44px] lg:text-[46px] xl:text-[46px]">
              {twoBeat ? (
                <>
                  {beats[0].trim()} —<br />
                  {beats[1].trim()}
                </>
              ) : (
                title
              )}
            </h1>

            {/* `text-pretty` rather than nothing: the supporting line runs to
                two lines at this measure and was ending on a single word.
                Pretty is the one wrap mode that exists specifically to pull a
                word back off an orphaned last line. */}
            <p className="mt-8 max-w-[44rem] text-base leading-relaxed text-pretty text-white/85 md:text-lg">{desc}</p>

            {/* Primary used to be "Our Products", which scrolled seven hundred
                pixels down to a heading reading "Our Products" — the same two
                words twice for one screen of travel. Secondary was a bare
                `mailto:`, which opens an empty message with no subject, no
                context and no routing, and on a locked-down work machine often
                opens nothing at all.

                /contact already holds the real path: a routed quote form asking
                for product, grade, size and quantity, answered by a specialist
                within one business day. That is the action this page exists to
                produce, so it is the primary.

                Labelled "Contact" and not "Request a quote", per Uri's V1
                note. The reasoning is the same one behind the header button: a
                visitor who wants to ask a technical question, chase a sample or
                find the phone number should not have to read the primary action
                as a commitment to buy. */}
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <ArrowButton href="/contact" label={t(locale, 'Contact')} />
              <Link href="/#products" className="inline-flex items-center border border-white/25 px-6 py-3.5 text-[0.95rem] leading-none font-medium text-white transition-colors hover:border-white/70">
                {t(locale, 'See the range')}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
