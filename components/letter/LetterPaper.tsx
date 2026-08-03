"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LetterPaperProps {
  onSurpriseClick?: () => void;
}

export function LetterPaper({ onSurpriseClick }: LetterPaperProps) {
  const handleButtonClick = () => {
    if (onSurpriseClick) {
      onSurpriseClick();
    } else {
      const nextSection = document.getElementById("cake-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-[700px] bg-[#FAF6EE] p-8 sm:p-12 md:p-16 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(180,140,110,0.12)] border border-amber-900/10 text-left select-none relative"
    >
      {/* Decorative top letter border line */}
      <div className="w-12 h-[2px] bg-rose-300/40 mb-8 mx-auto" />

      {/* Placeholder Paragraph 1 */}
      <motion.p
        variants={paragraphVariants}
        className="font-serif text-lg sm:text-xl md:text-2xl font-light text-zinc-800 leading-[1.8] mb-8"
      >
        <span className="block text-xs font-sans tracking-widest text-rose-400/80 uppercase mb-2">
          [Paragraph 1]
        </span>
        {"My Dearest,\nWriting this down because some feelings are too grand for ordinary words. From the day you entered my life, everything took on a warmer, brighter light."}
      </motion.p>

      {/* Placeholder Paragraph 2 */}
      <motion.p
        variants={paragraphVariants}
        className="font-serif text-lg sm:text-xl md:text-2xl font-light text-zinc-800 leading-[1.8] mb-8"
      >
        <span className="block text-xs font-sans tracking-widest text-rose-400/80 uppercase mb-2">
          [Paragraph 2]
        </span>
        {"Every laugh we have shared, every quiet moment side by side, and every memory we have built has become my greatest treasure. You make every day feel like a beautiful gift."}
      </motion.p>

      {/* Placeholder Paragraph 3 */}
      <motion.p
        variants={paragraphVariants}
        className="font-serif text-lg sm:text-xl md:text-2xl font-light text-zinc-800 leading-[1.8] mb-12"
      >
        <span className="block text-xs font-sans tracking-widest text-rose-400/80 uppercase mb-2">
          [Paragraph 3]
        </span>
        {"Thank you for being you, for changing my world in ways I never thought possible. Forever and always, my heart belongs to you."}
      </motion.p>

      {/* Ending Button */}
      <motion.div
        variants={paragraphVariants}
        className="flex flex-col items-center pt-6 border-t border-amber-900/10"
      >
        <button
          onClick={handleButtonClick}
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2">
            There's One More Surprise <span className="text-rose-500">❤️</span>
          </span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </button>
      </motion.div>
    </motion.article>
  );
}
