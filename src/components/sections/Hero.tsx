"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
        >
          {/* Dummy high-quality aesthetic video link */}
          <source
            src="https://cdn.pixabay.com/video/2021/08/10/84518-586794622_large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/60 to-background" />
        {/* Warm color light leak overlay */}
        <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay" />
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gold-400 rounded-full blur-[1px]"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gold-500 font-sans tracking-[0.2em] text-sm md:text-base mb-6 uppercase"
        >
          Cinematic Wedding Photography & Films
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-8"
        >
          We Capture Your <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            Emotions
          </span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/contact" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-lg px-8">
              Book Your Date
            </Button>
          </Link>
          <Link href="/gallery" className="w-full sm:w-auto">
            <Button size="lg" variant="glass" className="w-full text-lg px-8">
              View Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gold-500 w-6 h-6 opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
