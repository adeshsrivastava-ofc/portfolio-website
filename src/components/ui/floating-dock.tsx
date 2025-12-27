"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  // Separate internal and external items
  const internalItems = items.filter((item) => !item.external && !item.href.startsWith("http"));
  const externalItems = items.filter((item) => item.external || item.href.startsWith("http"));

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        // Increased gap and padding for hover scale headroom
        "flex items-center gap-1.5 rounded-full border border-border/50 bg-background/80 px-4 py-2.5 backdrop-blur-md shadow-lg",
        className
      )}
      style={{ overflow: "visible" }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Internal navigation items */}
      {internalItems.map((item) => (
        <DockIcon key={item.href} mouseX={mouseX} item={item} />
      ))}
      
      {/* Separator between internal and external */}
      {externalItems.length > 0 && (
        <div className="mx-2 h-6 w-px bg-border/40" aria-hidden="true" />
      )}
      
      {/* External link items */}
      {externalItems.map((item) => (
        <DockIcon key={item.href} mouseX={mouseX} item={item} />
      ))}
    </motion.nav>
  );
}

interface DockIconProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  item: DockItem;
}

// Base icon size for calculating scale headroom
const ICON_BASE_SIZE = 40; // px - includes padding
const MAX_SCALE = 1.25;

function DockIcon({ mouseX, item }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showTooltip = isHovered || isFocused;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Refined scale: slightly reduced max to prevent overlap
  // Active icon 1.25, neighbors scale gradually (1.1 adjacent)
  const scaleSync = useTransform(
    distance,
    [-100, -50, 0, 50, 100],
    [1.0, 1.1, MAX_SCALE, 1.1, 1.0]
  );
  
  // Spring with controlled overshoot
  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 200,
    damping: 12,
  });

  // Y-axis lift for active item - increased for better tooltip clearance
  const ySync = useTransform(distance, [-60, 0, 60], [0, -6, 0]);
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 200,
    damping: 12,
  });

  // Shadow/glow based on proximity
  const shadowOpacity = useTransform(distance, [-60, 0, 60], [0, 0.25, 0]);
  const shadowSpring = useSpring(shadowOpacity, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  const isExternal = item.external || item.href.startsWith("http");

  return (
    <motion.a
      ref={ref}
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={item.label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{ 
        scale,
        y,
        boxShadow: useTransform(
          shadowSpring,
          (opacity) => `0 4px 12px rgba(0, 0, 0, ${opacity}), 0 0 12px rgba(var(--primary-rgb, 59, 130, 246), ${opacity * 0.4})`
        ),
      }}
      className={cn(
        // Fixed size container with margin for scale headroom
        "relative flex items-center justify-center w-10 h-10",
        "text-muted-foreground hover:text-foreground",
        "rounded-full transition-colors duration-200",
        "hover:bg-secondary/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      whileTap={{ scale: 0.92 }}
    >
      {/* Icon */}
      <span className="h-[18px] w-[18px] flex items-center justify-center" aria-hidden="true">
        {item.icon}
      </span>

      {/* Tooltip - positioned above with proper clearance */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 22,
              mass: 0.4,
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-[60]"
          >
            <div className="px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium whitespace-nowrap shadow-lg">
              {item.label}
            </div>
            {/* Tooltip arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
