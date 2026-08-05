"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function FinalMessagePanel() {
  const { config, updateSection } = useSiteConfig();
  const { finalMessage } = config;

  const handleChange = (field: keyof typeof finalMessage, value: string) => {
    updateSection("finalMessage", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Final Celebration Message 💖
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize the closing birthday card text and experience replay button.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Final Celebration Title
          </label>
          <input
            type="text"
            value={finalMessage.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Replay Experience Button Text
          </label>
          <input
            type="text"
            value={finalMessage.buttonText}
            onChange={(e) => handleChange("buttonText", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Closing Heartfelt Paragraph
          </label>
          <textarea
            rows={4}
            value={finalMessage.text}
            onChange={(e) => handleChange("text", e.target.value)}
            className="w-full p-4 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>
      </div>
    </div>
  );
}
