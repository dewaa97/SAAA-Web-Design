(function () {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const id = params.get('id');
    const container = document.getElementById('article-detail');
    if (!type || !id || !container || !window.saaaContent) {
        if (container) container.innerHTML = '<p>Article not found.</p>';
        return;
    }

    const list = type === 'featured' ? saaaContent.featuredNews : saaaContent.announcements;
    const item = list.find(function (a) { return a.id === id; });
    if (!item) {
        container.innerHTML = '<p>Article not found. <a href="' + (type === 'featured' ? 'featured-news.html' : 'announcements.html') + '">Back</a></p>';
        return;
    }

    document.title = item.title + ' — SAAA';
    const backLink = type === 'featured' ? 'featured-news.html' : 'announcements.html';
    const badge = item.badge ? '<span class="article-badge">' + item.badge + '</span>' : '';

    container.innerHTML =
        '<a href="' + backLink + '" class="btn btn-secondary" style="margin-bottom:24px;">← Back</a>' +
        '<img class="detail-hero-image" src="' + item.image + '" alt="' + item.title + '">' +
        '<div class="detail-meta"><span>' + item.date + '</span>' + badge + '</div>' +
        '<h2 class="section-title" style="margin-bottom:24px;">' + item.title + '</h2>' +
        '<div class="detail-body">' + item.body + '</div>';
})();
