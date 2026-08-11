import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MembershipApplicationForm } from "@/components/members/MembershipApplicationForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Membership Sign-Up",
  description: "Apply for SAAA membership and join Singapore's leading air cargo agents association.",
  path: "/membership-application",
});

export default function MembershipApplicationPage() {
  return (
    <SubpageLayout
      title={<>Membership <span className="accent">Sign-Up</span></>}
      description="Join SAAA and connect with Singapore's air cargo forwarding community."
      imageAlt="SAAA Membership Application"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Members"
            title={<>Apply for <span className="accent">Membership</span></>}
            description="Complete the form below to express your interest in SAAA membership. Our team will follow up with the full application pack."
          />
          <MembershipApplicationForm />
        </div>
      </section>
    </SubpageLayout>
  );
}
