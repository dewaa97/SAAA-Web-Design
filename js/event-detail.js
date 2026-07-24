(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('event-detail');
    if (!id || !container || !window.saaaContent) {
        if (container) container.innerHTML = '<p>Event not found. <a href="events.html">Back to events</a></p>';
        return;
    }

    const event = saaaContent.events.find(function (e) { return e.id === id; });
    if (!event) {
        container.innerHTML = '<p>Event not found. <a href="events.html">Back to events</a></p>';
        return;
    }

    document.title = event.title + ' — SAAA Events';

    const bookingUtils = window.saaaEventBooking;
    const canRegister = bookingUtils && bookingUtils.isBookingOpen(event);
    const registerPanel = canRegister
        ? '<div class="detail-register-panel detail-register-panel-action">' +
            '<a href="' + bookingUtils.getBookingUrl(event.id) + '" class="btn btn-primary">Register Now</a>' +
          '</div>'
        : (event.registrationStatus === 'Coming Soon'
            ? '<div class="detail-register-panel detail-register-panel-muted">' +
                '<p>Registration coming soon. Please check back later or contact us at <a href="mailto:' + event.contact + '">' + event.contact + '</a>.</p>' +
              '</div>'
            : '');

    const statusBadge = event.registrationStatus === 'Register Now'
        ? ''
        : '<span class="article-badge">' + event.registrationStatus + '</span>';

    container.innerHTML =
        '<img class="detail-hero-image" src="' + event.image + '" alt="' + event.title + '">' +
        '<div class="detail-meta">' +
        '<span>' + event.displayDate + '</span>' +
        '<span>' + event.time + '</span>' +
        '<span>' + event.venue + '</span>' +
        statusBadge +
        '</div>' +
        '<div class="detail-body">' + event.body +
        '<p><strong>Contact:</strong> <a href="mailto:' + event.contact + '">' + event.contact + '</a></p>' +
        '</div>' +
        registerPanel;
})();
