"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex items-center gap-1 rounded-full border border-border/50 bg-background/80 px-2 py-1.5 backdrop-blur-md shadow-lg",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {items.map((item) => (
        <DockIcon key={item.href} mouseX={mouseX} item={item} />
      ))}
    </motion.nav>
  );
}

interface DockIconProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  item: DockItem;
}

function DockIcon({ mouseX, item }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Enhanced scale effect with neighbor influence
  // Active item scales to 1.3, neighbors get gradual falloff from 1.15 to 1.0
  const scaleSync = useTransform(
    distance,
    [-150, -75, 0, 75, 150],
    [1.0, 1.12, 1.3, 1.12, 1.0]
  );
  
  // Spring-based animation with slight overshoot
  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 200,
    damping: 10, // Lower damping = more bounce/overshoot
  });

  // Subtle y-axis lift for active item
  const ySync = useTransform(distance, [-100, 0, 100], [0, -2, 0]);
  const y = useSpring(ySync, {
    mass: 0.1,
    stiffness: 200,
    damping: 12,
  });

  // Shadow intensity based on proximity
  const shadowOpacity = useTransform(distance, [-100, 0, 100], [0, 0.25, 0]);
  const shadowSpring = useSpring(shadowOpacity, {
    mass: 0.1,
    stiffness: 150,
    damping: 15,
  });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ 
        scale,
        y,
        boxShadow: useTransform(
          shadowSpring,
          (opacity) => `0 4px 12px rgba(0, 0, 0, ${opacity}), 0 0 20px rgba(var(--primary-rgb, 59, 130, 246), ${opacity * 0.4})`
        ),
      }}
      className={cn(
        "relative flex items-center gap-2 px-3 py-1.5 text-sm font-medium",
        "text-muted-foreground hover:text-foreground",
        "rounded-full transition-colors duration-200",
        "hover:bg-secondary/60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      whileTap={{ scale: 0.95 }}
    >
      {item.icon && (
        <span className="h-4 w-4 shrink-0" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span>{item.label}</span>
    </motion.a>
  );
}
