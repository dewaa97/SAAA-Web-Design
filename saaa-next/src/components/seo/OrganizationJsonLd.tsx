import { absoluteUrl, siteConfig } from "@/lib/config/site";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: absoluteUrl("/images/saaa-logo.png"),
    email: siteConfig.contact.associationEmail,
    telephone: siteConfig.contact.associationPhone,
    sameAs: [
      siteConfig.social.linkedIn,
      siteConfig.social.facebook,
      siteConfig.social.instagram,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
