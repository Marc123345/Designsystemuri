import Image from 'next/image'
import { Icon } from '@iconify/react'
import { ArrowButton } from '@/components/ui'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { site } from '@/lib/site'
import { useLocale } from 'next-intl'

/**
 * Quality and the ask, as one bento.
 *
 * ── What this replaces ──────────────────────────────────────────────────────
 *
 * Two consecutive sections: QcBanner (two photo cards making the quality
 * claim) and ContactStrip (a bordered band with the ask and two channels).
 * Marc's instruction is to combine them, give them a header, and put the blue
 * cut above them so they read as a section rather than as a tail on
 * Applications.
 *
 * They belong together. The QC block was the last proof on the page and the
 * contact strip was the ask immediately under it — two blocks, one move:
 * here is why the material is dependable, here is how to start. Run as
 * separate sections they read as the page ending twice.
 *
 * ── Why it now matches the page's rhythm ────────────────────────────────────
 *
 * Every other block on this page is `SectionBanner` → section with its own h2
 * and supporting paragraph → grid. Products, Why EID and Applications all do
 * it. Quality and Contact were the only two that did not, which is exactly why
 * they read as a continuation of Applications rather than as new sections.
 *
 * So the structure here is deliberately the products section's, to the token:
 * the same 7/5 heading-and-paragraph pair at the same sizes, the same
 * `mt-14 lg:mt-18` before the grid, the same `py-20 lg:py-30` band height. It
 * is not a new layout, it is the page's existing one applied to content that
 * was missing it.
 *
 * ── The bento ───────────────────────────────────────────────────────────────
 *
 *   ┌───────────────────────────┬──────────────────┐
 *   │  A  Measured on every run │  B  The ask      │
 *   │     4 checks over the     │     solid navy   │
 *   │     microscope frame      ├──────────────────┤
 *   │     + link to /quality    │  C  Email, Call  │
 *   └───────────────────────────┴──────────────────┘
 *
 * 7 / 5 with A spanning both rows, so it is a bento rather than a 2x2 — one
 * tall cell against two stacked. The three cells are also three different
 * surfaces on purpose: a photograph, a solid brand panel and a light card. A
 * bento of three identical treatments is a grid.
 *
 * ── The QC claim moved into the section heading ─────────────────────────────
 *
 * "Every production run is tested before it leaves" was the heading inside a
 * card. It is the section's h2 now, because that is what the products and
 * applications sections do and because a heading inside a cell competes with
 * the section heading above it. The paragraph under it is the same one that
 * card carried.
 */
const CHECKS = ['Particle size distribution', 'Crystal morphology', 'Coating weight & coverage', 'ISO 9001 & traceability']

const QualityContactBento = () => {
  const locale = useLocale() as Locale

  return (
    <section data-note="quality-contact" className="py-20 lg:py-30">
      <div className="container">
        {/* The products section's heading pair, to the token — see the note. */}
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="text-[28px] font-bold md:text-[36px] lg:text-[42px]">{t(locale, 'Every production run is tested before it leaves.')}</h2>
          </div>
          <p className="text-default-600 lg:col-span-5">
            {t(locale, 'Consistency is a process, and ours runs on measurement. We test the run and record the result rather than sampling and assuming — ISO 9001 certified, with full traceability from incoming raw material to shipped lot.')}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-18 lg:grid-cols-12">
          {/* ── A: the evidence, over the frame of a check being made ── */}
          <article className="rounded-card relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden p-7 lg:col-span-7 lg:row-span-2 lg:p-9">
            <Image
              src="/eid/home/qc.jpg"
              alt={t(locale, 'A gloved hand adjusting the stage of a laboratory microscope with a prepared sample slide under the objective')}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="-z-20 object-cover object-center"
            />
            {/* ⚠ HEAVIER THAN PhotoCard's heavy scrim, AND THE REASON IS THE
                ROW SPAN. This cell is 496px because it spans both bento rows,
                against the ~420px the same content had in the old two-card
                band. Taller card, bottom-anchored content: the label is pushed
                further up the frame, and further up this frame is the lit
                microscope body — the brightest thing in it.

                Measured on the composited card, "Measured on every run" came
                out at 1.9:1 against 4.5 needed. The identical treatment passed
                at the old height. A card growing is a contrast change, not
                just a layout one.

                Reaching to 50% at the top rather than 8%, with the mid-stop
                lifted to 88%, because the copy here occupies most of the card
                rather than just its foot. */}
            <span aria-hidden className="from-primary-3/96 via-primary-3/88 to-primary-3/50 absolute inset-0 -z-10 bg-linear-to-t via-50%" />

            {/* Solid white. At white/90 this measured 4.54:1 — over the 4.5
                floor by four hundredths, which is a rounding error rather than
                a margin. Full white is 5.7:1 and costs nothing here. */}
            <p className="font-mono text-[11px] tracking-[0.2em] text-white uppercase">{t(locale, 'Measured on every run')}</p>

            <ul className="mt-5">
              {CHECKS.map((check, i) => (
                <li key={check} className="grid grid-cols-[auto_auto_1fr] items-start gap-x-3 border-t border-white/15 py-3.5 last:border-b">
                  {/* white/85, not white/70, and it is the same finding as the
                      label above rather than a new one. The label was lifted to
                      solid white because white/90 measured 4.54:1 — "a rounding
                      error rather than a margin". These two sit one line lower,
                      at roughly 65% up the frame where the scrim is 77%, and at
                      white/70 they measure 4.49:1 against the same 4.5 floor:
                      the identical rounding error, missed because the fix went
                      to the line above them and stopped. white/85 is 5.73:1 and
                      keeps them quieter than the label, which is the point of
                      dimming them at all. */}
                  <span className="font-mono text-[11px] text-white/85 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <Icon icon="tabler:circle-check" className="mt-0.5 size-4 shrink-0 text-white/85" />
                  <span className="text-[0.95rem] leading-snug text-white">{t(locale, check)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <ArrowButton href="/quality" label={t(locale, 'See how our QC works')} variant="light" />
            </div>
          </article>

          {/* ── B: the ask ── */}
          <article className="rounded-card bg-primary flex flex-col justify-between p-7 lg:col-span-5 lg:p-9">
            <div>
              <h3 className="text-2xl font-bold text-white lg:text-[28px]">{t(locale, 'Tell us what you need')}</h3>
              <p className="mt-4 text-base leading-relaxed text-white/85">
                {t(locale, 'Request a quote, order a sample, or ask a technical question. One form, routed to someone who works with the material.')}
              </p>
            </div>
            <div className="mt-8">
              <ArrowButton href="/contact" label={t(locale, 'Contact')} variant="light" />
            </div>
          </article>

          {/* ── C: the two direct channels ──
              A light card against the navy above it and the photograph beside
              it, because the buyer who wants a phone number rather than a form
              should not have to find it on a dark panel. */}
          <div className="rounded-card border-default-200 bg-default-50 border p-7 lg:col-span-5 lg:p-9">
            <dl className="flex flex-col gap-5">
              {[
                { icon: 'tabler:mail', label: t(locale, 'Email'), value: site.email, href: `mailto:${site.email}` },
                { icon: 'tabler:phone', label: t(locale, 'Call'), value: site.phone, href: site.phoneHref },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-default-600 text-xs tracking-[0.18em] uppercase">{row.label}</dt>
                  <dd className="mt-1.5">
                    <a href={row.href} className="text-default-900 hover:text-primary group inline-flex items-center gap-3 transition-colors">
                      <span className="border-default-200 text-primary group-hover:border-primary rounded-control flex size-9 shrink-0 items-center justify-center border bg-white transition-colors">
                        <Icon icon={row.icon} className="size-4.5" />
                      </span>
                      <span className="text-[0.95rem] font-semibold break-words">{row.value}</span>
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QualityContactBento
