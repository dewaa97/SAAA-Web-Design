"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ListingPagination } from "@/components/listing/ListingPagination";
import type { SaaaArticle } from "@/lib/content/articles";
import { matchesSearch, paginate } from "@/lib/utils/listing";

type ArticlesListingProps = {
  articles: SaaaArticle[];
  detailBasePath: string;
  categoryFilters: { id: string; label: string }[];
};

const perPage = 6;

export function ArticlesListing({ articles, detailBasePath, categoryFilters }: ArticlesListingProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return articles
      .filter((article) => {
        if (category !== "all" && article.category !== category) return false;
        if (!matchesSearch(article, search, ["title", "excerpt", "date"])) return false;
        return true;
      })
      .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
  }, [articles, category, search]);

  const paged = paginate(filtered, page, perPage);

  return (
    <div className="listing-layout listing-layout-single">
      <aside className="listing-sidebar" aria-label="Article filters">
        <div className="listing-search">
          <label htmlFor="article-search">Search</label>
          <input
            id="article-search"
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="listing-filters">
          <div className="listing-filters-title">Category</div>
          {categoryFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? "active" : ""}
              onClick={() => {
                setCategory(item.id);
                setPage(1);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="listing-main">
        <div className="listing-section-header">
          <span className="listing-count">
            {filtered.length} article{filtered.length === 1 ? "" : "s"} found
          </span>
        </div>
        {paged.items.length === 0 ? (
          <p className="listing-empty">No articles match your filters.</p>
        ) : (
          <div className="articles-grid">
            {paged.items.map((article) => (
              <Link
                key={article.id}
                href={article.link ?? `${detailBasePath}?id=${article.id}`}
                className="article-card"
              >
                <Image src={article.image} alt={article.title} width={400} height={240} />
                <div className="article-card-body">
                  <div className="article-date">
                    {article.badge ? <span className="article-badge">{article.badge}</span> : null}
                    {article.date}
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="read-link">Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <ListingPagination page={paged.page} totalPages={paged.totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
