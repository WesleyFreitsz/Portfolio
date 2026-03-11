"use client";

import React, { useEffect, useRef, useCallback } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!cursor || !dot || !trail) return;

    const currentX = parseFloat(cursor.dataset.x || "-200");
    const currentY = parseFloat(cursor.dataset.y || "-200");
    const newX = currentX + (posRef.current.x - currentX) * 0.12;
    const newY = currentY + (posRef.current.y - currentY) * 0.12;
    cursor.dataset.x = String(newX);
    cursor.dataset.y = String(newY);
    cursor.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;

    const trailX = parseFloat(trail.dataset.x || "-200");
    const trailY = parseFloat(trail.dataset.y || "-200");
    const tnx = trailX + (posRef.current.x - trailX) * 0.06;
    const tny = trailY + (posRef.current.y - trailY) * 0.06;
    trail.dataset.x = String(tnx);
    trail.dataset.y = String(tny);
    trail.style.transform = `translate3d(${tnx}px, ${tny}px, 0) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Detecta touch — se for touch, esconde os elementos e não adiciona listeners
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!cursor || !dot || !trail) return;

    if (isTouch) {
      // Oculta permanentemente sem retornar null (evita hydration mismatch)
      cursor.style.display = "none";
      dot.style.display = "none";
      trail.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visibleRef.current) {
        visibleRef.current = true;
        cursor.style.opacity = "1";
        dot.style.opacity = "1";
        trail.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
      trail.style.opacity = "0";
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
      trail.style.opacity = "1";
    };

    const onHoverEnter = () => cursor.classList.add("cursor-hovering");
    const onHoverLeave = () => cursor.classList.remove("cursor-hovering");

    const addHoverListeners = () => {
      document
        .querySelectorAll(
          "a, button, [role='button'], input, textarea, select, .cursor-hover",
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", onHoverEnter);
          el.removeEventListener("mouseleave", onHoverLeave);
          el.addEventListener("mouseenter", onHoverEnter);
          el.addEventListener("mouseleave", onHoverLeave);
        });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Sempre renderiza os divs — display/opacity controlados pelo useEffect
  // Isso garante que servidor e cliente renderizam o mesmo HTML (sem hydration mismatch)
  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            marginLeft: -24,
            marginTop: -24,
            borderRadius: "50%",
            border: "1px solid rgba(167,139,250,0.25)",
          }}
        />
      </div>

      {/* Main ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            marginLeft: -18,
            marginTop: -18,
            borderRadius: "50%",
            border: "1.5px solid rgba(124,111,247,0.7)",
            transition:
              "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
            backdropFilter: "blur(2px)",
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          opacity: 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            marginLeft: -2.5,
            marginTop: -2.5,
            borderRadius: "50%",
            background: "var(--primary-light)",
            boxShadow: "0 0 8px rgba(167,139,250,0.8)",
          }}
        />
      </div>

      <style jsx global>{`
        .cursor-hovering > div {
          width: 52px !important;
          height: 52px !important;
          margin-left: -26px !important;
          margin-top: -26px !important;
          border-color: rgba(167, 139, 250, 0.9) !important;
          background: rgba(124, 111, 247, 0.06) !important;
        }
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};
