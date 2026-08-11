"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatEventSchedule, getEventById } from "@/lib/content/events";

type SummaryData = {
  eventId: string;
  companyName?: string;
  attendeeName?: string;
  email?: string;
  phone?: string;
  dietary?: string;
};

function readSummary(eventId: string): SummaryData | null {
  if (typeof window === "undefined" || !eventId) return null;
  const raw = sessionStorage.getItem(`saaa-booking-summary-${eventId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SummaryData;
  } catch {
    return null;
  }
}

export function EventBookingSummaryContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event") ?? "";
  const event = getEventById(eventId);
  const summary = readSummary(eventId);

  return (
    <div className="booking-card">
      <h1 className="booking-title">Registration Submitted</h1>
      {event ? (
        <>
          <p className="booking-event-name">{event.title}</p>
          <p className="booking-event-schedule">{formatEventSchedule(event)}</p>
        </>
      ) : null}
      {summary ? (
        <dl className="booking-summary-list">
          <div><dt>Company</dt><dd>{summary.companyName}</dd></div>
          <div><dt>Attendee</dt><dd>{summary.attendeeName}</dd></div>
          <div><dt>Email</dt><dd>{summary.email}</dd></div>
          <div><dt>Phone</dt><dd>{summary.phone}</dd></div>
          {summary.dietary ? <div><dt>Dietary</dt><dd>{summary.dietary}</dd></div> : null}
        </dl>
      ) : (
        <p className="booking-lead">No registration details found. Please complete the booking form first.</p>
      )}
      <div className="booking-actions">
        {event ? <Link href={`/events/${event.id}`} className="btn btn-primary">Back to Event</Link> : null}
        <Link href="/events" className="btn btn-secondary">All Events</Link>
      </div>
    </div>
  );
}
