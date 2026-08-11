import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrainingCoursesListing } from "@/components/training/TrainingCoursesListing";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Training Courses",
  description:
    "Browse SAAA training courses covering CBTA dangerous goods functions, air cargo operations, and industry best practices.",
  path: "/training-courses",
});

export default function TrainingCoursesPage() {
  return (
    <SubpageLayout
      title={<>Training <span className="accent">Courses</span></>}
      description="Competency-based training programmes covering dangerous goods regulations, airfreight operations, and industry best practices."
      imageAlt="SAAA Training Courses"
    >
      <section className="section training-page-section">
        <div className="container">
          <SectionHeader
            tag="Training"
            title={<>SAAA <span className="brand-saaa">Training</span> Courses</>}
            description="Browse the full training catalogue. Contact admin@saaa.org.sg for enrolment enquiries."
          />
          <TrainingCoursesListing />
        </div>
      </section>
    </SubpageLayout>
  );
}
