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

  const formatHeroDate = (dateStr: string) => {
    if (!dateStr) return "21 August";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      if (!isNaN(day) && monthIdx >= 0 && monthIdx < 12) {
        return `${day} ${months[monthIdx]}`;
      }
    }
    return dateStr;
  };

  const heartImageUrl =
    hero.heroHeartImage ||
    config.gallery[0]?.imageUrl ||
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80";

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
        className="relative z-10 flex flex-col items-center max-w-3xl mx-auto px-4 py-12"
      >
        {/* Tagline Date (Formatted as 21 August) */}
        <motion.span
          variants={itemVariants}
          className="font-sans text-xs sm:text-sm tracking-[0.4em] uppercase text-rose-800/80 mb-6 font-semibold"
        >
          {formatHeroDate(config.countdown.targetDate)}
        </motion.span>

        {/* Calligraphy Handwritten Title */}
        <motion.h1
          variants={itemVariants}
          className="font-calligraphy text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-zinc-900 tracking-normal leading-[1.05] mb-4 text-rose-950/90 drop-shadow-sm"
        >
          {general.heroTitle || hero.mainHeading} <span className="text-rose-500 inline-block font-sans text-4xl sm:text-5xl md:text-6xl align-middle ml-1">❤️</span>
        </motion.h1>

        {/* Pure Vector-Perfect Heart-Shaped Photo Frame below Happy Birthday ❤️ */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.06, rotate: 2 }}
          transition={{ duration: 0.4 }}
          className="relative w-44 h-40 sm:w-56 sm:h-50 md:w-64 md:h-56 my-6 flex items-center justify-center filter drop-shadow-[0_12px_35px_rgba(244,114,182,0.4)] cursor-pointer group"
        >
          <svg
            viewBox="0 0 100 90"
            className="w-full h-full overflow-visible transition-transform duration-700 group-hover:scale-105"
          >
            <defs>
              {/* Perfectly Smooth Heart Clip Path */}
              <clipPath id="hero-heart-vector-clip">
                <path d="M 50,85 C 50,85 10,55 10,28 C 10,14 21,4 35,4 C 43,4 50,9 50,9 C 50,9 57,4 65,4 C 79,4 90,14 90,28 C 90,55 50,85 50,85 Z" />
              </clipPath>

              {/* Romantic Rose Gold Gradient for Outer Border */}
              <linearGradient id="hero-heart-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="50%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#FB7185" />
              </linearGradient>
            </defs>

            {/* Clipped Photo inside Heart */}
            <image
              href={heartImageUrl}
              x="0"
              y="0"
              width="100"
              height="90"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#hero-heart-vector-clip)"
              className="transition-transform duration-700 group-hover:scale-110 origin-center"
            />

            {/* Uniform Crisp Outer Heart Border */}
            <path
              d="M 50,85 C 50,85 10,55 10,28 C 10,14 21,4 35,4 C 43,4 50,9 50,9 C 50,9 57,4 65,4 C 79,4 90,14 90,28 C 90,55 50,85 50,85 Z"
              fill="none"
              stroke="url(#hero-heart-border-gradient)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic text-zinc-700 tracking-wide mb-8 max-w-xl"
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
