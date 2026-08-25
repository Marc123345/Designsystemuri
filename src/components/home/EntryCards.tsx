import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * The two ways in, side by side under the hero.
 *
 * ── The reference ───────────────────────────────────────────────────────────
 *
 * Strauss's home page, directly below their hero band: two half-width rounded
 * cards, "EXPLORE OUR **DENTAL** SOLUTIONS" and "EXPLORE OUR **INDUSTRIAL**
 * SOLUTIONS", each a photograph with the label set over its lower half in three
 * weights — light kicker, heavy coloured noun, light qualifier — plus a line of
 * supporting copy at the foot. They sit high enough to peek above the fold,
 * which is what makes their short hero work: you see the hero end AND the next
 * thing begin.
 *
 * ── Why Products and Applications are the right pair ────────────────────────
 *
 * Strauss splits on their two markets, and EID has no equivalent split — it
 * sells one category to one kind of buyer. Forcing a market split here would
 * have meant inventing a division that does not exist.
 *
 * What EID does have is two entry axes, and the site already says so in its own
 * notes: "a buyer arrives knowing either the material they want or the job they
 * are doing, almost never both. Products serve the first; these six hubs serve
 * the second." That is a genuine 50/50 — two equally valid doors, not one real
 * one and a filler beside it — and it is the same pair the mega-menu already
 * opens on.
 *
 * ── Both cards now point at sections of this page ───────────────────────────
 *
 * Products always did (`/#products`). Applications pointed at an index page,
 * which has since been removed — the six hubs it listed are listed on this page
 * already, so it was a click between the reader and the hub they wanted. The
 * card scrolls to the applications section instead, which is the behaviour the
 * two cards should always have shared.
 *
 * ── Its own section, on the page's ground ───────────────────────────────────
 *
 * These sat on `bg-primary-3` so they continued the hero's navy and read as its
 * foot — Strauss's arrangement. Marc's call is that they stand alone: they get
 * the page's own white ground and normal section padding, so the hero ends at
 * its rounded edge and this begins as the first thing on the page.
 *
 * That also removes the one thing the navy version got wrong, which is that two
 * dark blocks running together made the hero look like it had simply failed to
 * stop.
 *
 * ── The duplicated sentence ─────────────────────────────────────────────────
 *
 * The Products card read "Every industrial diamond and CBN product, from one
 * source" — which is, word for word, the band directly below it. Two identical
 * sentences inside one screen of scrolling, one of them in a card whose whole
 * job is to make you want to scroll to the other.
 *
 * The card now names what is actually in the range; the band keeps the summary
 * line, which is Uri's approved copy and belongs to the section it introduces.
 *
 * ── Deliberately not a CurtainGrid ──────────────────────────────────────────
 *
 * CurtainGrid is the catalogue card: a tile you scan alongside seven others.
 * These are two doors, read one against the other, and they carry a kicker, a
 * heading and a line of copy that no catalogue tile has room for. Using the
 * grid here would have meant bending it to hold three text levels at 2-up,
 * which is how a shared component turns into a component with a mode.
 *
 * They do share the vocabulary that matters: same 24px radius, same `gap-6`,
 * same bottom-up scrim under the type, same arrow affordance. So they read as
 * the same family without being the same code.
 *
 * ⚠ PLACEHOLDER PHOTOGRAPHY. `/eid/home/hero-grit.jpg` and
 * `/eid/home/app-grinding-cutting-sawing-drilling.jpg` are stand-ins chosen
 * because they are already on disk and already carry the right subject —
 * material for one door, work for the other. Swap the two `src` values when EID
 * supplies its own; nothing else here changes.
 */
const CARDS = [
  {
    kicker: 'Explore our',
    name: 'Products',
    qualifier: 'Eight groups',
    desc: 'Natural grit and powder, bonded grades, CBN, and single crystal grown to orientation.',
    href: '/#products',
    image: '/eid/home/hero-grit.jpg',
    alt: 'Graded industrial diamond grit, coarse crystals through to fine powder',
  },
  {
    kicker: 'Explore our',
    name: 'Applications',
    qualifier: 'Six hubs',
    desc: 'Find the material by the job your tools have to do.',
    href: '/#applications',
    image: '/eid/home/app-grinding-cutting-sawing-drilling.jpg',
    alt: 'A diamond grinding wheel cutting steel',
  },
]

const EntryCards = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="entry-cards" className="py-16 lg:py-20">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              /* `group` drives the photograph's slow zoom and the arrow's
                 travel. The scale is on the image rather than the card so the
                 corners stay put — scaling the card would round-trip the
                 radius through a transform and soften it. */
              className="group focus-visible:outline-primary rounded-card relative block aspect-4/3 overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 lg:aspect-16/10"
            >
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Same bottom-up scrim every photographic card on this site puts
                  under its copy. Heavier here than on a catalogue tile because
                  there are three lines to hold, not one. */}
              <span aria-hidden className="from-default-950/92 via-default-950/45 absolute inset-0 bg-linear-to-t to-transparent to-72%" />

              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-9">
                {/* Three weights, one lockup — the reference's move, and the
                    same light-over-bold contrast the hero headline uses, so the
                    two blocks are recognisably from one system. The brand blue
                    would vanish against this scrim, so the emphasis is carried
                    by weight and size rather than by colour. */}
                <p className="text-[0.95rem] leading-tight font-light text-white/85">{t(locale, c.kicker)}</p>
                <p className="text-[30px] leading-[1.05] font-bold text-white lg:text-[40px]">{t(locale, c.name)}</p>
                <p className="mt-1 text-[0.95rem] leading-tight font-light text-white/85">{t(locale, c.qualifier)}</p>

                <p className="mt-4 max-w-[36ch] text-sm text-white/75">{t(locale, c.desc)}</p>

                <span aria-hidden className="mt-5 flex items-center gap-3 text-white">
                  <span className="h-px w-9 bg-white/50 transition-all duration-500 group-hover:w-14" />
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EntryCards
