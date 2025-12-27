"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Moon,
  Sun,
  Home,
  User,
  Briefcase,
  FolderKanban,
  Wrench,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Code2,
} from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock";

// Custom hook for hydration-safe mounting
function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Icon-only navigation items for FloatingDock
const dockItems: DockItem[] = [
  // Internal navigation
  { label: "Home", href: "#hero", icon: <Home className="w-full h-full" /> },
  { label: "About", href: "#about", icon: <User className="w-full h-full" /> },
  { label: "Experience", href: "#experience", icon: <Briefcase className="w-full h-full" /> },
  { label: "Projects", href: "#projects", icon: <FolderKanban className="w-full h-full" /> },
  { label: "Skills", href: "#skills", icon: <Wrench className="w-full h-full" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-full h-full" /> },
  // External links
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: <Linkedin className="w-full h-full" />, external: true },
  { label: "GitHub", href: siteConfig.links.github, icon: <Github className="w-full h-full" />, external: true },
  { label: "Twitter", href: siteConfig.links.twitter, icon: <Twitter className="w-full h-full" />, external: true },
  { label: "LeetCode", href: siteConfig.links.leetcode, icon: <Code2 className="w-full h-full" />, external: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useHydrated();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Check initial scroll position
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="section-container">
          <div className="flex h-16 items-center justify-between">
            {/* LEFT: Logo Section */}
            <a
              href="#hero"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="Go to top"
            >
              <Image
                src="/icon.png"
                alt="Logo"
                width={28}
                height={28}
                className="rounded-md"
                priority
              />
              <span className="text-lg font-semibold tracking-tight">
                Adesh<span className="text-muted-foreground">.dev</span>
              </span>
            </a>

            {/* CENTER: Desktop Navigation - Floating Dock */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <FloatingDock items={dockItems} />
            </div>

            {/* RIGHT: Theme Toggle (Desktop) */}
            <div className="hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
                aria-label="Toggle theme"
              >
                {mounted && (
                  <motion.div
                    key={theme}
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </motion.div>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
                aria-label="Toggle theme"
              >
                {mounted && (theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                ))}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-9 w-9"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-64 bg-background border-l border-border p-6 pt-20"
            >
              <div className="flex flex-col gap-4">
                {siteConfig.nav.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
