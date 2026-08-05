"use client";

import React, { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function AdvancedSettingsPanel() {
  const { exportConfig, importConfig, resetToDefaults } = useSiteConfig();
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

  const handleConfirmReset = () => {
    if (
      confirm(
        "Are you sure you want to reset all CMS settings to initial project defaults? This will erase custom local edits."
      )
    ) {
      resetToDefaults();
      alert("Settings reset to defaults successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Advanced Settings & Project Backup 🚀
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Export full CMS configuration, restore backups, or reset settings to factory defaults.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Backup Card */}
        <div className="p-6 rounded-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="text-2xl mb-2">📥</div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Export Project Config
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Download complete project JSON configuration containing all titles, images, letter, music & theme settings.
            </p>
          </div>
          <button
            onClick={exportConfig}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-semibold shadow-md hover:from-rose-600 hover:to-pink-600 transition-all"
          >
            Download Backup JSON
          </button>
        </div>

        {/* Restore Backup Card */}
        <div className="p-6 rounded-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="text-2xl mb-2">📤</div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Import & Restore Backup
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload a previously exported JSON backup file to instantly restore all custom settings.
            </p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 rounded-xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shadow-md hover:opacity-90 transition-all"
          >
            Upload Backup JSON
          </button>
        </div>

        {/* Reset Defaults Card */}
        <div className="p-6 rounded-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="text-2xl mb-2">⚠️</div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Reset to Factory Defaults
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Reset all 12 sections back to the original codebase default configuration.
            </p>
          </div>
          <button
            onClick={handleConfirmReset}
            className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-semibold transition-all"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
