"use client";

import React, { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const scaleX = useSpring(0, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      scaleX.set(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer)
      scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollContainer)
        scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] origin-left"
      style={{
        height: "2px",
        scaleX,
        background:
          "linear-gradient(90deg, var(--primary-dark), var(--primary-light), var(--accent))",
        boxShadow: "0 0 12px rgba(124,111,247,0.6)",
      }}
    />
  );
};
