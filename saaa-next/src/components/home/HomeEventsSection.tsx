import Image from "next/image";
import Link from "next/link";
import {
  formatEventDay,
  formatEventMonth,
  homepageEvents,
} from "@/lib/content/events";
import { Button } from "@/components/ui/button";

export function HomeEventsSection() {
  return (
    <section id="events" className="section events-section">
      <div className="container">
        <div className="events-header-row">
          <div>
            <div className="section-tag">Upcoming Events</div>
            <h2 className="section-title events-title-inline">
              Events & <span className="accent">Networking</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="btn btn-secondary">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>

        <div className="events-grid">
          {homepageEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="event-card">
              <Image
                className="event-banner"
                src={event.image}
                alt={event.title}
                width={640}
                height={360}
              />
              <div className="event-body">
                <div className="event-date">
                  <div className="day">{formatEventDay(event.date)}</div>
                  <div className="month">{formatEventMonth(event.date)}</div>
                </div>
                <div className="event-content">
                  <h4>{event.title}</h4>
                  <p>{event.excerpt}</p>
                  <div className="event-meta">
                    <span>{event.time}</span>
                    <span>{event.venue}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
