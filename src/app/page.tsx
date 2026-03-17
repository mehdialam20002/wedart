import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CinematicVideos } from "@/components/sections/CinematicVideos";
import { Services } from "@/components/sections/Services";
import { Packages } from "@/components/sections/Packages";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-gold-500/30 selection:text-white">
      <Hero />
      <Stats />
      <FeaturedWork />
      <CinematicVideos />
      <Services />
      <Packages />
      <Team />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
