"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { getGallery } from "@/app/actions";

interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

const dummyImages: GalleryImage[] = [
  { id: "1", category: "wedding", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" },
  { id: "2", category: "prewedding", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" },
  { id: "3", category: "cinematic", url: "https://images.unsplash.com/photo-1583939000240-690e168d6d53?q=80&w=800&auto=format&fit=crop" },
  { id: "4", category: "wedding", url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop" },
  { id: "5", category: "prewedding", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop" },
  { id: "6", category: "cinematic", url: "https://images.unsplash.com/photo-1536735560792-7f897f2613ce?q=80&w=800&auto=format&fit=crop" },
  { id: "7", category: "wedding", url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop" },
  { id: "8", category: "prewedding", url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop" },
];

export function GalleryClient({ initialData }: { initialData: GalleryImage[] }) {
  const [images, setImages] = React.useState<GalleryImage[]>(initialData.length > 0 ? initialData : dummyImages);
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [lightboxImg, setLightboxImg] = React.useState<string | null>(null);

  const categories = ["all", "wedding", "prewedding", "cinematic"];

  const filteredImages = images.filter(
    (img) => activeCategory === "all" || img.category === activeCategory
  );

  return (
    <>
      {/* Category Filter */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-sans text-sm tracking-wide transition-all whitespace-nowrap capitalize ${
              activeCategory === cat
                ? "bg-gold-500 text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid (CSS setup) */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative break-inside-avoid rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setLightboxImg(img.url)}
          >
            <img
              src={img.url}
              alt={img.category}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-sans tracking-widest uppercase text-sm font-semibold border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[101]"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={lightboxImg}
              alt="Lightbox View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
