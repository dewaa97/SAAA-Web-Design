"use client";

import Link from "next/link";
import { useState } from "react";
import type { ImddHubNavItem } from "@/lib/content/imdd";

const hubIcons: Record<ImddHubNavItem["icon"], React.ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1M8 21v-4h8v4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

type ImddSidebarNavProps = {
  items: ImddHubNavItem[];
  activeId: string;
};

export function ImddSidebarNav({ items, activeId }: ImddSidebarNavProps) {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <aside className="imdd-sidebar" aria-label="Project IMDD navigation">
      <button
        type="button"
        className="imdd-sidebar-toggle"
        aria-expanded={panelOpen}
        aria-controls="imdd-sidebar-panel"
        onClick={() => setPanelOpen((open) => !open)}
      >
        <span>Project IMDD</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        className={`imdd-sidebar-panel${panelOpen ? " is-open" : ""}`}
        id="imdd-sidebar-panel"
      >
        <div className="imdd-sidebar-title">Project IMDD</div>
        <nav className="imdd-sidebar-nav">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`imdd-sidebar-link${item.id === activeId ? " is-active" : ""}`}
              title={item.description}
              aria-current={item.id === activeId ? "page" : undefined}
            >
              <span className="imdd-sidebar-icon" aria-hidden="true">
                {hubIcons[item.icon]}
              </span>
              <span className="imdd-sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
