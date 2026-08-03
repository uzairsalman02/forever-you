"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { DETAILED_MEMORIES } from "@/content/detailedMemories";

interface MemoryRevealSceneProps {
  onFinishMemories?: () => void;
}

export function MemoryRevealScene({
  onFinishMemories,
}: MemoryRevealSceneProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMemory = DETAILED_MEMORIES[currentIndex];

  const handleNextMemory = () => {
    if (currentIndex < DETAILED_MEMORIES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onFinishMemories) {
        onFinishMemories();
      } else {
        // Loop back to beginning for smooth exploration
        setCurrentIndex(0);
      }
    }
  };

  return (
    <section
      id="memories-section"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-10 bg-background select-none overflow-hidden"
    >
      {/* Background Ambient Floating Particles */}
      <FloatingParticles />

      {/* Main Single-Memory Album Showcase */}
      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            {/* Centered Large Portrait Polaroid Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-white p-4 sm:p-5 pb-6 sm:pb-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-rose-100/70 mb-8"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-white">
                <Image
                  src={currentMemory.image}
                  alt={currentMemory.title}
                  fill
                  quality={100}
                  priority
                  sizes="(max-width: 640px) 90vw, 500px"
                  className="object-cover opacity-100"
                />
              </div>
            </motion.div>

            {/* Title & Emotional Paragraph (Appears After Image) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
              className="flex flex-col items-center max-w-md px-2 mb-10"
            >
              <span className="font-sans text-xs tracking-[0.35em] uppercase text-zinc-400 mb-3 font-medium">
                {currentMemory.date}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-zinc-900 tracking-tight leading-snug mb-4">
                {currentMemory.title}
              </h3>
              <p className="font-sans text-sm sm:text-base font-normal text-zinc-600 leading-relaxed whitespace-pre-line">
                {currentMemory.description}
              </p>
            </motion.div>

            {/* Next Memory Button (Appears Last) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
            >
              <button
                onClick={handleNextMemory}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Next Memory <span className="text-rose-500">❤️</span>
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
