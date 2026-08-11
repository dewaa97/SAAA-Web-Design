import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { EventBookingForm } from "@/components/events/EventBookingForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Event Registration",
  description: "Register for an upcoming SAAA event.",
  path: "/event-booking",
});

type EventBookingPageProps = {
  searchParams: Promise<{ event?: string }>;
};

export default async function EventBookingPage({ searchParams }: EventBookingPageProps) {
  const { event: eventId = "" } = await searchParams;

  return (
    <SubpageLayout
      title={<>Event <span className="accent">Registration</span></>}
      description="Complete the form below to register for a SAAA event."
      imageAlt="Event Registration"
    >
      <section className="section booking-main">
        <div className="container booking-shell">
          <EventBookingForm eventId={eventId} />
        </div>
      </section>
    </SubpageLayout>
  );
}
