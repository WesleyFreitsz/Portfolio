"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ProjectModal, TechIcon } from "..";
import { useScroll } from "@/contexts/scroll-context";

const projectsData = [
  {
    title: "FitMind AI",
    description:
      "FitMind AI é um aplicativo fullstack de fitness e nutrição que utiliza IA para ajudar os usuários a monitorar sua dieta, registrar exercícios e obter insights personalizados. Ele possui um chatbot para responder a perguntas sobre fitness e nutrição, um calendário para acompanhar o progresso e um sistema de autenticação completo. O front-end foi construído com React e TypeScript, e o back-end com Node.js, Express, PostgreSQL e Drizzle ORM.",
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
  },
  {
    title: "MiniBlog",
    description:
      "Projeto Fullstack de um blog simples com funções como login, logout e fazer, editar e visualizar posts. Projeto feito utilizando React(Router, Hooks, Context) e Firebase.",
    image: "/img/miniblog.png",
    github: "https://github.com/WesleyFreitsz/miniblog",
    live: "https://miniblog-sooty.vercel.app/",
    technologies: ["React", "Firebase"],
  },
  {
    title: "TopFilmes",
    description:
      "Projeto front-end, uma pagina de filmes com base na API do IMDB para classificação de filmes. Projeto feito utilizando React Javascript e Vite.",
    image: "/img/TopFilmes.jpg",
    github: "https://github.com/WesleyFreitsz/TopFilmes",
    live: "https://top-filmes.vercel.app",
    technologies: ["React", "Vite"],
  },
  {
    title: "Projeto Spiderverse",
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
  },
];

export const Projects = () => {
  const sectionRef = useScrollAnimation(".project-card");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projectsData)[0] | null
  >(null);

  const { locoScroll } = useScroll();

  const handleImageLoad = useCallback(() => {
    if (locoScroll) {
      locoScroll.update();
    }
  }, [locoScroll]);

  return (
    <>
      <section ref={sectionRef} className="py-20" id="portfolio">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-foreground">
            Meu <span className="text-primary">Portfólio</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={project.title}
                className="bg-card rounded-lg overflow-hidden group project-card cursor-pointer border-2 border-transparent hover:border-primary transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`Imagem do projeto ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <TechIcon
                          key={tech}
                          tech={tech}
                          className="text-muted-foreground text-2xl"
                        />
                      ))}
                    </div>
                    <button className="text-sm font-semibold text-primary hover:underline">
                      Ver mais
                    </button>
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
