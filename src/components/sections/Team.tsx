"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Arjun Singh",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: "Visionary filmmaker with 10+ years of experience in luxury weddings.",
    social: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Head of Photography",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    bio: "Specializes in candid portraits and emotional storytelling through frames.",
    social: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Senior Cinematographer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "Expert at capturing the grandeur and motion of the big Indian wedding.",
    social: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Priya Das",
    role: "Lead Video Editor",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bio: "The soul behind our cinematic films, blending music and emotions perfectly.",
    social: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

export function Team() {
  return (
    <section id="team" className="py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Meet the Visionaries" 
          subtitle="The dedicated team of experts behind your cinematic wedding story" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/5 group-hover:border-gold-500/30 transition-colors duration-500">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 border-b-4 border-gold-500 translate-y-4 group-hover:translate-y-0 text-white">
                  <div className="flex gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={member.social.instagram} 
                      className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
                    >
                      <Instagram className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={member.social.twitter} 
                      className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -2 }}
                      href={member.social.linkedin} 
                      className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-black hover:bg-white transition-colors shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-serif text-foreground font-medium mb-1 group-hover:text-gold-500 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-gold-500 font-sans text-[10px] tracking-[0.2em] uppercase mb-4 font-bold">
                  {member.role}
                </p>
                <p className="text-foreground/50 font-sans text-sm leading-relaxed max-w-[240px] mx-auto italic">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
