"use client";

import { ExternalLink, ArrowUpRight, Sparkles, Users } from "lucide-react";
import { projectsData } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Enterprise Application": Sparkles,
  "Social Impact": Users,
};

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeader
          label="Projects"
          title="What I've built"
          description="Featured projects showcasing technical depth and real-world impact"
        />

        <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project) => {
            const TypeIcon = typeIcons[project.type] || Sparkles;
            return (
              <StaggerItem key={project.title}>
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">
                            {project.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-muted-foreground">{project.subtitle}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        asChild
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <ArrowUpRight className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Impact */}
                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Impact
                      </h4>
                      <ul className="space-y-2">
                        {project.impact.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="pt-4 border-t border-border mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* View more CTA */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Button variant="outline" asChild className="gap-2">
              <a
                href="https://github.com/adeshsrivastava-ofc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                View more on GitHub
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
