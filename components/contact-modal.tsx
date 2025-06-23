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
    // Auto-capitalize input
    const capitalizedValue = value.toUpperCase()
    setFormData((prev) => ({ ...prev, [field]: capitalizedValue }))
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
              >
                {/* Name and Company - Stack on mobile, side by side on desktop */}
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                  <motion.input
                    type="text"
                    placeholder="NAME"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border border-gray-300 p-4 bg-gray-50 w-full focus:bg-white focus:border-black hover:border-gray-500 transition-all duration-200 focus:outline-none text-black font-medium placeholder:text-gray-400"
                    style={{
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: "500",
                      color: "#000000",
                      letterSpacing: "0.01em",
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />

                  <motion.input
                    type="text"
                    placeholder="COMPANY"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="border border-gray-300 p-4 bg-gray-50 w-full focus:bg-white focus:border-black hover:border-gray-500 transition-all duration-200 focus:outline-none text-black font-medium placeholder:text-gray-400"
                    style={{
                      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontWeight: "500",
                      color: "#000000",
                      letterSpacing: "0.01em",
                    }}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>

                <motion.input
                  type="email"
                  placeholder="EMAIL"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="border border-gray-300 p-4 bg-gray-50 w-full focus:bg-white focus:border-black hover:border-gray-500 transition-all duration-200 focus:outline-none text-black font-medium placeholder:text-gray-400"
                  style={{
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontWeight: "500",
                    color: "#000000",
                    letterSpacing: "0.01em",
                  }}
                  whileFocus={{ scale: 1.01 }}
                />

                <div className="space-y-4">
                  <label className="text-black font-inter text-base md:text-sm font-medium uppercase tracking-wide">
                    HOW CAN WE HELP YOU?
                  </label>
                  {/* Stack service buttons vertically on mobile */}
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-2">
                    {["PRODUCT DESIGN", "BRANDING", "WEBSITES", "NO-CODE", "ENGINEERING"].map((label) => (
                      <motion.button
                        key={label}
                        type="button"
                        onClick={() => toggleService(label)}
                        className={`border border-gray-300 px-4 py-4 md:px-4 md:py-3 transition-all duration-200 hover:shadow-md hover:border-gray-500 text-sm md:text-xs font-medium ${
                          selectedServices.includes(label)
                            ? "bg-black text-white"
                            : "bg-gray-50 text-black hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.textarea
                  placeholder="TELL US ABOUT YOUR PROJECT"
                  value={formData.project}
                  onChange={(e) => handleInputChange("project", e.target.value)}
                  className="border border-gray-300 p-4 bg-gray-50 w-full h-32 md:h-32 resize-none focus:bg-white focus:border-black hover:border-gray-500 transition-all duration-200 focus:outline-none text-black font-medium placeholder:text-gray-400"
                  style={{
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    fontWeight: "500",
                    color: "#000000",
                    letterSpacing: "0.01em",
                  }}
                  whileFocus={{ scale: 1.005 }}
                />

                <div className="space-y-4">
                  <label className="text-black font-inter text-base md:text-sm font-medium uppercase tracking-wide">
                    WHAT BUDGET DO YOU HAVE?
                  </label>
                  <div className="relative">
                    <motion.button
                      type="button"
                      onClick={() => setIsBudgetOpen(!isBudgetOpen)}
                      className="border border-gray-300 p-4 bg-gray-50 w-full text-left flex items-center justify-between hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 focus:outline-none focus:border-black font-medium"
                      whileHover={{ scale: 1.005 }}
                    >
                      <span className={selectedBudget ? "text-black" : "text-gray-500"}>
                        {selectedBudget
                          ? budgetOptions.find((opt) => opt.value === selectedBudget)?.label
                          : "WHAT BUDGET DO YOU HAVE?"}
                      </span>
                      <motion.div animate={{ rotate: isBudgetOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {isBudgetOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scaleY: 0 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -10, scaleY: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 shadow-lg z-10 origin-top"
                        >
                          {budgetOptions.map((option, index) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => handleBudgetSelect(option.value, option.label)}
                              className="w-full p-4 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 font-medium"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ backgroundColor: "#f9fafb", x: 5 }}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-black font-inter text-base md:text-sm font-medium uppercase tracking-wide">
                    WHERE DID YOU FIND US?
                  </label>
                  {/* Stack source buttons vertically on mobile */}
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-2">
                    {["INSTAGRAM", "LINKEDIN", "SEEN YOUR WORK", "OTHER"].map((src) => (
                      <motion.button
                        key={src}
                        type="button"
                        onClick={() => setSelectedSource(src)}
                        className={`border border-gray-300 px-4 py-4 md:px-4 md:py-3 transition-all duration-200 hover:shadow-md hover:border-gray-500 text-sm md:text-xs font-medium ${
                          selectedSource === src ? "bg-black text-white" : "bg-gray-50 text-black hover:bg-gray-100"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {src}
                      </motion.button>
                    ))}
                  </div>
                </div>

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
