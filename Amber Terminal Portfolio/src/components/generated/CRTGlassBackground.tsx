"use client";

import * as React from "react";
import { motion } from "framer-motion";
export interface CRTGlassBackgroundProps {
  className?: string;
}
export default function CRTGlassBackground({
  className
}: CRTGlassBackgroundProps) {
  return <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Primary Animated Glass Gradient Layer */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.2
    }} animate={{
      opacity: [0.2, 0.5, 0.3, 0.4, 0.2],
      scale: [1, 1.02, 0.98, 1.01, 1]
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: `
            radial-gradient(ellipse 80% 60% at 30% 20%, rgba(255, 106, 0, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 70% 80%, rgba(0, 150, 255, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 100% 40% at 50% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 70%)
          `,
      filter: "blur(40px)"
    }} />

      {/* Secondary Animated Glass Layer */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.3
    }} animate={{
      opacity: [0.3, 0.2, 0.5, 0.2, 0.3],
      scale: [1.1, 1, 1.05, 0.95, 1.1]
    }} transition={{
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 2
    }} style={{
      background: `
            linear-gradient(45deg, rgba(255, 106, 0, 0.2) 0%, transparent 30%),
            linear-gradient(135deg, rgba(0, 150, 255, 0.15) 20%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)
          `,
      filter: "blur(60px)"
    }} />

      {/* Tertiary Floating Glass Orbs */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.2,
      rotate: 0
    }} animate={{
      opacity: [0.2, 0.4, 0.1, 0.3, 0.2],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 0.9, 1.05, 1]
    }} transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }} style={{
      background: `
            radial-gradient(circle at 20% 60%, rgba(255, 106, 0, 0.25) 0%, transparent 30%),
            radial-gradient(circle at 80% 40%, rgba(0, 150, 255, 0.2) 0%, transparent 35%),
            radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 25%)
          `,
      filter: "blur(80px)"
    }} />

      {/* CRT Scanline Overlay */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.05
    }} animate={{
      opacity: [0.05, 0.1, 0.08, 0.06, 0.05]
    }} transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 106, 0, 0.8) 2px,
            rgba(255, 106, 0, 0.8) 4px
          )`
    }} />

      {/* Diagonal CRT Scanlines */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.03
    }} animate={{
      opacity: [0.03, 0.08, 0.05, 0.04, 0.03]
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }} style={{
      background: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 3px,
            rgba(0, 150, 255, 0.6) 3px,
            rgba(0, 150, 255, 0.6) 5px
          )`
    }} />

      {/* CRT Flicker Effect */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 1
    }} animate={{
      opacity: [1, 0.98, 1, 0.96, 1, 0.99, 1]
    }} transition={{
      duration: 0.1,
      repeat: Infinity,
      repeatDelay: Math.random() * 3 + 2,
      // Random delay between 2-5 seconds
      ease: "easeInOut"
    }} style={{
      background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(255, 106, 0, 0.02) 0%, transparent 70%)
          `,
      mixBlendMode: "overlay"
    }} />

      {/* Subtle Animated Noise Texture */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.02
    }} animate={{
      opacity: [0.02, 0.05, 0.03, 0.04, 0.02],
      scale: [1, 1.01, 0.99, 1.005, 1]
    }} transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: `
            repeating-conic-gradient(
              from 0deg at 50% 50%,
              rgba(255, 255, 255, 0.01) 0deg,
              transparent 2deg,
              rgba(255, 106, 0, 0.01) 4deg,
              transparent 6deg
            )
          `,
      filter: "blur(1px)"
    }} />

      {/* Edge Vignette Effect */}
      <motion.div className="absolute inset-0" initial={{
      opacity: 0.3
    }} animate={{
      opacity: [0.3, 0.4, 0.35, 0.38, 0.3]
    }} transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }} style={{
      background: `
            radial-gradient(ellipse 120% 120% at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.4) 100%)
          `
    }} />

      {/* Responsive Mobile Adjustments */}
      <div className="md:hidden">
        {/* Mobile-specific lighter overlay */}
        <motion.div className="absolute inset-0" initial={{
        opacity: 0.1
      }} animate={{
        opacity: [0.1, 0.2, 0.15, 0.12, 0.1]
      }} transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }} style={{
        background: `
              radial-gradient(ellipse 100% 80% at 50% 50%, rgba(255, 106, 0, 0.15) 0%, transparent 60%)
            `,
        filter: "blur(30px)"
      }} />
      </div>

      {/* Desktop Enhancement */}
      <div className="hidden md:block">
        {/* Additional desktop glass layer */}
        <motion.div className="absolute inset-0" initial={{
        opacity: 0.15
      }} animate={{
        opacity: [0.15, 0.25, 0.2, 0.18, 0.15],
        scale: [1, 1.01, 0.99, 1.005, 1]
      }} transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }} style={{
        background: `
              linear-gradient(90deg, rgba(255, 106, 0, 0.1) 0%, transparent 50%, rgba(0, 150, 255, 0.1) 100%),
              linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)
            `,
        filter: "blur(50px)"
      }} />
      </div>
    </div>;
}