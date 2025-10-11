"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Github, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TechIcon } from "../tech-icons";
import { useScroll } from "@/contexts/scroll-context";

type Project = {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  technologies: string[];
};

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { locoScroll } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    if (project && locoScroll) {
      locoScroll.stop();
    } else if (locoScroll) {
      locoScroll.start();
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      if (locoScroll) {
        locoScroll.start();
      }
    };
  }, [project, onClose, locoScroll]);

  const modalContent = (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[var(--background)]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card text-foreground w-full max-w-4xl rounded-lg overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {project.title}
              </h2>
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Imagem do projeto ${project.title}`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">Descrição</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-2">
                  Tecnologias Utilizadas
                </h3>
                <div className="flex flex-wrap gap-4">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 bg-muted px-3 py-1 rounded"
                    >
                      <TechIcon tech={tech} className="text-primary" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                >
                  <LinkIcon size={18} />
                  Acessar projeto
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-zinc-700/60 dark:hover:bg-zinc-600/60 text-foreground font-semibold rounded-lg transition-colors"
                >
                  <Github size={18} />
                  Acessar repositório
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (isMounted) {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      return createPortal(modalContent, modalRoot);
    }
  }

  return null;
};
