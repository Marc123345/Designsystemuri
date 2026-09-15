import { Link } from '@/i18n/navigation'

/** Thin brand-colour chapter cut between larger content sections. */
const SectionBanner = ({
  id,
  label,
  body,
  ctaHref,
  ctaLabel,
  shade = 2,
}: {
  id?: string
  label: string
  body?: string
  ctaHref?: string
  ctaLabel?: string
  shade?: 1 | 2 | 3
}) => {
  const bg = shade === 1 ? 'bg-primary-1' : shade === 3 ? 'bg-primary-3' : 'bg-primary'

  return (
    <section id={id} data-note={id ? `banner:${id}` : 'banner'} className={`${bg} border-y border-white/10 text-white`}>
      <div className="container">
        <div className="flex flex-col gap-2 py-4.5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10">
          <p className="label shrink-0 text-white/65">{label}</p>

          {body && <p className="small text-white/90 lg:flex-1">{body}</p>}

          {ctaHref && ctaLabel && (
            <Link href={ctaHref} className="caption eid-motion-base shrink-0 font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline">
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default SectionBanner
