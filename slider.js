/**
 * DESIGN INTEND — slider.js
 * Cinematic full-viewport image viewer.
 * Ken Burns + crossfade + auto-advance + thumbnail filmstrip.
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
    'ambrish-hosur': {
      title: 'Ambrish Residence',
      category: 'Residential · 2024 · 3,800 sq ft · Hosur',
      images: [
        { src: 'Assets/ambrish-exterior.png',       caption: 'Exterior — Front Elevation' },
        { src: 'Assets/ambrish-foyer.png',           caption: 'Foyer' },
        { src: 'Assets/ambrish-living-room.png',     caption: 'Living Room' },
        { src: 'Assets/ambrish-livingroom1.png',     caption: 'Living Room — Second View' },
        { src: 'Assets/ambrish-upper-living.png',    caption: 'Upper Living' },
        { src: 'Assets/ambrish-dining.png',          caption: 'Dining' },
        { src: 'Assets/ambrish-kitchen.png',         caption: 'Kitchen' },
        { src: 'Assets/ambrish-master-bedroom.png',  caption: 'Master Bedroom' },
        { src: 'Assets/ambrish-bedroom-1.png',       caption: 'Bedroom' },
        { src: 'Assets/ambrish-guestroom.png',       caption: 'Guest Room' },
        { src: 'Assets/ambrish-bathroom.png',        caption: 'Bathroom' },
        { src: 'Assets/ambrish-home-theatre.png',    caption: 'Home Theatre' },
      ]
    },
    'nexus-hq': {
      title: 'Nexus Headquarters',
      category: 'Commercial · 2023 · 12,000 sq ft · Koramangala',
      images: [
        { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&auto=format&fit=crop', caption: 'Open Plan Office' },
        { src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85&auto=format&fit=crop', caption: 'Executive Suite' },
        { src: 'https://images.unsplash.com/photo-1497366754035-f200586c5497?w=1400&q=85&auto=format&fit=crop', caption: 'Collaboration Zone' },
      ]
    },
    'reddy-villa': {
      title: 'The Reddy Villa',
      category: 'Residential · 2023 · 7,200 sq ft · Sarjapur Road',
      images: [
        { src: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=1400&q=85&auto=format&fit=crop', caption: 'Master Suite' },
        { src: 'Assets/house-angle-2.png', caption: 'Exterior Elevation' },
        { src: 'Assets/house-angle-3.png', caption: 'Side View' },
      ]
    },
    'whitefield-duplex': {
      title: 'Whitefield Duplex',
      category: 'Residential · 2022 · 3,600 sq ft · Whitefield',
      images: [
        { src: 'Assets/house-angle-2.png', caption: 'Front Elevation' },
        { src: 'Assets/house-angle-3.png', caption: 'Side Angle' },
      ]
    },
    'indiranagar-penthouse': {
      title: 'Indiranagar Penthouse',
      category: 'Interiors · 2024 · 2,800 sq ft · Indiranagar',
      images: [
        { src: 'Assets/hero-living-room.png', caption: 'Main Living Space' },
        { src: 'Assets/vinutha-3d.jpg',       caption: 'Architectural Study' },
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
        { src: 'Assets/vinutha-living-room.png',   caption: 'Living Room' },
        { src: 'Assets/vinutha-living-room-1.png', caption: 'Living Room — Lounge View' },
        { src: 'Assets/vinutha-bedroom-1.png',     caption: 'Master Bedroom' },
        { src: 'Assets/vinutha-bedroom-4.png',     caption: 'Bedroom 4' },
        { src: 'Assets/vinutha-bedroom-5.png',     caption: 'Bedroom 5' },
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
        { src: 'Assets/house-angle-2.png', caption: 'East Elevation' },
        { src: 'Assets/house-angle-3.png', caption: 'North Angle' },
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
     DOM REFS
     ===================================================== */
  let overlay, stage, imgA, imgB;
  let eyebrowEl, titleEl, counterEl, captionEl;
  let progressFill, stripEl, pausedLabel;

  /* =====================================================
     STATE
     ===================================================== */
  let currentData  = null;
  let activeIndex  = 0;
  let layerActive  = 'A';   // which img layer is currently visible
  let kbVariant    = 0;
  let isAnimating  = false;
  let queuedIndex  = null;  // navigation queued during transition
  let autoTimer    = null;
  let isPaused     = false;

  const AUTO_DELAY = 6000;
  const KB_ANIMS   = ['kb0', 'kb1', 'kb2', 'kb3'];

  /* =====================================================
     BUILD OVERLAY (once)
     ===================================================== */
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'pslider-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Project gallery');

    overlay.innerHTML = `
      <div class="pslider-stage" id="psliderStage">
        <img class="pslider-img" id="psliderImgA" alt="" />
        <img class="pslider-img" id="psliderImgB" alt="" />
      </div>
      <div class="pslider-grad-top"></div>
      <div class="pslider-grad-bottom"></div>

      <header class="pslider-header">
        <div class="pslider-title-group">
          <span class="pslider-eyebrow" id="psliderEyebrow"></span>
          <h2 class="pslider-title" id="psliderTitle"></h2>
        </div>
        <div class="pslider-header-right">
          <span class="pslider-counter" id="psliderCounter"></span>
          <button class="pslider-close" id="psliderClose" aria-label="Close gallery">&#x2715;</button>
        </div>
      </header>

      <button class="pslider-arrow pslider-arrow--prev" id="psliderPrev" aria-label="Previous image">&#8592;</button>
      <button class="pslider-arrow pslider-arrow--next" id="psliderNext" aria-label="Next image">&#8594;</button>

      <div class="pslider-caption-area">
        <span class="pslider-caption" id="psliderCaption"></span>
      </div>

      <div class="pslider-bottom">
        <div class="pslider-progress">
          <div class="pslider-progress-fill" id="psliderProgress"></div>
        </div>
        <div class="pslider-strip" id="psliderStrip"></div>
      </div>

      <div class="pslider-paused-label" id="psliderPausedLabel">Paused</div>
      <span class="pslider-hint">&#8592; &#8594; navigate &nbsp;&middot;&nbsp; Space pause &nbsp;&middot;&nbsp; Esc close</span>
    `;

    document.body.appendChild(overlay);

    stage        = overlay.querySelector('#psliderStage');
    imgA         = overlay.querySelector('#psliderImgA');
    imgB         = overlay.querySelector('#psliderImgB');
    eyebrowEl    = overlay.querySelector('#psliderEyebrow');
    titleEl      = overlay.querySelector('#psliderTitle');
    counterEl    = overlay.querySelector('#psliderCounter');
    captionEl    = overlay.querySelector('#psliderCaption');
    progressFill = overlay.querySelector('#psliderProgress');
    stripEl      = overlay.querySelector('#psliderStrip');
    pausedLabel  = overlay.querySelector('#psliderPausedLabel');

    overlay.querySelector('#psliderClose').addEventListener('click', closeSlider);
    overlay.querySelector('#psliderPrev').addEventListener('click', () => navigate(-1));
    overlay.querySelector('#psliderNext').addEventListener('click', () => navigate(1));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSlider(); });
  }

  /* =====================================================
     OPEN
     ===================================================== */
  function openSlider(projectId) {
    const project = PROJECTS[projectId];
    if (!project) return;

    currentData = project;
    activeIndex = 0;
    kbVariant   = Math.floor(Math.random() * 4);
    isPaused    = false;
    isAnimating = false;
    queuedIndex = null;
    layerActive = 'A';

    // Reset both layers cleanly
    [imgA, imgB].forEach(img => {
      img.src = '';
      img.className = 'pslider-img';
      img.onload = null;
      img.onerror = null;
    });
    captionEl.classList.remove('visible');
    overlay.classList.remove('paused');

    eyebrowEl.textContent = project.category;
    titleEl.textContent   = project.title;
    counterEl.textContent = `1 / ${project.images.length}`;

    buildStrip();

    // Open overlay immediately (dark bg shows while image loads)
    requestAnimationFrame(() => overlay.classList.add('open'));
    document.body.style.overflow = 'hidden';

    // Load first image into layer A — fade in when ready
    loadIntoLayer(imgA, project.images[0], () => {
      imgA.classList.add('visible');
      updateCaption(project.images[0].caption);
      startAuto();
    });

    // Preload image 2 in background
    preload(1);
  }

  /* =====================================================
     CLOSE
     ===================================================== */
  function closeSlider() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    stopAuto();

    setTimeout(() => {
      [imgA, imgB].forEach(img => {
        img.src = '';
        img.className = 'pslider-img';
        img.onload = null;
        img.onerror = null;
      });
      stripEl.innerHTML = '';
      captionEl.classList.remove('visible');
      overlay.classList.remove('paused');
      progressFill.classList.remove('running');
    }, 450);
  }

  /* =====================================================
     NAVIGATE (wraps setActive + restarts auto)
     ===================================================== */
  function navigate(dir) {
    const total = currentData.images.length;
    setActive((activeIndex + dir + total) % total);
    if (!isPaused) restartAuto();
  }

  /* =====================================================
     SET ACTIVE — crossfade with Ken Burns
     ===================================================== */
  function setActive(index) {
    const total = currentData.images.length;
    const target = (index + total) % total;

    if (isAnimating) {
      queuedIndex = target; // store latest requested index
      return;
    }

    queuedIndex  = null;
    isAnimating  = true;
    activeIndex  = target;

    const inLayer  = layerActive === 'A' ? imgB : imgA;
    const outLayer = layerActive === 'A' ? imgA : imgB;
    const imgData  = currentData.images[activeIndex];

    captionEl.classList.remove('visible');

    loadIntoLayer(inLayer, imgData, () => {
      // Crossfade: bring in new, fade out old
      inLayer.classList.add('visible');
      outLayer.classList.remove('visible');
      layerActive = layerActive === 'A' ? 'B' : 'A';

      updateCounter();
      updateStrip();
      updateCaption(imgData.caption);

      // Preload next image while user is viewing current
      preload((activeIndex + 1) % total);

      setTimeout(() => {
        isAnimating = false;
        // Clean KB classes from outLayer for next use
        KB_ANIMS.forEach(c => outLayer.classList.remove(c));

        // Process queued navigation if any
        if (queuedIndex !== null) {
          const qi = queuedIndex;
          queuedIndex = null;
          setActive(qi);
        }
      }, 950);
    });
  }

  /* =====================================================
     LOAD IMAGE INTO LAYER
     Sets src, waits for load, applies Ken Burns, calls cb
     ===================================================== */
  function loadIntoLayer(imgEl, imgData, cb) {
    KB_ANIMS.forEach(c => imgEl.classList.remove(c));
    imgEl.classList.remove('visible');
    imgEl.onload  = null;
    imgEl.onerror = null;

    function onReady() {
      imgEl.onload  = null;
      imgEl.onerror = null;
      // Force reflow so CSS animation restarts from frame 0
      void imgEl.offsetWidth;
      imgEl.classList.add(KB_ANIMS[kbVariant % 4]);
      kbVariant++;
      cb();
    }

    imgEl.onload  = onReady;
    imgEl.onerror = onReady; // still advance if image 404s
    imgEl.alt     = imgData.caption;
    imgEl.src     = imgData.src;

    // If image already cached, onload may not fire — check complete
    if (imgEl.complete && imgEl.naturalWidth > 0) {
      imgEl.onload  = null;
      imgEl.onerror = null;
      void imgEl.offsetWidth;
      imgEl.classList.add(KB_ANIMS[kbVariant % 4]);
      kbVariant++;
      cb();
    }
  }

  /* =====================================================
     PRELOAD (background fetch into browser cache)
     ===================================================== */
  function preload(index) {
    const imgData = currentData.images[index];
    if (!imgData) return;
    const img = new Image();
    img.src = imgData.src;
  }

  /* =====================================================
     BUILD THUMBNAIL STRIP
     ===================================================== */
  function buildStrip() {
    stripEl.innerHTML = '';
    currentData.images.forEach((imgData, i) => {
      const btn = document.createElement('button');
      btn.className = 'pslider-thumb' + (i === 0 ? ' active' : '');
      btn.setAttribute('aria-label', `View image ${i + 1}: ${imgData.caption}`);
      btn.addEventListener('click', () => {
        setActive(i);
        if (!isPaused) restartAuto();
      });
      stripEl.appendChild(btn);

      // Stagger thumbnail bg loads to avoid network burst
      setTimeout(() => {
        btn.style.backgroundImage = `url('${imgData.src}')`;
        btn.classList.add('loaded');
      }, i * 200 + 400);
    });
  }

  /* =====================================================
     UPDATE HELPERS
     ===================================================== */
  function updateStrip() {
    const thumbs = stripEl.querySelectorAll('.pslider-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === activeIndex));
    thumbs[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function updateCaption(text) {
    captionEl.textContent = text;
    // Double RAF ensures transition triggers after DOM paint
    requestAnimationFrame(() => requestAnimationFrame(() => captionEl.classList.add('visible')));
  }

  function updateCounter() {
    counterEl.textContent = `${activeIndex + 1} / ${currentData.images.length}`;
  }

  /* =====================================================
     AUTO-ADVANCE
     ===================================================== */
  function startAuto() {
    stopAuto();
    restartProgress();
    autoTimer = setTimeout(() => {
      navigate(1);
      if (!isPaused) startAuto();
    }, AUTO_DELAY);
  }

  function stopAuto() {
    clearTimeout(autoTimer);
    autoTimer = null;
  }

  function restartAuto() {
    stopAuto();
    startAuto();
  }

  function restartProgress() {
    progressFill.classList.remove('running');
    void progressFill.offsetWidth; // force reflow to restart animation
    progressFill.classList.add('running');
  }

  function togglePause() {
    isPaused = !isPaused;
    overlay.classList.toggle('paused', isPaused);
    if (isPaused) {
      stopAuto();
      progressFill.classList.remove('running');
    } else {
      startAuto();
    }
  }

  /* =====================================================
     KEYBOARD
     ===================================================== */
  document.addEventListener('keydown', (e) => {
    if (!overlay?.classList.contains('open')) return;
    if (e.key === 'Escape')     { closeSlider(); return; }
    if (e.key === 'ArrowRight') { navigate(1); return; }
    if (e.key === 'ArrowLeft')  { navigate(-1); return; }
    if (e.key === ' ')          { e.preventDefault(); togglePause(); }
  });

  /* =====================================================
     TOUCH SWIPE
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
    delta < 0 ? navigate(1) : navigate(-1);
  }, { passive: true });

  /* =====================================================
     WIRE ALL [data-project] TRIGGERS
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
