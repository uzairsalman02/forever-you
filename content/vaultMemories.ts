export interface VaultMemory {
  id: string;
  imageUrl: string;
  caption: string;
  rotation: string; // Base rotation angle
  hoverRotation: string; // Reduced rotation on hover
  aspectRatio: string; // Aspect ratio variation
  widthClass: string; // Size variation
  zIndex: number; // Layering order for realistic overlapping
  marginOffset: string; // Negative margin / translation offset for organic scatter
}

export const VAULT_MEMORIES: VaultMemory[] = [
  {
    id: "mem-1",
    imageUrl:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
    caption: "Sunset Walks",
    rotation: "-10deg",
    hoverRotation: "-2deg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-52 sm:w-64 md:w-72",
    zIndex: 12,
    marginOffset: "mt-0 sm:mt-2 -mr-6 sm:-mr-10",
  },
  {
    id: "mem-2",
    imageUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80",
    caption: "Quiet Moments",
    rotation: "7deg",
    hoverRotation: "1deg",
    aspectRatio: "aspect-[3/4]",
    widthClass: "w-48 sm:w-56 md:w-64",
    zIndex: 18,
    marginOffset: "-mt-4 sm:-mt-8 -ml-4 sm:-ml-8",
  },
  {
    id: "mem-3",
    imageUrl:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    caption: "Hand in Hand",
    rotation: "-14deg",
    hoverRotation: "-3deg",
    aspectRatio: "aspect-square",
    widthClass: "w-56 sm:w-68 md:w-76",
    zIndex: 15,
    marginOffset: "mt-6 sm:mt-10 -ml-6 sm:-ml-12",
  },
  {
    id: "mem-4",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    caption: "Laughing Together",
    rotation: "11deg",
    hoverRotation: "2deg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-52 sm:w-60 md:w-68",
    zIndex: 22,
    marginOffset: "-mt-6 sm:-mt-12 -mr-8 sm:-mr-14",
  },
  {
    id: "mem-5",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    caption: "Your Warm Smile",
    rotation: "-8deg",
    hoverRotation: "-1deg",
    aspectRatio: "aspect-[5/6]",
    widthClass: "w-56 sm:w-64 md:w-72",
    zIndex: 14,
    marginOffset: "mt-4 sm:mt-8 -ml-8 sm:-ml-14",
  },
  {
    id: "mem-6",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
    caption: "Golden Hour",
    rotation: "13deg",
    hoverRotation: "3deg",
    aspectRatio: "aspect-[3/4]",
    widthClass: "w-48 sm:w-56 md:w-64",
    zIndex: 20,
    marginOffset: "-mt-8 sm:-mt-14 -mr-6 sm:-mr-10",
  },
  {
    id: "mem-7",
    imageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80",
    caption: "Our First Trip",
    rotation: "-11deg",
    hoverRotation: "-2deg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-54 sm:w-64 md:w-72",
    zIndex: 16,
    marginOffset: "mt-2 sm:mt-6 -ml-4 sm:-ml-8",
  },
  {
    id: "mem-8",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
    caption: "Unforgettable Day",
    rotation: "6deg",
    hoverRotation: "1deg",
    aspectRatio: "aspect-[3/4]",
    widthClass: "w-50 sm:w-58 md:w-66",
    zIndex: 24,
    marginOffset: "-mt-4 sm:-mt-10 -mr-10 sm:-mr-16",
  },
  {
    id: "mem-9",
    imageUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80",
    caption: "Coffee & Talks",
    rotation: "-12deg",
    hoverRotation: "-2deg",
    aspectRatio: "aspect-square",
    widthClass: "w-56 sm:w-68 md:w-76",
    zIndex: 13,
    marginOffset: "mt-8 sm:mt-12 -ml-10 sm:-ml-16",
  },
  {
    id: "mem-10",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    caption: "Stargazing",
    rotation: "9deg",
    hoverRotation: "2deg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-48 sm:w-56 md:w-64",
    zIndex: 19,
    marginOffset: "-mt-6 sm:-mt-12 -mr-6 sm:-mr-10",
  },
  {
    id: "mem-11",
    imageUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&auto=format&fit=crop&q=80",
    caption: "Summer Memories",
    rotation: "-7deg",
    hoverRotation: "-1deg",
    aspectRatio: "aspect-[5/6]",
    widthClass: "w-54 sm:w-62 md:w-70",
    zIndex: 17,
    marginOffset: "mt-4 sm:mt-8 -ml-6 sm:-ml-12",
  },
  {
    id: "mem-12",
    imageUrl:
      "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=600&auto=format&fit=crop&q=80",
    caption: "Forever Us",
    rotation: "10deg",
    hoverRotation: "2deg",
    aspectRatio: "aspect-[4/5]",
    widthClass: "w-56 sm:w-64 md:w-74",
    zIndex: 21,
    marginOffset: "-mt-2 sm:-mt-6 -mr-8 sm:-mr-14",
  },
];
