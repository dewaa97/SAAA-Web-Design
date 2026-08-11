(function () {
    const upcomingEl = document.getElementById('upcoming-events');
    const pastEl = document.getElementById('past-events-grid');
    const upcomingPagination = document.getElementById('upcoming-pagination');
    const pastPagination = document.getElementById('past-pagination');
    const upcomingCount = document.getElementById('upcoming-count');
    const pastCount = document.getElementById('past-count');
    const searchInput = document.getElementById('event-search');
    const dateFromInput = document.getElementById('event-date-from');
    const dateToInput = document.getElementById('event-date-to');
    const sidebar = document.getElementById('event-filters');

    if (!upcomingEl || !pastEl || !window.saaaContent || !window.saaaListing) return;

    const perPage = 9;
    let searchQuery = '';
    let dateFrom = '';
    let dateTo = '';
    let categoryFilter = 'all';
    let upcomingPage = 1;
    let pastPage = 1;
    let dateFromPicker = null;
    let dateToPicker = null;

    function resetPages() {
        upcomingPage = 1;
        pastPage = 1;
    }

    function mountDatePickers() {
        if (!window.SaaaImddFormWidgets) return;

        if (dateFromInput) {
            dateFromPicker = window.SaaaImddFormWidgets.mountDatePickerFromInput(dateFromInput, {
                placeholder: 'From date',
                onChange: function () {
                    dateFrom = dateFromPicker ? dateFromPicker.getValue() : '';
                    resetPages();
                    render();
                }
            });
        }

        if (dateToInput) {
            dateToPicker = window.SaaaImddFormWidgets.mountDatePickerFromInput(dateToInput, {
                placeholder: 'To date',
                onChange: function () {
                    dateTo = dateToPicker ? dateToPicker.getValue() : '';
                    resetPages();
                    render();
                }
            });
        }
    }

    function bindInputs() {
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                searchQuery = searchInput.value.trim().toLowerCase();
                resetPages();
                render();
            });
        }

        if (window.SaaaImddFormWidgets) {
            mountDatePickers();
        } else {
            [dateFromInput, dateToInput].forEach(function (input) {
                if (!input) return;
                input.addEventListener('change', function () {
                    dateFrom = dateFromInput ? dateFromInput.value : '';
                    dateTo = dateToInput ? dateToInput.value : '';
                    resetPages();
                    render();
                });
            });
        }

        window.saaaListing.bindSidebarFilters(sidebar, function (value) {
            categoryFilter = value;
            upcomingPage = 1;
            pastPage = 1;
            render();
        });
    }

    function filterEvents(status) {
        return saaaContent.events.filter(function (event) {
            if (event.status !== status) return false;
            if (categoryFilter !== 'all' && event.category !== categoryFilter) return false;
            if (!window.saaaListing.matchesSearch(event, searchQuery, ['title', 'excerpt', 'venue'])) return false;
            if (!window.saaaListing.matchesDateRange(event.date, dateFrom, dateTo)) return false;
            return true;
        });
    }

    function cardHtml(event) {
        return '<a href="event-detail.html?id=' + event.id + '" class="article-card">' +
            '<img src="' + event.image + '" alt="' + event.title + '">' +
            '<div class="article-card-body">' +
            '<div class="article-date">' + event.displayDate + '</div>' +
            '<h3>' + event.title + '</h3>' +
            '<p>' + event.excerpt + '</p>' +
            '<div class="article-meta"><span>' + event.time + '</span><span>' + event.venue + '</span></div>' +
            '<span class="read-link">View details →</span>' +
            '</div></a>';
    }

    function renderSection(container, paginationEl, countEl, items, page, setPage) {
        const paged = window.saaaListing.paginate(items, page, perPage);
        setPage(paged.page);

        if (countEl) {
            countEl.textContent = items.length + ' event' + (items.length === 1 ? '' : 's') + ' found';
        }

        container.innerHTML = paged.items.length
            ? paged.items.map(cardHtml).join('')
            : '<div class="empty-state">No events found.</div>';

        window.saaaListing.renderPagination(paginationEl, paged.page, paged.totalPages, function (nextPage) {
            setPage(nextPage);
            render();
        });
    }

    function render() {
        const upcoming = filterEvents('upcoming');
        const past = filterEvents('past');

        renderSection(upcomingEl, upcomingPagination, upcomingCount, upcoming, upcomingPage, function (page) {
            upcomingPage = page;
        });

        renderSection(pastEl, pastPagination, pastCount, past, pastPage, function (page) {
            pastPage = page;
        });
    }

    function scrollToPastEvents() {
        const section = document.getElementById('past-events');
        if (!section) return;
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    bindInputs();
    render();

    if (window.location.hash === '#past-events') {
        window.requestAnimationFrame(function () {
            scrollToPastEvents();
        });
    }

    window.addEventListener('hashchange', function () {
        if (window.location.hash === '#past-events') {
            scrollToPastEvents();
        }
    });
})();
