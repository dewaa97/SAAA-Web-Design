import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { barCodeLabels } from "@/lib/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Bar Code Labels",
  description: "Order bar code labels for air cargo operations through SAAA Cargo Services.",
  path: "/bar-code-labels",
});

export default function BarCodeLabelsPage() {
  return (
    <SubpageLayout
      title={<>Bar Code <span className="accent">Labels</span></>}
      description="Bar code label supply for member companies and air cargo operations."
      imageAlt="Bar Code Labels"
    >
      <section className="section section-border-bottom">
        <div className="container">
          <SectionHeader
            tag="Services"
            title={<>Bar Code <span className="accent">Labels</span></>}
            description={barCodeLabels.intro}
          />
          <ServicePageContent sections={barCodeLabels.sections} contact={barCodeLabels.contact} />
        </div>
      </section>
    </SubpageLayout>
  );
}
