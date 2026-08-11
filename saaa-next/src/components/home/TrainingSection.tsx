"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterTrainingCourses,
  formatTrainingDate,
  getTrainingCount,
  trainingTabs,
  type TrainingTabId,
} from "@/data/trainingCourses";

const itemsPerPage = 6;

export function TrainingSection() {
  const [activeTab, setActiveTab] = useState<TrainingTabId>("all");
  const [page, setPage] = useState(0);

  const filteredCourses = useMemo(() => filterTrainingCourses(activeTab), [activeTab]);
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const safePage = Math.min(page, totalPages - 1);
  const visibleCourses = filteredCourses.slice(
    safePage * itemsPerPage,
    safePage * itemsPerPage + itemsPerPage,
  );

  const handleTabChange = (tabId: TrainingTabId) => {
    setActiveTab(tabId);
    setPage(0);
  };

  return (
    <section id="training" className="section training-section">
      <div className="container">
        <div className="training-header">
          <div className="section-tag">Training &amp; Courses</div>
          <h2 className="section-title">
            <span className="brand-saaa">SAAA</span> Training Courses
          </h2>
          <p className="section-desc">
            Competency-based training programs covering dangerous goods regulations,
            airfreight operations, and industry best practices. Browse our full catalog below.
          </p>
        </div>

        <div className="training-contact-row">
          <div className="training-contact-label">Contact SAAA Cargo Services Pte Ltd</div>
          <span className="training-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <a href="mailto:admin@saaa.org.sg" className="training-contact-link">
              admin@saaa.org.sg
            </a>
          </span>
          <span className="training-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="training-contact-link">(+65) 6545 5006</span>
          </span>
        </div>

        <div data-training-root data-items-per-page={itemsPerPage}>
          <div className="training-toolbar-row">
            <div className="training-tabs-scroll">
              <div className="training-tabs">
                {trainingTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`training-tab${activeTab === tab.id ? " active" : ""}`}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.label}
                    <span className="training-count">{getTrainingCount(tab.id)}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link href="/training-courses" className="btn btn-secondary">
              View All Training
            </Link>
          </div>

          <div className="training-list">
            {visibleCourses.map((course) => (
              <article key={course.id} className="training-row">
                <div className="training-row-main">
                  <h4 className="training-row-title">{course.title}</h4>
                  <p className="training-row-function">{course.functionName}</p>
                </div>
                <div className="training-row-meta">
                  <span className="training-row-date">
                    {formatTrainingDate(course.scheduleStartDate)}
                  </span>
                  <span className="training-row-mode">
                    {course.deliveryMode === "classroom" ? "Classroom" : "Virtual"}
                  </span>
                  <span className="training-row-vacancy">{course.vacanciesLeft} vacancies</span>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="training-pagination">
              <button
                type="button"
                className="training-page-btn"
                disabled={safePage === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
              >
                Previous
              </button>
              <span className="training-page-indicator">
                Page {safePage + 1} of {totalPages}
              </span>
              <button
                type="button"
                className="training-page-btn"
                disabled={safePage >= totalPages - 1}
                onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
