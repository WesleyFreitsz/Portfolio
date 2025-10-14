"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import { TechIcon } from "..";

const allSkills = [
  "Javascript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "HTML/CSS",
  "Nest.js",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MySQL",
  "Drizzle",
  "SQLServer",
  "Git",
  "Firebase",
  "Vite",
  "TailwindCSS",
  "Framer Motion",
];

export const Skills = () => {
  const sectionRef = useScrollAnimation(".skill-card");
  return (
    <section ref={sectionRef} className="py-20" id="habilidades">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          Minhas <span className="text-primary">Habilidades</span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-4xl mx-auto justify-center">
          {allSkills.map((skill, index) => (
            <div
              key={skill}
              className="bg-card p-6 rounded-lg flex items-center justify-center skill-card"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <TechIcon
                tech={skill}
                className="text-4xl md:text-5xl text-muted-foreground"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
