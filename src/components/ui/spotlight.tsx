"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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

  const spotlightX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const spotlightY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = "relative";
        parent.style.overflow = "hidden";
        setParentElement(parent);
      }
    }
  }, []);

  useEffect(() => {
    if (!parentElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parentElement.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

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
      {/* Static ambient spotlight - always visible */}
      <div
        className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full opacity-[0.03] blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 h-[400px] w-[400px] rounded-full opacity-[0.02] blur-[80px]"
        style={{
          background: `radial-gradient(circle, ${fill} 0%, transparent 70%)`,
        }}
      />

      {/* Interactive spotlight - follows mouse on desktop */}
      <motion.div
        className="hidden md:block absolute h-[600px] w-[600px] rounded-full"
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background: `radial-gradient(circle, ${fill} 0%, transparent 60%)`,
          opacity: isHovered ? 0.04 : 0.02,
        }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      {/* SVG gradient overlay for additional depth */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.015]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-gradient" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#spotlight-gradient)" />
      </svg>
    </div>
  );
}
