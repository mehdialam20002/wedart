import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="About Us" 
          subtitle="The team behind the lens"
        />
        <div className="mt-12 text-foreground/70 font-sans leading-relaxed space-y-6">
          <p>
            WedArt Films was born out of a passion for storytelling. We believe that every couple has a unique narrative, and our goal is to translate that narrative into timeless visual art.
          </p>
          <p>
            With over 5 years of experience and 500+ weddings covered across the globe, we have honed our craft to be unobtrusive yet omnipresent. We capture the raw, unscripted moments that make your wedding day truly yours.
          </p>
          <p>
            Our team consists of award-winning photographers, cinematic videographers, and creative editors who share a singular vision: to create a masterpiece out of your emotions.
          </p>
        </div>
      </div>
    </main>
  );
}
