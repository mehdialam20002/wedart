"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { createBooking } from "@/app/actions";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    date: "",
    package: [] as string[],
    details: "",
  });
  
  const [isPending, startTransition] = React.useTransition();

  const servicesList = [
    "Traditional Photography",
    "Cinematic Videography",
    "Candid Photography",
    "Drone Shoot",
    "Pre-Wedding Shoot",
    "Hardbound Albums"
  ];

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      package: prev.package.includes(service)
        ? prev.package.filter(s => s !== service)
        : [...prev.package, service]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.package.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }
    
    startTransition(async () => {
      const res = await createBooking({
        name: formData.name,
        phone: formData.phone,
        event_date: formData.date,
        package: formData.package.join(", "),
        requirements: formData.details,
      });

      if (res.success) {
        toast.success("Inquiry sent successfully! We will get back to you soon.");
        setFormData({ name: "", phone: "", date: "", package: [], details: "" });
      } else {
        toast.error(res.error || "Something went wrong. Please try again.");
      }
    });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2">
          <SectionHeading 
            title="Let's Capture Your Big Day" 
            subtitle="Bookings open for 2026-2027. Limited slots available."
            align="left"
            className="mb-8"
          />
          <p className="text-gray-400 font-sans leading-relaxed mb-8 max-w-lg">
            Every love story is beautiful, but yours should be unique. Fill out the form, 
            and let's discuss how we can turn your wedding moments into a timeless masterpiece.
          </p>
          
          <div className="flex flex-col gap-4 text-white font-sans">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p>+91 7549904732 <span className="text-gray-500 text-sm ml-2">(WhatsApp Available)</span></p>
                <p>+91 8448555792</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-gold-500" />
              </div>
              <p>wedartsfilms108@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8 md:p-10 border-gold-500/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]" hoverEffect={false}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                    placeholder="Rahul & Priya"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-gray-400 focus:outline-none focus:border-gold-500/50 transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans text-gray-400 mb-3 uppercase tracking-wide">
                    Select Services Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map((service) => (
                      <label 
                        key={service} 
                        className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                          formData.package.includes(service) 
                            ? "bg-gold-500/10 border-gold-500/50 text-white" 
                            : "bg-black/40 border-white/10 text-gray-400 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-white/20 bg-black/50 text-gold-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-gold-500"
                          checked={formData.package.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                        />
                        <span className="text-sm font-sans">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">
                    Event Details & Venue
                  </label>
                  <textarea
                    name="details"
                    rows={3}
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                    placeholder="Tell us about your wedding..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full mt-2 font-semibold" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/917549904732?text=Hi,%20I%20want%20to%20book%20wedding%20shoot"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:-translate-y-1 transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </section>
  );
}
