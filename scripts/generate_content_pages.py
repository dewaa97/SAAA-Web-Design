#!/usr/bin/env python3
"""Generate content listing and detail pages."""

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent))
from page_shell import render_page, ROOT

PAGES = [
    {
        'file': 'members-listing.html',
        'title': 'SAAA Members Listing — SAAA',
        'badge': 'Members Directory',
        'hero_title': 'SAAA Members',
        'hero_accent': 'Listing',
        'hero_desc': 'Browse SAAA member companies featured in the official Members\' Category directory. Search by name or filter alphabetically.',
        'body': '''<section class="section">
<div class="container">
<div class="listing-toolbar">
<div class="search-wrap">
<label for="member-search">Search members</label>
<input type="search" id="member-search" placeholder="Search by company name..." autocomplete="off">
</div>
</div>
<div class="alpha-filter" id="alpha-filter"></div>
<p class="members-count" id="members-count" aria-live="polite"></p>
<div class="members-grid" id="members-grid"></div>
</div>
</section>''',
        'scripts': '<script src="js/members-data.js"></script>\n<script src="js/content-data.js"></script>\n<script src="js/members-listing.js"></script>',
    },
    {
        'file': 'members-login.html',
        'title': 'Members Portal Log In — SAAA',
        'badge': 'Members Portal',
        'hero_title': 'Members Portal',
        'hero_accent': 'Log In',
        'hero_desc': 'Access the SAAA members portal with your company credentials. Select your company, then sign in with your registered email and password.',
        'body': '''<section class="section">
<div class="container">
<div class="login-wrap">
<div class="login-card">
<form id="login-form" class="login-form">
<div class="form-group">
<label for="company-name">Company Name</label>
<input type="text" id="company-name" name="company" list="company-list" placeholder="Type or select your company" required autocomplete="organization">
<datalist id="company-list"></datalist>
</div>
<div class="form-group">
<label for="login-email">Email Address</label>
<input type="email" id="login-email" name="email" placeholder="you@company.com" required autocomplete="username">
</div>
<div class="form-group">
<label for="login-password">Password</label>
<input type="password" id="login-password" name="password" placeholder="Enter your password" required autocomplete="current-password">
</div>
<button type="submit" class="btn btn-primary" style="width:100%;">Log In</button>
<div class="form-footer" style="justify-content:center;margin-top:16px;">
<a href="mailto:saaasin@saaa.org.sg">Forgot password?</a>
</div>
</form>
</div>
</div>
</div>
</section>''',
        'scripts': '<script src="js/members-data.js"></script>\n<script src="js/content-data.js"></script>\n<script src="js/members-login.js"></script>',
    },
    {
        'file': 'events.html',
        'title': 'Calendar of Events — SAAA',
        'badge': 'Events & Networking',
        'hero_title': 'Calendar of',
        'hero_accent': 'Events',
        'hero_desc': 'Stay up to date with SAAA networking sessions, workshops, AGMs, and industry gatherings. Browse upcoming events and revisit past highlights.',
        'body': '''<section class="section">
<div class="container">
<div class="listing-toolbar">
<div class="search-wrap">
<label for="event-search">Search events</label>
<input type="search" id="event-search" placeholder="Search by title or keyword..." autocomplete="off">
</div>
</div>
<div class="section-header">
<div class="section-tag">Upcoming</div>
<h2 class="section-title">Upcoming <span class="accent">Events</span></h2>
<p class="section-desc">Register for upcoming SAAA events and networking opportunities.</p>
</div>
<div class="articles-grid" id="upcoming-events"></div>
</div>
</section>
<section class="section" id="past-events-section" style="background:var(--slate-50);border-top:1px solid var(--slate-200);">
<div class="container">
<div class="section-header">
<div class="section-tag">Archive</div>
<h2 class="section-title">Past <span class="accent">Events</span></h2>
<p class="section-desc">Highlights from previous SAAA events and industry forums.</p>
</div>
<div class="articles-grid" id="past-events"></div>
</div>
</section>''',
        'scripts': '<script src="js/content-data.js"></script>\n<script src="js/events-page.js"></script>',
    },
    {
        'file': 'event-detail.html',
        'title': 'Event Details — SAAA',
        'badge': 'Event Details',
        'hero_title': 'Event',
        'hero_accent': 'Details',
        'hero_desc': 'Full information about this SAAA event including date, venue, and registration details.',
        'body': '''<section class="section">
<div class="container page-content">
<a href="events.html" class="btn btn-secondary" style="margin-bottom:24px;">← Back to Events</a>
<div id="event-detail"></div>
</div>
</section>''',
        'scripts': '<script src="js/content-data.js"></script>\n<script src="js/event-detail.js"></script>',
    },
    {
        'file': 'featured-news.html',
        'title': 'Featured News — SAAA',
        'badge': 'Publications',
        'hero_title': 'Featured',
        'hero_accent': 'News',
        'hero_desc': 'Industry updates, regulatory changes, and association news curated for SAAA members and the wider air cargo community.',
        'body': '''<section class="section">
<div class="container">
<div class="listing-toolbar">
<div class="search-wrap">
<label for="article-search">Search news</label>
<input type="search" id="article-search" placeholder="Search featured news..." autocomplete="off">
</div>
</div>
<div class="articles-grid" id="articles-grid"></div>
</div>
</section>''',
        'scripts': '<script src="js/content-data.js"></script>\n<script src="js/articles-page.js"></script>',
        'body_attr': 'data-article-type="featured"',
    },
    {
        'file': 'announcements.html',
        'title': 'Announcements — SAAA',
        'badge': 'Publications',
        'hero_title': 'Latest',
        'hero_accent': 'Announcements',
        'hero_desc': 'Official announcements from SAAA including event registrations, editorial opportunities, and association updates.',
        'body': '''<section class="section">
<div class="container">
<div class="listing-toolbar">
<div class="search-wrap">
<label for="article-search">Search announcements</label>
<input type="search" id="article-search" placeholder="Search announcements..." autocomplete="off">
</div>
</div>
<div class="articles-grid" id="articles-grid"></div>
</div>
</section>''',
        'scripts': '<script src="js/content-data.js"></script>\n<script src="js/articles-page.js"></script>',
        'body_attr': 'data-article-type="announcements"',
    },
    {
        'file': 'article-detail.html',
        'title': 'Article — SAAA',
        'badge': 'Publications',
        'hero_title': 'Article',
        'hero_accent': 'Details',
        'hero_desc': 'Read the full article with complete details and related information.',
        'body': '''<section class="section">
<div class="container page-content">
<div id="article-detail"></div>
</div>
</section>''',
        'scripts': '<script src="js/content-data.js"></script>\n<script src="js/article-detail.js"></script>',
    },
]


def main():
    for page in PAGES:
        html = render_page(
            page['title'],
            page['badge'],
            page['hero_title'],
            page['hero_accent'],
            page['hero_desc'],
            page['body'],
            page['scripts'],
        )
        if page.get('body_attr'):
            html = html.replace('<body>', '<body ' + page['body_attr'] + '>', 1)
        out = ROOT / page['file']
        out.write_text(html)
        print('Wrote', out.name)


if __name__ == '__main__':
    main()
