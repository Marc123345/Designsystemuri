'use client'

import { ReactLenis } from 'lenis/react'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

/**
 * One scroll engine for the whole site.
 *
 * Lenis keeps native document scrolling underneath, so CSS position: sticky,
 * anchor links and keyboard scrolling continue to behave normally. Motion is
 * disabled for visitors who request reduced motion rather than forcing smooth
 * interpolation on them.
 */
const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (reduceMotion) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        wheelMultiplier: 0.92,
        touchMultiplier: 1,
        syncTouch: false,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScrollProvider
