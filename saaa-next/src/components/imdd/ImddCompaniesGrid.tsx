"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { getApplyCompanies, getCompanySlug, imddCompanies } from "@/lib/content/imdd";

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter((word) => word && !/^(pte|ltd|sg|s|\(|\))$/i.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function ImddCompaniesGrid() {
  const sorted = useMemo(
    () => imddCompanies.slice().sort((a, b) => a.name.localeCompare(b.name)),
    [],
  );

  return (
    <div className="imdd-companies-grid">
      {sorted.map((company) => {
        const slug = getCompanySlug(company.name);
        const inner = (
          <>
            <div className="imdd-company-logo">
              <Image src={company.logo} alt={`${company.name} logo`} width={120} height={60} />
            </div>
            <div className="imdd-company-name">{company.name}</div>
            {company.hasApply ? (
              <Link href={`/project-imdd/applicants?company=${encodeURIComponent(slug)}`} className="imdd-apply-link">
                Apply →
              </Link>
            ) : null}
          </>
        );

        if (company.url) {
          return (
            <a
              key={company.name}
              className="imdd-company-card"
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={company.name} className="imdd-company-card">
            {inner}
          </div>
        );
      })}
    </div>
  );
}

export function ImddApplyCompanyOptions() {
  const companies = getApplyCompanies();
  return (
    <>
      <option value="">Select company</option>
      {companies.map((company) => (
        <option key={company.name} value={company.name}>
          {company.name}
        </option>
      ))}
    </>
  );
}

export function findCompanyBySlug(slug: string | null) {
  if (!slug) return null;
  return getApplyCompanies().find((company) => getCompanySlug(company.name) === slug) ?? null;
}

export { getCompanySlug, getInitials };
