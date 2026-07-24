(function () {
    const grid = document.getElementById('articles-grid');
    const paginationEl = document.getElementById('articles-pagination');
    const resultsCount = document.getElementById('articles-count');
    const type = document.body.dataset.articleType;
    const searchInput = document.getElementById('article-search');
    const dateFromInput = document.getElementById('article-date-from');
    const dateToInput = document.getElementById('article-date-to');
    const sidebar = document.getElementById('article-filters');

    if (!grid || !type || !window.saaaContent || !window.saaaListing) return;

    const items = type === 'featured' ? saaaContent.featuredNews : saaaContent.announcements;
    const perPage = window.saaaListing.itemsPerPage;

    let searchQuery = '';
    let dateFrom = '';
    let dateTo = '';
    let categoryFilter = 'all';
    let currentPage = 1;

    function bindInputs() {
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                searchQuery = searchInput.value.trim().toLowerCase();
                currentPage = 1;
                render();
            });
        }

        [dateFromInput, dateToInput].forEach(function (input) {
            if (!input) return;
            input.addEventListener('change', function () {
                dateFrom = dateFromInput ? dateFromInput.value : '';
                dateTo = dateToInput ? dateToInput.value : '';
                currentPage = 1;
                render();
            });
        });

        window.saaaListing.bindSidebarFilters(sidebar, function (value) {
            categoryFilter = value;
            currentPage = 1;
            render();
        });
    }

    function getFilteredItems() {
        return items.filter(function (item) {
            if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
            if (!window.saaaListing.matchesSearch(item, searchQuery, ['title', 'excerpt', 'date'])) return false;
            if (!window.saaaListing.matchesDateRange(item.sortDate, dateFrom, dateTo)) return false;
            return true;
        });
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

    function render() {
        const filtered = getFilteredItems();
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
            render();
        });
    }

    bindInputs();
    render();
})();
