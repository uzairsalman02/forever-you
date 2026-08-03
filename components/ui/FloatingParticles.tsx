"use client";

import React from "react";

export function FloatingParticles() {
  // Static array of gentle particle positions to avoid SSR mismatch
  const particles = [
    { top: "15%", left: "20%", size: "8px", delay: "0s", duration: "10s" },
    { top: "25%", left: "75%", size: "12px", delay: "2s", duration: "12s" },
    { top: "50%", left: "10%", size: "10px", delay: "4s", duration: "11s" },
    { top: "65%", left: "85%", size: "6px", delay: "1s", duration: "9s" },
    { top: "80%", left: "30%", size: "14px", delay: "3s", duration: "13s" },
    { top: "35%", left: "45%", size: "8px", delay: "5s", duration: "10s" },
    { top: "70%", left: "60%", size: "10px", delay: "2.5s", duration: "11.5s" },
    { top: "10%", left: "60%", size: "6px", delay: "1.5s", duration: "8.5s" },
  ];

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-rose-200/40 blur-[1px] animate-float-particle"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
