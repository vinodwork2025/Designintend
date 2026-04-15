/**
 * DESIGN INTEND — hero-fs.js
 * Full-Screen Cinematic Hero
 *
 * Features:
 *   • rAF-driven Ken Burns (scale + directional drift, per slide)
 *   • rAF cross-fade slide transitions with cubic ease
 *   • Mouse-tracking parallax (bg moves less = appears far, text moves
 *     opposite = appears close → foreground faster than background)
 *   • Camera shake (sub-pixel sine oscillation)
 *   • Drag / swipe to navigate (mouse + touch)
 *   • Hover zoom (scale boost on mouse-enter)
 *   • Bloom pulse (radial glow, intensity breathes via sine)
 *   • Auto-advance with progress-bar dot indicator
 *   • Keyboard navigation (← →)
 *   • One-shot content entrance animation
 */

'use strict';

(function HeroFS() {

  /* ====================================================
     ELEMENTS
  ==================================================== */
  const hero    = document.querySelector('.hfs');
  if (!hero) return;

  const track   = hero.querySelector('.hfs-track');
  const slides  = Array.from(hero.querySelectorAll('.hfs-slide'));
  const layers  = slides.map(s => s.querySelector('.hfs-layer'));
  const imgs    = slides.map(s => s.querySelector('.hfs-img'));
  const dots    = Array.from(hero.querySelectorAll('.hfs-dot'));
  const bloom   = hero.querySelector('.hfs-bloom');
  const content = hero.querySelector('.hfs-content');
  const hint    = hero.querySelector('.hfs-drag-hint');
  const counter = hero.querySelector('.hfs-counter-current');
  const N       = slides.length;

  /* ====================================================
     CONFIG
  ==================================================== */
  const CFG = {
    TRANSITION_MS:  1300,   // cross-fade duration
    AUTO_MS:        5500,   // auto-advance interval
    DRAG_PX:        55,     // min drag distance to trigger slide change
    BG_PARALLAX:    0.025,  // bg layer parallax multiplier (lower = subtler)
    FG_PARALLAX:    0.007,  // content counter-parallax multiplier
    LERP_SPEED:     0.065,  // parallax lerp smoothness (lower = more lag)
    SHAKE_AMP:      0.65,   // camera shake amplitude in px
    HOVER_SCALE:    1.018,  // extra scale factor while hovering
    KB_SCALE_MIN:   1.08,   // Ken Burns start scale
    KB_SCALE_MAX:   1.17,   // Ken Burns end scale
    KB_CYCLE_MS:    15000,  // Ken Burns full ping-pong cycle duration
  };

  /* ====================================================
     KEN BURNS CONFIG
     Each slide has a unique start→end translate path
  ==================================================== */
  const KB_PATHS = [
    { fromTx:  0.0, fromTy:  0.0, toTx: -1.4, toTy: -0.9 },  // slide 0
    { fromTx:  1.2, fromTy: -0.8, toTx: -0.8, toTy:  0.7 },  // slide 1
    { fromTx: -1.0, fromTy:  0.6, toTx:  1.1, toTy: -0.7 },  // slide 2
  ];

  /* ====================================================
     BLOOM CONFIG
     Approximate position of brightest area per slide
  ==================================================== */
  const BLOOM_POS = [
    [70, 20],   // slide 0 — top-right sky/light
    [25, 18],   // slide 1 — top-left
    [62, 30],   // slide 2 — upper-centre
  ];

  /* ====================================================
     STATE
  ==================================================== */
  let current      = 0;
  let isTransition = false;
  let autoTimer    = null;
  let rafId        = null;
  let isHovered    = false;
  let hintGone     = false;

  // Parallax — lerped toward mouse target
  let tPX = 0, tPY = 0;  // target (raw mouse offset from centre)
  let pX  = 0, pY  = 0;  // current (smoothed)

  // Drag / swipe
  let dragStart  = 0;
  let dragCurr   = 0;
  let dragging   = false;

  // Per-slide Ken Burns time tracking
  const kbStart = new Array(N).fill(null);

  /* ====================================================
     HELPERS
  ==================================================== */
  function lerp(a, b, t) { return a + (b - a) * t; }

  /** Cubic ease-in-out: 0→1 */
  function easeInOut(p) {
    return p < 0.5 ? 4*p*p*p : 1 - (-2*p+2)**3 / 2;
  }

  /** Get clientX from mouse or touch event */
  function clientX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
  }

  /* ====================================================
     SLIDE TRANSITION
     rAF cross-fade with cubic easing
  ==================================================== */
  function goTo(idx) {
    if (isTransition || idx === current) return;
    isTransition = true;
    clearAuto();

    const fromIdx = current;
    const toIdx   = idx;

    // Reset KB timer for the incoming slide so it starts fresh
    kbStart[toIdx] = null;

    // Ensure incoming slide is visible in DOM stack
    slides[toIdx].style.opacity = '0';

    const tStart = performance.now();

    (function fadeStep(now) {
      const raw = (now - tStart) / CFG.TRANSITION_MS;
      const p   = Math.min(raw, 1);
      const e   = easeInOut(p);

      slides[fromIdx].style.opacity = String(1 - e);
      slides[toIdx].style.opacity   = String(e);

      // Cross-fade the bloom too
      updateBloom(fromIdx, 1 - e);

      if (p < 1) {
        requestAnimationFrame(fadeStep);
      } else {
        // Finalise
        slides[fromIdx].style.opacity = '0';
        slides[toIdx].style.opacity   = '1';
        current      = toIdx;
        isTransition = false;
        updateDots();
        updateCounter();
        updateBloom(current, 1);
        scheduleAuto();
      }
    })(tStart);
  }

  /* ====================================================
     KEN BURNS — rAF per slide
     Ping-pong: from → to → from … using the elapsed time
  ==================================================== */
  function tickKenBurns(now) {
    slides.forEach((slide, i) => {
      const img = imgs[i];
      if (!img) return;

      // Skip slides that are fully hidden (not current, not transitioning)
      const opacity = parseFloat(slide.style.opacity ?? (i === current ? 1 : 0));
      if (opacity === 0 && i !== current) {
        kbStart[i] = null;  // will restart fresh when next revealed
        return;
      }

      // Start timer on first frame this slide is visible
      if (kbStart[i] === null) kbStart[i] = now;

      const elapsed = now - kbStart[i];
      const path    = KB_PATHS[i % KB_PATHS.length];

      // Normalise elapsed into ping-pong [0→1→0] based on cycle duration
      const cycle = (elapsed % CFG.KB_CYCLE_MS) / (CFG.KB_CYCLE_MS / 2);
      const ping  = cycle <= 1 ? cycle : 2 - cycle;
      const e     = easeInOut(ping);

      const scale = lerp(CFG.KB_SCALE_MIN, CFG.KB_SCALE_MAX, e);
      const tx    = lerp(path.fromTx, path.toTx, e);
      const ty    = lerp(path.fromTy, path.toTy, e);

      // Extra scale while hovering
      const hoverBoost = isHovered ? CFG.HOVER_SCALE : 1;

      img.style.transform = `scale(${(scale * hoverBoost).toFixed(4)}) translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%)`;
    });
  }

  /* ====================================================
     PARALLAX + CAMERA SHAKE — rAF
     Background moves with mouse (but less) → appears far.
     Content moves opposite → appears close.
     Net effect: foreground moves faster than background.
  ==================================================== */
  function tickParallax(now) {
    // Smoothly interpolate toward mouse target
    pX = lerp(pX, tPX, CFG.LERP_SPEED);
    pY = lerp(pY, tPY, CFG.LERP_SPEED);

    // Camera shake — two overlapping sine waves per axis
    const sx = (Math.sin(now * 0.00089) + Math.sin(now * 0.00163) * 0.45) * CFG.SHAKE_AMP;
    const sy = (Math.cos(now * 0.00097) + Math.cos(now * 0.00141) * 0.40) * CFG.SHAKE_AMP;

    // Background layers (appear far — move same direction as mouse, less range)
    layers.forEach(layer => {
      if (!layer) return;
      const bx = pX * CFG.BG_PARALLAX + sx;
      const by = pY * CFG.BG_PARALLAX + sy;
      layer.style.transform = `translate(${bx.toFixed(2)}px, ${by.toFixed(2)}px)`;
    });

    // Content (appear close — counter-move, more range per unit)
    if (content) {
      const fx = -pX * CFG.FG_PARALLAX + sx * 0.15;
      const fy = -pY * CFG.FG_PARALLAX + sy * 0.15;
      content.style.transform = `translate(${fx.toFixed(2)}px, ${fy.toFixed(2)}px)`;
    }
  }

  /* ====================================================
     BLOOM — radial warm glow near bright image areas
     Pulses gently via a slow sine wave
  ==================================================== */
  function updateBloom(idx, baseAlpha) {
    if (!bloom) return;
    const [cx, cy] = BLOOM_POS[idx % BLOOM_POS.length];
    // Subtle breathing pulse
    const pulse = baseAlpha * (0.82 + Math.sin(performance.now() * 0.00048) * 0.14);
    bloom.style.background = `
      radial-gradient(
        circle at ${cx}% ${cy}%,
        rgba(255,230,155, ${(0.20 * pulse).toFixed(3)}) 0%,
        rgba(255,200, 90, ${(0.07 * pulse).toFixed(3)}) 28%,
        rgba(200,160, 60, ${(0.02 * pulse).toFixed(3)}) 50%,
        transparent 68%
      )
    `;
  }

  /* ====================================================
     MAIN RAF LOOP
  ==================================================== */
  function loop(now) {
    tickKenBurns(now);
    tickParallax(now);
    if (!isTransition) updateBloom(current, 1);
    rafId = requestAnimationFrame(loop);
  }

  /* ====================================================
     DRAG / SWIPE
  ==================================================== */
  hero.addEventListener('mousedown', e => {
    dragging   = true;
    dragStart  = dragCurr = clientX(e);
    hero.classList.add('is-dragging');
    clearAuto();
    hideHint();
  });

  window.addEventListener('mousemove', e => {
    // Update parallax target continuously
    const rect = hero.getBoundingClientRect();
    if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
      tPX = e.clientX - (rect.left + rect.width  * 0.5);
      tPY = e.clientY - (rect.top  + rect.height * 0.5);
    }
    if (dragging) dragCurr = clientX(e);
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    hero.classList.remove('is-dragging');
    resolveDrag();
  });

  hero.addEventListener('touchstart', e => {
    dragging  = true;
    dragStart = dragCurr = clientX(e);
    clearAuto();
  }, { passive: true });

  hero.addEventListener('touchmove', e => {
    if (!dragging) return;
    dragCurr = clientX(e);
    hideHint();
  }, { passive: true });

  hero.addEventListener('touchend', () => {
    if (!dragging) return;
    dragging = false;
    resolveDrag();
  });

  function resolveDrag() {
    const delta = dragCurr - dragStart;
    if (Math.abs(delta) >= CFG.DRAG_PX) {
      goTo(delta < 0
        ? (current + 1) % N             // drag left → next
        : (current - 1 + N) % N         // drag right → prev
      );
    } else {
      scheduleAuto();
    }
  }

  /* ====================================================
     HOVER STATE
  ==================================================== */
  hero.addEventListener('mouseenter', () => { isHovered = true;  });
  hero.addEventListener('mouseleave', () => {
    isHovered = false;
    tPX = 0;
    tPY = 0;   // centre parallax when cursor leaves
  });

  /* ====================================================
     KEYBOARD NAVIGATION
  ==================================================== */
  hero.setAttribute('tabindex', '0');
  hero.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo((current - 1 + N) % N);
    if (e.key === 'ArrowRight') goTo((current + 1) % N);
  });

  /* ====================================================
     DOT INDICATORS
  ==================================================== */
  function updateDots() {
    dots.forEach((d, i) => {
      const active = i === current;
      d.classList.toggle('is-active', active);
      d.setAttribute('aria-selected', String(active));
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i));
  });

  /* ====================================================
     SLIDE COUNTER
  ==================================================== */
  function updateCounter() {
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  }

  /* ====================================================
     AUTO-ADVANCE
  ==================================================== */
  function scheduleAuto() {
    clearAuto();
    autoTimer = setTimeout(() => goTo((current + 1) % N), CFG.AUTO_MS);
  }

  function clearAuto() {
    clearTimeout(autoTimer);
  }

  /* ====================================================
     DRAG HINT
  ==================================================== */
  function hideHint() {
    if (!hint || hintGone) return;
    hintGone = true;
    hint.classList.add('is-gone');
  }

  // Auto-hide hint after first auto-advance
  setTimeout(hideHint, CFG.AUTO_MS + 1000);

  /* ====================================================
     INIT
  ==================================================== */
  function init() {
    // Set initial opacity — only slide 0 visible
    slides.forEach((s, i) => {
      s.style.opacity = i === 0 ? '1' : '0';
    });

    updateDots();
    updateCounter();
    updateBloom(0, 1);

    // Entrance animation — trigger after loader clears (~350ms)
    setTimeout(() => {
      if (content) content.classList.add('is-visible');
    }, 380);

    // Start the main loop
    rafId = requestAnimationFrame(loop);
    scheduleAuto();
  }

  // Fire on window load (images may still be loading)
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init, { once: true });
  }

})();
