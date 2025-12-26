"use client";

import { Building2, Calendar, MapPin } from "lucide-react";
import { experienceData } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-muted/30">
      <div className="section-container">
        <SectionHeader
          label="Experience"
          title="Where I've worked"
          description="Building enterprise-grade solutions at scale"
        />

        <div className="space-y-8">
          {experienceData.map((exp, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-secondary shrink-0">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{exp.title}</h3>
                          <p className="text-lg text-muted-foreground">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 text-muted-foreground">{exp.description}</p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="p-6 md:p-8 bg-secondary/30">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Key Achievements
                    </h4>
                    <StaggerContainer
                      staggerDelay={0.05}
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {exp.achievements.map((achievement, i) => (
                        <StaggerItem key={i}>
                          <div className="p-4 rounded-lg bg-background border border-border">
                            <div className="text-2xl md:text-3xl font-bold gradient-text">
                              {achievement.metric}
                            </div>
                            <p className="mt-1 text-xs md:text-sm text-muted-foreground leading-snug">
                              {achievement.label}
                            </p>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>

                  <Separator />

                  {/* Responsibilities */}
                  <div className="p-6 md:p-8">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((responsibility, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Tech Stack */}
                  <div className="p-6 md:p-8">
                    <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
