import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/Button";
import { HomeAboutSection } from "@/components/home/HomeAboutSection";
import { HomeEventsSection } from "@/components/home/HomeEventsSection";
import { NewsTickerColumn } from "@/components/home/NewsTicker";
import { MemberMarquee, PartnerMarquee } from "@/components/home/LogoMarquee";
import { PublicationCarousel } from "@/components/home/PublicationCarousel";
import { StatCounters } from "@/components/home/StatCounters";
import { TrainingSection } from "@/components/home/TrainingSection";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import {
  announcementItems,
  featuredNewsItems,
} from "@/lib/content/homepage";
import { memberLogos, partnerLogos } from "@/lib/content/marquees";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Singapore Aircargo Agents Association",
  description:
    "Representing over 200 member companies, SAAA is the trusted voice of Singapore's airfreight industry, driving compliance and professional standards since 1971.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <SiteLayout variant="home">
        <main>
          <Hero
            title={
              <>
                Advancing Air Cargo <span className="accent">Excellence</span> in Singapore
              </>
            }
            description="Representing over 200 member companies, SAAA is the trusted voice of Singapore's airfreight industry, driving compliance and professional standards since 1971."
            bgImage="/images/hero2.jpg"
            imageAlt="Air cargo excellence"
            priority
            actions={<Button variant="outlineWhite" href="#about">About SAAA</Button>}
          />

          <StatCounters />

          <section className="ticker-section">
            <div className="container">
              <div className="ticker-grid">
                <NewsTickerColumn
                  title="Featured News"
                  viewAllHref="/featured-news"
                  items={featuredNewsItems}
                />
                <NewsTickerColumn
                  title="Announcements"
                  viewAllHref="/announcements"
                  items={announcementItems}
                />
              </div>
            </div>
          </section>

          <HomeAboutSection />
          <TrainingSection />

          <section id="services" className="section services-section">
            <div className="container">
              <div className="services-intro">
                <h2 className="section-title">
                  <span className="brand-saaa">SAAA</span> Services
                </h2>
                <p className="section-desc">
                  SAAA Cargo Services supports members and walk-in customers with permit declarations,
                  Certificate of Origin, Neutral Airway Bills, and bar-coded labels for air cargo operations.
                </p>
              </div>
              <div className="services-contact-group">
                <div className="services-contact-row">
                  <div className="services-contact-label">Contact SAAA Permits Office</div>
                  <span className="services-contact-item">
                    <a href="mailto:scs@saaa.org.sg" className="services-contact-email">
                      scs@saaa.org.sg
                    </a>
                  </span>
                  <span className="services-contact-item">
                    <span className="services-contact-email">(+65) 6545 9597</span>
                  </span>
                </div>
                <p className="services-item-desc">
                  Permit and documentation support to facilitate cargo clearance, including import and export permit declarations.
                </p>
                <a href="/permit-certificate-of-origin" className="services-mini-btn">
                  Permit &amp; Certificate of Origin
                </a>
              </div>
            </div>
          </section>

          <HomeEventsSection />

          <section id="members" className="section">
            <div className="container">
              <div className="section-header">
                <div className="section-tag">Our Members</div>
                <h2 className="section-title">
                  Trusted by <span className="accent">Industry Leaders</span>
                </h2>
                <p className="section-desc">
                  SAAA represents a diverse network of air cargo forwarders, logistics providers, and aviation service companies across Singapore.
                </p>
              </div>
            </div>
          </section>

          <section className="member-marquee-section">
            <MemberMarquee logos={memberLogos} />
          </section>

          <section className="section">
            <div className="container">
              <div className="section-header">
                <div className="section-tag">Partners</div>
                <h2 className="section-title">Government &amp; Industry Partners</h2>
              </div>
              <PartnerMarquee logos={partnerLogos.government} stripKey="government" />
              <PartnerMarquee logos={partnerLogos.industry} stripKey="industry" />
            </div>
          </section>

          <section id="publication" className="section publication-section">
            <div className="container">
              <div className="section-header">
                <div className="section-tag">Publications</div>
                <h2 className="section-title">
                  <span className="brand-saaa">Perspectives</span> Magazine
                </h2>
                <p className="section-desc">
                  Stay informed with the latest industry insights, member spotlights, and regulatory updates from Singapore&apos;s air cargo community.
                </p>
              </div>
              <PublicationCarousel />
            </div>
          </section>
        </main>
      </SiteLayout>
    </>
  );
}
