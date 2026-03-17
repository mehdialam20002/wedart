import { SectionHeading } from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail } from "lucide-react";

export default function LocationPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <SectionHeading 
          title="Our Studio" 
          subtitle="Visit us for a consultation over coffee"
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="aspect-square bg-black/50 rounded-2xl flex items-center justify-center border border-white/5">
            <span className="text-gray-500">[Google Maps Embed Placeholder]</span>
          </div>
          <div className="space-y-8">
            <div className="flex items-start gap-4 text-gray-300">
              <MapPin className="text-gold-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Headquarters</h4>
                <p className="font-sans leading-relaxed">
                  123 Luxury Avenue, Suite 101<br />
                  Mumbai, Maharashtra<br />
                  India - 400001
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 text-gray-300">
              <Phone className="text-gold-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Call Us</h4>
                <p className="font-sans">7549904732</p>
                <p className="font-sans">8448555792</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-300">
              <Mail className="text-gold-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-serif text-xl text-white mb-1">Email</h4>
                <p className="font-sans">wedartsfilms108@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
