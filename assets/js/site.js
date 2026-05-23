/**
 * Shared site behaviors: mobile nav, header scroll, reveal animations.
 */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileMq = window.matchMedia('(max-width: 900px)');

  function initSiteNav() {
    const toggle = document.getElementById('site-nav-toggle');
    const nav = document.getElementById('site-nav');
    const headerInner = document.querySelector('.site-header__inner');
    if (!toggle || !nav || !headerInner) return;

    function setMenuOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('mobile-menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    function closeMenu() {
      setMenuOpen(false);
    }

    function placeNav() {
      if (mobileMq.matches) {
        if (nav.parentElement !== document.body) {
          document.body.appendChild(nav);
        }
      } else {
        closeMenu();
        if (nav.parentElement !== headerInner) {
          headerInner.insertBefore(nav, toggle);
        }
      }
    }

    placeNav();
    mobileMq.addEventListener('change', placeNav);

    toggle.addEventListener('click', function () {
      setMenuOpen(!nav.classList.contains('is-open'));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initReveal() {
    if (prefersReducedMotion) return;

    const targets = document.querySelectorAll('.reveal');
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initSiteNav();
      initHeaderScroll();
      initReveal();
    });
  } else {
    initSiteNav();
    initHeaderScroll();
    initReveal();
  }
})();
