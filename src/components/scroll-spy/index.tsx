"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "@/contexts/scroll-context";

const sections = [
  { id: "hero", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "habilidades", label: "Skills" },
  { id: "portfolio", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const { locoScroll } = useScroll();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "hero");
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    // Garante que a seção hero tem id
    const heroSection = document.querySelector("section:first-of-type");
    if (heroSection && !heroSection.id) heroSection.id = "hero";

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Visibilidade do spy — escuta scroll nativo e do Locomotive
    const handleScroll = () => setIsVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Locomotive emite evento "scroll" no container
    const scrollEl = document.querySelector("[data-scroll-container]");
    const handleLocoScroll = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const y = (locoScroll as any)?.instance?.scroll?.y ?? 0;
      setIsVisible(y > 200);
    };
    if (scrollEl) scrollEl.addEventListener("scroll", handleLocoScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollEl) scrollEl.removeEventListener("scroll", handleLocoScroll);
    };
  }, [locoScroll]);

  const scrollTo = useCallback(
    (id: string) => {
      const target = document.getElementById(id);
      if (!target) return;

      if (locoScroll) {
        locoScroll.scrollTo(target, { offset: -80, duration: 1200 });
      } else {
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    },
    [locoScroll],
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="group relative flex items-center justify-end"
              title={label}
            >
              <span
                className="absolute right-6 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none translate-x-2 group-hover:translate-x-0"
                style={{
                  background: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {label}
              </span>
              <div
                className="transition-all duration-300 rounded-full"
                style={{
                  width: activeSection === id ? 10 : 6,
                  height: activeSection === id ? 10 : 6,
                  background:
                    activeSection === id
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                  opacity: activeSection === id ? 1 : 0.4,
                  boxShadow:
                    activeSection === id
                      ? "0 0 10px rgba(124,111,247,0.7)"
                      : "none",
                }}
              />
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
