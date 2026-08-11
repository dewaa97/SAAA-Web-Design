import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  coreValues,
  firstBoardMembers,
  historyIntro,
  historyParagraphs,
  industryCommittees,
  objectives,
  saaaMemberships,
  scsServices,
  trainingHighlight,
} from "@/lib/content/history";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Our History",
  description:
    "From six pioneering cargo agents to Singapore's leading voice in airfreight — discover the story of SAAA.",
  path: "/history",
});

export default function HistoryPage() {
  return (
    <SubpageLayout
      title={<>Our <span className="accent">History</span></>}
      description="From six pioneering cargo agents to Singapore's leading voice in airfreight — discover the story of SAAA."
      imageAlt="SAAA History"
    >
      <section id="history" className="section section-border-bottom">
        <div className="container">
          <SectionHeader
            tag={historyIntro.tag}
            title={<>The Story of <span className="brand-saaa">{historyIntro.titleAccent}</span></>}
            description={historyIntro.description}
          />
          <div className="history-content">
            <p>SAAA was an amalgamation of six pioneering cargo agents. The members of the first Board comprised of:</p>
            <div className="council-grid">
              {firstBoardMembers.map((member) => (
                <div key={member.name} className="council-member">
                  <div className="role">{member.role}</div>
                  <div className="name">{member.name}</div>
                  <div className="org">{member.org}</div>
                </div>
              ))}
            </div>

            {historyParagraphs.slice(0, 1).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <div className="history-highlight">
              <div className="mini-tag">{trainingHighlight.tag}</div>
              <h3>{trainingHighlight.title}</h3>
              <p>{trainingHighlight.description}</p>
            </div>

            {historyParagraphs.slice(1, 2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            <div className="services-list">
              {scsServices.map((service, index) => (
                <div key={service} className="item">
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  {service}
                </div>
              ))}
            </div>

            {historyParagraphs.slice(2).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="vision-mission" className="section section-border-bottom">
        <div className="container">
          <SectionHeader
            tag="Vision & Mission"
            title={<>Our <span className="accent">Vision & Mission</span></>}
          />
          <div className="vm-grid">
            <div className="vm-card">
              <h3>Our <span className="accent">Vision</span></h3>
              <p>
                We want to lead and transform the Airfreight Industry to meet the International
                Challenges and be a National showcase of Aviation Logistics Capabilities.
              </p>
            </div>
            <div className="vm-card">
              <h3>Our <span className="accent">Mission</span></h3>
              <p>To lead and transform the Airfreight Industry through our core values:</p>
              <div className="core-values">
                {coreValues.map((value) => (
                  <div key={value.letter} className="value-item">
                    <span className="value-letter">{value.letter}</span>
                    <div>
                      <strong>{value.label}</strong> — {value.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="history-content">
            <p>
              The Singapore Aircargo Agents Association (SAAA) was founded in 1971 with six pioneer
              members. As a representative of freight forwarders in the industry, SAAA was formed with
              the aim of advocating the following objectives:
            </p>
            <ul className="objectives-list">
              {objectives.map((objective, index) => (
                <li key={objective.slice(0, 30)}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          <div className="membership-grid">
            <div className="membership-card">
              <h4>SAAA is a member of:</h4>
              <ul>
                {saaaMemberships.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="membership-card">
              <h4>Industry Committee Participation:</h4>
              <ul>
                {industryCommittees.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
