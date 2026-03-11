"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 hover:scale-110"
      style={{
        background: isLight
          ? "rgba(79, 61, 200, 0.1)"
          : "rgba(124, 111, 247, 0.12)",
        border: isLight
          ? "1px solid rgba(79, 61, 200, 0.22)"
          : "1px solid rgba(124, 111, 247, 0.2)",
        color: isLight ? "#3528a0" : "var(--primary-light)",
        boxShadow: isLight ? "0 1px 4px rgba(79, 61, 200, 0.12)" : "none",
      }}
      aria-label={isLight ? "Ativar modo escuro" : "Ativar modo claro"}
      title={isLight ? "Modo escuro" : "Modo claro"}
    >
      {isLight ? (
        <Moon size={17} strokeWidth={2} />
      ) : (
        <Sun size={17} strokeWidth={2} />
      )}
    </button>
  );
};
