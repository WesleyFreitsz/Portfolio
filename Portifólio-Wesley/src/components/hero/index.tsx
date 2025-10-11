"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      gsap.fromTo(
        ".profile-image",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          delay: 0.5,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="container mx-auto min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold hero-element text-foreground">
            Olá, eu sou o <br />
            <span className="text-primary">Wesley Junior :)</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground hero-element">
            Desenvolvedor Fullstack | React.js | Next.js | Node.js
          </p>
          <div className="mt-8 flex gap-4 justify-center md:justify-start hero-element">
            <a
              href="#contato"
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Entrar em contato
            </a>
            <a
              href="/curriculo.pdf"
              download
              className="px-6 py-3 bg-card hover:bg-muted text-foreground font-semibold rounded-lg transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="relative profile-image">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary-light to-primary-dark rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full p-2 bg-background">
              <Image
                src="/perfil.jpg"
                alt="Foto do Wesley Junior"
                width={400}
                height={400}
                className="rounded-full object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
