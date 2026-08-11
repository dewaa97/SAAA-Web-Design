import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { HtmlContent } from "@/components/ui/HtmlContent";
import { Button } from "@/components/ui/Button";
import { allEvents, formatEventSchedule, getEventById, isBookingOpen } from "@/lib/content/events";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

type EventDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return allEvents.map((event) => ({ id: event.id }));
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return {};
  return createPageMetadata({
    title: event.title,
    description: event.excerpt,
    path: `/events/${event.id}`,
    ogImage: event.image,
  });
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <SubpageLayout
      title={<>{event.title}</>}
      description={event.excerpt}
      bgImage={event.image}
      imageAlt={event.title}
    >
      <section className="section">
        <div className="container article-detail">
          <div className="article-detail-meta">
            <span>{event.displayDate}</span>
            <span>{event.time}</span>
            <span>{event.venue}</span>
            <span className="article-badge">{event.registrationStatus}</span>
          </div>
          <Image src={event.image} alt={event.title} width={960} height={480} className="article-detail-image" />
          <HtmlContent html={event.body} />
          <p className="article-contact">Contact: <a href={`mailto:${event.contact}`}>{event.contact}</a></p>
          <div className="article-detail-actions">
            {isBookingOpen(event) ? (
              <Button href={`/event-booking?event=${event.id}`}>Register Now</Button>
            ) : null}
            <Link href="/events" className="btn btn-secondary">Back to Events</Link>
          </div>
          <p className="article-schedule-note">{formatEventSchedule(event)}</p>
        </div>
      </section>
    </SubpageLayout>
  );
}
