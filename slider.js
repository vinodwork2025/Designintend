/**
 * DESIGN INTEND — slider.js
 * Expanding-panel project image lightbox. Pure vanilla JS.
 * Inspired by interactive selector (accordion expand mechanic).
 */

'use strict';

(function initProjectSlider() {

  /* =====================================================
     PROJECT DATA
     ===================================================== */
  const PROJECTS = {
    'vinutha-residence': {
      title: 'Vinutha Residence',
      category: 'Residential · 2024 · 4,200 sq ft · Bengaluru',
      images: [
        { src: 'Assets/vinutha-exterior.png',       caption: 'Exterior — Front Elevation' },
        { src: 'Assets/vinutha-living-room.png',    caption: 'Living Room' },
        { src: 'Assets/vinutha-living-room-1.png',  caption: 'Living Room — Lounge View' },
        { src: 'Assets/vinutha-bedroom-1.png',      caption: 'Master Bedroom' },
        { src: 'Assets/vinutha-bedroom-4.png',      caption: 'Bedroom 4' },
        { src: 'Assets/vinutha-bedroom-5.png',      caption: 'Bedroom 5' },
        { src: 'Assets/vinutha-bedroom-6.png',      caption: 'Bedroom 6' },
        { src: 'Assets/vinutha-bedroom-7.png',      caption: 'Bedroom 7' },
      ]
    },
    'nexus-hq': {
      title: 'Nexus Headquarters',
      category: 'Commercial · 2023 · 12,000 sq ft · Koramangala',
      images: [
        { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1100&q=80&auto=format&fit=crop', caption: 'Open Plan Office' },
        { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1100&q=80&auto=format&fit=crop', caption: 'Executive Suite' },
        { src: 'https://images.unsplash.com/photo-1497366754035-f200586c5497?w=1100&q=80&auto=format&fit=crop', caption: 'Collaboration Zone' },
      ]
    },
    'reddy-villa': {
      title: 'The Reddy Villa',
      category: 'Residential · 2023 · 7,200 sq ft · Sarjapur Road',
      images: [
        { src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1100&q=80&auto=format&fit=crop', caption: 'Master Suite' },
        { src: 'Assets/house-angle-2.png',     caption: 'Exterior Elevation' },
        { src: 'Assets/house-angle-3.png',     caption: 'Side View' },
      ]
    },
    'whitefield-duplex': {
      title: 'Whitefield Duplex',
      category: 'Residential · 2022 · 3,600 sq ft · Whitefield',
      images: [
        { src: 'Assets/house-angle-2.png',     caption: 'Front Elevation' },
        { src: 'Assets/house-angle-3.png',     caption: 'Side Angle' },
      ]
    },
    'indiranagar-penthouse': {
      title: 'Indiranagar Penthouse',
      category: 'Interiors · 2024 · 2,800 sq ft · Indiranagar',
      images: [
        { src: 'Assets/hero-living-room.png',  caption: 'Main Living Space' },
        { src: 'Assets/vinutha-3d.jpg',        caption: 'Architectural Study' },
      ]
    },
    'hosur-garden': {
      title: 'Hosur Garden Home',
      category: 'Residential · 2023 · 5,100 sq ft · Hosur',
      images: [
        { src: 'Assets/b9cdaee7-a780-4550-b2f3-5092380e7386.jpg.jpeg', caption: 'Design Render' },
        { src: 'Assets/00876491-c1ca-4ca2-a4f2-77c3b4be29e7.jpg.jpeg', caption: 'As Built — Exterior' },
      ]
    },
    'vinutha-interior': {
      title: 'Vinutha — Interior Study',
      category: 'Interiors · 2023 · 4,200 sq ft · Bengaluru',
      images: [
        { src: 'Assets/vinutha-living-room.png',    caption: 'Living Room' },
        { src: 'Assets/vinutha-living-room-1.png',  caption: 'Living Room — Lounge View' },
        { src: 'Assets/vinutha-bedroom-1.png',      caption: 'Master Bedroom' },
        { src: 'Assets/vinutha-bedroom-4.png',      caption: 'Bedroom 4' },
        { src: 'Assets/vinutha-bedroom-5.png',      caption: 'Bedroom 5' },
      ]
    },
    'electronic-city': {
      title: 'Electronic City Bungalow',
      category: 'Residential · 2021 · 4,800 sq ft · Electronic City',
      images: [
        { src: 'Assets/00876491-c1ca-4ca2-a4f2-77c3b4be29e7.jpg.jpeg', caption: 'Completed Exterior' },
        { src: 'Assets/39d2b1d4-1451-421d-9930-ec00c58c20df.jpg.jpeg', caption: 'Construction — Phase 3' },
        { src: 'Assets/af116460-fccb-46c1-9bc8-347eb8fcb75b.jpg.jpeg', caption: 'Construction — Phase 2' },
        { src: 'Assets/13498588-842c-476b-9b7f-6982b9167f4f.jpg.jpeg', caption: 'Construction — Phase 1' },
      ]
    },
    'hsr-courtyard': {
      title: 'HSR Courtyard Home',
      category: 'Residential · 2021 · 3,200 sq ft · HSR Layout',
      images: [
        { src: 'Assets/r22.jpg.jpeg',          caption: 'Exterior' },
        { src: 'Assets/d313f856-ac9e-42a2-94ce-a1acad50bcb8.jpg.jpeg', caption: 'Construction — Phase 2' },
        { src: 'Assets/c5f5fa9b-4b6d-4c5c-9f3c-eced892e0a17.jpg.jpeg', caption: 'Construction — Phase 1' },
      ]
    },
    'whitefield-east': {
      title: 'Whitefield House — East Elevation',
      category: 'Residential · 2022 · 3,600 sq ft · Whitefield',
      images: [
        { src: 'Assets/house-angle-2.png',     caption: 'East Elevation' },
        { src: 'Assets/house-angle-3.png',     caption: 'North Angle' },
      ]
    },
    'hosur-boutique': {
      title: 'Hosur Boutique Residence',
      category: 'Residential · 2025 · 2,900 sq ft · Hosur',
      images: [
        { src: 'Assets/WhatsApp%20Image%202026-04-06%20at%204.20.52%20PM.jpeg', caption: 'Completed Build' },
        { src: 'Assets/f5a38032-96be-4c13-8ae5-690cfca34496.jpg.jpeg',          caption: 'Construction — Final Phase' },
        { src: 'Assets/d313f856-ac9e-42a2-94ce-a1acad50bcb8.jpg.jpeg',          caption: 'Construction — Mid Phase' },
      ]
    },
    'hosur-creative': {
      title: 'Hosur Creative Studio',
      category: 'Commercial · 2025 · 1,800 sq ft · Hosur',
      images: [
        { src: 'Assets/WhatsApp%20Image%202026-04-06%20at%204.21.03%20PM.jpeg', caption: 'Completed Studio' },
        { src: 'Assets/b9cdaee7-a780-4550-b2f3-5092380e7386.jpg.jpeg',          caption: 'Design Concept' },
      ]
    },
  };

  /* =====================================================
     STATE
     ===================================================== */
  let overlay      = null;
  let panelsWrap   = null;
  let dotsWrap     = null;
  let titleEl      = null;
  let eyebrowEl    = null;
  let currentData  = null;
  let activeIndex  = 0;

  /* =====================================================
     BUILD OVERLAY (once, on init)
     ===================================================== */
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'pslider-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Project image gallery');

    overlay.innerHTML = `
      <div class="pslider-header">
        <div class="pslider-title-group">
          <span class="pslider-eyebrow" id="psliderEyebrow"></span>
          <h2 class="pslider-title" id="psliderTitle"></h2>
        </div>
        <button class="pslider-close" id="psliderClose" aria-label="Close gallery">&#x2715;</button>
      </div>
      <div class="pslider-panels" id="psliderPanels"></div>
      <div class="pslider-footer" id="psliderDots"></div>
      <span class="pslider-hint">← → to navigate &nbsp;·&nbsp; Esc to close</span>
    `;

    document.body.appendChild(overlay);

    eyebrowEl  = overlay.querySelector('#psliderEyebrow');
    titleEl    = overlay.querySelector('#psliderTitle');
    panelsWrap = overlay.querySelector('#psliderPanels');
    dotsWrap   = overlay.querySelector('#psliderDots');

    overlay.querySelector('#psliderClose').addEventListener('click', closeSlider);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSlider();
    });
  }

  /* =====================================================
     OPEN
     ===================================================== */
  function openSlider(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    currentData = project;
    activeIndex = 0;

    eyebrowEl.textContent = project.category;
    titleEl.textContent   = project.title;

    renderPanels();
    renderDots();

    requestAnimationFrame(() => {
      overlay.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  /* =====================================================
     CLOSE
     ===================================================== */
  function closeSlider() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      panelsWrap.innerHTML = '';
      dotsWrap.innerHTML   = '';
    }, 420);
  }

  /* =====================================================
     RENDER PANELS
     ===================================================== */
  function renderPanels() {
    panelsWrap.innerHTML = '';
    const images = currentData.images;

    images.forEach((img, i) => {
      const panel = document.createElement('div');
      panel.className = 'pslider-panel' + (i === 0 ? ' active' : '');
      panel.style.backgroundImage = `url('${img.src}')`;
      panel.setAttribute('role', 'button');
      panel.setAttribute('tabindex', '0');
      panel.setAttribute('aria-label', img.caption);

      const numLabel = String(i + 1).padStart(2, '0');

      panel.innerHTML = `
        <div class="pslider-panel-shadow"></div>
        <div class="pslider-panel-vnum">${numLabel}</div>
        <div class="pslider-label">
          <div class="pslider-label-inner">
            <span class="pslider-label-num">${numLabel}</span>
            <div class="pslider-label-text">
              <span class="pslider-label-caption">${img.caption}</span>
              <span class="pslider-label-count">${i + 1} / ${images.length}</span>
            </div>
          </div>
        </div>
      `;

      panel.addEventListener('click', () => setActive(i));
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') setActive(i);
      });

      panelsWrap.appendChild(panel);
    });
  }

  /* =====================================================
     RENDER DOTS
     ===================================================== */
  function renderDots() {
    dotsWrap.innerHTML = '';
    currentData.images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'pslider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Image ${i + 1}`);
      dot.addEventListener('click', () => setActive(i));
      dotsWrap.appendChild(dot);
    });
  }

  /* =====================================================
     SET ACTIVE PANEL
     ===================================================== */
  function setActive(index) {
    const panels = panelsWrap.querySelectorAll('.pslider-panel');
    const dots   = dotsWrap.querySelectorAll('.pslider-dot');

    panels[activeIndex]?.classList.remove('active');
    dots[activeIndex]?.classList.remove('active');

    activeIndex = (index + currentData.images.length) % currentData.images.length;

    panels[activeIndex]?.classList.add('active');
    dots[activeIndex]?.classList.add('active');
  }

  /* =====================================================
     KEYBOARD NAVIGATION
     ===================================================== */
  document.addEventListener('keydown', (e) => {
    if (!overlay?.classList.contains('open')) return;
    if (e.key === 'Escape')      closeSlider();
    if (e.key === 'ArrowRight')  setActive(activeIndex + 1);
    if (e.key === 'ArrowLeft')   setActive(activeIndex - 1);
  });

  /* =====================================================
     TOUCH SWIPE SUPPORT
     ===================================================== */
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    if (!overlay?.classList.contains('open')) return;
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (!overlay?.classList.contains('open')) return;
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) < 40) return;
    delta < 0 ? setActive(activeIndex + 1) : setActive(activeIndex - 1);
  }, { passive: true });

  /* =====================================================
     WIRE UP ALL [data-project] TRIGGERS
     ===================================================== */
  function wireLinks() {
    document.querySelectorAll('[data-project]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openSlider(el.dataset.project);
      });
    });
  }

  /* =====================================================
     INIT
     ===================================================== */
  buildOverlay();
  wireLinks();

})();
