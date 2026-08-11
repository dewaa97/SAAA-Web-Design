import { ImddLayout } from "@/components/layout/ImddLayout";
import { Badge } from "@/components/ui/badge";
import { ImddCompaniesGrid } from "@/components/imdd/ImddCompaniesGrid";
import { imddContent } from "@/lib/content/imdd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Project IMDD Companies",
  description: "Browse partner companies hiring through Project IMDD.",
  path: "/project-imdd/companies",
  ogImage: "/images/project-imdd/hero-logistics.jpg",
});

export default function ImddCompaniesPage() {
  return (
    <ImddLayout
      activeNavId="companies"
      hubNav={imddContent.hubNav}
      title={<>Partner <span className="accent">Companies</span></>}
      description="Browse partner companies hiring through Project IMDD."
    >
      <section className="imdd-section">
        <div className="imdd-section-header">
          <Badge>Companies</Badge>
          <h2>Project IMDD Partner Companies</h2>
        </div>
        <ImddCompaniesGrid />
      </section>
    </ImddLayout>
  );
}
