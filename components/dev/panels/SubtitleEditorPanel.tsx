"use client";

import React, { useState } from "react";
import { useSiteConfig, SubtitleItem, DEFAULT_SUBTITLES } from "@/context/SiteConfigContext";

export function SubtitleEditorPanel() {
  const { config, updateSection } = useSiteConfig();
  const rawSubtitles = config.subtitles && config.subtitles.length > 0 ? config.subtitles : DEFAULT_SUBTITLES;

  const [previewLineIdx, setPreviewLineIdx] = useState<number>(0);
  const [isPreviewActive, setIsPreviewActive] = useState<boolean>(false);

  const handleUpdateLine = (id: string, field: keyof SubtitleItem, value: any) => {
    const updated = rawSubtitles.map((sub) =>
      sub.id === id ? { ...sub, [field]: value } : sub
    );
    updateSection("subtitles", updated);
  };

  const handleAddLine = () => {
    const newLine: SubtitleItem = {
      id: `sub-${Date.now()}`,
      text: "Type your new romantic poetry sentence here...",
      holdDuration: 2.8,
    };
    updateSection("subtitles", [...rawSubtitles, newLine]);
  };

  const handleDeleteLine = (id: string) => {
    updateSection(
      "subtitles",
      rawSubtitles.filter((sub) => sub.id !== id)
    );
  };

  const handleMoveLine = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= rawSubtitles.length) return;

    const list = [...rawSubtitles];
    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;
    updateSection("subtitles", list);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Cinematic Subtitle Editor 🎬
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize sentence-by-sentence short film poetry, line order, and display durations.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsPreviewActive(!isPreviewActive)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
          >
            {isPreviewActive ? "Hide Simulator 👁️" : "Test Live Simulator 👁️"}
          </button>

          <button
            onClick={handleAddLine}
            className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md transition-all"
          >
            + Add Line
          </button>
        </div>
      </div>

      {/* Live Preview Simulator Card */}
      {isPreviewActive && (
        <div className="p-8 rounded-2xl bg-[#08080c] text-white border border-slate-800 shadow-2xl text-center space-y-4 relative select-none">
          <span className="font-sans text-[10px] uppercase tracking-widest text-rose-400 font-semibold block">
            Live Subtitle Simulator (Line {previewLineIdx + 1} of {rawSubtitles.length})
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl text-slate-100 font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] max-w-xl mx-auto min-h-[60px] flex items-center justify-center">
            {rawSubtitles[previewLineIdx]?.text || "No text"}
          </h3>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              disabled={previewLineIdx === 0}
              onClick={() => setPreviewLineIdx((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs disabled:opacity-30"
            >
              &lt;&lt; Prev
            </button>
            <button
              disabled={previewLineIdx >= rawSubtitles.length - 1}
              onClick={() => setPreviewLineIdx((prev) => Math.min(rawSubtitles.length - 1, prev + 1))}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs disabled:opacity-30"
            >
              Next &gt;&gt;
            </button>
          </div>
        </div>
      )}

      {/* Subtitles Editing List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {rawSubtitles.map((sub, idx) => (
          <div
            key={sub.id || idx}
            className="p-4 rounded-xl bg-white/60 backdrop-blur-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center"
          >
            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center shrink-0">
              #{idx + 1}
            </span>

            <div className="flex-1 w-full space-y-1">
              <input
                type="text"
                value={sub.text}
                onChange={(e) => handleUpdateLine(sub.id, "text", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                placeholder="Sentence text..."
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Hold:</span>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={sub.holdDuration || 2.5}
                  onChange={(e) => handleUpdateLine(sub.id, "holdDuration", parseFloat(e.target.value))}
                  className="w-16 px-2 py-1 rounded-lg bg-white border border-slate-200 text-xs font-mono font-medium text-slate-800"
                />
                <span>s</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={idx === 0}
                  onClick={() => handleMoveLine(idx, "up")}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs"
                  title="Move Up"
                >
                  ⬆️
                </button>
                <button
                  disabled={idx === rawSubtitles.length - 1}
                  onClick={() => handleMoveLine(idx, "down")}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-xs"
                  title="Move Down"
                >
                  ⬇️
                </button>
                <button
                  onClick={() => handleDeleteLine(sub.id)}
                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors text-xs"
                  title="Delete Line"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
