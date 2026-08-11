import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/site";
import { allEvents } from "@/lib/content/events";
import { announcements, featuredNews } from "@/lib/content/articles";

const staticRoutes = [
  "/",
  "/history",
  "/milestones",
  "/organization",
  "/stc",
  "/programmes",
  "/project-imdd",
  "/project-imdd/program",
  "/project-imdd/companies",
  "/project-imdd/applicants",
  "/project-imdd/employers",
  "/members-listing",
  "/membership-application",
  "/members-login",
  "/permit-certificate-of-origin",
  "/neutral-airway-bill",
  "/bar-code-labels",
  "/training-courses",
  "/training-opening",
  "/events",
  "/event-booking",
  "/event-booking-summary",
  "/announcements",
  "/featured-news",
  "/publications",
  "/article-detail",
  "/coming-soon",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const eventRoutes = allEvents.map((event) => `/events/${event.id}`);
  const articleRoutes = [...featuredNews, ...announcements].map(
    (article) => `/article-detail?id=${article.id}`,
  );

  const allRoutes = [...staticRoutes, ...eventRoutes, ...articleRoutes];

  return allRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

export const dynamic = "force-static";
