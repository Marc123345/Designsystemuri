import type { ReactNode } from 'react'

const SOLID_PATTERN_MASK = {
  maskImage: "url('/eid/brand/eid-logo-solid.svg')",
  WebkitMaskImage: "url('/eid/brand/eid-logo-solid.svg')",
  maskRepeat: 'repeat',
  WebkitMaskRepeat: 'repeat',
  maskSize: '86px 86px',
  WebkitMaskSize: '86px 86px',
} as const

const EvidencePanel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-[14px] bg-[#273561] ${className}`}>
    {/* The uploaded EID mark becomes the panel texture itself. Two staggered
        edge fields echo the supplied pyramid/side-pattern artwork and fade
        toward the centre so the copy and photography remain dominant. */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 start-0 w-[48%]"
      style={{
        maskImage: 'linear-gradient(to right, black 0%, black 36%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, black 0%, black 36%, transparent 100%)',
      }}
    >
      <div
        className="absolute inset-0 bg-white opacity-[0.075]"
        style={{ ...SOLID_PATTERN_MASK, maskPosition: '0 0', WebkitMaskPosition: '0 0' }}
      />
    </div>

    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 end-0 w-[48%]"
      style={{
        maskImage: 'linear-gradient(to left, black 0%, black 36%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to left, black 0%, black 36%, transparent 100%)',
      }}
    >
      <div
        className="absolute inset-0 bg-white opacity-[0.055]"
        style={{ ...SOLID_PATTERN_MASK, maskPosition: '43px 43px', WebkitMaskPosition: '43px 43px' }}
      />
    </div>

    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
      }}
    />

    <div className="relative">{children}</div>
  </div>
)

export default EvidencePanel
