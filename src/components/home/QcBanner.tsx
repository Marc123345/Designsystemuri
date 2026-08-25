import Image from 'next/image'
import { Icon } from '@iconify/react'
import { ArrowButton } from '@/components/ui'

/**
 * The QC band: two cards, each carrying its own photograph.
 *
 * ── What changed, and why the old arrangement was wrong ─────────────────────
 *
 * This was one full-bleed photograph across the whole band, washed to navy,
 * with two translucent panels floated on top of it. Marc's instruction is to
 * drop the background and put the pictures inside the cards instead.
 *
 * That is the site rule catching up with this block rather than a new idea.
 * Images are full cover with the text over them, and the unit that carries an
 * image is the CARD — that is how CoreValues, the four controls, the entry
 * cards and every PhotoCard on the site work. A photograph behind two
 * translucent boxes is a different pattern: the panels read as glass laid over
 * a picture neither of them owns, and the picture itself gets cropped by
 * whatever height the copy happens to need.
 *
 * With a photograph per card each one is a thing with a subject:
 *
 *   left   the check being made — a slide under the objective, a gloved hand
 *          on the stage. The claim card, so it shows the claim happening.
 *   right  the optical measurement rig with a crystal magnified and its
 *          dimensions read out beside it. The evidence card, and this is the
 *          only frame in the library of a machine in the act of measuring,
 *          which is exactly what "measured on every run" asserts.
 *
 * ── Height fits the content now ─────────────────────────────────────────────
 *
 * Also Marc's note. The band used to be sized by a background photograph it
 * had to keep looking like a photograph, so it carried height the copy did not
 * need. The cards are `min-h` with `items-stretch`: they take the room the
 * words want and the two stay level with each other, and nothing is padded out
 * to protect a picture that is no longer behind them.
 *
 * ── The connector stays ─────────────────────────────────────────────────────
 *
 * The rail and its travelling dot were an explicit earlier request and were
 * not part of this one, so they are kept. They are recoloured: they were white
 * at low opacity because they sat on a dark band, and on the page's own white
 * ground that is invisible. Same geometry, ink instead of light.
 *
 * Keyframes live in _general.css so the reduced-motion block governs them —
 * see the note there about why they are cancelled outright rather than
 * collapsed.
 */
const QcBanner = ({
  eyebrow,
  title,
  desc,
  checks,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string
  title: string
  desc: string
  checks: string[]
  ctaLabel: string
  ctaHref: string
}) => (
  <section data-note="qc-banner" className="py-16 lg:py-24">
    <div className="container">
      {/* 6 / 1 / 5, unchanged: the connector keeps a column of its own rather
          than being absolutely positioned across a gap, so it stays centred at
          every width without a magic number. */}
      <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-0">
        {/* ── CARD ONE: the claim ── */}
        <article className="rounded-card relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden p-7 lg:col-span-6 lg:min-h-[460px] lg:p-9">
          <Image
            src="/eid/home/qc.jpg"
            alt="A gloved hand adjusting the stage of a laboratory microscope with a prepared sample slide under the objective"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="-z-20 object-cover object-center"
          />
          {/* PhotoCard's heavy scrim, to the value. This card carries an
              eyebrow, a heading, a paragraph and a button — more copy than a
              value tile, so it needs the cover a `weight="heavy"` PhotoCard
              gets rather than the light one. */}
          <span aria-hidden className="from-primary-3/95 via-primary-3/72 to-primary-3/8 absolute inset-0 -z-10 bg-linear-to-t via-62%" />

          <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/25 px-3.5 py-1.25">
            <span className="bg-primary-1 size-2" />
            <span className="text-sm text-white">{eyebrow}</span>
          </div>

          <h2 className="mt-5 text-2xl font-bold text-white md:text-[30px] lg:text-[34px]">{title}</h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/85">{desc}</p>

          <div className="mt-7">
            <ArrowButton href={ctaHref} label={ctaLabel} variant="light" />
          </div>
        </article>

        {/* ── THE CONNECTOR ──
            Vertical below lg, horizontal at lg. The dot is centred by transform
            and animated from there, which is why both keyframe sets re-state
            the centring translate. */}
        <div aria-hidden className="relative flex items-center justify-center lg:col-span-1">
          <span className="bg-default-200 absolute inset-x-1/2 top-0 bottom-0 w-px -translate-x-1/2 lg:inset-x-0 lg:top-1/2 lg:bottom-auto lg:h-px lg:w-full lg:translate-x-0 lg:-translate-y-1/2" />
          <span className="qc-flow-dot bg-primary absolute top-1/2 left-1/2 size-1.5 rounded-full shadow-[0_0_10px_2px_rgba(44,60,108,0.35)]" />
        </div>

        {/* ── CARD TWO: the evidence ── */}
        <article className="rounded-card relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden p-7 lg:col-span-5 lg:min-h-[460px] lg:p-9">
          <Image
            src="/eid/qc-inspection.jpg"
            alt="An optical measurement system with a diamond crystal magnified on screen and its dimensions read out alongside"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="-z-20 object-cover object-center"
          />
          {/* ⚠ A HEAVIER SCRIM THAN CARD ONE, AND IT IS MEASURED, NOT TASTE.
              This frame is a lit monitor; card one's is a microscope body in
              shadow. Under card one's scrim the copy here came out at 2.3-2.5:1
              against the brightest part of the image — the eyebrow and all four
              numerals failed 1.4.3 outright, while the identical treatment on
              card one passed.

              Two cards with the same scrim is only correct if they have
              similarly lit photographs. Re-measure if either image changes;
              the check is compositing image + scrim to a canvas and sampling
              the worst-case ground behind each text box, not eyeballing it. */}
          <span aria-hidden className="from-primary-3/96 via-primary-3/88 to-primary-3/45 absolute inset-0 -z-10 bg-linear-to-t via-55%" />

          <p className="font-mono text-[11px] tracking-[0.2em] text-white/75 uppercase">Measured on every run</p>

          {/* Rules at white/15 rather than white/10. On a photograph the
              hairlines have texture behind them instead of flat navy, and at
              10% they disappear over the lighter passages of the frame. */}
          <ul className="mt-5">
            {checks.map((check, i) => (
              <li
                key={check}
                className="grid grid-cols-[auto_auto_1fr] items-start gap-x-3 border-t border-white/15 py-3.5 last:border-b"
              >
                <span className="font-mono text-[11px] text-white/70 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                {/* primary-1 (#3d5290) is a mid navy and was chosen when this
                    card sat on a flat dark band. Over a photograph it drops
                    into the image; white/70 keeps the tick readable as a mark
                    rather than as a smudge. */}
                <Icon icon="tabler:circle-check" className="mt-0.5 size-4 shrink-0 text-white/70" />
                <span className="text-[0.95rem] leading-snug text-white">{check}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  </section>
)

export default QcBanner
