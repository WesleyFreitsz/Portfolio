"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LinkedinIcon, GithubIcon, Menu, X } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-background/50 backdrop-blur-sm">
      <div className="flex-shrink-0">
        <Link
          href="/"
          className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          WJ.
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/wesleyfreitasz/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors hidden sm:inline-block"
        >
          <LinkedinIcon size={24} />
        </a>
        <a
          href="https://github.com/WesleyFreitsz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors hidden sm:inline-block"
        >
          <GithubIcon size={24} />
        </a>
        <ThemeToggle />

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-card md:hidden flex flex-col items-center p-4 shadow-lg">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)} 
              >
                {link.name}
              </a>
            ))}
            <div className="flex sm:hidden items-center gap-6 mt-4">
              <a
                href="https://www.linkedin.com/in/wesleyfreitasz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href="https://github.com/WesleyFreitsz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors"
              >
                <GithubIcon size={24} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
