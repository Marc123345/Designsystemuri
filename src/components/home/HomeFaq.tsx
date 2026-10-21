import { ArrowButton } from '@/components/ui'

type FAQItem = { q: string; a: string }

/**
 * Uri's September review asks for the FAQ to stop behaving like a full-page
 * vertical stack. On desktop the eight questions are split 1–4 / 5–8 so the
 * whole set is visible much sooner; mobile stays one column for readability.
 * Native details/summary keeps the answers accessible and crawlable.
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
}) => {
  /* Bento (Oct 2026): the heading is a tile of its own, and on desktop the
     grid is four columns with the heading and the third question each spanning
     two, so five questions and a heading fill two even rows. Rows stretch, so
     opening a question grows its whole row and the tiles stay flush. */
  const span = (index: number) => (index === 2 ? 'lg:col-span-2' : '')

  return (
    <section data-note="faq" className="py-10 lg:py-12">
      <div className="container">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {/* Depth (Marc, Oct 2026): the heading tile is lifted off the page
              with a soft shadow and carries the EID mark as a faint facet
              watermark; the question tiles below get a navy gradient, a top
              highlight, a corner glow and a large ghost numeral. */}
          <div className="rounded-card border-default-200 relative isolate flex flex-col justify-between overflow-hidden border bg-linear-to-br from-white to-default-50 p-7 shadow-[0_24px_60px_-34px_rgba(28,38,80,0.35)] md:col-span-2 lg:p-9">
            <span
              aria-hidden
              className="bg-primary pointer-events-none absolute -right-10 -bottom-12 -z-10 size-56 opacity-[0.06] lg:size-64"
              style={{ maskImage: "url('/eid/brand/eid-logo-outline.svg')", WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')", maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat' }}
            />
            <div>
              <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{eyebrow}</p>
              <h2 className="text-primary-3 mt-3 text-[30px] leading-[1.02] font-bold tracking-[-0.035em] md:text-[36px] lg:text-[40px]">{title}</h2>
            </div>
            <div>
              {desc ? <p className="text-default-600 mt-5 max-w-[56ch] text-[14px] leading-relaxed lg:text-[15px]">{desc}</p> : null}
              {cta ? (
                <div className="mt-6">
                  <ArrowButton href={cta.href} label={cta.label} />
                </div>
              ) : null}
            </div>
          </div>

          {items.map((item, index) => (
            <details
              key={item.q}
              className={`group rounded-card from-primary to-primary-3 relative isolate overflow-hidden bg-linear-to-br p-6 shadow-[0_24px_48px_-28px_rgba(28,38,80,0.75)] ring-1 ring-white/10 ring-inset transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_64px_-30px_rgba(28,38,80,0.9)] open:ring-white/25 lg:p-7 ${span(index)}`}
            >
              <summary className="flex min-h-[132px] cursor-pointer list-none flex-col justify-between gap-6 [&::-webkit-details-marker]:hidden">
                {/* Inside the summary: anything else in a closed <details> is hidden. */}
                <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-white/45 to-transparent" />
                <span aria-hidden className="pointer-events-none absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-white/12 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-open:opacity-100" />
                <span aria-hidden className="pointer-events-none absolute -right-2 -bottom-8 -z-10 text-[132px] leading-none font-bold tracking-[-0.06em] text-white/[0.07] tabular-nums select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold tabular-nums text-white/55 group-open:text-white">{String(index + 1).padStart(2, '0')}</span>
                  <span aria-hidden className="group-open:bg-white group-open:text-primary flex size-8 shrink-0 items-center justify-center rounded-control border border-white/25 text-white/75 transition-colors">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4 transition-transform duration-300 group-open:rotate-45">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <h3 className="text-[16px] leading-snug font-semibold text-white text-balance lg:text-[18px]">{item.q}</h3>
              </summary>
              <p className="mt-4 border-t border-white/15 pt-4 text-[13px] leading-relaxed text-white/80 lg:text-[14px]">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeFaq
