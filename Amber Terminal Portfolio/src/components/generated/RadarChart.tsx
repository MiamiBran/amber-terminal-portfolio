"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
export interface RadarChartProps {
  skill: {
    name: string;
    percentage: number;
  };
  size?: number;
  className?: string;
}
export default function RadarChart({
  skill,
  size = 120,
  className
}: RadarChartProps) {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, {
    once: true,
    margin: "-50px"
  });
  const [animatedValue, setAnimatedValue] = useState(0);

  // Calculate radar chart points for a pentagon (5 points)
  const points = 5;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - 20;

  // Generate pentagon points
  const getPolygonPoints = (scale: number = 1) => {
    const angleStep = 2 * Math.PI / points;
    const startAngle = -Math.PI / 2; // Start from top

    return Array.from({
      length: points
    }, (_, i) => {
      const angle = startAngle + i * angleStep;
      const x = centerX + radius * scale * Math.cos(angle);
      const y = centerY + radius * scale * Math.sin(angle);
      return {
        x,
        y
      };
    });
  };

  // Create grid lines (concentric pentagons)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Create axis lines from center to each point
  const axisLines = getPolygonPoints(1).map(point => ({
    x1: centerX,
    y1: centerY,
    x2: point.x,
    y2: point.y
  }));

  // Animate the skill value
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let current = 0;
        const increment = skill.percentage / 60; // 60 frames for smooth animation
        const interval = setInterval(() => {
          current += increment;
          if (current >= skill.percentage) {
            current = skill.percentage;
            clearInterval(interval);
          }
          setAnimatedValue(Math.floor(current));
        }, 16); // ~60fps
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.percentage]);

  // Calculate data polygon points based on animated value
  const dataScale = animatedValue / 100;
  const dataPoints = getPolygonPoints(dataScale);
  const dataPath = dataPoints.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z';
  return <motion.div ref={chartRef} initial={{
    opacity: 0,
    scale: 0.8
  }} animate={isInView ? {
    opacity: 1,
    scale: 1
  } : {
    opacity: 0,
    scale: 0.8
  }} transition={{
    duration: 0.6,
    delay: 0.2
  }} className={cn("flex flex-col items-center space-y-4", className)}>
      {/* SVG Radar Chart */}
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-[0_0_8px_#FF6A00]" role="img" aria-label={`${skill.name} skill level: ${animatedValue}%`}>
          {/* Background glow effect */}
          <defs>
            <radialGradient id={`glow-${skill.name}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#FF6A00" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <filter id={`blur-${skill.name}`}>
              <feGaussianBlur stdDeviation="2" />
            </filter>
            
            <linearGradient id={`data-gradient-${skill.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6A00" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#FF914D" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Background circle for glassy effect */}
          <circle cx={centerX} cy={centerY} r={radius} fill={`url(#glow-${skill.name})`} className="opacity-60" />

          {/* Grid lines (concentric pentagons) */}
          {gridLevels.map((level, index) => {
          const gridPoints = getPolygonPoints(level);
          const gridPath = gridPoints.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ') + ' Z';
          return <path key={index} d={gridPath} fill="none" stroke="#FF6A00" strokeWidth="1" strokeOpacity={0.2 + index * 0.1} className="transition-all duration-300" />;
        })}

          {/* Axis lines */}
          {axisLines.map((line, index) => <line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="#FF6A00" strokeWidth="1" strokeOpacity="0.3" />)}

          {/* Data area (filled polygon) */}
          <motion.path d={dataPath} fill={`url(#data-gradient-${skill.name})`} stroke="none" initial={{
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

          {/* Data outline (glowing border) */}
          <motion.path d={dataPath} fill="none" stroke="#FF6A00" strokeWidth="2" strokeOpacity="0.8" filter={`url(#blur-${skill.name})`} initial={{
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

          {/* Sharp data outline */}
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

          {/* Data points (vertices) */}
          {dataPoints.map((point, index) => <motion.circle key={index} cx={point.x} cy={point.y} r="3" fill="#FF6A00" stroke="#FF914D" strokeWidth="1" initial={{
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
          delay: 0.8 + index * 0.1
        }} style={{
          filter: "drop-shadow(0 0 4px #FF6A00)"
        }} />)}

          {/* Center point */}
          <circle cx={centerX} cy={centerY} r="2" fill="#FF6A00" opacity="0.6" />
        </svg>

        {/* Animated glow overlay */}
        <motion.div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle, #FF6A00/10 0%, transparent 70%)"
      }} animate={{
        opacity: [0.3, 0.6, 0.3]
      }} transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>

      {/* Skill Name and Percentage */}
      <div className="text-center space-y-2">
        <h4 className="text-sm font-medium tracking-wider text-[#FF6A00] uppercase">
          {skill.name}
        </h4>
        <motion.div className="text-lg font-medium tracking-wider text-[#FF6A00]" style={{
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
    </motion.div>;
}