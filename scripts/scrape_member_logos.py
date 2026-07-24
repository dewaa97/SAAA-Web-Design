#!/usr/bin/env python3
"""Scrape individual member logos from the official SAAA site and update members-data.js."""

from __future__ import annotations

import json
import re
import subprocess
import urllib.parse
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOGO_DIR = ROOT / "images" / "members" / "logos"
MEMBERS_DATA = ROOT / "js" / "members-data.js"
CACHE_DIR = ROOT / ".cache" / "member-pages"
GENERATE_SCRIPT = ROOT / "scripts" / "generate_members_data.py"

PAGES = {
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

ENTRY_PATTERN = re.compile(
    r'<td style="width: 30%; text-align: center;">.*?<img[^>]+src="([^"]+)"[^>]*>.*?</td>\s*<td>.*?<(?:strong|b)>(.*?)</(?:strong|b)>',
    re.IGNORECASE | re.DOTALL,
)


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


def clean_name(name: str) -> str:
    name = unescape(re.sub(r"<[^>]+>", "", name))
    name = re.sub(r"\s+", " ", name).strip()
    return name


def normalize_key(name: str) -> str:
    name = unescape(name).upper()
    name = name.replace("&", " AND ")
    name = re.sub(r"\([^)]*\)", "", name)
    name = re.sub(r"[^A-Z0-9]+", "", name)
    return name


def find_scraped_match(member_name: str, scraped_by_key: dict):
    candidates = [normalize_key(member_name)]
    upper = member_name.upper()
    candidates.append(normalize_key(re.sub(r"\s*\([^)]*\)", "", upper)))

    for key in candidates:
        if key in scraped_by_key:
            return scraped_by_key[key]
    return None


def slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower())
    return slug.strip("-")


def extension_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path.lower()
    for ext in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
        if path.endswith(ext):
            return ext
    return ".jpg"


def download_logo(url: str, destination: Path) -> bool:
    if destination.exists() and destination.stat().st_size > 0:
        return True
    for attempt in range(3):
        result = subprocess.run(
            ["curl", "-sL", "--retry", "2", "--retry-delay", "2", "--max-time", "180", "-o", str(destination), url],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0 and destination.exists() and destination.stat().st_size > 0:
            return True
    if destination.exists():
        destination.unlink(missing_ok=True)
    return False


def scrape_members() -> list[dict]:
    scraped: list[dict] = []
    seen = set()
    block_pattern = re.compile(r'<table id="table_dimension"[^>]*>(.*?)</table>', re.IGNORECASE | re.DOTALL)
    for slug, page in PAGES.items():
        html = fetch_page(slug, page)
        for block in block_pattern.findall(html):
            img_match = re.search(r'<img[^>]+src="([^"]+)"', block, re.IGNORECASE)
            if not img_match:
                continue
            logo_url = img_match.group(1)
            name = None
            for candidate in re.findall(r"<(?:strong|b)>(.*?)</(?:strong|b)>", block, re.IGNORECASE | re.DOTALL):
                cleaned = clean_name(candidate)
                if not cleaned:
                    continue
                lowered = cleaned.lower()
                if lowered.startswith("key words"):
                    continue
                if len(cleaned) > 90:
                    continue
                if cleaned.endswith("..."):
                    continue
                name = cleaned
                break
            if not name:
                continue
            key = normalize_key(name)
            if key in seen:
                continue
            seen.add(key)
            scraped.append({"name": name, "logoUrl": logo_url, "key": key})
    return scraped


def load_members_data() -> list[dict]:
    result = subprocess.run(
        [
            "node",
            "-e",
            "global.window={}; require('./js/members-data.js'); process.stdout.write(JSON.stringify(global.window.saaaMembers));",
        ],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
    )
    return json.loads(result.stdout)


def write_members_data(members: list[dict]) -> None:
    lines = ["window.saaaMembers = ["]
    for member in members:
        logo = json.dumps(member.get("logo")) if member.get("logo") else "null"
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
    MEMBERS_DATA.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    LOGO_DIR.mkdir(parents=True, exist_ok=True)
    scraped = scrape_members()
    members = load_members_data()
    scraped_by_key = {item["key"]: item for item in scraped}

    matched = 0
    downloaded = 0
    for member in members:
        scraped_item = find_scraped_match(member["name"], scraped_by_key)
        if not scraped_item:
            member["logo"] = None
            continue

        ext = extension_from_url(scraped_item["logoUrl"])
        filename = f"{member['id']}{ext}"
        destination = LOGO_DIR / filename
        if not destination.exists():
            if not download_logo(scraped_item["logoUrl"], destination):
                member["logo"] = None
                continue
            downloaded += 1
        member["logo"] = f"images/members/logos/{filename}"
        matched += 1

    write_members_data(members)
    print(f"Scraped entries: {len(scraped)}")
    print(f"Members in data: {len(members)}")
    print(f"Matched logos: {matched}")
    print(f"Downloaded logos: {downloaded}")
    print(f"Missing logos: {len(members) - matched}")


if __name__ == "__main__":
    main()
