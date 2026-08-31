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
/**
 * ⚠ `formTitle` IS STILL REQUIRED WHEN `heading` IS FALSE, and that is the
 * point of splitting them. It stops being a visible <h3> and stays the
 * iframe's `title`, which is the form's accessible name — a cross-origin
 * iframe with no title is announced as "frame" and nothing else, so dropping
 * the heading from the page must not drop the label from the embed.
 */
const QuoteForm = ({ formTitle, formDesc, heading = true }: { formTitle: string; formDesc?: string; heading?: boolean }) => (
  <div>
    {heading && (
      <>
        <h3 className="text-2xl">{formTitle}</h3>
        {formDesc && <p className="text-default-600 mt-3 text-base">{formDesc}</p>}
      </>
    )}

    <div className={heading ? 'mt-8' : ''}>
      <JotformEmbed title={formTitle} />
    </div>
  </div>
)

export default QuoteForm
