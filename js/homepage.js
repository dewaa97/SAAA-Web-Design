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

    // Logo marquees — members and strategic partners
    (function () {
        var MEMBER_LOGOS = [
            { src: 'images/members/logos/dhl.jpg', alt: 'DHL' },
            { src: 'images/members/logos/kuehne-nagel-in-singapore.png', alt: 'Kuehne+Nagel' },
            { src: 'images/members/logos/yusen-logistics-pte-ltd.png', alt: 'Yusen Logistics' },
            { src: 'images/members/logos/jas-forwarding-worldwide-pte-ltd.png', alt: 'JAS Forwarding' },
            { src: 'images/members/logos/dnata-singapore-pte-ltd.png', alt: 'dnata Singapore' },
            { src: 'images/members/logos/sats-airport-services-pte-ltd.png', alt: 'SATS' },
            { src: 'images/members/logos/ups-pte-ltd.png', alt: 'UPS' },
            { src: 'images/members/logos/b-h-worldwide-sg-pte-ltd.png', alt: 'B&H Worldwide' },
            { src: 'images/members/logos/global-airfreight-international-pte-ltd.png', alt: 'Global Airfreight International' },
            { src: 'images/members/logos/scanwell-logistics-singapore-pte-ltd.png', alt: 'Scanwell Logistics' },
            { src: 'images/members/logos/st-logistics-pte-ltd.png', alt: 'ST Logistics' },
            { src: 'images/members/logos/seko.png', alt: 'SEKO' },
            { src: 'images/members/logos/alliance-21-pte-ltd.jpg', alt: 'Alliance 21' },
            { src: 'images/members/logos/logwin-air-ocean-singapore-pte-ltd.png', alt: 'Logwin' },
            { src: 'images/members/logos/rcs-logistics-singapore-pte-ltd.png', alt: 'RCS Logistics' },
            { src: 'images/members/logos/quickflo-logistics-pte-ltd.png', alt: 'Quickflo Logistics' },
            { src: 'images/members/logos/cargo-community-network-pte-ltd.jpg', alt: 'Cargo Community Network' },
            { src: 'images/members/logos/aspac-aircargo-services-pte-ltd.jpg', alt: 'ASPAC Aircargo Services' },
            { src: 'images/members/logos/acs-freight-services-pte-ltd.jpg', alt: 'ACS Freight Services' },
            { src: 'images/members/logos/baylink-logistics-pte-ltd.jpg', alt: 'Baylink Logistics' },
            { src: 'images/members/logos/evo-logistics-pte-ltd.png', alt: 'EVO Logistics' },
            { src: 'images/members/logos/harbour-handlers-pte-ltd.png', alt: 'Harbour Handlers' },
            { src: 'images/members/logos/mercury-freight-distribution-pte-ltd.png', alt: 'Mercury Freight' },
            { src: 'images/members/logos/pacific-logistics-group-pte-ltd.png', alt: 'Pacific Logistics Group' }
        ];

        var PARTNER_LOGOS = {
            industry: [
                { src: 'images/partners/iata-partner.png', alt: 'IATA' },
                { src: 'images/partners/icao-partner.svg', alt: 'ICAO' },
                { src: 'images/partners/sats-partner.png', alt: 'SATS' },
                { src: 'images/partners/dnata-partner.png', alt: 'dnata' },
                { src: 'images/partners/ccn-partner.png', alt: 'Cargo Community Network' }
            ],
            government: [
                { src: 'images/partners/caas-partner.png', alt: 'CAAS' },
                { src: 'images/partners/esg-partner.png', alt: 'Enterprise Singapore' },
                { src: 'images/partners/imda-crest.png', alt: 'IMDA' },
                { src: 'images/partners/mindef-partner.png', alt: 'MINDEF' },
                { src: 'images/partners/wsg-partner.png', alt: 'Workforce Singapore' }
            ],
            ihls: [
                { src: 'images/partners/rp-partner.png', alt: 'Republic Polytechnic' },
                { src: 'images/partners/tp-partner.png', alt: 'Temasek Polytechnic' },
                { src: 'images/partners/sp-logo.png', alt: 'Singapore Polytechnic' },
                { src: 'images/partners/nyp-logo.svg', alt: 'Nanyang Polytechnic' },
                { src: 'images/partners/np-logo.svg', alt: 'Ngee Ann Polytechnic' },
                { src: 'images/partners/ite-logo.png', alt: 'ITE' }
            ]
        };

        function buildLogoCells(logos) {
            return logos.map(function (logo) {
                return '<div class="logo-cell"><img src="' + logo.src + '" alt="' + logo.alt + '" loading="lazy"></div>';
            }).join('');
        }

        function populateStrip(container, logos) {
            if (!container || !logos.length) return;
            var cells = buildLogoCells(logos);
            container.innerHTML = cells + cells;
        }

        populateStrip(document.querySelector('[data-member-marquee]'), MEMBER_LOGOS);

        document.querySelectorAll('[data-partner-strip]').forEach(function (strip) {
            var key = strip.getAttribute('data-partner-strip');
            populateStrip(strip, PARTNER_LOGOS[key] || []);
        });
    })();
})();
