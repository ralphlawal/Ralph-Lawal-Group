/* ===================================================
   Ralph Lawal Group — portfolio.js
   Filter logic + navbar + hamburger
   =================================================== */
(function () {
  'use strict';

  /* ─── Navbar scroll ──────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Hamburger ──────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    const links = mobileMenu.querySelectorAll('a');
    const open  = () => { hamburger.classList.add('active'); mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; hamburger.setAttribute('aria-expanded', 'true'); };
    const close = () => { hamburger.classList.remove('active'); mobileMenu.classList.remove('open'); document.body.style.overflow = ''; hamburger.setAttribute('aria-expanded', 'false'); };
    hamburger.addEventListener('click', () => mobileMenu.classList.contains('open') ? close() : open());
    links.forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => e.key === 'Escape' && close());
  }

  /* ─── Portfolio Filter ───────────────────────────── */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const cards       = document.querySelectorAll('.pf-card');
  const countEl     = document.querySelector('.filter-count');
  const emptyEl     = document.querySelector('.filter-empty');

  if (!filterBtns.length || !cards.length) return;

  function updateCount(visible) {
    if (!countEl) return;
    const total = cards.length;
    countEl.innerHTML = `Showing <span>${visible}</span> of <span>${total}</span> projects`;
  }

  function applyFilter(filter) {
    let visible = 0;

    cards.forEach(function (card) {
      const category = card.dataset.category || '';
      const match    = filter === 'all' || category === filter;

      if (match) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    /* Empty state */
    if (emptyEl) {
      emptyEl.classList.toggle('visible', visible === 0);
    }

    updateCount(visible);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  /* Initial count on load */
  updateCount(cards.length);

})();
