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
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default AppProvidersWrapper
