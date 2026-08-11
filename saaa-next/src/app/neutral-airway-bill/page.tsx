import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicePageContent } from "@/components/services/ServicePageContent";
import { neutralAirwayBill } from "@/lib/content/services";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Neutral Airway Bill",
  description: "Order neutral airway bills (NAB) through SAAA Cargo Services for member companies.",
  path: "/neutral-airway-bill",
});

export default function NeutralAirwayBillPage() {
  return (
    <SubpageLayout
      title={<>Neutral <span className="accent">Airway Bill</span></>}
      description="Neutral airway bill stock and ordering for SAAA member companies."
      imageAlt="Neutral Airway Bill"
    >
      <section className="section section-border-bottom">
        <div className="container">
          <SectionHeader
            tag="Services"
            title={<>Neutral <span className="accent">Airway Bill</span></>}
            description={neutralAirwayBill.intro}
          />
          <ServicePageContent sections={neutralAirwayBill.sections} contact={neutralAirwayBill.contact} />
        </div>
      </section>
    </SubpageLayout>
  );
}
