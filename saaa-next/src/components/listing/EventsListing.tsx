"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ListingPagination } from "@/components/listing/ListingPagination";
import {
  allEvents,
  eventCategories,
  type EventCategory,
  type SaaaEventDetail,
} from "@/lib/content/events";
import { matchesDateRange, matchesSearch, paginate } from "@/lib/utils/listing";

const perPage = 9;

function filterEvents(status: "upcoming" | "past", category: EventCategory | "all", search: string, dateFrom: string, dateTo: string) {
  return allEvents.filter((event) => {
    if (event.status !== status) return false;
    if (category !== "all" && event.category !== category) return false;
    if (!matchesSearch(event, search, ["title", "excerpt", "venue"])) return false;
    if (!matchesDateRange(event.date, dateFrom, dateTo)) return false;
    return true;
  });
}

function EventGrid({ events }: { events: SaaaEventDetail[] }) {
  if (events.length === 0) {
    return <p className="listing-empty">No events match your filters.</p>;
  }

  return (
    <div className="articles-grid">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`} className="article-card">
          <Image src={event.image} alt={event.title} width={400} height={240} />
          <div className="article-card-body">
            <div className="article-date">{event.displayDate}</div>
            <h3>{event.title}</h3>
            <p>{event.excerpt}</p>
            <div className="article-meta">
              <span>{event.time}</span>
              <span>{event.venue}</span>
            </div>
            <span className="read-link">View details →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function EventsListing() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState<EventCategory | "all">("all");
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);

  const upcomingFiltered = useMemo(
    () => filterEvents("upcoming", category, search, dateFrom, dateTo),
    [category, search, dateFrom, dateTo],
  );
  const pastFiltered = useMemo(
    () => filterEvents("past", category, search, dateFrom, dateTo),
    [category, search, dateFrom, dateTo],
  );

  const upcomingPaged = paginate(upcomingFiltered, upcomingPage, perPage);
  const pastPaged = paginate(pastFiltered, pastPage, perPage);

  return (
    <div className="listing-layout">
      <aside className="listing-sidebar" aria-label="Event filters">
        <div className="listing-search">
          <label htmlFor="event-search">Search events</label>
          <input
            id="event-search"
            type="search"
            placeholder="Search by title, venue..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setUpcomingPage(1);
              setPastPage(1);
            }}
          />
        </div>
        <div className="listing-date-filters">
          <label htmlFor="event-date-from">From</label>
          <input
            id="event-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setUpcomingPage(1);
              setPastPage(1);
            }}
          />
          <label htmlFor="event-date-to">To</label>
          <input
            id="event-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setUpcomingPage(1);
              setPastPage(1);
            }}
          />
        </div>
        <div className="listing-filters">
          <div className="listing-filters-title">Category</div>
          {eventCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "active" : ""}
              onClick={() => {
                setCategory(item.id);
                setUpcomingPage(1);
                setPastPage(1);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="listing-main">
        <section aria-labelledby="upcoming-events-heading">
          <div className="listing-section-header">
            <h2 id="upcoming-events-heading">Upcoming Events</h2>
            <span className="listing-count">
              {upcomingFiltered.length} event{upcomingFiltered.length === 1 ? "" : "s"} found
            </span>
          </div>
          <EventGrid events={upcomingPaged.items} />
          <ListingPagination
            page={upcomingPaged.page}
            totalPages={upcomingPaged.totalPages}
            onPageChange={setUpcomingPage}
          />
        </section>

        <section aria-labelledby="past-events-heading">
          <div className="listing-section-header">
            <h2 id="past-events-heading">Past Events</h2>
            <span className="listing-count">
              {pastFiltered.length} event{pastFiltered.length === 1 ? "" : "s"} found
            </span>
          </div>
          <EventGrid events={pastPaged.items} />
          <ListingPagination
            page={pastPaged.page}
            totalPages={pastPaged.totalPages}
            onPageChange={setPastPage}
          />
        </section>
      </div>
    </div>
  );
}
