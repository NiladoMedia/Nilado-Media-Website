// ContactModal.tsx
"use client"

import { useEffect, useState } from "react"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [selectedSource, setSelectedSource] = useState<string>("")
  const [selectedBudget, setSelectedBudget] = useState<string>("")
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    project: "",
  })

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const toggleService = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const budgetOptions = [
    { value: "<1000", label: "Less than 1.000€" },
    { value: "1000-2000", label: "1.000€ – 2.000€" },
    { value: ">2000", label: "More than 2.000€" },
  ]

  const handleBudgetSelect = (value: string, label: string) => {
    setSelectedBudget(value)
    setIsBudgetOpen(false)
  }

  const handleInputChange = (field: string, value: string) => {
    // No capitalization needed here now
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        services: selectedServices,
        budget: selectedBudget,
        source: selectedSource,
      }),
    })

    const result = await res.json()

    if (result.success) {
      // Success toast
      toast.success("Your message was sent. We'll be in touch shortly.")
      onClose()
    } else {
      // Error toast
      toast.error("Something went wrong. Please try again.")
    }
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
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
              velocity: 0,
            }}
            className="fixed top-0 right-0 z-50 h-full w-full md:w-1/2 bg-white text-black shadow-2xl overflow-y-auto"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              perspective: 1000,
            }}
          >
            <div className="p-6 md:p-10 h-full min-h-screen flex flex-col">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-black hover:text-red-500 transition-colors duration-200 z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 md:mb-8"
              >
                <h2 className="text-3xl md:text-3xl font-inter font-bold mb-3">Contact Us</h2>
                <p className="text-base md:text-xs tracking-wide text-gray-700 font-inter mb-6 md:mb-8">
                  We're always looking for a challenge. Got a project in mind?
                </p>

                {/* Horizontal separator line */}
                <div className="w-full h-px bg-gray-300"></div>
              </motion.div>

              <motion.form
                className="flex-1 space-y-6 md:space-y-6 font-mono text-xs tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
              >
                {/* Form fields */}
                {/* Name and Company - Stack on mobile, side by side on desktop */}
                {/* Existing form components here */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2 py-4 text-base md:text-sm font-medium transition-all duration-200 hover:shadow-lg uppercase tracking-wide"
                  >
                    SUBMIT A FORM
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
