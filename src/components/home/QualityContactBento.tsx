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
const QualityContactBento = () => {
  const locale = useLocale() as Locale

  return (
    /* ⚠ THIS IS THE CONTACT BLOCK NOW. Card A — "Measured on every run",
       the 01-04 checks and the "See how our QC works" button — is gone on
       Marc's instruction, and so is the heading pair above it, which framed
       QC rather than the ask. The homepage was saying QC twice: this card
       and the four-controls section directly above it, which names the
       actual controls and carries its own route to /quality.

       CHECKS and the section heading strings are in this file's history. */
    <section data-note="quality-contact" className="py-14 lg:py-20">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* ── B: the ask ── */}
          <article className="rounded-card bg-primary flex flex-col justify-between p-7 lg:col-span-7 lg:p-9">
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
