import type { StaticImageData } from 'next/image'

// Real product photography, per-grade shots, and size/grade charts scraped from
// the legacy eid-ltd.com catalogue. Keys match the file basename so the
// product-catalog can reference an image by a stable string. Generated to stay
// in sync with the asset folder — add a file, regenerate, and it registers.

import cbnAMicron from '@/assets/images/products/eid/cbn-a-micron.jpg'
import cbnBMicron from '@/assets/images/products/eid/cbn-b-micron.jpg'
import chartCbnMicron from '@/assets/images/products/eid/chart-cbn-micron.png'
import chartMetalbondMicron from '@/assets/images/products/eid/chart-metalbond-micron.png'
import chartNaturalMicron from '@/assets/images/products/eid/chart-natural-micron.png'
import chartPolyMicron from '@/assets/images/products/eid/chart-poly-micron.png'
import chartResinbondMicron from '@/assets/images/products/eid/chart-resinbond-micron.png'
import congoRd from '@/assets/images/products/eid/congo-rd.jpg'
import cvdPolycrystalline from '@/assets/images/products/eid/cvd-polycrystalline.jpg'
import cvdSingleCrystal from '@/assets/images/products/eid/cvd-single-crystal.jpg'
import ebnAa from '@/assets/images/products/eid/ebn-aa.jpg'
import ebnB48 from '@/assets/images/products/eid/ebn-b-4-8.jpg'
import eda2395 from '@/assets/images/products/eid/eda-2395.jpg'
import erdUm from '@/assets/images/products/eid/erd-um.jpg'
import esn770 from '@/assets/images/products/eid/esn-770.jpg'
import mb100P from '@/assets/images/products/eid/mb-100-p.jpg'
import mb1um1222 from '@/assets/images/products/eid/mb1um-12-22.jpg'
import mb1um24 from '@/assets/images/products/eid/mb1um-2-4.jpg'
import mb1um3040 from '@/assets/images/products/eid/mb1um-30-40.jpg'
import mcd from '@/assets/images/products/eid/mcd.jpg'
import metalBondMicron from '@/assets/images/products/eid/metal-bond-micron.jpg'
import naturalMicron from '@/assets/images/products/eid/natural-micron.jpg'
import ns100P from '@/assets/images/products/eid/ns-100-p.jpg'
import pcbnEdn from '@/assets/images/products/eid/pcbn-edn.png'
import pcbnEsn from '@/assets/images/products/eid/pcbn-esn.png'
import pcbn from '@/assets/images/products/eid/pcbn.png'
import pcdGradesChart from '@/assets/images/products/eid/pcd-grades-chart.png'
import pcd from '@/assets/images/products/eid/pcd.jpg'
import polyMicron from '@/assets/images/products/eid/poly-micron.jpg'
import rd10 from '@/assets/images/products/eid/rd10.jpg'
import rd90 from '@/assets/images/products/eid/rd90.jpg'
import resinBondMesh from '@/assets/images/products/eid/resin-bond-mesh.jpg'
import toolstone1 from '@/assets/images/products/eid/toolstone-1.jpg'
import toolstone10 from '@/assets/images/products/eid/toolstone-10.jpg'
import toolstone11 from '@/assets/images/products/eid/toolstone-11.jpg'
import toolstone12 from '@/assets/images/products/eid/toolstone-12.jpg'
import toolstone13 from '@/assets/images/products/eid/toolstone-13.jpg'
import toolstone14 from '@/assets/images/products/eid/toolstone-14.jpg'
import toolstone15 from '@/assets/images/products/eid/toolstone-15.jpg'
import toolstone16 from '@/assets/images/products/eid/toolstone-16.jpg'
import toolstone2 from '@/assets/images/products/eid/toolstone-2.jpg'
import toolstone3 from '@/assets/images/products/eid/toolstone-3.jpg'
import toolstone4 from '@/assets/images/products/eid/toolstone-4.jpg'
import toolstone5 from '@/assets/images/products/eid/toolstone-5.jpg'
import toolstone6 from '@/assets/images/products/eid/toolstone-6.jpg'
import toolstone7 from '@/assets/images/products/eid/toolstone-7.jpg'
import toolstone8 from '@/assets/images/products/eid/toolstone-8.jpg'
import toolstone9 from '@/assets/images/products/eid/toolstone-9.jpg'
import wdA from '@/assets/images/products/eid/wd-a.jpg'
import wdAa from '@/assets/images/products/eid/wd-aa.jpg'
import wdAaa from '@/assets/images/products/eid/wd-aaa.jpg'

export const productImages: Record<string, StaticImageData> = {
  'cbn-a-micron': cbnAMicron,
  'cbn-b-micron': cbnBMicron,
  'chart-cbn-micron': chartCbnMicron,
  'chart-metalbond-micron': chartMetalbondMicron,
  'chart-natural-micron': chartNaturalMicron,
  'chart-poly-micron': chartPolyMicron,
  'chart-resinbond-micron': chartResinbondMicron,
  'congo-rd': congoRd,
  'cvd-polycrystalline': cvdPolycrystalline,
  'cvd-single-crystal': cvdSingleCrystal,
  'ebn-aa': ebnAa,
  'ebn-b-4-8': ebnB48,
  'eda-2395': eda2395,
  'erd-um': erdUm,
  'esn-770': esn770,
  'mb-100-p': mb100P,
  'mb1um-12-22': mb1um1222,
  'mb1um-2-4': mb1um24,
  'mb1um-30-40': mb1um3040,
  'mcd': mcd,
  'metal-bond-micron': metalBondMicron,
  'natural-micron': naturalMicron,
  'ns-100-p': ns100P,
  'pcbn-edn': pcbnEdn,
  'pcbn-esn': pcbnEsn,
  'pcbn': pcbn,
  'pcd-grades-chart': pcdGradesChart,
  'pcd': pcd,
  'poly-micron': polyMicron,
  'rd10': rd10,
  'rd90': rd90,
  'resin-bond-mesh': resinBondMesh,
  'toolstone-1': toolstone1,
  'toolstone-10': toolstone10,
  'toolstone-11': toolstone11,
  'toolstone-12': toolstone12,
  'toolstone-13': toolstone13,
  'toolstone-14': toolstone14,
  'toolstone-15': toolstone15,
  'toolstone-16': toolstone16,
  'toolstone-2': toolstone2,
  'toolstone-3': toolstone3,
  'toolstone-4': toolstone4,
  'toolstone-5': toolstone5,
  'toolstone-6': toolstone6,
  'toolstone-7': toolstone7,
  'toolstone-8': toolstone8,
  'toolstone-9': toolstone9,
  'wd-a': wdA,
  'wd-aa': wdAa,
  'wd-aaa': wdAaa,
}

export const getProductImage = (key?: string): StaticImageData | undefined =>
  key ? productImages[key] : undefined
