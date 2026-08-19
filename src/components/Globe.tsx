'use client'

import { useEffect, useRef } from 'react'

interface GlobeProps {
  size?: number
  className?: string
}

// EID manufactures in London and supplies tool makers worldwide. London is the
// hub (index 0); every arc originates there and reaches a market EID ships to
// across Europe, the Middle East, Asia, and the Americas. These are markets
// served, not offices — the honesty the copy deck insists on.
const CITIES = [
  { lat: 51.5074, lng: -0.1278, name: 'London', hub: true }, // 0 — manufacturing HQ
  { lat: 50.1109, lng: 8.6821, name: 'Frankfurt' }, // 1
  { lat: 45.4642, lng: 9.19, name: 'Milan' }, // 2
  { lat: 48.8566, lng: 2.3522, name: 'Paris' }, // 3
  { lat: 32.0853, lng: 34.7818, name: 'Tel Aviv' }, // 4
  { lat: 25.2048, lng: 55.2708, name: 'Dubai' }, // 5
  { lat: 31.2304, lng: 121.4737, name: 'Shanghai' }, // 6
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo' }, // 7
  { lat: 37.5665, lng: 126.978, name: 'Seoul' }, // 8
  { lat: 19.076, lng: 72.8777, name: 'Mumbai' }, // 9
  { lat: 40.7128, lng: -74.006, name: 'New York' }, // 10
  { lat: 41.8781, lng: -87.6298, name: 'Chicago' }, // 11
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo' }, // 12
]

// EID-blue arc gradients (tints of --color-primary-1 #3d5290), light enough to
// read against the earth-night texture.
const ARC_COLORS: [string, string][] = [
  ['rgba(169,194,242,0.95)', 'rgba(61,82,144,0.45)'],
  ['rgba(140,168,224,0.75)', 'rgba(61,82,144,0.3)'],
]

// Every route runs from London (0) outward. Tier splits Europe/near markets (A)
// from the longer-haul lanes (B) purely for visual weight.
const ROUTES: [number, number, number][] = [
  [0, 1, 0],
  [0, 2, 0],
  [0, 3, 0],
  [0, 4, 0],
  [0, 10, 0],
  [0, 5, 1],
  [0, 6, 1],
  [0, 7, 1],
  [0, 8, 1],
  [0, 9, 1],
  [0, 11, 1],
  [0, 12, 1],
]

function buildArcs() {
  return ROUTES.map(([from, to, tier]) => ({
    startLat: CITIES[from].lat,
    startLng: CITIES[from].lng,
    endLat: CITIES[to].lat,
    endLng: CITIES[to].lng,
    color: ARC_COLORS[tier],
  }))
}

function buildPoints() {
  return CITIES.map((c) => ({
    lat: c.lat,
    lng: c.lng,
    size: c.hub ? 0.55 : 0.32,
    color: c.hub ? 'rgba(216,232,255,0.98)' : 'rgba(169,194,242,0.7)',
  }))
}

function disposeGlobe(globe: any) {
  try {
    const renderer = globe?.renderer?.()
    if (renderer) {
      renderer.setAnimationLoop(null)
      renderer.dispose()
      renderer.forceContextLoss()
      const canvas = renderer.domElement
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas)
    }
    const scene = globe?.scene?.()
    if (scene) {
      scene.traverse((obj: any) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material]
          materials.forEach((m: any) => {
            m.map?.dispose?.()
            m.dispose?.()
          })
        }
      })
      scene.clear()
    }
    globe?._destructor?.()
  } catch {
    // no-op
  }
}

export default function Globe({ size = 600, className = '' }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const destroyedRef = useRef(false)
  const startedRef = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    destroyedRef.current = false

    // three.js and globe.gl are ~1.2MB of the client bundle between them. The
    // imports below are dynamic, so they were already split out of the initial
    // payload — but this effect used to run the moment the component mounted,
    // which meant the download and the WebGL setup started immediately on page
    // load. GlobeSection sits near the bottom of the home, about and contact
    // pages, so that was the single heaviest thing on the site competing with
    // the hero for bandwidth and blocking the main thread while the user was
    // still looking at content above the fold.
    //
    // Gating on the viewport keeps the split honest: nothing is fetched until
    // the globe is close to being seen. rootMargin starts the work a screen
    // early so it is normally ready by the time it scrolls into view, rather
    // than popping in blank and filling late.
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    const init = () => {
      if (startedRef.current || destroyedRef.current) return
      startedRef.current = true

      Promise.all([import('globe.gl'), import('three')])
        .then(([GlobeModule, THREE]) => {
          if (destroyedRef.current || !containerRef.current) return
          // globe.gl's default export is callable as Globe(config)(domEl); its
          // bundled types describe only the `new` form, so cast to keep the
          // documented functional call.
          const GlobeGL = GlobeModule.default as any

          const globe = GlobeGL({ animateIn: false })(containerRef.current!)
          globeRef.current = globe

          const w = containerRef.current!.clientWidth || 600
          const h = containerRef.current!.clientHeight || 600

          // atmosphereColor goes to THREE.Color, which has no alpha channel.
          // The 0.55 in the rgba() this used to carry was silently dropped —
          // three.js warned about it on the console on every page with a globe,
          // and the atmosphere has been rendering at full strength all along.
          // Stated as rgb so the code says what actually happens; the softness
          // comes from the atmosphere shader's own falloff, not from this.
          globe.backgroundColor('rgba(0,0,0,0)').width(w).height(h).showAtmosphere(true).atmosphereColor('rgb(140,168,224)').atmosphereAltitude(0.25).globeImageUrl('/images/earth-night.jpg')

          globe.pointLat('lat').pointLng('lng').pointColor('color').pointAltitude(0.01).pointRadius('size').pointsMerge(false).pointsTransitionDuration(400)

          // Dashed arcs animate continuously. Under reduced motion they are
          // drawn solid and still, so the trade routes still read as lines
          // without anything moving.
          globe
            .arcColor('color')
            .arcDashLength(reduceMotion ? 1 : 0.7)
            .arcDashGap(reduceMotion ? 0 : 0.15)
            .arcDashAnimateTime(reduceMotion ? 0 : 2200)
            .arcStroke(1.1)
            .arcAltitudeAutoScale(0.45)
            .arcsTransitionDuration(reduceMotion ? 0 : 800)

          globe.pointsData(buildPoints())
          globe.arcsData(buildArcs())

          const controls = globe.controls()
          controls.autoRotate = !reduceMotion
          controls.autoRotateSpeed = 0.65
          controls.enableZoom = false
          controls.enablePan = false

          // Framed on Europe/Africa so London and the bulk of the arcs read on load.
          globe.pointOfView({ lat: 20, lng: 10, altitude: 2.1 })

          const renderer = globe.renderer?.()
          if (renderer) {
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
          }

          const scene = globe.scene()
          if (scene) {
            const sun = new THREE.DirectionalLight(0xbfdaff, 1.8)
            sun.position.set(5, 2, 4)
            scene.add(sun)

            const rim = new THREE.PointLight(0x3d5290, 0.8, 50)
            rim.position.set(-4, 1, -3)
            scene.add(rim)

            const fill = new THREE.AmbientLight(0x101528, 0.45)
            scene.add(fill)
          }
        })
        .catch(() => {
          // WebGL/library load failure — leave the reserved space empty rather
          // than break the section.
        })
    }

    // No IntersectionObserver (very old browser): fall back to initialising
    // straight away rather than never showing the globe at all.
    if (typeof IntersectionObserver === 'undefined') {
      init()
      return () => {
        destroyedRef.current = true
        if (globeRef.current) {
          disposeGlobe(globeRef.current)
          globeRef.current = null
        }
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          init()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      destroyedRef.current = true
      if (globeRef.current) {
        disposeGlobe(globeRef.current)
        globeRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current.width(containerRef.current.clientWidth).height(containerRef.current.clientHeight)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className={`relative mx-auto w-full ${className}`} style={{ aspectRatio: '1', maxWidth: size }}>
      <div ref={containerRef} className="absolute inset-0 size-full" style={{ contain: 'strict', background: 'transparent' }} />
    </div>
  )
}
