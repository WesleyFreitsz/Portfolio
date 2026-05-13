"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Github, ExternalLink } from "lucide-react";
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
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    if (locoScroll) {
      if (project) {
        locoScroll.stop();
      } else {
        locoScroll.start();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      if (locoScroll) locoScroll.start();
    };
  }, [project, onClose, locoScroll]);

  const modalContent = (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: "rgba(10,8,18,0.85)",
            backdropFilter: "blur(10px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="w-full max-w-3xl rounded-2xl overflow-hidden relative"
            style={{
              background: "var(--card)",
              backdropFilter: "blur(24px)",
              border: "1px solid var(--border)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg transition-all hover:scale-110"
              style={{
                background: "rgba(124,111,247,0.15)",
                color: "var(--muted-foreground)",
              }}
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8 max-h-[88vh] overflow-y-auto">
              <h2
                className="text-2xl md:text-3xl font-bold mb-5 text-gradient"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {project.title}
              </h2>

              <div className="relative w-full h-52 md:h-72 mb-6 rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mb-5">
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "var(--primary-light)" }}
                >
                  Descrição
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {project.description}
                </p>
              </div>

              <div className="mb-6">
                <h3
                  className="text-sm font-semibold uppercase tracking-wider mb-3"
                  style={{ color: "var(--primary-light)" }}
                >
                  Tecnologias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                      style={{
                        background: "var(--muted)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <TechIcon
                        tech={tech}
                        className="text-base"
                        style={{ color: "var(--primary)" }}
                      />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-[1.03]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary-dark), var(--primary))",
                    boxShadow: "0 4px 20px rgba(124,111,247,0.3)",
                  }}
                >
                  <ExternalLink size={16} />
                  Acessar projeto
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.03]"
                  style={{
                    background: "var(--muted)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Github size={16} />
                  Ver código
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
    if (modalRoot) return createPortal(modalContent, modalRoot);
  }

  return null;
};
