"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function HeroSettingsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { hero } = config;

  const handleChange = (field: keyof typeof hero, value: string) => {
    updateSection("hero", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Hero Section Settings 👑
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize the main opening hero section title, subtitle, and action button text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Main Heading
          </label>
          <input
            type="text"
            value={hero.mainHeading}
            onChange={(e) => handleChange("mainHeading", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Subtitle / Tagline
          </label>
          <input
            type="text"
            value={hero.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Open Gift Button Text
          </label>
          <input
            type="text"
            value={hero.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
