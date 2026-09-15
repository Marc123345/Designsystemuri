import type { ReactNode } from 'react'

const PATTERN = 'https://ik.imagekit.io/qcvroy8xpd/66130b346905fe180d5723adb240f26b00187552.png'

const EvidencePanel = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-[14px] bg-[#273561] ${className}`}
    style={{
      backgroundImage: `linear-gradient(rgba(39,53,97,0.90), rgba(39,53,97,0.90)), url('${PATTERN}')`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
  >
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
