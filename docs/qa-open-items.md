# QA — what is still open

Everything the 18/08 QA checklist raised that could be fixed from the codebase
has been, on the `phil-feedback` branch. This is what is left, and why each item
is here rather than done.

Nothing in this list is a bug someone forgot. Each one needs either a physical
device, a decision, or content that does not exist yet.

---

## 1 · Needs a real device

Four checks cannot be run from a build machine. They are the whole of what is
left on the accessibility and responsive sections.

| Check | Why it cannot be done here |
| --- | --- |
| iOS Safari + Android Chrome pass | No device. Chrome headless is not a proxy for either. |
| True 320px viewport | Chrome on macOS enforces a minimum window width; the narrowest reachable was 536px. No horizontal overflow at that width, but 320 is the number the checklist asks for. |
| WhatsApp button vs the Jotform submit | The form is a cross-origin iframe. Its buttons cannot be measured from outside it, so whether the floating button covers one on a phone can only be seen by looking. |
| Form submissions reach the right inbox | Has to be a real submission against production. |

## 1a · The launch sequence — read this before attaching a domain

Three separate things are currently held shut by the same lock, and attaching a
custom domain releases all three at once. Only one of them is obvious.

The Vercel project is protected with Vercel Authentication set to
`all_except_custom_domains`. So today nothing is reachable without a Vercel
login, which is why none of the following matters yet:

1. **`robots.txt` says `Allow: /`** and the layout's metadata says
   `index, follow`. Correct for the real site. On the review deployment it means
   the only thing standing between a crawler and this build is the login.
2. **The annotation layer renders for everyone** — design commentary written for
   Uri and Phil. Off via `NEXT_PUBLIC_REVIEW_MODE=off`, but that has to be set
   deliberately; nothing does it automatically.
3. **`SITE_ORIGIN` still points at the Vercel URL**, so every canonical,
   hreflang, `og:url` and `og:image` names `designsystemuri.vercel.app`. Fixed
   by setting `NEXT_PUBLIC_SITE_URL`, which again nothing does on its own.

The failure mode is attaching a domain — even briefly, even to test — before
those two variables are set. At that moment the site becomes publicly reachable,
invites indexing, serves internal design notes to anyone who looks, and names
the wrong canonical host on every page. Search engines are considerably more
eager than the people who would notice.

So the order is: set `NEXT_PUBLIC_SITE_URL`, set `NEXT_PUBLIC_REVIEW_MODE=off`,
redeploy, confirm both on the deployment, and only then point the domain.

Two things that are already fine and need nothing: the sitemap is correct — 192
URLs, 24 routes across 8 locales, with hreflang alternates, and it resolves
through `SITE_ORIGIN` so it follows the variable above. And `robots.txt`
correctly points at it.

## 2 · Needs a decision

**The seven non-English locales serve English.** `lib/i18n-generated/index.ts`
exports an empty map, so `/de/about` renders `<html lang="de">` around English
copy, and hreflang tells search engines there are eight translations that do not
exist. That is 168 near-duplicate pages and a lang/content mismatch a screen
reader will read aloud with the wrong phonetics. Cause is the GCP Translate
quota sitting at zero.

Three ways out: restrict `routing.locales` to `['en']` until translations exist
(one line, reversible, but it changes every URL); restore the translation budget
and run `npm run translate`; or ship as-is knowingly. Not changed unilaterally
because it rewrites the URL structure Uri has been reviewing.

**The annotation layer is live to the public.** Its own docblock says REVIEW
ONLY and it renders design commentary written for Uri and Phil to anyone who
opens the site. Correct for now — it is how the photography brief gets walked —
but it must be off before launch. The switch is now
`NEXT_PUBLIC_REVIEW_MODE=off` in the Vercel project rather than a line someone
has to remember to delete. Unset means on, so today is unchanged.

**Set `NEXT_PUBLIC_SITE_URL` at launch.** Canonicals, hreflang, `og:url` and
`og:image` all resolve through `SITE_ORIGIN`, which currently falls back to the
Vercel review URL. One variable moves all four to the real domain.

## 3 · Cannot be fixed in this repo

Everything the checklist asks of the forms is a Jotform builder setting. There
is not a single native form control in `src/` — no `form`, `input`, `textarea`
or `select` anywhere. Field count, visible labels, inline validation, error
wording, the success message, autocomplete attributes and multi-locale support
all live in Jotform (form `262084626654058`) and have to be changed there.

Two related unknowns: whether the Jotform field names are literally `product`
and `grade`, which is what `JotformEmbed.tsx` assumes when it prefills from the
grade selector; and whether a real submission lands in the right inbox.

## 4 · Content that does not exist yet

**Photography.** `SHOW_PHOTOS` is `false` in `lib/product-images.ts` and around
thirty slots are `Wireframe` placeholders. Three checklist items are genuinely
untestable until real images land: consistent aspect ratios within each grid and
carousel, no stretched or letterboxed product shots, and the contrast of the
hero's "Industries we supply" line, which sits on the hero photograph and so has
no final ground to measure against.

**Surface Enhancement has datasheets but no page.** `lib/documents.ts` publishes
two — Coatings, and Polish, Etch & CRT — under a group whose name matches no
product on the site. Coatings are covered per-product through the `#coated`
sections, but polishing, etching for electroplating and crystal rounding
technology appear exactly once anywhere else: one clause inside a home-page FAQ
answer about custom work. Either it is a capability that deserves a page, or the
datasheet group needs to say where it belongs. That is Uri's call, and it
overlaps with the product-page rule still to come.

**There is no analytics on the site at all.** No gtag, no GTM, no Vercel Web
Analytics, no Plausible or anything else — nothing in `package.json`, nothing in
the source, nothing in the built HTML, and Web Analytics is not enabled on the
Vercel project either. So the checklist's "analytics events firing — quote form
submit, datasheet download, WhatsApp click" cannot pass, because there is
nothing for them to fire into. For a site whose entire job is producing quote
requests, launching without measurement means nobody will be able to say whether
it worked.

Worth deciding before launch rather than after, because the choice has a
knock-on: GA4 sets cookies, and with eight locales and a European audience that
drags in consent handling and a banner the site does not currently have. Vercel
Web Analytics is cookieless and is one line in the layout, which sidesteps that
entirely. Not installed either way — it needs a property and a decision, and
neither is mine to make. Note that the two GA4 IDs already in circulation belong
to other sites; EID needs its own.

**Slides 2+ of WhyEid are only reachable by interacting.** The checklist's rule
is that nothing important should live only inside a carousel, since most people
never swipe past the first slide. Products are fine — all eight are linked
directly on the home page and are one click away through the mega-menu — but the
WhyEid pillars are carousel-only, so most of that argument goes unseen. Left
alone deliberately: WhyEid is one of the two sections the checklist already
marks as a merge candidate, so it is Uri's restructuring to make rather than
something to rebuild first and then undo.

**One datasheet is 11.5MB.** `eid-cvd-single-crystal-datasheet.pdf`, against
48.3MB across all 21 files. All 21 are valid PDFs, all present, none empty, and
they download natively rather than opening in a tab — but a buyer pulling 11.5MB
over mobile data is a poor first experience of the technical library. Recompressing
is EID's decision, since it is their artwork.

## 5 · Waiting on Uri

The three phases the checklist itself marks as on hold: the home-page section
reduction from eleven to six or fewer, the copy cut and marketing-lingo strip
across Home, About, Quality and Contact, and the general rule for all eight
product pages.

Worth knowing before that work starts: the application page is the only route
below the checklist's 90 mobile performance target, at 88. It is not a single
defect — LCP is 3.4s with 87% of it render delay and no blocking JavaScript,
which is cumulative page weight. The section reduction is aimed at exactly that,
so it is deliberately not being optimised beforehand.

## What passed and needed nothing

**Reachability**, measured off the built link graph rather than estimated. Every
one of the eight products and six applications is **one click** from the home
page, against a limit of three. Every one of the 21 datasheet and MSDS PDFs is
reachable within **two**. Nothing in the graph is orphaned.

The stricter NN/g #7 test — datasheets, MSDS and the quote form within two
clicks *from anywhere*, not just from home — also passes: worst case is two
clicks to a specific PDF and one click to the datasheets index, the MSDS index
or the quote form, from any page on the site. The mega-menu and footer are
doing their job.

Recorded so it is not re-audited: one `h1` per page with no skipped levels;
every rendered `img` carries an `alt`; carousel arrows are 44–48px against a
24px minimum; radii, shadows and transition timings are one consistent scale;
Swiper is already code-split per route; all 21 datasheets and MSDS files exist
and download; no broken internal link on any of the 194 built pages; hreflang is
reciprocal with `x-default`; the QC pages use a responsive grid that stacks
rather than tables that crush; and accessibility is 100 on home, a product page
and an application page, desktop and mobile.
