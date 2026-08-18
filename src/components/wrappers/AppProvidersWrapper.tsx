'use client'

import '@/lib/icons' // registers the site's tabler icons offline (no runtime API)
import { preline } from '@/utils/preline'
import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    preline.init()
  }, [])

  return (
    <>
      {/* WCAG 2.4.1 (Bypass Blocks). Every page opens with the same navbar and
          mega-menu, which a keyboard or screen-reader user otherwise has to tab
          through in full before reaching anything specific to the page.
          Off-screen until focused, so it costs sighted users nothing. */}
      <a
        href="#main"
        className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white">
        Skip to main content
      </a>
      <Navbar />
      {/* The site had no main landmark on any route — only not-found.tsx had
          one. Without it the skip link has nothing to target and assistive tech
          has no way to jump past the chrome to the page's own content. */}
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

export default AppProvidersWrapper
