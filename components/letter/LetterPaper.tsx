"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LETTER_CONFIG } from "@/content/letterConfig";

interface LetterPaperProps {
  onSurpriseClick?: () => void;
}

export function LetterPaper({ onSurpriseClick }: LetterPaperProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        staggerChildren: 0.45,
        delayChildren: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[700px] mx-auto bg-[#FAF6EE] p-8 sm:p-12 md:p-16 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(180,140,110,0.16)] border border-[#EFE7D8] select-none overflow-hidden my-6"
    >
      {/* Subtle Paper Texture Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-200/50 via-amber-200/60 to-rose-200/50" />

      {/* Letter Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center max-w-xl mx-auto"
      >
        {/* Calligraphy Letter Heading */}
        <motion.h2
          variants={paragraphVariants}
          className="font-calligraphy text-5xl sm:text-6xl md:text-7xl font-normal text-zinc-900 tracking-tight leading-tight mb-8 text-rose-950/90 drop-shadow-sm"
        >
          {LETTER_CONFIG.title}
        </motion.h2>

        {/* Paragraph-by-Paragraph Reveal Stream */}
        <div className="w-full space-y-6 sm:space-y-8 text-left mb-12">
          {LETTER_CONFIG.paragraphs.map((p) => (
            <motion.div
              key={p.id}
              variants={paragraphVariants}
              className="group relative"
            >
              {/* Optional Small Marker Indicator */}
              <span className="font-sans text-[10px] tracking-widest text-rose-400/80 uppercase font-semibold block mb-1">
                {p.marker}
              </span>
              {/* Body Text */}
              <p className="font-serif text-base sm:text-lg font-normal text-zinc-800 leading-[1.9] tracking-wide whitespace-pre-line">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Sign-off Decorative Accent */}
        <motion.div variants={paragraphVariants} className="mb-12">
          <span className="font-calligraphy text-3xl sm:text-4xl text-rose-800/90 block">
            With all my love ❤️
          </span>
        </motion.div>

        {/* Bottom Button to Next Scene */}
        <motion.div variants={paragraphVariants}>
          <button
            onClick={onSurpriseClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.14)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {LETTER_CONFIG.buttonText}
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
