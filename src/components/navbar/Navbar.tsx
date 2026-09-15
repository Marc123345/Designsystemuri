'use client'

import { ArrowButton } from '@/components/ui'
import { Link, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { primaryNav, productMenu, resourceMenu, site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState, useSyncExternalStore } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const TRANSPARENT_ON = [
  '/',
  '/about',
  '/quality',
  '/contact',
  '/applications/',
  '/products/',
  '/resources/blog',
  '/resources/datasheets',
  '/resources/msds',
]

const opensOnPhoto = (pathname: string) =>
  TRANSPARENT_ON.some((route) => (route.endsWith('/') && route.length > 1 ? pathname.startsWith(route) : pathname === route))

const subscribeScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

const getAtTop = () => window.scrollY < 40
const getAtTopServer = () => true

type MobileSection = 'products' | 'resources' | null

const Navbar = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const atTop = useSyncExternalStore(subscribeScroll, getAtTop, getAtTopServer)
  const overHero = atTop && opensOnPhoto(pathname)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MobileSection>(null)

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))
  const closeMobile = () => {
    setMobileOpen(false)
    setMobileSection(null)
  }

  useEffect(() => {
    setMobileOpen(false)
    setMobileSection(null)
  }, [pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMobile()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const navLink = (active: boolean) =>
    `flex items-center gap-1.5 py-0.5 text-[0.94rem] font-semibold tracking-[0.01em] transition-colors hover:text-primary ${active ? 'text-primary' : 'text-default-700'}`

  const menuPanel = (menu: 'products' | 'resources') => {
    const entries = menu === 'products' ? productMenu : resourceMenu
    return (
      <div
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 absolute start-1/2 top-full z-50 hidden -translate-x-1/2 pt-2.5 opacity-0 transition-[opacity,margin] duration-300"
        role="menu"
      >
        <div className="border-default-200 rounded-card overflow-hidden border bg-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]">
          <div className="bg-primary h-[4px]" />
          <div className="flex min-w-64 flex-col p-2">
            {entries.map((entry) => (
              <Link
                key={entry.href}
                href={entry.href}
                className={`hover:text-primary border-default-100 flex items-center gap-2.5 border-b px-3 py-2.5 text-[0.88rem] font-semibold last:border-b-0 ${isActive(entry.href) ? 'text-primary' : 'text-default-700'}`}
              >
                <span className="bg-default-300 size-1 shrink-0" />
                {t(locale, entry.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const navItems = primaryNav.filter((item) => !('cta' in item && item.cta))

  const mobileAccordion = (
    label: string,
    section: Exclude<MobileSection, null>,
    entries: ReadonlyArray<{ label: string; href: string }>,
    active: boolean,
  ) => {
    const open = mobileSection === section
    return (
      <div className={`overflow-hidden rounded-[18px] border transition-colors ${open ? 'border-primary/30 bg-primary/[0.045]' : 'border-default-200 bg-white'}`}>
        <button
          type="button"
          className="flex min-h-14 w-full items-center gap-4 px-4 py-3.5 text-left"
          onClick={() => setMobileSection(open ? null : section)}
          aria-expanded={open}
        >
          <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${active ? 'bg-primary text-white' : 'bg-primary/8 text-primary'}`}>
            <Icon icon={section === 'products' ? 'tabler:diamond' : 'tabler:file-description'} className="size-4.5" />
          </span>
          <span className={`text-[17px] font-semibold tracking-[-0.01em] ${active ? 'text-primary' : 'text-default-900'}`}>{t(locale, label)}</span>
          <Icon icon="tabler:chevron-down" className={`text-default-500 ms-auto size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </button>

        <div className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <div className="border-default-200 mx-3 border-t px-1 pt-2 pb-3">
              {section === 'products' && (
                <Link
                  href="/#products"
                  onClick={closeMobile}
                  className="text-primary mb-1 flex min-h-10 items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold"
                >
                  {t(locale, 'View all products')}
                  <Icon icon="tabler:arrow-up-right" className="size-4" />
                </Link>
              )}
              <div className={section === 'products' ? 'grid grid-cols-2 gap-1' : 'grid gap-1'}>
                {entries.map((entry) => (
                  <Link
                    key={'mobile-' + entry.href}
                    href={entry.href}
                    onClick={closeMobile}
                    className={`flex min-h-10 items-center gap-2 rounded-xl px-3 py-2 text-[13px] leading-snug font-medium transition-colors hover:bg-white ${isActive(entry.href) ? 'bg-white text-primary shadow-sm' : 'text-default-600'}`}
                  >
                    <span className="bg-primary/35 size-1 shrink-0 rounded-full" />
                    <span>{t(locale, entry.label)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const mobilePlainIcon = (href: string) =>
    href === '/'
      ? 'tabler:home'
      : href.includes('applications')
        ? 'tabler:tool'
        : href === '/quality'
          ? 'tabler:microscope'
          : 'tabler:building-factory-2'

  return (
    <header>
      <div
        data-note="navbar"
        className={`fixed inset-x-0 top-0 z-[120] h-[76px] w-full border-b transition-colors duration-300 lg:h-[96px] ${
          overHero ? 'eid-nav-over-hero border-transparent bg-transparent' : 'border-default-200 bg-white'
        }`}
      >
        <div
          aria-hidden
          className={`bg-primary pointer-events-none absolute top-0 left-0 h-full transition-opacity duration-300 ${overHero ? 'opacity-0' : 'opacity-100'}`}
          style={{ width: 'clamp(185px, 22vw, 340px)', clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0% 100%)' }}
        />

        <div className="relative flex h-full items-center px-4 md:px-7.5 lg:px-12.5">
          <Link href="/" className="relative z-10 flex shrink-0 items-center" aria-label="EID Ltd — home">
            <Image src="/eid/logo-white.png" alt="EID Ltd" width={650} height={221} priority className="w-27 transition-opacity hover:opacity-80 sm:w-32 lg:w-40" />
          </Link>

          <nav id="navbar" className="mx-auto hidden items-center gap-6 lg:flex xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const menu = 'menu' in item ? item.menu : undefined
              if (menu) {
                const triggerClass = `hs-dropdown-toggle ${navLink(active)}`
                const triggerInner = (
                  <>
                    {t(locale, item.label)}
                    <Icon icon="tabler:chevron-down" className="hs-dropdown-open:rotate-180 size-3.5 transition-transform duration-300" />
                  </>
                )
                return (
                  <div key={item.href} className="hs-dropdown relative inline-flex [--offset:0] [--trigger:hover]">
                    {item.linkMenu ? (
                      <Link href={item.href} className={triggerClass} aria-haspopup="menu" aria-expanded="false">
                        {triggerInner}
                      </Link>
                    ) : (
                      <button type="button" className={triggerClass} aria-haspopup="menu" aria-expanded="false">
                        {triggerInner}
                      </button>
                    )}
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

          <div className="ms-auto flex shrink-0 items-center gap-2.5 lg:ms-0 lg:gap-4">
            <LanguageSwitcher />
            <ArrowButton href="/contact" label={t(locale, 'Contact')} size="sm" className="hidden md:inline-flex" />

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((open) => !open)}
              className={`rounded-control inline-flex size-11 items-center justify-center border transition-all lg:hidden ${
                mobileOpen
                  ? 'border-primary bg-primary text-white'
                  : 'border-default-200 hover:bg-primary hover:border-primary hover:text-white'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <Icon icon={mobileOpen ? 'tabler:x' : 'tabler:menu-2'} className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[76px] z-[115] h-[calc(100dvh-76px)] overflow-hidden bg-default-50 transition-all duration-300 lg:hidden ${
          mobileOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
        role="dialog"
        aria-label={t(locale, 'Menu')}
        aria-modal="true"
        aria-hidden={!mobileOpen}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="bg-primary absolute -right-20 top-12 size-64 opacity-[0.035]"
            style={{
              maskImage: "url('/eid/brand/eid-logo-outline.svg')",
              WebkitMaskImage: "url('/eid/brand/eid-logo-outline.svg')",
              maskRepeat: 'repeat',
              WebkitMaskRepeat: 'repeat',
              maskSize: '64px 64px',
              WebkitMaskSize: '64px 64px',
            }}
          />
        </div>

        <div className="relative flex h-full flex-col overflow-y-auto overscroll-contain px-4 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-primary font-mono text-[9px] font-semibold tracking-[0.22em] uppercase">EID navigation</p>
              <p className="text-default-900 mt-1 text-[23px] leading-tight font-semibold tracking-[-0.025em]">Find what you need.</p>
            </div>
            <span className="text-default-400 font-mono text-[9px] tracking-[0.18em] uppercase">Since 1970</span>
          </div>

          <nav aria-label="Mobile navigation" className="grid gap-2.5">
            {navItems.map((item) => {
              const menu = 'menu' in item ? item.menu : undefined

              if (menu) {
                const entries = menu === 'products' ? productMenu : resourceMenu
                const active = menu === 'products' ? pathname.startsWith('/products') : pathname.startsWith('/resources')
                return <div key={'mobile-main-' + item.href}>{mobileAccordion(item.label, menu, entries, active)}</div>
              }

              const active = isActive(item.href)
              return (
                <Link
                  key={'mobile-main-' + item.href}
                  href={item.href}
                  onClick={closeMobile}
                  className={`flex min-h-14 items-center gap-4 rounded-[18px] border px-4 py-3.5 transition-all ${
                    active ? 'border-primary/25 bg-primary/[0.055] text-primary' : 'border-default-200 bg-white text-default-900'
                  }`}
                >
                  <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${active ? 'bg-primary text-white' : 'bg-default-100 text-default-600'}`}>
                    <Icon icon={mobilePlainIcon(item.href)} className="size-4.5" />
                  </span>
                  <span className="text-[17px] font-semibold tracking-[-0.01em]">{t(locale, item.label)}</span>
                  <Icon icon="tabler:arrow-up-right" className="text-default-400 ms-auto size-4" />
                </Link>
              )
            })}
          </nav>

          <div className="border-default-200 mt-6 border-t pt-5">
            <Link
              href="/contact"
              onClick={closeMobile}
              className="bg-primary rounded-[18px] flex min-h-14 items-center justify-between px-5 py-4 text-white shadow-[0_18px_45px_-25px_rgba(39,53,97,0.75)]"
            >
              <span>
                <span className="block text-[17px] font-semibold">{t(locale, 'Contact')}</span>
                <span className="mt-0.5 block text-xs text-white/65">Quotes, samples & technical questions</span>
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-white text-primary">
                <Icon icon="tabler:arrow-up-right" className="size-4.5" />
              </span>
            </Link>

            <a href={site.phoneHref} className="text-default-600 mt-3 flex min-h-11 items-center justify-center gap-2 text-sm font-semibold">
              <Icon icon="tabler:phone" className="text-primary size-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
