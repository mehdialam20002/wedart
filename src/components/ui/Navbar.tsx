"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { 
    name: "Gallery", 
    subLinks: [
      { name: "Photo Gallery", href: "/gallery" },
      { name: "Cinematic Videos", href: "/videos" },
    ] 
  },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Team", href: "/#team" },
  { 
    name: "Company", 
    subLinks: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
    ] 
  },
];

const BRAND_NAME = "WedArt Films";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen ? "bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="WedArt Films" 
                className="h-20 w-auto object-contain"
                style={{ filter: "var(--logo-filter)" }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <h1 className="font-serif text-2xl text-gold-500 tracking-wide font-medium">
                {BRAND_NAME}
              </h1>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative group lg:py-2"
                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    className={`text-sm font-sans uppercase tracking-[0.2em] transition-colors flex items-center gap-1 ${
                      pathname === link.href ? "text-gold-500 font-semibold" : "text-foreground/70 hover:text-gold-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    className={`text-sm font-sans uppercase tracking-[0.2em] transition-colors flex items-center gap-1 ${
                      link.subLinks?.some(sub => sub.href === pathname) ? "text-gold-500 font-semibold" : "text-foreground/70 hover:text-gold-500"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.name ? "rotate-180" : ""}`} />
                  </button>
                )}

                {/* Dropdown Menu */}
                {link.subLinks && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden py-2"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-6 py-3 text-xs uppercase tracking-widest font-medium transition-colors ${
                              pathname === sub.href ? "text-gold-500 bg-gold-500/5" : "text-foreground/70 hover:text-gold-500 hover:bg-gold-500/5"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              className="relative z-50 text-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl flex flex-col items-center justify-center min-h-screen"
          >
            <nav className="flex flex-col items-center gap-6 w-full max-w-xs">
              {navLinks.map((link) => (
                <div key={link.name} className="w-full text-center">
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`text-xl uppercase tracking-[0.2em] font-serif transition-colors ${
                        pathname === link.href ? "text-gold-500" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="space-y-4">
                      <span className="text-xs uppercase tracking-[0.3em] font-sans text-gold-500/50 font-bold block mb-2">
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-4">
                        {link.subLinks?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`text-lg uppercase tracking-[0.2em] font-serif transition-colors ${
                              pathname === sub.href ? "text-gold-500" : "text-foreground/70"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
