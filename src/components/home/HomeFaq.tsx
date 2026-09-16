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
}: {
  eyebrow: string
  title: string
  desc?: string
  items: FAQItem[]
}) => {
  const midpoint = Math.ceil(items.length / 2)
  const columns = [items.slice(0, midpoint), items.slice(midpoint)]

  return (
    <section data-note="faq" className="py-10 lg:py-12">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
          <div className="lg:pt-1">
            <p className="text-primary font-mono text-[10px] tracking-[0.22em] uppercase">{eyebrow}</p>
            <h2 className="text-primary-3 mt-3 max-w-[14ch] text-[30px] leading-[1.02] font-bold tracking-[-0.035em] md:text-[36px] lg:text-[40px]">{title}</h2>
            {desc ? <p className="text-default-600 mt-4 max-w-[42ch] text-[14px] leading-relaxed lg:text-[15px]">{desc}</p> : null}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-3">
                {column.map((item, itemIndex) => {
                  const index = columnIndex * midpoint + itemIndex
                  return (
                    <details key={item.q} className="group bg-primary-3 open:bg-primary rounded-card border border-white/10 px-5 transition-colors">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
                        <div className="flex min-w-0 items-start gap-3">
                          <span className="mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums text-white/50 group-open:text-white">{String(index + 1).padStart(2, '0')}</span>
                          <h3 className="text-[14px] leading-snug font-semibold text-white/92 lg:text-[15px]">{item.q}</h3>
                        </div>
                        <span aria-hidden className="group-open:bg-white group-open:text-primary flex size-7 shrink-0 items-center justify-center rounded-control border border-white/25 text-white/75 transition-colors">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-open:rotate-45">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <p className="pb-4 ps-7 text-[13px] leading-relaxed text-white/78 lg:text-[14px]">{item.a}</p>
                    </details>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeFaq
