import { SectionHeading } from "@/components/ui/SectionHeading";
import { CinematicVideos } from "@/components/sections/CinematicVideos";
import { getVideos } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function VideosPage() {
  const { data } = await getVideos();
  const initialVideos = data || [];

  return (
    <main className="min-h-screen pt-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <SectionHeading 
          title="Cinematic Experience" 
          subtitle="Relive the magic through motion"
        />
      </div>
      <CinematicVideos initialVideos={initialVideos} />
    </main>
  );
}
