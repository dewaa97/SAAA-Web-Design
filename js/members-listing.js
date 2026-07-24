(function () {
    const grid = document.getElementById('members-grid');
    const searchInput = document.getElementById('member-search');
    const alphaContainer = document.getElementById('alpha-filter');
    const countEl = document.getElementById('members-count');
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

    function getInitials(name) {
        const words = name.replace(/[^a-zA-Z0-9\s&+]/g, ' ').split(/\s+/).filter(Boolean);
        if (!words.length) return '?';
        if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
        return (words[0][0] + words[1][0]).toUpperCase();
    }

    function renderLogo(member) {
        if (member.logo) {
            return '<div class="member-logo"><img src="' + member.logo + '" alt="' + member.name + ' logo" loading="lazy"></div>';
        }
        return '<div class="member-logo member-logo-placeholder" aria-hidden="true"><span>' + getInitials(member.name) + '</span></div>';
    }

    function render() {
        const filtered = members.filter(function (m) {
            const matchLetter = activeLetter === 'all' || m.letter === activeLetter || m.name.toUpperCase().startsWith(activeLetter);
            const matchSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery);
            return matchLetter && matchSearch;
        });

        if (countEl) {
            const totalLabel = members.length + ' member companies';
            countEl.textContent = filtered.length === members.length
                ? 'Showing all ' + totalLabel + '.'
                : 'Showing ' + filtered.length + ' of ' + totalLabel + '.';
        }

        if (!filtered.length) {
            grid.innerHTML = '<div class="empty-state">No members found. Try a different search or letter filter.</div>';
            return;
        }

        grid.innerHTML = filtered.map(function (m) {
            return '<article class="member-card">' +
                renderLogo(m) +
                '<h3>' + m.name + '</h3>' +
                '</article>';
        }).join('');
    }

    render();
})();
