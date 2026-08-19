(function () {
    var categoryLabels = {
        regulatory: 'Regulatory',
        association: 'Association',
        industry: 'Industry',
        events: 'Events',
        training: 'Training',
        program: 'Programmes',
        membership: 'Membership',
        operations: 'Operations',
        networking: 'Networking',
        workshop: 'Workshop',
        meeting: 'Meeting',
        exhibitions: 'Exhibitions'
    };

    var params = new URLSearchParams(window.location.search);
    var type = params.get('type');
    var id = params.get('id');
    var container = document.getElementById('article-detail');
    if (!type || !id || !container || !window.saaaContent) {
        if (container) container.innerHTML = '<p>Article not found.</p>';
        return;
    }

    var list = type === 'featured' ? saaaContent.featuredNews : saaaContent.announcements;
    var item = list.find(function (a) { return a.id === id; });
    if (!item) {
        container.innerHTML = '<p>Article not found. <a href="' + (type === 'featured' ? 'featured-news.html' : 'announcements.html') + '">Back</a></p>';
        return;
    }

    document.title = item.title + ' — SAAA';
    var eyebrow = '';
    var categoryDisplay = categoryLabels[item.category] || item.category;

    var metaBar =
        '<section class="meta-bar"><div class="container">' +
        '<div class="meta-grid">' +
        '<div class="meta-card"><div class="meta-label">Published</div><div class="meta-value">' + item.date + '</div></div>' +
        '<div class="meta-card"><div class="meta-label">Category</div><div class="meta-value">' + categoryDisplay + '</div></div>' +
        '</div></div></section>';

    container.innerHTML = metaBar +
        '<div class="article-wrap"><div class="container">' +
        '<article class="article-main">' +
        '<div class="article-intro">' + eyebrow + '</div>' +
        '<img class="detail-hero-image" src="' + item.image + '" alt="' + item.title + '">' +
        '<h2 class="section-title" style="margin-bottom:24px;">' + item.title + '</h2>' +
        '<div class="detail-body">' + item.body + '</div>' +
        '</article></div></div>';
})();
