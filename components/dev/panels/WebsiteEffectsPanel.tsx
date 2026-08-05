"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function WebsiteEffectsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { effects } = config;

  const handleToggle = (field: keyof typeof effects) => {
    updateSection("effects", { [field]: !effects[field] });
  };

  const EFFECTS_LIST: { id: keyof typeof effects; label: string; desc: string; icon: string }[] = [
    { id: "birthdayFlags", label: "Festive Birthday Flags", desc: "Top bunting flags string animation", icon: "🚩" },
    { id: "floatingHearts", label: "Floating Hearts Particle Canvas", desc: "Interactive drifting hearts", icon: "💖" },
    { id: "petals", label: "Sakura Petals", desc: "Soft falling sakura flower petals", icon: "🌸" },
    { id: "sparkles", label: "Magical Sparkles", desc: "Twinkling star sparkles across screen", icon: "✨" },
    { id: "dynamicBackground", label: "Dynamic Living Cloud Background", desc: "Shifting gradient & 10 living color blobs", icon: "☁️" },
    { id: "cursorGlow", label: "Cursor Glow Light", desc: "Soft radial glow following mouse", icon: "💡" },
    { id: "mouseParallax", label: "Mouse Tilt & Parallax", desc: "Depth parallax on polaroids & cards", icon: "🎯" },
    { id: "glassEffects", label: "Apple Glassmorphism", desc: "Backdrop blur & translucent cards", icon: "🧊" },
    { id: "animations", label: "Framer Motion Animations", desc: "Smooth scroll & fade transitions", icon: "⚡" },
    { id: "pageTransitions", label: "Global Page Transitions", desc: "Soft overlay transitions on reset", icon: "🔄" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Website Effects & Visual Toggles ✨
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Enable or disable specific visual effects, particles, bunting flags, and animations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EFFECTS_LIST.map((eff) => (
          <label
            key={eff.id}
            onClick={() => handleToggle(eff.id)}
            className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer select-none ${
              effects[eff.id]
                ? "bg-rose-500/10 border-rose-400/80 dark:border-rose-500/80 shadow-sm"
                : "bg-white/20 dark:bg-slate-900/40 border-white/20 opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{eff.icon}</span>
              <div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                  {eff.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {eff.desc}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={effects[eff.id]}
              onChange={() => {}} // handled by parent onClick
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>
        ))}
      </div>
    </div>
  );
}
