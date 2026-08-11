import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticlesListing } from "@/components/listing/ArticlesListing";
import { announcements, articleCategoryFilters } from "@/lib/content/articles";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Announcements",
  description: "Official SAAA announcements on events, training, membership, and association updates.",
  path: "/announcements",
});

export default function AnnouncementsPage() {
  return (
    <SubpageLayout
      title={<>Announcements</>}
      description="Official announcements from SAAA@Singapore."
      imageAlt="SAAA Announcements"
    >
      <section className="section">
        <div className="container">
          <SectionHeader tag="Publications" title={<>Latest <span className="accent">Announcements</span></>} />
          <ArticlesListing
            articles={announcements}
            detailBasePath="/article-detail"
            categoryFilters={[...articleCategoryFilters.announcements]}
          />
        </div>
      </section>
    </SubpageLayout>
  );
}
