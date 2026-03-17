"use client";

import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const packages = [
  {
    id: "essential",
    name: "Essential",
    price: "₹3,50,000",
    description: "Perfect for intimate weddings and pre-wedding shoots.",
    features: [
      "1 Leading Photographer",
      "1 Traditional Photographer",
      "1 Cinematic Videographer",
      "500+ Edited Photos",
      "3-5 Mins Highlight Video",
      "30 Pages Premium Album",
      "Soft Copies via Pen Drive",
    ],
    highlight: false,
  },
  {
    id: "luxury",
    name: "Luxury",
    price: "₹5,00,000",
    description: "Our most popular comprehensive wedding experience.",
    features: [
      "2 Leading Photographers",
      "2 Cinematic Videographers",
      "1 Drone Operator",
      "1000+ Edited Photos",
      "5-7 Mins Cinematic Teaser",
      "20 Mins Full Cinematic Film",
      "5 Instagram Reels (Within 48 Hrs)",
      "2 x 40 Pages Premium Albums",
    ],
    highlight: true,
  },
  {
    id: "royal",
    name: "Royal",
    price: "₹8,00,000",
    description: "The ultimate coverage for grand destination weddings.",
    features: [
      "3 Leading Photographers",
      "3 Cinematic Videographers",
      "2 Drone Operators",
      "Same Day Edit Screening",
      "Unlimited Photos",
      "7-10 Mins Cinematic Teaser",
      "30 Mins Full Cinematic Film",
      "10 Instagram Reels",
      "3 x 50 Pages Premium Albums",
    ],
    highlight: false,
  },
];

export function Packages() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Investment" 
          subtitle="Curated collections for your most treasured memories" 
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 lg:px-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.2 }}
              className="h-full flex relative"
            >
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-gold-400 to-gold-600 text-black px-6 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Most Popular
                  </div>
                </div>
              )}

              <GlassCard 
                className={`w-full flex flex-col p-8 md:p-10 transition-all duration-300 ${
                  pkg.highlight 
                    ? "border-gold-500/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] bg-card md:scale-105 transform origin-center z-10" 
                    : "border-border"
                }`}
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-foreground/70 font-sans text-sm mb-6 min-h-[40px]">
                    {pkg.description}
                  </p>
                  <div className="text-4xl lg:text-5xl font-sans font-semibold text-foreground tracking-tight flex items-baseline justify-center">
                    {pkg.price}
                    <span className="text-foreground/50 text-lg font-normal ml-2 tracking-normal">
                      / day
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

                <ul className="flex-grow space-y-5 mb-10">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-gold-500" />
                      </div>
                      <span className="text-foreground/90 font-sans text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={pkg.highlight ? "default" : "outline"} 
                  className="w-full mt-auto"
                  size="lg"
                >
                  Book Now
                </Button>
                <p className="text-center text-xs text-foreground/40 mt-4 font-sans flex items-center justify-center gap-1">
                  <Info className="w-3 h-3" />
                  Customizable based on requirements
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
