(function () {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Toggle navigation');

    function closeMenu() {
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        navLinks.querySelectorAll('.nav-dropdown.open').forEach(function (dropdown) {
            dropdown.classList.remove('open');
            const toggle = dropdown.querySelector('.nav-dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    menuBtn.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('mobile-open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) closeMenu();
    });

    navLinks.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const dropdown = toggle.closest('.nav-dropdown');
            if (!dropdown) return;
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) closeMenu();
        });
    });

    document.addEventListener('click', function (event) {
        if (!navLinks.classList.contains('mobile-open')) return;
        if (navLinks.contains(event.target) || menuBtn.contains(event.target)) return;
        closeMenu();
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) closeMenu();
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (window.innerWidth <= 768) closeMenu();
        });
    });
})();
