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
    container.innerHTML =
        '<img class="detail-hero-image" src="' + event.image + '" alt="' + event.title + '">' +
        '<div class="detail-meta">' +
        '<span>' + event.displayDate + '</span>' +
        '<span>' + event.time + '</span>' +
        '<span>' + event.venue + '</span>' +
        '<span class="article-badge">' + event.registrationStatus + '</span>' +
        '</div>' +
        '<div class="detail-body">' + event.body +
        '<p><strong>Contact:</strong> <a href="mailto:' + event.contact + '">' + event.contact + '</a></p>' +
        '</div>';
})();
