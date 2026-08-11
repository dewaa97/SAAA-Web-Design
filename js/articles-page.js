(function () {
    const type = document.body.dataset.articleType;
    const searchInput = document.getElementById('article-search');
    const dateFromInput = document.getElementById('article-date-from');
    const dateToInput = document.getElementById('article-date-to');
    const sidebar = document.getElementById('article-filters');

    if (!type || !window.saaaContent || !window.saaaListing) return;

    const items = type === 'featured' ? saaaContent.featuredNews : saaaContent.announcements;
    const perPage = window.saaaListing.itemsPerPage;

    let searchQuery = '';
    let dateFrom = '';
    let dateTo = '';
    let categoryFilter = 'all';
    let currentPage = 1;
    let upcomingPage = 1;
    let pastPage = 1;
    let dateFromPicker = null;
    let dateToPicker = null;

    const isAnnouncementsSplit = type === 'announcements' && document.getElementById('upcoming-announcements');

    function mountDatePickers(onChange) {
        if (!window.SaaaImddFormWidgets) return;

        if (dateFromInput) {
            dateFromPicker = window.SaaaImddFormWidgets.mountDatePickerFromInput(dateFromInput, {
                placeholder: 'From date',
                onChange: function () {
                    dateFrom = dateFromPicker ? dateFromPicker.getValue() : '';
                    onChange();
                }
            });
        }

        if (dateToInput) {
            dateToPicker = window.SaaaImddFormWidgets.mountDatePickerFromInput(dateToInput, {
                placeholder: 'To date',
                onChange: function () {
                    dateTo = dateToPicker ? dateToPicker.getValue() : '';
                    onChange();
                }
            });
        }
    }

    function bindInputs(onChange) {
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                searchQuery = searchInput.value.trim().toLowerCase();
                onChange();
            });
        }

        if (window.SaaaImddFormWidgets) {
            mountDatePickers(onChange);
        } else {
            [dateFromInput, dateToInput].forEach(function (input) {
                if (!input) return;
                input.addEventListener('change', function () {
                    dateFrom = dateFromInput ? dateFromInput.value : '';
                    dateTo = dateToInput ? dateToInput.value : '';
                    onChange();
                });
            });
        }

        window.saaaListing.bindSidebarFilters(sidebar, function (value) {
            categoryFilter = value;
            onChange();
        });
    }

    function matchesFilters(item) {
        if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
        if (!window.saaaListing.matchesSearch(item, searchQuery, ['title', 'excerpt', 'date'])) return false;
        if (!window.saaaListing.matchesDateRange(item.sortDate, dateFrom, dateTo)) return false;
        return true;
    }

    function cardHtml(item) {
        const href = item.link || ('article-detail.html?type=' + type + '&id=' + item.id);
        return '<a href="' + href + '" class="article-card">' +
            '<img src="' + item.image + '" alt="' + item.title + '">' +
            '<div class="article-card-body">' +
            '<div class="article-date">' + item.date + '</div>' +
            '<h3>' + item.title + '</h3>' +
            '<p>' + item.excerpt + '</p>' +
            '<span class="read-link">Read more →</span>' +
            '</div></a>';
    }

    function renderSingleListing() {
        const grid = document.getElementById('articles-grid');
        const paginationEl = document.getElementById('articles-pagination');
        const resultsCount = document.getElementById('articles-count');
        if (!grid) return;

        const filtered = items.filter(matchesFilters);
        const paged = window.saaaListing.paginate(filtered, currentPage, perPage);
        currentPage = paged.page;

        if (resultsCount) {
            resultsCount.textContent = filtered.length + ' article' + (filtered.length === 1 ? '' : 's') + ' found';
        }

        grid.innerHTML = paged.items.length
            ? paged.items.map(cardHtml).join('')
            : '<div class="empty-state">No articles found.</div>';

        window.saaaListing.renderPagination(paginationEl, paged.page, paged.totalPages, function (page) {
            currentPage = page;
            renderSingleListing();
        });
    }

    function renderSection(container, paginationEl, countEl, sectionItems, page, setPage) {
        const paged = window.saaaListing.paginate(sectionItems, page, perPage);
        setPage(paged.page);

        if (countEl) {
            countEl.textContent = sectionItems.length + ' announcement' + (sectionItems.length === 1 ? '' : 's') + ' found';
        }

        container.innerHTML = paged.items.length
            ? paged.items.map(cardHtml).join('')
            : '<div class="empty-state">No announcements found.</div>';

        window.saaaListing.renderPagination(paginationEl, paged.page, paged.totalPages, function (nextPage) {
            setPage(nextPage);
            renderAnnouncementsSplit();
        });
    }

    function renderAnnouncementsSplit() {
        const upcomingEl = document.getElementById('upcoming-announcements');
        const pastEl = document.getElementById('past-announcements');
        const upcomingPagination = document.getElementById('upcoming-announcements-pagination');
        const pastPagination = document.getElementById('past-announcements-pagination');
        const upcomingCount = document.getElementById('upcoming-announcements-count');
        const pastCount = document.getElementById('past-announcements-count');
        if (!upcomingEl || !pastEl) return;

        const upcoming = items.filter(function (item) {
            return item.status === 'upcoming' && matchesFilters(item);
        });
        const past = items.filter(function (item) {
            return item.status === 'past' && matchesFilters(item);
        });

        renderSection(upcomingEl, upcomingPagination, upcomingCount, upcoming, upcomingPage, function (page) {
            upcomingPage = page;
        });

        renderSection(pastEl, pastPagination, pastCount, past, pastPage, function (page) {
            pastPage = page;
        });
    }

    function resetPages() {
        currentPage = 1;
        upcomingPage = 1;
        pastPage = 1;
    }

    if (isAnnouncementsSplit) {
        bindInputs(function () {
            resetPages();
            renderAnnouncementsSplit();
        });
        renderAnnouncementsSplit();

        if (window.location.hash === '#past-announcements') {
            window.requestAnimationFrame(function () {
                const section = document.getElementById('past-announcements-section');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        window.addEventListener('hashchange', function () {
            if (window.location.hash === '#past-announcements') {
                const section = document.getElementById('past-announcements-section');
                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    } else {
        bindInputs(function () {
            resetPages();
            renderSingleListing();
        });
        renderSingleListing();
    }
})();
