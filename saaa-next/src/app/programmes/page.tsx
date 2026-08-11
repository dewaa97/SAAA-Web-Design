import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ccpProgramme,
  pendingProgramme,
  projectImddProgramme,
} from "@/lib/content/programmes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Programmes",
  description:
    "Industry talent development programmes led by SAAA@Singapore, including Project IMDD and Career Conversion Programme initiatives.",
  path: "/programmes",
});

export default function ProgrammesPage() {
  return (
    <SubpageLayout
      title={<>Industry <span className="accent">Programmes</span></>}
      description="Talent development and workforce initiatives supporting Singapore's air cargo and logistics sector."
      imageAlt="Programmes"
    >
      <section className="section">
        <div className="container">
          <Card>
            <h2>{projectImddProgramme.title}</h2>
            {projectImddProgramme.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <ul className="features-list">
              {projectImddProgramme.features.map((feature) => (
                <li key={feature}>
                  <span className="icon-check">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>

            <h3 className="subsection-title">Who It&apos;s For</h3>
            <div className="apply-intro">
              <p>
                <strong>For Employers:</strong> SAAA member companies can attract and retain young talent through skills-based training and internship partnerships.{" "}
                <Link href="/project-imdd/employers">Learn more for employers</Link>
              </p>
              <p>
                <strong>For Applicants:</strong> Students and young talents can gain hands-on logistics experience with career progression beyond traditional internships.{" "}
                <Link href="/project-imdd/applicants">Learn more for applicants</Link>
              </p>
              <p>
                Browse <Link href="/project-imdd/companies">partner companies</Link> offering internship and work-study opportunities.
              </p>
            </div>

            <div className="programme-pathway">
              <h4>Programme Pathway</h4>
              <ol className="pathway-grid" aria-label="Project IMDD programme pathway">
                {projectImddProgramme.pathway.map((step) => (
                  <li key={step.title} className="pathway-card">
                    <div className={`pathway-card-accent ${step.accentClass}`} aria-hidden="true" />
                    <div className="pathway-card-content">
                      <div className="pathway-card-header">
                        <div className={`pathway-icon ${step.iconClass}`} aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9" />
                          </svg>
                        </div>
                        <span className="pathway-step-label">{step.step}</span>
                      </div>
                      <h5>{step.title}</h5>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="programme-cta-row">
              <Button href="/project-imdd">View Project IMDD Hub</Button>
            </div>

            <div className="contact-block">
              <p><strong>For more enquiries on Project IMDD, please contact</strong></p>
              <div className="contact-row">
                <span className="contact-item">
                  <a href={`mailto:${projectImddProgramme.contactEmail}`} className="contact-email">
                    {projectImddProgramme.contactEmail}
                  </a>
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2>{ccpProgramme.title}</h2>
            <p>
              The{" "}
              <a href={ccpProgramme.externalUrl} target="_blank" rel="noopener noreferrer">
                Career Conversion Programme (CCP)
              </a>
              {" "}is a workforce initiative by the SkillsFuture Workforce Development Agency (SWDA) that supports mid-career individuals in transitioning into the air freight forwarding industry.
            </p>
            <p>{ccpProgramme.description}</p>
          </Card>

          <Card>
            <Badge variant="comingSoon">{pendingProgramme.badge}</Badge>
            <h2>{pendingProgramme.title}</h2>
            <p>{pendingProgramme.description}</p>
          </Card>
        </div>
      </section>
    </SubpageLayout>
  );
}
