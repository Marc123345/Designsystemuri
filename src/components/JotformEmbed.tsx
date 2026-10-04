'use client'

import { useEffect, useState } from 'react'
import { preconnect } from 'react-dom'

/**
 * EID's Jotform quote form, embedded.
 *
 * This replaces a hand-built form that had no backend and composed a mailto —
 * which meant a submission depended on the sender having a mail client wired
 * up. Jotform is a real endpoint with a real inbox behind it.
 *
 * Two deliberate departures from Jotform's copy-paste snippet:
 *
 *  - Their snippet carries onload="window.parent.scrollTo(0,0)". On a page
 *    where the form sits below the fold, that yanks the reader back to the top
 *    the moment the iframe loads. Dropped.
 *  - Jotform's embed handler script is not used at all (see the speed notes
 *    below): the form's own `setHeight` messages resize the iframe, so the
 *    form never scrolls inside its own box.
 */

/**
 * ── STYLING THE FORM: WHAT IS POSSIBLE FROM HERE, AND WHAT IS NOT ───────────
 *
 * Marc's note is "we can also better style the form on Jotform accordingly".
 * Recording the boundary so nobody spends an afternoon on the wrong side of it.
 *
 * NOT POSSIBLE FROM THIS REPO. The form renders in a cross-origin iframe on
 * form.jotform.com. Same-origin policy means no stylesheet, class, CSS variable
 * or `!important` written anywhere in src/ reaches a single control inside it.
 * There is not one native form element in this codebase. Anything that looks
 * like it should work — a wrapper class, a global input rule, injecting CSS
 * into the iframe — either silently does nothing or throws.
 *
 * DONE IN THE JOTFORM BUILDER (Form Designer → Styles → Inject Custom CSS),
 * to match the design system this page is built on:
 *
 *   font              Rubik for headings, Roboto for body — the two the site
 *                     loads. Jotform defaults to its own stack, which is why
 *                     the fields read as a different product to the card
 *                     around them.
 *   input radius      12px, the site's --radius-control. Jotform ships square.
 *   input border      #e2e8f0 default, #2c3c6c on focus, 2px focus ring.
 *   labels            #1c2749, 0.95rem, not bold.
 *   required asterisk currently red; the palette has no red. #2c3c6c.
 *   submit button     #2c3c6c fill, white text, 12px radius, full width.
 *   page background   transparent, so the form sits on the card rather than
 *                     painting its own white panel inside a grey one.
 *   width             100%, no max-width — the card controls the measure now.
 *
 * ALSO BUILDER-SIDE, and outstanding from Uri's F5: the field set still has
 * to come down to Name, Country, Email, Phone, Company, Product, Message.
 * Grade, size and quantity come out and go in the message. The form currently
 * renders 1692px tall inside a page whose brief is one screen — the field
 * count is the reason, and it is the single biggest thing left on this page.
 */
const FORM_ID = '262084626654058'

// Speed notes (Oct 2026, "the contact form takes too long to load"):
//
// ⚠ No Jotform embed handler. Its script rebuilt the iframe URL (adding
// isIframeEmbed/parentURL and re-appending our query) and, whenever that URL
// differed from the one rendered, CLONED the iframe and swapped it in. Every
// visitor therefore downloaded the form twice, and the real load could not
// start until the handler itself had downloaded. The handler's only job we need
// is resizing, and the form already posts `setHeight:<px>:<formId>` (and
// `formSettled`) to the parent, so that is handled here instead and the iframe
// is loaded once, by React, and never replaced.
//
// - `isIframeEmbed=1` is in the first URL so the form renders in embed mode.
// - preconnect: the form document and its ~15 scripts come from two hosts.
// - `eager` on /contact, where the form is the page. QuoteSection stays lazy.
// - Reserved height matches the form's settled height with the compact
//   Jotform CSS (788px in a phone-width iframe, 712px wider) so nothing jumps;
//   a skeleton covers the wait.
const BASE = `https://form.jotform.com/${FORM_ID}?isIframeEmbed=1`

const JotformEmbed = ({ title, eager = false }: { title: string; eager?: boolean }) => {
  preconnect('https://form.jotform.com')
  preconnect('https://cdn.jotfor.ms')

  const [src, setSrc] = useState(BASE)
  const [height, setHeight] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)

  // product/grade from a "Request a quote" link prefill the form. Only those
  // visits pay a second load; the common case keeps the server-rendered URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pass = new URLSearchParams()
    for (const key of ['product', 'grade']) {
      const v = params.get(key)
      if (v) pass.set(key, v)
    }
    if ([...pass].length) setSrc(`${BASE}&${pass}`)
  }, [])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== 'string' || !e.origin.includes('jotform') || typeof e.data !== 'string') return
      const [kind, value, id] = e.data.split(':')
      if (kind === 'setHeight' && id === FORM_ID) {
        const px = Number(value)
        if (px > 0) setHeight(px)
        setLoaded(true)
      } else if (kind === 'formSettled') {
        setLoaded(true)
      }
    }
    window.addEventListener('message', onMessage)
    // Never leave the placeholder up if a message is missed.
    const fallback = window.setTimeout(() => setLoaded(true), 4000)
    return () => {
      window.removeEventListener('message', onMessage)
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <div className="relative">
      <iframe
        id={`JotFormIFrame-${FORM_ID}`}
        title={title}
        src={src}
        allow="camera; fullscreen"
        scrolling="no"
        loading={eager ? 'eager' : 'lazy'}
        // @ts-expect-error -- fetchpriority is valid HTML on iframes; React 19 passes it through
        fetchpriority={eager ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        className={`w-full border-0 transition-opacity duration-300 ${height ? '' : 'h-[788px] sm:h-[712px]'} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ minWidth: '100%', maxWidth: '100%', border: 'none', ...(height ? { height } : null) }}
      />

      {!loaded && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col gap-5 px-1 pt-2">
          {['w-24', 'w-28', 'w-20', 'w-28', 'w-32'].map((w, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className={`bg-default-200 h-3 animate-pulse rounded ${w}`} />
              <div className="bg-default-100 border-default-200 rounded-control h-12 animate-pulse border" />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <div className="bg-default-200 h-3 w-20 animate-pulse rounded" />
            <div className="bg-default-100 border-default-200 rounded-control h-32 animate-pulse border" />
          </div>
          <div className="bg-primary/20 rounded-control h-12 w-40 animate-pulse" />
        </div>
      )}
    </div>
  )
}

export default JotformEmbed
