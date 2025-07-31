"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import HeaderNav from "./HeaderNav";
import HeroPanel from "./HeroPanel";
import CaseStudySection from "./CaseStudySection";
import AboutBio from "./c03b_about-bio";
import PortfolioExtraSections from "./PortfolioExtraSections";
export interface PortfolioTerminalPageProps {
  className?: string;
}
export default function PortfolioTerminalPage({
  className
}: PortfolioTerminalPageProps) {
  const [activeSection, setActiveSection] = useState("work");
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const handleRetrieveFile = () => {
    // Simulate file download
    console.log("Retrieving file...");
    // In a real app, this would trigger a resume download
  };
  const handleLetsTalk = () => {
    // Scroll to contact section
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <main className={cn("min-h-screen bg-[#0A0502] text-[#FF6A00] overflow-x-hidden", className)} style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      {/* Fixed Header Navigation */}
      <HeaderNav activeSection={activeSection} onNavigate={handleNavigation} onRetrieveFile={handleRetrieveFile} />

      {/* Hero Section */}
      <section id="work" className="relative">
        <HeroPanel onLetsTalk={handleLetsTalk} />
        
        {/* Section Divider */}
        <div className="w-full h-px bg-[#FF6A00]/30" style={{
        boxShadow: "0 0 4px #FF6A00/50"
      }} />
      </section>

      {/* About Bio Section (now includes Skills Console) */}
      <section id="about" className="relative">
        <AboutBio />
        
        {/* Section Divider */}
        <div className="w-full h-px bg-[#FF6A00]/30" style={{
        boxShadow: "0 0 4px #FF6A00/50"
      }} />
      </section>

      {/* Case Study Section */}
      <section id="case-study" className="relative">
        <CaseStudySection />
        
        {/* Section Divider */}
        <div className="w-full h-px bg-[#FF6A00]/30" style={{
        boxShadow: "0 0 4px #FF6A00/50"
      }} />
      </section>

      {/* Extra Portfolio Sections: All Projects, My Process, Client Database */}
      <section id="extra-sections" className="relative">
        {/**
         * This component includes:
         * - All Projects grid (2x2, 4 cards, orange borders, hover)
         * - My Process (6 steps, diamond icon, horizontal scroll on mobile)
         * - Client Database carousel (avatar, name, position, testimonial, arrows, orange borders, glow)
         * - All sections use strong orange headers, thick orange dividers, CRT/scanline effect, and match the dark theme and font/spacing of the rest of the site.
         */}
        <PortfolioExtraSections />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative bg-[#0A0502] py-16 md:py-24 px-6">
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Contact Console Header */}
          <div className="mb-12">
            <h2 className={cn("text-2xl md:text-3xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00] mb-8")}>
              [CONTACT CONSOLE]
            </h2>
            
            {/* Console border */}
            <div className="w-full h-px bg-[#FF6A00]/30" style={{
            boxShadow: "0 0 4px #FF6A00/50"
          }} />
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-xl text-[#FF6A00] tracking-wider mb-6">
                // SECURE_CHANNELS
              </h3>
              
              <div className="space-y-4">
                <div className={cn("flex items-center space-x-4 p-4 border border-[#FF6A00]/30", "bg-[#FF6A00]/5 hover:bg-[#FF6A00]/10 transition-all duration-300")}>
                  <span className="text-[#FF6A00]/60 text-sm">EMAIL:</span>
                  <span className="text-[#FF6A00] tracking-wider">
                    brandon@portfolio.dev
                  </span>
                </div>
                
                <div className={cn("flex items-center space-x-4 p-4 border border-[#FF6A00]/30", "bg-[#FF6A00]/5 hover:bg-[#FF6A00]/10 transition-all duration-300")}>
                  <span className="text-[#FF6A00]/60 text-sm">PHONE:</span>
                  <span className="text-[#FF6A00] tracking-wider">
                    +1 (555) 123-4567
                  </span>
                </div>
                
                <div className={cn("flex items-center space-x-4 p-4 border border-[#FF6A00]/30", "bg-[#FF6A00]/5 hover:bg-[#FF6A00]/10 transition-all duration-300")}>
                  <span className="text-[#FF6A00]/60 text-sm">LINKEDIN:</span>
                  <span className="text-[#FF6A00] tracking-wider">
                    /in/brandon-bartlett
                  </span>
                </div>
                
                <div className={cn("flex items-center space-x-4 p-4 border border-[#FF6A00]/30", "bg-[#FF6A00]/5 hover:bg-[#FF6A00]/10 transition-all duration-300")}>
                  <span className="text-[#FF6A00]/60 text-sm">BEHANCE:</span>
                  <span className="text-[#FF6A00] tracking-wider">
                    /brandon-bartlett
                  </span>
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <div className="space-y-6">
              <h3 className="text-xl text-[#FF6A00] tracking-wider mb-6">
                // FILE_SYSTEM
              </h3>
              
              <div className={cn("p-6 border-2 border-[#FF6A00] bg-[#FF6A00]/5", "space-y-4")} style={{
              boxShadow: "0 0 12px #FF6A00/20"
            }}>
                <p className="text-[#FF6A00]/80 text-lg">
                  Download complete portfolio documentation
                </p>
                
                <button onClick={handleRetrieveFile} className={cn("w-full px-6 py-4 border-2 border-[#FF6A00] bg-transparent", "text-[#FF6A00] text-xl font-normal tracking-wider", "transition-all duration-300", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "hover:drop-shadow-[0_0_16px_#FF6A00]", "focus:outline-none focus:bg-[#FF6A00]/10 focus:border-[#FF914D]", "focus:text-[#FF914D] focus:drop-shadow-[0_0_16px_#FF6A00]", "active:bg-[#FF6A00]/20 group")} aria-label="Download resume file">
                  <span className="group-hover:hidden">DOWNLOAD.RESUME</span>
                  <span className="hidden group-hover:block">DEPLOY FILE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-[#FF6A00]/20">
            <p className="text-[#FF6A00]/60 text-sm tracking-wider text-center">
              // PORTFOLIO_SYSTEM_v2.0 - ALL_RIGHTS_RESERVED
            </p>
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
      </section>

      {/* Global CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-3 z-50" style={{
      background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            #FF6A00 2px,
            #FF6A00 4px
          )`
    }} />
    </main>;
}