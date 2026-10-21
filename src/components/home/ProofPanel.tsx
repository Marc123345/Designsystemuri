import PhotoCard from '@/components/PhotoCard'

export type Pillar = {
  meta: string
  title: string
  href: string
  image: { src: string; alt: string; position?: string }
}

/**
 * Uri's September review: this is not a carousel. All three proof points need
 * to be visible at once.
 *
 * Oct 2026 (Marc): the section now uses the same containers as Applications
 * and Quality Control below it, a centred heading over a row of PhotoCards,
 * instead of its own navy band with small cards.
 */
const ProofPanel = ({
  eyebrow,
  title,
  desc,
  pillars,
}: {
  eyebrow?: string
  title: string
  desc?: string
  pillars: Pillar[]
  ghost?: string
  aspect?: 'portrait' | 'landscape'
}) => (
  <section data-note="core-values" className="relative isolate bg-white py-10 lg:py-14">
    <div className="container">
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow && <p className="text-primary font-mono text-[11px] tracking-[0.22em] uppercase">{eyebrow}</p>}
        <h2 className="text-primary-3 mt-3 text-[34px] leading-none font-bold tracking-[-0.035em] text-balance md:text-[44px] lg:text-[52px]">{title}</h2>
        {desc && <p className="text-default-600 mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed md:text-base">{desc}</p>}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-3 lg:mt-8 lg:gap-5">
        {pillars.map((item, index) => (
          <PhotoCard
            key={`${item.meta}-${item.href}`}
            image={item.image.src}
            alt={item.image.alt}
            eyebrow={`${String(index + 1).padStart(2, '0')} · ${item.meta}`}
            title={item.title}
            href={item.href}
            minHeight="min-h-[260px] lg:min-h-[320px]"
          />
        ))}
      </div>
    </div>
  </section>
)

export default ProofPanel
