"use client";

import React from "react";
import { motion } from "framer-motion";

interface LuxuryCakeProps {
  isLit: boolean;
  isCut: boolean;
  isBlowing: boolean;
}

export function LuxuryCake({ isLit, isCut, isBlowing }: LuxuryCakeProps) {
  return (
    <div className="relative w-64 sm:w-72 md:w-80 h-72 sm:h-80 md:h-88 flex flex-col items-center justify-end select-none">
      {/* CANDLE & FLAME */}
      <div className="relative flex flex-col items-center mb-[-2px] z-20">
        {/* Flame */}
        {isLit && !isBlowing && (
          <motion.div
            animate={{
              scale: [1, 1.08, 0.95, 1.05, 1],
              opacity: [0.95, 1, 0.9, 1, 0.95],
              rotate: [-2, 2, -1, 3, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-4 h-7 sm:w-5 sm:h-8 rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.8)] border border-amber-300/60 mb-1"
          />
        )}

        {/* Smoke animation when blown out */}
        {isBlowing && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -45, scale: 1.8 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="w-3 h-3 rounded-full bg-zinc-300/70 blur-[2px] mb-2"
          />
        )}

        {/* Candle Stick */}
        <div className="w-2.5 h-10 sm:w-3 sm:h-12 bg-gradient-to-b from-rose-200 via-rose-100 to-amber-100 rounded-sm border border-rose-300/40 shadow-sm" />
      </div>

      {/* THREE-TIER LUXURY CAKE CONTAINER */}
      <div className="relative w-full flex flex-col items-center z-10">
        {/* TIER 1 (TOP TIER) */}
        <div className="relative w-36 sm:w-40 h-14 sm:h-16 bg-white rounded-t-xl border-x border-t border-rose-100 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between overflow-hidden">
          {/* Soft Pink Frosting Drips */}
          <div className="w-full h-4 bg-rose-100/80 rounded-b-md flex justify-around">
            <div className="w-3 h-4 bg-rose-100 rounded-b-full" />
            <div className="w-4 h-5 bg-rose-100 rounded-b-full" />
            <div className="w-3 h-3.5 bg-rose-100 rounded-b-full" />
          </div>
          {/* Rose Gold Accent Trim */}
          <div className="w-full h-1 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200" />
        </div>

        {/* TIER 2 (MIDDLE TIER) */}
        <div className="relative w-48 sm:w-52 h-16 sm:h-18 bg-white border-x border-t border-rose-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden -mt-1">
          {/* Soft Pink Frosting Drips */}
          <div className="w-full h-5 bg-rose-100/80 rounded-b-md flex justify-around">
            <div className="w-4 h-5 bg-rose-100 rounded-b-full" />
            <div className="w-3 h-4 bg-rose-100 rounded-b-full" />
            <div className="w-5 h-6 bg-rose-100 rounded-b-full" />
            <div className="w-3 h-4 bg-rose-100 rounded-b-full" />
          </div>
          {/* Rose Gold Accent Trim */}
          <div className="w-full h-1.5 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200" />
        </div>

        {/* TIER 3 (BOTTOM TIER & SLICE SHIFT ANIMATION) */}
        <div className="relative w-60 sm:w-68 h-20 sm:h-22 bg-white rounded-b-xl border border-rose-100 shadow-[0_10px_30px_rgba(0,0,0,0.07)] flex flex-col justify-between overflow-hidden -mt-1">
          {/* Soft Pink Frosting Drips */}
          <div className="w-full h-5 bg-rose-100/80 rounded-b-md flex justify-around">
            <div className="w-4 h-5 bg-rose-100 rounded-b-full" />
            <div className="w-5 h-6 bg-rose-100 rounded-b-full" />
            <div className="w-3 h-4 bg-rose-100 rounded-b-full" />
            <div className="w-5 h-5 bg-rose-100 rounded-b-full" />
          </div>

          {/* Elegant Cut & Shifted Slice when Cut */}
          {isCut && (
            <motion.div
              initial={{ x: 0, rotate: 0 }}
              animate={{ x: 22, rotate: 3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute right-3 bottom-0 top-0 w-16 bg-rose-50/90 border-l border-rose-200/80 shadow-md flex items-center justify-center"
            >
              <div className="w-0.5 h-full bg-rose-300/40" />
            </motion.div>
          )}

          {/* Bottom Rose Gold Base Accent */}
          <div className="w-full h-2 bg-gradient-to-r from-amber-200 via-rose-300 to-amber-200" />
        </div>

        {/* LUXURY CAKE PLATTER */}
        <div className="w-68 sm:w-76 h-3 bg-gradient-to-r from-zinc-200 via-white to-zinc-200 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] border border-zinc-200/80 -mt-1" />
      </div>
    </div>
  );
}
