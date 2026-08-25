'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

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
 *  - The embed handler script is loaded through next/script and initialised on
 *    ready rather than with an inline <script>, so it does not block and it
 *    survives client-side navigation.
 *
 * The handler messages the iframe to report its height and resizes it, so the
 * form never scrolls inside its own box. `minHeight` is only what is reserved
 * before that first message lands.
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
const EMBED_HANDLER = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js'

const JotformEmbed = ({ title, minHeight = 539 }: { title: string; minHeight?: number }) => {
  const [src, setSrc] = useState(`https://form.jotform.com/${FORM_ID}`)

  // Carry a product/grade selection through to the form. The grade selector
  // links to /contact?product=…&grade=…, and Jotform prefills any field whose
  // unique name matches a query parameter.
  //
  // NOTE: this only prefills if the Jotform fields are actually named `product`
  // and `grade`. Confirm those two field names in the form builder — if they
  // differ, change the keys here, not the links.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const pass = new URLSearchParams()
    for (const key of ['product', 'grade']) {
      const v = params.get(key)
      if (v) pass.set(key, v)
    }
    if ([...pass].length) setSrc(`https://form.jotform.com/${FORM_ID}?${pass}`)
  }, [])

  return (
    <>
      <iframe
        id={`JotFormIFrame-${FORM_ID}`}
        title={title}
        src={src}
        // Jotform's copy-paste snippet grants geolocation, microphone and
        // payment as well. A quote form asks for a product, grade, size and
        // quantity — it has no business being handed the visitor's location or
        // microphone, and `payment` on a form that takes no payment is a
        // capability to withhold rather than pass along by default. Narrowed to
        // what a form plausibly uses: camera and fullscreen are kept because a
        // file-upload or photo widget can want them, and breaking a working
        // field is a worse trade than leaving those two in place. If the form
        // has no upload field, drop them too.
        allow="camera; fullscreen"
        allowTransparency
        scrolling="no"
        // Third-party iframe. On the home page it sits near the bottom, so
        // eager loading meant every visitor fetched Jotform whether or not they
        // ever scrolled to it.
        loading="lazy"
        className="w-full border-0"
        style={{ minWidth: '100%', maxWidth: '100%', height: minHeight, border: 'none' }}
      />
      <Script
        src={EMBED_HANDLER}
        strategy="afterInteractive"
        onReady={() => {
          ;(window as unknown as { jotformEmbedHandler?: (sel: string, origin: string) => void }).jotformEmbedHandler?.(`iframe[id='JotFormIFrame-${FORM_ID}']`, 'https://form.jotform.com/')
        }}
      />
    </>
  )
}

export default JotformEmbed
