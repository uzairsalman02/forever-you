"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  toggleBackgroundMusic,
  setBackgroundMusicVolume,
  getMusicState,
  subscribeMusicState,
} from "@/utils/audio";

export function MusicController() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);

  const musicState = getMusicState();

  useEffect(() => {
    setIsPlaying(musicState.isPlaying);
    setVolume(musicState.volume);

    const unsubscribe = subscribeMusicState((playing, vol) => {
      setIsPlaying(playing);
      setVolume(vol);
    });

    return () => unsubscribe();
  }, [musicState.isPlaying, musicState.volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setBackgroundMusicVolume(newVol);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <AnimatePresence>
        {isExpanded ? (
          /* EXPANDED LUXURY GLASSMORPHISM PANEL */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center gap-3 p-3 px-4 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_8px_30px_rgba(244,114,182,0.18)]"
          >
            {/* Track Name */}
            <div className="flex flex-col pr-1">
              <span className="font-sans text-[11px] font-semibold tracking-wider text-zinc-800 uppercase">
                {musicState.trackName}
              </span>
              <span className="font-sans text-[10px] text-zinc-500 font-normal">
                {isPlaying ? "Playing Background Music" : "Paused"}
              </span>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={toggleBackgroundMusic}
              className="w-8 h-8 rounded-full bg-rose-100/80 hover:bg-rose-200/80 border border-rose-200 flex items-center justify-center text-zinc-800 text-xs transition-transform duration-300 active:scale-90"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            {/* Volume Slider */}
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-zinc-400 text-xs">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>

            {/* Collapse Panel Button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="text-zinc-400 hover:text-zinc-600 text-xs px-1"
              aria-label="Collapse music controller"
            >
              ✕
            </button>
          </motion.div>
        ) : (
          /* COLLAPSED FLOATING MUSIC ICON BUTTON */
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(true)}
            className="group relative w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_8px_25px_rgba(244,114,182,0.2)] flex items-center justify-center text-rose-500 text-lg transition-all duration-300 hover:bg-white"
            aria-label="Expand music controller"
          >
            <span className={isPlaying ? "animate-pulse" : ""}>🎵</span>
            {/* Subtle soft glow indicator when playing */}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-white animate-ping" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
