"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  symbol: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  depthScale: number;
}

export function GlobalParticleEngine() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle types with exact opacity ranges
    const particleTypes = [
      { symbol: "❤️", minOpacity: 0.15, maxOpacity: 0.35, minSize: 14, maxSize: 22 },
      { symbol: "🌸", minOpacity: 0.1, maxOpacity: 0.25, minSize: 12, maxSize: 20 },
      { symbol: "⭐", minOpacity: 0.08, maxOpacity: 0.2, minSize: 10, maxSize: 16 },
      { symbol: "🦆", minOpacity: 0.08, maxOpacity: 0.15, minSize: 12, maxSize: 18 },
      { symbol: "✨", minOpacity: 0.05, maxOpacity: 0.15, minSize: 10, maxSize: 16 },
    ];

    // Adapt count for mobile vs desktop
    const count = width < 768 ? 16 : 30;

    const particles: Particle[] = Array.from({ length: count }).map(() => {
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      const depthScale = 0.5 + Math.random() * 0.7; // Depth layer 0.5x - 1.2x speed
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: (0.15 + Math.random() * 0.3) * depthScale,
        speedX: (Math.random() * 0.2 - 0.1) * depthScale,
        size: type.minSize + Math.random() * (type.maxSize - type.minSize),
        symbol: type.symbol,
        opacity: type.minOpacity + Math.random() * (type.maxOpacity - type.minOpacity),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.01 - 0.005) * depthScale,
        depthScale,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      // Pause loop if document tab is inactive
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        // Wrap around vertically & horizontally
        if (p.y > height + 20) p.y = -20;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
