"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicDuckIntroProps {
  onComplete: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  rotate: number;
}

export function CinematicDuckIntro({ onComplete }: CinematicDuckIntroProps) {
  // Scene stages:
  // 1: Black screen (0.0s - 0.8s)
  // 2: Walking in from left to center (0.8s - 3.2s)
  // 3: Greeting & Speech Bubble (3.2s - 4.5s)
  // 4: Magical Hearts Burst (4.5s - 5.8s)
  // 5: Farwa Name Reveal (5.8s - 8.0s)
  // 6: Duck Exit to right (8.0s - 9.5s)
  // 7: Fade out complete (9.5s+)
  const [sceneStage, setSceneStage] = useState<number>(1);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Orchestrate timeline sequence
  useEffect(() => {
    // Stage 1 -> 2: Start Walking at 0.8s
    const timer1 = setTimeout(() => setSceneStage(2), 800);

    // Stage 2 -> 3: Reaches center at 3.2s, stops & greets
    const timer2 = setTimeout(() => setSceneStage(3), 3200);

    // Stage 3 -> 4: Trigger Magical Hearts at 4.5s
    const timer3 = setTimeout(() => {
      setSceneStage(4);
      generateMagicalHearts();
    }, 4500);

    // Stage 4 -> 5: Farwa Name Reveal at 5.8s
    const timer4 = setTimeout(() => setSceneStage(5), 5800);

    // Stage 5 -> 6: Duck Exit to right at 10.0s (+2 extra seconds hold on screen)
    const timer5 = setTimeout(() => setSceneStage(6), 10000);

    // Stage 6 -> 7: Complete at 11.5s
    const timer6 = setTimeout(() => {
      setSceneStage(7);
      onComplete();
    }, 11500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  // Occasional eye blink loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 2800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Generate 12 magical floating hearts for Scene 4
  const generateMagicalHearts = () => {
    const colors = ["#FDA4AF", "#F472B6", "#FFFFFF", "#FEF3C7", "#FB7185"];
    const newHearts: FloatingHeart[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 40,
      size: 14 + Math.random() * 12,
      color: colors[i % colors.length],
      delay: i * 0.08,
      rotate: (Math.random() - 0.5) * 40,
    }));
    setHearts(newHearts);
  };

  const isWalking = sceneStage === 2 || sceneStage === 6;
  const isFacingRight = sceneStage === 6;

  return (
    <AnimatePresence>
      {sceneStage < 7 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Subtle Glow Behind Content */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-rose-500/10 blur-[130px] pointer-events-none"
            aria-hidden="true"
          />

          {/* ==========================================
              SCENE 5: ELEGANT "✨ For Farwa ✨" REVEAL
              ========================================== */}
          <AnimatePresence>
            {sceneStage === 5 && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[16vh] sm:top-[18vh] z-20 flex flex-col items-center text-center px-4"
              >
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-sans text-xs uppercase tracking-[0.4em] text-rose-300/80 mb-3 font-medium"
                >
                  A Surprise Experience
                </motion.span>

                <h1 className="font-calligraphy text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-pink-200 to-rose-100 drop-shadow-[0_0_25px_rgba(244,114,182,0.6)] leading-tight tracking-wide">
                  ✨ For Farwa ✨
                </h1>

                <p className="font-serif italic text-sm sm:text-lg text-rose-200/90 mt-3 tracking-wide">
                  This magical moment is all for you...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ==========================================
              DUCK CONTAINER & ANIMATION (POSITIONED LOWER FOR ZERO OVERLAP)
              ========================================== */}
          <motion.div
            initial={{ x: "-60vw" }}
            animate={
              sceneStage === 1
                ? { x: "-60vw" }
                : sceneStage >= 2 && sceneStage <= 5
                ? { x: "0vw" }
                : { x: "65vw" } // Scene 6 exit right
            }
            transition={
              sceneStage === 2
                ? { duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }
                : sceneStage === 6
                ? { duration: 1.6, ease: [0.4, 0, 0.2, 1] }
                : { duration: 0 }
            }
            className="absolute bottom-[14vh] sm:bottom-[18vh] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10"
            style={{ transformOrigin: "center" }}
          >
            {/* SCENE 3: "Quack!" Speech Bubble */}
            <AnimatePresence>
              {(sceneStage === 3 || sceneStage === 4) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: -15 }}
                  exit={{ opacity: 0, scale: 0.5, y: -5 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-rose-950 font-sans font-semibold text-sm px-4 py-1.5 rounded-full shadow-[0_8px_25px_rgba(244,114,182,0.35)] border border-rose-200/80 flex items-center gap-1.5 whitespace-nowrap z-30"
                >
                  <span>Quack!</span>
                  <span className="text-rose-500 text-xs">❤️</span>
                  {/* Bubble Pointer Tail */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-rose-200/80" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SCENE 4: Magical Floating Hearts Burst */}
            <AnimatePresence>
              {(sceneStage === 4 || sceneStage === 5) && (
                <div className="absolute inset-0 pointer-events-none z-20">
                  {hearts.map((h) => (
                    <motion.span
                      key={h.id}
                      initial={{ opacity: 0, scale: 0, x: h.x, y: h.y }}
                      animate={{
                        opacity: [0, 0.95, 0],
                        scale: [0.4, 1.2, 0.8],
                        y: [h.y, h.y - 90 - Math.random() * 40],
                        x: [h.x, h.x + (Math.random() - 0.5) * 35],
                        rotate: [h.rotate, h.rotate + 20],
                      }}
                      transition={{
                        duration: 1.6,
                        delay: h.delay,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        fontSize: `${h.size}px`,
                        color: h.color,
                        left: "50%",
                        top: "30%",
                      }}
                    >
                      ♥
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* DUCK SVG & WALKING BOUNCE WRAPPER */}
            <motion.div
              animate={
                isWalking
                  ? { y: [0, -8, 0] }
                  : sceneStage === 3
                  ? { rotate: [0, 8, 4] } // Head tilt greeting
                  : { y: 0, rotate: 0 }
              }
              transition={
                isWalking
                  ? { duration: 0.32, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.5, ease: "easeOut" }
              }
              style={{
                transform: isFacingRight ? "scaleX(-1)" : "scaleX(1)",
              }}
              className="relative"
            >
              {/* ADORABLE VECTOR BABY DUCK SVG */}
              <svg
                width="130"
                height="130"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_10px_20px_rgba(244,114,182,0.25)]"
              >
                <defs>
                  {/* Body Gradient */}
                  <linearGradient id="duckBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF4B8" />
                    <stop offset="45%" stopColor="#FFD166" />
                    <stop offset="100%" stopColor="#FFB703" />
                  </linearGradient>

                  {/* Beak Gradient */}
                  <linearGradient id="duckBeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9F1C" />
                    <stop offset="100%" stopColor="#E76F51" />
                  </linearGradient>

                  {/* Blush Cheek */}
                  <radialGradient id="duckBlushGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FB7185" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Tail Fluff */}
                <path
                  d="M25 65 C14 60, 9 48, 18 43 C24 47, 28 55, 33 60 Z"
                  fill="url(#duckBodyGrad)"
                />

                {/* Duck Body */}
                <ellipse cx="55" cy="68" rx="30" ry="24" fill="url(#duckBodyGrad)" />

                {/* Duck Head */}
                <circle cx="73" cy="38" r="22" fill="url(#duckBodyGrad)" />

                {/* Crown Feather Tuft */}
                <path
                  d="M71 16 C69 8, 76 10, 74 16 C78 9, 83 13, 77 19 Z"
                  fill="url(#duckBodyGrad)"
                />

                {/* Rosy Blush Cheek */}
                <circle cx="66" cy="44" r="7.5" fill="url(#duckBlushGrad)" />

                {/* Beak */}
                <path
                  d="M87 38 C99 36, 103 45, 89 48 C85 46, 85 41, 87 38 Z"
                  fill="url(#duckBeakGrad)"
                />
                {/* Beak Gloss Highlight */}
                <path
                  d="M89 39 C95 38, 97 41, 91 42 Z"
                  fill="#FFE5D9"
                  opacity="0.8"
                />

                {/* Wing */}
                <motion.path
                  d="M44 64 C38 73, 53 80, 60 70 C63 65, 54 61, 44 64 Z"
                  fill="#FFC436"
                  animate={isWalking ? { rotate: [0, -16, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.32, repeat: Infinity }}
                  style={{ transformOrigin: "44px 64px" }}
                />

                {/* Eye */}
                <circle cx="77" cy="32" r="4.5" fill="#1E293B" />
                {/* Catchlight sparkles */}
                <circle cx="79" cy="30" r="1.8" fill="#FFFFFF" />
                <circle cx="75.5" cy="33.5" r="0.9" fill="#FFFFFF" />

                {/* Eye Blink Cover */}
                {isBlinking && (
                  <path
                    d="M72.5 32 C75 28, 79 28, 81.5 32"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}

                {/* Left Foot */}
                <motion.path
                  d="M48 88 L48 97 C43 99, 42 101, 53 101 C52 97, 52 93, 52 88 Z"
                  fill="#FF9F1C"
                  animate={
                    isWalking
                      ? { rotate: [-20, 20], y: [-3, 3] }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "48px 88px" }}
                />

                {/* Right Foot */}
                <motion.path
                  d="M61 88 L61 97 C56 99, 55 101, 66 101 C65 97, 65 93, 65 88 Z"
                  fill="#FF7B00"
                  animate={
                    isWalking
                      ? { rotate: [20, -20], y: [3, -3] }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.32, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "61px 88px" }}
                />
              </svg>
            </motion.div>

            {/* Ground Soft Radial Drop Shadow */}
            <motion.div
              animate={
                isWalking
                  ? { scaleX: [1, 0.75, 1], opacity: [0.35, 0.18, 0.35] }
                  : { scaleX: 1, opacity: 0.35 }
              }
              transition={
                isWalking
                  ? { duration: 0.32, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
              className="w-20 h-3.5 rounded-full bg-rose-950/40 blur-[5px] mt-1"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
