/* =====================================================
   MAIN.JS — Mukul Dewangan Portfolio
   Shared by all pages: scroll reveal + nav highlight
   ===================================================== */

(function () {
    // ── Scroll reveal ──────────────────────────────────
    const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

    if (prefersMotion) {
        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    revealObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    } else {
        // Respect reduced-motion: skip animation, show everything immediately
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }

    // ── Active nav highlight (index.html only — sections with IDs) ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (sections.length && navLinks.length) {
        const navObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    navLinks.forEach(l => {
                        const href = l.getAttribute('href');
                        l.classList.toggle('active', href === `#${e.target.id}`);
                    });
                }
            });
        }, { threshold: 0.40 });
        sections.forEach(s => navObs.observe(s));
    }
})();
