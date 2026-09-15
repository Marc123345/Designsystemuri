import ProofArc, { type ProofArcItem } from '@/components/home/ProofArc'

/**
 * The three qualification pillars, now using the same interaction pattern as
 * the portfolio's Services arc: one dominant card in the centre, neighbouring
 * cards receding in perspective, arrows and drag/swipe navigation.
 *
 * The content itself is unchanged. Each card is still a short claim backed by
 * the same evidence photograph and still links to the page where the claim is
 * made in full. The carousel changes hierarchy, not meaning.
 */
export type Pillar = ProofArcItem

const ProofPanel = ({
  eyebrow,
  title,
  desc,
  pillars,
  ghost,
  aspect = 'portrait',
}: {
  eyebrow?: string
  title: string
  desc?: string
  pillars: Pillar[]
  ghost?: string
  aspect?: 'portrait' | 'landscape'
}) => (
  <section data-note="core-values" className="bg-primary-3 relative isolate overflow-hidden py-20 text-white lg:py-28">
    {/* A restrained brand glow gives the 3D stage depth without importing the
        portfolio's black/blue atmosphere wholesale. */}
    <div aria-hidden className="bg-primary-1/10 pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]" />

    <div className="container text-white">
      {/* Same editorial setup as the portfolio reference: chapter-like label,
          statement on the left, interaction cue on the right. */}
      <div className="flex items-center gap-3 text-white">
        {eyebrow && <span className="font-mono text-[11px] tracking-[0.24em] text-white/70 uppercase">{eyebrow}</span>}
        <span aria-hidden className="h-px w-12 bg-white/20" />
        <span className="font-mono text-[11px] tracking-[0.24em] text-white/50 uppercase">03 proof points</span>
      </div>

      <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.2fr_1fr] lg:gap-14">
        <h2 className="max-w-[18ch] text-[32px] leading-[1.02] font-semibold tracking-[-0.035em] text-white text-balance md:text-[40px] lg:text-[48px]">{title}</h2>
        <div className="max-w-[48ch] text-white md:justify-self-end">
          {desc && <p className="mb-3 text-base leading-relaxed text-white/80">{desc}</p>}
          <p className="text-base leading-relaxed text-white/70">
            Select a proof point or use the arrows to explore. Prefer to spin it? Drag the arc.
          </p>
        </div>
      </div>

      <div className="mt-8 text-white lg:mt-10">
        <ProofArc items={pillars} aspect={aspect} />
      </div>
    </div>

    {ghost && (
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[-0.14em] -z-10 overflow-hidden select-none">
        <span className="block whitespace-nowrap text-center text-[88px] leading-none font-bold tracking-[-0.06em] text-white/[0.025] uppercase lg:text-[154px]">{ghost}</span>
      </div>
    )}
  </section>
)

export default ProofPanel
