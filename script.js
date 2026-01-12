document.addEventListener('DOMContentLoaded', function () {

    /* ================= MOBILE NAVIGATION ================= */
    const hamburger = document.getElementById('hamburger-button');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');

        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ================= THEME TOGGLE (SLIDING) ================= */
    /* ================= DARK / LIGHT MODE ================= */
const themeToggle = document.getElementById('themeToggle');
const toggleIcon = themeToggle?.querySelector('.toggle-icon');

if (themeToggle) {

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.classList.add('dark');
        toggleIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('dark');

        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
}


    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const offset = document.querySelector('.navbar').offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ================= ACTIVE NAV LINK ================= */
    const sections = document.querySelectorAll('section[id]');

    function navHighlighter() {
        let scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector('.nav-menu a[href*="' + id + '"]');

            if (!link) return;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', navHighlighter);
    navHighlighter();

    /* ================= FOOTER YEAR ================= */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ================= SCROLL ANIMATIONS ================= */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.section h2, .about-image, .about-container > div, .skill-item, .timeline-item, .project-card, .experience-card, .contact-info a, .certification-list li'
    ).forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
