import LogoWatermark from '@/components/LogoWatermark'
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
  <section data-note="core-values" className="bg-default-50 relative isolate overflow-hidden py-12 lg:py-16">
    <LogoWatermark marks={['-right-32 -top-24 size-[380px] lg:size-[480px]']} />
    <div className="container">
      {/* Same heading as Applications and Quality Control: one centred H2 and
          a one-line description, no eyebrow. */}
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-primary-3 text-[34px] leading-none font-bold tracking-[-0.035em] md:text-[44px] lg:text-[52px]">{title}</h2>
        {desc && <p className="text-default-600 mx-auto mt-3 max-w-3xl text-[15px] leading-relaxed md:text-base">{desc}</p>}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-3 lg:gap-5">
        {pillars.map((item, index) => (
          <PhotoCard
            key={`${item.meta}-${item.href}`}
            image={item.image.src}
            alt={item.image.alt}
            eyebrow={String(index + 1).padStart(2, '0')}
            title={item.title}
            href={item.href}
            minHeight="min-h-[220px] lg:min-h-[245px]"
          />
        ))}
      </div>
    </div>
  </section>
)

export default ProofPanel
