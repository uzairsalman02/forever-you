export interface DetailedMemory {
  id: string;
  image: string;
  title: string;
  description: string;
  date: string;
}

export const DETAILED_MEMORIES: DetailedMemory[] = [
  {
    id: "memory-1",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&auto=format&fit=crop&q=85",
    title: "Our First Memory",
    date: "21 August",
    description:
      "I still remember the exact moment our eyes met. It felt like time slowed down just for us. That day started a chapter that has brought more happiness into my life than words could ever describe.",
  },
  {
    id: "memory-2",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1000&auto=format&fit=crop&q=85",
    title: "The Evening We Talked For Hours",
    date: "Autumn Days",
    description:
      "We sat together while the world passed by outside. We talked about everything and nothing at all, discovering all the little things that made us who we are.",
  },
  {
    id: "memory-3",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=85",
    title: "Your Smile That Brightens Everything",
    date: "Golden Afternoon",
    description:
      "Whenever you smile, everything feels lighter. It is my absolute favorite sight in the world, and I cherish every quiet moment we share together.",
  },
  {
    id: "memory-4",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&auto=format&fit=crop&q=85",
    title: "Laughter Under The Stars",
    date: "Late Summer Night",
    description:
      "Looking up at the night sky, realizing that out of all the stars in the universe, having you right beside me is the greatest gift of all.",
  },
];
