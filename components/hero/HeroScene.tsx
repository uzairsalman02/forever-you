"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

interface HeroSceneProps {
  onOpenGift?: () => void;
}

export function HeroScene({ onOpenGift }: HeroSceneProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const handleButtonClick = () => {
    if (onOpenGift) {
      onOpenGift();
    } else {
      const targetSection =
        document.getElementById("memory-vault") ||
        document.getElementById("next-section");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-background">
      {/* Ambient background particles */}
      <FloatingParticles />

      {/* Hero Content Container */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4 py-12"
      >
        {/* Small Date Tagline */}
        <motion.span
          variants={itemVariants}
          className="font-sans text-xs sm:text-sm tracking-[0.35em] uppercase text-zinc-500 mb-6 font-medium"
        >
          21 August
        </motion.span>

        {/* Large Cinematic Title */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-zinc-900 tracking-tight leading-[1.1] mb-6"
        >
          Happy Birthday <span className="text-rose-500/90 font-normal">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-lg sm:text-xl md:text-2xl font-normal italic text-zinc-700 tracking-wide mb-8 max-w-lg"
        >
          For the girl who changed my world.
        </motion.h2>

        {/* Short Paragraph */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm sm:text-base font-normal text-zinc-600 leading-relaxed max-w-md mb-12 whitespace-pre-line"
        >
          {"I made something special for you.\nEvery scroll is a memory.\nEvery memory is a piece of my heart."}
        </motion.p>

        {/* Primary Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleButtonClick}
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Open My Gift <span className="text-rose-500">❤️</span>
            </span>
            {/* Subtle soft glow background layer */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </button>
        </motion.div>
      </motion.main>
    </section>
  );
}
