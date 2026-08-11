export type ArticleCategory = "regulatory" | "association" | "industry" | "events" | "training" | "membership" | "operations" | "program";

export type SaaaArticle = {
  id: string;
  title: string;
  date: string;
  sortDate: string;
  category: ArticleCategory;
  image: string;
  excerpt: string;
  body: string;
  badge?: string;
  status?: "upcoming" | "past";
  link?: string;
};

export const featuredNews: SaaaArticle[] = [
  {
    "id": "cbta-framework-update",
    "title": "CBTA Framework Implementation Update",
    "date": "June 2025",
    "sortDate": "2025-06-01",
    "category": "regulatory",
    "image": "/images/events/meeting-adults-1.jpg",
    "excerpt": "Revised Dangerous Goods training courses incorporating the CBTA framework are now mandatory for all members.",
    "body": "<p>SAAA Cargo Services has completed the transition of its Dangerous Goods training programmes to the Competency-Based Training and Assessment (CBTA) framework as required by IATA and CAAS.</p><p>All member companies should ensure relevant staff complete the updated courses within the compliance timeline. Contact admin@saaa.org.sg for course schedules.</p><h3>Key changes</h3><p>Updated learning objectives, supervised assessments, and function-specific training paths for DG handling roles across the supply chain.</p>"
  },
  {
    "id": "stc-2025-update",
    "title": "Standard Trading Conditions 2025",
    "date": "May 2025",
    "sortDate": "2025-05-01",
    "category": "regulatory",
    "image": "/images/events/meeting-adults-2.jpg",
    "excerpt": "Updated STC now available for all members. Please review the latest terms and conditions.",
    "body": "<p>The SAAA Council has approved the 2025 revision of the Standard Trading Conditions (STC). Members are advised to review and adopt the updated terms in their commercial documentation.</p><p>The full STC document is available on the SAAA website and through the members portal.</p>"
  },
  {
    "id": "perspectives-q2-2025",
    "title": "Perspectives Magazine — Q2 2025 Edition",
    "date": "April 2025",
    "sortDate": "2025-04-01",
    "category": "association",
    "image": "/images/events/meeting-adults-3.jpg",
    "excerpt": "The latest edition of Perspectives features industry outlook, member spotlights, and regulatory updates.",
    "body": "<p>The Q2 2025 edition of Perspectives is now available. This issue covers Singapore's air cargo outlook, digitalisation trends, and interviews with member company leaders.</p><p>Members may access the digital flipbook through the Publications section.</p>"
  },
  {
    "id": "digital-cargo-outlook-2025",
    "title": "Digital Cargo Outlook for Forwarders",
    "date": "March 2025",
    "sortDate": "2025-03-01",
    "category": "industry",
    "image": "/images/events/networking-1.jpg",
    "excerpt": "Key digitalisation trends shaping air cargo operations and what forwarders should prepare for this year.",
    "body": "<p>An overview of digital cargo trends including e-freight, data standards, and automation opportunities for forwarders.</p>"
  },
  {
    "id": "member-spotlight-feb-2025",
    "title": "Member Spotlight: Innovation in Air Cargo",
    "date": "February 2025",
    "sortDate": "2025-02-01",
    "category": "association",
    "image": "/images/events/networking-2.jpg",
    "excerpt": "Highlighting member-led initiatives improving cargo handling efficiency and customer service.",
    "body": "<p>This spotlight features member companies implementing process improvements and technology upgrades across their operations.</p>"
  },
  {
    "id": "iata-regulatory-roundup-2025",
    "title": "IATA Regulatory Roundup — Q1 2025",
    "date": "January 2025",
    "sortDate": "2025-01-01",
    "category": "regulatory",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Summary of key IATA and aviation regulatory updates relevant to Singapore air cargo operators.",
    "body": "<p>A concise roundup of regulatory changes affecting dangerous goods, security, and operational compliance in Q1 2025.</p>"
  },
  {
    "id": "talent-development-2024",
    "title": "Talent Development in Air Cargo",
    "date": "December 2024",
    "sortDate": "2024-12-01",
    "category": "industry",
    "image": "/images/events/agm-1.jpg",
    "excerpt": "How member companies are investing in training pathways and competency development for cargo teams.",
    "body": "<p>Industry perspectives on talent retention, upskilling, and CBTA-aligned training investments across member operations.</p>"
  },
  {
    "id": "sustainability-initiatives-2024",
    "title": "Sustainability Initiatives Across the Supply Chain",
    "date": "November 2024",
    "sortDate": "2024-11-01",
    "category": "industry",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "Association and member efforts toward more sustainable air cargo operations and reporting.",
    "body": "<p>Overview of sustainability programmes, reporting expectations, and collaboration opportunities across the supply chain.</p>"
  }
];

export const announcements: SaaaArticle[] = [
  {
    "id": "perspectives-contributions",
    "title": "Contribution of Articles in Perspectives",
    "date": "NEW",
    "sortDate": "2026-07-01",
    "status": "upcoming",
    "category": "program",
    "badge": "New",
    "image": "/images/events/meeting-adults-3.jpg",
    "excerpt": "Interested parties can now contribute articles and advertisements in Perspectives magazine. Contact us for the application form.",
    "body": "<p>SAAA invites member companies and industry partners to contribute articles, case studies, and advertisements to Perspectives magazine.</p><p>Please contact saaasin@saaa.org.sg for editorial guidelines and the advertising rate card.</p>"
  },
  {
    "id": "empire-bison-networking",
    "title": "SAAA-Empire Bison Business Networking",
    "date": "UPCOMING",
    "sortDate": "2026-04-28",
    "status": "upcoming",
    "category": "events",
    "badge": "Upcoming",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "28 April 2026 — Registrations are currently open for member companies! Email saaasin@saaa.org.sg.",
    "body": "<p>Registration is now open for the SAAA-Empire Bison Business Networking event on 28 April 2026.</p><p>Member companies may register by emailing saaasin@saaa.org.sg with company name and attendee details.</p>"
  },
  {
    "id": "training-centre-opening",
    "title": "New SAAA Training Centre Opening",
    "date": "NOV 2022",
    "sortDate": "2022-11-01",
    "status": "past",
    "category": "training",
    "badge": "Archive",
    "image": "/images/events/meeting-adults-1.jpg",
    "excerpt": "Historical announcement for the opening of SAAA Cargo Services' new training centre at CT Hub.",
    "body": "<p>SAAA Cargo Services officially opened its new training centre at CT Hub, featuring upgraded CBTA training facilities and expanded classroom capacity for dangerous goods and air cargo courses.</p><p>Read the full archive post for photos and facility details.</p>",
    "link": "/training-opening"
  },
  {
    "id": "agm-notice-2026",
    "title": "Notice of Annual General Meeting 2026",
    "date": "SEP 2026",
    "sortDate": "2026-09-01",
    "status": "upcoming",
    "category": "events",
    "badge": "Upcoming",
    "image": "/images/events/meeting-adults-2.jpg",
    "excerpt": "Formal notice for the 2026 AGM including agenda items and proxy submission guidance for members.",
    "body": "<p>Members are advised of the upcoming AGM date, agenda, and proxy submission requirements.</p>"
  },
  {
    "id": "training-schedule-q3-2026",
    "title": "Q3 2026 Training Schedule Released",
    "date": "JUL 2026",
    "sortDate": "2026-07-15",
    "status": "past",
    "category": "training",
    "badge": "New",
    "image": "/images/events/workshop-1.jpg",
    "excerpt": "Updated CBTA dangerous goods course dates for Q3 2026 are now available for booking.",
    "body": "<p>The Q3 training schedule includes refreshed CBTA DG courses across initial and recurrent functions.</p>"
  },
  {
    "id": "membership-renewal-2026",
    "title": "Membership Renewal Reminder 2026",
    "date": "JUN 2026",
    "sortDate": "2026-06-01",
    "status": "past",
    "category": "membership",
    "badge": "New",
    "image": "/images/events/networking-1.jpg",
    "excerpt": "Reminder for member companies to complete annual membership renewal and update company details.",
    "body": "<p>Member companies are reminded to complete renewal procedures and verify contact details with the secretariat.</p>"
  },
  {
    "id": "holiday-office-closure-2025",
    "title": "Year-End Office Closure Notice",
    "date": "DEC 2025",
    "sortDate": "2025-12-01",
    "status": "past",
    "category": "operations",
    "badge": "Archive",
    "image": "/images/events/meeting-adults-3.jpg",
    "excerpt": "SAAA office closure dates and permit processing timelines over the year-end holiday period.",
    "body": "<p>Office closure schedule and guidance for permit submissions during the year-end holiday period.</p>"
  },
  {
    "id": "cbta-transition-2025",
    "title": "CBTA Transition Advisory for Members",
    "date": "MAY 2025",
    "sortDate": "2025-05-15",
    "status": "past",
    "category": "training",
    "badge": "Archive",
    "image": "/images/events/meeting-adults-1.jpg",
    "excerpt": "Advisory on transitioning staff to CBTA-aligned dangerous goods training programmes.",
    "body": "<p>Guidance for member companies on staff training transitions and compliance timelines for CBTA implementation.</p>"
  },
  {
    "id": "editorial-deadline-2025",
    "title": "Perspectives Editorial Deadline — Q3 2025",
    "date": "AUG 2025",
    "sortDate": "2025-08-01",
    "status": "past",
    "category": "program",
    "badge": "Archive",
    "image": "/images/events/meeting-adults-4.jpg",
    "excerpt": "Submission deadline reminder for member articles and advertisements in the Q3 Perspectives edition.",
    "body": "<p>Editorial and advertising submissions for the Q3 edition must be sent to the secretariat by the stated deadline.</p>"
  }
];

export const articleCategoryFilters = {
  featuredNews: [
    { id: "all", label: "All" },
    { id: "regulatory", label: "Regulatory" },
    { id: "association", label: "Association" },
    { id: "industry", label: "Industry" },
  ],
  announcements: [
    { id: "all", label: "All" },
    { id: "events", label: "Events" },
    { id: "training", label: "Training" },
    { id: "program", label: "Programmes" },
    { id: "membership", label: "Membership" },
    { id: "operations", label: "Operations" },
  ],
} as const;

export function getArticleById(id: string) {
  return [...featuredNews, ...announcements].find((a) => a.id === id);
}
