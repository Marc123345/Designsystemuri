import Wireframe from '@/components/Wireframe'

/**
 * The people, as a grid of portraits.
 *
 * Built to dawork's `team-area`: a centred section title over a row of cards,
 * each a portrait with the name and role beneath it. Restated in this site's
 * vocabulary — square corners, one hairline frame, cells divided by rules
 * rather than floating as shadowed cards.
 *
 * ── Two things the reference has that this does not ─────────────────────────
 *
 * Its cards carry a social-icon overlay that slides in on hover — Pinterest,
 * Instagram, X, Facebook per person. EID has no individual accounts to link to,
 * and inventing four sets of personal social handles for a live company is a
 * worse outcome than leaving them off. The footer already carries the company's
 * own.
 *
 * And its portraits are photographs. EID has supplied none, so every slot here
 * is a labelled `Wireframe` — the same placeholder the products area uses. Each
 * one names the photograph it is waiting for, so the outstanding asset list is
 * visible on the page rather than in a document.
 *
 * ⚠ THE ROLES ARE PLACEHOLDERS AND THE NAMES ARE DELIBERATELY ABSENT.
 *
 * Four functional roles a manufacturer of this size has, filled in so the
 * layout can be reviewed. They are not EID's org chart and must not ship as
 * one. The name line reads "Name to confirm" on purpose: a plausible invented
 * name on a live company page is the kind of thing that gets quoted back, and
 * this site has already been bitten twice by generated detail that read as
 * fact — an invented SKU on a product frame and a garbled certification on a
 * laboratory wall. Replace both fields from Uri's list before launch.
 */

export type Member = {
  /** Left empty until EID supplies the real list — see the note above. */
  name?: string
  role: string
  /** What the portrait slot is waiting for; shown on the placeholder. */
  photoLabel: string
}

const TeamGrid = ({ members }: { members: Member[] }) => (
  <div className="border-default-200 grid grid-cols-1 border sm:grid-cols-2 lg:grid-cols-4">
    {members.map((member) => (
      <article key={member.role} className="border-default-200 flex flex-col not-first:border-t sm:not-first:border-t-0 sm:[&:nth-child(n+3)]:border-t sm:not-[:nth-child(2n+1)]:border-s lg:[&:nth-child(n+3)]:border-t-0 lg:not-first:border-s">
        <Wireframe label={member.photoLabel} ratio="portrait" className="!border-0" />

        <div className="border-default-200 border-t px-6 py-5">
          <h3 className="text-lg">{member.name ?? <span className="text-default-400 italic">Name to confirm</span>}</h3>
          <p className="text-default-500 mt-1.5 text-xs tracking-[0.2em] uppercase">{member.role}</p>
        </div>
      </article>
    ))}
  </div>
)

export default TeamGrid
