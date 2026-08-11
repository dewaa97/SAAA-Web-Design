import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config/site";

const staticRoutes = [
  "/",
  "/history",
  "/programmes",
  "/project-imdd",
  "/events",
  "/publications",
  "/featured-news",
  "/announcements",
  "/members-listing",
  "/training-courses",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}

export const dynamic = "force-static";
