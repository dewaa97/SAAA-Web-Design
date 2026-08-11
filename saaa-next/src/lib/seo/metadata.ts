import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/config/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  ogImage = "/images/hero2.jpg",
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);
  const fullTitle = title.includes("SAAA") ? title : `${title} — SAAA`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: siteConfig.locale.replace("_", "-"),
      url: canonical,
      siteName: siteConfig.shortName,
      title: fullTitle,
      description,
      images: [{ url: imageUrl, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export const defaultMetadata: Metadata = createPageMetadata({
  title: "Singapore Aircargo Agents Association",
  description: siteConfig.description,
  path: "/",
});
