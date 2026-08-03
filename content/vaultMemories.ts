export interface VaultMemory {
  id: string;
  imageUrl: string;
  rotation: string; // Base rotation angle (-12deg to +12deg)
  hoverRotation: string; // Reduced rotation on hover
  aspectRatio: string; // Aspect ratio variation
  widthClass: string; // Size variation
  zIndex: number; // Layering order for realistic overlapping
  marginOffset: string; // Negative margin / translation offset for organic scatter
  isFavorite?: boolean; // Focal photograph for camera zoom transition
}

// Single source configuration list of aesthetic placeholder images (easy to replace with real photos later)
const sampleImages = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=700&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&auto=format&fit=crop&q=85",
];

const aspectRatios = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/6]",
];

const widthClasses = [
  "w-28 sm:w-36 md:w-44 lg:w-52",
  "w-32 sm:w-40 md:w-48 lg:w-56",
  "w-36 sm:w-44 md:w-52 lg:w-60",
  "w-28 sm:w-34 md:w-40 lg:w-48",
];

const marginOffsets = [
  "-mt-6 sm:-mt-10 -ml-4 sm:-ml-8",
  "mt-4 sm:mt-8 -mr-6 sm:-mr-12",
  "-mt-8 sm:-mt-14 -ml-6 sm:-ml-10",
  "mt-6 sm:mt-12 -mr-4 sm:-mr-8",
  "-mt-4 sm:-mt-8 -ml-8 sm:-ml-14",
  "mt-2 sm:mt-4 -mr-8 sm:-mr-16",
];

// Generate 50 distinct polaroid items (architecture supports up to 100)
export const VAULT_MEMORIES: VaultMemory[] = Array.from({ length: 50 }).map(
  (_, i) => {
    // Generate angles constrained between -12deg and +12deg
    const angle = ((i * 5 + 2) % 25) - 12;
    const hoverAngle = angle > 0 ? 1 : -1;
    const isFav = i === 24; // Center focal photograph for camera zoom

    return {
      id: `mem-${i + 1}`,
      imageUrl: sampleImages[i % sampleImages.length],
      rotation: `${angle}deg`,
      hoverRotation: `${hoverAngle}deg`,
      aspectRatio: aspectRatios[i % aspectRatios.length],
      widthClass: isFav ? "w-40 sm:w-52 md:w-60 lg:w-72" : widthClasses[i % widthClasses.length],
      zIndex: isFav ? 45 : (i % 35) + 5,
      marginOffset: marginOffsets[i % marginOffsets.length],
      isFavorite: isFav,
    };
  }
);
