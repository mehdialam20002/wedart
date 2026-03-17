"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const categories = ["All", "Wedding Stories", "Pre-Wedding", "Cinematic Films"];

const galleryImages = [
  { 
    id: 1, 
    category: "Wedding Stories", 
    title: "The Royal Union", 
    location: "Udaipur, Rajasthan",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    category: "Pre-Wedding", 
    title: "Eternal Bloom", 
    location: "Ladakh, India",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    category: "Cinematic Films", 
    title: "Soulmate Chronicles", 
    location: "Baku, Azerbaijan",
    url: "https://images.unsplash.com/photo-1583939000240-690e168d6d53?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    category: "Wedding Stories", 
    title: "Classic Elegance", 
    location: "New Delhi, India",
    url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 5, 
    category: "Pre-Wedding", 
    title: "Desert Serenade", 
    location: "Jaisalmer, Rajasthan",
    url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 6, 
    category: "Cinematic Films", 
    title: "Vows of Silence", 
    location: "Bali, Indonesia",
    url: "https://images.unsplash.com/photo-1536735560792-7f897f2613ce?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    id: 7, 
    category: "Wedding Stories", 
    title: "Golden Hour Bliss", 
    location: "Goa, India",
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop" 
  }
];

export function FeaturedWork() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const filteredImages = galleryImages.filter(
    (img) => activeCategory === "All" || img.category === activeCategory
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <SectionHeading 
              title="Featured Stories" 
              subtitle="Explore our meticulously crafted wedding films and emotional captures"
              align="left"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-4 mt-8 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? "bg-gold-500 border-gold-500 text-black font-bold"
                  : "bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-gold-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Carousel Container with Side Overlays */}
      <div className="w-full relative group/carousel px-4">
        {/* Navigation Buttons - Absolute Positioned Over Carousel */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between pointer-events-none px-2 md:px-10">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-all pointer-events-auto shadow-2xl group/btn"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 transform group-active/btn:scale-90 transition-transform" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-all pointer-events-auto shadow-2xl group/btn"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 transform group-active/btn:scale-90 transition-transform" />
          </button>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-10 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ 
            scrollSnapType: "x mandatory",
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <style jsx>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex-none w-[85vw] md:w-[600px] lg:w-[750px] aspect-[16/10] rounded-[2rem] overflow-hidden snap-center group cursor-pointer shadow-2xl border border-white/5"
              >
                {/* Image Component with Cinematic Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <motion.div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-[1px] bg-gold-500" />
                      <p className="text-gold-500 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                        {img.category}
                      </p>
                    </div>
                    <h3 className="text-white text-2xl md:text-5xl font-serif font-medium leading-tight">
                      {img.title}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm font-sans tracking-wide">
                      {img.location}
                    </p>
                  </motion.div>
                </div>

                {/* Hover Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gold-950/20 backdrop-blur-[2px]">
                  <div className="w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center text-black transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                    {img.category.includes("Films") ? <Play fill="currentColor" className="w-8 h-8 ml-1" /> : <ChevronRight className="w-10 h-10" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Decorative Light Leak */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      </div>
    </section>
  );
}
