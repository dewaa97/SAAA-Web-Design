import Link from "next/link";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Coming Soon",
  description: "This SAAA page is coming soon.",
  path: "/coming-soon",
});

export default function ComingSoonPage() {
  return (
    <SubpageLayout
      title={<>Coming <span className="accent">Soon</span></>}
      description="We're preparing this section of the SAAA website."
      imageAlt="Coming Soon"
    >
      <section className="section">
        <div className="container">
          <div className="coming-soon-panel">
            <h2>Coming Soon</h2>
            <p>
              This feature is under development. Please check back later or contact the SAAA secretariat
              for assistance.
            </p>
            <Link href="/" className="btn btn-primary">Return Home</Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
