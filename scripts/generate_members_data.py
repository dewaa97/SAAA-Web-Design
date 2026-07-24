#!/usr/bin/env python3
"""Generate js/members-data.js from the official SAAA Members' Category pages."""

import json
import re
import subprocess
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "js" / "members-data.js"
LOGO_DIR = ROOT / "images" / "members" / "logos"
CACHE_DIR = ROOT / ".cache" / "member-pages"

CATEGORY_PAGES = {
    "members-a": "https://www.saaa.org.sg/members-a/",
    "member-b": "https://www.saaa.org.sg/member-b/",
    "member-e": "https://www.saaa.org.sg/member-e/",
    "member-h": "https://www.saaa.org.sg/member-h/",
    "member-m": "https://www.saaa.org.sg/member-m/",
    "member-p-q": "https://www.saaa.org.sg/member-p-q/",
    "member-r-s": "https://www.saaa.org.sg/member-r-s/",
    "member-t-u": "https://www.saaa.org.sg/member-t-u/",
    "member-v-y": "https://www.saaa.org.sg/member-v-y/",
}

BLOCK_PATTERN = re.compile(
    r'<table id="table_dimension"[^>]*>(.*?)</table>',
    re.IGNORECASE | re.DOTALL,
)


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower())
    return slug.strip("-")


def clean_name(value: str) -> str:
    value = unescape(re.sub(r"<[^>]+>", "", value))
    return re.sub(r"\s+", " ", value).strip()


def normalize_key(name: str) -> str:
    name = unescape(name).upper()
    name = name.replace("&", " AND ")
    name = re.sub(r"\([^)]*\)", "", name)
    return re.sub(r"[^A-Z0-9]+", "", name)


def fetch_page(slug: str, url: str) -> str:
    cached = CACHE_DIR / f"{slug}.html"
    if cached.exists() and cached.stat().st_size > 0:
        return cached.read_text(encoding="utf-8", errors="replace")

    result = subprocess.run(
        ["curl", "-sL", "--max-time", "180", url],
        check=True,
        capture_output=True,
        text=True,
    )
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cached.write_text(result.stdout, encoding="utf-8")
    return result.stdout


def extension_from_url(url: str) -> str:
    lowered = url.lower()
    for ext in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
        if ext in lowered:
            return ext
    return ".jpg"


def download_logo(url: str, destination: Path) -> bool:
    if destination.exists() and destination.stat().st_size > 0:
        return True
    for _ in range(3):
        result = subprocess.run(
            [
                "curl",
                "-sL",
                "--retry",
                "2",
                "--retry-delay",
                "2",
                "--max-time",
                "180",
                "-o",
                str(destination),
                url,
            ],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0 and destination.exists() and destination.stat().st_size > 0:
            return True
    if destination.exists():
        destination.unlink(missing_ok=True)
    return False


def is_company_name(name: str) -> bool:
    lowered = name.lower()
    if lowered.startswith("key words"):
        return False
    if len(name) > 90 or name.endswith("..."):
        return False
    if any(
        phrase in lowered
        for phrase in (
            " was founded",
            " established in ",
            " started ",
            " is a ",
            " is an ",
            " has been ",
            " we serve ",
            " we are ",
            " our ",
        )
    ):
        return False
    return True


def scrape_category_members() -> list[dict]:
    members = []
    seen = set()

    for slug, page_url in CATEGORY_PAGES.items():
        html = fetch_page(slug, page_url)
        for block in BLOCK_PATTERN.findall(html):
            img_match = re.search(r'<img[^>]+src="([^"]+)"', block, re.IGNORECASE)
            if not img_match:
                continue

            name = None
            for candidate in re.findall(
                r"<(?:strong|b)>(.*?)</(?:strong|b)>",
                block,
                re.IGNORECASE | re.DOTALL,
            ):
                cleaned = clean_name(candidate)
                if is_company_name(cleaned):
                    name = cleaned
                    break

            if not name:
                continue

            key = normalize_key(name)
            if key in seen:
                continue
            seen.add(key)
            members.append(
                {
                    "name": name,
                    "logoUrl": img_match.group(1),
                }
            )

    members.sort(key=lambda member: member["name"].upper())
    return members


def main() -> None:
    LOGO_DIR.mkdir(parents=True, exist_ok=True)
    scraped = scrape_category_members()

    members = []
    downloaded = 0
    for item in scraped:
        member_id = slugify(item["name"])
        ext = extension_from_url(item["logoUrl"])
        logo_path = LOGO_DIR / f"{member_id}{ext}"
        logo_ref = None
        if download_logo(item["logoUrl"], logo_path):
            logo_ref = f"images/members/logos/{logo_path.name}"
            if not logo_path.exists() or logo_path.stat().st_size == 0:
                logo_ref = None
            else:
                downloaded += 1

        members.append(
            {
                "id": member_id,
                "name": item["name"],
                "letter": item["name"][0].upper(),
                "logo": logo_ref,
            }
        )

    lines = ["window.saaaMembers = ["]
    for member in members:
        logo = json.dumps(member["logo"]) if member["logo"] else "null"
        lines.append(
            "    { id: "
            + json.dumps(member["id"])
            + ", name: "
            + json.dumps(member["name"])
            + ", letter: "
            + json.dumps(member["letter"])
            + ", logo: "
            + logo
            + " },"
        )
    lines.append("];")
    lines.append("")

    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(members)} members from SAAA Members' Category to {OUTPUT}")
    print(f"Downloaded logos: {downloaded}")


if __name__ == "__main__":
    main()
