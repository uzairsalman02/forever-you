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
  // Compute deterministic fly-away direction angles for cinematic transition
  const flyX = (index % 2 === 0 ? -1 : 1) * (180 + (index % 4) * 90);
  const flyY = (index % 3 === 0 ? -1 : 1) * (200 + (index % 5) * 70);
  const flyRotate = (index % 2 === 0 ? -30 : 30) + (index % 3) * 5;

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      rotate: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: memory.rotation,
      transition: {
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    flyingAway: {
      x: flyX,
      y: flyY,
      rotate: flyRotate,
      opacity: 0,
      scale: 0.7,
      transition: {
        duration: 1.6,
        delay: (index % 4) * 0.06,
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
              y: -12,
              scale: 1.04,
              rotate: memory.hoverRotation,
              zIndex: 60,
              transition: { duration: 0.35, ease: "easeOut" },
            }
          : undefined
      }
      style={{ zIndex: memory.zIndex }}
      className={`relative group bg-white p-3 sm:p-4 pb-6 sm:pb-7 rounded-md sm:rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.10)] border border-rose-100/50 transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(244,114,182,0.22)] select-none ${memory.widthClass} ${memory.marginOffset}`}
    >
      {/* Image Container with organic aspect ratio */}
      <div
        className={`relative w-full ${memory.aspectRatio} overflow-hidden rounded-sm bg-zinc-100`}
      >
        <Image
          src={memory.imageUrl}
          alt={memory.caption}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Polaroid Handwritten Style Caption */}
      <div className="mt-3 sm:mt-4 text-center px-1">
        <span className="font-serif text-sm sm:text-base md:text-lg font-normal italic text-zinc-700 tracking-wide">
          {memory.caption}
        </span>
      </div>
    </motion.div>
  );
}
