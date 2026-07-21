# EID Ltd — website

Marketing and catalogue site for **EID Ltd**, a London manufacturer of industrial diamond and CBN
superabrasives. Next.js 16 (App Router) + React 19 + Tailwind CSS 4.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16, App Router, React Compiler on |
| Styling | Tailwind CSS 4 (`@theme` tokens in `src/assets/css/_config.css`) |
| UI behaviour | Preline (dropdowns, overlays, accordions) |
| Motion / media | Swiper, AOS, lightGallery |
| Icons | Iconify (`tabler:*`) |
| i18n | next-intl, eight locales, `as-needed` prefixing |

The visual system comes from the Manufactt template, recolored from its stock orange to EID's
Industrial Precision blue (`#2c3c6c`). Brand tokens live in one place:
`src/assets/css/_config.css`.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
npx tsc --noEmit
```

## Content model

All copy is data, not JSX. Pages read from `src/lib/` and render it — so a copy change is a data
change, and the same content feeds the nav, the footer index, the sitemap, and every cross-link.

| File | Holds |
| --- | --- |
| `src/lib/products.ts` | The eight locked product groups. One group = one page. Mesh/micron splits, coatings, PCBN and PCD blanks are **sections inside** a page (`#anchor`), never separate routes. |
| `src/lib/applications.ts` | The six application hubs — the second entry axis into the catalogue. |
| `src/lib/site.ts` | NAP details, primary nav, product mega-menu columns, the full footer index, legal links. |
| `src/lib/i18n-content.ts` | Per-locale override tables + `t()` for UI chrome. |
| `src/lib/hreflang.ts` | Reciprocal `hreflang` + `x-default` for any path. |

### Adding a product

Append to `products` in `src/lib/products.ts` and add its slug to `MEGA_MENU_COLUMNS`. The route,
sitemap entry, mega-menu item, footer link, and home card all follow automatically.

## Internationalisation

Eight locales: `en de es it ja fr ko zh`. EN is the default and stays unprefixed (`/products`); the
rest are prefixed (`/de/products`).

Content uses a **fallback-merge** model: EN is the source of truth, and per-locale override tables
supply translated fields. Any field without an override renders EN, so a partially translated locale
still reads cleanly. FR, KO and ZH currently have no override table and render EN throughout.

## Structure

```
src/
  app/[locale]/      routes — home, products, applications, quality, resources, about, contact
  app/sitemap.ts     all paths × all locales, with language alternates
  components/
    ui.tsx           ArrowButton, ArrowLink, ChapterMarker, SectionHeading
    sections.tsx     PageHero, CardGrid, Pillars, DarkFeatureList, Faq, CrossLinks, SpecTable…
    RichText.tsx     inline [label](href) links inside copy strings
    navbar/ footer/  chrome, both driven by src/lib/site.ts
  i18n/              next-intl routing, navigation and request config
  lib/               the content model (above)
```

Build pages by composing `components/sections.tsx` and `components/ui.tsx`. Don't hand-roll section
markup — the kit is what keeps eight product pages and six hubs looking like one site.

## Before launch

- [ ] Confirm FAQ answers, spec-table values and the production model with Uri
- [ ] Write real Terms and Privacy pages, then flip `ready: true` in `legalLinks`
- [ ] Point `SITE_ORIGIN` in `src/app/sitemap.ts` at the live domain (also update the org schema in `src/app/[locale]/layout.tsx` and `robots.ts`)
- [ ] Wire the quote form to a real endpoint
- [ ] Replace placeholder imagery in `public/eid/`
