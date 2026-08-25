import Image from 'next/image'
import { Icon } from '@iconify/react'
import { ArrowButton } from '@/components/ui'

/**
 * The QC band, as two connected panels.
 *
 * ── What it was ────────────────────────────────────────────────────────────
 *
 * One block: eyebrow, heading and paragraph across seven columns, the CTA
 * floated off to the right of them, and the four checkpoints as a rule-
 * separated row underneath. Everything at one level, so the four things EID
 * actually measures read as a footnote to the argument rather than as its
 * evidence.
 *
 * ── What it is now ─────────────────────────────────────────────────────────
 *
 * Two panels, and the split is by KIND rather than by length:
 *
 *   Left  — the claim. Every production run is tested; here is why that is a
 *           process rather than a promise; here is where to read the detail.
 *   Right — the evidence. The four things measured on every run, numbered.
 *
 * That division is what makes the connector meaningful: it runs from the
 * statement to the measurements, which is the direction the argument travels.
 * A connector between two arbitrary halves of one paragraph would be
 * decoration.
 *
 * ── The connector ──────────────────────────────────────────────────────────
 *
 * A hairline rail with a slow pulse travelling along it — right on desktop,
 * down on mobile, which is the reading order in both cases. It is
 * `aria-hidden`: the relationship is already carried by the copy and the
 * layout, and "dot moving along a line" announces nothing useful.
 *
 * 2.6s and low contrast on purpose. This is a connector, not a loading
 * indicator; if it pulls the eye off the copy it has failed. Keyframes live in
 * _general.css so the reduced-motion block governs them — see the note there
 * about why it is cancelled outright rather than collapsed.
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
  /* `rounded-card` — every other full-bleed band on the site carries the 24px
     corner, and `overflow-hidden` was already here for the photograph, so the
     radius clips the image and both scrims for free. */
  <section data-note="qc-banner" className="rounded-card relative isolate overflow-hidden">
    <Image src="/eid/home/qc.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
    {/* Two layers, not one: a flat brand wash to pull the photograph onto the
        palette, then a left-weighted gradient so the copy clears contrast
        without flattening the whole frame to a solid colour. */}
    <div aria-hidden className="bg-primary-3/82 absolute inset-0 -z-10" />
    <div aria-hidden className="from-default-950 absolute inset-0 -z-10 bg-linear-to-r to-transparent to-70%" />

    <div className="container">
      <div className="py-14 lg:py-16">
        {/* 12 columns split 6 / 1 / 5: the connector gets a column of its own
            rather than being absolutely positioned across a gap, so it stays
            centred at every width without a magic number. */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
          {/* ── PANEL ONE: the claim ── */}
          <div className="rounded-card flex flex-col border border-white/12 bg-white/[0.04] p-7 lg:col-span-6 lg:p-9">
            <div className="rounded-control inline-flex w-fit items-center gap-1.5 border border-white/20 px-3.5 py-1.25">
              <span className="bg-primary-1 size-2" />
              <span className="text-sm text-white">{eyebrow}</span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white md:text-[30px] lg:text-[34px]">{title}</h2>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/80">{desc}</p>

            {/* `mt-auto` pins the CTA to the foot so both panels end level
                whatever the copy does. */}
            <div className="mt-auto pt-8">
              <ArrowButton href={ctaHref} label={ctaLabel} variant="light" />
            </div>
          </div>

          {/* ── THE CONNECTOR ──
              A vertical rail below lg, horizontal at lg. The dot is centred by
              transform and animated from there, which is why both keyframe
              sets re-state the centring translate. */}
          <div aria-hidden className="relative flex items-center justify-center lg:col-span-1">
            <span className="absolute inset-x-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/15 lg:inset-x-0 lg:top-1/2 lg:bottom-auto lg:h-px lg:w-full lg:translate-x-0 lg:-translate-y-1/2" />
            <span className="qc-flow-dot bg-primary-1 absolute left-1/2 top-1/2 size-1.5 rounded-full shadow-[0_0_10px_2px_rgba(61,82,144,0.8)]" />
          </div>

          {/* ── PANEL TWO: the evidence ── */}
          <div className="rounded-card border border-white/12 bg-white/[0.04] p-7 lg:col-span-5 lg:p-9">
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/55 uppercase">Measured on every run</p>

            <ul className="mt-5">
              {checks.map((check, i) => (
                <li
                  key={check}
                  className="grid grid-cols-[auto_auto_1fr] items-start gap-x-3 border-t border-white/10 py-3.5 last:border-b"
                >
                  <span className="font-mono text-[11px] text-white/40 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <Icon icon="tabler:circle-check" className="text-primary-1 mt-0.5 size-4 shrink-0" />
                  <span className="text-[0.95rem] leading-snug text-white/85">{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default QcBanner
