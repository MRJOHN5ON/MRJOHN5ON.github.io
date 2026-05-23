/* ----- NAVIGATION BAR FUNCTION ----- */
function myMenuFunction() {
  const menuBtn = document.getElementById('myNavMenu');
  const toggle = document.querySelector('.nav-menu-btn');

  if (menuBtn.classList.contains('responsive')) {
    menuBtn.classList.remove('responsive');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    removeMenuLinkListeners();
  } else {
    menuBtn.classList.add('responsive');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    addMenuLinkListeners();
  }
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
function headerShadow() {
  const navHeader = document.getElementById('header');
  if (!navHeader) return;

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.classList.add('is-scrolled');
  } else {
    navHeader.classList.remove('is-scrolled');
  }
}

window.addEventListener('scroll', headerShadow, { passive: true });
headerShadow();

/* ----- TYPING EFFECT ----- */
if (typeof Typed !== 'undefined' && document.querySelector('.typedText')) {
  new Typed('.typedText', {
    strings: ['QA Engineer', 'Software Tester', 'QA Analyst'],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000,
  });
}

/* ----- SCROLL REVEAL (Intersection Observer) ----- */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}

initReveal();

/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(function (current) {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');

    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive, { passive: true });

/* ----- CLOSE MENU ON LINK CLICK ----- */
function addMenuLinkListeners() {
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
}

function removeMenuLinkListeners() {
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.removeEventListener('click', closeMenu);
  });
}

function closeMenu() {
  const menuBtn = document.getElementById('myNavMenu');
  const toggle = document.querySelector('.nav-menu-btn');
  menuBtn.classList.remove('responsive');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}
