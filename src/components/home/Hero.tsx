import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { ArrowButton } from '@/components/ui'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'
import HeroMark from '@/components/HeroMark'
import HeroTitle from '@/components/HeroTitle'
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
 * The chamfered card at the bottom-right was built to hang out of the section
 * into the one below, then removed, and is now back sitting inside the hero
 * rather than overhanging it. It carries the ISO 9001:2015 certificate; see the
 * two warnings at that block before changing what is in it or how large it is.
 */
const Hero = ({ title, desc }: { title: string; desc: string }) => {
  const locale = useLocale() as Locale


  return (
    <section data-note="hero" className="bg-primary-3 relative isolate flex min-h-svh w-full items-end overflow-hidden">
      {/* The ground. `priority` because this is the LCP element on the
          highest-traffic page in the site — left lazy it is fetched after the
          CSS and the fonts, which is exactly the wrong order for the one image
          the score is measured against.

          Graded diamond grit, coarse at one end of the frame and fine at the
          other, which is mesh grading made visible — the thing the headline is
          claiming.

          Centred now rather than biased left. The old crop pushed the brightest
          cluster out to the right to keep it off the words; with the words in
          the middle the composition wants its subject in the middle too.

          ⚠ The source is 1024×1024 and that is its ceiling; the CDN's larger
          variants are upscales with no extra detail in them. A native
          2560px-wide render of the same shot drops in with no code change. */}
      <Image src="/eid/home/hero-grit.png" alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[50%_50%]" />

      {/* Legibility, rebuilt for a centred composition.

          The old pair darkened the left of the frame hard, because that is
          where the words were. Centred copy over a left-weighted scrim sits
          half on a black ground and half on a photograph, which is worse than
          either. So: a flat brand wash over the whole frame, and one vertical
          gradient seating the block on the bottom edge. Nothing directional
          left to right, because there is no longer a side to protect. */}
      <div aria-hidden className="bg-primary-3/45 absolute inset-0 -z-10" />
      <div aria-hidden className="from-default-950/84 via-default-950/24 absolute inset-0 -z-10 bg-linear-to-t via-56% to-transparent" />

      {/* A ground for the navbar, which is transparent over this hero and has
          white links. Same 144px strip the interior heroes carry. */}
      <div aria-hidden className="from-default-950/78 absolute inset-x-0 top-0 -z-10 h-36 bg-linear-to-b via-transparent to-transparent" />

      {/* The block is seated toward the foot of the frame rather than centred
          in it — the reference's `margin-top:auto` with a tall top padding and
          a shorter bottom one. That is what leaves the photograph a clear upper
          two-thirds to be a photograph in, instead of having type through its
          middle. */}
      <div className="relative z-10 w-full pt-44 pb-20 lg:pt-52 lg:pb-24">
        <div className="container flex flex-col items-center text-center">
          {/* The mark above the statement, blended into the photograph rather
              than sitting on top of it — the reference's `mix-blend-mode:
              overlay`, which lets the grit read through the letterforms so the
              mark belongs to the image instead of being pasted onto it.

              Hidden from assistive tech and from search: the same logo is the
              first link in the header three inches above, and the h1 below
              already says the company name. This one is texture. */}
          <HeroMark />

          {/* Two beats, two weights — the reference sets the name light and the
              claim bold, and the contrast between the two is doing the work a
              second colour would otherwise have to do.

              The dash-splitting below is unchanged and still necessary; see the
              note on `beats`. What changed is that the break is now expressed
              as two block elements rather than a <br>, because each beat
              carries its own weight. */}
          <HeroTitle title={title} className="mt-7 text-[clamp(1.9rem,4.4vw,3.5rem)] lg:mt-9" />

          {/* `text-pretty` rather than nothing: the supporting line runs to
              two lines at this measure and was ending on a single word.
              Pretty is the one wrap mode that exists specifically to pull a
              word back off an orphaned last line. */}
          <p className="mt-7 max-w-[56ch] text-base leading-relaxed text-pretty text-white/85 md:text-lg">{desc}</p>

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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <ArrowButton href="/contact" label={t(locale, 'Contact')} />
            <Link href="/#products" className="inline-flex items-center border border-white/25 px-6 py-3.5 text-[0.95rem] leading-none font-medium text-white transition-colors hover:border-white/70">
              {t(locale, 'See the range')}
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
