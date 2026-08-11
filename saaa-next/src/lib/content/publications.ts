export type PublicationIssue = {
  title: string;
  date: string;
  year: number;
  href: string;
  image: string;
  isFlipbook: boolean;
};

export const publicationIssues: PublicationIssue[] = [
  { title: "PERSPECTIVES Newsletter", date: "Jan-Mar 2026", year: 2026, href: "https://www.saaa.org.sg/3d-flip-book/saaa-perspectives-newsletter-jan-mar-2026", image: "/images/publications/perspectives-jan-mar-2026.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Apr-Jun 2026", year: 2026, href: "https://www.saaa.org.sg/3d-flip-book/saaa-perspectives-newsletter-apr-jun-2026/", image: "/images/publications/perspectives-apr-jun-2026.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Jan-Mar 2025", year: 2025, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-jan-mar-2025/", image: "/images/publications/perspectives-jan-mar-2025.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Apr-Jun 2025", year: 2025, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-apr-jun-2025/", image: "/images/publications/perspectives-apr-jun-2025.jpg", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Jul-Sep 2025", year: 2025, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-july-sep-2015/", image: "/images/publications/perspectives-jul-sep-2025.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Oct-Dec 2025", year: 2025, href: "https://www.saaa.org.sg/3d-flip-book/saaa-perspectives-newsletter-oct-dec-2025", image: "/images/publications/perspectives-oct-dec-2025.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Jan-Mar 2024", year: 2024, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-jan-mar-2024/", image: "https://www.saaa.org.sg/wp-content/uploads/2024/04/Jan-Mar-2024-Perspectives-cover.jpg", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Apr-Jun 2024", year: 2024, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-apr-jun-2024/", image: "https://www.saaa.org.sg/wp-content/uploads/2024/10/Apr-Jun-Perspectives-Newsletter_2024.jpg", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Jul-Sep 2024", year: 2024, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-jul-sept-2024/", image: "https://www.saaa.org.sg/wp-content/uploads/2024/10/Jul-Sept_Newsletter_2024_Thumb.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Oct-Dec 2024", year: 2024, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-oct-dec-2024/", image: "https://www.saaa.org.sg/wp-content/uploads/2024/12/2024-Perspectives-Oct-Dec-Cover.png", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Jan-Mar 2023", year: 2023, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-jan-mar-2023/", image: "https://www.saaa.org.sg/wp-content/uploads/2023/04/Jan-Mar-2023-Perspectives.jpg", isFlipbook: true },
  { title: "PERSPECTIVES Newsletter", date: "Apr-Jun 2023", year: 2023, href: "https://www.saaa.org.sg/saaa-perspectives-newsletter-apr-jun-2023/", image: "https://www.saaa.org.sg/wp-content/uploads/2023/07/Apr-Jun-Perspectives-Newsletter_2023.jpg", isFlipbook: true },
];

const quarterRank: Record<string, number> = {
  "jan-mar": 1,
  "apr-jun": 2,
  "jul-sep": 3,
  "jul-sept": 3,
  "oct-dec": 4,
};

export function getHomepagePublications(limit = 12) {
  return publicationIssues
    .filter((issue) => issue.isFlipbook)
    .slice()
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      const aQuarter = quarterRank[(a.date.split(" ")[0] ?? "").toLowerCase()] ?? 0;
      const bQuarter = quarterRank[(b.date.split(" ")[0] ?? "").toLowerCase()] ?? 0;
      return bQuarter - aQuarter;
    })
    .slice(0, limit);
}

export function getPublicationCardCopy(year: number) {
  if (year === 2026) {
    return "Newest PERSPECTIVES flipbook from the live SAAA archive, kept with the original cover artwork.";
  }
  if (year === 2025) {
    return "Recent flipbook issue featuring association updates and industry developments from the current publication cycle.";
  }
  return "Recent flipbook issue from the last three publication years, surfaced directly from the official SAAA library.";
}
