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
      title={
        <>
          <span className="brand-saaa">SAAA</span> Training Courses
        </>
      }
      description="Competency-based training programs covering dangerous goods regulations, airfreight operations, and industry best practices. Browse the full course catalog below."
      imageAlt="SAAA Training Courses"
    >
      <section className="section">
        <div className="container">
          <SectionHeader
            tag="Training & Courses"
            title={
              <>
                Full Course <span className="accent">Catalog</span>
              </>
            }
            description="Filter by program category and browse all available SAAA training courses with dates and vacancy information."
          />
          <TrainingCoursesListing />
        </div>
      </section>
    </SubpageLayout>
  );
}
