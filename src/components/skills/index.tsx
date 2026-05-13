"use client";

import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TechIcon } from "..";

const allSkills = [
  { name: "Javascript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "HTML/CSS", category: "frontend" },
  { name: "TailwindCSS", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Prisma", category: "backend" },
  { name: "Nest.js", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "SQLite", category: "database" },
  { name: "Drizzle", category: "database" },
  { name: "SQLServer", category: "database" },
  { name: "Firebase", category: "tools" },
  { name: "Git", category: "tools" },
];

const categories = ["todos", "frontend", "backend", "database", "tools"];
const categoryLabels: Record<string, string> = {
  todos: "Todos",
  frontend: "Frontend",
  backend: "Backend",
  database: "Banco de Dados",
  tools: "Ferramentas",
};

export const Skills = () => {
  const sectionRef = useScrollAnimation(".skill-card");
  const [active, setActive] = useState("todos");

  const filtered =
    active === "todos"
      ? allSkills
      : allSkills.filter((s) => s.category === active);

  return (
    <section ref={sectionRef} className="py-24" id="habilidades">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full glass"
            style={{ color: "var(--primary-light)" }}
          >
            Stack técnica
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Minhas <span className="text-gradient">Habilidades</span>
          </h2>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: active === cat ? "var(--primary)" : "var(--card)",
                color: active === cat ? "#fff" : "var(--muted-foreground)",
                border: `1px solid ${active === cat ? "var(--primary)" : "var(--border)"}`,
                backdropFilter: "blur(12px)",
                transform: active === cat ? "scale(1.05)" : "scale(1)",
              }}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {filtered.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3 group relative overflow-hidden transition-all duration-300 hover:scale-[1.08]"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 0%, rgba(124,111,247,0.2), transparent 70%)",
                }}
              />
              <TechIcon
                tech={skill.name}
                className="text-4xl md:text-5xl transition-colors duration-300 group-hover:text-primary"
                style={{ color: "var(--muted-foreground)" }}
              />
              <span
                className="text-[10px] font-medium text-center leading-tight opacity-60 group-hover:opacity-90 transition-opacity"
                style={{ color: "var(--foreground)" }}
              >
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
