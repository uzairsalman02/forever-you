"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function GeneralSettingsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { general } = config;

  const handleChange = (field: keyof typeof general, value: string) => {
    updateSection("general", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          General Settings ⚙️
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize website titles, recipient names, and global headings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Website Title (Metadata)
          </label>
          <input
            type="text"
            value={general.websiteTitle}
            onChange={(e) => handleChange("websiteTitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Browser Tab Title
          </label>
          <input
            type="text"
            value={general.browserTitle}
            onChange={(e) => handleChange("browserTitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Recipient Name (Name Reveal & Titles)
          </label>
          <input
            type="text"
            value={general.recipientName}
            onChange={(e) => handleChange("recipientName", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Hero Title
          </label>
          <input
            type="text"
            value={general.heroTitle}
            onChange={(e) => handleChange("heroTitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Hero Subtitle
          </label>
          <input
            type="text"
            value={general.heroSubtitle}
            onChange={(e) => handleChange("heroSubtitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Greeting / Tagline Text
          </label>
          <input
            type="text"
            value={general.greetingText}
            onChange={(e) => handleChange("greetingText", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Love Letter Section Title
          </label>
          <input
            type="text"
            value={general.letterTitle}
            onChange={(e) => handleChange("letterTitle", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Footer Text
          </label>
          <input
            type="text"
            value={general.footerText}
            onChange={(e) => handleChange("footerText", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>
      </div>
    </div>
  );
}
