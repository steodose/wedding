/* ============================================================
   scroll-animations.js — Intersection Observer fade-ins
   Included on every page, handles .fade-in and .fade-in-group
   ============================================================ */

(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  function observe() {
    document.querySelectorAll('.fade-in, .fade-in-group').forEach(el => {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
})();
