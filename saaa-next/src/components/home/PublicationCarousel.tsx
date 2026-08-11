"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getHomepagePublications,
  getPublicationCardCopy,
} from "@/lib/content/publications";

function getPerViewForWidth(width: number) {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  return 4;
}

export function PublicationCarousel() {
  const publicationIssues = useMemo(() => getHomepagePublications(), []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const perView = getPerViewForWidth(viewportWidth);
  const pageCount = Math.max(1, Math.ceil(publicationIssues.length / perView));
  const activePage = Math.min(page, pageCount - 1);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const slides = Array.from(track.querySelectorAll<HTMLElement>(".publication-card"));
    const cardWidth = slides[0]?.getBoundingClientRect().width ?? 0;
    const offset = activePage * (cardWidth + gap) * perView;

    track.style.transform = `translateX(-${offset}px)`;
  }, [activePage, perView]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    update();
  }, [update]);

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
                <Image
                  src={issue.image}
                  alt={`${issue.title} ${issue.date} cover`}
                  width={280}
                  height={360}
                />
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
            disabled={activePage === 0}
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
            disabled={activePage >= pageCount - 1}
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
              className={`publication-dot${index === activePage ? " active" : ""}`}
              aria-label={`Go to publication page ${index + 1}`}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
