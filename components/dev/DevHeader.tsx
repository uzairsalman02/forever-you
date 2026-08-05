"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface DevHeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export function DevHeader({ darkMode, setDarkMode }: DevHeaderProps) {
  const { isSaved, saveConfig, exportConfig, importConfig } = useSiteConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importConfig(content);
          if (success) {
            alert("Project configuration imported successfully!");
          } else {
            alert("Failed to import configuration file. Invalid JSON format.");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="w-full h-16 px-6 bg-white/10 backdrop-blur-2xl border-b border-white/20 flex items-center justify-between shadow-sm z-30 select-none">
      {/* Left Title & Status Badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
          ⚙️
        </div>
        <div>
          <h1 className="font-sans font-semibold text-sm text-slate-800 dark:text-slate-100 tracking-wide">
            Forever You — Developer Control Panel
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`w-2 h-2 rounded-full ${
                isSaved ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {isSaved ? "All changes saved" : "Unsaved changes"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls Header */}
      <div className="flex items-center gap-3">
        {/* Hidden File Input for Import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileImport}
          className="hidden"
        />

        {/* Quick Export / Import Buttons */}
        <button
          onClick={exportConfig}
          className="px-3 py-1.5 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 border border-white/40 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all"
          title="Backup JSON config"
        >
          Export JSON 📥
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded-lg bg-white/30 dark:bg-white/10 hover:bg-white/50 border border-white/40 text-xs font-medium text-slate-700 dark:text-slate-200 transition-all"
          title="Restore JSON config"
        >
          Import JSON 📤
        </button>

        {/* Save Button */}
        <button
          onClick={saveConfig}
          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
        >
          Save Changes 💾
        </button>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-white/30 dark:bg-white/10 border border-white/40 text-slate-700 dark:text-slate-200 text-xs transition-all hover:bg-white/50"
          title="Toggle Theme Mode"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {/* Live Preview Button */}
        <Link
          href="/"
          target="_blank"
          className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 shadow-md transition-all flex items-center gap-1.5"
        >
          <span>Live Preview</span>
          <span>↗</span>
        </Link>
      </div>
    </header>
  );
}
