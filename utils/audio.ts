"use client";

// Web Audio API Synthesized Music Box Player for "Happy Birthday"
export function playHappyBirthdayMusicBox() {
  if (typeof window === "undefined") return;

  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();

  // Notes frequencies for "Happy Birthday" melody (in Hz)
  // G4 G4 A4 G4 C5 B4 | G4 G4 A4 G4 D5 C5 | G4 G4 G5 E5 C5 B4 A4 | F5 F5 E5 C5 D5 C5
  const notes = [
    { note: 392.0, duration: 0.35, delay: 0 }, // G4
    { note: 392.0, duration: 0.35, delay: 0.4 }, // G4
    { note: 440.0, duration: 0.7, delay: 0.8 }, // A4
    { note: 392.0, duration: 0.7, delay: 1.6 }, // G4
    { note: 523.25, duration: 0.7, delay: 2.4 }, // C5
    { note: 493.88, duration: 1.2, delay: 3.2 }, // B4

    { note: 392.0, duration: 0.35, delay: 4.6 }, // G4
    { note: 392.0, duration: 0.35, delay: 5.0 }, // G4
    { note: 440.0, duration: 0.7, delay: 5.4 }, // A4
    { note: 392.0, duration: 0.7, delay: 6.2 }, // G4
    { note: 587.33, duration: 0.7, delay: 7.0 }, // D5
    { note: 523.25, duration: 1.2, delay: 7.8 }, // C5

    { note: 392.0, duration: 0.35, delay: 9.2 }, // G4
    { note: 392.0, duration: 0.35, delay: 9.6 }, // G4
    { note: 783.99, duration: 0.7, delay: 10.0 }, // G5
    { note: 659.25, duration: 0.7, delay: 10.8 }, // E5
    { note: 523.25, duration: 0.7, delay: 11.6 }, // C5
    { note: 493.88, duration: 0.7, delay: 12.4 }, // B4
    { note: 440.0, duration: 1.2, delay: 13.2 }, // A4

    { note: 698.46, duration: 0.35, delay: 14.6 }, // F5
    { note: 698.46, duration: 0.35, delay: 15.0 }, // F5
    { note: 659.25, duration: 0.7, delay: 15.4 }, // E5
    { note: 523.25, duration: 0.7, delay: 16.2 }, // C5
    { note: 587.33, duration: 0.7, delay: 17.0 }, // D5
    { note: 523.25, duration: 1.6, delay: 17.8 }, // C5
  ];

  const now = ctx.currentTime + 0.1;

  notes.forEach(({ note, duration, delay }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle sine wave for delicate music box sound
    osc.type = "sine";
    osc.frequency.setValueAtTime(note, now + delay);

    // Music box envelope: fast attack, exponential decay
    gain.gain.setValueAtTime(0.001, now + delay);
    gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + duration + 0.1);
  });
}
