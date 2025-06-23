"use client"

import { useEffect, useState } from "react"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedSource, setSelectedSource] = useState<string>("")
  const [selectedBudget, setSelectedBudget] = useState<string>("")

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 h-full w-1/2 bg-white text-black p-10 shadow-lg overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-black hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-inter font-bold mb-2">Contact Us</h2>
            <p className="text-xs tracking-wide text-gray-700 font-inter mb-6">
              We’re always looking for a challenge. Got a project in mind?
            </p>

            <form className="space-y-5 font-mono text-xs tracking-wide">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="NAME" className="border border-gray-300 p-3 bg-white w-full" />
                <input type="text" placeholder="COMPANY" className="border border-gray-300 p-3 bg-white w-full" />
              </div>
              <input type="email" placeholder="EMAIL" className="border border-gray-300 p-3 bg-white w-full" />

              <label className="text-gray-700 font-inter text-xs">How can we help?</label>
              <div className="flex gap-2 flex-wrap">
                {["PRODUCT DESIGN", "BRANDING", "WEBSITES", "NO-CODE", "ENGINEERING"].map(label => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleService(label)}
                    className={`border border-gray-300 px-4 py-2 ${
                      selectedServices.includes(label) ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="TELL US ABOUT YOUR PROJECT"
                className="border border-gray-300 p-3 bg-white w-full h-28 resize-none"
              />

              <label className="text-gray-700 font-inter text-xs">What budget do you have?</label>
              <div className="relative">
                <select
                  value={selectedBudget}
                  onChange={e => setSelectedBudget(e.target.value)}
                  className="border border-gray-300 p-3 bg-white w-full appearance-none pr-8"
                >
                  <option value="">Select</option>
                  <option value="<5000">Less than 5.000€</option>
                  <option value="5000-10000">5.000€ – 10.000€</option>
                  <option value=">10000">More than 10.000€</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
              </div>

              <label className="text-gray-700 font-inter text-xs">Where did you find us?</label>
              <div className="flex gap-2 flex-wrap">
                {["REFERRAL", "TWITTER", "SEEN YOUR WORK", "OTHER"].map(src => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedSource(src)}
                    className={`border border-gray-300 px-4 py-2 ${
                      selectedSource === src ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {src}
                  </button>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 mt-4 flex items-center justify-center gap-2"
              >
                Submit a Form
                <ChevronRight className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
