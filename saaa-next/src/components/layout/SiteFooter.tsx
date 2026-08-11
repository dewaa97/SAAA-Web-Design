import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  variant?: "home" | "subpage";
};

export function SiteFooter({ variant = "subpage" }: SiteFooterProps) {
  const aboutHref = variant === "home" ? "#about" : "/#about";
  const trainingHref = variant === "home" ? "#training" : "/#training";
  const membersHref = variant === "home" ? "#members" : "/#members";

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <Image
                src="/images/saaa-logo.png"
                alt="SAAA Logo"
                className="footer-logo-img"
                width={120}
                height={32}
              />
            </div>
            <p className="footer-about">
              The Singapore Aircargo Agents Association — representing the collective
              interests of airfreight forwarders since 1971.
            </p>
          </div>

          <div>
            <div className="footer-title">Quick Links</div>
            <ul className="footer-links">
              <li><Link href={aboutHref}>About Us</Link></li>
              <li><Link href={trainingHref}>Training</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href={membersHref}>Members</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Resources</div>
            <ul className="footer-links">
              <li><Link href="/featured-news">Latest News</Link></li>
              <li><Link href="/announcements">Announcements</Link></li>
              <li><Link href="/publications">Publications</Link></li>
              <li><a href="#">Media Gallery</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Contact</div>
            <ul className="footer-links footer-contact-list">
              <li className="footer-contact-item">
                <span className="footer-contact-name">SAAA@Singapore</span>
                <span className="footer-contact-muted"> — Association Matters</span>
                <br />
                <a href="mailto:saaasin@saaa.org.sg" className="footer-contact-link">
                  saaasin@saaa.org.sg
                </a>
                <span className="footer-contact-muted"> / +(65) 6545 4620</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-name">SAAA Cargo Services</span>
                <span className="footer-contact-muted"> — Training Matters</span>
                <br />
                <a href="mailto:admin@saaa.org.sg" className="footer-contact-link">
                  admin@saaa.org.sg
                </a>
                <span className="footer-contact-muted"> / +(65) 6545 5006</span>
              </li>
              <li className="footer-contact-item">
                <span className="footer-contact-name">SAAA Permits Office</span>
                <span className="footer-contact-muted"> — Permits &amp; COO Matters</span>
                <br />
                <a href="mailto:scs@saaa.org.sg" className="footer-contact-link">
                  scs@saaa.org.sg
                </a>
                <span className="footer-contact-muted"> / +(65) 6545 9597</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; 2026 Singapore Aircargo Agents Association. All rights reserved.
          </div>
          <div className="footer-powered">
            Powered by{" "}
            <a href="#" className="footer-powered-link">Flying Cape Technologies</a>
          </div>
          <div className="legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
