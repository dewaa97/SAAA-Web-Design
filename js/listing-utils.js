window.saaaListing = {
    itemsPerPage: 6,

    matchesSearch: function (item, query, fields) {
        if (!query) return true;
        const q = query.toLowerCase();
        return fields.some(function (field) {
            const value = item[field];
            return value && String(value).toLowerCase().includes(q);
        });
    },

    matchesDateRange: function (isoDate, fromValue, toValue) {
        if (!isoDate) return true;
        const date = new Date(isoDate + 'T00:00:00');
        if (fromValue) {
            const from = new Date(fromValue + 'T00:00:00');
            if (date < from) return false;
        }
        if (toValue) {
            const to = new Date(toValue + 'T23:59:59');
            if (date > to) return false;
        }
        return true;
    },

    paginate: function (items, page, perPage) {
        const totalPages = Math.max(1, Math.ceil(items.length / perPage));
        const safePage = Math.min(Math.max(page, 1), totalPages);
        const start = (safePage - 1) * perPage;
        return {
            items: items.slice(start, start + perPage),
            page: safePage,
            totalPages: totalPages,
            totalItems: items.length
        };
    },

    renderPagination: function (container, page, totalPages, onChange) {
        if (!container) return;
        container.innerHTML = '';

        if (totalPages <= 1) return;

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'listing-pagination-arrow';
        prevBtn.innerHTML = '&larr;';
        prevBtn.disabled = page === 1;
        prevBtn.setAttribute('aria-label', 'Previous page');
        prevBtn.addEventListener('click', function () { onChange(page - 1); });
        container.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = String(i);
            btn.className = i === page ? 'active' : '';
            btn.setAttribute('aria-label', 'Page ' + i);
            btn.addEventListener('click', function () { onChange(i); });
            container.appendChild(btn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'listing-pagination-arrow';
        nextBtn.innerHTML = '&rarr;';
        nextBtn.disabled = page === totalPages;
        nextBtn.setAttribute('aria-label', 'Next page');
        nextBtn.addEventListener('click', function () { onChange(page + 1); });
        container.appendChild(nextBtn);
    },

    bindSidebarFilters: function (root, onChange) {
        if (!root) return;
        root.querySelectorAll('[data-filter-value]').forEach(function (button) {
            button.addEventListener('click', function () {
                root.querySelectorAll('[data-filter-value]').forEach(function (btn) {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
                onChange(button.getAttribute('data-filter-value'));
            });
        });
    }
};
