import TheLaboratory from '@/components/quality/TheLaboratory'
import QualityMosaic from '@/components/quality/QualityMosaic'
import TheControls from '@/components/quality/TheControls'
import VideoHero from '@/components/VideoHero'
import type { Locale } from '@/i18n/routing'
import { localeAlternates } from '@/lib/hreflang'
import { t } from '@/lib/i18n-content'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: 'Quality Control & Laboratory Standards | EID Ltd' },
    description:
      'Every batch of EID diamond and CBN powder undergoes laboratory validation — sieve and micron sizing, morphology, chemical cleaning and optional toughness testing — against FEPA, ISO 6106 and ANSI standards.',
    alternates: localeAlternates(locale, '/quality'),
  }
}

/**
 * /quality, rebuilt on the About page's layout.
 *
 * Marc's instruction: the About layout exactly, three sections, this page's
 * own pictures and words. So the sequence is About's, one section shorter:
 *
 *   VideoHero        film, type over it, 48svh          ← About's hero, same props
 *   TheLaboratory    ← TheCompany       statement + 16:10 media
 *   QualityMosaic    ← AboutMosaic      figures over photographs + two statements
 *   TheControls      ← CoreValues       four PhotoCards, 7/5 - 5/7
 *
 * ── What went, and where it went ────────────────────────────────────────────
 *
 * Nothing was dropped. Three sections meant folding four things into three:
 *
 *  · The hero's 60-word lede → TheLaboratory's opening paragraph. About's hero
 *    carries a headline alone, and matching that is the point of the exercise.
 *    The paragraph was a statement about the laboratory sitting in a hero, and
 *    it reads better as the first thing under one.
 *  · The compliance strip (FEPA / ISO 6106 / ANSI) → the second paragraph of
 *    TheLaboratory. A standards list is a sentence, not a section.
 *  · Its ISO 9001 badge → the mosaic's solid tile, at 64px instead of 12px.
 *  · The four controls → TheControls, unchanged in content.
 *
 * ── Where About's fourth section would have been ────────────────────────────
 *
 * About closes on GlobeSection, then a white spacer before the footer. Both
 * are absent here and that is the same decision twice, not a deviation: the
 * globe is about reach rather than quality and would be the fourth section,
 * and the spacer exists on About only because GlobeSection is a dark
 * full-bleed band whose 24px corners need some page ground under them to read
 * as corners. TheControls ends on white, so there is nothing to separate.
 *
 * ── The closing CTA is still gone ───────────────────────────────────────────
 *
 * "Test our consistency" was removed on Marc's earlier call and has not come
 * back. It was in Uri's written spec (§4), so if it returns it returns with his
 * wording. Nothing is orphaned: /contact is the header button on every page,
 * it is in the footer, and the floating WhatsApp control sits over this page.
 */
const QualityPage = async ({ params }: { params: Promise<{ locale: Locale }> }) => {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      {/* About's hero configuration exactly — 48svh rather than the home
          page's 60, and no supporting line, because the heading carries the
          page and the paragraph that used to sit here now opens TheLaboratory.

          ── The film ──
          The laboratory footage, which is the home page's clip rather than
          About's wireframe diamond. With two clips in the library one of them
          repeats somewhere, and this is the pairing that makes sense: this is
          the page that documents the laboratory that footage was shot in.
          Swap it the moment Uri supplies a third clip.

          `objectPosition` is VideoHero's default upward bias rather than
          About's `object-center` — the same distinction the home page already
          makes, because this composition has its subject above the midline and
          About's wireframe is centred by construction. */}
      <VideoHero
        title={t(locale, 'Our Quality Control & Laboratory Standards')}
        video="https://ik.imagekit.io/qcvroy8xpd/EID%20VIDEO%20HERO.mp4"
        minHeight="min-h-[48svh]"
      />

      <TheLaboratory />
      <QualityMosaic />
      <TheControls />
    </>
  )
}

export default QualityPage
