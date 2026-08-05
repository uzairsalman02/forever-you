"use client";

import React, { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function MusicSettingsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { music } = config;
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (field: keyof typeof music, value: any) => {
    updateSection("music", { [field]: value });
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          updateSection("music", {
            src: dataUrl,
            trackName: file.name.replace(/\.[^/.]+$/, ""),
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Music & Audio Settings 🎵
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Upload custom MP3 audio tracks, configure autoplay, volume, loop, and fade parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        {/* Hidden Audio File Input */}
        <input
          ref={audioInputRef}
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="hidden"
        />

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Audio File Source (URL or Upload)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={music.src}
              onChange={(e) => handleChange("src", e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
              placeholder="Audio URL (e.g. /audio/romantic-bg.mp3)"
            />
            <button
              type="button"
              onClick={() => audioInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-all whitespace-nowrap"
            >
              Upload MP3 File 🎶
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Music Title
          </label>
          <input
            type="text"
            value={music.trackName}
            onChange={(e) => handleChange("trackName", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Artist Name
          </label>
          <input
            type="text"
            value={music.artist}
            onChange={(e) => handleChange("artist", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Default Volume Level
            </label>
            <span className="text-xs font-mono text-rose-500">
              {Math.round(music.volume * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={music.volume}
            onChange={(e) => handleChange("volume", parseFloat(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

        {/* Toggles */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/20">
          <label className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Loop Audio
            </span>
            <input
              type="checkbox"
              checked={music.loop}
              onChange={(e) => handleChange("loop", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Autoplay
            </span>
            <input
              type="checkbox"
              checked={music.autoplay}
              onChange={(e) => handleChange("autoplay", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Fade In
            </span>
            <input
              type="checkbox"
              checked={music.fadeIn}
              onChange={(e) => handleChange("fadeIn", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
              Fade Out
            </span>
            <input
              type="checkbox"
              checked={music.fadeOut}
              onChange={(e) => handleChange("fadeOut", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
