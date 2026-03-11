"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ProjectModal, TechIcon } from "..";
import { useScroll } from "@/contexts/scroll-context";
import { ArrowUpRight } from "lucide-react";

const projectsData = [
  {
    title: "FitMind AI",
    description:
      "FitMind AI é um aplicativo fullstack de fitness e nutrição que utiliza IA para ajudar os usuários a monitorar sua dieta, registrar exercícios e obter insights personalizados. Ele possui um chatbot para responder a perguntas sobre fitness e nutrição, um calendário para acompanhar o progresso e um sistema de autenticação completo.",
    image: "/img/fitmind.png",
    github: "https://github.com/WesleyFreitsz/FitMindAI",
    live: "https://fitmind-ai-blue.vercel.app/",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Drizzle",
    ],
    tag: "Fullstack",
  },
  {
    title: "MiniBlog",
    description:
      "Projeto Fullstack de um blog simples com funções como login, logout e fazer, editar e visualizar posts. Projeto feito utilizando React (Router, Hooks, Context) e Firebase.",
    image: "/img/miniblog.png",
    github: "https://github.com/WesleyFreitsz/miniblog",
    live: "https://miniblog-sooty.vercel.app/",
    technologies: ["React", "Firebase"],
    tag: "Fullstack",
  },
  {
    title: "TopFilmes",
    description:
      "Projeto front-end, uma página de filmes com base na API do IMDB para classificação de filmes. Projeto feito utilizando React Javascript e Vite.",
    image: "/img/TopFilmes.jpg",
    github: "https://github.com/WesleyFreitsz/TopFilmes",
    live: "https://top-filmes.vercel.app",
    technologies: ["React", "Vite"],
    tag: "Frontend",
  },
  {
    title: "Spiderverse",
    description:
      "Projeto de um carrossel de personagens do filme Miles Morales, utiliza as tecnologias React.js (v18), Next.js (v13), TypeScript (v5), Framer Motion e Tailwind.",
    image: "/img/spiderverse.jpeg",
    github: "https://github.com/WesleyFreitsz/Spiderverse-DIO/tree/main",
    live: "https://spiderverse-dio.vercel.app/",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "TailwindCSS",
    ],
    tag: "Frontend",
  },
];

export const Projects = () => {
  const sectionRef = useScrollAnimation(".project-card");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);
  const { locoScroll } = useScroll();

  const handleImageLoad = useCallback(() => {
    if (locoScroll) locoScroll.update();
  }, [locoScroll]);

  return (
    <>
      <section ref={sectionRef} className="py-24" id="portfolio">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full glass"
              style={{ color: "var(--primary-light)" }}
            >
              Trabalhos recentes
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                color: "var(--foreground)",
              }}
            >
              Meu <span className="text-gradient">Portfólio</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {projectsData.map((project, index) => (
              <div
                key={project.title}
                className="project-card glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-400 hover:scale-[1.02]"
                style={{
                  transitionDelay: `${index * 80}ms`,
                  border: "1px solid var(--border)",
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={handleImageLoad}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{
                      background: "rgba(10,8,18,0.6)",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    <span className="flex items-center gap-2 text-white font-semibold text-sm">
                      Ver detalhes <ArrowUpRight size={16} />
                    </span>
                  </div>
                  {/* Tag */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      background: "rgba(124,111,247,0.85)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {project.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-bold mb-3 transition-colors group-hover:text-primary"
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      color: "var(--foreground)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4 line-clamp-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <TechIcon
                          key={tech}
                          tech={tech}
                          className="text-xl"
                          style={{ color: "var(--muted-foreground)" }}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--primary-light)" }}
                    >
                      Ver mais →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
