export type SaaaEvent = {
  id: string;
  title: string;
  status: "upcoming" | "past";
  date: string;
  time: string;
  venue: string;
  image: string;
  excerpt: string;
};

export const homepageEvents: SaaaEvent[] = [
  {
    id: "business-networking-aug-2026",
    title: "Business Networking",
    status: "upcoming",
    date: "2026-08-28",
    time: "2:00 PM",
    venue: "SAAA Office",
    image: "/images/events/networking-1.jpg",
    excerpt:
      "Member networking session to build new connections and spark collaboration across the air cargo community.",
  },
  {
    id: "dg-workshop-sep-2026",
    title: "DG Workshop",
    status: "upcoming",
    date: "2026-09-15",
    time: "9:00 AM",
    venue: "Training Centre",
    image: "/images/events/workshop-1.jpg",
    excerpt:
      "Focused workshop on dangerous goods handling with practical guidance aligned to current IATA requirements.",
  },
];

export function formatEventDay(date: string) {
  return new Date(`${date}T00:00:00`).getDate().toString();
}

export function formatEventMonth(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleString("en-SG", { month: "short" });
}
