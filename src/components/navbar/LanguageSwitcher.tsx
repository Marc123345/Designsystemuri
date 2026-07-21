'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'

const LABELS: Record<string, string> = {
  en: 'EN',
  de: 'DE',
  es: 'ES',
  it: 'IT',
  ja: 'JA',
  fr: 'FR',
  ko: 'KO',
  zh: 'ZH',
}

/**
 * Switches locale while preserving the current path — next-intl's usePathname
 * returns the locale-agnostic pathname, so <Link locale> just re-prefixes it.
 */
const LanguageSwitcher = () => {
  const pathname = usePathname()
  const active = useLocale()

  return (
    <div className="hs-dropdown relative inline-flex [--trigger:hover]">
      <button
        type="button"
        className="hs-dropdown-toggle flex items-center gap-1 rounded border border-default-200 px-3 py-2 text-sm font-semibold text-default-800 transition-all hover:text-primary"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Language"
      >
        <Icon icon="tabler:world" className="size-4" />
        {LABELS[active]}
        <Icon icon="tabler:chevron-down" className="size-4" />
      </button>

      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 absolute top-full end-0 z-130 mt-2 hidden w-24 rounded-lg border border-default-200 bg-white p-2 opacity-0 shadow-xl transition-[opacity,margin] duration-300 before:absolute before:start-0 before:-top-4 before:h-4 before:w-full"
        role="menu"
      >
        <div className="flex flex-col gap-0.5">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname}
              locale={l}
              aria-current={l === active ? 'true' : undefined}
              className={`block rounded-sm px-3 py-1.5 text-sm font-semibold hover:bg-primary/6 hover:text-primary ${
                l === active ? 'bg-primary/6 text-primary' : 'text-default-800'
              }`}
            >
              {LABELS[l]}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
