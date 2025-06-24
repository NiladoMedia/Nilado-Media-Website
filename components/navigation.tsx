"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactModal from "@/components/contact-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("EN")

  const navItems = [
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "NEWS", href: "#news" },
    { name: "BLOG", href: "#blog" },
  ]

  const languages = [
    { code: "EN", name: "English" },
    { code: "SR", name: "Srpski" },
    { code: "DE", name: "Deutsch" },
  ]

  const scrollToHero = () => {
    const HeroSection = document.getElementById("hero")
    if (HeroSection) {
      window.scrollTo({
        top: HeroSection.offsetTop,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isLanguageOpen && !(event.target as Element).closest(".relative")) {
        setIsLanguageOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isLanguageOpen])

  return (
    <>
      <style jsx>{`
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px) scaleY(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scaleY(1);
    }
  }
`}</style>
      <nav className={`fixed z-50 backdrop-blur-md top-0 duration-300 w-full ${isScroll ? "bg-black pt-0" : "pt-5"}`}>
        <div className={`${isScroll ? "md:px-20 px-8" : "md:px-14 px-6"} max-w-10xl mx-auto duration-300`}>
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" onClick={scrollToHero}>
                <img src="/logo/niladoLogoBijeli.svg" alt="Nilado Logo" className="h-5 w-auto" />
              </a>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center">
              {/* Services Group */}
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-mono-jetbrains font-light tracking-wider hover:text-white/70"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Language Group */}
              <div className="ml-12">
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="text-sm font-mono-jetbrains font-light tracking-wider hover:text-white/70 flex items-center gap-1"
                  >
                    {selectedLanguage}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${isLanguageOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isLanguageOpen && (
                    <div
                      className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-md py-2 min-w-[100px] z-50 animate-in slide-in-from-top-2 duration-200"
                      style={{
                        animation: "slideDown 0.2s ease-out forwards",
                        transformOrigin: "top",
                      }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLanguage(lang.code)
                            setIsLanguageOpen(false)
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm font-mono-jetbrains hover:bg-white/10 transition-colors ${
                            selectedLanguage === lang.code ? "text-white" : "text-white/70"
                          }`}
                        >
                          {lang.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Group */}
              <div className="ml-12">
                <Button
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-mono-jetbrains"
                  onClick={() => setModalOpen(true)}
                >
                  CONTACT →
                </Button>
              </div>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile nav */}
          {isOpen && (
            <div className="md:hidden px-4 pt-2 pb-4 border-t border-white/10">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-mono-jetbrains font-light tracking-wider hover:text-white/70"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {/* Mobile Language Selection */}
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="text-xs font-mono-jetbrains font-light tracking-wider text-white/50 mb-2">LANGUAGE</div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code)
                      setIsOpen(false)
                    }}
                    className={`block w-full text-left py-1 text-sm font-mono-jetbrains font-light tracking-wider transition-colors ${
                      selectedLanguage === lang.code ? "text-white" : "text-white/70 hover:text-white/90"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-mono-jetbrains"
                onClick={() => {
                  setModalOpen(true)
                  setIsOpen(false)
                }}
              >
                CONTACT →
              </Button>
            </div>
          )}
        </div>
      </nav>

      <ContactModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
