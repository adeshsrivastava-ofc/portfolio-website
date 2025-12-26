"use client";

import { MapPin, Award, GraduationCap, Camera, PenTool, Plane } from "lucide-react";
import { aboutData, educationData, achievementsData } from "@/config/site";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  award: Award,
  graduation: GraduationCap,
  medal: Award,
};

const funFactIcons = [Camera, PenTool, Plane];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="section-container">
        <SectionHeader
          label="About"
          title="Building the future, one commit at a time"
          description={aboutData.headline}
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <FadeIn delay={0.2}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {aboutData.summary}
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {aboutData.description}
              </div>
            </FadeIn>

            {/* Values */}
            <FadeIn delay={0.4}>
              <div className="pt-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  What I value
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.values.map((value) => (
                    <span
                      key={value}
                      className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {/* Education Card */}
            <FadeIn delay={0.3} direction="left">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-secondary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{educationData.degree}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {educationData.institution}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {educationData.period}
                      </p>
                      <p className="text-sm font-medium text-primary mt-2">
                        {educationData.achievement}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Achievements */}
            <StaggerContainer staggerDelay={0.1} className="space-y-3">
              {achievementsData.map((achievement) => {
                const Icon = iconMap[achievement.icon] || Award;
                return (
                  <StaggerItem key={achievement.title}>
                    <Card className="bg-card/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded-md bg-secondary shrink-0">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Fun Facts */}
            <FadeIn delay={0.6} direction="left">
              <Card className="bg-card/50">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                    Beyond coding
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {aboutData.funFacts.map((fact, index) => {
                      const Icon = funFactIcons[index] || Camera;
                      return (
                        <span
                          key={fact}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {fact}
                        </span>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Location */}
            <FadeIn delay={0.7} direction="left">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
