"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function DevHeader() {
  const { isSaved, saveConfig, exportConfig, importConfig } = useSiteConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleSaveClick = () => {
    saveConfig();
    setShowSaveToast(true);
    setTimeout(() => {
      setShowSaveToast(false);
    }, 3000);
  };

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
    <>
      {/* Floating Save Success Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-4 right-4 z-50 animate-bounce bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 select-none">
          <span className="text-lg">✅</span>
          <div>
            <h4 className="font-sans font-bold text-xs">Settings Saved!</h4>
            <p className="text-[10px] text-emerald-100">Website data updated successfully.</p>
          </div>
        </div>
      )}

      <header className="w-full min-h-16 py-3 px-4 sm:px-6 bg-white/70 backdrop-blur-2xl border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 shadow-sm z-30 select-none">
        {/* Left Title & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
            ⚙️
          </div>
          <div>
            <h1 className="font-sans font-semibold text-xs sm:text-sm text-slate-900 tracking-wide">
              Forever You — Developer Control Panel
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  isSaved ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="text-[11px] font-medium text-slate-500">
                {isSaved ? "All changes saved" : "Unsaved changes"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Controls Header */}
        <div className="flex items-center gap-2 flex-wrap">
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
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-all"
            title="Backup JSON config"
          >
            Export JSON 📥
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-all"
            title="Restore JSON config"
          >
            Import JSON 📤
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-semibold shadow-md shadow-rose-500/20 transition-all active:scale-95"
          >
            Save Settings 💾
          </button>

          {/* Live Preview Button */}
          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Live Preview</span>
            <span>↗</span>
          </Link>
        </div>
      </header>
    </>
  );
}
