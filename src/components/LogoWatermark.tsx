const MASK = {
  maskImage: "url('/eid/brand/eid-logo-outline.svg')",
  WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')",
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
} as const

/**
 * Background depth for home-page sections (Marc, Oct 2026): large EID mark
 * outlines in brand navy, each with a soft glow behind it, set into the
 * section's corners. Drop it as the first child of a `relative isolate`
 * section; it clips itself, so the section needs no overflow change.
 *
 * Each mark is a position + size string, e.g. '-left-24 top-10 size-[380px]'.
 */
const LogoWatermark = ({ marks, tone = 'navy' }: { marks: string[]; tone?: 'navy' | 'white' }) => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    {marks.map((mark) => (
      <div key={mark} className={`absolute ${mark}`}>
        <span className={`absolute inset-[18%] rounded-full blur-3xl ${tone === 'white' ? 'bg-white/10' : 'bg-primary/[0.1]'}`} />
        <span className={`absolute inset-0 ${tone === 'white' ? 'bg-white opacity-[0.06]' : 'bg-primary opacity-[0.11]'}`} style={MASK} />
      </div>
    ))}
  </div>
)

export default LogoWatermark
