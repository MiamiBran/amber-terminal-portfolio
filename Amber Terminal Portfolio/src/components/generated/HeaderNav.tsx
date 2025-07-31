"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export interface HeaderNavProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
  onRetrieveFile?: () => void;
}
export default function HeaderNav({
  activeSection = "work",
  onNavigate,
  onRetrieveFile
}: HeaderNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [{
    id: "work",
    label: "WORK"
  }, {
    id: "experience",
    label: "EXPERIENCE"
  }, {
    id: "about",
    label: "ABOUT"
  }, {
    id: "contact",
    label: "CONTACT"
  }];
  const handleNavClick = (sectionId: string) => {
    onNavigate?.(sectionId);
    setIsMobileMenuOpen(false);
  };
  const handleRetrieveFile = () => {
    onRetrieveFile?.();
    setIsMobileMenuOpen(false);
  };
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0502] border-b border-[#FF6A00]/20" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-8 py-4">
        {/* Left Navigation Links */}
        <ul className="flex items-center space-x-8">
          {navItems.map(item => <li key={item.id}>
              <button onClick={() => handleNavClick(item.id)} className={cn("relative text-lg font-normal tracking-wider transition-all duration-300", "hover:text-[#FF6A00] hover:drop-shadow-[0_0_8px_#FF6A00]", "focus:outline-none focus:text-[#FF6A00] focus:drop-shadow-[0_0_8px_#FF6A00]", activeSection === item.id ? "text-[#FF6A00] drop-shadow-[0_0_8px_#FF6A00]" : "text-[#FF6A00]/70")} aria-label={`Navigate to ${item.label} section`}>
                {item.label}
                
                {/* Hover underline */}
                <span className={cn("absolute bottom-0 left-0 h-0.5 bg-[#FF6A00] transition-all duration-300", "opacity-0 w-0 group-hover:opacity-100 group-hover:w-full", "drop-shadow-[0_0_4px_#FF6A00]")} />
                
                {/* Active pulsing underline */}
                {activeSection === item.id && <motion.span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#FF914D]" style={{
              boxShadow: "0 0 8px #FF914D, 0 0 16px #FF914D"
            }} animate={{
              opacity: [0.6, 1, 0.6],
              boxShadow: ["0 0 8px #FF914D, 0 0 16px #FF914D", "0 0 12px #FF914D, 0 0 24px #FF914D", "0 0 8px #FF914D, 0 0 16px #FF914D"]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }} />}
              </button>
            </li>)}
        </ul>

        {/* Right Retrieve File Button */}
        <button onClick={handleRetrieveFile} className={cn("px-6 py-2 border-2 border-[#FF6A00] bg-transparent text-[#FF6A00]", "text-lg font-normal tracking-wider transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:drop-shadow-[0_0_12px_#FF6A00]", "hover:border-[#FF914D] hover:text-[#FF914D]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:drop-shadow-[0_0_12px_#FF6A00]", "active:bg-[#FF6A00]/20")} aria-label="Retrieve file or download resume">
          RETRIEVE.FILE
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-6 py-4">
        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={cn("p-2 text-[#FF6A00] transition-all duration-300", "hover:text-[#FF914D] hover:drop-shadow-[0_0_8px_#FF6A00]", "focus:outline-none focus:text-[#FF914D] focus:drop-shadow-[0_0_8px_#FF6A00]")} aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X size={24} className="drop-shadow-[0_0_4px_currentColor]" /> : <Menu size={24} className="drop-shadow-[0_0_4px_currentColor]" />}
        </button>

        {/* Mobile Retrieve File Button */}
        <button onClick={handleRetrieveFile} className={cn("px-4 py-2 border border-[#FF6A00] bg-transparent text-[#FF6A00]", "text-sm font-normal tracking-wider transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:drop-shadow-[0_0_8px_#FF6A00]", "hover:border-[#FF914D] hover:text-[#FF914D]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:drop-shadow-[0_0_8px_#FF6A00]")} aria-label="Retrieve file or download resume">
          RETRIEVE.FILE
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: "auto",
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.3,
        ease: "easeInOut"
      }} className="md:hidden bg-[#0A0502] border-t border-[#FF6A00]/20 overflow-hidden">
            <ul className="py-4 space-y-2">
              {navItems.map(item => <li key={item.id}>
                  <button onClick={() => handleNavClick(item.id)} className={cn("w-full text-left px-6 py-3 text-lg font-normal tracking-wider", "transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:text-[#FF6A00] hover:drop-shadow-[0_0_8px_#FF6A00]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:text-[#FF6A00] focus:drop-shadow-[0_0_8px_#FF6A00]", activeSection === item.id ? "text-[#FF6A00] bg-[#FF6A00]/5 drop-shadow-[0_0_8px_#FF6A00]" : "text-[#FF6A00]/70")} aria-label={`Navigate to ${item.label} section`}>
                    {item.label}
                    {activeSection === item.id && <motion.span className="ml-2 text-[#FF914D]" animate={{
                opacity: [0.6, 1, 0.6]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                        ▶
                      </motion.span>}
                  </button>
                </li>)}
            </ul>
          </motion.div>}
      </AnimatePresence>

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
      background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #FF6A00 2px,
            #FF6A00 4px
          )`
    }} />
    </nav>;
}