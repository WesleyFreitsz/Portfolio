"use client";

import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll } from "@/contexts/scroll-context";
import type LocomotiveScroll from "locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = () => {
  const { setLocoScroll } = useScroll();

  useEffect(() => {
    let locoScroll: LocomotiveScroll | null = null;

    const scrollUpdateHandler = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    const initScroll = async () => {
      const LocomotiveScrollModule = (await import("locomotive-scroll"))
        .default;
      const scrollEl = document.querySelector<HTMLElement>(
        "[data-scroll-container]"
      );

      if (scrollEl) {
        locoScroll = new LocomotiveScrollModule({
          el: scrollEl,
          smooth: true,
          lerp: 0.08,
        });

        setLocoScroll(locoScroll);

        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollEl, {
          scrollTop(value) {
            if (locoScroll) {
              if (arguments.length && typeof value === "number") {
                return locoScroll.scrollTo(value, {
                  duration: 0,
                  disableLerp: true,
                });
              }
              // FIX: Disable the 'no-explicit-any' rule for this specific line
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              return (locoScroll as any).instance.scroll.y;
            }
            return null;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          pinType: scrollEl.style.transform ? "transform" : "fixed",
        });

        ScrollTrigger.addEventListener("refresh", scrollUpdateHandler);
        ScrollTrigger.refresh();
      }
    };

    initScroll();

    return () => {
      if (locoScroll) {
        ScrollTrigger.removeEventListener("refresh", scrollUpdateHandler);
        locoScroll.destroy();
        locoScroll = null;
        setLocoScroll(null);
      }
    };
  }, [setLocoScroll]);

  return null;
};
