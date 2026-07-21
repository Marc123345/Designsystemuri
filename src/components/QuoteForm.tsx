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
 */
const FIELD_CLASS =
  'w-full rounded border border-default-200 px-4 py-3 text-base text-default-900 placeholder:text-default-500 focus:border-primary focus:outline-none'

const QuoteForm = ({
  formTitle,
  formDesc,
  productOptions,
}: {
  formTitle: string
  formDesc: string
  productOptions: string[]
}) => {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const body = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Country: ${get('country')}`,
      `Product of interest: ${get('product')}`,
      '',
      'Requirement:',
      get('details'),
    ].join('\n')
    const subject = `Quote request${get('product') ? ` — ${get('product')}` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false}>
      <h3 className="text-2xl">{formTitle}</h3>
      <p className="mt-3 text-base text-default-600">{formDesc}</p>

      <div className="mt-8 grid md:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <label className="sr-only" htmlFor="qf-name">
            Your name
          </label>
          <input
            id="qf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={FIELD_CLASS}
            placeholder="Name"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="qf-email">
            Your email address
          </label>
          <input
            id="qf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={FIELD_CLASS}
            placeholder="Email"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="qf-country">
            Country
          </label>
          <input
            id="qf-country"
            name="country"
            type="text"
            autoComplete="country-name"
            className={FIELD_CLASS}
            placeholder="Country"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="qf-product">
            Product of interest
          </label>
          <select id="qf-product" name="product" className={FIELD_CLASS} defaultValue="">
            <option value="" disabled>
              Product of interest
            </option>
            {productOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="sr-only" htmlFor="qf-details">
            Grade, size, quantity, and application
          </label>
          <textarea
            id="qf-details"
            name="details"
            required
            rows={5}
            className={FIELD_CLASS}
            placeholder="Grade, size, quantity, application…"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded rounded-ee-2xl bg-primary px-6 py-3.75 text-base font-medium text-white transition-all hover:bg-default-900"
          >
            Submit Request
          </button>
          <p className="mt-4 text-sm text-default-500" role="status">
            {sent
              ? 'Your email client should have opened with the details filled in. If it did not, email us directly.'
              : 'Opens your email client with the details filled in, addressed to our sales inbox.'}
          </p>
        </div>
      </div>
    </form>
  )
}

export default QuoteForm
