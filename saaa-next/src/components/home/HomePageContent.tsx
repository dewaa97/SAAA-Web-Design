import Link from "next/link";
import { formatEventDay, formatEventMonth, homepageEvents } from "@/data/events";
import { memberLogos, partnerLogos } from "@/data/marquees";
import { MemberMarquee, PartnerMarquee } from "@/components/home/LogoMarquee";
import { PublicationCarousel } from "@/components/home/PublicationCarousel";
import { StatCounters } from "@/components/home/StatCounters";
import { TrainingSection } from "@/components/home/TrainingSection";

export function HomePageContent() {
  return (
    <>
      <section className="hero">
        <img src="/images/hero2.jpg" alt="Air cargo excellence" className="hero-bg" />
        <div className="hero-fade" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <h1>
                Advancing Air Cargo <span className="accent">Excellence</span> in Singapore
              </h1>
              <p>
                Representing over 200 member companies, SAAA is the trusted voice of
                Singapore&apos;s airfreight industry, driving compliance and professional
                standards since 1971.
              </p>
              <div className="hero-actions">
                <a href="#about" className="btn btn-outline-white">
                  About SAAA
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatCounters />

      <section className="ticker-section">
        <div className="container">
          <div className="ticker-grid">
            <div className="ticker-box">
              <div className="ticker-box-header">
                <div className="ticker-box-title">Featured News</div>
                <Link href="/featured-news" className="ticker-box-link">
                  View All
                </Link>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-1.jpg" alt="Dangerous goods training meeting" />
                <div>
                  <div className="ticker-item-date">June 2025</div>
                  <div className="ticker-item-title">
                    <Link href="/article-detail?type=featured&id=cbta-framework-update">
                      CBTA Framework Implementation Update
                    </Link>
                  </div>
                  <div className="ticker-item-desc">
                    Revised Dangerous Goods training courses incorporating the CBTA framework are now mandatory for all members.
                  </div>
                </div>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-2.jpg" alt="Business meeting for trading conditions update" />
                <div>
                  <div className="ticker-item-date">May 2025</div>
                  <div className="ticker-item-title">
                    <Link href="/article-detail?type=featured&id=stc-2025-update">
                      Standard Trading Conditions 2025
                    </Link>
                  </div>
                  <div className="ticker-item-desc">
                    Updated STC now available for all members. Please review the latest terms and conditions.
                  </div>
                </div>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-3.jpg" alt="Perspectives magazine editorial" />
                <div>
                  <div className="ticker-item-date">April 2025</div>
                  <div className="ticker-item-title">
                    <Link href="/article-detail?type=featured&id=perspectives-q2-2025">
                      Perspectives Magazine — Q2 2025 Edition
                    </Link>
                  </div>
                  <div className="ticker-item-desc">
                    The latest edition features industry outlook, member spotlights, and regulatory updates.
                  </div>
                </div>
              </div>
            </div>

            <div className="ticker-box">
              <div className="ticker-box-header">
                <div className="ticker-box-title">Announcements</div>
                <Link href="/announcements" className="ticker-box-link">
                  View All
                </Link>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-3.jpg" alt="Editorial planning meeting" />
                <div>
                  <div className="ticker-item-date">NEW</div>
                  <div className="ticker-item-title">
                    <Link href="/article-detail?type=announcements&id=perspectives-contributions">
                      Contribution of Articles in Perspectives
                    </Link>{" "}
                    <span className="ticker-badge">New</span>
                  </div>
                  <div className="ticker-item-desc">
                    Interested parties can now contribute articles and advertisements in Perspectives magazine. Contact us for the application form.
                  </div>
                </div>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-4.jpg" alt="Professional networking event" />
                <div>
                  <div className="ticker-item-date">UPCOMING</div>
                  <div className="ticker-item-title">
                    <Link href="/article-detail?type=announcements&id=empire-bison-networking">
                      SAAA-Empire Bison Business Networking
                    </Link>
                  </div>
                  <div className="ticker-item-desc">
                    28 April 2026 — Registrations are currently open for member companies! Email saaasin@saaa.org.sg.
                  </div>
                </div>
              </div>
              <div className="ticker-item">
                <img className="ticker-thumb" src="/images/events/meeting-adults-1.jpg" alt="SAAA training centre opening" />
                <div>
                  <div className="ticker-item-date">NOV 2022</div>
                  <div className="ticker-item-title">
                    <Link href="/training-opening">New SAAA Training Centre Opening</Link>{" "}
                    <span className="ticker-badge">Archive</span>
                  </div>
                  <div className="ticker-item-desc">
                    Historical announcement for the opening of SAAA Cargo Services&apos; new training centre at CT Hub, including the upgraded CBTA training environment.{" "}
                    <Link href="/training-opening">Read archive post</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section" style={{ borderBottom: "1px solid var(--slate-200)" }}>
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-tag">About SAAA</div>
              <h2 className="section-title">
                The Premier Voice of <span className="accent">Singapore&apos;s</span> Air Cargo Industry
              </h2>
              <p>
                Founded in 1971, the Singapore Aircargo Agents Association (SAAA) serves as the representative body for airfreight forwarding companies in Singapore.
              </p>
              <p>
                We work closely with government agencies, international aviation bodies, and industry stakeholders to advance the interests of our members and ensure Singapore remains a leading air cargo hub in Asia.
              </p>
              <div className="about-contact-row">
                <span className="about-contact-label">Contact SAAA</span>
                <span className="about-contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href="mailto:saaasin@saaa.org.sg">saaasin@saaa.org.sg</a>
                </span>
                <span className="about-contact-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span style={{ fontWeight: 500 }}>(+65) 6545 4620</span>
                </span>
              </div>
            </div>

            <div>
              <div className="about-features">
                {[
                  { num: "01", title: "Advocacy", desc: "Representing member interests in policy discussions with government agencies." },
                  { num: "02", title: "Standardization", desc: "Developing industry standards and best practices for air cargo handling." },
                  { num: "03", title: "Development", desc: "Professional training and certification programs for industry professionals." },
                  { num: "04", title: "Networking", desc: "Facilitating business connections and knowledge sharing among members." },
                ].map((feature) => (
                  <div key={feature.num} className="about-feature">
                    <div className="about-feature-number">{feature.num}</div>
                    <h4>{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-quick-links">
              <Link href="/history" className="btn btn-primary">Our History</Link>
              <Link href="/milestones" className="btn btn-primary">Milestones</Link>
              <Link href="/organization" className="btn btn-primary">Organization Structure</Link>
              <Link href="/stc" className="btn btn-primary">Standard Trading Conditions</Link>
              <Link href="/programmes" className="btn btn-primary">Programmes</Link>
            </div>
          </div>
        </div>
      </section>

      <TrainingSection />

      <section id="services" className="section services-section">
        <div className="container">
          <div className="services-intro">
            <h2 className="section-title">
              <span className="brand-saaa">SAAA</span> Services
            </h2>
            <p className="section-desc">
              SAAA Cargo Services supports members and walk-in customers with permit declarations, Certificate of Origin, Neutral Airway Bills, and bar-coded labels for air cargo operations.
            </p>
          </div>

          <div className="services-contact-group">
            <div className="services-contact-row">
              <div className="services-contact-label">Contact SAAA Permits Office</div>
              <span className="services-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:scs@saaa.org.sg" className="services-contact-email">scs@saaa.org.sg</a>
              </span>
              <span className="services-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="services-contact-email">(+65) 6545 9597</span>
              </span>
            </div>
            <p className="services-item-desc">
              Permit and documentation support to facilitate cargo clearance, including import and export permit declarations.
            </p>
            <Link href="/permit-certificate-of-origin" className="services-mini-btn">
              Permit &amp; Certificate of Origin
            </Link>
          </div>

          <div className="services-contact-group">
            <div className="services-contact-row">
              <div className="services-contact-label">Contact SAAA@Singapore</div>
              <span className="services-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:finance@saaa.org.sg" className="services-contact-email">finance@saaa.org.sg</a>
              </span>
              <span className="services-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="services-contact-email">(+65) 6543 0059</span>
              </span>
            </div>
            <div className="services-service-row">
              <p className="services-item-desc">
                Newly developed Neutral Airway Bills approved by BAR and certified by IATA under Resolution 600b.
              </p>
              <Link href="/neutral-airway-bill" className="services-mini-btn">Neutral Airway Bill</Link>
            </div>
            <div className="services-service-row">
              <p className="services-item-desc">
                Immediate stock of premium bar-coded labels for industry use, with scheduled delivery and self-collection options.
              </p>
              <Link href="/bar-code-labels" className="services-mini-btn">Bar Code Labels</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="section events-section">
        <div className="container">
          <div className="events-header-row">
            <div>
              <div className="section-tag">Upcoming Events</div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Events & <span className="accent">Networking</span>
              </h2>
            </div>
            <Link href="/events" className="btn btn-secondary">View All Events</Link>
          </div>
          <div className="events-grid">
            {homepageEvents.map((event) => (
              <Link key={event.id} href={`/event-detail?id=${event.id}`} className="event-card">
                <img className="event-banner" src={event.image} alt={event.title} />
                <div className="event-body">
                  <div className="event-date">
                    <div className="day">{formatEventDay(event.date)}</div>
                    <div className="month">{formatEventMonth(event.date)}</div>
                  </div>
                  <div className="event-content">
                    <h4>{event.title}</h4>
                    <p>{event.excerpt}</p>
                    <div className="event-meta">
                      <span>{event.time}</span>
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="members" className="section">
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: 560, margin: "0 auto 48px" }}>
            <div className="section-tag">Members</div>
            <h2 className="section-title" style={{ margin: "0 auto 16px" }}>
              Trusted by Industry <span className="accent">Leaders</span>
            </h2>
            <p className="section-desc">
              Over 200 member companies trust SAAA to represent their interests and advance the air cargo profession – freight forwarders, agents, airlines and service providers.
            </p>
          </div>
          <div className="members-cta">
            <Link href="/membership-application" className="btn btn-primary">Membership Sign-up</Link>
            <Link href="/members-listing" className="btn btn-secondary">SAAA Members Listing</Link>
            <Link href="/members-login" className="btn btn-secondary">Members Portal Log In</Link>
          </div>
          <div className="members-grid">
            <div className="member-stat">
              <div className="number">120+</div>
              <div className="label">Ordinary Members</div>
              <div className="sublabel">Freight forwarders &amp; agents</div>
            </div>
            <div className="member-stat">
              <div className="number">60+</div>
              <div className="label">Associate Members</div>
              <div className="sublabel">Airlines &amp; service providers</div>
            </div>
            <div className="member-stat">
              <div className="number">15+</div>
              <div className="label">Council Board</div>
              <div className="sublabel">Elected industry leaders</div>
            </div>
          </div>
        </div>
      </section>

      <section className="member-marquee-section">
        <div className="container">
          <div className="member-marquee-header">
            <div className="tag">Our Members</div>
            <h3>Trusted by Leading Air Cargo Companies</h3>
          </div>
          <div className="member-carousel-wrapper">
            <MemberMarquee logos={memberLogos} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ paddingTop: 0, textAlign: "center" }}>
            <div className="partners-title">
              <div className="tag">Strategic Partners</div>
              <h3>In Collaboration With</h3>
            </div>
            <div className="partner-marquee-section">
              <div className="partner-marquee-row">
                <div className="partner-marquee-label">Government Agencies</div>
                <div className="member-carousel-wrapper">
                  <PartnerMarquee logos={partnerLogos.government} stripKey="government" />
                </div>
              </div>
              <div className="partner-marquee-row reverse">
                <div className="partner-marquee-label">Industry Partners</div>
                <div className="member-carousel-wrapper">
                  <PartnerMarquee logos={partnerLogos.industry} stripKey="industry" />
                </div>
              </div>
              <div className="partner-marquee-row">
                <div className="partner-marquee-label">Institutes of Higher Learning (IHLs)</div>
                <div className="member-carousel-wrapper">
                  <PartnerMarquee logos={partnerLogos.ihls} stripKey="ihls" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="publication" className="section publication-section">
        <div className="container">
          <div className="publication-header-row">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <div className="section-tag">Publication</div>
              <h2 className="section-title">
                <span className="brand-saaa">SAAA</span> Publications
              </h2>
              <p className="section-desc" style={{ maxWidth: 640 }}>
                Browse the latest PERSPECTIVES newsletters from SAAA. The homepage now highlights the latest 12 issues, while the full archive lives on a dedicated publication page.
              </p>
            </div>
            <Link href="/publications" className="btn btn-secondary">View Full Archive</Link>
          </div>
          <PublicationCarousel />
        </div>
      </section>
    </>
  );
}
