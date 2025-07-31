"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
export interface HeroPanelProps {
  onLetsTalk?: () => void;
}
export default function HeroPanel({
  onLetsTalk
}: HeroPanelProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const headlineWords = ["I", "KEEP", "IT", "SIMPLE"];
  useEffect(() => {
    if (currentLine < headlineWords.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentLine, headlineWords.length]);
  const handleLetsTalk = () => {
    onLetsTalk?.();
  };
  return <section className="min-h-screen bg-[#0A0502] flex items-center justify-center px-6 py-20 md:py-32" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            
            {/* Animated Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-wider leading-tight flex flex-wrap items-center">
                {headlineWords.map((word, index) => <motion.span key={index} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: currentLine > index ? 1 : 0,
                x: currentLine > index ? 0 : -20
              }} transition={{
                duration: 0.5,
                ease: "easeOut"
              }} className={cn("inline-block relative text-[#FF6A00]", index < headlineWords.length - 1 ? "mr-4" : "")} style={{
                textShadow: "0 0 20px #FF6A00, 0 0 40px #FF6A00"
              }}>
                    {word}
                    {/* Flicker effect for completed words */}
                    {currentLine > index && <motion.span className="absolute inset-0" animate={{
                  opacity: [1, 0.8, 1, 0.9, 1]
                }} transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3 + 2
                }} />}
                  </motion.span>)}
                {/* Blinking Cursor - always at the end of the animated text */}
                <AnimatePresence>
                  {!isComplete && <motion.span initial={{
                  opacity: 0
                }} animate={{
                  opacity: [0, 1, 0]
                }} exit={{
                  opacity: 0
                }} transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} className="inline-block align-middle ml-1" style={{
                  width: "0.5em",
                  height: "1em",
                  background: "#FF6A00",
                  borderRadius: "0.12em",
                  verticalAlign: "middle",
                  boxShadow: "0 0 8px #FF6A00",
                  display: "inline-block"
                }} aria-hidden="true" />}
                </AnimatePresence>
              </h1>
            </div>

            {/* Subtext */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: isComplete ? 1 : 0,
            y: isComplete ? 0 : 20
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              <p className="text-lg md:text-xl text-[#FF6A00]/80 leading-relaxed max-w-lg">
                Designing user-friendly interfaces that solve real-world problems
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: isComplete ? 1 : 0,
            y: isComplete ? 0 : 20
          }} transition={{
            duration: 0.6,
            delay: 1
          }}>
              <button onClick={handleLetsTalk} className={cn("px-8 py-4 border-2 border-[#FF6A00] bg-transparent text-[#FF6A00]", "text-xl font-normal tracking-wider transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "hover:drop-shadow-[0_0_16px_#FF6A00]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:border-[#FF914D]", "focus:text-[#FF914D] focus:drop-shadow-[0_0_16px_#FF6A00]", "active:bg-[#FF6A00]/20 active:scale-95")} aria-label="Contact me to discuss your project">
                LET'S TALK
              </button>
            </motion.div>
          </div>

          {/* Right Column - Profile Portrait */}
          <div className="order-1 lg:order-2 flex flex-col items-center space-y-6">
            
            {/* Hexagonal Portrait */}
            <motion.figure initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: isComplete ? 1 : 0,
            scale: isComplete ? 1 : 0.8
          }} transition={{
            duration: 0.8,
            delay: 1.2
          }} className="relative">
              <div className={cn("w-64 h-64 md:w-80 md:h-80 relative", "border-4 border-[#FF6A00] bg-[#0A0502]", "transition-all duration-300")} style={{
              clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              boxShadow: "0 0 24px #FF6A00, inset 0 0 24px #FF6A00/20"
            }}>
                {/* Placeholder Portrait SVG */}
                <svg className="w-full h-full p-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  {/* Head */}
                  <circle cx="100" cy="80" r="35" stroke="#FF6A00" strokeWidth="3" fill="none" opacity="0.8" />
                  {/* Body */}
                  <path d="M65 115 Q65 110 70 110 L130 110 Q135 110 135 115 L135 180 L65 180 Z" stroke="#FF6A00" strokeWidth="3" fill="none" opacity="0.8" />
                  {/* Eyes */}
                  <circle cx="90" cy="75" r="3" fill="#FF6A00" />
                  <circle cx="110" cy="75" r="3" fill="#FF6A00" />
                  {/* Mouth */}
                  <path d="M90 90 Q100 95 110 90" stroke="#FF6A00" strokeWidth="2" fill="none" />
                </svg>
                
                {/* Glow effect */}
                <motion.div className="absolute inset-0" style={{
                clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                background: "radial-gradient(circle, #FF6A00/10 0%, transparent 70%)"
              }} animate={{
                opacity: [0.3, 0.6, 0.3]
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }} />
              </div>
              
              <figcaption className="sr-only">
                Profile portrait of Brandon Bartlett
              </figcaption>
            </motion.figure>

            {/* Terminal Label */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: isComplete ? 1 : 0,
            y: isComplete ? 0 : 20
          }} transition={{
            duration: 0.6,
            delay: 1.5
          }} className={cn("px-6 py-3 border border-[#FF6A00] bg-[#FF6A00]/5", "text-[#FF6A00] text-lg md:text-xl tracking-wider")} style={{
            boxShadow: "0 0 12px #FF6A00/30"
          }}>
              <span className="block text-center">
                HELLO, I'M BRANDON BARTLETT
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{
      background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #FF6A00 2px,
            #FF6A00 4px
          )`
    }} />
    </section>;
}