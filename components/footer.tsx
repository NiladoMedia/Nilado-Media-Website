import { Instagram, Linkedin, Eye } from "lucide-react"

export function Footer() {
  const services = [
    { name: "Web Design", href: "#" },
    { name: "Branding", href: "#" },
    { name: "SMM", href: "#" },
    { name: "Ads", href: "#" },
  ]

  const company = [
    { name: "About", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ]

  const social = [
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Behance", href: "#", icon: Eye },
  ]

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Grain effect overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-wider text-white">
                <img src="/logo/niladoLogoBijeli.svg" alt="Nilado Logo" className="h-4 w-auto" />
              </h3>
              <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">
                Digital studio for visionaries. We don't follow trends — we launch them.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono-jetbrains font-light text-white/80 tracking-wider uppercase">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group text-sm font-light text-white/60 hover:text-white transition-all duration-300 relative inline-block"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -m-1"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono-jetbrains font-light text-white/80 tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group text-sm font-light text-white/60 hover:text-white transition-all duration-300 relative inline-block"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -m-1"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-sm font-mono-jetbrains font-light text-white/80 tracking-wider uppercase">Social</h4>
            <ul className="space-y-3">
              {social.map((item) => {
                const IconComponent = item.icon
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center space-x-3 text-sm font-mono-jetbrains font-light text-white/60 hover:text-white transition-all duration-300 relative"
                    >
                      <div className="relative">
                        <IconComponent className="w-4 h-4 relative z-10" />
                        <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm scale-150"></div>
                      </div>
                      <span className="relative z-10">{item.name}</span>
                      <span className="absolute inset-0 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -m-1"></span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs font-mono-jetbrains font-light text-white/40 tracking-wider">
              © 2025 Nilado Media. All rights reserved.
            </p>
            <div className="text-xs font-mono-jetbrains font-light text-white/40 tracking-wider uppercase">
              Where Digital Legends Are Born
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
