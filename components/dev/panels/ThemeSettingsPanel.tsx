"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function ThemeSettingsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { theme } = config;

  const handleChange = (field: keyof typeof theme, value: any) => {
    updateSection("theme", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Theme & Color Palette Settings 🎨
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize primary colors, accent highlights, background styles, and button aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Primary Accent Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => handleChange("primaryColor", e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer border border-white/40"
            />
            <input
              type="text"
              value={theme.primaryColor}
              onChange={(e) => handleChange("primaryColor", e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Secondary Highlight Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={theme.accentColor}
              onChange={(e) => handleChange("accentColor", e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer border border-white/40"
            />
            <input
              type="text"
              value={theme.accentColor}
              onChange={(e) => handleChange("accentColor", e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Background Atmosphere Style
          </label>
          <select
            value={theme.backgroundStyle}
            onChange={(e) => handleChange("backgroundStyle", e.target.value as any)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          >
            <option value="living-cloud">Option A: Living Cloud Gradient (10 Living Blobs)</option>
            <option value="soft-pastel">Option B: Soft Romantic Pastel (#fff5f7)</option>
            <option value="gradient">Option C: Shifting Linear Gradient</option>
            <option value="dark">Option D: Luxury Dark Charcoal Mode</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Button Style Theme
          </label>
          <select
            value={theme.buttonStyle}
            onChange={(e) => handleChange("buttonStyle", e.target.value as any)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          >
            <option value="glass">Glassmorphic Floating Pill</option>
            <option value="solid">Solid Gradient Pill</option>
            <option value="gradient">Linear Shimmer Button</option>
            <option value="rounded">Soft Rounded Card Button</option>
          </select>
        </div>
      </div>
    </div>
  );
}
