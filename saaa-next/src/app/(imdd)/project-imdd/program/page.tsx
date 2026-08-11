import Image from "next/image";
import { ImddLayout } from "@/components/layout/ImddLayout";
import { Badge } from "@/components/ui/Badge";
import { imddContent, imddProgramContent } from "@/lib/content/imdd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Project IMDD Program",
  description: "Complimentary training programmes for Project IMDD interns.",
  path: "/project-imdd/program",
  ogImage: "/images/project-imdd/hero-logistics.jpg",
});

export default function ImddProgramPage() {
  return (
    <ImddLayout
      activeNavId="program"
      hubNav={imddContent.hubNav}
      title={<>Project IMDD <span className="accent">Program</span></>}
      description="Complimentary training programmes for IMDD interns."
    >
      <section className="imdd-section">
        <div className="imdd-section-header">
          <Badge>Training</Badge>
          <h2>IMDD Training Programmes</h2>
        </div>
        <p className="imdd-lead">{imddProgramContent.trainingIntro}</p>
        {imddProgramContent.brochure.fileUrl ? (
          <p className="imdd-brochure-link">
            <a href={imddProgramContent.brochure.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {imddProgramContent.brochure.label}
            </a>
          </p>
        ) : null}
        <div className="imdd-program-grid">
          {imddProgramContent.trainingProgrammes.map((programme) => (
            <article key={programme.title} className="imdd-program-card">
              <Image src={programme.image} alt={programme.title} width={400} height={220} />
              <h3>{programme.title}</h3>
              <ul>
                <li>{programme.date}</li>
                <li>{programme.time}</li>
                <li>{programme.location}</li>
                <li>{programme.fee}</li>
              </ul>
            </article>
          ))}
        </div>
      </section>
    </ImddLayout>
  );
}
