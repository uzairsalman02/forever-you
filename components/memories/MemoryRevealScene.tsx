"use client";

import React, { useState, useEffect, useCallback, TouchEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface MemoryRevealSceneProps {
  onFinishMemories?: () => void;
}

export function MemoryRevealScene({
  onFinishMemories,
}: MemoryRevealSceneProps) {
  const { config } = useSiteConfig();
  const memoriesList = config.detailedMemories && config.detailedMemories.length > 0
    ? config.detailedMemories
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const totalMemories = memoriesList.length;
  const currentMemory = memoriesList[currentIndex] || memoriesList[0];

  const handleNext = useCallback(() => {
    setDirection(1);
    if (currentIndex < totalMemories - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onFinishMemories) {
        onFinishMemories();
      } else {
        // Loop smoothly to first memory
        setCurrentIndex(0);
      }
    }
  }, [currentIndex, totalMemories, onFinishMemories]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(totalMemories - 1);
    }
  }, [currentIndex, totalMemories]);

  // Keyboard navigation listener (← / →)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Preload next image in background for zero load latency
  useEffect(() => {
    if (totalMemories === 0) return;
    const nextIndex = (currentIndex + 1) % totalMemories;
    const nextImageUrl = memoriesList[nextIndex]?.image;
    if (typeof window !== "undefined" && nextImageUrl) {
      const img = new window.Image();
      img.src = nextImageUrl;
    }
  }, [currentIndex, totalMemories, memoriesList]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext(); // Swipe Left -> Next
      } else {
        handlePrev(); // Swipe Right -> Prev
      }
    }
    setTouchStartX(null);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: "easeInOut",
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <section
      id="memories-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 sm:px-8 md:px-12 bg-transparent select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

      {/* Main Single-Memory Fullscreen Experience */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center my-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentMemory.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex flex-col items-center text-center"
          >
            {/* Fullscreen Image Container (Occupies 70-80% of Viewport Height) */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-[65vh] sm:h-[72vh] md:h-[76vh] max-w-4xl bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-rose-100/70 mb-6 sm:mb-8 overflow-hidden will-change-transform"
            >
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100">
                <Image
                  src={currentMemory.image}
                  alt={currentMemory.title}
                  fill
                  quality={100}
                  priority
                  sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 1100px"
                  className="object-cover opacity-100"
                />
              </div>
            </motion.div>

            {/* Memory Details: Title & Description Below Image */}
            <div className="flex flex-col items-center max-w-xl px-4 mb-6">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-zinc-900 tracking-tight leading-snug mb-2">
                {currentMemory.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm md:text-base font-normal text-zinc-600 leading-relaxed">
                {currentMemory.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls Bar */}
      <div className="relative z-20 w-full max-w-md mx-auto flex items-center justify-between mt-4 px-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/70 text-zinc-700 font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white hover:border-rose-300 hover:shadow-md hover:scale-105 active:scale-95"
        >
          <span>←</span> <span>Previous</span>
        </button>

        {/* Counter Display */}
        <span className="font-sans text-xs sm:text-sm font-medium tracking-widest text-zinc-500 uppercase">
          Memory {currentIndex + 1} / {totalMemories}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/70 text-zinc-700 font-sans text-xs sm:text-sm font-medium transition-all duration-300 hover:bg-white hover:border-rose-300 hover:shadow-md hover:scale-105 active:scale-95"
        >
          <span>Next</span> <span>→</span>
        </button>
      </div>
    </section>
  );
}
