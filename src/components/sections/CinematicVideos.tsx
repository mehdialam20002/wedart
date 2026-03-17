"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export interface VideoItem {
  id: string | number;
  title: string;
  couple: string;
  thumbnail_url: string;
  youtube_id: string;
}

const dummyVideos: VideoItem[] = [
  {
    id: 1,
    title: "A Royal Rajasthani Affair",
    couple: "Rohan & Priya",
    thumbnail_url: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop",
    youtube_id: "LXb3EKWsInQ", // Dummy generic YouTube video ID
  },
  {
    id: 2,
    title: "Love in the Valley",
    couple: "Arjun & Neha",
    thumbnail_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    youtube_id: "LXb3EKWsInQ",
  },
  {
    id: 3,
    title: "A Beachfront Promise",
    couple: "Kabir & Ananya",
    thumbnail_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    youtube_id: "LXb3EKWsInQ",
  },
];

export function CinematicVideos({ initialVideos }: { initialVideos?: VideoItem[] }) {
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  
  const displayVideos = initialVideos && initialVideos.length > 0 ? initialVideos : dummyVideos;

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Cinematic Films" 
          subtitle="Relive the magic of your special day through our lenses" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {displayVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative rounded-2xl overflow-hidden aspect-video cursor-pointer"
              onClick={() => setActiveVideo(video.youtube_id)}
            >
              {/* Thumbnail Image */}
              <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-500/90 text-black flex items-center justify-center transform scale-90 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Content Details */}
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold-500 font-sans text-xs tracking-widest uppercase mb-1">
                  {video.couple}
                </p>
                <h3 className="text-white font-serif text-2xl font-medium">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative"
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="Cinematic Wedding Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0 absolute inset-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
