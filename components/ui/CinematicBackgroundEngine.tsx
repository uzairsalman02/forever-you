"use client";

import React, { useEffect, useRef } from "react";
import { TopBunting } from "./TopBunting";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface StarParticle {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

interface HeartParticle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  isBlurred: boolean;
}

interface PetalParticle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  swayAmp: number;
  swayFreq: number;
}

interface DuckParticle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  size: number;
  opacity: number;
  rotation: number;
}

export function CinematicBackgroundEngine() {
  const { config } = useSiteConfig();
  const { effects } = config;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  // Persistent Particle Arrays initialized ONCE on mount
  const starsRef = useRef<StarParticle[]>([]);
  const heartsRef = useRef<HeartParticle[]>([]);
  const petalsRef = useRef<PetalParticle[]>([]);
  const ducksRef = useRef<DuckParticle[]>([]);
  const initializedRef = useRef(false);

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

    // Initialize particles ONLY ONCE
    if (!initializedRef.current) {
      initializedRef.current = true;

      // 1. LAYER 3: Twinkling Stars (35-50 stars)
      const starCount = width < 768 ? 25 : 45;
      starsRef.current = Array.from({ length: starCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1 + Math.random() * 2.2,
        baseOpacity: 0.15 + Math.random() * 0.45,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.025,
      }));

      // 2. LAYER 4: Floating Hearts (White, Pink, Rose Gold, Lavender)
      const heartColors = ["#FFFFFF", "#F472B6", "#FB7185", "#C084FC", "#F472B6"];
      const heartCount = width < 768 ? 14 : 28;
      heartsRef.current = Array.from({ length: heartCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: 0.25 + Math.random() * 0.45,
        speedX: Math.random() * 0.3 - 0.15,
        size: 12 + Math.random() * 12,
        color: heartColors[Math.floor(Math.random() * heartColors.length)],
        opacity: 0.15 + Math.random() * 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.012 - 0.006,
        isBlurred: Math.random() > 0.65,
      }));

      // 3. LAYER 5: Flower Petals (🌸 Sakura style)
      const petalCount = width < 768 ? 10 : 20;
      petalsRef.current = Array.from({ length: petalCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: 0.2 + Math.random() * 0.4,
        speedX: 0.1 + Math.random() * 0.25,
        size: 14 + Math.random() * 8,
        opacity: 0.12 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.015 - 0.0075,
        swayAmp: 10 + Math.random() * 15,
        swayFreq: 0.01 + Math.random() * 0.015,
      }));

      // 4. LAYER 6: Hidden Easter Egg Tiny Ducks (2 to 4 visible at a time)
      const duckCount = width < 768 ? 2 : 4;
      ducksRef.current = Array.from({ length: duckCount }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: 0.15 + Math.random() * 0.25,
        speedX: Math.random() * 0.2 - 0.1,
        size: 15 + Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.15,
        rotation: Math.random() * 0.2 - 0.1,
      }));
    }

    // Mouse Movement Handler (Desktop Only Parallax)
    const handleMouseMove = (e: MouseEvent) => {
      if (width < 768) return; // Desktop only
      const normX = (e.clientX / width - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / height - 0.5) * 2;
      mouseRef.current.targetX = normX * 18; // Max 18px offset
      mouseRef.current.targetY = normY * 18;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Helper: Draw a vector heart on Canvas
    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = opacity;
      c.fillStyle = color;

      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        size,
        0,
        size
      );
      c.bezierCurveTo(
        0,
        size,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    // Continuous Animation Loop
    const render = () => {
      // Pause animation when browser tab is inactive
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp for desktop parallax
      mouseRef.current.currentX +=
        (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY +=
        (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      const pX = mouseRef.current.currentX;
      const pY = mouseRef.current.currentY;

      ctx.clearRect(0, 0, width, height);

      // --- LAYER 3: TWINKLING STARS ---
      starsRef.current.forEach((s) => {
        s.twinklePhase += s.twinkleSpeed;
        const currentOpacity =
          s.baseOpacity + Math.sin(s.twinklePhase) * 0.25;
        const opacityClamped = Math.max(0.05, Math.min(0.9, currentOpacity));

        ctx.save();
        ctx.globalAlpha = opacityClamped;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(s.x + pX * 0.3, s.y + pY * 0.3, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // --- LAYER 4: FLOATING HEARTS ---
      heartsRef.current.forEach((h) => {
        h.y += h.speedY;
        h.x += h.speedX;
        h.rotation += h.rotationSpeed;

        if (h.y > height + 30) h.y = -30;
        if (h.x > width + 30) h.x = -30;
        if (h.x < -30) h.x = width + 30;

        drawHeart(
          ctx,
          h.x + pX * 0.6,
          h.y + pY * 0.6,
          h.size,
          h.color,
          h.opacity,
          h.rotation
        );
      });

      // --- LAYER 5: FLOWER PETALS (🌸) ---
      petalsRef.current.forEach((pt) => {
        pt.y += pt.speedY;
        pt.x += pt.speedX + Math.sin(pt.y * pt.swayFreq) * 0.5;
        pt.rotation += pt.rotationSpeed;

        if (pt.y > height + 30) pt.y = -30;
        if (pt.x > width + 30) pt.x = -30;
        if (pt.x < -30) pt.x = width + 30;

        ctx.save();
        ctx.globalAlpha = pt.opacity;
        ctx.translate(pt.x + pX * 0.8, pt.y + pY * 0.8);
        ctx.rotate(pt.rotation);
        ctx.font = `${pt.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🌸", 0, 0);
        ctx.restore();
      });

      // --- LAYER 6: TINY DUCKS (🦆 Easter Eggs) ---
      ducksRef.current.forEach((dk) => {
        dk.y += dk.speedY;
        dk.x += dk.speedX;

        if (dk.y > height + 40) dk.y = -40;
        if (dk.x > width + 40) dk.x = -40;
        if (dk.x < -40) dk.x = width + 40;

        ctx.save();
        ctx.globalAlpha = dk.opacity;
        ctx.translate(dk.x + pX, dk.y + pY);
        ctx.rotate(dk.rotation);
        ctx.font = `${dk.size}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🦆", 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* LAYER 1: 14s Dynamic Reference Shifting Gradient (From Reference HTML) */}
      <div className="fixed inset-0 animate-reference-gradient -z-40" />

      {/* LAYER 2: 10 GIANT LIVING COLOR BLOBS (Soft Romantic Luxury Palette) */}

      {/* Blob 1: Blush Pink Cloud */}
      <div
        className="fixed top-[-15%] left-[-15%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[120px] pointer-events-none animate-blob-living-1 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(244, 114, 182, 0.75) 0%, rgba(249, 168, 212, 0.4) 45%, rgba(244, 114, 182, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 2: Soft Peach Cloud */}
      <div
        className="fixed top-[-10%] right-[-15%] w-[75vw] h-[75vw] max-w-[1100px] max-h-[1100px] rounded-full blur-[130px] pointer-events-none animate-blob-living-2 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(254, 215, 170, 0.85) 0%, rgba(253, 186, 116, 0.45) 45%, rgba(254, 215, 170, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 3: Lavender Mist */}
      <div
        className="fixed top-[25%] right-[-20%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full blur-[120px] pointer-events-none animate-blob-living-3 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(216, 180, 254, 0.75) 0%, rgba(233, 213, 255, 0.4) 45%, rgba(216, 180, 254, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 4: Rose Pink Bloom */}
      <div
        className="fixed bottom-[-20%] left-[-15%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[125px] pointer-events-none animate-blob-living-4 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(251, 113, 133, 0.70) 0%, rgba(253, 164, 175, 0.4) 45%, rgba(251, 113, 133, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 5: Champagne Sunbeam */}
      <div
        className="fixed top-[20%] left-[15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[110px] pointer-events-none animate-blob-living-5 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(254, 243, 199, 0.90) 0%, rgba(253, 230, 138, 0.5) 45%, rgba(254, 243, 199, 0) 70%)",
          mixBlendMode: "soft-light",
        }}
        aria-hidden="true"
      />

      {/* Blob 6: Light Coral Warmth */}
      <div
        className="fixed bottom-[-15%] right-[-15%] w-[68vw] h-[68vw] max-w-[980px] max-h-[980px] rounded-full blur-[135px] pointer-events-none animate-blob-living-6 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(253, 164, 175, 0.75) 0%, rgba(254, 205, 211, 0.4) 45%, rgba(253, 164, 175, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 7: Warm White Radiance */}
      <div
        className="fixed top-[-15%] left-[30%] w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full blur-[100px] pointer-events-none animate-blob-living-7 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 253, 245, 0.95) 0%, rgba(255, 255, 240, 0.5) 45%, rgba(255, 253, 245, 0) 70%)",
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* Blob 8: Cream & Apricot Glow */}
      <div
        className="fixed top-[45%] left-[-18%] w-[62vw] h-[62vw] max-w-[920px] max-h-[920px] rounded-full blur-[115px] pointer-events-none animate-blob-living-8 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 237, 213, 0.85) 0%, rgba(254, 215, 170, 0.45) 45%, rgba(255, 237, 213, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 9: Romantic Violet Lavender */}
      <div
        className="fixed bottom-[-25%] left-[20%] w-[72vw] h-[72vw] max-w-[1050px] max-h-[1050px] rounded-full blur-[140px] pointer-events-none animate-blob-living-9 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(243, 232, 255, 0.85) 0%, rgba(233, 213, 255, 0.45) 45%, rgba(243, 232, 255, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Blob 10: Soft Sunset Pink */}
      <div
        className="fixed top-[12%] right-[12%] w-[58vw] h-[58vw] max-w-[880px] max-h-[880px] rounded-full blur-[120px] pointer-events-none animate-blob-living-10 -z-35"
        style={{
          background:
            "radial-gradient(circle at center, rgba(254, 205, 211, 0.80) 0%, rgba(251, 113, 133, 0.40) 45%, rgba(254, 205, 211, 0) 70%)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* LAYERS 3-6: Continuous Canvas Particle Engine (Stars, Hearts, Petals, Ducks) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-20"
        aria-hidden="true"
      />

      {/* Top Fabric Birthday Bunting Banner */}
      {effects.birthdayFlags && <TopBunting />}
    </div>
  );
}

