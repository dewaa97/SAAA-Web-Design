import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { stcContent } from "@/lib/content/stc";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Standard Trading Conditions",
  description:
    "SAAA Standard Trading Conditions (STC) 2025 — governing the contractual relationship between members and their customers.",
  path: "/stc",
});

export default function StcPage() {
  return (
    <SubpageLayout
      title={<>Standard Trading <span className="accent">Conditions</span></>}
      description="Governing the contractual relationship between SAAA members and their customers — approved at the 51st AGM on 11 November 2025."
      imageAlt="Standard Trading Conditions"
    >
      <section className="section intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-text">
              <SectionHeader
                tag="Overview"
                title={<>What are the <span className="accent">Standard Trading Conditions?</span></>}
              />
              {stcContent.intro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div>
              <div className="intro-highlights">
                {stcContent.intro.highlights.map((item) => (
                  <div key={item.number} className="intro-highlight">
                    <div className="number">{item.number}</div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section revisions-section">
        <div className="container">
          <SectionHeader
            tag="Revisions"
            title={<>Key Revisions in <span className="accent">STC 2025</span></>}
            description="The STC 2025 introduces several important updates to reflect evolving industry practices and regulatory standards."
          />
          <div className="revisions-list">
            {stcContent.revisions.map((item) => (
              <div key={item.number} className="revision-item">
                <div className="revision-icon">{item.number}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section coverage-section">
        <div className="container">
          <SectionHeader
            tag="Scope"
            title={<>Key Areas Covered by the <span className="accent">STC</span></>}
            description="The Standard Trading Conditions address all critical aspects of the cargo carriage relationship."
          />
          <div className="coverage-grid">
            {stcContent.coverage.map((item) => (
              <div key={item.number} className="coverage-card">
                <span className="number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <div className="contact-note">
            <p>For the complete STC 2025 document, please contact the <strong>SAAA office</strong>.</p>
          </div>
        </div>
      </section>

      <section className="section download-section">
        <div className="container">
          <SectionHeader
            tag="Download"
            title={<>Download the <span className="accent">STC 2025</span></>}
            description="Access the official Standard Trading Conditions 2025 document for SAAA members."
            className="text-center"
          />
          <div className="download-card">
            <div className="file-icon">PDF</div>
            <h3>{stcContent.download.title}</h3>
            <p>{stcContent.download.subtitle}</p>
            <a href="/coming-soon" className="btn btn-primary">Download PDF</a>
            <div className="file-meta">{stcContent.download.note}</div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
