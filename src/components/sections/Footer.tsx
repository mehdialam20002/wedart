"use client";

import { Instagram, Facebook, Youtube, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card py-12 border-t border-border relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Brand */}
        <div className="text-center md:text-left">
          <img 
            src="/logo.png" 
            alt="WedArt Films" 
            className="h-25 w-auto object-contain mb-2 mx-auto md:mx-0 dark:invert-0 light:invert"
            style={{ filter: "var(--logo-filter)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const h2 = (e.target as HTMLImageElement).nextSibling as HTMLElement;
              if (h2) h2.style.display = 'block';
            }}
          />
          <h2 className="font-serif text-3xl text-gold-500 mb-2">WedArt Films</h2>
          <p className="text-foreground/40 font-sans text-xs tracking-wider uppercase">
            Capturing emotions since 2018
          </p>
        </div>

        {/* Socials */}
        <div className="flex gap-4 items-center">
          <a href="https://instagram.com/wedart.films" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-foreground/50 hover:text-gold-500 transition-colors">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-gold-500 transition-colors">
              <Instagram className="w-4 h-4" />
            </div>
            <span className="font-sans text-sm tracking-wider hidden md:block">@wedart.films</span>
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:text-gold-500 hover:border-gold-500 transition-colors">
            <Facebook className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/50 hover:text-gold-500 hover:border-gold-500 transition-colors">
            <Youtube className="w-4 h-4" />
          </a>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-foreground/30">
        <p>&copy; {new Date().getFullYear()} WedArt Films. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-600 fill-red-600" /> for beautiful couples
        </p>
      </div>
    </footer>
  );
}
