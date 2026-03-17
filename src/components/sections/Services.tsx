"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Plane, BookOpen, Smartphone, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "photography",
    title: "Wedding Photography",
    icon: Camera,
    shortDesc: "Timeless captures of your most beautiful moments.",
    fullDesc: "We specialize in capturing candid, authentic moments that tell your unique love story. Our team uses state-of-the-art equipment to deliver high-resolution images that you'll cherish forever.",
  },
  {
    id: "cinematic",
    title: "Cinematic Video",
    icon: Video,
    shortDesc: "High-end cinematic storytelling of your wedding.",
    fullDesc: "Our cinematic films are edited like a movie, featuring licensed soundtracks, color grading, and a narrative structure that brings the emotions of your wedding day back to life.",
  },
  {
    id: "drone",
    title: "Drone Shoot",
    icon: Plane,
    shortDesc: "Breathtaking aerial perspectives of your venue.",
    fullDesc: "Capture the grandeur of your wedding venue and the excitement of your baraat from the skies. We provide licensed drone operators for safe and spectacular aerial footage.",
  },
  {
    id: "albums",
    title: "Album Designing",
    icon: BookOpen,
    shortDesc: "Premium handcrafted photo albums.",
    fullDesc: "Turn your digital memories into a tangible keepsake. We offer premium, handcrafted flush-mount albums with lay-flat pages, imported leather covers, and archival-quality paper.",
  },
  {
    id: "mixing",
    title: "Video Mixing Lab",
    icon: Smartphone, // Reusing icon for visual placeholder
    shortDesc: "Professional video editing and color grading.",
    fullDesc: "Our in-house video mixing lab ensures your films are perfectly cut, color-graded, and synced to music for an emotional viewing experience.",
  },
];

export function Services() {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image with Theme-aware Overlay */}
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2670&auto=format&fit=crop')] bg-fixed bg-cover bg-center"
        style={{ opacity: 0.1 }} // Subtle in light mode, will be darker in dark mode via overlay
      />
      <div className="absolute inset-0 bg-background/90 dark:bg-black/80 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Our Services" 
          subtitle="Comprehensive visual storytelling for luxury weddings" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isExpanded = expandedId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={cn(
                  "col-span-1",
                  idx === 4 && "md:col-span-2 lg:col-span-1 lg:col-start-2"
                )}
              >
                <GlassCard
                  className="h-full cursor-pointer flex flex-col group border-border hover:border-gold-500/50"
                  onClick={() => toggleExpand(service.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-gold-500" />
                    </div>
                    <h3 className="text-xl font-serif text-foreground font-medium">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-foreground/70 font-sans text-sm mb-4 leading-relaxed flex-grow">
                    {service.shortDesc}
                  </p>

                  <div className="flex items-center justify-between text-gold-500 text-sm font-semibold tracking-wide uppercase mt-auto pt-4 border-t border-border">
                    <span>{isExpanded ? "Show Less" : "Learn More"}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-foreground/60 font-sans text-sm pt-4 leading-relaxed mt-2 border-t border-border">
                          {service.fullDesc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
