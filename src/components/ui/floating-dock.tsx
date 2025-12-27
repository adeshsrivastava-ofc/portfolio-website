"use client";

import { useRef, useState, createContext, useContext } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

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

interface DockIconProps {
  item: DockItem;
}

// ============================================================================
// Shared Motion Context
// ============================================================================

interface DockContextType {
  mouseX: MotionValue<number>;
  isHovering: boolean;
}

const DockContext = createContext<DockContextType | null>(null);

function useDockContext() {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("DockIcon must be used within FloatingDock");
  return ctx;
}

// ============================================================================
// Spring Configurations (Aceternity-style physics)
// ============================================================================

const SPRING_CONFIG = {
  // Higher stiffness + lower damping = snappier with overshoot
  icon: { mass: 0.1, stiffness: 290, damping: 14 },
  container: { mass: 0.2, stiffness: 200, damping: 18 },
  tooltip: { mass: 0.3, stiffness: 400, damping: 24 },
};

// ============================================================================
// Constants
// ============================================================================

const ICON_SIZE = 40; // Base icon container size (px)
const ICON_SIZE_ACTIVE = 56; // Max size when hovered (px)
const MAGNIFICATION = 1.4; // Scale multiplier for active icon
const NEIGHBOR_MAGNIFICATION = 1.15; // Scale for adjacent icons
const DISTANCE_THRESHOLD = 120; // px - affect radius for neighbors

// ============================================================================
// Floating Dock Container
// ============================================================================

export function FloatingDock({ items, className }: FloatingDockProps) {
  const mouseX = useMotionValue(Infinity);
  const [isHovering, setIsHovering] = useState(false);

  // Separate internal and external items
  const internalItems = items.filter(
    (item) => !item.external && !item.href.startsWith("http")
  );
  const externalItems = items.filter(
    (item) => item.external || item.href.startsWith("http")
  );

  // Container padding animation - expands when hovering
  const paddingX = useSpring(
    useTransform(
      mouseX,
      [Infinity, 0],
      [16, 20] // px padding: compact -> expanded
    ),
    SPRING_CONFIG.container
  );

  const paddingY = useSpring(
    useTransform(
      mouseX,
      [Infinity, 0],
      [10, 12]
    ),
    SPRING_CONFIG.container
  );

  // Subtle gap expansion between items
  const gap = useSpring(
    useTransform(
      mouseX,
      [Infinity, 0],
      [4, 6] // gap: compact -> expanded
    ),
    SPRING_CONFIG.container
  );

  return (
    <DockContext.Provider value={{ mouseX, isHovering }}>
      <motion.nav
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          if (!isHovering) setIsHovering(true);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          setIsHovering(false);
        }}
        style={{
          paddingLeft: paddingX,
          paddingRight: paddingX,
          paddingTop: paddingY,
          paddingBottom: paddingY,
          gap,
        }}
        className={cn(
          "flex items-end rounded-full border border-border/50 bg-background/80 backdrop-blur-md shadow-lg",
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Internal navigation items */}
        {internalItems.map((item) => (
          <DockIcon key={item.href} item={item} />
        ))}

        {/* Separator between internal and external */}
        {externalItems.length > 0 && (
          <motion.div
            className="self-center mx-1 w-px bg-border/40"
            style={{
              height: useSpring(
                useTransform(mouseX, [Infinity, 0], [20, 28]),
                SPRING_CONFIG.container
              ),
            }}
            aria-hidden="true"
          />
        )}

        {/* External link items */}
        {externalItems.map((item) => (
          <DockIcon key={item.href} item={item} />
        ))}
      </motion.nav>
    </DockContext.Provider>
  );
}

// ============================================================================
// Dock Icon with Space Redistribution
// ============================================================================

function DockIcon({ item }: DockIconProps) {
  const { mouseX } = useDockContext();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const showTooltip = isHovered || isFocused;

  // Calculate distance from mouse to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // -------------------------------------------------------------------------
  // Size-based animation (not scale) for space redistribution
  // This makes the container grow, pushing neighbors apart naturally
  // -------------------------------------------------------------------------
  const sizeSync = useTransform(distance, (d) => {
    const absDistance = Math.abs(d);
    if (absDistance >= DISTANCE_THRESHOLD) return ICON_SIZE;

    // Smooth falloff using cosine interpolation
    const progress = 1 - absDistance / DISTANCE_THRESHOLD;
    const eased = (1 - Math.cos(progress * Math.PI)) / 2;

    return ICON_SIZE + (ICON_SIZE_ACTIVE - ICON_SIZE) * eased;
  });

  const size = useSpring(sizeSync, SPRING_CONFIG.icon);

  // Icon scale within container (for visual pop)
  const iconScaleSync = useTransform(distance, (d) => {
    const absDistance = Math.abs(d);
    if (absDistance >= DISTANCE_THRESHOLD) return 1;

    const progress = 1 - absDistance / DISTANCE_THRESHOLD;
    const eased = (1 - Math.cos(progress * Math.PI)) / 2;

    // Active icon gets full magnification, neighbors get less
    if (absDistance < 30) {
      return 1 + (MAGNIFICATION - 1) * eased;
    }
    return 1 + (NEIGHBOR_MAGNIFICATION - 1) * eased;
  });

  const iconScale = useSpring(iconScaleSync, SPRING_CONFIG.icon);

  // Y-axis lift for active item
  const ySync = useTransform(distance, (d) => {
    const absDistance = Math.abs(d);
    if (absDistance >= 80) return 0;
    const progress = 1 - absDistance / 80;
    return -8 * progress; // Lift up to 8px
  });

  const y = useSpring(ySync, SPRING_CONFIG.icon);

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
        width: size,
        height: size,
        y,
      }}
      className={cn(
        "relative flex items-center justify-center",
        "text-muted-foreground hover:text-foreground",
        "rounded-full transition-colors duration-150",
        "hover:bg-secondary/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
      whileTap={{ scale: 0.92 }}
    >
      {/* Icon with inner scale */}
      <motion.span
        className="flex items-center justify-center"
        style={{
          width: 18,
          height: 18,
          scale: iconScale,
        }}
        aria-hidden="true"
      >
        {item.icon}
      </motion.span>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.85 }}
            transition={{
              type: "spring",
              ...SPRING_CONFIG.tooltip,
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none z-[60]"
          >
            <div className="px-2.5 py-1.5 rounded-md bg-foreground text-background text-xs font-medium whitespace-nowrap shadow-lg">
              {item.label}
            </div>
            {/* Arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
