"use client";

import {
  Code2,
  Server,
  Palette,
  Database,
  Cloud,
  Wrench,
} from "lucide-react";
import { skillsData } from "@/config/site";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Programming Languages": Code2,
  "Backend & APIs": Server,
  "Frontend & UI": Palette,
  "Databases & ETL": Database,
  "Cloud & DevOps": Cloud,
  "Developer Tools": Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30">
      <div className="section-container">
        <SectionHeader
          label="Skills"
          title="Technologies I work with"
          description="A comprehensive toolkit for building modern, scalable applications"
        />

        <StaggerContainer
          staggerDelay={0.1}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsData.categories.map((category) => {
            const Icon = categoryIcons[category.title] || Code2;
            return (
              <StaggerItem key={category.title}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-secondary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm bg-secondary/50 text-secondary-foreground rounded-md hover:bg-secondary transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
