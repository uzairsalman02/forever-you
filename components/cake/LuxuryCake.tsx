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
    <div className="relative flex flex-col items-center justify-center select-none py-10">
      {/* 1. Light Blue & Purple Candle Glow Illuminate Backdrop */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.55, 0.8, 0.55], scale: [1, 1.06, 1] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-80 h-80 rounded-full bg-gradient-to-tr from-sky-300/30 via-purple-300/40 to-indigo-300/30 blur-[75px] pointer-events-none -z-10"
          />
        )}
      </AnimatePresence>

      {/* 2. Candle Assembly */}
      <div className="relative flex flex-col items-center z-30 mb-[-4px]">
        {/* Flame & Soft Glow */}
        <AnimatePresence>
          {isLit && (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.2, y: -12 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative flex flex-col items-center mb-1"
            >
              {/* Soft Blue & Amber Aura */}
              <div className="absolute -top-3 w-9 h-9 rounded-full bg-sky-300/50 blur-md animate-pulse" />
              <div className="absolute -top-2 w-6 h-6 rounded-full bg-amber-300/60 blur-sm animate-pulse" />

              {/* Realistic Flickering Flame */}
              <motion.div
                animate={{
                  scaleY: [1, 1.18, 0.92, 1],
                  scaleX: [1, 0.88, 1.1, 1],
                  rotate: [0, 2.5, -2.5, 0],
                }}
                transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
                className="w-3.5 h-6.5 rounded-t-full bg-gradient-to-t from-purple-500 via-amber-400 to-sky-100 shadow-[0_0_15px_rgba(125,211,252,0.9)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Smoke Puff Animation when candle is blown out */}
        <AnimatePresence>
          {!isLit && isBlowing && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.75, 0], y: -38, scale: 1.6 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
              className="absolute -top-6 w-6 h-6 rounded-full bg-sky-200/50 blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Candle Wick & Striped Body (Light Blue & Purple Stripes) */}
        <div className="w-0.5 h-2.5 bg-slate-800" />
        <div className="w-4 h-13 rounded-t-sm bg-gradient-to-r from-sky-200 via-purple-200 to-sky-300 shadow-md border border-purple-300/60 flex flex-col justify-between py-1 overflow-hidden relative">
          {/* Diagonal Striping */}
          <div className="w-full h-1 bg-purple-500/60 -rotate-12 scale-125" />
          <div className="w-full h-1 bg-sky-400/60 -rotate-12 scale-125" />
          <div className="w-full h-1 bg-purple-500/60 -rotate-12 scale-125" />
        </div>
      </div>

      {/* 3. 3-Tier CSS Birthday Cake (Light Blue & Purple Palette) */}
      <div className="relative flex flex-col items-center z-10">
        {/* TOP TIER LAYER (Light Sky Blue Frosting on Soft Lavender Cake) */}
        <div className="relative w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 rounded-t-2xl shadow-[inset_0_-4px_12px_rgba(0,0,0,0.1)] border border-purple-300/70 flex flex-col justify-between p-2 overflow-hidden">
          {/* Light Blue Frosting Drips */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-sky-100 to-sky-200 rounded-b-xl shadow-sm flex items-end">
            <svg viewBox="0 0 100 20" className="w-full h-3 text-sky-200 fill-current">
              <path d="M 0 0 Q 12.5 20, 25 0 Q 37.5 20, 50 0 Q 62.5 20, 75 0 Q 87.5 20, 100 0 Z" />
            </svg>
          </div>

          {/* Light Blue & Purple Sugar Pearls */}
          <div className="flex justify-around items-end h-full pb-2 px-2 z-10">
            <span className="w-2 h-2 rounded-full bg-sky-200 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-purple-200 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-sky-300 shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-indigo-200 shadow-sm" />
          </div>

          {/* Purple Trim Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-sky-300 to-purple-500" />
        </div>

        {/* MIDDLE TIER LAYER (Royal Violet Purple Cake with Ice Blue Drips) */}
        <div className="relative w-52 sm:w-64 h-20 sm:h-24 bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 rounded-t-xl shadow-[inset_0_-4px_14px_rgba(0,0,0,0.12)] border border-purple-400/80 flex flex-col justify-between p-2 overflow-hidden -mt-1">
          {/* Light Blue Scalloped Frosting Drips */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 rounded-b-2xl shadow-sm">
            <svg viewBox="0 0 100 20" className="w-full h-3 text-sky-300 fill-current">
              <path d="M 0 0 Q 10 20, 20 0 Q 30 20, 40 0 Q 50 20, 60 0 Q 70 20, 80 0 Q 90 20, 100 0 Z" />
            </svg>
          </div>

          {/* Decorative Stars & Hearts Sprinkles */}
          <div className="flex justify-around items-center h-full pt-4 z-10">
            <span className="text-xs text-sky-200 drop-shadow">✨</span>
            <span className="text-xs text-purple-200 drop-shadow">💜</span>
            <span className="text-xs text-sky-100 drop-shadow">✨</span>
            <span className="text-xs text-purple-200 drop-shadow">💙</span>
          </div>

          {/* Ice Blue Pearl Trim */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-300 via-purple-300 to-sky-300" />
        </div>

        {/* BOTTOM BASE TIER LAYER (Deep Lavender Purple Base Cake) */}
        <div className="relative w-68 sm:w-80 h-24 sm:h-28 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-700 rounded-t-xl shadow-[0_12px_35px_rgba(147,51,234,0.25)] border border-purple-500/80 flex flex-col justify-between p-2 overflow-hidden -mt-1">
          {/* Top Drips */}
          <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-sky-100 via-sky-200 to-sky-300 rounded-b-2xl shadow-sm">
            <svg viewBox="0 0 100 20" className="w-full h-4 text-sky-300 fill-current">
              <path d="M 0 0 Q 8.3 20, 16.6 0 Q 25 20, 33.3 0 Q 41.6 20, 50 0 Q 58.3 20, 66.6 0 Q 75 20, 83.3 0 Q 91.6 20, 100 0 Z" />
            </svg>
          </div>

          {/* Bottom Cake Slice Shift Cut Effect */}
          {isCut && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 28 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-4 top-4 bottom-4 w-14 bg-gradient-to-r from-purple-400 to-sky-200 border-l border-purple-300 rounded-r-md shadow-lg z-20"
            />
          )}

          {/* Ice Blue Base Trim */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-sky-400 via-purple-300 to-sky-400" />
        </div>
      </div>

      {/* 4. Luxury Glassmorphism Presentation Plate (Light Blue & Purple Glow Base) */}
      <div className="relative w-80 sm:w-96 h-10 sm:h-12 bg-white/60 backdrop-blur-md rounded-full shadow-[0_20px_50px_rgba(147,51,234,0.28)] border border-white/80 -mt-5 z-0 flex items-center justify-center">
        <div className="w-72 sm:w-88 h-6 rounded-full bg-gradient-to-r from-sky-100/50 via-purple-100/60 to-sky-100/50 border border-purple-200/40" />
      </div>
    </div>
  );
}
