"use client";

import { FormEvent } from "react";
import { imddEmployerContent } from "@/lib/content/imdd";

export function ImddEmployerForm() {
  const { contactEmail } = imddEmployerContent;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent("Project IMDD Employer Enquiry");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="imdd-form-card" id="imdd-employer-form">
      <h3>Partner With Project IMDD</h3>
      <form onSubmit={handleSubmit}>
        <div className="imdd-form-stack">
          <div className="imdd-form-field">
            <label htmlFor="employerCompanyName">Company Name *</label>
            <input id="employerCompanyName" name="Company Name" type="text" required />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="employerWebsite">Company Website</label>
            <input id="employerWebsite" name="Company Website" type="url" />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="employerEmail">Company Email *</label>
            <input id="employerEmail" name="Company Email" type="email" required />
          </div>
          <div className="imdd-form-field">
            <label htmlFor="employerMember">SAAA Member</label>
            <select id="employerMember" name="SAAA Member" defaultValue="">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="imdd-form-field">
            <label htmlFor="employerMessage">Message</label>
            <textarea
              id="employerMessage"
              name="Message"
              placeholder="Tell us about your hiring needs or interest in Project IMDD"
            />
          </div>
        </div>
        <div className="imdd-form-actions">
          <button type="submit" className="btn btn-primary">Send Enquiry</button>
        </div>
        <p className="imdd-form-note">Form submissions open your email client with the enquiry details pre-filled.</p>
      </form>
    </div>
  );
}
