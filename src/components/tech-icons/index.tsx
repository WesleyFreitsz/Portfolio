import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiFirebase,
  SiVite,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiNestjs,
  SiMysql,
  SiGit,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiDrizzle,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

interface TechIconProps {
  tech: string;
  className?: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Firebase: SiFirebase,
  Vite: SiVite,
  TailwindCSS: SiTailwindcss,
  "Framer Motion": SiFramer,
  Javascript: SiJavascript,
  Angular: SiAngular,
  "Nest.js": SiNestjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  Drizzle: SiDrizzle,
  MySQL: SiMysql,
  SQLServer: FaDatabase,
  Git: SiGit,
};

export const TechIcon = ({ tech, className }: TechIconProps) => {
  if (tech === "HTML/CSS") {
    return (
      <div className="flex gap-2" title={tech}>
        <SiHtml5 className={className} />
        <SiCss3 className={className} />
      </div>
    );
  }

  const IconComponent = iconMap[tech];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} title={tech} />;
};
