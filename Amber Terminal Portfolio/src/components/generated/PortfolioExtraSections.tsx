"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Diamond, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export interface PortfolioExtraSectionsProps {
  projects?: {
    id: string;
    title: string;
    description: string;
    tech: string[];
    image: string;
    link?: string;
  }[];
  processSteps?: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  testimonials?: {
    id: string;
    name: string;
    position: string;
    company: string;
    testimonial: string;
    avatar: string;
    initials: string;
  }[];
}
export default function PortfolioExtraSections({
  projects = [{
    id: "01",
    title: "E-COMMERCE_PLATFORM",
    description: "Full-stack marketplace with real-time inventory management and payment processing",
    tech: ["REACT", "NODE.JS", "MONGODB", "STRIPE"],
    image: "Project showcase image",
    link: "#"
  }, {
    id: "02",
    title: "MOBILE_FITNESS_APP",
    description: "Cross-platform fitness tracking application with social features and AI coaching",
    tech: ["REACT NATIVE", "FIREBASE", "ML KIT"],
    image: "Project showcase image",
    link: "#"
  }, {
    id: "03",
    title: "DASHBOARD_ANALYTICS",
    description: "Real-time business intelligence dashboard with advanced data visualization",
    tech: ["VUE.JS", "D3.JS", "PYTHON", "POSTGRESQL"],
    image: "Project showcase image",
    link: "#"
  }, {
    id: "04",
    title: "BLOCKCHAIN_WALLET",
    description: "Secure cryptocurrency wallet with multi-chain support and DeFi integration",
    tech: ["SOLIDITY", "WEB3.JS", "METAMASK"],
    image: "Project showcase image",
    link: "#"
  }],
  processSteps = [{
    id: "01",
    title: "DISCOVERY",
    description: "Deep dive into user needs, business goals, and technical constraints through research and stakeholder interviews",
    icon: "🔍"
  }, {
    id: "02",
    title: "STRATEGY",
    description: "Define project scope, create user personas, and establish success metrics and technical architecture",
    icon: "📋"
  }, {
    id: "03",
    title: "DESIGN",
    description: "Create wireframes, prototypes, and high-fidelity designs with focus on user experience and accessibility",
    icon: "🎨"
  }, {
    id: "04",
    title: "DEVELOP",
    description: "Build robust, scalable solutions using modern technologies and best practices for performance",
    icon: "⚡"
  }, {
    id: "05",
    title: "TEST",
    description: "Comprehensive quality assurance including unit tests, integration tests, and user acceptance testing",
    icon: "🧪"
  }, {
    id: "06",
    title: "DEPLOY",
    description: "Launch to production with monitoring, analytics, and continuous improvement based on user feedback",
    icon: "🚀"
  }],
  testimonials = [{
    id: "01",
    name: "Sarah Chen",
    position: "Product Manager",
    company: "TechCorp Industries",
    testimonial: "Brandon's attention to detail and user-centric approach transformed our product. His ability to bridge technical complexity with intuitive design is exceptional. The project exceeded all expectations.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    initials: "SC"
  }, {
    id: "02",
    name: "Marcus Rodriguez",
    position: "CTO",
    company: "StartupLab",
    testimonial: "Working with Brandon was a game-changer for our startup. His systematic approach and technical expertise helped us build a scalable platform that our users love. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    initials: "MR"
  }, {
    id: "03",
    name: "Emily Watson",
    position: "Design Director",
    company: "Creative Agency",
    testimonial: "Brandon brings a unique perspective that combines design thinking with engineering excellence. His solutions are not just beautiful but also practical and maintainable.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    initials: "EW"
  }]
}: PortfolioExtraSectionsProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return <div className="relative bg-[#0A0502]" style={{
    fontFamily: "'VT323', 'Space Mono', monospace"
  }}>
      
      {/* All Projects Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Section Header */}
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
        }} className="mb-12">
            {/* Orange Header Bar */}
            <div className="w-full h-2 bg-[#FF6A00] mb-6" style={{
            boxShadow: "0 0 12px #FF6A00/50",
            display: "none"
          }} />
            
            <h2 className={cn("text-3xl md:text-4xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_12px_#FF6A00] mb-8")}>
              [ALL PROJECTS]
            </h2>
            
            {/* Section divider */}
            <div className="w-full h-px bg-[#FF6A00]/30" style={{
            boxShadow: "0 0 4px #FF6A00/50"
          }} />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => <motion.article key={project.id} initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }} className="group">
                <Card className={cn("border-2 border-[#FF6A00] bg-[#FF6A00]/5 overflow-hidden", "transition-all duration-300 hover:bg-[#FF6A00]/10", "hover:border-[#FF914D] hover:drop-shadow-[0_0_20px_#FF6A00]")} style={{
              boxShadow: "0 0 12px #FF6A00/20"
            }}>
                  
                  {/* Project Image Placeholder */}
                  <div className="aspect-video border-b border-[#FF6A00]/30 bg-[#FF6A00]/10 flex items-center justify-center relative overflow-hidden">
                    <span className="text-[#FF6A00]/60 text-sm tracking-wider">{project.image}</span>
                    
                    {/* Hover overlay */}
                    <motion.div className="absolute inset-0 bg-[#FF6A00]/20 flex items-center justify-center opacity-0 group-hover:opacity-100" transition={{
                  duration: 0.3
                }}>
                      <ExternalLink className="text-[#FF6A00] w-8 h-8" />
                    </motion.div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Project ID */}
                    <div className="flex items-center justify-between">
                      <span className={cn("px-2 py-1 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-sm tracking-wider")} style={{
                    boxShadow: "0 0 4px #FF6A00/30"
                  }}>
                        {project.id}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className={cn("text-xl md:text-2xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00]")}>
                      {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-[#FF6A00]/80 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => <span key={techIndex} className={cn("px-2 py-1 border border-[#FF6A00]/50 bg-[#FF6A00]/5", "text-[#FF6A00]/80 text-xs tracking-wider")}>
                          {tech}
                        </span>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.article>)}
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

      {/* Section Divider */}
      <div className="w-full h-px bg-[#FF6A00]/30" style={{
      boxShadow: "0 0 4px #FF6A00/50"
    }} />

      {/* My Process Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Section Header */}
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
        }} className="mb-12">
            {/* Orange Header Bar */}
            <div className="w-full h-2 bg-[#FF6A00] mb-6" style={{
            boxShadow: "0 0 12px #FF6A00/50",
            display: "none"
          }} />
            
            <h2 className={cn("text-3xl md:text-4xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_12px_#FF6A00] mb-8")}>
              [MY PROCESS]
            </h2>
            
            {/* Section divider */}
            <div className="w-full h-px bg-[#FF6A00]/30" style={{
            boxShadow: "0 0 4px #FF6A00/50"
          }} />
          </motion.div>

          {/* Process Steps - Horizontal Scroll on Mobile */}
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 md:grid md:grid-cols-3 md:gap-6 md:space-x-0 min-w-max md:min-w-0">
              {processSteps.map((step, index) => <motion.article key={step.id} initial={{
              opacity: 0,
              x: 50
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: index * 0.1
            }} className="flex-shrink-0 w-80 md:w-auto">
                  <Card className={cn("border-2 border-[#FF6A00] bg-[#FF6A00]/5 h-full", "transition-all duration-300 hover:bg-[#FF6A00]/10", "hover:border-[#FF914D] hover:drop-shadow-[0_0_16px_#FF6A00]")} style={{
                boxShadow: "0 0 12px #FF6A00/20"
              }}>
                    
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      {/* Step Number and Diamond Icon */}
                      <div className="flex items-center justify-between">
                        <span className={cn("px-3 py-1 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-lg tracking-wider")} style={{
                      boxShadow: "0 0 4px #FF6A00/30"
                    }}>
                          {step.id}
                        </span>
                        
                        <motion.div className="relative" animate={{
                      rotate: [0, 90, 180, 270, 360]
                    }} transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}>
                          <Diamond className="w-6 h-6 text-[#FF6A00]" style={{
                        filter: "drop-shadow(0 0 4px #FF6A00)"
                      }} />
                        </motion.div>
                      </div>

                      {/* Step Title */}
                      <h3 className={cn("text-xl md:text-2xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00]")}>
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-[#FF6A00]/80 leading-relaxed flex-grow">
                        {step.description}
                      </p>

                      {/* Process Icon */}
                      <div className="text-center pt-4">
                        <span className="text-3xl" style={{
                      filter: "drop-shadow(0 0 8px #FF6A00)"
                    }}>
                          {step.icon}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>)}
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
      </section>

      {/* Section Divider */}
      <div className="w-full h-px bg-[#FF6A00]/30" style={{
      boxShadow: "0 0 4px #FF6A00/50"
    }} />

      {/* Client Database Section */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Section Header */}
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
        }} className="mb-12">
            {/* Orange Header Bar */}
            <div className="w-full h-2 bg-[#FF6A00] mb-6" style={{
            boxShadow: "0 0 12px #FF6A00/50"
          }} />
            
            <h2 className={cn("text-3xl md:text-4xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_12px_#FF6A00] mb-8")}>
              [CLIENT DATABASE]
            </h2>
            
            {/* Section divider */}
            <div className="w-full h-px bg-[#FF6A00]/30" style={{
            boxShadow: "0 0 4px #FF6A00/50"
          }} />
          </motion.div>

          {/* Testimonial Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.article key={currentTestimonial} initial={{
              opacity: 0,
              x: 100
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -100
            }} transition={{
              duration: 0.5
            }}>
                <Card className={cn("border-2 border-[#FF6A00] bg-[#FF6A00]/5", "transition-all duration-300")} style={{
                boxShadow: "0 0 24px #FF6A00/30, inset 0 0 12px #FF6A00/10"
              }}>
                  
                  <CardContent className="p-8 space-y-6">
                    {/* Client Info Header */}
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16 border-2 border-[#FF6A00]" style={{
                      boxShadow: "0 0 8px #FF6A00/40"
                    }}>
                        <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} />
                        <AvatarFallback className="bg-[#FF6A00]/10 text-[#FF6A00] text-lg font-normal tracking-wider">
                          {testimonials[currentTestimonial].initials}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <h3 className={cn("text-xl md:text-2xl font-normal tracking-wider text-[#FF6A00]", "drop-shadow-[0_0_8px_#FF6A00]")}>
                          {testimonials[currentTestimonial].name}
                        </h3>
                        
                        <p className="text-[#FF6A00]/80 tracking-wider">
                          {testimonials[currentTestimonial].position}
                        </p>
                        
                        <p className="text-[#FF6A00]/60 text-sm tracking-wider">
                          {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="relative">
                      <div className="absolute -top-2 -left-2 text-4xl text-[#FF6A00]/30">"</div>
                      <p className="text-[#FF6A00]/90 text-lg leading-relaxed pl-6">
                        {testimonials[currentTestimonial].testimonial}
                      </p>
                      <div className="absolute -bottom-4 -right-2 text-4xl text-[#FF6A00]/30">"</div>
                    </blockquote>

                    {/* Client ID */}
                    <div className="flex justify-end">
                      <span className={cn("px-3 py-1 border border-[#FF6A00] bg-[#FF6A00]/10", "text-[#FF6A00] text-sm tracking-wider")} style={{
                      boxShadow: "0 0 4px #FF6A00/30"
                    }}>
                        CLIENT_{testimonials[currentTestimonial].id}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-between mt-8">
              <Button onClick={prevTestimonial} variant="outline" size="icon" className={cn("border-2 border-[#FF6A00] bg-transparent text-[#FF6A00]", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "transition-all duration-300")} style={{
              boxShadow: "0 0 8px #FF6A00/30"
            }} aria-label="Previous testimonial">
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Testimonial Indicators */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={cn("w-3 h-3 border border-[#FF6A00] transition-all duration-300", index === currentTestimonial ? "bg-[#FF6A00]" : "bg-transparent hover:bg-[#FF6A00]/30")} style={{
                boxShadow: index === currentTestimonial ? "0 0 8px #FF6A00" : "0 0 4px #FF6A00/30"
              }} aria-label={`Go to testimonial ${index + 1}`} />)}
              </div>

              <Button onClick={nextTestimonial} variant="outline" size="icon" className={cn("border-2 border-[#FF6A00] bg-transparent text-[#FF6A00]", "hover:bg-[#FF6A00]/10 hover:border-[#FF914D] hover:text-[#FF914D]", "transition-all duration-300")} style={{
              boxShadow: "0 0 8px #FF6A00/30"
            }} aria-label="Next testimonial">
                <ChevronRight className="w-5 h-5" />
              </Button>
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
      </section>
    </div>;
}