"use client";

import React from "react";

export function WaxSeal() {
  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 shadow-[0_6px_16px_rgba(159,18,57,0.35)] border border-rose-600/40 select-none">
      {/* Inner embossed rim */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-rose-500/30 flex items-center justify-center bg-rose-900/40 shadow-inner">
        <span className="text-rose-200 text-lg sm:text-xl font-serif italic font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
          ❤️
        </span>
      </div>
    </div>
  );
}
