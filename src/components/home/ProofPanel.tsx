import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import type { CurtainItem } from '@/components/CurtainGrid'

export type Pillar = CurtainItem & { meta: string }

const PATTERN = 'https://ik.imagekit.io/qcvroy8xpd/66130b346905fe180d5723adb240f26b00187552.png'

const ProofPanel = ({
  title,
  pillars,
}: {
  eyebrow?: string
  title: string
  desc?: string
  pillars: Pillar[]
  ghost?: string
  aspect?: 'portrait' | 'landscape'
}) => (
  <section
    data-note="core-values"
    className="relative overflow-hidden py-14 lg:py-20"
    style={{
      backgroundImage: `url(${PATTERN})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundSize: '720px auto',
    }}
  >
    <div className="container">
      <div
        className="relative mx-auto w-full max-w-[736px] overflow-hidden rounded-[14px] bg-[#273561] px-6 pt-10 pb-6 sm:px-[52px] sm:pt-[54px] sm:pb-[51px]"
        style={{
          backgroundImage: `linear-gradient(rgba(39,53,97,0.9), rgba(39,53,97,0.9)), url(${PATTERN})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <h2
          className="mx-auto max-w-[430px] text-center text-[28px] leading-[1.05] text-white sm:text-[34px] sm:leading-[35px]"
          style={{
            fontFamily: "'SF Pro Display', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 274,
          }}
        >
          {title}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-[35px] sm:grid-cols-3 sm:gap-[18px]">
          {pillars.slice(0, 3).map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              aria-label={pillar.title}
              className="group relative aspect-4/3 overflow-hidden rounded-[24px] border-2 border-white bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={pillar.image.src}
                alt={pillar.image.alt}
                fill
                sizes="(min-width: 640px) 198px, calc(100vw - 96px)"
                className={`object-cover transition-transform duration-500 group-hover:scale-[1.025] ${pillar.image.position ?? 'object-center'}`}
              />
              <span aria-hidden className="absolute inset-0 bg-linear-to-t from-[#11182b]/45 via-transparent to-transparent" />
              <span className="absolute inset-x-4 bottom-4 text-[11px] font-semibold tracking-[0.15em] text-white uppercase">
                {pillar.meta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default ProofPanel
