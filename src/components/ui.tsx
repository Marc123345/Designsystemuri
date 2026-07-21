'use client'

import { Link } from '@/i18n/navigation'
import { Icon } from '@iconify/react'

/**
 * The template's signature button: a label that slides up on hover and an arrow
 * that slides across. Every CTA in the site goes through here so the motion and
 * the corner radius stay identical.
 */
export const ArrowButton = ({
  href,
  label,
  variant = 'primary',
  external = false,
}: {
  href: string
  label: string
  variant?: 'primary' | 'dark' | 'light'
  external?: boolean
}) => {
  const shell =
    variant === 'primary'
      ? 'bg-primary text-white'
      : variant === 'dark'
        ? 'bg-default-900 text-white'
        : 'bg-white text-default-900 border border-default-200'

  const badge =
    variant === 'primary'
      ? 'bg-default-900 text-white'
      : variant === 'dark'
        ? 'bg-primary text-white'
        : 'bg-primary text-white'

  const inner = (
    <>
      <span className="py-3.75 ps-6">
        <span className="relative block overflow-hidden">
          <span className="block group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            {label}
          </span>
          <span className="absolute top-7 start-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            {label}
          </span>
        </span>
      </span>

      <span className={`m-1.25 flex size-10 items-center justify-center rounded rounded-ee-xl ${badge}`}>
        <span className="relative block overflow-hidden">
          <span className="block group-hover:translate-x-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
          <span className="absolute top-0 end-7 group-hover:end-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            <Icon icon="tabler:arrow-narrow-right" className="flex size-6" />
          </span>
        </span>
      </span>
    </>
  )

  const className = `group inline-flex items-center gap-5 rounded rounded-ee-2xl text-base font-medium transition-all ${shell}`

  if (external) {
    return (
      <a href={href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {inner}
    </Link>
  )
}

/** Inline text link with a sliding arrow — for in-card "read more" actions. */
export const ArrowLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all"
  >
    {label}
    <Icon
      icon="tabler:arrow-narrow-right"
      className="size-5 transition-transform duration-300 group-hover:translate-x-1"
    />
  </Link>
)

/**
 * Numbered chapter rule. Carried over from the previous build — it gives a long
 * page a spine, so a buyer scanning knows where they are.
 */
export const ChapterMarker = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-center gap-5 border-t border-default-200 pt-6">
    <span className="text-sm font-semibold text-primary">{index}</span>
    <span className="text-sm uppercase tracking-[0.2em] text-default-500">{label}</span>
  </div>
)

/** Section heading block: eyebrow, H2, optional lede. */
export const SectionHeading = ({
  eyebrow,
  title,
  desc,
  align = 'start',
  light = false,
}: {
  eyebrow?: string
  title: string
  desc?: string
  align?: 'start' | 'center'
  light?: boolean
}) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
    {eyebrow && (
      <div className="inline-flex items-center gap-1.5 rounded-2xl border border-default-300 bg-white px-3.5 py-1.25">
        <span className="size-2 bg-primary"></span>
        <span className="text-sm text-default-900">{eyebrow}</span>
      </div>
    )}
    <h2
      className={`mt-4 lg:text-[42px] md:text-[36px] text-[28px] font-bold ${
        light ? 'text-white' : ''
      }`}
    >
      {title}
    </h2>
    {desc && <p className={`mt-5 ${light ? 'text-default-300' : ''}`}>{desc}</p>}
  </div>
)
