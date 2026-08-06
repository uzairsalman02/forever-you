"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

export function MusicController() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {
    isPlaying,
    isMuted,
    volume,
    progress,
    trackInfo,
    togglePlay,
    toggleMute,
    setVolume,
    playSound,
  } = useAudio();

  // Auto Fullscreen on first click anywhere on document
  React.useEffect(() => {
    const handleFirstClick = () => {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          // Browser prevented full screen or user dismissed
        });
      }
      window.removeEventListener("click", handleFirstClick);
    };
    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, []);

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handlePlayToggle = () => {
    playSound("buttonClick");
    togglePlay();
  };

  const handleMuteToggle = () => {
    playSound("buttonClick");
    toggleMute();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none flex items-center gap-2">
      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreenMode}
        className="p-3 rounded-full bg-white/85 backdrop-blur-md border border-white/70 shadow-md text-zinc-700 hover:text-rose-500 transition-all hover:scale-105 active:scale-95 text-xs font-semibold"
        title="Toggle Fullscreen Mode ⛶"
      >
        ⛶
      </button>
      <AnimatePresence>
        {isExpanded ? (
          /* EXPANDED LUXURY GLASSMORPHISM PLAYER */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex flex-col p-4 rounded-3xl bg-white/85 backdrop-blur-md border border-white/70 shadow-[0_12px_40px_rgba(244,114,182,0.22)] w-80 overflow-hidden"
          >
            {/* Progress Animation Bar along the top of the player */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-rose-100/60 overflow-hidden">
              <div
                className="h-full bg-rose-400 transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Track Info */}
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="flex flex-col pr-2 overflow-hidden">
                <span className="font-sans text-xs font-semibold tracking-wider text-zinc-900 uppercase truncate">
                  {trackInfo.trackName}
                </span>
                <span className="font-sans text-[11px] text-zinc-500 font-normal truncate">
                  {trackInfo.artist}
                </span>
              </div>

              {/* Mute / Unmute Button */}
              <button
                onClick={handleMuteToggle}
                className="text-zinc-400 hover:text-zinc-700 text-sm p-1 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? "🔇" : "🔊"}
              </button>
            </div>

            {/* Controls & Volume Slider */}
            <div className="flex items-center justify-between gap-3">
              {/* Play / Pause Button */}
              <button
                onClick={handlePlayToggle}
                className="w-10 h-10 rounded-full bg-rose-100/90 hover:bg-rose-200/90 border border-rose-200 flex items-center justify-center text-zinc-800 text-sm transition-transform duration-300 active:scale-90 shadow-sm shrink-0"
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 flex-1">
                <span className="text-zinc-400 text-xs">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1.5 bg-zinc-200/80 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              {/* Collapse Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-zinc-400 hover:text-zinc-600 text-xs px-1"
                aria-label="Collapse music controller"
              >
                ✕
              </button>
            </div>
          </motion.div>
        ) : (
          /* COLLAPSED FLOATING MUSIC BUTTON */
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
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 border-2 border-white animate-ping" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
