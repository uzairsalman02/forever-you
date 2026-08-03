"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { LuxuryCake } from "@/components/cake/LuxuryCake";
import { CelebrationOverlay } from "./CelebrationOverlay";
import { playHappyBirthdayMusicBox } from "@/utils/audio";

interface CelebrationSceneProps {
  onReplayClick?: () => void;
}

export function CelebrationScene({ onReplayClick }: CelebrationSceneProps) {
  const [isLit, setIsLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [hasBlown, setHasBlown] = useState(false);

  const [isCut, setIsCut] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Action 1: Blow Candle
  const handleBlowCandle = () => {
    if (isBlowing || hasBlown) return;
    setIsBlowing(true);
    setIsDimmed(true);

    setTimeout(() => {
      setIsLit(false);
      setIsBlowing(false);
      setHasBlown(true);

      // Restore room brightness after 1 second
      setTimeout(() => {
        setIsDimmed(false);
      }, 1000);
    }, 600);
  };

  // Action 2: Cut Cake & Celebrate
  const handleCutCake = () => {
    if (isCut) return;
    setIsCut(true);
    setIsCelebrating(true);

    // Play Happy Birthday Web Audio music box melody
    playHappyBirthdayMusicBox();

    // Transition to final emotional message after 2.5s
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 2800);
  };

  // Action 3: Replay
  const handleReplay = () => {
    if (onReplayClick) {
      onReplayClick();
    } else {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="cake-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 bg-background select-none overflow-hidden"
    >
      {/* Background Floating Particles */}
      <FloatingParticles />

      {/* Falling Hearts & Sparkles Celebration Overlay */}
      {isCelebrating && <CelebrationOverlay />}

      {/* Brief Room Dim Overlay */}
      <AnimatePresence>
        {isDimmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black pointer-events-none z-40"
          />
        )}
      </AnimatePresence>

      {!showFinalMessage ? (
        /* CAKE & WISH STAGE */
        <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-8">
          {/* Text Above Cake */}
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-3 font-medium">
            Make A Wish
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight leading-snug mb-8">
            Make a Wish <span className="text-rose-500">❤️</span>
          </h2>

          {/* Interactive Luxury Cake */}
          <div className="my-6">
            <LuxuryCake isLit={isLit} isCut={isCut} isBlowing={isBlowing} />
          </div>

          {/* Subtitle Below Cake */}
          <p className="font-serif text-lg sm:text-xl font-normal italic text-zinc-600 mb-10">
            I've already made mine...
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center min-h-[60px]">
            {!hasBlown ? (
              <button
                onClick={handleBlowCandle}
                disabled={isBlowing}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Blow the Candle 🕯️
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </button>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                onClick={handleCutCake}
                disabled={isCut}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Cut the Cake <span className="text-rose-500">❤️</span>
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        /* FINAL EMOTIONAL MESSAGE STAGE */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto py-12 px-4"
        >
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-light text-zinc-900 tracking-tight leading-tight mb-8">
            Happy Birthday <span className="text-rose-500">❤️</span>
          </h2>

          <p className="font-serif text-xl sm:text-2xl font-normal italic text-zinc-700 leading-relaxed mb-10">
            Thank you for being the most beautiful part of my life.
          </p>

          <div className="font-sans text-sm sm:text-base font-normal tracking-widest uppercase text-zinc-600 leading-loose mb-14 space-y-3">
            <p>I'll keep choosing you.</p>
            <p>Today.</p>
            <p>Tomorrow.</p>
            <p className="text-zinc-900 font-medium">Forever.</p>
          </div>

          <button
            onClick={handleReplay}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read It Again <span className="text-rose-500">❤️</span>
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
