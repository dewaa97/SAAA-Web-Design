import Image from "next/image";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "New SAAA Training Centre Opening",
  description:
    "Archive announcement for the opening of SAAA Cargo Services' new training centre at CT Hub.",
  path: "/training-opening",
});

export default function TrainingOpeningPage() {
  return (
    <SubpageLayout
      title={<>Training Centre <span className="accent">Opening</span></>}
      description="SAAA Cargo Services officially opened its new training centre at CT Hub."
      imageAlt="SAAA Training Centre Opening"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Archive"
            title={<>New SAAA Training <span className="accent">Centre</span></>}
            description="Historical announcement for the opening of SAAA Cargo Services' upgraded CBTA training facilities at CT Hub."
          />
          <div className="page-content">
            <p>
              SAAA Cargo Services officially opened its new training centre at CT Hub, featuring upgraded
              CBTA training facilities and expanded classroom capacity for dangerous goods and air cargo courses.
            </p>
            <div className="info-card">
              <Image
                src="/images/events/workshop-1.jpg"
                alt="SAAA Training Centre facilities"
                width={960}
                height={540}
              />
            </div>
            <p>
              The centre supports SAAA&apos;s role as an IATA Accredited Training School, delivering
              competency-based programmes for member companies and the wider air cargo community.
            </p>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
