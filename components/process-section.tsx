export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "We Dig Deep",
      description:
        "Before we create magic, we understand your world. Your challenges, dreams, and the competition that's about to wonder what hit them.",
    },
    {
      number: "02",
      title: "Strategy",
      subtitle: "We Plot the Revolution",
      description:
        "Every great disruption starts with a plan. We map out your path to digital domination with precision and creativity.",
    },
    {
      number: "03",
      title: "Creation",
      subtitle: "We Build the Future",
      description:
        "This is where ideas become reality. Where your brand transforms from concept to digital force of nature.",
    },
    {
      number: "04",
      title: "Launch",
      subtitle: "We Break the Internet",
      description: "Ready, aim, launch. We don't just go live—we make waves that ripple across your entire industry.",
    },
  ]

  return (
    <section id="process" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            How We Launch
            <br />
            <span className="font-extralight italic">Legends</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {steps.map((step, index) => (
            <div key={step.number} className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-6xl font-extralight text-white/20">{step.number}</span>
                <div>
                  <h3 className="text-2xl font-light">{step.title}</h3>
                  <h4 className="text-lg font-light text-white/80">{step.subtitle}</h4>
                </div>
              </div>
              <p className="text-base font-light text-white/70 leading-relaxed pl-20">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
