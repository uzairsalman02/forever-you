"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSeal } from "./WaxSeal";
import { LetterPaper } from "./LetterPaper";
import { LETTER_CONFIG } from "@/content/letterConfig";
import { useAudio } from "@/context/AudioContext";

interface LetterSceneProps {
  onSurpriseClick?: () => void;
}

export function LetterScene({ onSurpriseClick }: LetterSceneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const { playSound } = useAudio();

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    playSound("waxSeal");
    playSound("envelope");

    // Sequence: Wax seal breaks -> flap opens -> letter slides up
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 1200);
  };

  return (
    <section
      id="letter-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-8 bg-transparent select-none overflow-hidden"
    >

      {/* Header Container (Visible before opening) */}
      {!isOpen && (
        <motion.div
          animate={isOpening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto mb-10"
        >
          <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-3 font-medium">
            {LETTER_CONFIG.tagline}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-zinc-900 tracking-tight leading-snug">
            {LETTER_CONFIG.title}
          </h2>
        </motion.div>
      )}

      {/* Main Envelope / Stationery Container */}
      <div className="relative z-10 w-full max-w-[750px] mx-auto flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* LUXURY CREAM PAPER ENVELOPE */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="relative w-full max-w-[580px] bg-[#F7F2E6] rounded-2xl shadow-[0_20px_50px_rgba(180,140,110,0.18)] border border-[#EFE7D8] p-8 sm:p-12 flex flex-col items-center text-center overflow-hidden my-6"
            >
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#EFE7D8]/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center my-8">
                {/* Wax Seal Component */}
                <div className="mb-8 cursor-pointer" onClick={handleOpenLetter}>
                  <WaxSeal isBreaking={isOpening} />
                </div>

                <p className="font-serif text-base sm:text-lg italic text-zinc-600 mb-8 max-w-xs">
                  A personal message written just for you...
                </p>

                {/* Open Letter Action Button */}
                <button
                  onClick={handleOpenLetter}
                  disabled={isOpening}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.14)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isOpening ? "Opening Letter..." : "Open My Letter"}{" "}
                    <span className="text-rose-500">❤️</span>
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* OPENED STATIONERY LETTER PAPER */
            <LetterPaper
              key="letter-paper"
              onSurpriseClick={onSurpriseClick}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
