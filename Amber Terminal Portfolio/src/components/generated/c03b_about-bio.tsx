"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { Terminal } from "lucide-react";

// --- Radar Graph Component ---
export interface CapabilityRadarProps {
  domain: string;
  percentage: number;
  subskills: {
    label: string;
    value: number;
  }[];
  highlight: string;
  className?: string;
}
function CapabilityRadar({
  domain,
  percentage,
  subskills,
  highlight,
  className
}: CapabilityRadarProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chartRef, {
    once: true,
    margin: "-50px"
  });
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate the main percentage
  useEffect(() => {
    if (isInView) {
      let current = 0;
      const increment = percentage / 60;
      const interval = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          current = percentage;
          clearInterval(interval);
        }
        setAnimatedValue(Math.floor(current));
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isInView, percentage]);

  // Radar chart geometry
  const points = 5;
  const size = 160;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 24;
  const getPolygonPoints = (scales: number[]) => {
    const angleStep = 2 * Math.PI / points;
    const startAngle = -Math.PI / 2;
    return Array.from({
      length: points
    }, (_, i) => {
      const angle = startAngle + i * angleStep;
      const scale = scales[i];
      const x = centerX + radius * scale * Math.cos(angle);
      const y = centerY + radius * scale * Math.sin(angle);
      return {
        x,
        y
      };
    });
  };
  // Animate subskill values
  const [animatedSubskills, setAnimatedSubskills] = useState(subskills.map(() => 0));
  useEffect(() => {
    if (isInView) {
      subskills.forEach((sub, i) => {
        let current = 0;
        const increment = sub.value / 40;
        const interval = setInterval(() => {
          current += increment;
          if (current >= sub.value) {
            current = sub.value;
            clearInterval(interval);
          }
          setAnimatedSubskills(prev => {
            const arr = [...prev];
            arr[i] = Math.floor(current);
            return arr;
          });
        }, 18 + i * 4);
      });
    }
  }, [isInView, subskills]);
  // Scales for radar polygon (0-1)
  const scales = animatedSubskills.map(v => v / 100);
  const dataPoints = getPolygonPoints(scales);
  const dataPath = dataPoints.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ") + " Z";
  // Grid levels
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  // Axis lines
  const axisLines = getPolygonPoints([1, 1, 1, 1, 1]).map(pt => ({
    x1: centerX,
    y1: centerY,
    x2: pt.x,
    y2: pt.y
  }));
  return <div ref={chartRef} className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-[0_0_8px_#FF6A00]" aria-label={`${domain} capability radar`}>
          {/* Glow background */}
          <defs>
            <radialGradient id={`glow-${domain}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.12" />
              <stop offset="70%" stopColor="#FF6A00" stopOpacity="0.04" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id={`blur-${domain}`}> <feGaussianBlur stdDeviation="2" /> </filter>
            <linearGradient id={`data-gradient-${domain}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF914D" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle cx={centerX} cy={centerY} r={radius} fill={`url(#glow-${domain})`} className="opacity-70" />
          {/* Grid lines */}
          {gridLevels.map((level, idx) => {
          const pts = getPolygonPoints([level, level, level, level, level]);
          const path = pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ") + " Z";
          return <path key={idx} d={path} fill="none" stroke="#FF6A00" strokeWidth="1" strokeOpacity={0.13 + idx * 0.09} className="transition-all duration-300" />;
        })}
          {/* Axis lines */}
          {axisLines.map((line, idx) => <line key={idx} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#FF6A00" strokeWidth="1" strokeOpacity="0.22" />)}
          {/* Data area */}
          <motion.path d={dataPath} fill={`url(#data-gradient-${domain})`} stroke="none" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={isInView ? {
          pathLength: 1,
          opacity: 1
        } : {
          pathLength: 0,
          opacity: 0
        }} transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }} />
          {/* Data outline (glow) */}
          <motion.path d={dataPath} fill="none" stroke="#FF6A00" strokeWidth="2" strokeOpacity="0.8" filter={`url(#blur-${domain})`} initial={{
          pathLength: 0
        }} animate={isInView ? {
          pathLength: 1
        } : {
          pathLength: 0
        }} transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }} style={{
          filter: "drop-shadow(0 0 4px #FF6A00)"
        }} />
          {/* Sharp outline */}
          <motion.path d={dataPath} fill="none" stroke="#FF6A00" strokeWidth="2" strokeOpacity="1" initial={{
          pathLength: 0
        }} animate={isInView ? {
          pathLength: 1
        } : {
          pathLength: 0
        }} transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeOut"
        }} />
          {/* Data points */}
          {dataPoints.map((pt, idx) => <motion.circle key={idx} cx={pt.x} cy={pt.y} r="3.5" fill="#FF6A00" stroke="#FF914D" strokeWidth="1" initial={{
          scale: 0,
          opacity: 0
        }} animate={isInView ? {
          scale: 1,
          opacity: 1
        } : {
          scale: 0,
          opacity: 0
        }} transition={{
          duration: 0.3,
          delay: 0.8 + idx * 0.1
        }} style={{
          filter: "drop-shadow(0 0 4px #FF6A00)"
        }} />)}
          {/* Center point */}
          <circle cx={centerX} cy={centerY} r="2" fill="#FF6A00" opacity="0.7" />
        </svg>
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #FF6A00 2px, #FF6A00 4px)"
      }} />
      </div>
      {/* Domain name and percentage */}
      <div className="text-center mt-2">
        <h4 className="text-xs font-semibold tracking-widest text-[#FF6A00] uppercase drop-shadow-[0_0_8px_#FF6A00]" style={{
        fontFamily: "'VT323', 'Space Mono', monospace"
      }}>{domain}</h4>
        <motion.div className="text-lg font-bold tracking-wider text-[#FF6A00]" style={{
        textShadow: "0 0 8px #FF6A00"
      }}>
          <motion.span key={animatedValue} initial={{
          scale: 1.2,
          opacity: 0.8
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 0.2
        }}>
            {animatedValue}%
          </motion.span>
        </motion.div>
      </div>
      {/* Subskill labels */}
      <div className="grid grid-cols-1 gap-1 mt-2 w-36 mx-auto">
        {subskills.map((s, i) => <div key={i} className="flex items-center justify-between text-[0.7rem] text-[#FF914D] font-mono">
            <span className="truncate" title={s.label}>{s.label}</span>
            <span className="ml-2 text-[#FF6A00] font-bold">{animatedSubskills[i]}%</span>
          </div>)}
      </div>
    </div>;
}

// --- Typewriter Terminal Output ---
interface TerminalLine {
  text: string;
  delay: number;
}
function useTypewriter(lines: TerminalLine[], start: boolean) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  useEffect(() => {
    if (!start) return;
    let mounted = true;
    let idx = 0;
    let charIdx = 0;
    let current = "";
    let timeout: NodeJS.Timeout;
    function typeNext() {
      if (!mounted) return;
      if (idx >= lines.length) return;
      const line = lines[idx].text;
      if (charIdx < line.length) {
        current += line[charIdx];
        setDisplayed(prev => {
          const arr = [...prev];
          arr[idx] = current;
          return arr;
        });
        charIdx++;
        timeout = setTimeout(typeNext, 10 + Math.random() * 30);
      } else {
        idx++;
        charIdx = 0;
        current = "";
        setTimeout(() => {
          setDisplayed(prev => {
            const arr = [...prev];
            arr[idx] = "";
            return arr;
          });
          typeNext();
        }, lines[idx - 1]?.delay || 600);
      }
    }
    setDisplayed(Array(lines.length).fill(""));
    setTimeout(typeNext, 400);
    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [lines, start]);
  return displayed;
}

// --- Main AboutBio Component ---
export interface AboutBioProps {
  bio?: string;
  stats?: {
    yearsExperience: number;
    disciplines: string[];
    certifications: string[];
    coreValues: string[];
  };
  avatar?: {
    initials: string;
    showAvatar?: boolean;
  };
}
const CAPABILITY_MATRIX = [{
  domain: "UX DESIGN",
  percentage: 88,
  subskills: [{
    label: "Wireframing & Layout Logic",
    value: 90
  }, {
    label: "User Journey Mapping",
    value: 85
  }, {
    label: "Accessibility Awareness",
    value: 82
  }, {
    label: "Feedback-Driven Iteration",
    value: 89
  }, {
    label: "Interface Intuition",
    value: 94
  }],
  highlight: "Interface Intuition [94]"
}, {
  domain: "TROUBLESHOOTING",
  percentage: 93,
  subskills: [{
    label: "Root Cause Analysis",
    value: 95
  }, {
    label: "Live-Site Recovery",
    value: 90
  }, {
    label: "Tool/Platform Debugging",
    value: 92
  }, {
    label: "Cross-Team Communication",
    value: 88
  }, {
    label: "Decision Speed",
    value: 98
  }],
  highlight: "Decision Speed [98]"
}, {
  domain: "SYSTEM MAPPING",
  percentage: 90,
  subskills: [{
    label: "Data Flow Mapping",
    value: 89
  }, {
    label: "Component Diagramming",
    value: 87
  }, {
    label: "Operational Dependencies",
    value: 92
  }, {
    label: "Input/Output Clarity",
    value: 85
  }, {
    label: "Tool Stack Integration",
    value: 95
  }],
  highlight: "Tool Stack Integration [95]"
}, {
  domain: "PROJECT OPS",
  percentage: 86,
  subskills: [{
    label: "Sprint Planning",
    value: 84
  }, {
    label: "Budgeting & Resource Allocation",
    value: 86
  }, {
    label: "Team Oversight",
    value: 90
  }, {
    label: "Stakeholder Comms",
    value: 82
  }, {
    label: "Risk Mitigation",
    value: 88
  }],
  highlight: "Team Oversight [90]"
}, {
  domain: "HUMAN LOGIC",
  percentage: 82,
  subskills: [{
    label: "Empathic Decisions",
    value: 79
  }, {
    label: "Values-Based Communication",
    value: 84
  }, {
    label: "Team Empowerment",
    value: 80
  }, {
    label: "Systems Thinking",
    value: 88
  }, {
    label: "Conflict Navigation",
    value: 79
  }],
  highlight: "Systems Thinking [88]"
}];
const TERMINAL_LINES: TerminalLine[] = [{
  text: ">> MODULE_LOAD: UX_DESIGN | STATUS: 88% FUNCTIONAL | HIGHLIGHT: Interface Intuition [94]",
  delay: 900
}, {
  text: ">> MODULE_LOAD: TROUBLESHOOTING | STATUS: 93% FUNCTIONAL | HIGHLIGHT: Decision Speed [98]",
  delay: 900
}, {
  text: ">> MODULE_LOAD: SYSTEM_MAPPING | STATUS: 90% FUNCTIONAL | HIGHLIGHT: Tool Stack Integration [95]",
  delay: 900
}, {
  text: ">> MODULE_LOAD: PROJECT_OPS | STATUS: 86% FUNCTIONAL | HIGHLIGHT: Team Oversight [90]",
  delay: 900
}, {
  text: ">> MODULE_LOAD: HUMAN_LOGIC | STATUS: 82% FUNCTIONAL | HIGHLIGHT: Systems Thinking [88]",
  delay: 900
}];
export default function AboutBio({
  bio = "Construction superintendent turned UX-minded systems architect. I bridge the gap between complex technical requirements and intuitive user experiences. My legacy-driven approach ensures every solution is built to last, combining operational excellence with human-centered design principles. I believe in creating systems that work seamlessly for both users and maintainers.",
  stats = {
    yearsExperience: 12,
    disciplines: ["UX Design", "Systems Architecture", "Project Management", "Quality Assurance"],
    certifications: ["PMP", "OSHA 30", "Lean Six Sigma", "UX Certification"],
    coreValues: ["Integrity", "Excellence", "Innovation", "Collaboration"]
  },
  avatar = {
    initials: "BB",
    showAvatar: true
  }
}: AboutBioProps) {
  // For typewriter effect
  const [startTypewriter, setStartTypewriter] = useState(false);
  const matrixRef = useRef<HTMLDivElement>(null);
  const isMatrixInView = useInView(matrixRef, {
    once: true,
    margin: "-100px"
  });
  useEffect(() => {
    if (isMatrixInView) setStartTypewriter(true);
  }, [isMatrixInView]);
  const terminalLines = useTypewriter(TERMINAL_LINES, startTypewriter);
  return <section id="about" className="relative min-h-screen bg-[#0A0502] py-16 md:py-24 px-6" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.header initial={{
        opacity: 0,
        y: -30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true,
        margin: "-100px"
      }} transition={{
        duration: 0.8
      }} className="mb-16">
          <h2 className={cn("text-3xl md:text-4xl font-normal tracking-wider text-[#FF6A00] mb-4 flex items-center gap-3", "drop-shadow-[0_0_16px_#FF6A00]")} style={{
          fontFamily: "'VT323', 'Space Mono', monospace",
          letterSpacing: "0.08em",
          textShadow: "0 0 24px #FF6A00, 0 0 40px #FF6A00"
        }}>
            <Terminal className="w-7 h-7 text-[#FF6A00] animate-pulse" aria-hidden="true" />
            [CAPABILITY_MATRIX]
          </h2>
          <p className="text-[#FF914D] text-base md:text-lg mb-6 max-w-2xl" style={{
          textShadow: "0 0 8px #FF6A00"
        }}>
            Operational fingerprint of core Capabilities: Design, Systems, Ops, and Legacy Logic.
          </p>
          <div className="w-full h-px bg-[#FF6A00]/30" style={{
          boxShadow: "0 0 4px #FF6A00/50"
        }} />
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Bio and Capability Matrix */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="space-y-12">
            {/* Bio Section */}
            <article className="space-y-6">
              <header>
                <h3 className="text-xl md:text-2xl text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-4 mb-6">
                  // PROFILE_DATA
                </h3>
              </header>
              <div className={cn("p-8 bg-[#FF6A00]/10 border border-[#FF6A00]/30 backdrop-blur-xl relative overflow-hidden")} style={{
              boxShadow: "0 0 20px rgba(255, 106, 0, 0.15), inset 0 0 20px rgba(255, 106, 0, 0.05)"
            }}>
                <div className="absolute inset-0 border border-[#FF6A00]/20 pointer-events-none" style={{
                boxShadow: "inset 0 0 30px rgba(255, 106, 0, 0.1)"
              }} />
                <p className="text-[#FF6A00] text-lg leading-relaxed relative z-10 font-medium">{bio}</p>
              </div>
            </article>

            {/* CAPABILITY_MATRIX Section */}
            <section ref={matrixRef} className="space-y-8 mt-8">
              <div className="overflow-x-auto pb-2">
                <div className="flex flex-row gap-6 min-w-[700px] md:min-w-0 md:gap-8 justify-between">
                  {CAPABILITY_MATRIX.map((cap, i) => <CapabilityRadar key={cap.domain} domain={cap.domain} percentage={cap.percentage} subskills={cap.subskills} highlight={cap.highlight} className="flex-shrink-0 min-w-[180px] max-w-[220px]" />)}
                </div>
              </div>
              {/* Terminal Output Readout */}
              <section className="mt-8 bg-[#0A0502]/80 border border-[#FF6A00]/30 rounded-2xl px-6 py-8 shadow-[0_0_32px_#FF6A00/18] relative overflow-hidden flex flex-col gap-4 md:gap-6" style={{
              fontFamily: "'VT323', 'Space Mono', monospace",
              backdropFilter: 'blur(6px)',
              borderRadius: '1.25rem',
              boxShadow: '0 8px 32px 0 rgba(255,106,0,0.10), 0 0 0 1px #FF6A0022'
            }}>
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #FF6A00 2px, #FF6A00 4px)"
              }} />
                <header className="flex items-center gap-3 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00] opacity-80 shadow-[0_0_8px_#FF6A00]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF914D] opacity-60" />
                  <span className="w-2 h-2 rounded-full bg-[#FF6A00]/40" />
                  <span className="ml-4 text-[#FF914D] text-xs tracking-widest font-mono opacity-80">TERMINAL</span>
                </header>
                <div className="flex-1 min-h-[90px] md:min-h-[120px] flex flex-col justify-center">
                  <pre className="text-[#FF6A00] text-base md:text-lg font-mono leading-relaxed tracking-wider whitespace-pre-wrap select-none bg-transparent border-none p-0 m-0" aria-live="polite">
                    {terminalLines.map((line, i) => <span key={i} className="block mb-1 pl-2 md:pl-4">
                        {line}
                        {i === terminalLines.length - 1 && line && <span className="animate-pulse">_</span>}
                      </span>)}
                  </pre>
                </div>
                <footer className="pt-2 border-t border-[#FF6A00]/20 text-[#FF914D] text-xs md:text-sm tracking-widest font-mono flex items-center gap-2 mt-2">
                  <span className="opacity-80">// CAPABILITY_MATRIX:</span>
                  <span className="opacity-90">SYSTEM SIGNAL STRONG</span>
                  <span className="opacity-60">|</span>
                  <span className="opacity-90">MODULES BALANCED</span>
                  <span className="opacity-60">|</span>
                  <span className="opacity-90">STRATEGIC READINESS HIGH</span>
                </footer>
              </section>
            </section>
          </motion.div>

          {/* Right Column - Stats Block (unchanged) */}
          <motion.aside initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="space-y-8">
            {avatar.showAvatar && <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }} className="flex justify-center lg:justify-start mb-12">
                <div className={cn("w-20 h-20 border border-[#FF6A00]/40 bg-[#FF6A00]/10 backdrop-blur-xl flex items-center justify-center text-[#FF6A00] text-2xl font-medium tracking-wider transition-all duration-300 hover:bg-[#FF6A00]/15 relative overflow-hidden")} style={{
              clipPath: "polygon(15% 0%, 85% 0%, 100% 25%, 100% 75%, 85% 100%, 15% 100%, 0% 75%, 0% 25%)",
              boxShadow: "0 0 20px rgba(255, 106, 0, 0.2), inset 0 0 20px rgba(255, 106, 0, 0.05)"
            }}>
                  <div className="absolute inset-0 border border-[#FF6A00]/20 pointer-events-none" style={{
                clipPath: "polygon(15% 0%, 85% 0%, 100% 25%, 100% 75%, 85% 100%, 15% 100%, 0% 75%, 0% 25%)",
                boxShadow: "inset 0 0 15px rgba(255, 106, 0, 0.1)"
              }} />
                  <span className="relative z-10">{avatar.initials}</span>
                </div>
              </motion.div>}
            <header>
              <h3 className="text-xl md:text-2xl text-[#FF6A00] tracking-wider border-b border-[#FF6A00]/30 pb-4 mb-8">
                // SYSTEM_STATS
              </h3>
            </header>
            <div className="space-y-6">
              {/* Years Experience */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.8
            }} className={cn("flex items-center justify-between p-6 bg-[#FF6A00]/10 border border-[#FF6A00]/30 backdrop-blur-xl hover:bg-[#FF6A00]/15 transition-all duration-300 relative overflow-hidden")} style={{
              boxShadow: "0 0 16px rgba(255, 106, 0, 0.12), inset 0 0 16px rgba(255, 106, 0, 0.05)"
            }}>
                <div className="absolute inset-0 border border-[#FF6A00]/15 pointer-events-none" style={{
                boxShadow: "inset 0 0 20px rgba(255, 106, 0, 0.08)"
              }} />
                <span className="text-[#FF6A00]/80 text-sm tracking-wider font-medium relative z-10">YEARS_EXP:</span>
                <span className="text-[#FF6A00] text-xl font-medium tracking-wider relative z-10">{stats.yearsExperience}+</span>
              </motion.div>
              {/* Disciplines */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 1.0
            }} className={cn("p-6 bg-[#FF6A00]/10 border border-[#FF6A00]/30 backdrop-blur-xl hover:bg-[#FF6A00]/15 transition-all duration-300 relative overflow-hidden")} style={{
              boxShadow: "0 0 16px rgba(255, 106, 0, 0.12), inset 0 0 16px rgba(255, 106, 0, 0.05)"
            }}>
                <div className="absolute inset-0 border border-[#FF6A00]/15 pointer-events-none" style={{
                boxShadow: "inset 0 0 20px rgba(255, 106, 0, 0.08)"
              }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#FF6A00]/80 text-sm tracking-wider font-medium">DISCIPLINES:</span>
                    <span className="text-[#FF6A00] text-xl font-medium tracking-wider">{stats.disciplines.length}</span>
                  </div>
                  <div className="space-y-2">
                    {stats.disciplines.map((discipline, index) => <div key={index} className="flex items-center space-x-3">
                        <span className="text-[#FF6A00]/70 text-xs">▶</span>
                        <span className="text-[#FF6A00]/90 text-sm tracking-wide font-medium">{discipline}</span>
                      </div>)}
                  </div>
                </div>
              </motion.div>
              {/* Certifications */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 1.2
            }} className={cn("p-6 bg-[#FF6A00]/10 border border-[#FF6A00]/30 backdrop-blur-xl hover:bg-[#FF6A00]/15 transition-all duration-300 relative overflow-hidden")} style={{
              boxShadow: "0 0 16px rgba(255, 106, 0, 0.12), inset 0 0 16px rgba(255, 106, 0, 0.05)"
            }}>
                <div className="absolute inset-0 border border-[#FF6A00]/15 pointer-events-none" style={{
                boxShadow: "inset 0 0 20px rgba(255, 106, 0, 0.08)"
              }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#FF6A00]/80 text-sm tracking-wider font-medium">KEY_CERTS:</span>
                    <span className="text-[#FF6A00] text-xl font-medium tracking-wider">{stats.certifications.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {stats.certifications.map((cert, index) => <span key={index} className={cn("px-3 py-2 border border-[#FF6A00]/40 bg-[#FF6A00]/15 backdrop-blur-sm text-[#FF6A00] text-xs tracking-wider font-medium")} style={{
                    boxShadow: "0 0 8px rgba(255, 106, 0, 0.2)"
                  }}>
                        {cert}
                      </span>)}
                  </div>
                </div>
              </motion.div>
              {/* Core Values */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 1.4
            }} className={cn("p-6 bg-[#FF6A00]/10 border border-[#FF6A00]/30 backdrop-blur-xl hover:bg-[#FF6A00]/15 transition-all duration-300 relative overflow-hidden")} style={{
              boxShadow: "0 0 16px rgba(255, 106, 0, 0.12), inset 0 0 16px rgba(255, 106, 0, 0.05)"
            }}>
                <div className="absolute inset-0 border border-[#FF6A00]/15 pointer-events-none" style={{
                boxShadow: "inset 0 0 20px rgba(255, 106, 0, 0.08)"
              }} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#FF6A00]/80 text-sm tracking-wider font-medium">CORE_VALUES:</span>
                    <span className="text-[#FF6A00] text-xl font-medium tracking-wider">{stats.coreValues.length}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.coreValues.map((value, index) => <div key={index} className="flex items-center space-x-3">
                        <motion.span className="text-[#FF6A00]/70 text-xs" animate={{
                      opacity: [0.6, 1, 0.6]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}>
                          ●
                        </motion.span>
                        <span className="text-[#FF6A00]/90 text-sm tracking-wide font-medium">{value}</span>
                      </div>)}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </div>
        {/* CRT Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
        background: `repeating-linear-gradient(0deg,transparent,transparent 2px,#FF6A00 2px,#FF6A00 4px)`
      }} />
      </div>
    </section>;
}