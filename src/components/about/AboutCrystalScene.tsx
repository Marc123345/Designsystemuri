'use client'

import { useEffect, useRef } from 'react'

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const AboutCrystalScene = () => {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let disposed = false
    let frame = 0
    let resizeObserver: ResizeObserver | null = null
    let cleanupThree: (() => void) | null = null

    const start = async () => {
      const THREE = await import('three')
      if (disposed) return

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      camera.position.set(0, 0, 6)

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      host.appendChild(renderer.domElement)

      const crystalGroup = new THREE.Group()
      scene.add(crystalGroup)

      const geometry = new THREE.OctahedronGeometry(1.55, 2)
      geometry.scale(0.95, 1.18, 0.95)

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xa9bddf,
        transparent: true,
        opacity: 0.72,
        roughness: 0.2,
        metalness: 0.04,
        clearcoat: 0.8,
        clearcoatRoughness: 0.18,
        transmission: 0.16,
        thickness: 0.65,
      })
      const crystal = new THREE.Mesh(geometry, material)
      crystalGroup.add(crystal)

      const edgeGeometry = new THREE.EdgesGeometry(geometry, 10)
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0xeaf1ff,
        transparent: true,
        opacity: 0.42,
      })
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial)
      crystalGroup.add(edges)

      const pointPositions: number[] = []
      for (let i = 0; i < 180; i += 1) {
        const radius = 1.72 + Math.random() * 0.8
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        pointPositions.push(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi) * 0.82,
          radius * Math.sin(phi) * Math.sin(theta)
        )
      }
      const pointGeometry = new THREE.BufferGeometry()
      pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3))
      const pointMaterial = new THREE.PointsMaterial({
        color: 0xbdd0ee,
        size: 0.028,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      })
      const points = new THREE.Points(pointGeometry, pointMaterial)
      crystalGroup.add(points)

      const measurementGroup = new THREE.Group()
      scene.add(measurementGroup)

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x91a9cf,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
      const ring = new THREE.Mesh(new THREE.RingGeometry(2.02, 2.03, 128), ringMaterial)
      measurementGroup.add(ring)

      const crosshairMaterial = new THREE.LineBasicMaterial({
        color: 0x91a9cf,
        transparent: true,
        opacity: 0,
      })
      const crosshairGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-2.35, 0, 0),
        new THREE.Vector3(2.35, 0, 0),
        new THREE.Vector3(0, -2.35, 0),
        new THREE.Vector3(0, 2.35, 0),
      ])
      const crosshair = new THREE.LineSegments(crosshairGeometry, crosshairMaterial)
      measurementGroup.add(crosshair)

      scene.add(new THREE.HemisphereLight(0xf4f7ff, 0x14203c, 2.1))
      const key = new THREE.DirectionalLight(0xffffff, 3.2)
      key.position.set(3.5, 4.5, 5)
      scene.add(key)
      const rim = new THREE.DirectionalLight(0x6f8fc4, 2.2)
      rim.position.set(-4, -1, 3)
      scene.add(rim)

      const resize = () => {
        const { width, height } = host.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }

      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(host)
      resize()

      const render = (time: number) => {
        if (disposed) return

        const rect = host.getBoundingClientRect()
        const viewport = Math.max(window.innerHeight, 1)
        const progress = clamp((viewport - rect.top) / (viewport + rect.height))
        const measure = clamp((progress - 0.34) / 0.5)
        const particle = clamp((progress - 0.5) / 0.42)

        crystalGroup.rotation.y = 0.35 + progress * 2.5 + time * 0.00008
        crystalGroup.rotation.x = -0.08 + progress * 0.62
        crystalGroup.rotation.z = progress * 0.14
        crystalGroup.scale.setScalar(1 - progress * 0.1)

        material.opacity = 0.74 - progress * 0.28
        material.roughness = 0.2 + progress * 0.22
        edgeMaterial.opacity = 0.38 + progress * 0.46

        pointMaterial.opacity = particle * 0.62
        points.rotation.y = -progress * 1.4 - time * 0.00005
        points.scale.setScalar(0.95 + particle * 0.42)

        ringMaterial.opacity = measure * 0.34
        crosshairMaterial.opacity = measure * 0.26
        measurementGroup.rotation.z = progress * 0.22
        measurementGroup.scale.setScalar(0.92 + measure * 0.08)

        renderer.render(scene, camera)
        frame = window.requestAnimationFrame(render)
      }

      frame = window.requestAnimationFrame(render)

      cleanupThree = () => {
        window.cancelAnimationFrame(frame)
        resizeObserver?.disconnect()
        geometry.dispose()
        edgeGeometry.dispose()
        pointGeometry.dispose()
        ring.geometry.dispose()
        crosshairGeometry.dispose()
        material.dispose()
        edgeMaterial.dispose()
        pointMaterial.dispose()
        ringMaterial.dispose()
        crosshairMaterial.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    start().catch(() => {
      // The static SVG beneath the canvas is the deliberate fallback.
    })

    return () => {
      disposed = true
      cleanupThree?.()
    }
  }, [])

  return (
    <div ref={hostRef} className="relative h-full w-full" aria-hidden>
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full text-white/18" fill="none">
        <circle cx="300" cy="300" r="188" stroke="currentColor" strokeWidth="1" />
        <path d="M300 96 462 208 421 407 300 504 179 407 138 208Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="m300 96-68 163 68 245 68-245-68-163Z" stroke="currentColor" strokeWidth="0.8" />
        <path d="M138 208 232 259 179 407M462 208l-94 51 53 148M232 259h136" stroke="currentColor" strokeWidth="0.8" />
        <path d="M86 300h428M300 86v428" stroke="currentColor" strokeWidth="0.65" strokeDasharray="5 11" />
      </svg>
    </div>
  )
}

export default AboutCrystalScene
