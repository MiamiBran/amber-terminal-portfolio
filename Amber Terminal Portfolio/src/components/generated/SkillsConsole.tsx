"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
export interface SkillsConsoleProps {
  skills?: {
    name: string;
    percentage: number;
  }[];
}
export default function SkillsConsole({
  skills = [{
    name: "UX DESIGN",
    percentage: 92
  }, {
    name: "TROUBLESHOOTING",
    percentage: 88
  }, {
    name: "SYSTEM MAPPING",
    percentage: 85
  }]
}: SkillsConsoleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [animatedPercentages, setAnimatedPercentages] = useState(skills.map(() => 0));
  useEffect(() => {
    if (isInView) {
      skills.forEach((skill, index) => {
        const timer = setTimeout(() => {
          let current = 0;
          const increment = skill.percentage / 30; // Animate over ~1 second
          const interval = setInterval(() => {
            current += increment;
            if (current >= skill.percentage) {
              current = skill.percentage;
              clearInterval(interval);
            }
            setAnimatedPercentages(prev => {
              const newPercentages = [...prev];
              newPercentages[index] = Math.floor(current);
              return newPercentages;
            });
          }, 33); // ~30fps
        }, index * 200); // Stagger animations

        return () => clearTimeout(timer);
      });
    }
  }, [isInView, skills]);
  const generateBarCharacters = (percentage: number, totalChars: number = 40) => {
    const filledChars = Math.floor(percentage / 100 * totalChars);
    const emptyChars = totalChars - filledChars;
    return {
      filled: "▓".repeat(filledChars),
      empty: "░".repeat(emptyChars)
    };
  };
  return <section ref={ref} className="bg-[#0A0502] py-16 md:py-24 px-6" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Section Header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      }} transition={{
        duration: 0.6
      }} className="mb-12">
          <h2 className={cn("text-2xl md:text-3xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00] mb-8")}>
            [SKILL CONSOLE]
          </h2>
          
          {/* Console border */}
          <div className="w-full h-px bg-[#FF6A00]/30" style={{
          boxShadow: "0 0 4px #FF6A00/50"
        }} />
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-8 md:space-y-12">
          {skills.map((skill, index) => {
          const chars = generateBarCharacters(animatedPercentages[index]);
          return <motion.div key={skill.name} initial={{
            opacity: 0,
            x: -50
          }} animate={isInView ? {
            opacity: 1,
            x: 0
          } : {
            opacity: 0,
            x: -50
          }} transition={{
            duration: 0.8,
            delay: index * 0.2
          }} className="space-y-3">
                {/* Skill Name */}
                <div className="flex items-center justify-between">
                  <h3 className={cn("text-lg md:text-xl font-normal tracking-wider text-[#FF6A00]/90", "drop-shadow-[0_0_4px_#FF6A00]")}>
                    {skill.name}
                  </h3>
                  
                  {/* Percentage Display */}
                  <span className={cn("text-lg md:text-xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_4px_#FF6A00] min-w-[4rem] text-right")}>
                    {animatedPercentages[index]}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  {/* Background bar */}
                  <div className={cn("w-full p-3 border border-[#FF6A00]/30 bg-[#FF6A00]/5", "text-[#FF6A00]/40 text-sm md:text-base font-mono tracking-wider")}>
                    <span className="block overflow-hidden whitespace-nowrap">
                      {"░".repeat(40)}
                    </span>
                  </div>
                  
                  {/* Animated filled bar */}
                  <div className={cn("absolute inset-0 p-3 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-sm md:text-base font-mono tracking-wider", "overflow-hidden")} style={{
                boxShadow: "0 0 8px #FF6A00/30, inset 0 0 8px #FF6A00/20"
              }}>
                    <motion.span className="block whitespace-nowrap" animate={{
                  textShadow: ["0 0 4px #FF6A00", "0 0 8px #FF6A00", "0 0 4px #FF6A00"]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}>
                      {chars.filled}
                      <span className="text-[#FF6A00]/40">
                        {chars.empty}
                      </span>
                    </motion.span>
                  </div>

                  {/* Scanning line effect */}
                  {isInView && <motion.div className="absolute inset-y-0 w-1 bg-[#FF914D]" style={{
                boxShadow: "0 0 12px #FF914D, 0 0 24px #FF914D"
              }} initial={{
                left: "0%"
              }} animate={{
                left: `${animatedPercentages[index]}%`
              }} transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "easeOut"
              }} />}
                </div>

                {/* Signal indicator */}
                <div className="flex items-center space-x-2">
                  <span className="text-[#FF6A00]/60 text-xs tracking-wider">
                    // SIGNAL_STRENGTH:
                  </span>
                  <motion.div className="flex space-x-1" animate={{
                opacity: [0.6, 1, 0.6]
              }} transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}>
                    {[...Array(5)].map((_, i) => <div key={i} className={cn("w-1 bg-[#FF6A00]", i < Math.floor(animatedPercentages[index] / 20) ? "opacity-100" : "opacity-30")} style={{
                  height: `${(i + 1) * 3}px`,
                  boxShadow: i < Math.floor(animatedPercentages[index] / 20) ? "0 0 4px #FF6A00" : "none"
                }} />)}
                  </motion.div>
                </div>
              </motion.div>;
        })}
        </div>

        {/* Console Footer */}
        <motion.div initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {
        opacity: 0
      }} transition={{
        duration: 0.6,
        delay: 1
      }} className="mt-12 pt-8 border-t border-[#FF6A00]/20">
          <p className="text-[#FF6A00]/60 text-sm tracking-wider">
            // DIAGNOSTIC_COMPLETE: ALL_SYSTEMS_OPERATIONAL
          </p>
        </motion.div>
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