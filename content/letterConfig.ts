export interface LetterParagraph {
  id: string;
  marker: string; // e.g. "[Paragraph 1]"
  text: string;
}

export interface LetterConfig {
  tagline: string;
  title: string;
  paragraphs: LetterParagraph[];
  buttonText: string;
}

// Single source configuration file for Love Letter content
// Changing the letter text in the future requires editing ONLY this file.
export const LETTER_CONFIG: LetterConfig = {
  tagline: "Love Letter",
  title: "A Letter From My Heart",
  paragraphs: [
    {
      id: "p1",
      marker: "[Paragraph 1]",
      text: "My Dearest,\nWriting this down because some feelings are too grand for ordinary words. From the moment you entered my life, everything took on a warmer, brighter, and infinitely more meaningful light.",
    },
    {
      id: "p2",
      marker: "[Paragraph 2]",
      text: "Every laugh we have shared, every quiet evening side by side, and every memory we have built has become my greatest treasure. You make every day feel like a beautiful, cherished gift.",
    },
    {
      id: "p3",
      marker: "[Paragraph 3]",
      text: "Thank you for being you, for changing my world in ways I never thought possible. Forever and always, my heart belongs to you.",
    },
  ],
  buttonText: "There's One More Surprise ❤️",
};
