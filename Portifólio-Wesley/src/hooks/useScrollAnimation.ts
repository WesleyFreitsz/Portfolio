"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (selector: string) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const elements = gsap.utils.toArray(selector, container);

      elements.forEach((el) => {
        gsap.from(el as gsap.DOMTarget, {
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el as gsap.DOMTarget,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  }, [selector]);

  return containerRef;
};
