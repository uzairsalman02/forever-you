"use client";

import React from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function CountdownSettingsPanel() {
  const { config, updateSection } = useSiteConfig();
  const { countdown } = config;

  const handleChange = (field: keyof typeof countdown, value: any) => {
    updateSection("countdown", { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Countdown Settings ⏳
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure release target date, time, timezone, and dev unlock mode.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Target Release Date
          </label>
          <input
            type="date"
            value={countdown.targetDate}
            onChange={(e) => handleChange("targetDate", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Target Release Time (24h)
          </label>
          <input
            type="time"
            value={countdown.targetTime}
            onChange={(e) => handleChange("targetTime", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Timezone Reference
          </label>
          <input
            type="text"
            value={countdown.timezone}
            onChange={(e) => handleChange("timezone", e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
          />
        </div>

        {/* Toggles */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Enable Countdown Page
              </span>
              <span className="text-[10px] text-slate-500">Show scene 1 countdown</span>
            </div>
            <input
              type="checkbox"
              checked={countdown.enableCountdown}
              onChange={(e) => handleChange("enableCountdown", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Development Mode
              </span>
              <span className="text-[10px] text-slate-500">Bypass countdown for testing</span>
            </div>
            <input
              type="checkbox"
              checked={countdown.developmentMode}
              onChange={(e) => handleChange("developmentMode", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30 cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
                Skip Countdown Directly
              </span>
              <span className="text-[10px] text-slate-500">Force unlock experience</span>
            </div>
            <input
              type="checkbox"
              checked={countdown.skipCountdown}
              onChange={(e) => handleChange("skipCountdown", e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
