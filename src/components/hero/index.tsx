"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDown } from "lucide-react";
import { useScroll } from "@/contexts/scroll-context";

const ROLES = [
  "Desenvolvedor Fullstack",
  "React & Next.js",
  "Node.js & APIs",
  "UI/UX Enthusiast",
];

export const Hero = () => {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { locoScroll } = useScroll();

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

  // Typewriter
  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        65,
      );
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.4",
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5",
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.4",
        )
        .fromTo(
          ".profile-image",
          { opacity: 0, scale: 0.85, filter: "blur(16px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=1",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="container mx-auto min-h-screen flex items-center justify-center px-4 pt-24 md:pt-0 relative"
      id="hero"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-6xl mx-auto">
        {/* Text */}
        <div className="text-center md:text-left order-2 md:order-1">
          <div
            className="hero-label inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass text-sm font-medium"
            style={{ color: "var(--primary-light)" }}
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            Disponível para novos projetos
          </div>

          <h1
            className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Olá, eu sou{" "}
            <span className="block text-gradient mt-1">Wesley Junior</span>
          </h1>

          <div className="hero-sub h-8 flex items-center justify-center md:justify-start mb-8">
            <span
              className="text-lg md:text-xl"
              style={{ color: "var(--muted-foreground)" }}
            >
              {displayed}
              <span className="typewriter-cursor" />
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => scrollTo("contato")}
              className="hero-cta px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-dark), var(--primary))",
                boxShadow: "0 4px 24px rgba(124,111,247,0.35)",
              }}
            >
              Entrar em contato
            </button>
            <a
              href="/curriculo.pdf"
              download
              className="hero-cta px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 glass"
              style={{ color: "var(--foreground)" }}
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center items-center order-1 md:order-2">
          <div className="profile-image relative float">
            {/* Glow rings */}
            <div
              className="absolute inset-0 rounded-full opacity-60"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,111,247,0.4) 0%, transparent 70%)",
                transform: "scale(1.3)",
                filter: "blur(20px)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -inset-3 rounded-full opacity-40"
              style={{
                border: "1px solid rgba(167,139,250,0.4)",
                animation: "ping 3s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            {/* Photo */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-1.5 glass glow">
              <Image
                src="/perfil.jpg"
                alt="Wesley Junior"
                width={400}
                height={400}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo("sobre")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm opacity-50 hover:opacity-100 transition-opacity bg-transparent border-none"
        style={{ color: "var(--muted-foreground)" }}
      >
        <span>scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </button>
    </section>
  );
};
