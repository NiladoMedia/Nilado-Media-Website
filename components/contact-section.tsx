import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black z-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-light leading-tight">
              Ready to Launch
              <br />
              <span className="font-extralight italic">Your Legend?</span>
            </h2>
            <p className="text-lg font-mono-jetbrains font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
              The digital revolution waits for no one. While your competitors are still figuring out yesterday, we're
              already building your tomorrow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-light tracking-wider px-8 py-6 text-base"
            >
              START YOUR TRANSFORMATION →
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-light tracking-wider px-8 py-6 text-base"
            >
              SEE OUR WORK
            </Button>
          </div>

          <div className="pt-16 border-t border-white/10">
            <div className="text-sm font-mono-jetbrains font-light text-white/60 tracking-wider">
              NILADO MEDIA — WHERE DIGITAL LEGENDS ARE BORN
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
