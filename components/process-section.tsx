export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      subtitle: "In-Depth Research",
      description:
        "The first step in every project is thorough research of the client’s business, competition, and market.",
    },
    {
      number: "02",
      title: "Strategy",
      subtitle: "Strategic Planning",
      description:
        "Based on the research, we develop a clear and precise strategy aimed at achieving long-term brand success.",
    },
    {
      number: "03",
      title: "Creation",
      subtitle: "Building the Vision",
      description:
        "In this phase, our team implements the strategy through design, development, and solution adaptation.",
    },
    {
      number: "04",
      title: "Launch",
      subtitle: "Project Deployment",
      description: "In the final phase, we launch the project with the goal of achieving wide market impact and long-term sustainability.",
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
