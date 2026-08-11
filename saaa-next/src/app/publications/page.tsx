import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PublicationCarousel } from "@/components/home/PublicationCarousel";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Publications",
  description: "Browse SAAA Perspectives newsletters and publication archive.",
  path: "/publications",
});

export default function PublicationsPage() {
  return (
    <SubpageLayout
      title={<>Publications</>}
      description="SAAA Perspectives newsletters and industry publications."
      imageAlt="SAAA Publications"
    >
      <section className="section publication-section">
        <div className="container">
          <SectionHeader
            tag="Publications"
            title={<>PERSPECTIVES <span className="accent">Newsletter</span></>}
            description="Browse flipbook editions of the SAAA Perspectives newsletter archive."
          />
          <PublicationCarousel />
        </div>
      </section>
    </SubpageLayout>
  );
}
