"use client";

import { Mail, ArrowRight, Github, Linkedin, Twitter, Code } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
    label: "View my code",
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    label: "Connect professionally",
  },
  {
    name: "Twitter",
    href: siteConfig.links.twitter,
    icon: Twitter,
    label: "Follow for updates",
  },
  {
    name: "LeetCode",
    href: siteConfig.links.leetcode,
    icon: Code,
    label: "Check my problem-solving",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <span className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
              Contact
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
              Let&apos;s build something extraordinary
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg text-muted-foreground">
              I&apos;m always open to discussing new opportunities, interesting
              projects, or just having a chat about technology. Drop me a message!
            </p>
          </FadeIn>

          {/* Email CTA */}
          <FadeIn delay={0.3}>
            <div className="mt-8">
              <Button size="lg" className="gap-2 text-base" asChild>
                <a href={`mailto:${siteConfig.email}`}>
                  <Mail className="h-5 w-5" />
                  {siteConfig.email}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </div>
          </FadeIn>

          {/* Social Links */}
          <FadeIn delay={0.4}>
            <div className="mt-12">
              <p className="text-sm text-muted-foreground mb-6">
                Or find me on these platforms
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="hover:shadow-md transition-all hover:-translate-y-1">
                      <CardContent className="p-4 text-center">
                        <link.icon className="h-6 w-6 mx-auto mb-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <p className="font-medium text-sm">{link.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {link.label}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Tagline */}
          <FadeIn delay={0.5}>
            <p className="mt-16 text-sm text-muted-foreground">
              Your vision + my expertise ={" "}
              <span className="font-medium text-foreground">
                S.O.L.I.D. products
              </span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Scalable · Optimized · Lean · Innovative · Dependable
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
