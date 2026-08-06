"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteConfig, SubtitleItem, DEFAULT_SUBTITLES } from "@/context/SiteConfigContext";

interface CinematicShortFilmIntroProps {
  onComplete: () => void;
}

export function CinematicShortFilmIntro({ onComplete }: CinematicShortFilmIntroProps) {
  const { config } = useSiteConfig();
  const rawSubtitles = config.subtitles && config.subtitles.length > 0 ? config.subtitles : DEFAULT_SUBTITLES;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPausedBetween, setIsPausedBetween] = useState<boolean>(false);
  const [isTransitioningToGallery, setIsTransitioningToGallery] = useState<boolean>(false);

  // Generate 25 quiet background stars and 10 faint floating hearts
  const stars = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.45,
      twinkleDuration: 3.5 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 14,
      opacity: 0.08 + Math.random() * 0.08,
      floatDuration: 8 + Math.random() * 6,
      delay: Math.random() * 4,
    }));
  }, []);

  // Strict Scroll Lock while Short Film is active
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventKeys = (e: KeyboardEvent) => {
      const keysToLock = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Space",
        " ",
        "Home",
        "End",
      ];
      if (keysToLock.includes(e.key)) {
        e.preventDefault();
      }
    };

    // Lock body overflow & scroll events
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, []);

  // Subtitle presentation timer loop
  useEffect(() => {
    if (isTransitioningToGallery) return;

    if (currentIndex >= rawSubtitles.length) {
      // Finished all subtitles -> 1 second pause -> fade to black -> reveal gallery
      const timer = setTimeout(() => {
        setIsTransitioningToGallery(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 1000);
      return () => clearTimeout(timer);
    }

    const currentSub = rawSubtitles[currentIndex];
    const holdMs = (currentSub.holdDuration || 2.5) * 1000;
    const pauseAfterMs = (currentSub.pauseAfter || 0.3) * 1000;

    // Phase 1: Display current sentence for holdMs
    const displayTimer = setTimeout(() => {
      setIsPausedBetween(true);

      // Phase 2: Pause 300ms (or custom pauseAfterMs) before showing next sentence
      const pauseTimer = setTimeout(() => {
        setIsPausedBetween(false);
        setCurrentIndex((prev) => prev + 1);
      }, pauseAfterMs);

      return () => clearTimeout(pauseTimer);
    }, holdMs);

    return () => clearTimeout(displayTimer);
  }, [currentIndex, rawSubtitles, isTransitioningToGallery, onComplete]);

  // Skip Handler
  const handleSkip = () => {
    setIsTransitioningToGallery(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const currentLine = rawSubtitles[currentIndex];

  return (
    <AnimatePresence>
      {!isTransitioningToGallery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] bg-[#08080c] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden"
        >
          {/* Soft Radial Vignette Overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.92) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Light Film Grain Noise Simulation */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />

          {/* Quiet Twinkling Starfield Backdrop */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {stars.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: s.opacity }}
                animate={{ opacity: [s.opacity, s.opacity * 0.25, s.opacity] }}
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

            {/* Faint Floating Hearts (10-15% opacity) */}
            {hearts.map((h) => (
              <motion.span
                key={h.id}
                animate={{
                  y: ["0vh", "-100vh"],
                  opacity: [0, h.opacity, 0],
                  scale: [0.8, 1.1, 0.8],
                }}
                transition={{
                  duration: h.floatDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: h.delay,
                }}
                style={{
                  position: "absolute",
                  left: `${h.x}%`,
                  top: "100vh",
                  fontSize: `${h.size}px`,
                  color: "#FDA4AF",
                  opacity: h.opacity,
                }}
              >
                ♥
              </motion.span>
            ))}
          </div>

          {/* Top-Right "Skip >>" Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={handleSkip}
            className="absolute top-6 right-8 z-40 font-sans text-xs font-medium tracking-widest text-slate-200 uppercase transition-opacity px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            Skip &gt;&gt;
          </motion.button>

          {/* Single Sentence / Multiline Subtitle Presentation Container */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isPausedBetween && currentLine && (
                <motion.div
                  key={currentLine.id || currentIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.97 }}
                  transition={{
                    duration: 0.85,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-wide leading-[1.6] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-rose-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.45)] whitespace-pre-line text-center px-4">
                    {currentLine.text}
                  </h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
