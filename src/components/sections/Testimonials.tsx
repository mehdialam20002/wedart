"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Aaditya & Sneha",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop",
    text: "Booking WedArt Films was the best decision we made for our Udaipur wedding. The team was so invisible yet captured every tears, every smile, and the madness of our Sangeet perfectly. The album is a masterpiece!",
    rating: 5,
  },
  {
    id: 2,
    name: "Vikram & Anjali",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    text: "We wanted our wedding film to look like a Bollywood movie, and they delivered exactly that! The drone shots of our entry were breathtaking. Highly recommend their Luxury package.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rahul & Maya",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    text: "The dedication of this team is unmatched. From early morning Haldi to the late-night Pheras, they were always smiling and energetic. The Instagram reels were delivered the next day, which our friends loved!",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-sliding interval
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds slide

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading 
          title="Words of Love" 
          subtitle="Real stories from our beautiful couples" 
        />

        <div className="max-w-4xl mx-auto mt-16 relative min-h-[400px]">
          {/* Quote Mark Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-10">
            <Quote className="w-40 h-40 text-gold-500" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center text-center px-4"
            >
              {/* Couple Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold-500/30 mb-6 relative">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8 italic max-w-3xl px-4">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Names */}
              <h4 className="text-gold-500 font-sans tracking-widest uppercase text-sm font-semibold">
                {testimonials[currentIndex].name}
              </h4>
            </motion.div>
          </AnimatePresence>

          {/* Dots Pagination */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? "w-8 h-2 bg-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.6)]" 
                    : "w-2 h-2 bg-foreground/10 hover:bg-foreground/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
