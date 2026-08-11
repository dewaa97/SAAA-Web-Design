import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EventsListing } from "@/components/listing/EventsListing";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Calendar of Events",
  description: "Upcoming and past SAAA events, networking sessions, workshops, and industry gatherings.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <SubpageLayout
      title={<>Calendar of <span className="accent">Events</span></>}
      description="Discover upcoming networking sessions, workshops, and industry events hosted by SAAA."
      imageAlt="SAAA Events"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Events"
            title={<>SAAA <span className="accent">Events</span></>}
            description="Search and filter upcoming and past events across networking, workshops, meetings, and exhibitions."
          />
          <EventsListing />
        </div>
      </section>
    </SubpageLayout>
  );
}
