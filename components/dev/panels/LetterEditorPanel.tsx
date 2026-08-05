"use client";

import React, { useState } from "react";
import { useSiteConfig, LetterParagraphItem } from "@/context/SiteConfigContext";

export function LetterEditorPanel() {
  const { config, updateSection } = useSiteConfig();
  const { letter } = config;
  const [activePreview, setActivePreview] = useState(true);

  const handleHeaderChange = (field: "tagline" | "title" | "subtitle" | "buttonText" | "fontStyle", val: string) => {
    updateSection("letter", { [field]: val });
  };

  const handleParagraphChange = (id: string, text: string) => {
    const updated = letter.paragraphs.map((p) => (p.id === id ? { ...p, text } : p));
    updateSection("letter", { paragraphs: updated });
  };

  const handleAddParagraph = () => {
    const newP: LetterParagraphItem = {
      id: `p-${Date.now()}`,
      text: "Write your new heartwarming paragraph here...",
    };
    updateSection("letter", { paragraphs: [...letter.paragraphs, newP] });
  };

  const handleDeleteParagraph = (id: string) => {
    updateSection(
      "letter",
      { paragraphs: letter.paragraphs.filter((p) => p.id !== id) }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            Love Letter Editor 💌
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit letter titles, custom paragraphs, typography, and preview live formatting.
          </p>
        </div>

        <button
          onClick={() => setActivePreview(!activePreview)}
          className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 text-xs font-semibold hover:bg-rose-500/20 transition-all"
        >
          {activePreview ? "Hide Live Preview 👁️" : "Show Live Preview 👁️"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <div className="space-y-4 bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Letter Section Tagline
            </label>
            <input
              type="text"
              value={letter.tagline}
              onChange={(e) => handleHeaderChange("tagline", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Main Letter Title
            </label>
            <input
              type="text"
              value={letter.title}
              onChange={(e) => handleHeaderChange("title", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Subtitle
            </label>
            <input
              type="text"
              value={letter.subtitle}
              onChange={(e) => handleHeaderChange("subtitle", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Paragraphs List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-rose-500">
                Letter Paragraphs ({letter.paragraphs.length})
              </label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="px-3 py-1 rounded-lg bg-rose-500 text-white text-[11px] font-semibold"
              >
                + Add Paragraph
              </button>
            </div>

            {letter.paragraphs.map((p, idx) => (
              <div key={p.id} className="space-y-1.5 p-3 rounded-xl bg-white/30 dark:bg-slate-800/40 border border-white/30">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>Paragraph #{idx + 1}</span>
                  {letter.paragraphs.length > 1 && (
                    <button
                      onClick={() => handleDeleteParagraph(p.id)}
                      className="text-rose-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={p.text}
                  onChange={(e) => handleParagraphChange(p.id, e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Next Section Button Text
            </label>
            <input
              type="text"
              value={letter.buttonText}
              onChange={(e) => handleHeaderChange("buttonText", e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        {/* Live Preview Card */}
        {activePreview && (
          <div className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-2xl border border-white/30 shadow-xl flex flex-col justify-between select-none">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="font-sans text-xs tracking-[0.35em] uppercase text-rose-400 font-medium">
                  {letter.tagline}
                </span>
                <h3 className="font-serif text-3xl font-light text-slate-900 dark:text-slate-100">
                  {letter.title}
                </h3>
                <p className="font-serif italic text-xs text-slate-500 dark:text-slate-400">
                  {letter.subtitle}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                {letter.paragraphs.map((p, idx) => (
                  <p
                    key={p.id || idx}
                    className="font-serif text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line"
                  >
                    {p.text}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-2.5 rounded-full bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-medium border border-rose-200 dark:border-rose-900 shadow-md">
                {letter.buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
