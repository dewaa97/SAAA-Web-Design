export type EventCategory = "networking" | "workshop" | "meeting" | "exhibitions";
export type EventStatus = "upcoming" | "past";

export type SaaaEventDetail = {
  id: string;
  title: string;
  status: EventStatus;
  category: EventCategory;
  date: string;
  displayDate: string;
  time: string;
  venue: string;
  image: string;
  excerpt: string;
  body: string;
  registrationStatus: string;
  contact: string;
};

export const allEvents: SaaaEventDetail[] = [
  {
    "id": "business-networking-aug-2026",
    "title": "Business Networking",
    "status": "upcoming",
    "category": "networking",
    "date": "2026-08-28",
    "displayDate": "28 August 2026",
    "time": "2:00 PM – 5:00 PM",
    "venue": "SAAA Office",
    "image": "/images/events/networking-1.jpg",
    "excerpt": "Member networking session to build new connections and spark collaboration across the air cargo community.",
    "body": "<p>Join fellow SAAA members for an afternoon of networking designed to foster collaboration across Singapore's air cargo ecosystem. This session brings together freight forwarders, airlines, and service partners for structured introductions and open dialogue.</p><p>Light refreshments will be served. Registration is open to all member companies — each company may register up to three representatives.</p><h3>What to expect</h3><p>Short welcome address, member introductions, and facilitated networking rounds with industry peers.</p>",
    "registrationStatus": "Register Now",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "dg-workshop-sep-2026",
    "title": "DG Workshop",
    "status": "upcoming",
    "category": "workshop",
    "date": "2026-09-15",
    "displayDate": "15 September 2026",
    "time": "9:00 AM – 1:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Focused workshop on dangerous goods handling with practical guidance aligned to current IATA requirements.",
    "body": "<p>This half-day workshop provides practical guidance on dangerous goods handling procedures aligned with the latest IATA Dangerous Goods Regulations and SAAA training standards.</p><p>Suitable for operations staff, acceptance agents, and supervisors responsible for DG compliance in daily air cargo operations.</p>",
    "registrationStatus": "Register Now",
    "contact": "admin@saaa.org.sg"
  },
  {
    "id": "agm-2026",
    "title": "Annual General Meeting 2026",
    "status": "upcoming",
    "category": "meeting",
    "date": "2026-09-22",
    "displayDate": "22 September 2026",
    "time": "10:00 AM – 12:30 PM",
    "venue": "Convention Hall",
    "image": "/images/events/meeting-adults-2.jpg",
    "excerpt": "Annual gathering for members to review progress, discuss priorities, and connect with the wider association.",
    "body": "<p>The SAAA Annual General Meeting 2026 will present the association's yearly report, financial summary, and strategic priorities for the coming year.</p><p>All ordinary members are encouraged to attend and participate in the Q&A session with the Council.</p>",
    "registrationStatus": "Coming Soon",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "industry-networking-oct-2026",
    "title": "Industry Networking Evening",
    "status": "upcoming",
    "category": "networking",
    "date": "2026-10-03",
    "displayDate": "3 October 2026",
    "time": "6:30 PM – 9:30 PM",
    "venue": "City Venue",
    "image": "/images/events/networking-2.jpg",
    "excerpt": "Cross-industry networking evening for members, partners, and invited guests across logistics and aviation.",
    "body": "<p>An evening networking reception connecting SAAA members with airlines, ground handlers, technology partners, and government stakeholders.</p><p>Dress code: business casual. Invitations are extended to member companies and selected industry partners.</p>",
    "registrationStatus": "Register Now",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "empire-bison-networking-2026",
    "title": "SAAA-Empire Bison Business Networking",
    "status": "upcoming",
    "category": "networking",
    "date": "2026-04-28",
    "displayDate": "28 April 2026",
    "time": "3:00 PM – 6:00 PM",
    "venue": "Empire Bison Venue",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "Registrations are currently open for member companies. Email saaasin@saaa.org.sg to register.",
    "body": "<p>SAAA partners with Empire Bison for a business networking session open to member companies. Connect with peers and explore collaboration opportunities in air cargo and logistics.</p>",
    "registrationStatus": "Register Now",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "cargo-tech-briefing-nov-2026",
    "title": "Cargo Digitalisation Briefing",
    "status": "upcoming",
    "category": "exhibitions",
    "date": "2026-11-12",
    "displayDate": "12 November 2026",
    "time": "2:00 PM – 5:00 PM",
    "venue": "SAAA Office",
    "image": "/images/events/meeting-adults-3.jpg",
    "excerpt": "Briefing on digital cargo initiatives, e-freight adoption, and technology trends affecting forwarders.",
    "body": "<p>An afternoon briefing for members on digital cargo trends, regulatory technology requirements, and practical adoption pathways for forwarders.</p>",
    "registrationStatus": "Coming Soon",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "leadership-roundtable-dec-2026",
    "title": "Industry Leadership Roundtable",
    "status": "upcoming",
    "category": "exhibitions",
    "date": "2026-12-05",
    "displayDate": "5 December 2026",
    "time": "10:00 AM – 1:00 PM",
    "venue": "Convention Hall",
    "image": "/images/events/agm-1.jpg",
    "excerpt": "Senior leaders from member companies discuss market outlook, talent, and operational priorities for 2027.",
    "body": "<p>Invitation-only roundtable for senior representatives from member companies to exchange views on industry priorities.</p>",
    "registrationStatus": "Coming Soon",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "cargo-compliance-forum-2025",
    "title": "Air Cargo Compliance Forum 2025",
    "status": "past",
    "category": "exhibitions",
    "date": "2025-11-14",
    "displayDate": "14 November 2025",
    "time": "9:00 AM – 4:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/agm-1.jpg",
    "excerpt": "Industry forum on regulatory updates, CBTA implementation, and compliance best practices.",
    "body": "<p>The 2025 Air Cargo Compliance Forum brought together regulators, airlines, and forwarders to discuss CBTA rollout, STC updates, and operational compliance priorities.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "networking-evening-2025",
    "title": "Members Networking Evening 2025",
    "status": "past",
    "category": "networking",
    "date": "2025-08-20",
    "displayDate": "20 August 2025",
    "time": "6:00 PM – 9:00 PM",
    "venue": "Marina Bay Area",
    "image": "/images/events/networking-1.jpg",
    "excerpt": "An evening reception for SAAA members to connect and share industry insights.",
    "body": "<p>Over 80 representatives from member companies attended the 2025 networking evening, featuring guest speakers from CAAS and IATA.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "dg-refresher-2025",
    "title": "DG Refresher Workshop 2025",
    "status": "past",
    "category": "workshop",
    "date": "2025-06-10",
    "displayDate": "10 June 2025",
    "time": "9:00 AM – 1:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Refresher course on dangerous goods regulations for experienced cargo professionals.",
    "body": "<p>A focused refresher covering recent IATA DGR amendments and practical case studies from member operations teams.</p>",
    "registrationStatus": "Completed",
    "contact": "admin@saaa.org.sg"
  },
  {
    "id": "agm-2025",
    "title": "Annual General Meeting 2025",
    "status": "past",
    "category": "meeting",
    "date": "2025-09-18",
    "displayDate": "18 September 2025",
    "time": "10:00 AM – 12:30 PM",
    "venue": "Convention Hall",
    "image": "/images/events/meeting-adults-2.jpg",
    "excerpt": "Annual member gathering reviewing association performance and priorities for the year ahead.",
    "body": "<p>The 2025 AGM presented the annual report, council elections, and member Q&A on strategic initiatives.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "supply-chain-forum-2025",
    "title": "Air Cargo Supply Chain Forum 2025",
    "status": "past",
    "category": "exhibitions",
    "date": "2025-04-22",
    "displayDate": "22 April 2025",
    "time": "9:00 AM – 4:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Forum on supply chain resilience, capacity planning, and collaboration across the air cargo ecosystem.",
    "body": "<p>Member companies and partners discussed supply chain resilience, capacity constraints, and collaboration models.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "networking-lunch-2025",
    "title": "Members Networking Lunch 2025",
    "status": "past",
    "category": "networking",
    "date": "2025-03-14",
    "displayDate": "14 March 2025",
    "time": "12:00 PM – 2:30 PM",
    "venue": "Marina Bay Area",
    "image": "/images/events/networking-2.jpg",
    "excerpt": "Mid-year networking lunch connecting operations and commercial teams across member companies.",
    "body": "<p>A relaxed networking lunch for member representatives to connect across departments and companies.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "dg-awareness-2024",
    "title": "DG Awareness Session 2024",
    "status": "past",
    "category": "workshop",
    "date": "2024-11-08",
    "displayDate": "8 November 2024",
    "time": "9:00 AM – 12:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/meeting-adults-1.jpg",
    "excerpt": "Awareness session covering recent DG regulatory updates and common operational pitfalls.",
    "body": "<p>Practical awareness session for operations teams covering regulatory updates and case-based learning.</p>",
    "registrationStatus": "Completed",
    "contact": "admin@saaa.org.sg"
  },
  {
    "id": "partner-briefing-2024",
    "title": "Industry Partner Briefing 2024",
    "status": "past",
    "category": "exhibitions",
    "date": "2024-07-19",
    "displayDate": "19 July 2024",
    "time": "3:00 PM – 5:30 PM",
    "venue": "SAAA Office",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "Briefing with airline and ground handling partners on operational coordination and service standards.",
    "body": "<p>Partner briefing focused on operational coordination, service standards, and joint improvement initiatives.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "cargo-security-forum-2024",
    "title": "Air Cargo Security Forum 2024",
    "status": "past",
    "category": "exhibitions",
    "date": "2024-05-16",
    "displayDate": "16 May 2024",
    "time": "9:00 AM – 4:00 PM",
    "venue": "Convention Hall",
    "image": "/images/events/agm-1.jpg",
    "excerpt": "Forum on cargo security protocols, screening requirements, and regulatory alignment for forwarders.",
    "body": "<p>Security specialists and member operations teams reviewed screening standards, regulatory updates, and best practices for cargo security compliance.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "midyear-networking-2024",
    "title": "Mid-Year Members Networking 2024",
    "status": "past",
    "category": "networking",
    "date": "2024-06-21",
    "displayDate": "21 June 2024",
    "time": "6:00 PM – 9:00 PM",
    "venue": "City Venue",
    "image": "/images/events/networking-1.jpg",
    "excerpt": "Evening networking session for members to connect ahead of the second half of the year.",
    "body": "<p>Members gathered for an informal evening of introductions, industry updates, and cross-company collaboration discussions.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "dg-initial-workshop-2024",
    "title": "DG Initial Workshop 2024",
    "status": "past",
    "category": "workshop",
    "date": "2024-03-12",
    "displayDate": "12 March 2024",
    "time": "9:00 AM – 5:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Initial dangerous goods training workshop aligned with updated IATA DGR requirements.",
    "body": "<p>A full-day workshop covering DG fundamentals, documentation, and acceptance procedures for cargo handling staff.</p>",
    "registrationStatus": "Completed",
    "contact": "admin@saaa.org.sg"
  },
  {
    "id": "agm-2024",
    "title": "Annual General Meeting 2024",
    "status": "past",
    "category": "meeting",
    "date": "2024-09-20",
    "displayDate": "20 September 2024",
    "time": "10:00 AM – 12:30 PM",
    "venue": "Convention Hall",
    "image": "/images/events/meeting-adults-2.jpg",
    "excerpt": "Annual gathering for members to review association progress and priorities for the coming year.",
    "body": "<p>The 2024 AGM covered financial results, council updates, and member discussions on industry advocacy priorities.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "trade-lanes-briefing-2024",
    "title": "Trade Lanes & Capacity Briefing 2024",
    "status": "past",
    "category": "exhibitions",
    "date": "2024-02-08",
    "displayDate": "8 February 2024",
    "time": "2:00 PM – 5:00 PM",
    "venue": "SAAA Office",
    "image": "/images/events/meeting-adults-3.jpg",
    "excerpt": "Briefing on trade lane developments, capacity trends, and operational planning for forwarders.",
    "body": "<p>Airline and forwarder representatives shared insights on lane performance, capacity constraints, and market outlook.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "new-year-networking-2024",
    "title": "New Year Networking Reception 2024",
    "status": "past",
    "category": "networking",
    "date": "2024-01-18",
    "displayDate": "18 January 2024",
    "time": "6:30 PM – 9:00 PM",
    "venue": "Marina Bay Area",
    "image": "/images/events/networking-2.jpg",
    "excerpt": "Season-opening reception welcoming members and partners to the new calendar year.",
    "body": "<p>The annual new year reception brought together member companies for networking and an overview of SAAA plans for the year ahead.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  },
  {
    "id": "compliance-clinic-2023",
    "title": "Cargo Compliance Clinic 2023",
    "status": "past",
    "category": "workshop",
    "date": "2023-10-05",
    "displayDate": "5 October 2023",
    "time": "9:00 AM – 1:00 PM",
    "venue": "SAAA Training Centre",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Hands-on clinic addressing common compliance gaps in air cargo documentation and handling.",
    "body": "<p>Practical clinic sessions helped operations teams resolve recurring compliance issues with guided case reviews.</p>",
    "registrationStatus": "Completed",
    "contact": "admin@saaa.org.sg"
  },
  {
    "id": "stakeholder-roundtable-2023",
    "title": "Stakeholder Roundtable 2023",
    "status": "past",
    "category": "meeting",
    "date": "2023-11-22",
    "displayDate": "22 November 2023",
    "time": "10:00 AM – 1:00 PM",
    "venue": "SAAA Office",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "Roundtable with government and industry stakeholders on policy and operational coordination.",
    "body": "<p>Representatives from member companies joined a facilitated discussion on advocacy priorities and regulatory engagement.</p>",
    "registrationStatus": "Completed",
    "contact": "saaasin@saaa.org.sg"
  }
];

export const eventCategories: { id: EventCategory | "all"; label: string }[] = [
  { id: "all", label: "All Events" },
  { id: "networking", label: "Networking" },
  { id: "workshop", label: "Workshops" },
  { id: "meeting", label: "Meetings" },
  { id: "exhibitions", label: "Exhibitions" },
];

export function getEventById(id: string) {
  return allEvents.find((event) => event.id === id);
}

export function getUpcomingEvents() {
  return allEvents.filter((e) => e.status === "upcoming");
}

export function getPastEvents() {
  return allEvents.filter((e) => e.status === "past");
}

export function isBookingOpen(event: SaaaEventDetail) {
  return event.status === "upcoming" && event.registrationStatus === "Register Now";
}

export function formatEventSchedule(event: SaaaEventDetail) {
  return `${event.displayDate} · ${event.time} · ${event.venue}`;
}

export type SaaaEvent = {
  id: string;
  title: string;
  status: EventStatus;
  date: string;
  time: string;
  venue: string;
  image: string;
  excerpt: string;
};

export function formatEventDay(date: string) {
  return new Date(`${date}T00:00:00`).getDate().toString();
}

export function formatEventMonth(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleString("en-SG", { month: "short" });
}

export const homepageEvents: SaaaEvent[] = allEvents.filter((e) => e.status === "upcoming").slice(0, 2).map((e) => ({
  id: e.id,
  title: e.title,
  status: e.status,
  date: e.date,
  time: e.time.split("–")[0]?.trim() ?? e.time,
  venue: e.venue,
  image: e.image,
  excerpt: e.excerpt,
}));
