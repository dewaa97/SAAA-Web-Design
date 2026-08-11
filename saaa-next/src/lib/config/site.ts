export const siteConfig = {
  name: "Singapore Aircargo Agents Association",
  shortName: "SAAA",
  description:
    "The Singapore Aircargo Agents Association — representing airfreight forwarders since 1971.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.saaa.org.sg",
  locale: "en_SG",
  contact: {
    associationEmail: "saaasin@saaa.org.sg",
    associationPhone: "+65 6545 4620",
    trainingEmail: "admin@saaa.org.sg",
    permitsEmail: "scs@saaa.org.sg",
  },
  social: {
    linkedIn: "https://www.linkedin.com/in/saaa-singapore-2b6861243/",
    facebook: "https://www.facebook.com/pages/SAAA/834894096585648",
    instagram: "https://www.instagram.com/saaasingapore/",
  },
} as const;

export function absoluteUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
