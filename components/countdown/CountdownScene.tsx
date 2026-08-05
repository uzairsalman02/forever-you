"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CountdownDisplay } from "./CountdownDisplay";

interface CountdownSceneProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownScene({
  days,
  hours,
  minutes,
  seconds,
}: CountdownSceneProps) {
  // Generate 30 quiet, subtle background stars for the dark charcoal/navy backdrop
  const stars = useMemo(() => {
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.45,
      twinkleDuration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 text-center select-none bg-gradient-to-b from-[#111111] via-[#141b2d] to-[#1A2238] overflow-hidden">
      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 35%, rgba(0, 0, 0, 0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Light Film Texture / Noise Grain Simulation */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Quiet Starfield Backdrop (No colorful party particles, only subtle twinkling) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: s.opacity }}
            animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
            transition={{
              duration: s.twinkleDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
            style={{
              position: "absolute",
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
            }}
          />
        ))}
      </div>

      {/* Breathing Ambient Glow behind Countdown Card */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-indigo-500/15 to-amber-200/10 blur-[110px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Minimalist Dark Glassmorphism Card */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 1.4, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-6 py-12 sm:px-12 sm:py-16 rounded-3xl bg-white/[0.035] backdrop-blur-2xl border border-white/[0.09] shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
      >
        {/* Subdued Top Tagline */}
        <span className="font-sans text-xs tracking-[0.4em] uppercase text-zinc-400 mb-6 font-medium">
          Forever You — A Surprise Awaits
        </span>

        {/* Large Elegant Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-slate-100 tracking-tight leading-[1.2] mb-4">
          Some moments are worth waiting for...
        </h1>

        {/* Soft Subtitle */}
        <p className="font-serif italic text-base sm:text-lg font-normal text-slate-300/80 leading-relaxed max-w-md mb-6">
          Come back when the countdown reaches zero.
        </p>

        {/* Countdown Display Units */}
        <CountdownDisplay
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      </motion.main>
    </div>
  );
}
