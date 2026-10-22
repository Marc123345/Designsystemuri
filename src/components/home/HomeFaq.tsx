import LogoWatermark from '@/components/LogoWatermark'
import { ArrowButton } from '@/components/ui'

type FAQItem = { q: string; a: string }

/**
 * Uri's September review asks for the FAQ to stop behaving like a full-page
 * vertical stack; his October note asks for it to be "a very short section".
 * So: the heading is one row (title left, intro and CTA right), and the six
 * questions sit in a 3 x 2 grid of compact tiles (2 x 3 on tablet, one column
 * on phones). Native details/summary keeps the answers accessible and
 * crawlable; opening one grows only its own row.
 */
const HomeFaq = ({
  eyebrow,
  title,
  desc,
  items,
  cta,
}: {
  eyebrow: string
  title: string
  desc?: string
  items: FAQItem[]
  cta?: { href: string; label: string }
}) => (
  <section data-note="faq" className="relative isolate py-10 lg:py-12">
    <LogoWatermark marks={['-right-24 top-1/2 -translate-y-1/2 size-[260px] lg:size-[320px]']} />
    <div className="container">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div>
          <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{eyebrow}</p>
          <h2 className="text-primary-3 mt-2 text-[28px] leading-[1.05] font-bold tracking-[-0.035em] md:text-[34px]">{title}</h2>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center lg:max-w-[600px]">
          {desc ? <p className="text-default-600 text-[14px] leading-relaxed">{desc}</p> : null}
          {cta ? (
            <div className="shrink-0">
              <ArrowButton href={cta.href} label={cta.label} />
            </div>
          ) : null}
        </div>
      </div>

      {/* Depth (Marc, Oct 2026): navy gradient, a top highlight, a corner glow
          and a soft shadow, with a small lift on hover. The decorations live
          inside the summary: anything else in a closed <details> is hidden. */}
      <div className="mt-6 grid items-start gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <details
            key={item.q}
            className="group rounded-card from-primary to-primary-3 relative isolate overflow-hidden bg-linear-to-br shadow-[0_18px_40px_-26px_rgba(28,38,80,0.75)] ring-1 ring-white/10 ring-inset transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_52px_-28px_rgba(28,38,80,0.9)] open:ring-white/25"
          >
            <summary className="flex min-h-[96px] cursor-pointer list-none items-center gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span aria-hidden className="pointer-events-none absolute inset-x-5 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />
              <span aria-hidden className="pointer-events-none absolute -top-16 -right-12 -z-10 size-40 rounded-full bg-white/12 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-open:opacity-100" />
              <span className="w-6 shrink-0 text-[12px] font-semibold text-white/55 tabular-nums group-open:text-white">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="flex-1 text-[15px] leading-snug font-semibold text-white">{item.q}</h3>
              <span aria-hidden className="group-open:text-primary rounded-control flex size-7 shrink-0 items-center justify-center border border-white/25 text-white/75 transition-colors group-open:bg-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-open:rotate-45">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="mx-5 mb-5 border-t border-white/15 pt-3 text-[13px] leading-relaxed text-white/80">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
)

export default HomeFaq
