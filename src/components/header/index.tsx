"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LinkedinIcon, GithubIcon, Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useScroll } from "@/contexts/scroll-context";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locoScroll } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Também escuta o evento do Locomotive
    const scrollEl = document.querySelector("[data-scroll-container]");
    if (scrollEl) {
      const onLocoScroll = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const y = (locoScroll as any)?.instance?.scroll?.y ?? 0;
        setScrolled(y > 40);
      };
      scrollEl.addEventListener("scroll", onLocoScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        scrollEl.removeEventListener("scroll", onLocoScroll);
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [locoScroll]);

  const scrollTo = useCallback(
    (id: string, closeMenu = false) => {
      if (closeMenu) setIsMenuOpen(false);

      const target = document.getElementById(id);
      if (!target) return;

      if (locoScroll) {
        // Locomotive Scroll: passa o elemento diretamente
        locoScroll.scrollTo(target, { offset: -80, duration: 1200 });
      } else {
        // Fallback nativo
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    },
    [locoScroll],
  );

  const navLinks = [
    { name: "Sobre", id: "sobre" },
    { name: "Habilidades", id: "habilidades" },
    { name: "Portfólio", id: "portfolio" },
    { name: "Contato", id: "contato" },
  ];

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? "var(--card)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px) saturate(160%)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border)"
          : "1px solid transparent",
        padding: scrolled ? "12px 24px" : "20px 24px",
      }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo — rola para o topo */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-2xl font-extrabold tracking-tight transition-colors hover:opacity-80 bg-transparent border-none"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            color: "var(--foreground)",
          }}
        >
          WJ<span style={{ color: "var(--primary)" }}>.</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium transition-all duration-200 hover:opacity-100 relative group bg-transparent border-none"
              style={{ color: "var(--muted-foreground)" }}
            >
              {link.name}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] group-hover:w-full transition-all duration-300 rounded-full"
                style={{ background: "var(--primary)" }}
              />
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/wesleyfreitasz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center transition-all duration-200 hover:scale-110"
            style={{ color: "var(--muted-foreground)" }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="https://github.com/WesleyFreitsz"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center transition-all duration-200 hover:scale-110"
            style={{ color: "var(--muted-foreground)" }}
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </a>
          <ThemeToggle />

          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg glass"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            style={{ color: "var(--foreground)" }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full py-6 px-6 flex flex-col gap-5"
          style={{
            background: "var(--card)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.id, true)}
              className="text-base font-medium transition-colors hover:opacity-80 text-left bg-transparent border-none"
              style={{ color: "var(--foreground)" }}
            >
              {link.name}
            </button>
          ))}
          <div
            className="flex sm:hidden items-center gap-5 pt-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <a
              href="https://www.linkedin.com/in/wesleyfreitasz/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted-foreground)" }}
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href="https://github.com/WesleyFreitsz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted-foreground)" }}
            >
              <GithubIcon size={22} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
