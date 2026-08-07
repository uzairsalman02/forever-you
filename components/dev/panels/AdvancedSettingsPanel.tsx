"use client";

import React, { useRef } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function AdvancedSettingsPanel() {
  const { config, exportConfig, importConfig, resetToDefaults } = useSiteConfig();
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

  const [sbUrl, setSbUrl] = React.useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("forever_you_supabase_url") || "" : ""
  );
  const [sbKey, setSbKey] = React.useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("forever_you_supabase_key") || "" : ""
  );
  const [sbStatus, setSbStatus] = React.useState<string>("");
  const [isTesting, setIsTesting] = React.useState<boolean>(false);
  const [showSqlScript, setShowSqlScript] = React.useState<boolean>(false);

  const sqlScriptText = `CREATE TABLE IF NOT EXISTS public.site_config (
    id TEXT PRIMARY KEY,
    config_data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read and write access" 
ON public.site_config 
FOR ALL 
USING (true) 
WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_config;`;

  const handleSaveSupabase = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("forever_you_supabase_url", sbUrl.trim());
      localStorage.setItem("forever_you_supabase_key", sbKey.trim());
      setIsTesting(true);

      const { testSupabaseConnection, saveSiteConfigToSupabase } = await import("@/lib/supabase");
      const result = await testSupabaseConnection(sbUrl.trim(), sbKey.trim());
      setIsTesting(false);

      if (result.success) {
        setSbStatus("✅ Supabase Connected & Active! Syncing current settings...");
        await saveSiteConfigToSupabase(config, sbUrl.trim(), sbKey.trim());
        setTimeout(() => setSbStatus(""), 5000);
      } else {
        setSbStatus(`⚠️ ${result.message}`);
      }
    }
  };

  const handleManualPush = async () => {
    if (typeof window !== "undefined") {
      setIsTesting(true);
      const { saveSiteConfigToSupabase } = await import("@/lib/supabase");
      const success = await saveSiteConfigToSupabase(config, sbUrl.trim(), sbKey.trim());
      setIsTesting(false);
      if (success) {
        setSbStatus("⚡ All local CMS settings successfully pushed to Supabase Cloud!");
        setTimeout(() => setSbStatus(""), 4000);
      } else {
        setSbStatus("❌ Push failed. Check credentials and SQL table setup.");
      }
    }
  };

  const handleManualPull = async () => {
    if (typeof window !== "undefined") {
      setIsTesting(true);
      const { fetchSiteConfigFromSupabase } = await import("@/lib/supabase");
      const sbData = await fetchSiteConfigFromSupabase(sbUrl.trim(), sbKey.trim());
      setIsTesting(false);
      if (sbData && typeof sbData === "object" && sbData.general) {
        const success = importConfig(JSON.stringify(sbData));
        if (success) {
          setSbStatus("📥 Successfully pulled and applied latest Supabase settings!");
          setTimeout(() => setSbStatus(""), 4000);
        }
      } else {
        setSbStatus("❌ Pull failed. No data found on Supabase.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Advanced Settings & Supabase Cloud Sync 🚀
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Export full CMS configuration, connect free Supabase cloud database, or reset settings to factory defaults.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />

      {/* Supabase Free Cloud Storage & Database Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-cyan-500/10 backdrop-blur-xl border border-emerald-500/20 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Supabase Free Database & Image Cloud Storage (100% Free Forever)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connect your free Supabase project to automatically sync all photos, love letter, and text edits between your phone and laptop!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Supabase Project URL
            </label>
            <input
              type="text"
              value={sbUrl}
              onChange={(e) => setSbUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Supabase Anon Key
            </label>
            <input
              type="password"
              value={sbKey}
              onChange={(e) => setSbKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSupabase}
              disabled={isTesting}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-all disabled:opacity-50"
            >
              {isTesting ? "Connecting..." : "Test Connection & Connect ⚡"}
            </button>

            <button
              onClick={handleManualPush}
              disabled={isTesting}
              className="px-4 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-700 dark:text-teal-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
            >
              Push Local to Supabase ⚡
            </button>

            <button
              onClick={handleManualPull}
              disabled={isTesting}
              className="px-4 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500 text-sky-700 dark:text-sky-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-50"
            >
              Pull Supabase to Local 📥
            </button>
          </div>

          <button
            onClick={() => setShowSqlScript(!showSqlScript)}
            className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            {showSqlScript ? "Hide SQL Table Script 🔼" : "Show Supabase SQL Table Script 📜"}
          </button>
        </div>

        {showSqlScript && (
          <div className="mt-3 p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2 border border-slate-700">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-emerald-400">
                Run this SQL in Supabase SQL Editor:
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlScriptText);
                  alert("SQL Script copied to clipboard!");
                }}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-semibold"
              >
                Copy SQL Script 📋
              </button>
            </div>
            <pre className="p-3 bg-black/60 rounded-lg overflow-x-auto text-[11px] leading-relaxed text-slate-200">
              {sqlScriptText}
            </pre>
          </div>
        )}

        {sbStatus && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
            {sbStatus}
          </div>
        )}
      </div>

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
