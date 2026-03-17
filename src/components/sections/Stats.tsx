"use client";

import * as React from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  React.useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, springValue, value]);

  const displayValue = useTransform(springValue, (current) => 
    Math.round(current) + suffix
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export function Stats() {
  const stats = [
    { value: 500, suffix: "+", label: "Weddings Covered" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden border-y border-border">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.pattern')] opacity-5 mix-blend-overlay dark:opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl md:text-7xl font-serif text-gold-500 mb-4 font-light text-glow">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-foreground/50 font-sans tracking-[0.2em] uppercase text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
