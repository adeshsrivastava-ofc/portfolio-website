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

  // Subtle scale effect - restrained for premium feel
  const widthSync = useTransform(distance, [-100, 0, 100], [1, 1.08, 1]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={item.href}
      style={{ scale: width }}
      className={cn(
        "relative flex items-center gap-2 px-3 py-1.5 text-sm font-medium",
        "text-muted-foreground hover:text-foreground",
        "rounded-full transition-colors duration-200",
        "hover:bg-secondary/50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      whileTap={{ scale: 0.98 }}
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
