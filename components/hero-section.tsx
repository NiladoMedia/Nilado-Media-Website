"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Torus, Sphere } from "@react-three/drei"
import type * as THREE from "three"

type AnimatedGeometryProps = {
  mousePos: { x: number; y: number }
  isDesktop: boolean
}

function AnimatedGeometry({ mousePos, isDesktop }: AnimatedGeometryProps) {
  const meshRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const spheres = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ]

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Interaktivna ili auto rotacija glavnog grupe
    if (meshRef.current) {
      const mesh = meshRef.current
      if (isDesktop) {
        mesh.rotation.y += ((mousePos.x * 0.5) - mesh.rotation.y) * 0.05
        mesh.rotation.x += ((mousePos.y * 0.5) - mesh.rotation.x) * 0.05
      } else {
        mesh.rotation.x = t * 0.1
        mesh.rotation.y = t * 0.15
        mesh.rotation.z = Math.sin(t * 0.1) * 0.05
      }
    }

    // Suprotna rotacija torusa i jezgra
    if (torusRef.current) torusRef.current.rotation.z = -t * 0.3
    if (coreRef.current) coreRef.current.rotation.z = t * 0.3

    // Kugle kruže oko centra
    spheres.forEach((ref, i) => {
      if (!ref.current) return
      const angle = t * (0.4 + i * 0.2)
      const radius = 2 + i * 0.3
      ref.current.position.set(
        Math.cos(angle + i) * radius,
        Math.sin(angle * 0.7 + i) * radius * 1,
        Math.sin(angle + i) * radius
      )
    })
  })

  return (
    <>
      <group ref={meshRef}>
        <Torus ref={torusRef} args={[1.8, 0.4, 16, 64]} position={[0, 0, 0]}   rotation={[Math.PI / 10, Math.PI / 5, Math.PI/ 10]} // <-- nagib kao prsten planete
>
          <meshBasicMaterial wireframe color="#ffffff" opacity={0.4} transparent />
        </Torus>

        <Sphere ref={coreRef} args={[1.0, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial wireframe color="#ffffff" opacity={0.25} transparent />
        </Sphere>

        
      </group>

      {spheres.map((ref, i) => (
        <Sphere key={i} ref={ref} args={[0.15, 32, 32]}>
          <meshBasicMaterial wireframe color="#ffffff" opacity={0.8 - i * 0.1} transparent />
        </Sphere>
      ))}
    </>
  )
}

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateSize = () => setIsDesktop(window.innerWidth >= 1024)
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 1.1,
        y: -(e.clientY / window.innerHeight - 0.5) * 1.1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isDesktop])

  return (
    <section id="hero" className="relative flex flex-col py-48 lg:py-32 min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                We Don't Follow
                <br />
                <span className="font-extralight italic">Trends.</span>
                <br />
                We Launch Them.
              </h1>
            </div>

            <div className="space-y-6">
              <p className="text-lg md:text-xl font-mono-jetbrains font-light text-white/80 max-w-lg leading-relaxed">
                At Nilado Media, we don't just follow digital waves — we create them. From websites to branding, we
                engineer the future of your online presence.
              </p>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-xs font-mono-jetbrains font-light text-white/60 tracking-wider uppercase">
                Digital Studio for Visionaries
              </div>
              <div className="h-px bg-white/20 flex-1 max-w-32" />
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="relative h-[350px] lg:h-[700px] w-full">
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }} className="w-full h-full overflow-visible">
              <ambientLight intensity={0.2} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <AnimatedGeometry mousePos={mousePos} isDesktop={isDesktop} />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="absolute bottom-8 right-8 text-xs font-mono-jetbrains font-light text-white/60 tracking-wider uppercase">
        Trusted by 100+ Visionaries
      </div>
    </section>
  )
}
export default HeroSection