"use client";

/*
  ONLOOK DESIGN BRIEF
  Project: Onlook Portfolio
  Author: Onlook Studio
  Version: 1.0.0
  Date: 2024-06-01
  Description: High-end, elegant, premium, and mobile-optimized portfolio with neon cyber aesthetic
  Component Catalog: c01b_hero, c03b_about-bio, c05b_work-grid, c07b_case-drawer, c09b_testimonials
*/
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye, Code, Palette, Zap } from "lucide-react";
export interface PortfolioNeonHomeProps {
  className?: string;
}
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  icon: React.ReactNode;
  liveUrl?: string;
  githubUrl?: string;
}
interface WorkGridItem {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  technologies: string[];
}
interface CaseDrawerItem {
  id: string;
  title: string;
  details: string;
  challenge: string;
  solution: string;
  results: string[];
}
interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

// Sample data arrays for component catalog
const workGrid: WorkGridItem[] = [{
  id: "w1",
  title: "Neural Dashboard",
  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
  description: "AI-powered analytics platform with real-time data visualization.",
  category: "Web Application",
  technologies: ["React", "TypeScript", "D3.js", "Python"]
}, {
  id: "w2",
  title: "Quantum Design System",
  image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400",
  description: "Comprehensive component library with advanced theming.",
  category: "Design System",
  technologies: ["React", "Storybook", "Tailwind", "Figma"]
}, {
  id: "w3",
  title: "Cyber Commerce",
  image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
  description: "E-commerce platform with AR and blockchain payments.",
  category: "E-commerce",
  technologies: ["Next.js", "Three.js", "Solidity", "WebXR"]
}];
const caseDrawer: CaseDrawerItem[] = [{
  id: "c1",
  title: "Neural Dashboard",
  details: "Complete case study for AI-powered analytics platform.",
  challenge: "Complex data visualization requirements",
  solution: "Custom D3.js components with real-time updates",
  results: ["40% increase in user engagement", "60% faster data processing"]
}, {
  id: "c2",
  title: "Quantum Design System",
  details: "Building a scalable component library from scratch.",
  challenge: "Consistency across multiple products",
  solution: "Token-based design system with automated testing",
  results: ["50% faster development", "95% design consistency"]
}];
const testimonials: TestimonialItem[] = [{
  id: "t1",
  author: "Jane Doe",
  role: "Product Manager",
  company: "TechCorp",
  quote: "A visionary digital architect who transformed our product experience.",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
}, {
  id: "t2",
  author: "John Smith",
  role: "CTO",
  company: "InnovateLab",
  quote: "Exceptional technical skills combined with outstanding design sense.",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
}];
const projects: Project[] = [{
  id: "1",
  title: "Neural Dashboard",
  description: "AI-powered analytics platform with real-time data visualization and machine learning insights.",
  technologies: ["React", "TypeScript", "D3.js", "Python"],
  category: "Web Application",
  icon: <Zap className="h-5 w-5" />,
  liveUrl: "https://example.com",
  githubUrl: "https://github.com"
}, {
  id: "2",
  title: "Quantum Design System",
  description: "Comprehensive component library with advanced theming and accessibility features.",
  technologies: ["React", "Storybook", "Tailwind", "Figma"],
  category: "Design System",
  icon: <Palette className="h-5 w-5" />,
  liveUrl: "https://example.com",
  githubUrl: "https://github.com"
}, {
  id: "3",
  title: "Cyber Commerce",
  description: "Next-generation e-commerce platform with AR product visualization and blockchain payments.",
  technologies: ["Next.js", "Three.js", "Solidity", "WebXR"],
  category: "E-commerce",
  icon: <Code className="h-5 w-5" />,
  liveUrl: "https://example.com",
  githubUrl: "https://github.com"
}];

// 3D Tunnel Background Component with nested rectangles
function NeonTunnel({
  mouseX,
  mouseY
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const tunnelRef = useRef<SVGSVGElement>(null);

  // Create different parallax rates for each rectangle layer
  const layer1X = useTransform(mouseX, [0, 1], [-5, 5]);
  const layer1Y = useTransform(mouseY, [0, 1], [-3, 3]);
  const layer2X = useTransform(mouseX, [0, 1], [-10, 10]);
  const layer2Y = useTransform(mouseY, [0, 1], [-6, 6]);
  const layer3X = useTransform(mouseX, [0, 1], [-15, 15]);
  const layer3Y = useTransform(mouseY, [0, 1], [-9, 9]);
  const layer4X = useTransform(mouseX, [0, 1], [-20, 20]);
  const layer4Y = useTransform(mouseY, [0, 1], [-12, 12]);
  return <motion.div className="absolute inset-0 overflow-hidden" style={{
    perspective: "1000px",
    transformStyle: "preserve-3d"
  }} data-atomic="c00b_bg-tunnel">
      <motion.svg ref={tunnelRef} className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neonAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--surface-amber)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="var(--surface-amber)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--surface-amber)" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Layer 4 - Outermost rectangle */}
        <motion.g style={{
        translateX: layer4X,
        translateY: layer4Y
      }}>
          <motion.rect x="50" y="50" width="1100" height="700" stroke="url(#neonAmber)" strokeWidth="2" fill="none" filter="url(#glow)" opacity="0.3" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.3
        }} transition={{
          duration: 2,
          delay: 0
        }} />
        </motion.g>

        {/* Layer 3 - Second rectangle */}
        <motion.g style={{
        translateX: layer3X,
        translateY: layer3Y
      }}>
          <motion.rect x="150" y="125" width="900" height="550" stroke="url(#neonAmber)" strokeWidth="2.5" fill="none" filter="url(#glow)" opacity="0.5" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.5
        }} transition={{
          duration: 2,
          delay: 0.3
        }} />
        </motion.g>

        {/* Layer 2 - Third rectangle */}
        <motion.g style={{
        translateX: layer2X,
        translateY: layer2Y
      }}>
          <motion.rect x="300" y="200" width="600" height="400" stroke="url(#neonAmber)" strokeWidth="3" fill="none" filter="url(#strongGlow)" opacity="0.7" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.7
        }} transition={{
          duration: 2,
          delay: 0.6
        }} />
        </motion.g>

        {/* Layer 1 - Innermost rectangle */}
        <motion.g style={{
        translateX: layer1X,
        translateY: layer1Y
      }}>
          <motion.rect x="450" y="275" width="300" height="250" stroke="url(#neonAmber)" strokeWidth="3.5" fill="none" filter="url(#strongGlow)" opacity="0.9" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.9
        }} transition={{
          duration: 2,
          delay: 0.9
        }} />
        </motion.g>

        {/* Perspective connecting lines */}
        <motion.line x1="50" y1="50" x2="450" y2="275" stroke="url(#neonAmber)" strokeWidth="1.5" filter="url(#glow)" opacity="0.4" initial={{
        pathLength: 0,
        opacity: 0
      }} animate={{
        pathLength: 1,
        opacity: 0.4
      }} transition={{
        duration: 2.5,
        delay: 1.2
      }} />
        <motion.line x1="1150" y1="50" x2="750" y2="275" stroke="url(#neonAmber)" strokeWidth="1.5" filter="url(#glow)" opacity="0.4" initial={{
        pathLength: 0,
        opacity: 0
      }} animate={{
        pathLength: 1,
        opacity: 0.4
      }} transition={{
        duration: 2.5,
        delay: 1.2
      }} />
        <motion.line x1="50" y1="750" x2="450" y2="525" stroke="url(#neonAmber)" strokeWidth="1.5" filter="url(#glow)" opacity="0.4" initial={{
        pathLength: 0,
        opacity: 0
      }} animate={{
        pathLength: 1,
        opacity: 0.4
      }} transition={{
        duration: 2.5,
        delay: 1.2
      }} />
        <motion.line x1="1150" y1="750" x2="750" y2="525" stroke="url(#neonAmber)" strokeWidth="1.5" filter="url(#glow)" opacity="0.4" initial={{
        pathLength: 0,
        opacity: 0
      }} animate={{
        pathLength: 1,
        opacity: 0.4
      }} transition={{
        duration: 2.5,
        delay: 1.2
      }} />
      </motion.svg>
    </motion.div>;
}

// Holographic Project Card Component
function HolographicProjectCard({
  project,
  index
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  return <motion.article ref={cardRef} className="relative group" initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay: index * 0.15
  }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} data-atomic="c05b_holographic-card">
      <motion.div className="relative p-4 rounded-lg border transition-all duration-300" style={{
      background: "rgba(20, 20, 32, 0.3)",
      borderColor: "var(--surface-amber)",
      borderWidth: "1px",
      backdropFilter: "blur(8px)",
      boxShadow: isHovered ? "0 0 20px rgba(255, 179, 0, 0.3), inset 0 0 20px rgba(255, 179, 0, 0.1)" : "0 0 10px rgba(255, 179, 0, 0.1), inset 0 0 10px rgba(255, 179, 0, 0.05)"
    }} animate={{
      scale: isHovered ? 1.02 : 1,
      borderColor: isHovered ? "#ffb300" : "rgba(255, 179, 0, 0.6)"
    }} transition={{
      duration: 0.3,
      ease: "easeOut"
    }}>
        {/* Corner nodes */}
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400 rounded-sm opacity-80" style={{
        boxShadow: "0 0 8px var(--surface-amber)"
      }} />
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-sm opacity-80" style={{
        boxShadow: "0 0 8px var(--surface-amber)"
      }} />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 rounded-sm opacity-80" style={{
        boxShadow: "0 0 8px var(--surface-amber)"
      }} />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-400 rounded-sm opacity-80" style={{
        boxShadow: "0 0 8px var(--surface-amber)"
      }} />

        <header className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg" style={{
            background: "rgba(255, 179, 0, 0.2)",
            color: "var(--surface-accent)"
          }}>
              {project.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{
              color: "var(--surface-white)",
              fontFamily: "var(--font-display)"
            }}>
                {project.title}
              </h3>
              <p className="text-sm" style={{
              color: "var(--surface-accent)"
            }}>
                {project.category}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {project.liveUrl && <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-amber-500/20" style={{
            color: "var(--surface-accent)"
          }} asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live`}>
                  <Eye className="h-4 w-4" />
                </a>
              </Button>}
            {project.githubUrl && <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-amber-500/20" style={{
            color: "var(--surface-accent)"
          }} asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code`}>
                  <Github className="h-4 w-4" />
                </a>
              </Button>}
          </div>
        </header>

        <div className="space-y-3">
          <p className="text-sm leading-relaxed" style={{
          color: "var(--surface-gray)",
          fontFamily: "var(--font-body)"
        }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => <Badge key={techIndex} variant="outline" className="transition-colors border-amber-500/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20">
                {tech}
              </Badge>)}
          </div>
        </div>

        {/* Inner glow effect */}
        <div className={cn("absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg", "bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5", isHovered ? "opacity-100" : "opacity-0")} />
      </motion.div>
    </motion.article>;
}

// Holographic Work Card Component
function HolographicWorkCard({
  work,
  index
}: {
  work: WorkGridItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return <motion.article className="relative group overflow-hidden rounded-lg border transition-all duration-300" style={{
    background: "rgba(20, 20, 32, 0.3)",
    borderColor: "var(--surface-amber)",
    borderWidth: "1px",
    backdropFilter: "blur(8px)",
    boxShadow: isHovered ? "0 0 20px rgba(255, 179, 0, 0.3), inset 0 0 20px rgba(255, 179, 0, 0.1)" : "0 0 10px rgba(255, 179, 0, 0.1), inset 0 0 10px rgba(255, 179, 0, 0.05)"
  }} initial={{
    opacity: 0,
    y: 30
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay: 1.4 + index * 0.15
  }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} data-atomic="c05b_holographic-work-card">
      {/* Corner nodes */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-amber-400 rounded-sm opacity-80 z-10" style={{
      boxShadow: "0 0 8px var(--surface-amber)"
    }} />
      <div className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-sm opacity-80 z-10" style={{
      boxShadow: "0 0 8px var(--surface-amber)"
    }} />
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-amber-400 rounded-sm opacity-80 z-10" style={{
      boxShadow: "0 0 8px var(--surface-amber)"
    }} />
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber-400 rounded-sm opacity-80 z-10" style={{
      boxShadow: "0 0 8px var(--surface-amber)"
    }} />

      <div className="h-48 bg-cover bg-center relative" style={{
      backgroundImage: `url(${work.image})`,
      backgroundColor: "var(--surface-glass)"
    }} aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2" style={{
        color: "var(--surface-white)",
        fontFamily: "var(--font-display)"
      }}>
          {work.title}
        </h3>
        <p className="text-sm mb-3" style={{
        color: "var(--surface-gray)",
        fontFamily: "var(--font-body)"
      }}>
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {work.technologies.map((tech, techIndex) => <Badge key={techIndex} variant="outline" className="text-xs border-amber-500/40 text-amber-300 bg-amber-500/10">
              {tech}
            </Badge>)}
        </div>
      </div>

      {/* Inner glow effect */}
      <div className={cn("absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-lg", "bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5", isHovered ? "opacity-100" : "opacity-0")} />
    </motion.article>;
}
export default function PortfolioNeonHome({
  className
}: PortfolioNeonHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothMouseX = useSpring(mouseX, {
    damping: 50,
    stiffness: 300
  });
  const smoothMouseY = useSpring(mouseY, {
    damping: 50,
    stiffness: 300
  });

  // Parallax transforms for floating content
  const contentX = useTransform(smoothMouseX, [0, 1], [-8, 8]);
  const contentY = useTransform(smoothMouseY, [0, 1], [-5, 5]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);
  return <div ref={containerRef} className={cn("min-h-screen w-full relative overflow-hidden", "cursor-none selection:bg-amber-500/20 selection:text-amber-300", className)} style={{
    background: "var(--surface-black)",
    color: "var(--surface-white)",
    fontFamily: "var(--font-body)"
  }} data-atomic="c00b_main-container">
      {/* 3D Tunnel Background */}
      <NeonTunnel mouseX={smoothMouseX} mouseY={smoothMouseY} />

      {/* Scanlines overlay */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
      background: "var(--scanlines)",
      opacity: 0.18,
      mixBlendMode: 'overlay'
    }} aria-hidden="true" data-atomic="c00b_scanlines" />

      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none" data-atomic="c00b_bg-glow">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{
        background: "var(--surface-amber)",
        opacity: 0.10
      }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{
        background: "var(--surface-amber)",
        opacity: 0.05
      }} />
      </div>

      {/* Floating Content Container - Centered in tunnel */}
      <motion.main className="absolute inset-0 flex items-center justify-center z-10" style={{
      translateX: contentX,
      translateY: contentY
    }} data-atomic="c00b_floating-content">
        <motion.div className="relative w-full max-w-4xl max-h-[80vh] overflow-y-auto p-8 rounded-xl border-2" style={{
        background: "rgba(10, 10, 15, 0.4)",
        borderColor: "var(--surface-amber)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 0 40px rgba(255, 179, 0, 0.2), inset 0 0 40px rgba(255, 179, 0, 0.1)"
      }} initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1,
        delay: 1.5
      }}>
          {/* Animated corner nodes */}
          <motion.div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-400 rounded-sm" style={{
          boxShadow: "0 0 12px var(--surface-amber)"
        }} animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.2, 0.8]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
          <motion.div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-sm" style={{
          boxShadow: "0 0 12px var(--surface-amber)"
        }} animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.2, 0.8]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }} />
          <motion.div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-400 rounded-sm" style={{
          boxShadow: "0 0 12px var(--surface-amber)"
        }} animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.2, 0.8]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }} />
          <motion.div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-400 rounded-sm" style={{
          boxShadow: "0 0 12px var(--surface-amber)"
        }} animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.2, 0.8]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }} />

          <div className="space-y-12">
            {/* Hero Section */}
            <header className="text-center space-y-6" data-atomic="c01b_hero">
              <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{
              color: "var(--surface-white)",
              fontFamily: "var(--font-display)",
              textShadow: "0 0 20px #ffb30088, 0 0 40px #ffb30044"
            }} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 2
            }}>
                Digital{" "}
                <span className="relative" style={{
                color: "var(--surface-accent)"
              }}>
                  Architect
                  <motion.div className="absolute -inset-2 rounded-lg" style={{
                  background: "var(--surface-amber)",
                  filter: "blur(32px)",
                  opacity: 0.2
                }} animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95]
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }} />
                </span>
              </motion.h1>

              <motion.p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{
              color: "var(--surface-gray)",
              fontFamily: "var(--font-body)"
            }} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 2.2
            }}>
                Crafting immersive digital experiences through cutting-edge technology,
                innovative design, and seamless user interactions in the cyber realm.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 2.4
            }}>
                <Button size="lg" className="px-6 py-2 font-semibold transition-all duration-300" style={{
                background: "var(--surface-amber)",
                color: "var(--surface-black)",
                borderRadius: "var(--border-radius-sm)"
              }}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Projects
                </Button>
                <Button size="lg" variant="outline" className="px-6 py-2 transition-all duration-300 border-amber-500 text-amber-300 hover:bg-amber-500/20" style={{
                borderRadius: "var(--border-radius-sm)"
              }}>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Profile
                </Button>
              </motion.div>
            </header>

            {/* About Section */}
            <section className="text-center" data-atomic="c03b_about-bio">
              <motion.h2 className="text-xl sm:text-2xl font-bold mb-4" style={{
              color: "var(--surface-accent)",
              fontFamily: "var(--font-display)",
              textShadow: "0 0 15px rgba(255, 179, 0, 0.3)"
            }} initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.8,
              delay: 2.6
            }}>
                About
              </motion.h2>
              <motion.p className="max-w-2xl mx-auto text-sm leading-relaxed" style={{
              color: "var(--surface-gray)",
              fontFamily: "var(--font-body)"
            }} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 2.8
            }}>
                Passionate about blending technology and design to create meaningful, beautiful, and performant digital products. 
                With expertise spanning front-end development, UI/UX design, and emerging technologies, I craft experiences that 
                push the boundaries of what's possible in the digital realm.
              </motion.p>
            </section>

            {/* Work Grid Section */}
            <section data-atomic="c05b_work-grid">
              <motion.h2 className="text-xl sm:text-2xl font-bold text-center mb-8" style={{
              color: "var(--surface-accent)",
              fontFamily: "var(--font-display)",
              textShadow: "0 0 15px rgba(255, 179, 0, 0.3)"
            }} initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.8,
              delay: 3
            }}>
                Featured Work
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workGrid.map((work, index) => <HolographicWorkCard key={work.id} work={work} index={index} />)}
              </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-6" aria-labelledby="projects-heading" data-atomic="c05b_projects-legacy">
              <motion.h2 id="projects-heading" className="text-xl sm:text-2xl font-bold text-center" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.8,
              delay: 3.2
            }} style={{
              color: "var(--surface-accent)",
              fontFamily: "var(--font-display)",
              textShadow: "0 0 15px rgba(255, 179, 0, 0.3)"
            }}>
                Featured Projects
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => <HolographicProjectCard key={project.id} project={project} index={index} />)}
              </div>
            </section>
          </div>
        </motion.div>
      </motion.main>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" data-atomic="c00b_particles">
        {Array.from({
        length: 20
      }, (_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{
        background: "var(--surface-amber)",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }} animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.8, 0.3],
        scale: [0.5, 1, 0.5]
      }} transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut"
      }} />)}
      </div>
    </div>;
}