"use client";

import React from "react";
import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { VAULT_MEMORIES } from "@/content/vaultMemories";
import { PolaroidCard } from "./PolaroidCard";

interface MemoryVaultSceneProps {
  onReliveMemories?: () => void;
}

export function MemoryVaultScene({ onReliveMemories }: MemoryVaultSceneProps) {
  const handleButtonClick = () => {
    if (onReliveMemories) {
      onReliveMemories();
    } else {
      const nextSection = document.getElementById("memories-section");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="memory-vault"
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-20 px-4 sm:px-6 md:px-12 bg-background overflow-hidden select-none"
    >
      {/* Background Floating Ambient Particles */}
      <FloatingParticles />

      {/* Header Container */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-zinc-400 mb-4 font-medium">
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
      </div>

      {/* Organic Tabletop Photo Scatter Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-y-8 sm:gap-y-12 md:gap-y-16 py-8 px-2 sm:px-6"
      >
        {VAULT_MEMORIES.map((memory, index) => (
          <PolaroidCard key={memory.id} memory={memory} index={index} />
        ))}
      </motion.div>

      {/* Bottom Action Button */}
      <div className="relative z-10 flex flex-col items-center mt-12 mb-8">
        <button
          onClick={handleButtonClick}
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-rose-200/80 text-zinc-800 font-sans text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(244,114,182,0.12)] transition-all duration-500 hover:bg-white hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.25)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Relive Our Memories <span className="text-rose-500">❤️</span>
          </span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </button>
      </div>
    </section>
  );
}
