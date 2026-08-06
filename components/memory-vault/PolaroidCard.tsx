"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { VaultMemory } from "@/content/vaultMemories";

interface PolaroidCardProps {
  memory: VaultMemory;
  index: number;
  isTransitioning?: boolean;
}

export function PolaroidCard({
  memory,
  index,
  isTransitioning = false,
}: PolaroidCardProps) {
  const isFav = memory.isFavorite;

  // Compute deterministic scatter direction angles for non-favorite polaroids
  const flyX = (index % 2 === 0 ? -1 : 1) * (220 + (index % 6) * 80);
  const flyY = (index % 3 === 0 ? -1 : 1) * (240 + (index % 5) * 70);
  const flyRotate = (index % 2 === 0 ? -30 : 30) + (index % 3) * 6;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: memory.rotation,
      transition: {
        duration: 0.8,
        delay: (index % 15) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    flyingAway: isFav
      ? {
          scale: [1, 1.3, 2.5],
          rotate: 0,
          opacity: [1, 1, 1],
          zIndex: 100,
          transition: {
            duration: 1.8,
            ease: [0.4, 0, 0.2, 1],
          },
        }
      : {
          x: flyX,
          y: flyY,
          rotate: flyRotate,
          opacity: 0,
          scale: 0.5,
          transition: {
            duration: 1.6,
            delay: (index % 8) * 0.04,
            ease: [0.4, 0, 0.2, 1],
          },
        },
  };

  return (
    <motion.div
      variants={cardVariants}
      animate={isTransitioning ? "flyingAway" : undefined}
      whileHover={
        !isTransitioning
          ? {
              y: -14,
              scale: 1.12,
              rotate: 0,
              zIndex: 90,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      style={{ zIndex: isFav ? 45 : memory.zIndex }}
      className={`relative group bg-white p-2.5 sm:p-3.5 pb-8 sm:pb-12 rounded-sm shadow-[0_12px_35px_rgba(0,0,0,0.20)] border border-slate-200/80 transition-shadow duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.35)] select-none will-change-transform ${memory.widthClass} ${memory.marginOffset} ${
        isFav ? "ring-2 ring-rose-400" : ""
      }`}
    >
      {/* Photo Frame Container */}
      <div
        className={`relative w-full ${memory.aspectRatio} overflow-hidden bg-slate-900/10 border border-slate-200/60`}
      >
        <Image
          src={memory.imageUrl}
          alt={`Memory ${memory.id}`}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 28vw, 320px"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-108"
        />
      </div>
    </motion.div>
  );
}
