import { SectionHeading } from "@/components/ui/SectionHeading";

export default function PolicyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <SectionHeading 
          title="Privacy Policy & Terms" 
          subtitle="How we handle your data and bookings"
        />
        <div className="mt-12 text-gray-300 font-sans leading-relaxed space-y-8">
          <section>
            <h3 className="text-xl font-serif text-white mb-2">Booking Terms</h3>
            <p>A non-refundable advance of 50% is required to secure the date. The remaining 50% is due on the first day of the event.</p>
          </section>
          <section>
            <h3 className="text-xl font-serif text-white mb-2">Deliverables Timeline</h3>
            <p>Raw files (if applicable) are delivered within 1 week. Social media reels are delivered within 48 hours. Final edited videos and printed albums will take up to 8-10 weeks from the event date depending on client selections.</p>
          </section>
          <section>
            <h3 className="text-xl font-serif text-white mb-2">Privacy Policy</h3>
            <p>WedArt Films respects your privacy. We will never sell your personal information. We reserve the right to use select images and videos from your event for our portfolio and promotional materials, unless specifically requested otherwise in writing prior to the event.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
