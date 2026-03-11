"use client";

import React, { useEffect, useRef } from "react";

export const GridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const spacing = 44;
    const maxDist = 140;

    type Dot = { x: number; y: number; bx: number; by: number; s: number };
    let dots: Dot[] = [];

    const createDots = () => {
      dots = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            bx: c * spacing,
            by: r * spacing,
            s: 1,
          });
        }
      }
    };

    createDots();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createDots();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dots) {
        const dx = mx - dot.bx;
        const dy = my - dot.by;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          const angle = Math.atan2(dy, dx);
          dot.x = dot.bx - Math.cos(angle) * force * 22;
          dot.y = dot.by - Math.sin(angle) * force * 22;
          dot.s = 1 + force * 2.5;
        } else {
          dot.x += (dot.bx - dot.x) * 0.12;
          dot.y += (dot.by - dot.y) * 0.12;
          dot.s += (1 - dot.s) * 0.12;
        }

        const opacity =
          dist < maxDist ? 0.12 + ((maxDist - dist) / maxDist) * 0.55 : 0.07;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, Math.max(0.5, dot.s * 0.9), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 111, 247, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};
