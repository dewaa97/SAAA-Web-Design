import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { permitService } from "@/lib/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Permit & Certificate of Origin",
  description:
    "Permit declaration, Certificate of Origin collection, and ACES cargo manifest services from SAAA Cargo Services.",
  path: "/permit-certificate-of-origin",
});

export default function PermitCertificatePage() {
  return (
    <SubpageLayout
      title={<>Permit & <span className="accent">Certificate of Origin</span></>}
      description="Permit declaration, Certificate of Origin collection, and ACES cargo manifest services for the air cargo industry."
      imageAlt="Permit and Certificate of Origin"
    >
      <section className="section section-border-bottom">
        <div className="container">
          <SectionHeader
            tag="Permit Services"
            title={<>Permit & Certificate of <span className="accent">Origin</span></>}
            description="SAAA Cargo Services provides permit and documentation support to facilitate cargo clearance for members and walk-in customers."
          />
          <ServicePageContent
            sections={permitService.sections}
            contact={permitService.contact}
            registerUrl={permitService.registerUrl}
          />
        </div>
      </section>
    </SubpageLayout>
  );
}
