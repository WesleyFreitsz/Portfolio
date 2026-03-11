"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, FolderGit, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const useCounter = (target: number, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

const stats = [
  {
    icon: Briefcase,
    label: "Experiência",
    value: 3,
    suffix: "+ anos",
    delay: 0,
  },
  {
    icon: FolderGit,
    label: "Projetos",
    value: 15,
    suffix: "+ completos",
    delay: 150,
  },
  {
    icon: Users,
    label: "Clientes",
    value: 20,
    suffix: "+ satisfeitos",
    delay: 300,
  },
];

export const About = () => {
  const sectionRef = useScrollAnimation(".about-card");
  const [counting, setCounting] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const c0 = useCounter(stats[0].value, 1200, counting);
  const c1 = useCounter(stats[1].value, 1400, counting);
  const c2 = useCounter(stats[2].value, 1600, counting);
  const counts = [c0, c1, c2];

  return (
    <section
      ref={sectionRef}
      className="container mx-auto py-24 px-4"
      id="sobre"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full glass"
            style={{ color: "var(--primary-light)" }}
          >
            Quem sou eu
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <p
            className="text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Desenvolvedor com{" "}
            <strong style={{ color: "var(--foreground)" }}>
              3 anos de experiência
            </strong>{" "}
            em front-end e{" "}
            <strong style={{ color: "var(--foreground)" }}>
              2 anos como desenvolvedor full-stack
            </strong>
            . Já projetei e construí sistemas completos tanto de forma
            independente quanto em ambientes colaborativos de equipe. Sou movido
            pela inovação e prospero em projetos que desafiam o comum.
          </p>
        </div>

        <div ref={triggerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="about-card glass rounded-2xl p-8 text-center relative overflow-hidden group hover:scale-[1.03] transition-transform duration-300"
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(124,111,247,0.12), transparent 70%)",
                  }}
                />
                <Icon
                  size={36}
                  className="mx-auto mb-5"
                  style={{ color: "var(--primary)" }}
                />
                <div
                  className="text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    color: "var(--foreground)",
                  }}
                >
                  {counts[i]}
                  {stat.suffix.replace(/\d+/g, "").replace("+ ", "+")}
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {stat.label}
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--primary-light)", opacity: 0.8 }}
                >
                  {stat.suffix}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
