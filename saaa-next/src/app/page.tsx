import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/ui/Hero";
import { Button } from "@/components/ui/button";
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
  memberCtaLinks,
  memberStats,
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
            actions={
              <Button asChild className="btn btn-outline-white">
                <a href="#about">About SAAA</a>
              </Button>
            }
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

              <div className="services-contact-group">
                <div className="services-contact-row">
                  <div className="services-contact-label">Contact SAAA@Singapore</div>
                  <span className="services-contact-item">
                    <a href="mailto:finance@saaa.org.sg" className="services-contact-email">
                      finance@saaa.org.sg
                    </a>
                  </span>
                  <span className="services-contact-item">
                    <span className="services-contact-email">(+65) 6543 0059</span>
                  </span>
                </div>
                <div className="services-service-row">
                  <p className="services-item-desc">
                    Newly developed Neutral Airway Bills approved by BAR and certified by IATA under Resolution 600b.
                  </p>
                  <a href="/neutral-airway-bill" className="services-mini-btn">
                    Neutral Airway Bill
                  </a>
                </div>
                <div className="services-service-row">
                  <p className="services-item-desc">
                    Immediate stock of premium bar-coded labels for industry use, with scheduled delivery and self-collection options.
                  </p>
                  <a href="/bar-code-labels" className="services-mini-btn">
                    Bar Code Labels
                  </a>
                </div>
              </div>
            </div>
          </section>

          <HomeEventsSection />

          <section id="members" className="section">
            <div className="container">
              <div className="members-intro">
                <div className="section-tag">Members</div>
                <h2 className="section-title">
                  Trusted by Industry <span className="accent">Leaders</span>
                </h2>
                <p className="section-desc">
                  Over 200 member companies trust SAAA to represent their interests and advance the air cargo profession – freight forwarders, agents, airlines and service providers.
                </p>
              </div>

              <div className="members-cta">
                {memberCtaLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={link.variant === "primary" ? "default" : "outline"}
                    className={link.variant === "primary" ? "btn btn-primary" : "btn btn-secondary"}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </div>

              <div className="members-grid">
                {memberStats.map((stat) => (
                  <div key={stat.label} className="member-stat">
                    <div className="number">{stat.number}</div>
                    <div className="label">{stat.label}</div>
                    <div className="sublabel">{stat.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="member-marquee-section">
            <div className="container">
              <div className="member-marquee-header">
                <div className="tag">Our Members</div>
                <h3>Trusted by Leading Air Cargo Companies</h3>
              </div>
              <MemberMarquee logos={memberLogos} />
            </div>
          </section>

          <section className="section">
            <div className="container">
              <div className="partners-title">
                <div className="tag">Strategic Partners</div>
                <h3>In Collaboration With</h3>
              </div>
              <div className="partner-marquee-section">
                <PartnerMarquee logos={partnerLogos.government} stripKey="government" label="Government Agencies" />
                <PartnerMarquee logos={partnerLogos.industry} stripKey="industry" label="Industry Partners" reverse />
                <PartnerMarquee logos={partnerLogos.ihls} stripKey="ihls" label="Institutes of Higher Learning (IHLs)" />
              </div>
            </div>
          </section>

          <section id="publication" className="section publication-section">
            <div className="container">
              <div className="publication-header-row">
                <div className="section-header publication-header-copy">
                  <div className="section-tag">Publication</div>
                  <h2 className="section-title">
                    <span className="brand-saaa">SAAA</span> Publications
                  </h2>
                  <p className="section-desc">
                    Browse the latest PERSPECTIVES newsletters from SAAA. The homepage now highlights the latest 12 issues, while the full archive lives on a dedicated publication page.
                  </p>
                </div>
                <Button asChild variant="outline" className="btn btn-secondary">
                  <Link href="/publications">View Full Archive</Link>
                </Button>
              </div>
              <PublicationCarousel />
            </div>
          </section>
        </main>
      </SiteLayout>
    </>
  );
}
