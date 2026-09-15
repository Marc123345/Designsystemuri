'use client'

import '@/assets/css/sticky-stories.css'
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
      <a
        href="#main"
        className="focus:bg-primary focus:rounded-control sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
    </>
  )
}

export default AppProvidersWrapper
