"use client"

import { useEffect, useState } from "react"

const codeLines = [
  "const agency = {",
  "  name: 'Nilado Media',",
  "  mission: 'Transform brands',",
  "  expertise: ['Web Dev', 'Design', 'Branding'],",
  "  status: 'Building the future...',",
  "  clients: await getHappyClients(),",
  "  innovation: true,",
  "  quality: 'Premium',",
  "}",
  "",
  "// Creating digital legends",
  "agency.launch()",
]

function AnimatedCode() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (!isTyping && currentLineIndex >= codeLines.length) {
      // Restart animation after 2 seconds
      const restartTimer = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLineIndex(0)
        setCurrentCharIndex(0)
        setIsTyping(true)
      }, 2000)

      return () => clearTimeout(restartTimer)
    }

    if (!isTyping || currentLineIndex >= codeLines.length) return

    const timer = setTimeout(
      () => {
        const currentLine = codeLines[currentLineIndex] || ""

        if (currentCharIndex < currentLine.length) {
          setDisplayedLines((prev) => {
            const newLines = [...prev]
            while (newLines.length <= currentLineIndex) {
              newLines.push("")
            }
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
            return newLines
          })
          setCurrentCharIndex((prev) => prev + 1)
        } else {
          // Move to next line
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentCharIndex(0)
          if (currentLineIndex === codeLines.length - 1) {
            setIsTyping(false)
          }
        }
      },
      Math.random() * 30 + 20,
    )

    return () => clearTimeout(timer)
  }, [currentLineIndex, currentCharIndex, isTyping])

  const renderCodeLine = (line: string) => {
    let result = line

    // Only highlight data types and values
    result = result.replace(/(true|false)/g, '<span class="text-white font-semibold">$1</span>')
    result = result.replace(/('.*?')/g, '<span class="text-white font-semibold">$1</span>')
    result = result.replace(/(\[.*?\])/g, '<span class="text-white font-semibold">$1</span>')

    return result
  }

  return (
    <div className="relative">
      <div className="bg-[#1e1e1e] rounded-lg border border-gray-800 overflow-hidden shadow-2xl shadow-blue-500/10">
        {/* Editor Header */}
        <div className="bg-[#2d2d30] px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
          </div>
          <div className="text-xs text-gray-400 font-mono">nilado.js</div>
        </div>

        {/* Code Content */}
        <div className="p-6 font-mono text-sm leading-relaxed h-[340px] overflow-hidden">
          {displayedLines.map((line, index) => {
            const safeLineNumber = line && line.trim() ? index + 1 : ""
            return (
              <div key={index} className="flex items-center min-h-[1.5rem]">
                <span className="text-gray-500 w-8 text-right mr-4 select-none">{safeLineNumber}</span>
                <span className="text-gray-400" dangerouslySetInnerHTML={{ __html: renderCodeLine(line || "") }} />
                {index === currentLineIndex && isTyping && <span className="animate-pulse text-white ml-1">|</span>}
              </div>
            )
          })}
          {isTyping && currentLineIndex < codeLines.length && (
            <div className="flex items-center min-h-[1.5rem]">
              <span className="text-gray-500 w-8 text-right mr-4 select-none">{currentLineIndex + 1}</span>
              <span className="animate-pulse text-white">|</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Animated Code */}
          <div className="order-2 lg:order-1">
            <AnimatedCode />
          </div>

          {/* Right side - Text content */}
          <div className="order-1 lg:order-2 space-y-8">
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
                <div className="text-sm font-mono font-light text-white/60 tracking-wider uppercase">Our Mission</div>
                <div className="text-xl font-light mt-2">Transform ambitious brands into digital legends.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
