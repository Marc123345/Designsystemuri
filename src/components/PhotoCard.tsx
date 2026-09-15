import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export type PhotoCardProps = {
  image?: string
  alt?: string
  eyebrow?: string
  title: string
  body?: string
  points?: readonly (readonly [string, string])[]
  note?: string
  collapsible?: boolean
  disclosureLabel?: string
  href?: string
  className?: string
  minHeight?: string
  weight?: 'light' | 'heavy'
}

/**
 * Shared photographic card. Image, scrim, type scale, radius and interaction
 * are deliberately centralized here because this card appears across multiple
 * page families and should never feel like a different component by context.
 */
const PhotoCard = ({
  image,
  alt = '',
  eyebrow,
  title,
  body,
  points,
  note,
  href,
  className = '',
  minHeight = 'min-h-[360px]',
  weight = 'light',
  collapsible = false,
  disclosureLabel,
}: PhotoCardProps) => {
  const scrim =
    weight === 'heavy'
      ? 'from-primary-3/95 via-primary-3/72 to-primary-3/8'
      : 'from-primary-3/94 via-primary-3/55 to-primary-3/10'

  const detailList = points && (
    <dl className="mt-5 space-y-3.5">
      {points.map(([label, desc]) => (
        <div key={label}>
          <dt className="small font-semibold text-white">{label}</dt>
          <dd className="small mt-1 max-w-[62ch] text-white/70">{desc}</dd>
        </div>
      ))}
    </dl>
  )

  const inner = (
    <>
      {image ? (
        <>
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="eid-motion-cinematic object-cover transition-transform group-hover:scale-[1.035]"
          />
          <span aria-hidden className={`absolute inset-0 bg-linear-to-t ${scrim} ${weight === 'heavy' ? 'via-62%' : 'via-55%'}`} />
        </>
      ) : (
        <span aria-hidden className="bg-primary-3 absolute inset-0" />
      )}

      <div className="relative z-10 flex h-full flex-col justify-end p-7 lg:p-9">
        {eyebrow && <p className="label text-white/85">{eyebrow}</p>}

        <h3 className="mt-3 text-white">{title}</h3>

        {body && <p className="body mt-3 max-w-[52ch] text-white/80">{body}</p>}

        {points &&
          (collapsible ? (
            <details className="group/d mt-6 border-t border-white/15 pt-5">
              <summary className="small flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white [&::-webkit-details-marker]:hidden">
                <span>{disclosureLabel ?? `${points.length} checks`}</span>
                <span className="eid-motion-base flex size-7 shrink-0 items-center justify-center rounded-full border border-white/30 transition-[border-color,transform] group-open/d:border-white/60">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="eid-motion-base size-3.5 transition-transform group-open/d:rotate-180">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>

              {detailList}
              {note && <p className="caption mt-5 text-white/80 italic">{note}</p>}
            </details>
          ) : (
            <div className="mt-5 border-t border-white/15 pt-5">{detailList}</div>
          ))}

        {note && !collapsible && <p className="caption mt-5 text-white/80 italic">{note}</p>}

        {href && (
          <span aria-hidden className="mt-6 flex items-center gap-3 text-white">
            <span className="eid-motion-emphasized h-px w-9 bg-white/50 transition-[width] group-hover:w-14" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </>
  )

  const shell = `eid-card-interactive group rounded-card relative isolate flex overflow-hidden shadow-card ${minHeight} ${className}`

  return href ? (
    <Link href={href} className={`${shell} focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-2`}>
      {inner}
    </Link>
  ) : (
    <div className={shell}>{inner}</div>
  )
}

export default PhotoCard
