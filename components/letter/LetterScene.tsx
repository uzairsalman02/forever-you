"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaxSeal } from "./WaxSeal";
import { LetterPaper } from "./LetterPaper";

interface LetterSceneProps {
  onSurpriseClick?: () => void;
}

export function LetterScene({ onSurpriseClick }: LetterSceneProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Sequence: Wax seal breaks -> flap opens -> letter slides up
    setTimeout(() => {
      setIsOpen(true);
    }, 1200);
  };

  return (
    <section
      id="letter-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 md:px-12 bg-[#FCF9F2] select-none overflow-hidden"
    >
      {/* Header Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
        <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-3 font-medium">
          Love Letter
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight leading-snug">
          A Letter From My Heart
        </h2>
      </div>

      {/* Envelope & Letter Container */}
      <div className="relative z-10 w-full max-w-[700px] flex flex-col items-center min-h-[450px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED ENVELOPE STAGE */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.8 } }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[520px] aspect-[1.5/1] bg-[#F7F2E6] rounded-2xl shadow-[0_15px_40px_rgba(180,140,110,0.15)] border border-amber-900/10 flex flex-col items-center justify-between p-8 overflow-hidden cursor-pointer group"
              onClick={handleOpenLetter}
            >
              {/* Envelope Triangular Top Flap */}
              <motion.div
                animate={
                  isOpening
                    ? { rotateX: 180, zIndex: 0 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#F2EBDA] border-b border-amber-900/10 [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-sm"
              />

              {/* Wax Seal Centered on Flap */}
              <motion.div
                animate={
                  isOpening
                    ? { scale: 1.3, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.6 }}
                className="absolute top-[38%] z-30"
              >
                <WaxSeal />
              </motion.div>

              {/* Envelope Body Front Pocket */}
              <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[#F7F2E6] border-t border-amber-900/10 [clip-path:polygon(0_30%,50%_0,100%_30%,100%_100%,0_100%)] z-10" />

              {/* Open Button prompt */}
              <div className="relative z-30 mt-auto mb-2">
                <button
                  disabled={isOpening}
                  className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isOpening ? "Opening..." : "Open My Letter"} <span className="text-rose-500">❤️</span>
                  </span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER STAGE */
            <motion.div
              key="letter-paper"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center"
            >
              <LetterPaper onSurpriseClick={onSurpriseClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
