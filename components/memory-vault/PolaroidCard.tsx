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
  const flyX = (index % 2 === 0 ? -1 : 1) * (200 + (index % 6) * 80);
  const flyY = (index % 3 === 0 ? -1 : 1) * (220 + (index % 5) * 70);
  const flyRotate = (index % 2 === 0 ? -35 : 35) + (index % 3) * 6;

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
        delay: (index % 12) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    flyingAway: {
      x: flyX,
      y: flyY,
      rotate: flyRotate,
      opacity: 0,
      scale: 0.6,
      transition: {
        duration: 1.6,
        delay: (index % 6) * 0.05,
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
              y: -10,
              scale: 1.05,
              rotate: memory.hoverRotation,
              zIndex: 60,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
      style={{ zIndex: memory.zIndex }}
      className={`relative group bg-white p-2 sm:p-3 pb-3 sm:pb-4 rounded-md sm:rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.11)] border border-rose-100/50 transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(244,114,182,0.25)] select-none ${memory.widthClass} ${memory.marginOffset}`}
    >
      {/* Clean Printed Polaroid Frame Image (No Captions) */}
      <div
        className={`relative w-full ${memory.aspectRatio} overflow-hidden rounded-sm bg-zinc-100`}
      >
        <Image
          src={memory.imageUrl}
          alt={`Memory ${memory.id}`}
          fill
          sizes="(max-width: 640px) 35vw, (max-width: 1024px) 25vw, 250px"
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </motion.div>
  );
}
