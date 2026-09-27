'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A restrained one-time heading reveal.
 *
 * Uri's review called the old per-character scramble/jump effect out as
 * bug-like. Keep the same component API for its existing call sites, but reveal
 * the real text as one stable block with a small fade + lift instead.
 */
const ScrambleHeading = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setRevealed(true)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [text])

  return (
    <h2
      ref={ref}
      className={`${className} transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
        revealed ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-2 opacity-0 blur-[2px]'
      }`}
    >
      {text}
    </h2>
  )
}

export default ScrambleHeading
