import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNav } from "@/components/layout/SiteNav";
import { SubpageHero } from "@/components/layout/SubpageHero";
import { councilMembers, historyObjectives, historyServices, membershipAffiliations, membershipCommittees } from "@/data/historyContent";

export const metadata: Metadata = {
  title: "Our History — SAAA",
  description:
    "From six pioneering cargo agents to Singapore's leading voice in airfreight — discover the story of SAAA.",
};

export default function HistoryPage() {
  return (
    <>
      <SiteNav variant="subpage" />
      <main>
        <SubpageHero
          title={
            <>
              Our <span className="accent">History</span>
            </>
          }
          description="From six pioneering cargo agents to Singapore's leading voice in airfreight — discover the story of SAAA."
          imageAlt="SAAA History"
        />

        <section id="history" className="section" style={{ borderBottom: "1px solid var(--slate-200)" }}>
          <div className="container">
            <div className="section-header">
              <div className="section-tag">Our Journey</div>
              <h2 className="section-title">
                The Story of <span className="brand-saaa">SAAA</span>
              </h2>
              <p className="section-desc">
                Established on 21 April 1971, Madam Mary Wu, Managing Director of Singapore Baggage Transport Agency Pte Ltd, formed the Singapore Aircargo Agents Association (SAAA). Its purpose was to advocate the promotion, protection and development of the business of carriage of goods by air transportation, as well as enhancing competiveness of the Air Cargo Forwarding business.
              </p>
            </div>
            <div className="history-content">
              <p>SAAA was an amalgamation of six pioneering cargo agents. The members of the first Board comprised of:</p>
              <div className="council-grid">
                {councilMembers.map((member) => (
                  <div key={member.name} className="council-member">
                    <div className="role">{member.role}</div>
                    <div className="name">{member.name}</div>
                    <div className="org">{member.org}</div>
                  </div>
                ))}
              </div>
              <p>
                In the 70s, numerous new international agents were setting up their offices in Singapore. This became a growing concern for the local agents and it prompted SAAA to step in and help upgrade their services and skills to meet new challenging demands.
              </p>
              <div className="history-highlight">
                <div className="mini-tag">Training History</div>
                <h3>SAAA Cargo Services &amp; Training Development</h3>
                <p>
                  SAAA Cargo Services Pte Ltd (SCS) was formed as an investment arm of SAAA. Among its diverse activities, SCS undertakes cargo clearance permit processing service, sale of the Trade Development Board&apos;s revenue stamps, providing cargo insurance coverage for shipments, and issuing Certificate of Origin. Training courses are also gradually being transferred to SCS from SAAA. SCS is now accredited by the International Air Transport Association (IATA) as an Authorised Training Centre to conduct courses.
                </p>
              </div>
              <p>
                SAAA had since grown its membership base and works closely with various Government bodies and organisations to develop and propel the local air transportation industry. SAAA Cargo Services Pte Ltd was formed in 1988 as the commercial arm of SAAA to provide the following services to the industry:
              </p>
              <div className="services-list">
                {historyServices.map((service) => (
                  <div key={service.num} className="item">
                    <span className="num">{service.num}</span>
                    {service.label}
                  </div>
                ))}
              </div>
              <p>
                2013 marks a significant year for SAAA. A rebranding exercise was completed and on 1 October, SAAA@Singapore was officially launched by Mrs. Josephine Teo, Senior Minister of State, Ministry of Transport and Ministry of Finance. The significant change is that SAAA@Singapore can now encompass all air logistics related sectors to better represent the industry.
              </p>
            </div>
          </div>
        </section>

        <section id="vision-mission" className="section" style={{ borderBottom: "1px solid var(--slate-200)" }}>
          <div className="container">
            <div className="section-header">
              <div className="section-tag">Vision &amp; Mission</div>
              <h2 className="section-title">
                Our <span className="accent">Vision &amp; Mission</span>
              </h2>
            </div>
            <div className="vm-grid">
              <div className="vm-card">
                <h3>
                  Our <span className="accent">Vision</span>
                </h3>
                <p>
                  We want to lead and transform the Airfreight Industry to meet the International Challenges and be a National showcase of Aviation Logistics Capabilities.
                </p>
              </div>
              <div className="vm-card">
                <h3>
                  Our <span className="accent">Mission</span>
                </h3>
                <p>To lead and transform the Airfreight Industry through our core values:</p>
                <div className="core-values">
                  <div className="value-item"><span className="value-letter">P</span><div><strong>Passion</strong> — For continuous self-improvement</div></div>
                  <div className="value-item"><span className="value-letter">A</span><div><strong>Ace</strong> — In innovation and delivering consistent excellence</div></div>
                  <div className="value-item"><span className="value-letter">C</span><div><strong>Commitment</strong> — To roll great service and strive for change</div></div>
                  <div className="value-item"><span className="value-letter">T</span><div><strong>Trust</strong> — In our Partners and engaging in future collaborations</div></div>
                </div>
              </div>
            </div>
            <div className="history-content">
              <p>
                The Singapore Aircargo Agents Association (SAAA) was founded in 1971 with six pioneer members. As a representative of freight forwarders in the industry, SAAA was formed with the aim of advocating the following objectives:
              </p>
              <ul className="objectives-list">
                {historyObjectives.map((objective) => (
                  <li key={objective.num}>
                    <span className="num">{objective.num}</span>
                    {objective.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="membership-grid">
              <div className="membership-card">
                <h4>SAAA is a member of:</h4>
                <ul>
                  {membershipAffiliations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="membership-card">
                <h4>Industry Committee Participation:</h4>
                <ul>
                  {membershipCommittees.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter variant="subpage" />
    </>
  );
}
