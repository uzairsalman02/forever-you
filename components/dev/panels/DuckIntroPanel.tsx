"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function DuckIntroPanel() {
  const { config, updateSection } = useSiteConfig();
  const { duckIntro } = config;

  const handleChange = (field: keyof typeof duckIntro, value: any) => {
    updateSection("duckIntro", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Cinematic Duck Intro Controls 🐥
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Control baby duck walking animations, speech bubble quacks, size, speed, and duration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Duck Walking Speed Multiplier
            </label>
            <span className="text-xs font-mono text-rose-500">{duckIntro.duckSpeed}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={duckIntro.duckSpeed}
            onChange={(e) => handleChange("duckSpeed", parseFloat(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Duck Vector Size Multiplier
            </label>
            <span className="text-xs font-mono text-rose-500">{duckIntro.duckSize}x</span>
          </div>
          <input
            type="range"
            min="0.7"
            max="1.8"
            step="0.1"
            value={duckIntro.duckSize}
            onChange={(e) => handleChange("duckSize", parseFloat(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Total Intro Sequence Duration (seconds)
            </label>
            <span className="text-xs font-mono text-rose-500">{duckIntro.animationDuration}s</span>
          </div>
          <input
            type="range"
            min="5"
            max="18"
            step="0.5"
            value={duckIntro.animationDuration}
            onChange={(e) => handleChange("animationDuration", parseFloat(e.target.value))}
            className="w-full accent-rose-500"
          />
        </div>

        {/* Toggles */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Enable Duck Sequence
              </span>
              <span className="text-[10px] text-slate-500">Play duck waddle sequence</span>
            </div>
            <input
              type="checkbox"
              checked={duckIntro.enableDuck}
              onChange={(e) => handleChange("enableDuck", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Enable &quot;Quack!&quot; Bubble
              </span>
              <span className="text-[10px] text-slate-500">Show speech bubble & heart</span>
            </div>
            <input
              type="checkbox"
              checked={duckIntro.enableQuack}
              onChange={(e) => handleChange("enableQuack", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Enable Opening Intro
              </span>
              <span className="text-[10px] text-slate-500">Play on page unlock</span>
            </div>
            <input
              type="checkbox"
              checked={duckIntro.enableIntro}
              onChange={(e) => handleChange("enableIntro", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
