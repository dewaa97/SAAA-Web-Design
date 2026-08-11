import { ImddLayout } from "@/components/layout/ImddLayout";
import { Badge } from "@/components/ui/Badge";
import { ImddApplicantForm } from "@/components/imdd/ImddApplicantForm";
import { imddApplicantContent, imddContent } from "@/lib/content/imdd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Project IMDD For Applicants",
  description: "Explore logistics careers and internship opportunities through Project IMDD.",
  path: "/project-imdd/applicants",
  ogImage: "/images/project-imdd/hero-logistics.jpg",
});

type ApplicantsPageProps = {
  searchParams: Promise<{ company?: string }>;
};

export default async function ImddApplicantsPage({ searchParams }: ApplicantsPageProps) {
  const { company } = await searchParams;

  return (
    <ImddLayout
      activeNavId="applicants"
      hubNav={imddContent.hubNav}
      title={<>For <span className="accent">Applicants</span></>}
      description="Explore logistics careers and internship opportunities."
    >
      <section className="imdd-section">
        <div className="imdd-section-header">
          <Badge>Applicants</Badge>
          <h2>Start Your Logistics Career</h2>
        </div>
        {imddApplicantContent.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="imdd-lead">{paragraph}</p>
        ))}
        <ImddApplicantForm key={company ?? "default"} preselectedCompanySlug={company ?? null} />
      </section>
    </ImddLayout>
  );
}
