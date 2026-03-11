import React from "react";
import { LinkedinIcon, GithubIcon, Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-10 mt-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--muted-foreground)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 700,
              color: "var(--foreground)",
            }}
          >
            WJ.
          </span>
          <span>© {currentYear} Wesley Junior.</span>
        </div>

        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          Feito com{" "}
          <Heart
            size={12}
            style={{ color: "var(--primary)" }}
            fill="var(--primary)"
          />{" "}
          em React & Next.js
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/wesleyfreitasz/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--muted-foreground)" }}
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="https://github.com/WesleyFreitsz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "var(--muted-foreground)" }}
            aria-label="GitHub"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};
