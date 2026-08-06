"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface HeroSceneProps {
  onOpenGift?: () => void;
}

export function HeroScene({ onOpenGift }: HeroSceneProps) {
  const { config } = useSiteConfig();
  const { general, hero } = config;
  const [isDissolving, setIsDissolving] = React.useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.3,
        ease: "easeInOut",
      },
    },
  };

  const handleButtonClick = () => {
    if (isDissolving) return;
    setIsDissolving(true);

    setTimeout(() => {
      if (onOpenGift) {
        onOpenGift();
      }
      setTimeout(() => {
        setIsDissolving(false);
      }, 1000);
    }, 700);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 text-center select-none overflow-hidden bg-transparent"
    >
      {/* Soft Dissolve Overlay */}
      {isDissolving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#08080c] pointer-events-none"
        />
      )}

      {/* Subtle Luxury Sparkles floating in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3], y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] text-rose-300 text-lg sm:text-xl"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ opacity: [0.2, 0.6, 0.2], y: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[18%] text-rose-300 text-base sm:text-lg"
        >
          ✨
        </motion.span>
        <motion.span
          animate={{ opacity: [0.25, 0.65, 0.25], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-[22%] text-rose-200 text-sm"
        >
          🌸
        </motion.span>
      </div>

      {/* Hero Content Container */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-3xl mx-auto px-4 py-16"
      >
        {/* Tagline */}
        <motion.span
          variants={itemVariants}
          className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-zinc-500 mb-8 font-medium"
        >
          {config.countdown.targetDate}
        </motion.span>

        {/* Calligraphy Handwritten Title */}
        <motion.h1
          variants={itemVariants}
          className="font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-zinc-900 tracking-normal leading-[1.05] mb-8 text-rose-950/90 drop-shadow-sm"
        >
          {general.heroTitle || hero.mainHeading} <span className="text-rose-500 inline-block font-sans text-4xl sm:text-5xl md:text-6xl align-middle ml-1">❤️</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic text-zinc-700 tracking-wide mb-10 max-w-xl"
        >
          {general.heroSubtitle || hero.subtitle}
        </motion.h2>

        {/* Short Paragraph */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-sm sm:text-base md:text-lg font-normal text-zinc-600 leading-relaxed max-w-lg mb-14 whitespace-pre-line"
        >
          {"I made something special for you.\nEvery scroll is a memory.\nEvery memory is a piece of my heart."}
        </motion.p>

        {/* Primary Luxury Glass Button */}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleButtonClick}
            className="group relative inline-flex items-center justify-center px-10 py-4 sm:py-4.5 rounded-full bg-white/85 backdrop-blur-md border border-rose-200/90 text-zinc-800 font-sans text-sm sm:text-base font-medium tracking-wide shadow-[0_10px_35px_rgba(244,114,182,0.18)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_15px_40px_rgba(244,114,182,0.28)] hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              {hero.buttonText || "Open My Gift ❤️"}
            </span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/60 via-pink-50/40 to-rose-100/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </button>
        </motion.div>
      </motion.main>
    </section>
  );
}
