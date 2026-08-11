import { ImddLayout } from "@/components/layout/ImddLayout";
import { Badge } from "@/components/ui/badge";
import { ImddEmployerForm } from "@/components/imdd/ImddEmployerForm";
import { imddContent, imddEmployerContent } from "@/lib/content/imdd";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Project IMDD For Employers",
  description: "Partner with Project IMDD and submit your company enquiry.",
  path: "/project-imdd/employers",
  ogImage: "/images/project-imdd/hero-logistics.jpg",
});

export default function ImddEmployersPage() {
  return (
    <ImddLayout
      activeNavId="employers"
      hubNav={imddContent.hubNav}
      title={<>For <span className="accent">Employers</span></>}
      description="Partner with Project IMDD to attract and develop young logistics talent."
    >
      <section className="imdd-section">
        <div className="imdd-section-header">
          <Badge>Employers</Badge>
          <h2>Why Partner With Project IMDD?</h2>
        </div>
        <ul className="imdd-objectives-list">
          {imddEmployerContent.questions.map((question, index) => (
            <li key={question.slice(0, 32)}>
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              {question}
            </li>
          ))}
        </ul>
        <p className="imdd-lead">{imddEmployerContent.note}</p>
      </section>

      <section className="imdd-section">
        <div className="imdd-section-header">
          <Badge>Enquiry</Badge>
          <h2>Still Thinking?</h2>
        </div>
        <p className="imdd-lead">Submit your enquiry and our team will get in touch about partnering with Project IMDD.</p>
        <ImddEmployerForm />
      </section>
    </ImddLayout>
  );
}
