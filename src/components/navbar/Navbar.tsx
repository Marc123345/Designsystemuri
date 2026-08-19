'use client'

import { Link, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { applicationMenu, primaryNav, productMenu, resourceMenu, site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

/**
 * Header in the Supreme Home pattern: a solid white bar, an angled brand-colour
 * block behind the logo (clip-path polygon), centred nav, a contact block and
 * square solid CTA on the right, and a hairline along the bottom. Recoloured
 * Supreme red -> EID blue, and squared off in line with the site's no-radius
 * rule.
 *
 * Kept from the previous header: Preline drives the dropdowns and the mobile
 * overlay, positioning stays `fixed` (every page already pads its top for a
 * fixed bar), and the link set still comes from lib/site.ts, so the
 * buyer's-journey order is defined once and shared with the footer index.
 */
const Navbar = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale

  useEffect(() => {
    const overlay = document.getElementById('mobile-menu')
    if (overlay && (window as any).HSOverlay) {
      ;(window as any).HSOverlay.close(overlay)
    }
  }, [pathname])

  // A section is active when the path sits anywhere beneath it, so
  // /products/cbn still lights up "Products".
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const navLink = (active: boolean) =>
    `flex items-center gap-1.5 text-[0.94rem] font-semibold tracking-[0.01em] transition-colors hover:text-primary ${active ? 'text-primary' : 'text-default-700'}`

  // One vertical panel anchored under its trigger, with the brand rule across
  // the top — the Supreme Home dropdown, minus the corner radius.
  const menuPanel = (menu: 'products' | 'applications' | 'resources') => {
    const entries = menu === 'products' ? productMenu : menu === 'applications' ? applicationMenu : resourceMenu
    return (
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 border-default-200 absolute start-1/2 top-full z-50 hidden -translate-x-1/2 border bg-white opacity-0 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] transition-[opacity,margin] duration-300 before:absolute before:start-0 before:-top-4 before:h-4 before:w-full"
        role="menu"
      >
        <div className="bg-primary h-[4px]" />
        <div className="flex min-w-64 flex-col p-2">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className={`hover:text-primary border-default-100 flex items-center gap-2.5 border-b px-3 py-2.5 text-[0.88rem] font-semibold last:border-b-0 ${isActive(entry.href) ? 'text-primary' : 'text-default-700'}`}
            >
              <span className="bg-default-300 size-1 shrink-0 transition-transform group-hover:scale-150" />
              {t(locale, entry.label)}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const navItems = primaryNav.filter((item) => !('cta' in item && item.cta))

  return (
    <header>
      <div data-note="navbar" className="border-default-200 fixed inset-x-0 top-0 z-[120] h-[76px] w-full border-b bg-white lg:h-[96px]">
        {/* Angled brand block behind the logo. */}
        <div
          aria-hidden
          className="bg-primary pointer-events-none absolute top-0 left-0 h-full"
          style={{ width: 'clamp(200px, 22vw, 340px)', clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative flex h-full items-center px-4 md:px-7.5 lg:px-12.5">
          {/* Logo — the reverse lockup, on the brand block. */}
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="EID Ltd — home">
            <Image src="/eid/logo-white.png" alt="EID Ltd" width={650} height={221} priority className="w-32 transition-opacity hover:opacity-80 lg:w-40" />
          </Link>

          {/* Nav, centred in the space the logo and the right cluster leave.
              Deliberately in normal flow rather than absolutely centred: EID
              carries six entries against Supreme Home's five, and an absolutely
              centred nav overlaps the right cluster once the viewport tightens. */}
          <nav id="navbar" className="mx-auto hidden items-center gap-6 lg:flex xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const menu = 'menu' in item ? item.menu : undefined
              if (menu) {
                return (
                  <div key={item.href} className="hs-dropdown relative inline-flex [--trigger:hover]">
                    <button type="button" className={`hs-dropdown-toggle ${navLink(active)}`} aria-haspopup="menu" aria-expanded="false">
                      {t(locale, item.label)}
                      <Icon icon="tabler:chevron-down" className="hs-dropdown-open:rotate-180 size-3.5 transition-transform duration-300" />
                    </button>
                    {menuPanel(menu)}
                  </div>
                )
              }
              return (
                <Link key={item.href} href={item.href} className={navLink(active)}>
                  {t(locale, item.label)}
                </Link>
              )
            })}
          </nav>

          {/* ms-auto matters below lg. The nav above carries mx-auto and is what
              pushes this cluster to the right edge — but it is `hidden` until
              lg, so on a phone there was nothing holding the cluster over and it
              sat flush against the logo, on top of the angled brand block. That
              put the language switcher's slate text on the brand blue at 1.37:1
              — unreadable, and the one contrast failure left on mobile. */}
          <div className="ms-auto flex shrink-0 items-center gap-3 lg:ms-0 lg:gap-4">
            <LanguageSwitcher />

            {/* Square solid CTA */}
            <Link href="/contact" className="bg-primary hover:bg-primary-1 hidden items-center gap-2.5 px-6 py-3.5 text-[0.9rem] leading-none font-semibold text-white transition-colors md:inline-flex">
              {t(locale, 'Request A Quote')}
              <Icon icon="tabler:arrow-narrow-right" className="size-5" />
            </Link>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="mobile-menu"
              data-hs-overlay="#mobile-menu"
              className="border-default-200 hover:bg-primary hover:border-primary inline-flex size-11 items-center justify-center border transition-colors hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Icon icon="tabler:menu-2" className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="hs-overlay hs-overlay-open:translate-y-0 hs-overlay-open:top-[76px] absolute top-0 z-[110] max-h-[80vh] w-full -translate-y-full transform overflow-y-auto bg-white shadow-xl transition-all duration-300 lg:hidden"
        role="dialog"
        // Preline gives this role; a dialog with no accessible name is
        // announced as just "dialog", so a screen reader user has no idea what
        // opened.
        aria-label={t(locale, 'Menu')}
        aria-modal="true"
        tabIndex={-1}
      >
        <div className="divide-default-200 flex flex-col divide-y">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const menu = 'menu' in item ? item.menu : undefined
            if (menu) {
              const entries = menu === 'products' ? productMenu : menu === 'applications' ? applicationMenu : resourceMenu
              return (
                <div key={'m-' + item.href} className="hs-accordion">
                  <button type="button" className={`hs-accordion-toggle w-full px-4 py-4 ${navLink(active)}`} aria-expanded="false">
                    {t(locale, item.label)}
                    <Icon icon="tabler:chevron-down" className="ms-auto size-4" />
                  </button>
                  <div className="hs-accordion-content hidden w-full overflow-hidden ps-4 pb-4 transition-[height]">
                    {entries.map((entry) => (
                      <Link key={'m-' + entry.href} href={entry.href} className="text-default-600 hover:text-primary block px-3 py-2 text-sm font-medium transition-colors">
                        {t(locale, entry.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <Link key={'m-' + item.href} href={item.href} className={`px-4 py-4 ${navLink(active)}`}>
                {t(locale, item.label)}
              </Link>
            )
          })}

          <a href={site.phoneHref} className="text-primary flex items-center gap-3 px-4 py-4 text-[0.95rem] font-semibold">
            <Icon icon="tabler:phone" className="size-5" />
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
