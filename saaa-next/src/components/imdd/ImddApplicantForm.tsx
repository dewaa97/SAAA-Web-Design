"use client";

import { FormEvent, useMemo, useState } from "react";
import { imddApplicantContent } from "@/lib/content/imdd";
import { findCompanyBySlug, ImddApplyCompanyOptions } from "@/components/imdd/ImddCompaniesGrid";

type ApplicantFormProps = {
  preselectedCompanySlug?: string | null;
};

export function ImddApplicantForm({ preselectedCompanySlug }: ApplicantFormProps) {
  const preselectedCompany = useMemo(
    () => findCompanyBySlug(preselectedCompanySlug ?? null)?.name ?? "",
    [preselectedCompanySlug],
  );
  const [firstCompany, setFirstCompany] = useState(preselectedCompany);
  const { internshipApplication, contactEmail } = imddApplicantContent;
  const isOpen = internshipApplication.open;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const lines = Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent("Project IMDD Internship Application");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  if (!isOpen) {
    return (
      <div className="imdd-form-card">
        <h3>Project IMDD Internship Application</h3>
        <p className="imdd-form-closed">{internshipApplication.closedMessage}</p>
      </div>
    );
  }

  return (
    <div className="imdd-form-card">
      <h3>Project IMDD Internship Application</h3>
      <p className="imdd-form-note">{internshipApplication.eventLabel}</p>
      <form onSubmit={handleSubmit}>
        <div className="imdd-form-stack">
          <div className="imdd-form-field">
            <label htmlFor="firstCompany">First Company *</label>
            <select id="firstCompany" name="First Company" required value={firstCompany} onChange={(e) => setFirstCompany(e.target.value)}>
              <ImddApplyCompanyOptions />
            </select>
          </div>
          <div className="imdd-form-field">
            <label htmlFor="firstPosition">First Company Position *</label>
            <input id="firstPosition" name="First Company Position" type="text" required />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="secondCompany">Second Company</label>
            <select id="secondCompany" name="Second Company">
              <ImddApplyCompanyOptions />
            </select>
          </div>
          <div className="imdd-form-field">
            <label htmlFor="secondPosition">Second Company Position</label>
            <input id="secondPosition" name="Second Company Position" type="text" />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="applicantName">Your Name *</label>
            <input id="applicantName" name="Your Name" type="text" required />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="applicantSchool">Education Institution</label>
            <input id="applicantSchool" name="Education Institution" type="text" />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="internshipStart">Internship Start Date</label>
            <input id="internshipStart" name="Internship Start Date" type="date" />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="internshipEnd">Internship End Date</label>
            <input id="internshipEnd" name="Internship End Date" type="date" />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="applicantEmail">Contact Email *</label>
            <input id="applicantEmail" name="Contact Email" type="email" required />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="applicantPhone">Contact Phone Number *</label>
            <input id="applicantPhone" name="Contact Phone Number" type="tel" required />
          </div>
        </div>
        <div className="imdd-form-actions">
          <button type="submit" className="btn btn-primary">Submit Application</button>
        </div>
        <p className="imdd-form-note">Form submissions open your email client with the application details pre-filled.</p>
      </form>
    </div>
  );
}
