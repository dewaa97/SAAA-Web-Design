import Image from "next/image";
import { ImddLayout } from "@/components/layout/ImddLayout";
import { Badge } from "@/components/ui/Badge";
import { imddContent } from "@/lib/content/imdd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Project IMDD",
  description:
    "Attracting and developing young logistics talent through mentorship, skills competency training, and long-term career progression.",
  path: "/project-imdd",
  ogImage: "/images/project-imdd/hero-logistics.jpg",
});

export default function ProjectImddPage() {
  return (
    <ImddLayout
      activeNavId="home"
      hubNav={imddContent.hubNav}
      title={<>Project <span className="accent">IMDD</span></>}
      description="Attracting and developing young logistics talent through mentorship, skills competency training, and long-term career progression."
    >
      <section className="imdd-section" id="why-project-imdd">
        <div className="imdd-section-header">
          <Badge>Overview</Badge>
          <h2>Why Project IMDD?</h2>
        </div>
        <p className="imdd-lead">{imddContent.intro}</p>
      </section>

      <section className="imdd-spotlight" aria-label="Project IMDD spotlight">
        <div className="container imdd-spotlight-grid">
          <div className="imdd-spotlight-image">
            <Image
              src="/images/project-imdd/hero-outreach.jpg"
              alt="Project IMDD outreach and mentorship"
              width={800}
              height={500}
            />
          </div>
          <div className="imdd-spotlight-quote">
            <Badge>In Focus</Badge>
            <blockquote>{imddContent.quote.text}</blockquote>
            <cite className="imdd-quote-attribution">
              <span>{imddContent.quote.author}</span>
              <span className="imdd-quote-source">{imddContent.quote.source}</span>
            </cite>
          </div>
        </div>
      </section>

      <section className="imdd-section" id="mission">
        <div className="imdd-section-header">
          <Badge>Mission</Badge>
          <h2>Our Mission</h2>
        </div>
        <p className="imdd-lead">{imddContent.mission}</p>
      </section>

      <section className="imdd-section" id="objectives">
        <div className="imdd-section-header">
          <Badge>Objectives</Badge>
          <h2>Programme Objectives</h2>
        </div>
        <ul className="imdd-objectives-list">
          {imddContent.objectives.map((objective, index) => (
            <li key={objective.slice(0, 32)}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section className="imdd-section" id="phases">
        <div className="imdd-section-header">
          <Badge>Pathway</Badge>
          <h2>Programme Phases</h2>
        </div>
        <div className="imdd-phases-grid">
          {imddContent.phases.map((phase) => (
            <article key={phase.phase} className="imdd-phase-card">
              <div className="phase-label">Phase {phase.phase}</div>
              <h4>{phase.title}</h4>
              <p>{phase.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="imdd-section" id="institutions">
        <div className="imdd-section-header">
          <Badge>Partners</Badge>
          <h2>Education Partners</h2>
        </div>
        <div className="imdd-institution-marquee">
          <div className="imdd-institution-track">
            {imddContent.institutions.map((institution) => (
              <a
                key={institution.name}
                className="imdd-institution-logo"
                href={institution.url}
                target="_blank"
                rel="noopener noreferrer"
                title={institution.name}
              >
                <Image src={institution.logo} alt={`${institution.name} logo`} width={120} height={60} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="imdd-section" id="case-study">
        <div className="imdd-section-header">
          <Badge>Case Study</Badge>
          <h2>{imddContent.caseStudy.title}</h2>
        </div>
        {imddContent.caseStudy.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="imdd-lead">{paragraph}</p>
        ))}
      </section>

      <section className="imdd-section" id="testimonials">
        <div className="imdd-section-header">
          <Badge>Stories</Badge>
          <h2>Talent Testimonials</h2>
        </div>
        <div className="imdd-testimonials-grid">
          {imddContent.testimonials.map((item) => (
            <article key={item.name} className="imdd-testimonial-card">
              <div className="quote-icon">&quot;</div>
              <blockquote>{item.quote}</blockquote>
              <div className="author">{item.name}</div>
              <div className="role">{item.role}</div>
            </article>
          ))}
        </div>
      </section>
    </ImddLayout>
  );
}
