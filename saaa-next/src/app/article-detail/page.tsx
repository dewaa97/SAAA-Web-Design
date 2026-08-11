import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubpageLayout } from "@/components/layout/SubpageLayout";
import { HtmlContent } from "@/components/ui/HtmlContent";
import { getArticleById } from "@/lib/content/articles";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/legacy/subpage.css";

type ArticleDetailPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export async function generateMetadata({ searchParams }: ArticleDetailPageProps) {
  const { id = "" } = await searchParams;
  const article = getArticleById(id);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/article-detail?id=${article.id}`,
    ogImage: article.image,
  });
}

export default async function ArticleDetailPage({ searchParams }: ArticleDetailPageProps) {
  const { id = "" } = await searchParams;
  const article = getArticleById(id);
  if (!article) notFound();

  return (
    <SubpageLayout
      title={<>{article.title}</>}
      description={article.excerpt}
      bgImage={article.image}
      imageAlt={article.title}
    >
      <section className="section">
        <div className="container article-detail">
          <div className="article-detail-meta">
            {article.badge ? <span className="article-badge">{article.badge}</span> : null}
            <span>{article.date}</span>
          </div>
          <Image src={article.image} alt={article.title} width={960} height={480} className="article-detail-image" />
          <HtmlContent html={article.body} />
          <div className="article-detail-actions">
            <Link href="/announcements" className="btn btn-secondary">Back to Announcements</Link>
            <Link href="/featured-news" className="btn btn-secondary">Featured News</Link>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
