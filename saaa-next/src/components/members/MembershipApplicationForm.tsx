"use client";

import { FormEvent } from "react";

export function MembershipApplicationForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`);
    const subject = encodeURIComponent("SAAA Membership Application");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:saaasin@saaa.org.sg?subject=${subject}&body=${body}`;
  }

  return (
    <form className="imdd-form-card membership-form" onSubmit={handleSubmit}>
      <h3>Membership Application</h3>
      <div className="imdd-form-stack">
        <div className="imdd-form-field">
          <label htmlFor="companyName">Company Name *</label>
          <input id="companyName" name="Company Name" type="text" required />
        </div>
        <div className="imdd-form-field">
          <label htmlFor="membershipType">Membership Type *</label>
          <select id="membershipType" name="Membership Type" required defaultValue="">
            <option value="">Select membership type</option>
            <option value="Ordinary Member">Ordinary Member</option>
            <option value="Associate Member">Associate Member</option>
          </select>
        </div>
        <div className="imdd-form-field">
          <label htmlFor="contactPerson">Contact Person *</label>
          <input id="contactPerson" name="Contact Person" type="text" required />
        </div>
        <div className="imdd-form-field">
          <label htmlFor="contactEmail">Contact Email *</label>
          <input id="contactEmail" name="Contact Email" type="email" required />
        </div>
        <div className="imdd-form-field">
          <label htmlFor="contactPhone">Contact Phone *</label>
          <input id="contactPhone" name="Contact Phone" type="tel" required />
        </div>
        <div className="imdd-form-field">
          <label htmlFor="iataMember">IATA Member? *</label>
          <select id="iataMember" name="IATA Member" required defaultValue="">
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="imdd-form-field">
          <label htmlFor="remarks">Additional Information</label>
          <textarea id="remarks" name="Additional Information" rows={4} />
        </div>
      </div>
      <div className="imdd-form-actions">
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </div>
      <p className="imdd-form-note">
        Submissions open your email client with the application details. For file uploads, please attach documents when sending the email.
      </p>
    </form>
  );
}
