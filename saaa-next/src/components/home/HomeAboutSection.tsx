import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { aboutFeatures, aboutQuickLinks } from "@/lib/content/homepage";
import { siteConfig } from "@/lib/config/site";

export function HomeAboutSection() {
  return (
    <section id="about" className="section section-border-bottom">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-tag">About SAAA</div>
            <h2 className="section-title">
              The Premier Voice of <span className="accent">Singapore&apos;s</span> Air Cargo Industry
            </h2>
            <p>
              Founded in 1971, the Singapore Aircargo Agents Association (SAAA) serves as the
              representative body for airfreight forwarding companies in Singapore.
            </p>
            <p>
              We work closely with government agencies, international aviation bodies, and industry
              stakeholders to advance the interests of our members and ensure Singapore remains a
              leading air cargo hub in Asia.
            </p>
            <div className="about-contact-row">
              <span className="about-contact-label">Contact SAAA</span>
              <span className="about-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${siteConfig.contact.associationEmail}`}>
                  {siteConfig.contact.associationEmail}
                </a>
              </span>
              <span className="about-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="about-contact-phone">{siteConfig.contact.associationPhone}</span>
              </span>
            </div>

            <div className="about-quick-links">
              {aboutQuickLinks.map((link) => (
                <Button key={link.href} asChild size="sm" className="about-quick-link-btn">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <div className="about-features">
              {aboutFeatures.map((feature) => (
                <Card key={feature.number} className="about-feature">
                  <CardContent className="about-feature-content">
                    <div className="about-feature-number">{feature.number}</div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
