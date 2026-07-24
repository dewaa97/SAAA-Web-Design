(function () {
    // Animated stat counters
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * easeOut);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5, rootMargin: '0px' });

    document.querySelectorAll('.stat-value[data-target]').forEach(function (counter) {
        counterObserver.observe(counter);
    });

    // Publication carousel
    (function () {
        const root = document.querySelector('[data-publication-carousel]');
        if (!root) return;

        const quarterRank = { 'jan-mar': 1, 'apr-jun': 2, 'jul-sep': 3, 'jul-sept': 3, 'oct-dec': 4 };
        const publicationIssues = (window.SAAA_PUBLICATIONS || [])
            .filter(function (issue) { return issue.isFlipbook; })
            .slice()
            .sort(function (a, b) {
                if (b.year !== a.year) return b.year - a.year;
                const aQuarter = quarterRank[(a.date || '').split(' ')[0].toLowerCase()] || 0;
                const bQuarter = quarterRank[(b.date || '').split(' ')[0].toLowerCase()] || 0;
                return bQuarter - aQuarter;
            })
            .slice(0, 12);

        const track = root.querySelector('[data-publication-track]');
        const prev = root.querySelector('[data-publication-prev]');
        const next = root.querySelector('[data-publication-next]');
        const dotsWrap = root.querySelector('[data-publication-dots]');
        let page = 0;

        function getCardCopy(issue) {
            if (issue.year === 2026) {
                return 'Newest PERSPECTIVES flipbook from the live SAAA archive, kept with the original cover artwork.';
            }
            if (issue.year === 2025) {
                return 'Recent flipbook issue featuring association updates and industry developments from the current publication cycle.';
            }
            return 'Recent flipbook issue from the last three publication years, surfaced directly from the official SAAA library.';
        }

        function renderCards() {
            track.innerHTML = publicationIssues.map(function (issue) {
                return '<article class="publication-card">' +
                    '<a class="publication-cover" href="' + issue.href + '" target="_blank" rel="noopener">' +
                    '<img src="' + issue.image + '" alt="' + issue.title + ' ' + issue.date + ' cover" loading="lazy">' +
                    '</a>' +
                    '<div class="publication-card-body">' +
                    '<div class="publication-type">Flipbook Edition</div>' +
                    '<h4 class="publication-card-title">' + issue.date + '</h4>' +
                    '<p class="publication-card-desc">' + getCardCopy(issue) + '</p>' +
                    '<a class="publication-card-link" href="' + issue.href + '" target="_blank" rel="noopener">Open flipbook</a>' +
                    '</div></article>';
            }).join('');
        }

        function getPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 4;
        }

        function getPageCount() {
            return Math.max(1, Math.ceil(publicationIssues.length / getPerView()));
        }

        function renderDots() {
            const total = getPageCount();
            dotsWrap.innerHTML = '';
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'publication-dot' + (i === page ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to publication page ' + (i + 1));
                dot.addEventListener('click', function () { page = i; update(); });
                dotsWrap.appendChild(dot);
            }
        }

        function update() {
            const perView = getPerView();
            const total = getPageCount();
            page = Math.min(page, total - 1);

            const gap = parseFloat(getComputedStyle(track).gap) || 24;
            const slides = Array.from(track.querySelectorAll('.publication-card'));
            const cardWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
            const offset = page * (cardWidth + gap) * perView;

            track.style.transform = 'translateX(-' + offset + 'px)';
            prev.disabled = page === 0;
            next.disabled = page === total - 1;
            renderDots();
        }

        prev.addEventListener('click', function () { page = Math.max(0, page - 1); update(); });
        next.addEventListener('click', function () { page = Math.min(getPageCount() - 1, page + 1); update(); });

        renderCards();
        window.addEventListener('resize', update);
        update();
    })();
})();
