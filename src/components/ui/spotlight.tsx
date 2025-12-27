"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoother spring config for fluid, lerp-like movement
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // Dynamic opacity based on hover state
  const targetOpacity = useMotionValue(0.06);
  const smoothOpacity = useSpring(targetOpacity, { damping: 20, stiffness: 150 });

  useEffect(() => {
    targetOpacity.set(isHovered ? 0.12 : 0.06);
  }, [isHovered, targetOpacity]);

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = "relative";
        parent.style.overflow = "hidden";
        setParentElement(parent);

        // Set initial position to center
        const rect = parent.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 3);
      }
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!parentElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parentElement.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      // Smoothly return to center-ish position
      const rect = parentElement.getBoundingClientRect();
      mouseX.set(rect.width / 2);
      mouseY.set(rect.height / 3);
    };

    parentElement.addEventListener("mousemove", handleMouseMove);
    parentElement.addEventListener("mouseenter", handleMouseEnter);
    parentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", handleMouseEnter);
      parentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [parentElement, mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* Static ambient glow - always visible */}
      <div
        className="absolute top-1/4 left-1/3 h-[400px] w-[400px] rounded-full opacity-[0.04] blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
        }}
      />

      {/* Primary interactive spotlight - follows mouse on desktop */}
      <motion.div
        className="hidden md:block absolute rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          width: 450,
          height: 450,
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 55%)`,
          opacity: smoothOpacity,
          filter: "blur(60px)",
        }}
      />

      {/* Secondary softer glow that follows with more lag */}
      <motion.div
        className="hidden md:block absolute rounded-full"
        style={{
          x: useSpring(spotlightX, { damping: 40, stiffness: 60 }),
          y: useSpring(spotlightY, { damping: 40, stiffness: 60 }),
          translateX: "-50%",
          translateY: "-50%",
          width: 600,
          height: 600,
          background: `radial-gradient(circle at center, ${fill} 0%, transparent 60%)`,
          opacity: useTransform(smoothOpacity, (v) => v * 0.5),
          filter: "blur(100px)",
        }}
      />

      {/* SVG gradient overlay for additional depth */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#spotlight-gradient)" />
      </svg>
    </div>
  );
}
