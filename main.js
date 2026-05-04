/* ============================================================
   RALPH LAWAL GROUP — main.js v3
   Features: Navbar, Mobile Menu, Scroll Reveal, FAQ Accordion,
             Portfolio Filter, Form Validation, Back To Top,
             Active Nav Link
   ============================================================ */

'use strict';

/* ── NAVBAR STICKY ── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    openMenu(!hamburger.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => openMenu(false));
  });

  // Close on outside tap
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) openMenu(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) openMenu(false);
  });
})();

/* ── SMOOTH SCROLL ── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* ── SCROLL REVEAL ── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  items.forEach(item => observer.observe(item));
})();

/* ── FAQ ACCORDION ── */
(function initFAQ() {
  const faqs = document.querySelectorAll('.faq-question');
  if (!faqs.length) return;

  faqs.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-question').forEach(q => {
        q.classList.remove('active');
        if (q.nextElementSibling) q.nextElementSibling.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('active');
        if (answer) answer.classList.add('open');
      }
    });
  });
})();

/* ── PORTFOLIO FILTER ── */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.pf-card, .portfolio-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      items.forEach(item => {
        const cat = item.dataset.category;
        const show = filter === 'all' || cat === filter;
        item.classList.toggle('hidden', !show);
        if (show) {
          item.style.animation = 'none';
          void item.offsetWidth; // reflow
          item.style.animation = 'fadeInItem 0.4s ease forwards';
        }
      });
    });
  });
})();

/* ── FORM VALIDATION + SUCCESS STATE ── */
(function initFormValidation() {
  document.querySelectorAll('form').forEach(form => {
    const successMsg = form.previousElementSibling;

    form.addEventListener('submit', e => {
      let valid = true;

      // Clear errors
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

      // Validate required
      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          valid = false;
          if (group) group.classList.add('error');
        }
        if (field.type === 'email' && field.value.trim()) {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
            valid = false;
            if (group) {
              group.classList.add('error');
              const msg = group.querySelector('.form-error-msg');
              if (msg) msg.textContent = 'Please enter a valid email address.';
            }
          }
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = form.querySelector('.form-group.error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Formspree AJAX submit
      if (form.action && form.action.includes('formspree')) {
        e.preventDefault();
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(res => {
          if (res.ok) {
            form.reset();
            const success = form.querySelector('.form-success') || form.previousElementSibling;
            if (success && success.classList.contains('form-success')) success.classList.add('show');
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
          }
        }).catch(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
        });
      }
    });
  });
})();

/* ── BACK TO TOP ── */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── ACTIVE NAV LINK ── */
(function setActiveNav() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    const isHome = (filename === 'index.html' || filename === '') && (linkFile === 'index.html' || href === './' || href === '/');
    const isMatch = linkFile && linkFile === filename && linkFile !== '';
    if (isHome || isMatch) link.classList.add('active');
  });
})();

/* ── INJECT KEYFRAMES ── */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInItem {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
})();
