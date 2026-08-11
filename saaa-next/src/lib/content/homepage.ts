export type TickerItem = {
  id: string;
  dateLabel: string;
  title: string;
  href: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

export const featuredNewsItems: TickerItem[] = [
  {
    id: "cbta-framework-update",
    dateLabel: "June 2025",
    title: "CBTA Framework Implementation Update",
    href: "/featured-news",
    excerpt:
      "Revised Dangerous Goods training courses incorporating the CBTA framework are now mandatory for all members.",
    image: "/images/events/meeting-adults-1.jpg",
    imageAlt: "Dangerous goods training meeting",
  },
  {
    id: "stc-2025-update",
    dateLabel: "May 2025",
    title: "Standard Trading Conditions 2025",
    href: "/featured-news",
    excerpt: "Updated STC now available for all members. Please review the latest terms and conditions.",
    image: "/images/events/meeting-adults-2.jpg",
    imageAlt: "Business meeting for trading conditions update",
  },
  {
    id: "perspectives-q2-2025",
    dateLabel: "April 2025",
    title: "Perspectives Magazine — Q2 2025 Edition",
    href: "/featured-news",
    excerpt:
      "The latest edition features industry outlook, member spotlights, and regulatory updates.",
    image: "/images/events/meeting-adults-3.jpg",
    imageAlt: "Perspectives magazine editorial",
  },
];

export const announcementItems: TickerItem[] = [
  {
    id: "perspectives-contributions",
    dateLabel: "NEW",
    title: "Contribution of Articles in Perspectives",
    href: "/announcements",
    excerpt:
      "Interested parties can now contribute articles and advertisements in Perspectives magazine. Contact us for the application form.",
    image: "/images/events/meeting-adults-3.jpg",
    imageAlt: "Editorial planning meeting",
    badge: "New",
  },
  {
    id: "empire-bison-networking",
    dateLabel: "UPCOMING",
    title: "SAAA-Empire Bison Business Networking",
    href: "/announcements",
    excerpt:
      "28 April 2026 — Registrations are currently open for member companies! Email saaasin@saaa.org.sg.",
    image: "/images/events/meeting-adults-4.jpg",
    imageAlt: "Professional networking event",
  },
  {
    id: "training-centre-opening",
    dateLabel: "NOV 2022",
    title: "New SAAA Training Centre Opening",
    href: "/training-opening",
    excerpt:
      "Historical announcement for the opening of SAAA Cargo Services' new training centre at CT Hub.",
    image: "/images/events/meeting-adults-1.jpg",
    imageAlt: "SAAA training centre opening",
    badge: "Archive",
  },
];

export const aboutFeatures = [
  { number: "01", title: "Advocacy", description: "Representing member interests in policy discussions with government agencies." },
  { number: "02", title: "Standardization", description: "Developing industry standards and best practices for air cargo handling." },
  { number: "03", title: "Development", description: "Professional training and certification programs for industry professionals." },
  { number: "04", title: "Networking", description: "Facilitating business connections and knowledge sharing among members." },
];

export const aboutQuickLinks = [
  { label: "Our History", href: "/history" },
  { label: "Milestones", href: "/milestones" },
  { label: "Organization Structure", href: "/organization" },
  { label: "Standard Trading Conditions", href: "/stc" },
  { label: "Programmes", href: "/programmes" },
];
