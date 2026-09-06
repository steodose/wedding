/* ============================================================
   lightbox.js — Click-to-enlarge photo viewer
   Usage: include the .lightbox markup + this script on any page
          that has .gallery-item elements
   ============================================================ */

(function () {
  // Pages without a lightbox (or without photos) load this harmlessly
  if (!document.getElementById('lightbox') ||
      !document.querySelector('.gallery-item')) return;

  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose   = document.getElementById('lightbox-close');
  const lbPrev    = document.getElementById('lightbox-prev');
  const lbNext    = document.getElementById('lightbox-next');

  // Collect all gallery items that have a real <img>
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let current = 0;

  function open(index) {
    current = index;
    const item = items[current];
    const img  = item.querySelector('img');
    if (!img) return; // placeholder — skip lightbox until photos added

    lbImg.src     = img.src;
    lbImg.alt     = img.alt;
    lbCaption.textContent = item.dataset.caption || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbImg.focus();
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    // Find next item with a real image
    let next = (current + dir + items.length) % items.length;
    const startNext = next;
    while (!items[next].querySelector('img')) {
      next = (next + dir + items.length) % items.length;
      if (next === startNext) { close(); return; }
    }
    open(next);
  }

  // Attach click handlers
  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i));
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  // Click backdrop to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();
