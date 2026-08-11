import Image from "next/image";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { councilRows, secretariat } from "@/lib/content/organization";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/organization.css";

export const metadata = createPageMetadata({
  title: "Organisation Structure",
  description:
    "Meet the SAAA Council and Secretariat — elected leaders and professional staff supporting Singapore's air cargo forwarding community.",
  path: "/organization",
});

export default function OrganizationPage() {
  return (
    <SubpageLayout
      title={<>Organisation <span className="accent">Structure</span></>}
      description="The SAAA Council and Secretariat leading advocacy, training, and member services for Singapore's air cargo community."
      imageAlt="SAAA Organisation Structure"
    >
      <section id="council" className="section">
        <div className="container">
          <SectionHeader
            tag="Council"
            title={<>SAAA <span className="brand-saaa">Council</span> Organization</>}
            description="Elected by member companies, the Council sets the strategic direction for SAAA and represents the interests of the airfreight forwarding community."
            className="text-center"
          />
          <div className="council-chart">
            {councilRows.map((row) => (
              <div key={row[0].rowClass} className={`council-row ${row[0].rowClass}`}>
                {row.map((member) => (
                  <article key={member.slug} className={`council-member member-${member.slug}`}>
                    <div className="member-photo-frame">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        className="member-photo"
                        width={174}
                        height={174}
                      />
                    </div>
                    <div className="member-name">{member.name}</div>
                    <div className="member-role">{member.role}</div>
                    <div className="member-company">{member.company}</div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="secretariat" className="section secretariat-section">
        <div className="container">
          <SectionHeader
            tag="Secretariat"
            title={<>SAAA <span className="brand-saaa">Secretariat</span></>}
            description="The combined SAAA Secretariat and SAAA Cargo Services structure supporting member engagement, training, documentation services, and finance operations."
            className="text-center"
          />
          <div className="secretariat-chart">
            <div className="secretariat-tier secretariat-tier-top">
              <article className="sec-card ceo-card">
                <div className="dept-pill executive">{secretariat.ceo.department}</div>
                <div className="name">{secretariat.ceo.name}</div>
                <div className="title">{secretariat.ceo.title}</div>
                <a href={`mailto:${secretariat.ceo.email}`} className="sec-email">{secretariat.ceo.email}</a>
              </article>
            </div>
            <div className="secretariat-vline" aria-hidden="true" />
            <div className="secretariat-tier secretariat-tier-split">
              {secretariat.branches.map((branch) => (
                <section key={branch.header} className="secretariat-branch">
                  <header className={`branch-header${branch.headerClass ? ` ${branch.headerClass}` : ""}`}>
                    {branch.header}
                  </header>
                  <div className={`branch-departments${branch.layout === "cargo-grid" ? " cargo-grid" : ""}`}>
                    {branch.departments.map((department) => (
                      <article key={department.pill} className="dept-card">
                        <div className={`dept-pill ${department.pillClass}`}>{department.pill}</div>
                        <div className="staff-list">
                          {department.staff.map((person) => (
                            <div key={person.email} className="staff-person">
                              <div className="name">{person.name}</div>
                              <div className="title">{person.title}</div>
                              <a href={`mailto:${person.email}`} className="sec-email">{person.email}</a>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
