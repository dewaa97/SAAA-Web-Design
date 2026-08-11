import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { MembershipApplicationForm } from "@/components/members/MembershipApplicationForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Membership Application",
  description:
    "Apply to join SAAA@Singapore as an Ordinary or Associate member. Complete the form below and email it with the required supporting documents.",
  path: "/membership-application",
});

export default function MembershipApplicationPage() {
  return (
    <SubpageLayout
      title={
        <>
          Membership <span className="accent">Application</span>
        </>
      }
      description="Apply to join SAAA@Singapore as an Ordinary or Associate member. Complete the form below and email it with the required supporting documents."
      imageAlt="Membership Application — SAAA"
    >
      <section className="section">
        <div className="container">
          <MembershipApplicationForm />
        </div>
      </section>
    </SubpageLayout>
  );
}
