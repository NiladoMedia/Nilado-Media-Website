"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Monitor, Palette, TrendingUp, Zap } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: Monitor,
      title: "Web Development",
      description: "We craft high-performance websites that captivate and convert.",
      features: ["Responsive Design", "SEO Optimization", "Fast Loading"],
    },
    {
      icon: Palette,
      title: "Design",
      description: "Every pixel serves a purpose in creating unforgettable experiences.",
      features: ["UI/UX Design", "Brand Identity", "Visual Assets"],
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven campaigns that turn audiences into loyal customers.",
      features: ["Social Media", "PPC Campaigns", "Analytics"],
    },
    {
      icon: Zap,
      title: "Branding",
      description: "We build brands that resonate and create lasting impressions.",
      features: ["Brand Strategy", "Logo Design", "Brand Guidelines"],
    },
  ]

  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [transforms, setTransforms] = useState<string[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || "ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMouseMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return

    setHoveredCard(index)
    if (!cardRefs.current[index]) return

    const card = cardRefs.current[index]
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    const newTransforms = [...transforms]
    newTransforms[index] = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    setTransforms(newTransforms)

    // Set CSS custom properties for mouse tracking glow
    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }

  const handleMouseLeave = (index: number) => () => {
    if (isMobile) return

    setHoveredCard(null)
    const newTransforms = [...transforms]
    newTransforms[index] = ""
    setTransforms(newTransforms)
  }

  return (
    <section id="services" className="py-32 bg-gradient-to-br from-black via-gray-800 to-black z-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">What We Launch</h2>
          <p className="text-lg font-light text-white/60 max-w-2xl mx-auto">
            Four pillars of digital excellence that transform ambitious brands into market leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon

            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={!isMobile ? handleMouseMove(index) : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave(index) : undefined}
                className={`group relative bg-gradient-to-br from-gray-800/50 to-black/90 rounded-xl p-6 md:p-10 backdrop-blur-sm cursor-pointer transition-all duration-500 ${
                  !isMobile && hoveredCard !== null && hoveredCard !== index
                    ? "opacity-40 scale-95"
                    : "opacity-100 scale-100"
                }`}
                style={{
                  transform: !isMobile ? transforms[index] || "" : "",
                  transformStyle: !isMobile ? "preserve-3d" : "none",
                  transition:
                    !isMobile && transforms[index]
                      ? "opacity 0.2s ease-out, transform 0.6s ease-out, scale 0.2s ease-out"
                      : "all 0.4s ease-out",
                  boxShadow: undefined,
                }}
              >
                {/* Subtle glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl transition-opacity duration-700 ${
                    isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Icon */}
                <div className="mb-6 md:mb-10">
                  <div className="relative w-14 h-14 mx-auto">
                    {/* Icon glow effect */}
                    <div
                      className={`absolute inset-0 rounded-lg blur-sm transition-all duration-700 ${
                        isMobile
                          ? "bg-white/8 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                          : "bg-white/5 group-hover:bg-white/10"
                      }`}
                    />

                    {/* Icon container with glowing border */}
                    <div
                      className={`relative w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center transition-all duration-700 ${
                        isMobile
                          ? "border-2 border-white/15 shadow-[0_0_10px_rgba(255,255,255,0.1),inset_0_0_10px_rgba(255,255,255,0.05)]"
                          : "border border-white/10 group-hover:border-white/20 group-hover:from-white/15 group-hover:to-white/8"
                      }`}
                    >
                      <IconComponent
                        className={`w-7 h-7 transition-colors duration-700 ${
                          isMobile ? "text-white/90" : "text-white/80 group-hover:text-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-left space-y-3 md:space-y-5">
                  <h3
                    className={`text-xl font-light transition-colors duration-500 ${
                      isMobile ? "text-white" : "text-white group-hover:text-white"
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm font-light leading-relaxed transition-colors duration-500 mb-4 ${
                      isMobile ? "text-white/70" : "text-white/60 group-hover:text-white/80"
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`text-xs font-mono-jetbrains font-light transition-colors duration-500 flex items-center ${
                          isMobile ? "text-white/50" : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full mr-3 transition-colors duration-500 ${
                            isMobile ? "bg-white/50" : "bg-white/40 group-hover:bg-white/60"
                          }`}
                        ></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mouse tracking glow effect - Desktop only */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 70%)`,
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
