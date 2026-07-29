/**
 * Celestial Matrix shader — a WebGL "digital rain" background (blue → green).
 * Adapted from the 21st.dev component to render as an absolute-fill layer that
 * sits behind a section's content (drop it inside a `relative` container) rather
 * than a full-page fixed layer.
 *
 * WebGL (not WebGPU), so it runs in essentially every browser; if WebGL is
 * unavailable it silently no-ops and the section's own background shows. Respects
 * prefers-reduced-motion (renders one static frame instead of animating).
 */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
    vec2 mouse = (iMouse * 2.0 - iResolution) / iResolution.y;

    float dist = length(uv - mouse);
    float warp = smoothstep(0.5, 0.0, dist);
    uv += normalize(uv - mouse) * warp * 0.2;

    float gridSize = 30.0;
    vec2 gridUv = fract(uv * gridSize);
    vec2 gridId = floor(uv * gridSize);

    float t = iTime * 2.0;
    float rainSpeed = 0.5;
    float fall = fract(gridId.y * 0.1 - t * rainSpeed + random(gridId.xx) * 2.0);

    float character = random(gridId + floor(t * 5.0 * random(gridId.yx)));
    character = step(0.95, character);

    float glow = 1.0 - smoothstep(0.0, 0.8, gridUv.y);
    float intensity = character * glow * fall;

    vec3 color1 = vec3(0.1, 0.3, 0.9);
    vec3 color2 = vec3(0.1, 0.8, 0.5);
    vec3 finalColor = mix(color1, color2, random(gridId)) * intensity;
    finalColor *= (1.0 - random(gridId + t) * 0.2);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

export default function MatrixShader({ className = '' }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch (err) {
      console.error('WebGL not supported:', err)
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    const canvas = renderer.domElement
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const clock = new THREE.Clock()

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2() },
    }
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const w = Math.floor(rect.width)
      const h = Math.floor(rect.height)
      if (w === 0 || h === 0) return
      renderer.setSize(w, h)
      uniforms.iResolution.value.set(canvas.width, canvas.height)
      // Repaint now so a size change is reflected even without the anim loop.
      renderer.render(scene, camera)
    }
    resize()
    // Run again after first layout/paint (container is often 0 during mount).
    const raf = requestAnimationFrame(resize)

    // Track container size (host section grows as the video/card load in).
    const ro = new ResizeObserver(() => resize())
    ro.observe(container)

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const dpr = renderer.getPixelRatio()
      uniforms.iMouse.value.set((e.clientX - rect.left) * dpr, (rect.height - (e.clientY - rect.top)) * dpr)
    }
    window.addEventListener('mousemove', onMouseMove)

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      uniforms.iTime.value = 1.5
      renderer.render(scene, camera)
    } else {
      renderer.setAnimationLoop(() => {
        uniforms.iTime.value = clock.getElapsedTime()
        renderer.render(scene, camera)
      })
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      renderer.setAnimationLoop(null)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      material.dispose()
      geometry.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />
}
