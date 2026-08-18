(function () {
    const courses = window.saaaTrainingCourses || [];
    const tabsConfig = window.saaaTrainingTabs || [];
    const root = document.querySelector('[data-training-root]');
    if (!root || !courses.length) return;

    const list = root.querySelector('[data-training-list]');
    const pagination = root.querySelector('[data-training-pagination]');
    const tabsContainer = root.querySelector('.training-tabs');
    const itemsPerPage = parseInt(root.getAttribute('data-items-per-page'), 10) || 6;

    let currentTab = 'all';
    let currentPage = 1;
    let tabs = [];

    function formatDuration(course) {
        if (course.dayCountLabel) return course.dayCountLabel;
        return course.dayCount === 1 ? '1 Day' : course.dayCount + ' Days';
    }

    function formatTimeValue(timeValue) {
        const parts = timeValue.split(':');
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1] || '00';
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        if (hours === 0) hours = 12;
        return hours + ':' + minutes + ' ' + period;
    }

    function formatSessionDate(dateValue) {
        const date = new Date(dateValue + 'T00:00:00');
        return date.toLocaleDateString('en-SG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    function formatLocation(course) {
        if (course.deliveryMode === 'virtual') return 'Virtual';
        return course.classroomAddress;
    }

    function formatSessionScheduleLine(course, label) {
        if (label) {
            return label;
        }

        const sessions = course.sessions || [];
        if (!sessions.length) return '';

        if (sessions.length === 1) {
            return formatSessionDate(sessions[0].date);
        }

        const first = formatSessionDate(sessions[0].date);
        const last = formatSessionDate(sessions[sessions.length - 1].date);
        const firstParts = first.split(' ');
        const lastParts = last.split(' ');
        const range = firstParts.length >= 3 && lastParts.length >= 3
            ? firstParts[0] + ' - ' + lastParts[0] + ' ' + lastParts[1] + ' ' + lastParts[2]
            : first + ' - ' + last;

        return range;
    }

    function getScheduleLines(course) {
        if (course.scheduleOptions && course.scheduleOptions.length) {
            return course.scheduleOptions.map(function (label) {
                return formatSessionScheduleLine(course, label);
            });
        }

        const line = formatSessionScheduleLine(course);
        return line ? [line] : [];
    }

    function renderSchedule(course, rowId) {
        const lines = getScheduleLines(course);
        if (!lines.length) return '';

        let panelHtml = '<div class="training-schedule-label">Training Schedule</div>';
        lines.forEach(function (line) {
            panelHtml += '<div class="training-schedule-item">' + line + '</div>';
        });

        return '<div class="training-schedule">' +
            '<button type="button" class="training-schedule-toggle" data-schedule-toggle="' + rowId + '" aria-expanded="false" aria-controls="schedule-panel-' + rowId + '">' +
            'Click here for training schedule</button>' +
            '<div class="training-schedule-panel" id="schedule-panel-' + rowId + '" hidden>' +
            panelHtml +
            '</div></div>';
    }

    function getCategoryCount(tabName) {
        if (tabName === 'all') return courses.length;
        return courses.filter(function (course) { return course.category === tabName; }).length;
    }

    function getVisibleTabs() {
        return tabsConfig.filter(function (tab) {
            if (tab.id === 'others') return getCategoryCount('others') > 0;
            return true;
        });
    }

    function buildTabs() {
        if (!tabsContainer) return;

        const visibleTabs = getVisibleTabs();
        tabsContainer.innerHTML = visibleTabs.map(function (tab, index) {
            const count = getCategoryCount(tab.id);
            const activeClass = index === 0 ? ' active' : '';
            return '<button class="training-tab' + activeClass + '" type="button" data-training-tab="' + tab.id + '">' +
                tab.label + '<span class="training-count">' + count + '</span></button>';
        }).join('');

        tabs = tabsContainer.querySelectorAll('[data-training-tab]');
        currentTab = visibleTabs[0] ? visibleTabs[0].id : 'all';

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (item) { item.classList.remove('active'); });
                tab.classList.add('active');
                currentTab = tab.getAttribute('data-training-tab');
                currentPage = 1;
                render();
            });
        });
    }

    function getFilteredRows() {
        if (currentTab === 'all') return courses.slice();
        return courses.filter(function (course) { return course.category === currentTab; });
    }

    function titleHtml(course) {
        const badge = course.isOpeningSoon
            ? '<span class="training-opening-soon-badge">Opening Soon</span>'
            : '';

        if (course.isOpeningSoon && !course.infoPageSlug) {
            return '<a href="training-opening-soon.html?slug=' + encodeURIComponent(course.slug) + '" class="training-title-link">' +
                course.title + '</a>' + badge;
        }

        if (course.infoPageSlug) {
            return '<a href="training-course.html?slug=' + encodeURIComponent(course.slug) + '" class="training-title-link">' +
                course.title + '</a>' + badge;
        }

        return course.title + badge;
    }

    function actionHtml(course) {
        if (course.isOpeningSoon) {
            return '<span class="btn-small primary training-book-disabled" aria-disabled="true">Book Now</span>';
        }

        if (course.bookNowUrl) {
            return '<a href="' + course.bookNowUrl + '" class="btn-small primary">Book Now</a>';
        }

        return '';
    }

    function rowHtml(course, index) {
        const number = String(index + 1).padStart(2, '0');
        const rowId = course.id + '-' + index;
        const vacanciesHtml = typeof course.vacanciesLeft === 'number'
            ? '<span>' + course.vacanciesLeft + ' vacancies left</span>'
            : '';

        return '<div class="training-row" data-category="' + course.category + '">' +
            '<div class="number">' + number + '</div>' +
            '<div class="content">' +
            '<div class="title">' + titleHtml(course) + '</div>' +
            '<div class="function">' + course.functionName + '</div>' +
            '<div class="meta">' +
            '<span>' + formatDuration(course) + '</span>' +
            vacanciesHtml +
            '<span class="training-meta-location">' + formatLocation(course) + '</span>' +
            '</div>' +
            renderSchedule(course, rowId) +
            '</div>' +
            '<div class="action">' + actionHtml(course) + '</div></div>';
    }

    function bindScheduleToggles() {
        list.querySelectorAll('[data-schedule-toggle]').forEach(function (button) {
            button.addEventListener('click', function () {
                const rowId = button.getAttribute('data-schedule-toggle');
                const panel = document.getElementById('schedule-panel-' + rowId);
                if (!panel) return;

                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                panel.hidden = isExpanded;
                button.setAttribute('aria-expanded', String(!isExpanded));
                button.textContent = isExpanded
                    ? 'Click here for training schedule'
                    : 'Hide training schedule';
            });
        });
    }

    function render() {
        const filtered = getFilteredRows();
        const paged = window.saaaListing.paginate(filtered, currentPage, itemsPerPage);
        currentPage = paged.page;

        if (!filtered.length) {
            list.innerHTML = '<div class="training-empty">No courses available in this category yet.</div>';
            pagination.innerHTML = '';
            return;
        }

        const globalStart = (paged.page - 1) * itemsPerPage;
        list.innerHTML = paged.items.map(function (course, index) {
            return rowHtml(course, globalStart + index);
        }).join('');

        bindScheduleToggles();

        window.saaaListing.renderPagination(pagination, paged.page, paged.totalPages, function (page) {
            currentPage = page;
            render();
        });
    }

    buildTabs();
    render();
})();
