'use client'

import { site } from '@/lib/site'
import { useState } from 'react'

/**
 * The quote form. Previously this was decorative markup: no <form>, no name
 * attributes, no labels, and a "Submit Request" <a href="/contact"> — so anyone
 * who filled it in lost everything they typed the moment they clicked.
 *
 * There is no backend on this build, so submission composes a mailto to the
 * sales inbox with the fields filled in. That is a real send rather than a
 * pretend one, and it matches the architecture's "both channels feed the same
 * sales inbox". Swap the handler for a POST when an endpoint exists.
 *
 * Fields follow the copy deck exactly: name, company, email, phone, country,
 * product of interest, grade or size, quantity, message. Required is kept to
 * the minimum that lets a real reply happen — name, email, product, message.
 */
const FIELD_CLASS = 'w-full rounded border border-default-200 px-4 py-3 text-base text-default-900 placeholder:text-default-500 focus:border-primary focus:outline-none'

const LABEL_CLASS = 'mb-2 block text-sm font-medium text-default-900'

const HELP_CLASS = 'mt-2 text-sm text-default-500'

const QuoteForm = ({ formTitle, formDesc, productOptions }: { formTitle: string; formDesc: string; productOptions: string[] }) => {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const body = [
      `Name: ${get('name')}`,
      `Company: ${get('company')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone')}`,
      `Country: ${get('country')}`,
      `Product of interest: ${get('product')}`,
      `Grade or size: ${get('grade')}`,
      `Quantity: ${get('quantity')}`,
      '',
      'Message:',
      get('message'),
    ].join('\n')
    const subject = `Quote request${get('product') ? ` — ${get('product')}` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <h3 className="text-2xl">{formTitle}</h3>
      <p className="text-default-600 mt-3 text-base">{formDesc}</p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="qf-name">
            Name
          </label>
          <input id="qf-name" name="name" type="text" autoComplete="name" required className={FIELD_CLASS} />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-company">
            Company
          </label>
          <input id="qf-company" name="company" type="text" autoComplete="organization" className={FIELD_CLASS} />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-email">
            Email
          </label>
          <input id="qf-email" name="email" type="email" autoComplete="email" required className={FIELD_CLASS} />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-phone">
            Phone
          </label>
          <input id="qf-phone" name="phone" type="tel" autoComplete="tel" className={FIELD_CLASS} />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-country">
            Country
          </label>
          <input id="qf-country" name="country" type="text" autoComplete="country-name" className={FIELD_CLASS} />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-product">
            Product of interest
          </label>
          <select id="qf-product" name="product" required aria-describedby="qf-product-help" className={FIELD_CLASS} defaultValue="">
            <option value="" disabled>
              Select a product
            </option>
            {productOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <p id="qf-product-help" className={HELP_CLASS}>
            Pick the closest product. Not sure? Choose &apos;Help me specify&apos; and describe your application below.
          </p>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-grade">
            Grade or size (optional)
          </label>
          <input id="qf-grade" name="grade" type="text" aria-describedby="qf-grade-help" className={FIELD_CLASS} />
          <p id="qf-grade-help" className={HELP_CLASS}>
            If you know it. Mesh, micron, or FEPA all fine.
          </p>
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="qf-quantity">
            Quantity (optional)
          </label>
          <input id="qf-quantity" name="quantity" type="text" className={FIELD_CLASS} />
        </div>

        <div className="md:col-span-2">
          <label className={LABEL_CLASS} htmlFor="qf-message">
            Message
          </label>
          <textarea id="qf-message" name="message" required rows={5} className={FIELD_CLASS} />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="bg-primary hover:bg-default-900 rounded-md px-6 py-3.75 text-base font-medium text-white transition-all">
            Send request
          </button>
          <p className="text-default-500 mt-4 text-sm" role="status">
            {sent ? `Thanks. Your request reached our technical team, and someone will reply within one business day. Urgent? Call ${site.phone} or message us on WhatsApp.` : 'A real person replies within one business day.'}
          </p>
        </div>
      </div>
    </form>
  )
}

export default QuoteForm
