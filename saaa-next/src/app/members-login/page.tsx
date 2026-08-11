import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MembersLoginForm } from "@/components/members/MembersLoginForm";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Members Portal Log In",
  description: "Log in to the SAAA members portal for member-only resources and services.",
  path: "/members-login",
});

export default function MembersLoginPage() {
  return (
    <SubpageLayout
      title={<>Members <span className="accent">Portal</span></>}
      description="Access member-only resources, documents, and services through the SAAA members portal."
      imageAlt="SAAA Members Portal"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Members"
            title={<>Members Portal <span className="accent">Log In</span></>}
            description="Select your member company and sign in to access the SAAA members portal."
          />
          <MembersLoginForm />
        </div>
      </section>
    </SubpageLayout>
  );
}
