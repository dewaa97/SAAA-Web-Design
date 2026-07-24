(function () {
    const grid = document.getElementById('members-grid');
    const searchInput = document.getElementById('member-search');
    const alphaContainer = document.getElementById('alpha-filter');
    if (!grid || !window.saaaContent) return;

    const members = saaaContent.members.slice().sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });

    let activeLetter = 'all';
    let searchQuery = '';

    const letters = ['all'];
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (l) { letters.push(l); });

    letters.forEach(function (letter) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'alpha-btn' + (letter === 'all' ? ' active' : '');
        btn.textContent = letter === 'all' ? 'All' : letter;
        btn.dataset.letter = letter;
        btn.addEventListener('click', function () {
            activeLetter = letter;
            alphaContainer.querySelectorAll('.alpha-btn').forEach(function (b) {
                b.classList.toggle('active', b.dataset.letter === letter);
            });
            render();
        });
        alphaContainer.appendChild(btn);
    });

    searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        render();
    });

    function render() {
        const filtered = members.filter(function (m) {
            const matchLetter = activeLetter === 'all' || m.letter === activeLetter || m.name.toUpperCase().startsWith(activeLetter);
            const matchSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery) || m.category.toLowerCase().includes(searchQuery);
            return matchLetter && matchSearch;
        });

        if (!filtered.length) {
            grid.innerHTML = '<div class="empty-state">No members found. Try a different search or letter filter.</div>';
            return;
        }

        grid.innerHTML = filtered.map(function (m) {
            return '<article class="member-card">' +
                '<div class="member-logo"><img src="' + m.logo + '" alt="' + m.name + ' logo"></div>' +
                '<span class="member-category">' + m.category + '</span>' +
                '<h3>' + m.name + '</h3>' +
                '<div class="member-meta">' + m.address + '<br>' + m.phone + '</div>' +
                '</article>';
        }).join('');
    }

    render();
})();
