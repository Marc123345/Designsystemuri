'use client'

import JotformEmbed from '@/components/JotformEmbed'

/**
 * The quote block: heading, standfirst, and EID's Jotform embed.
 *
 * This used to be a hand-built form whose submit composed a mailto to the sales
 * inbox — honest, but it depended on the visitor having a mail client
 * configured, and nothing was ever recorded anywhere. The Jotform form is a
 * real endpoint with real submissions behind it, so the markup here is now just
 * the framing around it.
 *
 * Prefill from the grade selector still works: /contact?product=…&grade=… is
 * read by JotformEmbed and passed to the form.
 */
const QuoteForm = ({ formTitle, formDesc }: { formTitle: string; formDesc: string }) => (
  <div>
    <h3 className="text-2xl">{formTitle}</h3>
    <p className="text-default-600 mt-3 text-base">{formDesc}</p>

    <div className="mt-8">
      <JotformEmbed title={formTitle} />
    </div>
  </div>
)

export default QuoteForm
