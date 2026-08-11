import { Suspense } from "react";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { EventBookingSummaryContent } from "@/components/events/EventBookingSummaryContent";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Registration Summary",
  description: "Review your SAAA event registration summary.",
  path: "/event-booking-summary",
});

export default function EventBookingSummaryPage() {
  return (
    <SubpageLayout
      title={<>Registration <span className="accent">Summary</span></>}
      description="Review your event registration details."
      imageAlt="Event Registration Summary"
    >
      <section className="section booking-main">
        <div className="container booking-shell">
          <Suspense fallback={<p className="booking-lead">Loading summary...</p>}>
            <EventBookingSummaryContent />
          </Suspense>
        </div>
      </section>
    </SubpageLayout>
  );
}
