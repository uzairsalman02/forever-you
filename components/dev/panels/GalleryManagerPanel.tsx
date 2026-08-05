"use client";

import React, { useState, useRef } from "react";
import { useSiteConfig, GalleryItem } from "@/context/SiteConfigContext";

export function GalleryManagerPanel() {
  const { config, updateSection } = useSiteConfig();
  const { gallery } = config;

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add new image by URL
  const handleAddImageUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim()) return;

    const newItem: GalleryItem = {
      id: `custom-img-${Date.now()}`,
      imageUrl: newImageUrl.trim(),
      caption: newCaption.trim() || `Memory ${gallery.length + 1}`,
      isFavorite: false,
      rotation: `${((gallery.length * 5) % 25) - 12}deg`,
    };

    updateSection("gallery", [...gallery, newItem]);
    setNewImageUrl("");
    setNewCaption("");
  };

  // Upload local image files as Data URLs
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const newItem: GalleryItem = {
            id: `uploaded-img-${Date.now()}-${index}`,
            imageUrl: dataUrl,
            caption: file.name.replace(/\.[^/.]+$/, ""),
            isFavorite: false,
            rotation: `${((gallery.length * 5) % 25) - 12}deg`,
          };
          updateSection("gallery", [...gallery, newItem]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Delete image
  const handleDelete = (id: string) => {
    updateSection(
      "gallery",
      gallery.filter((item) => item.id !== id)
    );
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    updateSection(
      "gallery",
      gallery.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Move item up / down for ordering
  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= gallery.length) return;

    const newGallery = [...gallery];
    const temp = newGallery[index];
    newGallery[index] = newGallery[targetIndex];
    newGallery[targetIndex] = temp;
    updateSection("gallery", newGallery);
  };

  // Update caption
  const handleCaptionChange = (id: string, newCap: string) => {
    updateSection(
      "gallery",
      gallery.map((item) => (item.id === id ? { ...item, caption: newCap } : item))
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Gallery Manager 🖼️
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Upload, reorder, delete, and mark favorite photographs (Supports 100+ images).
        </p>
      </div>

      {/* Upload Form Box */}
      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Add New Images
        </h3>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <div className="flex flex-col sm:flex-row gap-3">
          {/* File Upload Dropzone */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 py-4 px-6 rounded-xl border-2 border-dashed border-rose-400/40 hover:border-rose-500 bg-rose-500/5 dark:bg-rose-500/10 text-xs font-medium text-rose-600 dark:text-rose-300 flex items-center justify-center gap-2 transition-all"
          >
            <span className="text-base">📁</span>
            <span>Upload Image Files (Multiple Supported)</span>
          </button>

          {/* Or URL Form */}
          <form onSubmit={handleAddImageUrl} className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Paste Image URL..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-all"
            >
              Add URL
            </button>
          </form>
        </div>
      </div>

      {/* Gallery Grid List */}
      <div className="bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/20 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Current Gallery Items ({gallery.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[550px] overflow-y-auto pr-2">
          {gallery.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl border transition-all flex flex-col gap-2 relative ${
                item.isFavorite
                  ? "bg-rose-500/10 border-rose-400 dark:border-rose-500"
                  : "bg-white/30 dark:bg-slate-800/40 border-white/30"
              }`}
            >
              {/* Thumbnail Image */}
              <div
                onClick={() => setPreviewImage(item.imageUrl)}
                className="w-full aspect-square rounded-lg overflow-hidden relative cursor-pointer group bg-slate-900/10"
              >
                {/* eslint-disable-next-html-loader */}
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                  🔍 Preview
                </div>
              </div>

              {/* Caption Input */}
              <input
                type="text"
                value={item.caption}
                onChange={(e) => handleCaptionChange(item.id, e.target.value)}
                className="w-full px-2.5 py-1 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-800 dark:text-slate-100"
              />

              {/* Action Controls */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleToggleFavorite(item.id)}
                  className={`text-xs font-semibold px-2 py-0.5 rounded ${
                    item.isFavorite
                      ? "bg-rose-500 text-white"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                  title="Mark as Focal Photograph"
                >
                  {item.isFavorite ? "⭐ Focal" : "☆ Focal"}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 rounded bg-white/40 dark:bg-slate-700 disabled:opacity-30 text-[10px]"
                    title="Move Up"
                  >
                    ⬆️
                  </button>
                  <button
                    disabled={idx === gallery.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 rounded bg-white/40 dark:bg-slate-700 disabled:opacity-30 text-[10px]"
                    title="Move Down"
                  >
                    ⬇️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 rounded bg-rose-500/20 text-rose-600 text-[10px] hover:bg-rose-500 hover:text-white transition-colors"
                    title="Delete Image"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div className="max-w-3xl max-h-[85vh] relative">
            <img
              src={previewImage}
              alt="Full Preview"
              className="w-full h-full object-contain rounded-2xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
