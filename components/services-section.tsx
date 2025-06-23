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

  return (
    <section id="services" className="py-32 bg-gradient-to-br from-black via-gray-800 to-black z-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">What We Launch</h2>
          <p className="text-lg font-light text-white/60 max-w-2xl mx-auto">
            Four pillars of digital excellence that transform ambitious brands into market leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/50 to-black/80 border border-white/5 rounded-xl p-10 hover:border-white/20 transition-all duration-700 hover:bg-gradient-to-br hover:from-gray-800/60 hover:to-black/90 backdrop-blur-sm"
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon */}
                <div className="mb-10">
                  <div className="relative w-14 h-14 mx-auto">
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-white/5 rounded-lg blur-sm group-hover:bg-white/10 transition-all duration-700" />
                    {/* Icon container */}
                    <div className="relative w-14 h-14 bg-gradient-to-br from-white/10 to-white/5 rounded-lg flex items-center justify-center group-hover:from-white/15 group-hover:to-white/8 transition-all duration-700 border border-white/10 group-hover:border-white/20">
                      <IconComponent className="w-7 h-7 text-white/80 group-hover:text-white transition-colors duration-700" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-left space-y-5">
                  <h3 className="text-xl font-light text-white group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-500 mb-4">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="text-xs font-mono-jetbrains font-light text-white/40 group-hover:text-white/60 transition-colors duration-500 flex items-center"
                      >
                        <span className="w-1 h-1 bg-white/40 rounded-full mr-3 group-hover:bg-white/60 transition-colors duration-500"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elegant border highlight */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
