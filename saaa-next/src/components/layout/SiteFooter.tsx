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
              <img
                src="/images/saaa-logo.png"
                alt="SAAA Logo"
                style={{ height: 32, marginBottom: 12 }}
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
              <li>
                <Link href={aboutHref}>About Us</Link>
              </li>
              <li>
                <Link href={trainingHref}>Training</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href={membersHref}>Members</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Resources</div>
            <ul className="footer-links">
              <li>
                <Link href="/featured-news">Latest News</Link>
              </li>
              <li>
                <Link href="/announcements">Announcements</Link>
              </li>
              <li>
                <Link href="/publications">Publications</Link>
              </li>
              <li>
                <a href="#">Media Gallery</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-title">Contact</div>
            <ul className="footer-links" style={{ fontSize: 13 }}>
              <li style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 700, color: "white" }}>SAAA@Singapore</span>
                <span style={{ color: "var(--slate-300)" }}> — Association Matters</span>
                <br />
                <a href="mailto:saaasin@saaa.org.sg" style={{ color: "var(--slate-300) !important" }}>
                  saaasin@saaa.org.sg
                </a>
                <span style={{ color: "var(--slate-300)" }}> / +(65) 6545 4620</span>
              </li>
              <li style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: 700, color: "white" }}>SAAA Cargo Services</span>
                <span style={{ color: "var(--slate-300)" }}> — Training Matters</span>
                <br />
                <a href="mailto:admin@saaa.org.sg" style={{ color: "var(--slate-300) !important" }}>
                  admin@saaa.org.sg
                </a>
                <span style={{ color: "var(--slate-300)" }}> / +(65) 6545 5006</span>
              </li>
              <li>
                <span style={{ fontWeight: 700, color: "white" }}>SAAA Permits Office</span>
                <span style={{ color: "var(--slate-300)" }}> — Permits &amp; COO Matters</span>
                <br />
                <a href="mailto:scs@saaa.org.sg" style={{ color: "var(--slate-300) !important" }}>
                  scs@saaa.org.sg
                </a>
                <span style={{ color: "var(--slate-300)" }}> / +(65) 6545 9597</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            &copy; 2026 Singapore Aircargo Agents Association. All rights reserved.
          </div>
          <div style={{ fontSize: 12, color: "var(--slate-500)" }}>
            Powered by{" "}
            <a href="#" style={{ color: "var(--slate-400)", textDecoration: "none", fontWeight: 600 }}>
              Flying Cape Technologies
            </a>
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
