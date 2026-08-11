import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArticlesListing } from "@/components/listing/ArticlesListing";
import { articleCategoryFilters, featuredNews } from "@/lib/content/articles";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

export const metadata = createPageMetadata({
  title: "Featured News",
  description: "Featured news and industry updates from SAAA@Singapore.",
  path: "/featured-news",
});

export default function FeaturedNewsPage() {
  return (
    <SubpageLayout
      title={<>Featured <span className="accent">News</span></>}
      description="Industry news, regulatory updates, and association highlights."
      imageAlt="SAAA Featured News"
    >
      <section className="section">
        <div className="container">
          <SectionHeader tag="Publications" title={<>Featured <span className="accent">News</span></>} />
          <ArticlesListing
            articles={featuredNews}
            detailBasePath="/article-detail"
            categoryFilters={[...articleCategoryFilters.featuredNews]}
          />
        </div>
      </section>
    </SubpageLayout>
  );
}
