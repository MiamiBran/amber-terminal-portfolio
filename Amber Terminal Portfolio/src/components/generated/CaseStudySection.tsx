"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export interface CaseStudySectionProps {
  caseStudy?: {
    id: string;
    title: string;
    summary: string;
    overview: string;
    tools: string[];
    outcome: string;
    screenshots: string[];
  };
}
export default function CaseStudySection({
  caseStudy = {
    id: "01",
    title: ">YOUTUBE_APP_REDESIGN",
    summary: "Improving user onboarding and UI consistency",
    overview: "Redesigned the YouTube mobile app to enhance user experience through improved navigation, streamlined onboarding flow, and consistent visual design language. Focus on reducing cognitive load and increasing user engagement.",
    tools: ["FIGMA", "PROTOPIE", "PRINCIPLE", "SKETCH", "INVISION"],
    outcome: "Increased user retention by 23% and reduced onboarding drop-off by 35%. Improved overall user satisfaction scores from 3.2 to 4.1 stars.",
    screenshots: ["Screenshot 1", "Screenshot 2", "Screenshot 3", "Screenshot 4"]
  }
}: CaseStudySectionProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleViewCaseStudy = () => {
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  return <section className="bg-[#0A0502] py-16 md:py-24 px-6" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Case Study Preview Card */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.6
      }} className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Case Study Info */}
            <div className="order-2 lg:order-1 space-y-6">
              
              {/* Corner Tag */}
              <div className="flex items-start justify-between">
                <div className={cn("px-3 py-1 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-lg tracking-wider")} style={{
                boxShadow: "0 0 8px #FF6A00/30"
              }}>
                  {caseStudy.id}
                </div>
              </div>

              {/* Case Study Card */}
              <div className={cn("border-2 border-[#FF6A00] bg-[#FF6A00]/5 p-6 space-y-4", "transition-all duration-300 hover:bg-[#FF6A00]/10", "hover:border-[#FF914D] hover:drop-shadow-[0_0_16px_#FF6A00]")} style={{
              boxShadow: "0 0 12px #FF6A00/20"
            }}>
                {/* Title */}
                <h3 className={cn("text-xl md:text-2xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00]")}>
                  {caseStudy.title}
                </h3>

                {/* Summary */}
                <p className="text-[#FF6A00]/80 text-lg leading-relaxed">
                  {caseStudy.summary}
                </p>

                {/* View Case Study Button */}
                <button onClick={handleViewCaseStudy} className={cn("w-full mt-6 px-6 py-3 border border-[#FF6A00] bg-transparent", "text-[#FF6A00] text-lg font-normal tracking-wider", "transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "hover:drop-shadow-[0_0_12px_#FF6A00]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:border-[#FF914D]", "focus:text-[#FF914D] focus:drop-shadow-[0_0_12px_#FF6A00]", "active:bg-[#FF6A00]/20")} aria-label="View detailed case study">
                  <span className="flex items-center justify-center space-x-2">
                    <span>&gt; VIEW CASE STUDY</span>
                    <ChevronDown size={20} className={cn("transition-transform duration-300", isDrawerOpen ? "rotate-180" : "rotate-0")} />
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column - Phone Mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <motion.figure initial={{
              opacity: 0,
              rotate: -5,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              rotate: -5,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.2
            }} className="relative">
                {/* Slanted Phone Mockup */}
                <div className="w-48 h-80 md:w-56 md:h-96 relative transform -rotate-12" style={{
                filter: "drop-shadow(0 0 20px #FF6A00/30)"
              }}>
                  <svg className="w-full h-full" viewBox="0 0 200 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Phone Frame */}
                    <rect x="10" y="10" width="180" height="330" rx="20" stroke="#FF6A00" strokeWidth="3" fill="#0A0502" />
                    
                    {/* Screen */}
                    <rect x="20" y="40" width="160" height="270" fill="#FF6A00" fillOpacity="0.1" stroke="#FF6A00" strokeWidth="1" />
                    
                    {/* Screen Content Lines */}
                    <rect x="30" y="60" width="140" height="8" fill="#FF6A00" fillOpacity="0.6" />
                    <rect x="30" y="80" width="100" height="6" fill="#FF6A00" fillOpacity="0.4" />
                    <rect x="30" y="100" width="120" height="6" fill="#FF6A00" fillOpacity="0.4" />
                    
                    {/* Video Thumbnails */}
                    <rect x="30" y="120" width="60" height="40" fill="#FF6A00" fillOpacity="0.3" stroke="#FF6A00" strokeWidth="1" />
                    <rect x="110" y="120" width="60" height="40" fill="#FF6A00" fillOpacity="0.3" stroke="#FF6A00" strokeWidth="1" />
                    <rect x="30" y="180" width="60" height="40" fill="#FF6A00" fillOpacity="0.3" stroke="#FF6A00" strokeWidth="1" />
                    <rect x="110" y="180" width="60" height="40" fill="#FF6A00" fillOpacity="0.3" stroke="#FF6A00" strokeWidth="1" />
                    
                    {/* Bottom Navigation */}
                    <rect x="30" y="280" width="140" height="20" fill="#FF6A00" fillOpacity="0.2" stroke="#FF6A00" strokeWidth="1" />
                    
                    {/* Home Button */}
                    <circle cx="100" cy="325" r="8" stroke="#FF6A00" strokeWidth="2" fill="none" />
                  </svg>
                  
                  {/* Glow effect */}
                  <motion.div className="absolute inset-0" animate={{
                  opacity: [0.3, 0.6, 0.3]
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} style={{
                  background: "radial-gradient(circle, #FF6A00/10 0%, transparent 70%)"
                }} />
                </div>
                
                <figcaption className="sr-only">
                  Phone mockup showing YouTube app redesign
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </motion.div>

        {/* Expandable Case Study Drawer */}
        <AnimatePresence>
          {isDrawerOpen && <motion.aside initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: "auto",
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1] // Custom easing for snap effect
        }} className="mt-8 overflow-hidden">
              <div className={cn("border-2 border-[#FF6A00] bg-[#0A0502] p-6 space-y-8", "relative")} style={{
            boxShadow: "0 0 24px #FF6A00/30, inset 0 0 24px #FF6A00/10"
          }}>
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <motion.h4 initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.2
              }} className={cn("text-xl md:text-2xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00]")}>
                    [CASE FILE: YOUTUBE_APP]
                  </motion.h4>
                  
                  <button onClick={handleCloseDrawer} className={cn("px-4 py-2 border border-[#FF6A00] bg-transparent text-[#FF6A00]", "text-lg font-normal tracking-wider transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "hover:drop-shadow-[0_0_12px_#FF6A00]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:border-[#FF914D]", "focus:text-[#FF914D] focus:drop-shadow-[0_0_12px_#FF6A00]")} aria-label="Close case study details">
                    <span className="flex items-center space-x-2">
                      <X size={16} />
                      <span>CLOSE BRIEF</span>
                    </span>
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Overview Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.3
              }} className="space-y-4">
                    <h5 className="text-lg text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-2">
                      // OVERVIEW
                    </h5>
                    <p className="text-[#FF6A00]/80 leading-relaxed">
                      {caseStudy.overview}
                    </p>
                  </motion.div>

                  {/* Tools Used Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.4
              }} className="space-y-4">
                    <h5 className="text-lg text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-2">
                      // TOOLS USED
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tools.map((tool, index) => <span key={index} className={cn("px-3 py-1 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-sm tracking-wider")} style={{
                    boxShadow: "0 0 4px #FF6A00/30"
                  }}>
                          {tool}
                        </span>)}
                    </div>
                  </motion.div>

                  {/* Screenshots Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.5
              }} className="space-y-4">
                    <h5 className="text-lg text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-2">
                      // SCREENSHOTS
                    </h5>
                    <div className="grid grid-cols-2 gap-3">
                      {caseStudy.screenshots.map((screenshot, index) => <div key={index} className={cn("aspect-video border border-[#FF6A00] bg-[#FF6A00]/5", "flex items-center justify-center text-[#FF6A00]/60 text-sm")}>
                          {screenshot}
                        </div>)}
                    </div>
                  </motion.div>

                  {/* Outcome Section */}
                  <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.6
              }} className="space-y-4">
                    <h5 className="text-lg text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-2">
                      // OUTCOME
                    </h5>
                    <p className="text-[#FF6A00]/80 leading-relaxed">
                      {caseStudy.outcome}
                    </p>
                  </motion.div>
                </div>

                {/* Glitch effect overlay */}
                <motion.div className="absolute inset-0 pointer-events-none" initial={{
              opacity: 0
            }} animate={{
              opacity: [0, 0.1, 0]
            }} transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: Math.random() * 5 + 2
            }} style={{
              background: `repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 2px,
                      #FF6A00 2px,
                      #FF6A00 4px
                    )`
            }} />
              </div>
            </motion.aside>}
        </AnimatePresence>
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