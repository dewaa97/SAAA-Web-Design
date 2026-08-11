"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { formatEventSchedule, getEventById, isBookingOpen } from "@/lib/content/events";

const draftKey = (eventId: string) => `saaa-event-booking-${eventId}`;

type EventBookingFormProps = {
  eventId: string;
};

export function EventBookingForm({ eventId }: EventBookingFormProps) {
  const router = useRouter();
  const event = getEventById(eventId);
  const [submitted, setSubmitted] = useState(false);

  if (!event || !isBookingOpen(event)) {
    return (
      <div className="booking-card">
        <h1 className="booking-title">Registration unavailable</h1>
        <p className="booking-lead">This event is not open for online registration yet.</p>
        <Link href={event ? `/events/${event.id}` : "/events"} className="btn btn-secondary">
          Back to event
        </Link>
      </div>
    );
  }

  function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const form = formEvent.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, string>;
    localStorage.setItem(draftKey(eventId), JSON.stringify(payload));
    sessionStorage.setItem(`saaa-booking-summary-${eventId}`, JSON.stringify({ eventId, ...payload }));
    setSubmitted(true);
    router.push(`/event-booking-summary?event=${encodeURIComponent(eventId)}`);
  }

  function saveDraft() {
    const form = document.getElementById("booking-form") as HTMLFormElement | null;
    if (!form) return;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries()) as Record<string, string>;
    localStorage.setItem(draftKey(eventId), JSON.stringify(payload));
  }

  return (
    <div className="booking-card">
      <h1 className="booking-title">Event Registration</h1>
      <p className="booking-event-name">{event.title}</p>
      <p className="booking-event-schedule">{formatEventSchedule(event)}</p>
      <form id="booking-form" onSubmit={handleSubmit} onChange={saveDraft}>
        <div className="booking-grid">
          <div className="booking-field" data-field="companyName">
            <label htmlFor="companyName">Company Name *</label>
            <input id="companyName" name="companyName" type="text" required />
          </div>
          <div className="booking-field" data-field="attendeeName">
            <label htmlFor="attendeeName">Attendee Name *</label>
            <input id="attendeeName" name="attendeeName" type="text" required />
          </div>
          <div className="booking-field" data-field="email">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="booking-field" data-field="phone">
            <label htmlFor="phone">Phone *</label>
            <input id="phone" name="phone" type="tel" required />
          </div>
          <div className="booking-field booking-field-full" data-field="dietary">
            <label htmlFor="dietary">Dietary Requirements</label>
            <input id="dietary" name="dietary" type="text" />
          </div>
        </div>
        <div className="booking-actions">
          <button type="submit" className="btn btn-primary">Submit Registration</button>
          <Link href={`/events/${event.id}`} className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
      {submitted ? <p className="booking-note">Redirecting to summary...</p> : null}
    </div>
  );
}
