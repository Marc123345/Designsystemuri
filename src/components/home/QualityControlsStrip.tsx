import { Icon } from '@iconify/react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'

/**
 * The four QC controls, named, on one line.
 *
 * ── Why names only ──────────────────────────────────────────────────────────
 *
 * The quality page carries these as four PhotoCards in a 7/5–5/7 arrangement,
 * each with a photograph and a paragraph. That is the right treatment on the
 * page the reader chose to open. On the homepage the job is different: say that
 * the four controls exist and get out of the way. So this is the names, an icon
 * each, and a route to the page where they are explained.
 *
 * ── Horizontal on purpose ───────────────────────────────────────────────────
 *
 * Four stacked cards would add most of a screen to a homepage that is already
 * long. As a single row it costs one band of about 120px, and the four read as
 * a set — which is what they are — rather than as four separate claims.
 *
 * Kept in step with components/quality/TheControls.tsx by hand: these are the
 * same four titles. If a control is renamed there, rename it here.
 */

const CONTROLS: { title: string; icon: string }[] = [
  { title: 'Size & Morphology: Mesh', icon: 'tabler:grid-dots' },
  { title: 'Size & Morphology: Micron', icon: 'tabler:ruler-measure' },
  { title: 'Advanced Chemical Cleaning', icon: 'tabler:flask' },
  { title: 'Toughness (TI / TTI)', icon: 'tabler:shield-check' },
]

export default function QualityControlsStrip({ locale }: { locale: Locale }) {
  return (
    <section data-note="qc-strip" className="border-default-200 border-y bg-white py-7">
      <div className="container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="text-default-500 shrink-0 text-[11px] font-semibold tracking-[0.14em] uppercase">
            {t(locale, 'Every lot, four controls')}
          </p>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-8">
            {CONTROLS.map((c) => (
              <li key={c.title} className="flex items-center gap-2.5">
                <Icon icon={c.icon} className="text-primary size-[18px] shrink-0" />
                <span className="text-default-800 text-[13px] leading-tight font-medium">{t(locale, c.title)}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/quality"
            className="text-primary group inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold"
          >
            {t(locale, 'How we measure')}
            <Icon icon="tabler:arrow-narrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
