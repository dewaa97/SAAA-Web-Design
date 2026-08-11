"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getHomepagePublications,
  getPublicationCardCopy,
} from "@/data/publications";

export function PublicationCarousel() {
  const publicationIssues = useMemo(() => getHomepagePublications(), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const getPerView = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }, []);

  const getPageCount = useCallback(() => {
    return Math.max(1, Math.ceil(publicationIssues.length / getPerView()));
  }, [getPerView, publicationIssues.length]);

  const [pageCount, setPageCount] = useState(() =>
    Math.max(1, Math.ceil(publicationIssues.length / 4)),
  );

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const perView = getPerView();
    const total = getPageCount();
    const safePage = Math.min(page, total - 1);

    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const slides = Array.from(track.querySelectorAll<HTMLElement>(".publication-card"));
    const cardWidth = slides[0]?.getBoundingClientRect().width ?? 0;
    const offset = safePage * (cardWidth + gap) * perView;

    track.style.transform = `translateX(-${offset}px)`;
  }, [getPageCount, getPerView, page]);

  useEffect(() => {
    setPageCount(getPageCount());
    const handleResize = () => setPageCount(getPageCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getPageCount]);

  useEffect(() => {
    update();
  }, [page, update]);

  return (
    <div className="publication-shell" data-publication-carousel>
      <div className="publication-viewport">
        <div className="publication-track" ref={trackRef}>
          {publicationIssues.map((issue) => (
            <article key={`${issue.year}-${issue.date}`} className="publication-card">
              <a
                className="publication-cover"
                href={issue.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={issue.image} alt={`${issue.title} ${issue.date} cover`} loading="lazy" />
              </a>
              <div className="publication-card-body">
                <div className="publication-type">Flipbook Edition</div>
                <h4 className="publication-card-title">{issue.date}</h4>
                <p className="publication-card-desc">{getPublicationCardCopy(issue.year)}</p>
                <a
                  className="publication-card-link"
                  href={issue.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open flipbook
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="publication-controls">
        <div className="publication-nav-group">
          <button
            className="publication-nav"
            type="button"
            aria-label="Previous publication"
            disabled={page === 0}
            onClick={() => setPage((current) => Math.max(0, current - 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="publication-nav"
            type="button"
            aria-label="Next publication"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <div className="publication-dots">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`publication-dot${index === page ? " active" : ""}`}
              aria-label={`Go to publication page ${index + 1}`}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
