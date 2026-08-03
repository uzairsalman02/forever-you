"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuxuryCakeProps {
  isLit: boolean;
  isCut: boolean;
  isBlowing?: boolean;
}

export function LuxuryCake({ isLit, isCut, isBlowing = false }: LuxuryCakeProps) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-8">
      {/* 1. Warm Candle Spotlight Light illuminating nearby objects */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.05, 1] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-72 h-72 rounded-full bg-amber-200/40 blur-[70px] pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      {/* 2. Candle Assembly */}
      <div className="relative flex flex-col items-center z-20 mb-[-4px]">
        {/* Flame & Glow */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2, y: -10 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex flex-col items-center mb-1"
            >
              {/* Soft Amber Glow */}
              <div className="absolute -top-3 w-8 h-8 rounded-full bg-amber-300/60 blur-md animate-pulse" />

              {/* Realistic Flickering Flame */}
              <motion.div
                animate={{
                  scaleY: [1, 1.15, 0.95, 1],
                  scaleX: [1, 0.9, 1.1, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-3.5 h-6 rounded-t-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smoke Puff Animation when candle is blown out */}
        <AnimatePresence>
          {!isLit && isBlowing && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.7, 0], y: -35, scale: 1.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -top-6 w-6 h-6 rounded-full bg-zinc-300/50 blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Candle Wick & Body */}
        <div className="w-0.5 h-2 bg-zinc-700" />
        <div className="w-3.5 h-12 rounded-t-sm bg-gradient-to-r from-rose-100 via-white to-rose-200 shadow-sm border border-rose-200/60 flex flex-col justify-between py-1">
          <div className="w-full h-1 bg-rose-300/50" />
          <div className="w-full h-1 bg-rose-300/50" />
        </div>
      </div>

      {/* 3. 3-Tier Luxury Cream Birthday Cake */}
      <div className="relative flex flex-col items-center z-10">
        {/* TOP TIER */}
        <div className="relative w-36 sm:w-44 h-16 sm:h-20 bg-[#FFFDF9] rounded-t-2xl shadow-[inset_0_-4px_10px_rgba(0,0,0,0.03)] border border-amber-100/80 flex flex-col justify-between p-2 overflow-hidden">
          {/* White Frosting Drips */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-b-lg shadow-xs" />
          {/* Rose Gold Trim */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300" />
          {/* Sugar Pearl Sprinkles */}
          <div className="flex justify-around items-end h-full pb-3 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-300/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-rose-300/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300/70" />
          </div>
        </div>

        {/* MIDDLE TIER */}
        <div className="relative w-52 sm:w-64 h-20 sm:h-24 bg-[#FFFDF9] rounded-t-xl shadow-[inset_0_-4px_10px_rgba(0,0,0,0.03)] border border-amber-100/80 flex flex-col justify-between p-2 overflow-hidden -mt-1">
          <div className="absolute top-0 left-0 right-0 h-5 bg-white rounded-b-xl shadow-xs" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300" />
          <div className="flex justify-around items-center h-full pt-4">
            <span className="text-xs">🌸</span>
            <span className="text-xs">✨</span>
            <span className="text-xs">🌸</span>
            <span className="text-xs">✨</span>
          </div>
        </div>

        {/* BOTTOM BASE TIER */}
        <div className="relative w-68 sm:w-80 h-24 sm:h-28 bg-[#FFFDF9] rounded-t-xl shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-amber-100/80 flex flex-col justify-between p-2 overflow-hidden -mt-1">
          <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-b-2xl shadow-xs" />
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300" />

          {/* Slice Shift Cut Effect */}
          {isCut && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 26 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 top-4 bottom-4 w-12 bg-rose-100/60 border-l border-rose-200/80 rounded-r-md"
            />
          )}
        </div>
      </div>

      {/* 4. Luxury Glassmorphism Table Presentation Base */}
      <div className="relative w-80 sm:w-96 h-10 sm:h-12 bg-white/50 backdrop-blur-md rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white/70 -mt-5 z-0 flex items-center justify-center">
        <div className="w-72 sm:w-88 h-6 rounded-full bg-rose-100/30 border border-rose-200/40" />
      </div>
    </div>
  );
}
