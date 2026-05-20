/* ─────────────────────────────────────────
   PORTFOLIO — script.js (Main Page)
───────────────────────────────────────── */

'use strict';

/* ── 1. CURRENT YEAR ─────────────────── */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ── 2. NAVIGATION ───────────────────── */
(function initNav() {
  const nav     = document.getElementById('nav');
  const burger  = document.querySelector('.nav__burger');
  const links   = document.querySelector('.nav__links');
  const allLinks = document.querySelectorAll('.nav__link:not(.nav__link--cta)');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && links) {
    burger.addEventListener('click', function () {
      const isOpen = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section highlight
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;
    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector('.nav__link[href="#' + id + '"]');
      if (!link) return;

      if (scrollY >= top && scrollY < top + height) {
        allLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();


/* ── 3. INTERSECTION OBSERVER (REVEAL) ── */
(function initReveal() {
  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach(function (el) { observer.observe(el); });
})();


/* ── 4. TYPING TEXT EFFECT ───────────── */
(function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Crafting sonic worlds.',
    'Sound for film & media.',
    'Where silence speaks.',
    'Every frame deserves a sound.',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let timer       = null;

  const TYPING_SPEED = 68;
  const DELETE_SPEED = 34;
  const PAUSE_AFTER  = 2400;
  const PAUSE_BEFORE = 400;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        timer = setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = setTimeout(type, PAUSE_BEFORE);
        return;
      }
    }

    timer = setTimeout(type, isDeleting ? DELETE_SPEED : TYPING_SPEED);
  }

  setTimeout(type, 1000);
})();


/* ── 5. PROJECT CARD VIDEO HOVER ─────── */
(function initProjectVideos() {
  // Cards are now inside <a> wrappers — still target .project-card
  document.querySelectorAll('.project-card-link').forEach(function (link) {
    const video = link.querySelector('.project-card__video');
    if (!video) return;

    link.addEventListener('mouseenter', function () {
      video.play().catch(function () {});
    });

    link.addEventListener('mouseleave', function () {
      video.pause();
      video.currentTime = 0;
      if (video.hasAttribute('poster')) video.load();
    });
  });
})();


/* ── 6. WORK CATEGORY FILTER ─────────── */
(function initWorkFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card-link[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      cards.forEach(function (card) {
        const cat = card.getAttribute('data-category');
        card.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
      });
    });
  });
})();


/* ── 7. AUDIO TOGGLE ─────────────────── */
(function initAudioToggle() {
  const btn     = document.getElementById('audioToggle');
  if (!btn) return;

  const iconOff = btn.querySelector('.icon-sound-off');
  const iconOn  = btn.querySelector('.icon-sound-on');
  const label   = btn.querySelector('span');
  let   isOn    = false;

  btn.addEventListener('click', function () {
    isOn = !isOn;
    btn.setAttribute('aria-pressed', String(isOn));
    btn.classList.toggle('is-on', isOn);
    if (iconOff) iconOff.style.display = isOn ? 'none' : '';
    if (iconOn)  iconOn.style.display  = isOn ? ''     : 'none';
    if (label)   label.textContent     = isOn ? 'Audio On' : 'Audio Off';
  });
})();


/* ── 8. SMOOTH SCROLL FALLBACK ────────── */
(function initSmoothScroll() {
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68',
        10
      );

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: 'smooth',
      });
    });
  });
})();
