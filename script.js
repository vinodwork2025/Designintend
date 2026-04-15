/**
 * DESIGN INTEND — script.js
 * Vanilla JS interactions, animations, and UI enhancements
 * No external libraries
 */

'use strict';

/* =====================================================
   PAGE LOADER
   ===================================================== */
(function initLoader() {
  const loader = document.createElement('div');
  loader.className = 'page-loading';
  loader.innerHTML = '<div class="loading-logo"><span>DESIGN</span> INTEND</div>';
  document.body.prepend(loader);

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      initHeroAnimation();
    }, 300);
  });
})();

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (!cursor || !follower) return;
  if (window.matchMedia('(max-width: 768px)').matches) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    raf = requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states
  const hoverTargets = 'a, button, .service-card, .project-row, input, select, textarea, .t-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Dark section inversion
  const darkSections = [
    document.querySelector('.services'),
    document.querySelector('.testimonials'),
    document.querySelector('.contact-left')
  ].filter(Boolean);

  document.addEventListener('mousemove', (e) => {
    const isDark = darkSections.some(el => {
      const rect = el.getBoundingClientRect();
      return e.clientX >= rect.left && e.clientX <= rect.right &&
             e.clientY >= rect.top && e.clientY <= rect.bottom;
    });
    document.body.classList.toggle('cursor-dark', isDark);
  });
})();

/* =====================================================
   NAVIGATION
   ===================================================== */
(function initNav() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!nav) return;

  // Scroll behavior
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    nav.classList.toggle('scrolled', scrollY > 20);
    lastScrollY = scrollY;
  }, { passive: true });

  // Hamburger
  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger && hamburger.addEventListener('click', openMenu);
  mobileClose && mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(section => sectionObserver.observe(section));
})();

/* =====================================================
   THEME TOGGLE
   ===================================================== */
(function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;
  const body = document.body;

  // Load saved preference
  const saved = localStorage.getItem('di-theme') || 'light';
  applyTheme(saved, false);

  function applyTheme(theme, animate) {
    if (animate) {
      const overlay = document.createElement('div');
      overlay.className = 'theme-transition';
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.classList.add('flash');
        setTimeout(() => {
          html.setAttribute('data-theme', theme);
          body.setAttribute('data-theme', theme);
          overlay.classList.remove('flash');
          setTimeout(() => overlay.remove(), 350);
        }, 150);
      });
    } else {
      html.setAttribute('data-theme', theme);
      body.setAttribute('data-theme', theme);
    }
    localStorage.setItem('di-theme', theme);
  }

  toggleBtn && toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    applyTheme(current === 'light' ? 'dark' : 'light', true);
  });
})();

/* =====================================================
   HERO ENTRANCE ANIMATION
   ===================================================== */
function initHeroAnimation() {
  const revealLeftItems = document.querySelectorAll('.hero .reveal-left');
  const heroRight = document.querySelector('.hero-right');

  // Stagger left panel items
  revealLeftItems.forEach((el, i) => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + delay);
  });

  // Right panel reveal
  setTimeout(() => {
    heroRight && heroRight.classList.add('visible');
  }, 200);
}

/* =====================================================
   SCROLL REVEAL — INTERSECTION OBSERVER
   ===================================================== */
(function initScrollReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

        setTimeout(() => {
          el.classList.add('visible');
        }, delay);

        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  // Reveal up elements (non-hero)
  document.querySelectorAll('.reveal-up').forEach(el => {
    revealObserver.observe(el);
  });

  // Stagger grid children
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const index = parseInt(el.dataset.index || 0);
        const baseDelay = index * 100;

        setTimeout(() => {
          el.classList.add('visible');
        }, baseDelay);

        staggerObserver.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-stagger').forEach(el => {
    staggerObserver.observe(el);
  });

  // Reveal right elements
  const rightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        rightObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-right:not(.hero-right)').forEach(el => {
    rightObserver.observe(el);
  });
})();

/* =====================================================
   PROJECT ROWS — IN-VIEW CLASS
   ===================================================== */
(function initProjectRows() {
  const rows = document.querySelectorAll('.project-row');

  const rowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  rows.forEach(row => rowObserver.observe(row));
})();

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.round(easedProgress * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
        // Add suffix
        if (target >= 100) el.textContent = target + '+';
      }
    }

    requestAnimationFrame(update);
  }
})();

/* =====================================================
   TESTIMONIAL SLIDER
   ===================================================== */
(function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.t-dot');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  prevBtn && prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  nextBtn && nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetAutoplay();
    });
  });

  startAutoplay();
})();

/* =====================================================
   CONTACT FORM
   ===================================================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--terracotta)';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });

    if (!valid) return;

    // Simulate submission
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      btnText.textContent = originalText;
      successMsg.classList.add('visible');
      setTimeout(() => successMsg.classList.remove('visible'), 6000);
    }, 1500);
  });
})();

/* =====================================================
   PARALLAX — HERO IMAGE SUBTLE EFFECT
   ===================================================== */
(function initParallax() {
  const heroImage = document.querySelector('.hero-image');
  if (!heroImage) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    if (scrollY > heroHeight) return;

    const offset = scrollY * 0.25;
    heroImage.style.transform = `scale(1.05) translateY(${offset}px)`;
  }, { passive: true });
})();

/* =====================================================
   SMOOTH ANCHOR SCROLL
   ===================================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('mainNav')?.offsetHeight || 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });
})();

/* =====================================================
   MARQUEE — PAUSE / RESUME DIRECTION
   ===================================================== */
(function initMarquee() {
  const marqueeInner = document.getElementById('marqueeInner');
  if (!marqueeInner) return;

  // Speed control on scroll direction
  let lastScrollY = window.scrollY;
  let scrollVelocity = 1;
  let velocityRaf;

  window.addEventListener('scroll', () => {
    const delta = Math.abs(window.scrollY - lastScrollY);
    scrollVelocity = Math.max(0.4, Math.min(3, 1 + delta * 0.04));
    lastScrollY = window.scrollY;

    clearTimeout(velocityRaf);
    velocityRaf = setTimeout(() => { scrollVelocity = 1; }, 200);
    marqueeInner.style.animationDuration = (32 / scrollVelocity) + 's';
  }, { passive: true });
})();

/* =====================================================
   SERVICES GRID — BACKGROUND IMAGE REVEAL
   ===================================================== */
(function initServicesBg() {
  const servicesBg = document.querySelector('.services-bg-image img');
  if (!servicesBg) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      servicesBg.style.transition = 'transform 1.2s ease, filter 1.2s ease';
      servicesBg.style.transform = 'scale(1)';
      observer.disconnect();
    }
  }, { threshold: 0.1 });

  servicesBg.style.transform = 'scale(1.08)';
  observer.observe(servicesBg);
})();

/* =====================================================
   KEYBOARD ACCESSIBILITY — MOBILE MENU
   ===================================================== */
(function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const mobileMenu = document.getElementById('mobileMenu');
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        document.getElementById('hamburger')?.click();
      }
    }
  });
})();

/* =====================================================
   STUDIO SECTION — STICKY FEEL ON SCROLL
   ===================================================== */
(function initStudioSection() {
  const studioRight = document.querySelector('.studio-right');
  if (!studioRight) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        studioRight.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  observer.observe(studioRight);
})();

/* =====================================================
   FOOTER — SCROLL TO TOP ON LOGO CLICK
   ===================================================== */
(function initFooter() {
  const footerLogo = document.querySelector('.footer-logo');
  if (!footerLogo) return;

  footerLogo.style.cursor = 'pointer';
  footerLogo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================================================
   FORM FIELDS — FLOAT LABEL EFFECT
   ===================================================== */
(function initFormLabels() {
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.toggle('has-value', input.value.trim() !== '');
      input.parentElement.classList.remove('focused');
    });
  });
})();

/* =====================================================
   CINEMATIC REVEAL — trigger once on scroll
   ===================================================== */
(function initRevealScenes() {
  const scenes = document.querySelectorAll('.reveal-scene');
  if (!scenes.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  scenes.forEach(scene => observer.observe(scene));
})();

/* =====================================================
   INTERSECTION OBSERVER POLYFILL FALLBACK
   — If browser doesn't support it, show all elements
   ===================================================== */
if (!('IntersectionObserver' in window)) {
  document.querySelectorAll(
    '.reveal-left, .reveal-right, .reveal-up, .reveal-stagger'
  ).forEach(el => {
    el.classList.add('visible');
  });
  document.querySelectorAll('.project-row').forEach(row => {
    row.classList.add('in-view');
  });
}
