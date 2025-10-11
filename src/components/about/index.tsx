"use client";

import React from "react";
import { Briefcase, FolderGit, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const About = () => {
  const sectionRef = useScrollAnimation(".about-card");
  return (
    <section
      ref={sectionRef}
      className="container mx-auto py-20 px-4"
      id="sobre"
    >
      <div className="grid grid-cols-1 gap-16 items-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-primary">SOBRE MIM</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-4xl mx-auto">
            Desenvolvedor com 3 anos de experiência em front-end e 2 anos como
            desenvolvedor full-stack. Já projetei e construí sistemas completos
            tanto de forma independente quanto em ambientes colaborativos de
            equipe. Sou movido pela inovação e prospero em projetos que desafiam
            o comum.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg text-center about-card">
              <Briefcase size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold">Experiência</h3>
              <p className="text-muted-foreground">3+ anos</p>
            </div>
            <div
              className="bg-card p-6 rounded-lg text-center about-card"
              style={{ transitionDelay: "150ms" }}
            >
              <FolderGit size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold">Projetos</h3>
              <p className="text-muted-foreground">15+ completos</p>
            </div>
            <div
              className="bg-card p-6 rounded-lg text-center about-card"
              style={{ transitionDelay: "300ms" }}
            >
              <Users size={40} className="mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-bold">Clientes</h3>
              <p className="text-muted-foreground">20+ satisfeitos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
