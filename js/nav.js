/* ============================================================
   nav.js — Injects shared navigation into every page
   Usage: include <div id="nav-root"></div> + this script
   ============================================================ */

(function () {
  const NAV_HTML = `
    <nav id="site-nav" role="navigation" aria-label="Main navigation">
      <div class="container">
        <a href="index.html" class="nav-brand">D &amp; S</a>
        <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links" role="list">
          <li><a href="index.html" data-page="index">Home</a></li>
          <li><a href="our-story.html" data-page="our-story">Our Story</a></li>
          <li><a href="gallery.html" data-page="gallery">Gallery</a></li>
          <li><a href="travels.html" data-page="travels">Travels</a></li>
          <li><a href="rsvp.html" data-page="rsvp">RSVP</a></li>
          <li><a href="registry.html" data-page="registry">Registry</a></li>
        </ul>
      </div>
    </nav>
  `;

  // Inject nav
  const root = document.getElementById('nav-root');
  if (root) {
    root.outerHTML = NAV_HTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  }

  // Mark active link based on current page
  const page = document.documentElement.dataset.page;
  if (page) {
    const activeLink = document.querySelector(`.nav-links a[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  // Sticky shadow on scroll
  const nav = document.getElementById('site-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Mobile toggle
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile nav on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();
