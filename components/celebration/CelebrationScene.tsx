"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryCake } from "@/components/cake/LuxuryCake";
import { CelebrationOverlay } from "./CelebrationOverlay";
import { useAudio } from "@/context/AudioContext";
import { playHappyBirthdayMusicBox } from "@/utils/audio";

interface CelebrationSceneProps {
  onReplayClick?: () => void;
}

export function CelebrationScene({ onReplayClick }: CelebrationSceneProps) {
  // State Machine: transition -> wish -> blow -> cut -> celebrate -> finalMessage
  const [showTransitionScreen, setShowTransitionScreen] = useState(true);

  const [isLit, setIsLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [hasBlown, setHasBlown] = useState(false);

  const [isCut, setIsCut] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const { playSound } = useAudio();

  // Soft Transition Screen timer (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTransitionScreen(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Action 1: Blow Candle
  const handleBlowCandle = () => {
    if (isBlowing || hasBlown) return;
    setIsBlowing(true);
    setIsDimmed(true);
    playSound("candleBlow");

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
    playSound("cakeCut");
    playSound("celebration");

    // Play Happy Birthday Web Audio music box melody
    playHappyBirthdayMusicBox();

    // Reveal final emotional message after celebration settles
    setTimeout(() => {
      setShowFinalMessage(true);
    }, 1800);
  };

  const handleReplay = () => {
    playSound("restart");
    if (onReplayClick) {
      onReplayClick();
    }
  };

  return (
    <section
      id="cake-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-16 px-4 sm:px-8 md:px-12 bg-transparent select-none overflow-hidden"
    >
      {/* 2.5-Second Romantic Transition Screen */}
      <AnimatePresence>
        {showTransitionScreen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#fff5f7] flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3 }}
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-zinc-800 leading-relaxed max-w-xl whitespace-pre-line"
            >
              {"Now...\nLet's celebrate the most beautiful day\nof the most beautiful person in my life. ❤️"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Room Dim Overlay when candle is blown out */}
      <AnimatePresence>
        {isDimmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-30 bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Celebration Particle Overlay (Confetti, Hearts, Fireworks, Petals) */}
      <CelebrationOverlay isCelebrating={isCelebrating} />

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center text-center my-auto">
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-2 block font-medium">
            Birthday Celebration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-zinc-900 tracking-tight">
            {!hasBlown ? "Make a Wish ❤️" : !isCut ? "Time for Cake ❤️" : "Happy Birthday ❤️"}
          </h2>
        </motion.div>

        {/* 3-Tier Luxury Birthday Cake Component */}
        <div className="my-4">
          <LuxuryCake isLit={isLit} isCut={isCut} isBlowing={isBlowing} />
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col items-center mt-6 mb-8 min-h-[60px] justify-center">
          {!hasBlown && (
            <button
              onClick={handleBlowCandle}
              disabled={isBlowing}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.14)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                Blow the Candle <span className="text-rose-500">❤️</span>
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </button>
          )}

          {hasBlown && !isCut && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              onClick={handleCutCake}
              className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.14)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Cut the Cake <span className="text-rose-500">❤️</span>
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.button>
          )}
        </div>

        {/* Final Emotional Message Container */}
        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center max-w-md mx-auto mt-6 p-6 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-md border border-rose-100 shadow-[0_12px_40px_rgba(244,114,182,0.12)]"
            >
              <h3 className="font-calligraphy text-4xl sm:text-5xl font-normal text-rose-950 mb-4">
                Happy Birthday <span className="font-sans text-3xl text-rose-500">❤️</span>
              </h3>
              <p className="font-serif text-base sm:text-lg font-normal text-zinc-700 leading-relaxed mb-4">
                Thank you for every beautiful memory.
              </p>
              <p className="font-sans text-sm sm:text-base font-normal text-zinc-600 leading-relaxed whitespace-pre-line mb-8">
                {"I still choose you...\nJust like I did in 2013.\nAnd I always will."}
              </p>

              {/* Read It Again Action Button */}
              <button
                onClick={handleReplay}
                className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white border border-rose-200 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-md hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Read It Again <span className="text-rose-500">❤️</span>
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
