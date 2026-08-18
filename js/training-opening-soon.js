(function () {
    const courses = window.saaaTrainingCourses || [];
    const root = document.querySelector('[data-opening-soon-root]');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const course = courses.find(function (item) { return item.slug === slug; });

    if (!course || !course.isOpeningSoon) {
        root.innerHTML = '<div class="training-empty">Course not found or not marked as opening soon. <a href="training-courses.html">Return to catalog</a>.</div>';
        return;
    }

    function formatDuration(courseItem) {
        if (courseItem.dayCountLabel) return courseItem.dayCountLabel;
        return courseItem.dayCount === 1 ? '1 Day' : courseItem.dayCount + ' Days';
    }

    function formatLocation(courseItem) {
        if (courseItem.deliveryMode === 'virtual') return 'Virtual';
        return courseItem.classroomAddress;
    }

    document.title = 'Opening Soon — ' + course.title + ' — SAAA';

    const titleEl = root.querySelector('[data-opening-soon-course-title]');
    const functionEl = root.querySelector('[data-opening-soon-function]');
    if (titleEl) titleEl.textContent = course.title;
    if (functionEl && course.functionName) {
        functionEl.textContent = course.functionName;
        functionEl.hidden = false;
    }

    const metaEl = root.querySelector('[data-opening-soon-meta]');
    if (metaEl) {
        metaEl.innerHTML = '<span>' + formatDuration(course) + '</span><span>' + formatLocation(course) + '</span><span class="training-opening-soon-badge">Opening Soon</span>';
    }
})();
