"use client";

import { FormEvent } from "react";
import { loginCompanies } from "@/lib/content/members";

export function MembersLoginForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const companyId = String(data.get("companyId") ?? "");
    const username = String(data.get("username") ?? "");
    window.open(`https://www.saaa.org.sg/members-portal?company=${encodeURIComponent(companyId)}&user=${encodeURIComponent(username)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="members-login-form" onSubmit={handleSubmit}>
      <div className="imdd-form-field">
        <label htmlFor="companyId">Member Company *</label>
        <select id="companyId" name="companyId" required defaultValue="">
          <option value="">Select your company</option>
          {loginCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <div className="imdd-form-field">
        <label htmlFor="username">Username / Email *</label>
        <input id="username" name="username" type="text" required autoComplete="username" />
      </div>
      <div className="imdd-form-field">
        <label htmlFor="password">Password *</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <div className="imdd-form-actions">
        <button type="submit" className="btn btn-primary">Log In to Members Portal</button>
      </div>
      <p className="imdd-form-note">
        Authentication is handled by the SAAA members portal. You will be redirected to the official login page.
      </p>
    </form>
  );
}
