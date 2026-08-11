import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { milestones } from "@/lib/content/milestones";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Milestones",
  description:
    "Key moments in the history of the Singapore Aircargo Agents Association — from our founding in 1971 to our role in Singapore's air cargo industry today.",
  path: "/milestones",
});

export default function MilestonesPage() {
  return (
    <SubpageLayout
      title={<>Our <span className="accent">Milestones</span></>}
      description="Key moments in the history of the Singapore Aircargo Agents Association — from our founding in 1971 to our role in Singapore's air cargo industry today."
      imageAlt="SAAA Milestones"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Timeline"
            title={<>SAAA <span className="brand-saaa">Milestones</span></>}
            description="A decade-by-decade record of SAAA's growth, advocacy, training development, and industry partnerships."
          />
          <div className="milestones-tree" role="list" aria-label="SAAA milestones by decade">
            {milestones.map((decade) => (
              <article
                key={decade.decade}
                className={`milestone-node milestone-${decade.side}`}
                role="listitem"
              >
                {decade.side === "left" ? (
                  <>
                    <div className="milestone-card">
                      <h3 className="milestone-decade">{decade.decade}</h3>
                      <ul className="milestone-events">
                        {decade.events.map((event, index) => (
                          <li key={`${decade.decade}-${event.year}-${index}`}>
                            <span className="milestone-year">{event.year}</span> {event.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="milestone-spine">
                      <span className={`milestone-icon ${decade.iconClass}`} aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="milestone-spine">
                      <span className={`milestone-icon ${decade.iconClass}`} aria-hidden="true" />
                    </div>
                    <div className="milestone-card">
                      <h3 className="milestone-decade">{decade.decade}</h3>
                      <ul className="milestone-events">
                        {decade.events.map((event, index) => (
                          <li key={`${decade.decade}-${event.year}-${index}`}>
                            <span className="milestone-year">{event.year}</span> {event.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
