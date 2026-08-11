"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  filterTrainingCourses,
  formatTrainingDate,
  getTrainingCount,
  trainingTabs,
  type TrainingTabId,
} from "@/lib/content/trainingCourses";
import { ListingPagination } from "@/components/listing/ListingPagination";
import { paginate } from "@/lib/utils/listing";

const perPage = 6;

export function TrainingCoursesListing() {
  const [activeTab, setActiveTab] = useState<TrainingTabId>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterTrainingCourses(activeTab), [activeTab]);
  const paged = paginate(filtered, page, perPage);

  return (
    <div className="training-page">
      <div className="training-tabs" role="tablist" aria-label="Training categories">
        {trainingTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => {
              setActiveTab(tab.id);
              setPage(1);
            }}
          >
            {tab.label}
            <span className="tab-count">{getTrainingCount(tab.id)}</span>
          </button>
        ))}
      </div>

      <div className="training-grid">
        {paged.items.map((course) => (
          <article key={course.id} className="training-card">
            <div className="training-card-header">
              <span className="training-badge">{course.deliveryMode}</span>
              <span className="training-vacancies">{course.vacanciesLeft} vacancies</span>
            </div>
            <h3>{course.title}</h3>
            <p className="training-function">{course.functionName}</p>
            <div className="training-meta">
              <span>{formatTrainingDate(course.scheduleStartDate)}</span>
              <span>{course.scheduleStartTime} – {course.scheduleEndTime}</span>
              <span>{course.dayCount} day{course.dayCount === 1 ? "" : "s"}</span>
            </div>
            <p className="training-address">{course.classroomAddress}</p>
            <Link href="/coming-soon" className="training-enroll-link">
              Enquire / Register →
            </Link>
          </article>
        ))}
      </div>

      <ListingPagination page={paged.page} totalPages={paged.totalPages} onPageChange={setPage} />
    </div>
  );
}
