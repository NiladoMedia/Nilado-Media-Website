"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ContactModal from "@/components/contact-modal"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScroll, setIsScroll] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  const navItems = [
    { name: "WORK", href: "#work" },
    { name: "SERVICES", href: "#services" },
    { name: "PROCESS", href: "#process" },
    { name: "ABOUT", href: "#about" }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed z-50 backdrop-blur-md top-0 duration-300 w-full ${isScroll ? "bg-black pt-0" : "pt-5"}`}>
        <div className={`${isScroll ? "md:px-20 px-8" : "md:px-14 px-6"} max-w-10xl mx-auto duration-300`}>
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="/">
              <img src="/logo/niladoLogoBijeli.svg" alt="Nilado Logo" className="h-5 w-auto" />
              </a>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-mono-jetbrains font-light tracking-wider hover:text-white/70"
                >
                  {item.name}
                </a>
              ))}
              <Button
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-mono-jetbrains"
                onClick={() => setModalOpen(true)}
              >
                CONTACT →
              </Button>
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
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm font-mono-jetbrains font-light tracking-wider hover:text-white/70"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
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