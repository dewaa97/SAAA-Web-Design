#!/usr/bin/env python3
"""Migrate subpages from inline styles to css/subpage.css."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

SKIP = {
    'index.html',
    'members-listing.html',
    'members-login.html',
    'events.html',
    'event-detail.html',
    'featured-news.html',
    'announcements.html',
    'article-detail.html',
}

STYLE_LINK = '''    <link rel="stylesheet" href="css/nav-dropdown.css">
    <link rel="stylesheet" href="css/subpage.css">'''

INLINE_STYLE_PATTERN = re.compile(
    r'<link rel="stylesheet" href="css/nav-dropdown\.css">\s*<style>.*?</style>',
    re.DOTALL,
)


def migrate(path: Path) -> bool:
    html = path.read_text()
    if 'css/subpage.css' in html:
        return False
    if '<style>' not in html:
        return False
    new_html = INLINE_STYLE_PATTERN.sub(STYLE_LINK, html, count=1)
    if new_html == html:
        # try without nav-dropdown before style
        new_html = re.sub(r'<style>.*?</style>', STYLE_LINK, html, count=1, flags=re.DOTALL)
    if new_html != html:
        path.write_text(new_html)
        return True
    return False


def main():
    for path in sorted(ROOT.glob('*.html')):
        if path.name in SKIP:
            continue
        if migrate(path):
            print('Migrated', path.name)


if __name__ == '__main__':
    main()
