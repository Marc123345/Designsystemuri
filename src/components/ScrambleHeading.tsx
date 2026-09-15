'use client'

import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#'

type Glyph = { char: string; dud: boolean }

const toGlyphs = (text: string): Glyph[] => Array.from(text).map((char) => ({ char, dud: false }))

const ScrambleHeading = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLHeadingElement>(null)
  const [glyphs, setGlyphs] = useState<Glyph[]>(() => toGlyphs(text))

  useEffect(() => {
    setGlyphs(toGlyphs(text))

    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frameRequest = 0
    let frame = 0
    let hasRun = false

    const source = Array.from(text)
    const queue = source.map((char, index) => ({
      char,
      start: 1 + Math.floor(Math.random() * 7) + Math.floor(index * 0.08),
      end: 10 + Math.floor(Math.random() * 12) + Math.floor(index * 0.12),
    }))

    const update = () => {
      frame += 1
      setGlyphs(
        queue.map(({ char, start, end }) => {
          if (/\s/.test(char)) return { char, dud: false }
          if (frame >= end) return { char, dud: false }
          if (frame >= start) {
            return {
              char: SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
              dud: true,
            }
          }
          return { char, dud: false }
        }),
      )

      if (queue.some(({ end }) => frame < end)) {
        frameRequest = requestAnimationFrame(update)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun) return
        hasRun = true
        observer.disconnect()
        frameRequest = requestAnimationFrame(update)
      },
      { threshold: 0.45 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameRequest)
    }
  }, [text])

  return (
    <h2 ref={ref} aria-label={text} className={className}>
      <span aria-hidden>
        {glyphs.map((glyph, index) => (
          <span key={`${index}-${glyph.char}`} className={glyph.dud ? 'opacity-[0.35]' : undefined}>
            {glyph.char}
          </span>
        ))}
      </span>
    </h2>
  )
}

export default ScrambleHeading
