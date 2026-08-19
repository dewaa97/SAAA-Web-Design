(function () {
    const courses = window.saaaTrainingCourses || [];
    const detailsMap = window.saaaTrainingCourseDetails || {};
    const contentApi = window.saaaTrainingDetailContent;
    const root = document.querySelector('[data-training-detail-root]');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const course = courses.find(function (item) { return item.slug === slug; });

    if (!course || !course.infoPageSlug) {
        root.innerHTML = '<div class="training-empty">Course not found. <a href="training-courses.html">Return to catalog</a>.</div>';
        return;
    }

    const details = detailsMap[slug] || {};
    const sectionLabels = {
        objectives: 'Course Objectives',
        outline: 'Course Outline',
        whoShouldAttend: 'Who Should Attend?',
        accreditation: 'Accreditation & Examination',
        fees: 'Course Fee'
    };

    function formatDuration(courseItem) {
        if (courseItem.dayCountLabel) return courseItem.dayCountLabel;
        return courseItem.dayCount === 1 ? '1 Day' : courseItem.dayCount + ' Days';
    }

    function formatLocation(courseItem) {
        if (courseItem.deliveryMode === 'virtual') return 'Virtual';
        return courseItem.classroomAddress;
    }

    function renderSection(key, content) {
        if (contentApi && typeof contentApi.renderSection === 'function') {
            return contentApi.renderSection(key, content);
        }
        return '<p>' + String(content) + '</p>';
    }

    document.title = course.title + ' — SAAA';

    const titleEl = document.createElement('h2');
    titleEl.className = 'training-course-detail-title';
    titleEl.textContent = course.title;
    root.insertBefore(titleEl, root.firstChild);

    if (course.functionName) {
        const functionEl = document.createElement('p');
        functionEl.className = 'training-course-detail-function';
        functionEl.textContent = course.functionName;
        root.insertBefore(functionEl, root.querySelector('[data-training-detail-meta]'));
    }

    const metaEl = root.querySelector('[data-training-detail-meta]');
    if (metaEl) {
        let metaHtml = '<span>' + formatDuration(course) + '</span><span>' + formatLocation(course) + '</span>';
        if (course.isOpeningSoon) {
            metaHtml += '<span class="training-opening-soon-badge">Opening Soon</span>';
        }
        metaEl.innerHTML = metaHtml;
    }

    const audienceEl = root.querySelector('[data-training-detail-audience]');
    if (audienceEl && details.audienceLine) {
        audienceEl.textContent = details.audienceLine;
        audienceEl.hidden = false;
    }

    const sectionsEl = root.querySelector('[data-training-detail-sections]');
    if (sectionsEl) {
        sectionsEl.innerHTML = Object.keys(sectionLabels).map(function (key) {
            const content = details[key];
            if (!content) return '';
            return '<div class="training-course-detail-section"><h3>' + sectionLabels[key] + '</h3>' +
                renderSection(key, content) + '</div>';
        }).join('');
    }

    if (course.isOpeningSoon) {
        const openingSoonHtml = '<div class="training-opening-soon-panel"><h2>Opening Soon</h2><p>This course is not yet open for registration. SAAA is preparing updated schedules and registration details. Please check back soon or contact admin@saaa.org.sg for enquiries.</p></div>';
        if (sectionsEl) {
            sectionsEl.insertAdjacentHTML('beforebegin', openingSoonHtml);
        }
    }

    const actionsEl = root.querySelector('[data-training-detail-actions]');
    if (actionsEl) {
        let actionsHtml = '';
        if (!course.isOpeningSoon && course.bookNowUrl) {
            actionsHtml += '<a href="' + course.bookNowUrl + '" class="btn btn-primary">Register Now</a>';
        }
        actionsHtml += '<a href="training-courses.html" class="btn btn-secondary">Back to Training Courses</a>';
        actionsEl.innerHTML = actionsHtml;
    }
})();
