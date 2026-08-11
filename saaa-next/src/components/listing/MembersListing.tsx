"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ListingPagination } from "@/components/listing/ListingPagination";
import { memberLetters, members } from "@/lib/content/members";
import { matchesSearch, paginate } from "@/lib/utils/listing";

const perPage = 12;

export function MembersListing() {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return members
      .filter((member) => {
        if (letter !== "all" && member.letter !== letter) return false;
        if (!matchesSearch(member, search, ["name"])) return false;
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [letter, search]);

  const paged = paginate(filtered, page, perPage);

  return (
    <div className="listing-layout listing-layout-single">
      <aside className="listing-sidebar" aria-label="Member filters">
        <div className="listing-search">
          <label htmlFor="member-search">Search members</label>
          <input
            id="member-search"
            type="search"
            placeholder="Search by company name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="listing-filters listing-filters-letters">
          <div className="listing-filters-title">Filter by letter</div>
          <button type="button" className={letter === "all" ? "active" : ""} onClick={() => { setLetter("all"); setPage(1); }}>
            All
          </button>
          {memberLetters.map((item) => (
            <button
              key={item}
              type="button"
              className={letter === item ? "active" : ""}
              onClick={() => {
                setLetter(item);
                setPage(1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      <div className="listing-main">
        <div className="listing-section-header">
          <span className="listing-count">
            {filtered.length} member{filtered.length === 1 ? "" : "s"} found
          </span>
        </div>
        {paged.items.length === 0 ? (
          <p className="listing-empty">No members match your search.</p>
        ) : (
          <div className="members-grid">
            {paged.items.map((member) => (
              <article key={member.id} className="member-card">
                <div className="member-logo">
                  <Image src={member.logo} alt={`${member.name} logo`} width={160} height={80} />
                </div>
                <h3>{member.name}</h3>
              </article>
            ))}
          </div>
        )}
        <ListingPagination page={paged.page} totalPages={paged.totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
