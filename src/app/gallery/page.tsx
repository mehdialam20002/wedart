import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryClient } from "@/components/sections/GalleryClient";
import { getGallery } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const { data } = await getGallery();
  const initialData = data || [];

  return (
    <main className="min-h-screen pt-32 pb-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <SectionHeading 
          title="Our Gallery" 
          subtitle="A curated collection of our finest moments"
        />
        <GalleryClient initialData={initialData} />
      </div>
    </main>
  );
}
