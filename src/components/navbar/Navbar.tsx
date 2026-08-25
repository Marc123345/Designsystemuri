'use client'

import { Link, usePathname } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { t } from '@/lib/i18n-content'
import { applicationMenu, primaryNav, productMenu, resourceMenu, site } from '@/lib/site'
import { Icon } from '@iconify/react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useSyncExternalStore } from 'react'
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
 *
 * ── Transparent over the home hero ──────────────────────────────────────────
 *
 * On the home page, while the page is at the top, the bar drops its white
 * ground and its hairline and sits directly on the hero photograph; the links,
 * the language switcher and the burger go white to suit. Scroll a little and
 * the solid bar comes back. That is what lets the hero own the whole viewport
 * rather than starting 96px down it.
 *
 * Scoped to the home route on purpose. Every other page opens with `PageHero`,
 * and half of those have no background image — a transparent bar over a white
 * page reads as a rendering fault, not as a design. When another page grows a
 * full-bleed hero, add it to `TRANSPARENT_ON` and nothing else changes.
 *
 * The colour switch is done in CSS rather than by threading a variant through
 * every child (see `.eid-nav-over-hero` in _general.css). The bar holds the
 * language switcher, a Preline dropdown set, a CTA and a burger, and passing a
 * `light` prop into all of them would be four components changed to express
 * one state.
 */
/**
 * Routes that open with a full-bleed hero the bar can sit on.
 *
 * Entries ending in `/` match a prefix, so the dynamic product and application
 * routes are covered without listing every slug. Everything here is a page
 * whose `PageHero` carries a photograph — the two lists have to stay in step,
 * because a transparent bar over a white page reads as a rendering fault.
 */
const TRANSPARENT_ON = [
  '/',
  '/about',
  '/quality',
  '/contact',
  // The /applications index is gone; the per-hub pages under it remain and
  // still open on a photograph.
  '/applications/',
  '/mesh-qc',
  '/micron-qc',
  '/products/',
  '/resources/blog',
  '/resources/datasheets',
  '/resources/msds',
]

const opensOnPhoto = (pathname: string) =>
  TRANSPARENT_ON.some((route) => (route.endsWith('/') && route.length > 1 ? pathname.startsWith(route) : pathname === route))

/**
 * Scroll position as an external store.
 *
 * A subscription to something outside React, so it reads through
 * useSyncExternalStore rather than a useState/useEffect pair — the effect
 * version sets state on first commit and cascades a render on every mount, on
 * a component that is on every page of the site.
 *
 * The threshold is 40px rather than 0 so a rubber-band scroll or a one-notch
 * nudge does not flicker the bar. The server snapshot is `true`: SSR has no
 * scroll position, and "at the top" is the state the home page paints first.
 */
const subscribeScroll = (onChange: () => void) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}
const getAtTop = () => window.scrollY < 40
const getAtTopServer = () => true

const Navbar = () => {
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const atTop = useSyncExternalStore(subscribeScroll, getAtTop, getAtTopServer)
  const overHero = atTop && opensOnPhoto(pathname)

  /* Close the mobile overlay on navigation. Preline attaches HSOverlay to
     `window` at runtime and ships no type for it, so it is narrowed here rather
     than cast to `any` twice — same behaviour, and the lint rule the rest of
     the file passes now applies to this block too. */
  useEffect(() => {
    const overlay = document.getElementById('mobile-menu')
    const hs = (window as unknown as { HSOverlay?: { close: (el: Element) => void } }).HSOverlay
    if (overlay && hs) hs.close(overlay)
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
        /* The mega-menu floats over the page, so it is a card in the same
              sense every other floating surface is — `rounded-card` and
              `overflow-hidden` so the 4px brand rule at its head is clipped by
              the corner rather than poking out of it. */
        className="hs-dropdown-menu hs-dropdown-open:opacity-100 border-default-200 rounded-card absolute start-1/2 top-full z-50 hidden -translate-x-1/2 overflow-hidden border bg-white opacity-0 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)] transition-[opacity,margin] duration-300 before:absolute before:start-0 before:-top-4 before:h-4 before:w-full"
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
      <div
        data-note="navbar"
        className={`fixed inset-x-0 top-0 z-[120] h-[76px] w-full border-b transition-colors duration-300 lg:h-[96px] ${
          overHero ? 'eid-nav-over-hero border-transparent bg-transparent' : 'border-default-200 bg-white'
        }`}
      >
        {/* Angled brand block behind the logo — and it only exists when the bar
            has a ground of its own.

            The lockup is `logo-white.png`, a reverse mark, so it needs
            something dark under it. Once the bar turns white on scroll, that
            something is this block. Over a hero it is not: the bar is
            transparent, the logo is already sitting on a dark photograph or on
            the film, and the block was a second navy shape pasted over a frame
            that was navy anyway — a hard clipped edge cutting across the
            picture for no reason, which is exactly what it looks like on the
            new video hero.

            So it fades with `overHero`, on the same 300ms the bar uses to swap
            its background, and the two changes read as one movement rather than
            a plate popping in.

            Kept mounted rather than conditionally rendered: unmounting it
            cannot be transitioned, and it would snap. `pointer-events-none` is
            still on it, so an invisible block over the logo link costs
            nothing. */}
        <div
          aria-hidden
          className={`bg-primary pointer-events-none absolute top-0 left-0 h-full transition-opacity duration-300 ${overHero ? 'opacity-0' : 'opacity-100'}`}
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

            {/* Square solid CTA. Labelled "Contact", not "Request A Quote":
                the button is the site's one persistent conversion route and a
                visitor who wants to ask a technical question, chase a sample or
                find the phone number should not have to read it as a
                commitment to buy. */}
            <Link href="/contact" className="bg-primary hover:bg-primary-1 rounded-control hidden items-center gap-2.5 px-6 py-3.5 text-[0.9rem] leading-none font-semibold text-white transition-colors md:inline-flex">
              {t(locale, 'Contact')}
              <Icon icon="tabler:arrow-narrow-right" className="size-5" />
            </Link>

            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="mobile-menu"
              data-hs-overlay="#mobile-menu"
              className="border-default-200 hover:bg-primary hover:border-primary rounded-control inline-flex size-11 items-center justify-center border transition-colors hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Icon icon="tabler:menu-2" className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        /* Bottom corners only. The mobile overlay drops from under the bar
            and its top edge is flush against it, so a radius up there would be
            a gap; the same reasoning as the heroes. */
        className="hs-overlay hs-overlay-open:translate-y-0 hs-overlay-open:top-[76px] rounded-b-card absolute top-0 z-[110] max-h-[80vh] w-full -translate-y-full transform overflow-y-auto bg-white shadow-xl transition-all duration-300 lg:hidden"
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
