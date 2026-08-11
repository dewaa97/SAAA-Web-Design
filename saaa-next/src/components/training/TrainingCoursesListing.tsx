"use client";

import { useMemo, useState } from "react";
import {
  filterTrainingCourses,
  formatTrainingDate,
  formatTrainingDuration,
  formatTrainingLocation,
  formatTrainingTime,
  getTrainingCount,
  trainingTabs,
  type TrainingCourse,
  type TrainingTabId,
} from "@/lib/content/trainingCourses";
import { ListingPagination } from "@/components/listing/ListingPagination";
import { paginate } from "@/lib/utils/listing";

const perPage = 6;

function TrainingSchedule({ course, rowId }: { course: TrainingCourse; rowId: string }) {
  const [expanded, setExpanded] = useState(false);
  const sessions = course.sessions;

  if (!sessions.length) return null;

  return (
    <div className="training-schedule">
      <button
        type="button"
        className="training-schedule-toggle"
        aria-expanded={expanded}
        aria-controls={`schedule-panel-${rowId}`}
        onClick={() => setExpanded((current) => !current)}
      >
        {expanded ? "Hide training schedule" : "Click here for training schedule"}
      </button>
      <div className="training-schedule-panel" id={`schedule-panel-${rowId}`} hidden={!expanded}>
        <div className="training-schedule-label">Training Schedule</div>
        {sessions.map((session, index) => {
          const prefix = sessions.length > 1 ? `Day ${index + 1}: ` : "";
          return (
            <div key={`${session.date}-${index}`} className="training-schedule-item">
              {prefix}
              {formatTrainingDate(session.date)} · {formatTrainingTime(session.startTime)} –{" "}
              {formatTrainingTime(session.endTime)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TrainingRow({ course, index }: { course: TrainingCourse; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const rowId = `${course.id}-${index}`;

  return (
    <div className="training-row" data-category={course.category}>
      <div className="number">{number}</div>
      <div className="content">
        <div className="title">{course.title}</div>
        <div className="function">{course.functionName}</div>
        <div className="meta">
          <span>{formatTrainingDuration(course.dayCount)}</span>
          <span>{course.vacanciesLeft} vacancies left</span>
          <span className="training-meta-location">{formatTrainingLocation(course)}</span>
        </div>
        <TrainingSchedule course={course} rowId={rowId} />
      </div>
      <div className="action">
        <a href="/coming-soon" className="btn-small primary">
          Book Now
        </a>
      </div>
    </div>
  );
}

export function TrainingCoursesListing() {
  const [activeTab, setActiveTab] = useState<TrainingTabId>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterTrainingCourses(activeTab), [activeTab]);
  const paged = paginate(filtered, page, perPage);

  return (
    <>
      <div className="training-contact-row">
        <div className="training-contact-label">Contact SAAA Cargo Services Pte Ltd</div>
        <span className="training-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <a href="mailto:admin@saaa.org.sg" className="training-contact-link">
            admin@saaa.org.sg
          </a>
        </span>
        <span className="training-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--red-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.96 12.96 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.96 12.96 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="training-contact-link">(+65) 6545 5006</span>
        </span>
      </div>

      <div data-training-root data-items-per-page={perPage}>
        <div className="training-toolbar-row">
          <div className="training-tabs-scroll">
            <div className="training-tabs" role="tablist" aria-label="Training categories">
              {trainingTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`training-tab${activeTab === tab.id ? " active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setPage(1);
                  }}
                >
                  {tab.label}
                  <span className="training-count">{getTrainingCount(tab.id)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="training-list" data-training-list>
          {!filtered.length ? (
            <div className="training-empty">No courses available in this category yet.</div>
          ) : (
            paged.items.map((course, index) => (
              <TrainingRow
                key={course.id}
                course={course}
                index={(paged.page - 1) * perPage + index}
              />
            ))
          )}
        </div>

        {paged.totalPages > 1 ? (
          <ListingPagination
            page={paged.page}
            totalPages={paged.totalPages}
            onPageChange={setPage}
            className="training-style"
          />
        ) : null}
      </div>
    </>
  );
}
