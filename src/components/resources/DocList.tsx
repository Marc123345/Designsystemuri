import { Icon } from '@iconify/react'
import Link from 'next/link'
import type { Locale } from '@/i18n/routing'
import type { Doc } from '@/lib/documents'
import { t } from '@/lib/i18n-content'
import { useLocale } from 'next-intl'

/**
 * Shared download list for datasheets and safety sheets. The outer plate keeps
 * long indexes scannable; `eid-doc-row` is a progressive scroll-animation hook
 * used only when the browser supports view timelines.
 */
const DocList = ({ groups, icon = 'tabler:file-text' }: { groups: { group?: string; sheets: readonly Doc[] }[]; icon?: string }) => {
  const locale = useLocale() as Locale

  return (
    <div data-note="doc-list" className="grid gap-10">
      {groups.map(({ group, sheets }, gi) => (
        <div key={group ?? gi}>
          {group && (
            <p className="text-default-500 mb-4 font-mono text-[11px] tracking-[0.22em] uppercase">{t(locale, group)}</p>
          )}

          <div className="bg-default-200 rounded-card grid gap-px overflow-hidden">
            {sheets.map((sheet) => (
              <Link
                key={sheet.key}
                href={sheet.file}
                download
                className="eid-doc-row group flex flex-wrap items-center justify-between gap-4 bg-white px-5 py-5 transition-colors hover:bg-default-50 lg:px-7"
              >
                <div className="flex items-start gap-4">
                  <span className="border-default-200 text-primary group-hover:border-primary group-hover:bg-primary rounded-control flex size-10 shrink-0 items-center justify-center border bg-white transition-colors group-hover:text-white">
                    <Icon icon={icon} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-default-900 group-hover:text-primary text-base font-semibold transition-colors">{t(locale, sheet.title)}</h3>
                    <p className="text-default-600 mt-1 text-[0.95rem]">{t(locale, sheet.desc)}</p>
                  </div>
                </div>

                <span className="border-default-300 text-default-800 group-hover:border-primary group-hover:bg-primary rounded-control inline-flex items-center gap-2 border px-3.5 py-1.5 text-sm font-semibold transition-colors group-hover:text-white">
                  <Icon icon="tabler:download" className="size-4.5" />
                  PDF
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default DocList
