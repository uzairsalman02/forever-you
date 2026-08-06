"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { PolaroidCard } from "./PolaroidCard";

interface MemoryVaultSceneProps {
  onTransitionComplete?: () => void;
}

export function MemoryVaultScene({
  onTransitionComplete,
}: MemoryVaultSceneProps) {
  const { config } = useSiteConfig();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isCollageMode = config.effects.galleryStyle !== "scatter";

  // Map gallery items from CMS to VaultMemory format
  const memoriesList = config.gallery.map((g, idx) => {
    // Generate organic photo wall rotations matching reference picture (-8deg to +8deg)
    const rotationAngles = ["-6deg", "4deg", "-8deg", "5deg", "-3deg", "7deg", "-5deg", "3deg", "-7deg", "6deg"];
    const rot = g.rotation || rotationAngles[idx % rotationAngles.length];

    return {
      id: g.id,
      imageUrl: g.imageUrl,
      rotation: rot,
      hoverRotation: "0deg",
      aspectRatio: idx % 3 === 0 ? "aspect-square" : idx % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/5]",
      widthClass: isCollageMode
        ? (idx % 4 === 0 ? "w-36 sm:w-48 md:w-56 lg:w-64" : "w-32 sm:w-40 md:w-48 lg:w-56")
        : (idx % 4 === 0 ? "w-36 sm:w-44 md:w-52 lg:w-60" : "w-28 sm:w-36 md:w-44 lg:w-52"),
      zIndex: g.isFavorite ? 45 : (idx % 35) + 5,
      marginOffset: isCollageMode
        ? (idx % 2 === 0 ? "-mt-4 sm:-mt-8 -ml-3 sm:-ml-6" : "-mt-2 sm:-mt-5 -mr-3 sm:-mr-6")
        : (idx % 2 === 0 ? "-mt-6 sm:-mt-10 -ml-4 sm:-ml-8" : "mt-4 sm:mt-8 -mr-6 sm:-mr-12"),
      isFavorite: g.isFavorite,
    };
  });

  const handleButtonClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      if (onTransitionComplete) {
        onTransitionComplete();
      } else {
        const nextSection = document.getElementById("memories-section");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, 400);
    }, 1800);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.04,
      },
    },
  };

  return (
    <section
      id="memory-vault"
      className={`relative min-h-screen w-full flex flex-col items-center justify-between py-16 px-2 sm:px-6 md:px-10 bg-transparent overflow-hidden select-none transition-all duration-1000 ${
        isTransitioning ? "pointer-events-none" : ""
      }`}
    >

      {/* Cinematic White Flash Overlay during transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Header Container */}
      <motion.div
        animate={isTransitioning ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12"
      >
        <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-3 font-medium">
          Memory Vault
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-zinc-900 tracking-tight leading-[1.15] mb-6">
          My Little Collection of Us
        </h2>
        <p className="font-sans text-sm sm:text-base font-normal text-zinc-600 leading-relaxed max-w-lg whitespace-pre-line">
          {
            "I have kept every little memory of you close to my heart.\nEvery picture, every smile, every moment...\nthey have always been priceless to me."
          }
        </p>
      </motion.div>

      {/* Dense Viewport-Filling 50-Photo Overlapping Scatter Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.02 }}
        className="relative z-10 w-full max-w-[1450px] mx-auto flex flex-wrap items-center justify-center py-4 px-1 sm:px-4 gap-y-4 sm:gap-y-6 md:gap-y-8"
      >
        {memoriesList.map((memory, index) => (
          <PolaroidCard
            key={memory.id}
            memory={memory}
            index={index}
            isTransitioning={isTransitioning}
          />
        ))}
      </motion.div>

      {/* Bottom Action Button */}
      <motion.div
        animate={isTransitioning ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center mt-12 mb-8"
      >
        <button
          onClick={handleButtonClick}
          disabled={isTransitioning}
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isTransitioning ? "Entering Memory..." : "Relive Some Memories"} <span className="text-rose-500">❤️</span>
          </span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </button>
      </motion.div>
    </section>
  );
}
