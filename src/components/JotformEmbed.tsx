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
