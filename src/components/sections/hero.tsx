"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, FileText } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="section-container py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-2 text-xl md:text-2xl text-muted-foreground font-medium"
          >
            {siteConfig.title}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            I build scalable software solutions with 3+ years of experience in
            Full-Stack Development, Big Data, and Automation. Currently focused on
            modern DevOps practices and cloud-native architectures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="gap-2">
              <a href="#contact">
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="#experience">
                <FileText className="h-4 w-4" />
                View my work
              </a>
            </Button>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            {["Java", "Spring Boot", "React", "Next.js", "AWS", "Docker", "Kubernetes"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
