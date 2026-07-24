(function () {
    const courses = window.saaaTrainingCourses || [];
    const root = document.querySelector('[data-training-root]');
    if (!root || !courses.length) return;

    const list = root.querySelector('[data-training-list]');
    const pagination = root.querySelector('[data-training-pagination]');
    const tabs = root.querySelectorAll('[data-training-tab]');
    const itemsPerPage = parseInt(root.getAttribute('data-items-per-page'), 10) || 6;

    let currentTab = 'all';
    let currentPage = 1;

    function formatDuration(dayCount) {
        return dayCount === 1 ? '1 Day' : dayCount + ' Days';
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

    function sessionLine(session, dayNumber, totalDays) {
        const prefix = totalDays > 1 ? 'Day ' + dayNumber + ': ' : '';
        return '<div class="training-schedule-item">' +
            prefix + formatSessionDate(session.date) + ' · ' +
            formatTimeValue(session.startTime) + ' – ' + formatTimeValue(session.endTime) +
            '</div>';
    }

    function renderSchedule(course, rowId) {
        const sessions = course.sessions || [];
        if (!sessions.length) return '';

        let panelHtml = '<div class="training-schedule-label">Training Schedule</div>';
        sessions.forEach(function (session, index) {
            panelHtml += sessionLine(session, index + 1, sessions.length);
        });

        return '<div class="training-schedule">' +
            '<button type="button" class="training-schedule-toggle" data-schedule-toggle="' + rowId + '" aria-expanded="false" aria-controls="schedule-panel-' + rowId + '">' +
            'Click here for training schedule</button>' +
            '<div class="training-schedule-panel" id="schedule-panel-' + rowId + '" hidden>' +
            panelHtml +
            '</div></div>';
    }

    function getFilteredRows() {
        if (currentTab === 'all') return courses.slice();
        return courses.filter(function (course) { return course.category === currentTab; });
    }

    function rowHtml(course, index) {
        const number = String(index + 1).padStart(2, '0');
        const rowId = course.id + '-' + index;

        return '<div class="training-row" data-category="' + course.category + '">' +
            '<div class="number">' + number + '</div>' +
            '<div class="content">' +
            '<div class="title">' + course.title + '</div>' +
            '<div class="function">' + course.functionName + '</div>' +
            '<div class="meta">' +
            '<span>' + formatDuration(course.dayCount) + '</span>' +
            '<span>' + course.vacanciesLeft + ' vacancies left</span>' +
            '<span class="training-meta-location">' + formatLocation(course) + '</span>' +
            '</div>' +
            renderSchedule(course, rowId) +
            '</div>' +
            '<div class="action">' +
            '<a href="#" class="btn-small primary">Book Now</a>' +
            '</div></div>';
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

    function updateTabCounts() {
        tabs.forEach(function (tab) {
            const tabName = tab.getAttribute('data-training-tab');
            const count = tabName === 'all'
                ? courses.length
                : courses.filter(function (course) { return course.category === tabName; }).length;
            const countEl = tab.querySelector('.training-count');
            if (countEl) countEl.textContent = count;
        });
    }

    function render() {
        const filtered = getFilteredRows();
        const paged = window.saaaListing.paginate(filtered, currentPage, itemsPerPage);
        currentPage = paged.page;

        if (!filtered.length) {
            list.innerHTML = '<div class="training-empty">No courses available in this category yet.</div>';
            pagination.innerHTML = '';
            updateTabCounts();
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

        updateTabCounts();
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (item) { item.classList.remove('active'); });
            tab.classList.add('active');
            currentTab = tab.getAttribute('data-training-tab');
            currentPage = 1;
            render();
        });
    });

    render();
})();
