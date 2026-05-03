/* ===================================================
   Ralph Lawal Group — division-page.js
   FAQ accordion — shared across all division pages
   =================================================== */
(function () {
  'use strict';

  /* ─── Navbar scroll ──────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function onScroll() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Hamburger ──────────────────────────────────── */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    function openMenu() {
      hamburger.classList.add('active');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
      mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileLinks.forEach(function (link) { link.addEventListener('click', closeMenu); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ─── FAQ Accordion ──────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const trigger = item.querySelector('.faq-trigger');
    const body    = item.querySelector('.faq-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      /* Close all other items */
      faqItems.forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          const otherBody = other.querySelector('.faq-body');
          if (otherBody) otherBody.style.maxHeight = null;
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      /* Toggle current item */
      if (isOpen) {
        item.classList.remove('open');
        body.style.maxHeight = null;
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    /* Accessibility: keyboard support */
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });

})();
