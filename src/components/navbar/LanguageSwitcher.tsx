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
      <button type="button" className="hs-dropdown-toggle border-default-200 text-default-800 hover:border-primary hover:text-primary flex items-center gap-1.5 border px-3 py-2 text-sm font-semibold transition-all" aria-haspopup="menu" aria-expanded="false" aria-label="Language">
        <Icon icon="tabler:world" className="size-4" />
        {LABELS[active]}
        <Icon icon="tabler:chevron-down" className="size-3.5 opacity-70" />
      </button>

      <div
        // `hidden` is the initial state Preline toggles. Without it this panel
        // renders at opacity-0 but still occupies its box, so clicks over the
        // hero landed on the invisible ES / FR links and switched locale.
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 border-default-200 absolute end-0 top-full z-50 hidden border bg-white p-2 opacity-0 shadow-xl transition-[opacity,margin] duration-300 before:absolute before:start-0 before:-top-4 before:h-4 before:w-full"
        role="menu"
      >
        <div className="flex flex-col gap-0.5">
          {routing.locales.map((l) => (
            <Link
              key={l}
              href={pathname}
              locale={l}
              aria-current={l === active ? 'true' : undefined}
              className={`hover:bg-primary/10 hover:text-primary block px-4 py-1.5 text-sm font-medium transition-colors ${l === active ? 'bg-primary/10 text-primary font-semibold' : 'text-default-700'}`}
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
