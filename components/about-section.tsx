"use client"

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-gray-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
            <img
              src="/images/landing-illustration.webp"
              alt="Digital analytics and data visualization illustration"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right side - Text content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-light leading-tight">
                Digital Pioneers.
                <br />
                <span className="font-extralight italic">Creative Rebels.</span>
              </h2>

              <div className="space-y-6">
                <p className="text-lg font-light text-white/80 leading-relaxed">
                  We're not your typical agency. While others chase yesterday's trends, we're already building
                  tomorrow's standards.
                </p>
                <p className="text-lg font-light text-white/80 leading-relaxed">
                  Every pixel, every line of code, every brand story we craft is designed to disrupt, inspire, and
                  dominate.
                </p>
              </div>

              <div className="pt-4">
                <div className="text-sm font-mono-jetbrains font-light text-white/60 tracking-wider uppercase">
                  Our Mission
                </div>
                <div className="text-xl font-light mt-2">Transform ambitious brands into digital legends.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
