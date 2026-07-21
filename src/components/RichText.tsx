import { Link } from '@/i18n/navigation'
import type { ReactNode } from 'react'

/**
 * Renders a paragraph with inline [label](href) links.
 *
 * The copy deck places specific in-prose links — PCBN <-> PCD across the two
 * merged pages, the single-crystal comparison guide, the on-page jump anchors,
 * and "Ask our technical team" after each spec table. Those carry internal-link
 * equity between pages that used to be separate URLs, so they have to render as
 * real links rather than flatten into plain text.
 *
 * Pure-anchor hrefs (#mcd) stay as plain <a>, because next-intl's Link is for
 * routed paths and would rewrite a bare fragment.
 */
const PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g

const LINK_CLASS = 'text-primary underline underline-offset-2'

export function RichText({ children }: { children: string }): ReactNode {
  const out: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  PATTERN.lastIndex = 0

  while ((m = PATTERN.exec(children)) !== null) {
    if (m.index > last) out.push(children.slice(last, m.index))
    const [, label, href] = m
    out.push(
      href.startsWith('#') ? (
        <a key={`${href}-${m.index}`} href={href} className={LINK_CLASS}>
          {label}
        </a>
      ) : (
        <Link key={`${href}-${m.index}`} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ),
    )
    last = m.index + m[0].length
  }
  if (last < children.length) out.push(children.slice(last))
  return <>{out}</>
}

export function RichParagraphs({
  paragraphs,
  className,
}: {
  paragraphs: string[]
  className?: string
}) {
  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {paragraphs.map((p, i) => (
        <p key={i}>
          <RichText>{p}</RichText>
        </p>
      ))}
    </div>
  )
}
