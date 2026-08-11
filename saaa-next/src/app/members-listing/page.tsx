import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MembersListing } from "@/components/listing/MembersListing";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "SAAA Members Listing",
  description: "Browse the directory of SAAA member companies in Singapore's air cargo and logistics industry.",
  path: "/members-listing",
});

export default function MembersListingPage() {
  return (
    <SubpageLayout
      title={<>SAAA <span className="accent">Members</span></>}
      description="Member companies of the Singapore Aircargo Agents Association."
      imageAlt="SAAA Members Listing"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Members"
            title={<>Member <span className="accent">Directory</span></>}
            description="Search and browse SAAA member companies across Singapore's air cargo forwarding industry."
          />
          <MembersListing />
        </div>
      </section>
    </SubpageLayout>
  );
}
