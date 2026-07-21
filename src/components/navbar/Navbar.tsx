'use client'

import { Link, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { applicationMenu, primaryNav, productMenu, resourceMenu } from '@/lib/site'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useEffect } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

/**
 * Header nav is driven entirely by lib/site.ts, so the buyer's-journey order
 * (catalogue → applications → quality → resources → company → contact) is
 * defined once and shared with the footer index.
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

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.nav-sticky')
      if (navbar) {
        if (window.scrollY >= 80) {
          navbar.classList.add('nav-sticky-on')
        } else {
          navbar.classList.remove('nav-sticky-on')
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // A section is active when the path sits anywhere beneath it, so
  // /products/cbn still lights up "Products".
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const linkClass = (active: boolean) =>
    `group flex items-center px-2.5 py-4.5 text-base font-medium text-default-800 transition-all hover:text-primary ${
      active ? 'active' : ''
    }`

  const dot = (active: boolean) => (
    <span
      className={`me-1.25 mb-0.5 flex size-1.75 bg-primary transition-all duration-300 ${
        active ? 'scale-100' : 'scale-0 group-hover:scale-100'
      }`}
    />
  )

  // All three menus render the same way: one vertical column anchored under
  // its trigger. Products used to be a four-column mega-panel; it now stacks
  // like Applications and Resources.
  const menuPanel = (menu: 'products' | 'applications' | 'resources') => {
    const entries =
      menu === 'products' ? productMenu : menu === 'applications' ? applicationMenu : resourceMenu
    return (
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 absolute top-full start-0 z-50 hidden rounded-lg border border-default-200 bg-white p-2 opacity-0 shadow-xl transition-[opacity,margin] duration-300 before:absolute before:start-0 before:-top-4 before:h-4 before:w-full"
        role="menu"
      >
        <div className="flex flex-col gap-1">
          {entries.map((entry) => (
            <Link
              key={entry.href}
              href={entry.href}
              className={`block rounded-sm px-3 py-2 text-sm font-semibold text-default-800 hover:bg-primary/6 hover:text-primary ${
                isActive(entry.href) ? 'active text-primary bg-primary/6' : ''
              }`}
            >
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
      <div className="nav-sticky navbar fixed inset-x-0 top-0 z-[120] w-full border-b border-default-200 bg-body-bg transition-all duration-300 lg:border-transparent lg:bg-transparent lg:[&.nav-sticky-on]:border-default-200 lg:[&.nav-sticky-on]:bg-body-bg/95 lg:[&.nav-sticky-on]:backdrop-blur-md">
        <div className="container relative py-4.5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" aria-label="EID Ltd — home">
              <Image
                src="/eid/logo-white.png"
                alt="EID Ltd"
                width={650}
                height={221}
                priority
                className="w-40.75 brightness-0 transition-all hover:opacity-80"
              />
            </Link>

            <div id="navbar" className="mx-auto hidden items-center justify-center lg:flex">
              {navItems.map((item) => {
                const active = isActive(item.href)
                const menu = 'menu' in item ? item.menu : undefined
                if (menu) {
                  return (
                    // All panels are narrow now, so every trigger anchors its
                    // own. Products was `static` only because the old
                    // four-column panel had to position against the header.
                    <div
                      key={item.href}
                      className="hs-dropdown relative inline-flex [--trigger:hover]"
                    >
                      <button
                        type="button"
                        className={`hs-dropdown-toggle ${linkClass(active)}`}
                        aria-haspopup="menu"
                        aria-expanded="false"
                      >
                        {dot(active)}
                        {t(locale, item.label)}
                        <Icon icon="tabler:chevron-down" className="ms-3 size-4" />
                      </button>
                      {menuPanel(menu)}
                    </div>
                  )
                }
                return (
                  <Link key={item.href} href={item.href} className={linkClass(active)}>
                    {dot(active)}
                    {t(locale, item.label)}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center justify-end gap-4">
              <LanguageSwitcher />

              <Link
                href="/contact"
                className="group hidden items-center gap-4 rounded-md bg-primary ps-6 pe-1.5 py-1.5 text-base font-medium leading-none text-white shadow-md transition-all hover:bg-primary/90 hover:shadow-lg md:inline-flex"
              >
                <span className="relative block overflow-hidden">
                  <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-7">
                    {t(locale, 'Request A Quote')}
                  </span>
                  <span className="absolute start-0 top-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:top-0">
                    {t(locale, 'Request A Quote')}
                  </span>
                </span>

                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/20 backdrop-blur-sm">
                  <span className="relative block overflow-hidden">
                    <span className="block duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-7">
                      <Icon icon="tabler:arrow-narrow-right" className="flex size-5" />
                    </span>
                    <span className="absolute end-7 top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:end-0">
                      <Icon icon="tabler:arrow-narrow-right" className="flex size-5" />
                    </span>
                  </span>
                </span>
              </Link>

              <div className="flex items-center lg:hidden">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="mobile-menu"
                  data-hs-overlay="#mobile-menu"
                  className="inline-flex size-12 items-center justify-center rounded-md bg-linear-to-tr from-primary/90 to-primary text-base font-medium text-white shadow-sm transition-all hover:opacity-90"
                  aria-label="Open menu"
                >
                  <Icon icon="tabler:align-right" className="size-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="hs-overlay hs-overlay-open:translate-y-0 hs-overlay-open:top-[84px] absolute top-0 z-[110] w-full max-h-[80vh] -translate-y-full transform overflow-y-auto bg-body-bg/95 backdrop-blur-md shadow-xl transition-all duration-300 lg:hidden"
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex flex-col gap-1 divide-y divide-default-200">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const menu = 'menu' in item ? item.menu : undefined
            if (menu) {
              const entries =
                menu === 'products'
                  ? productMenu
                  : menu === 'applications'
                    ? applicationMenu
                    : resourceMenu
              return (
                <div key={'m-' + item.href} className="hs-accordion">
                  <button
                    type="button"
                    className={`hs-accordion-toggle w-full ${linkClass(active)}`}
                    aria-expanded="false"
                  >
                    {dot(active)}
                    {t(locale, item.label)}
                    <Icon icon="tabler:chevron-down" className="ms-auto size-4" />
                  </button>
                  <div className="hs-accordion-content hidden w-full overflow-hidden ps-5 pb-4 transition-[height]">
                    {entries.map((entry) => (
                      <Link
                        key={'m-' + entry.href}
                        href={entry.href}
                        className="block rounded-sm px-3 py-2 text-sm font-medium text-default-600 transition-colors hover:text-primary"
                      >
                        {t(locale, entry.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <Link key={'m-' + item.href} href={item.href} className={linkClass(active)}>
                {dot(active)}
                {t(locale, item.label)}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Navbar
