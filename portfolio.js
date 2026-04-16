/**
 * DESIGN INTEND — portfolio.js
 * Portfolio page: category filter, card animations, count updates
 */

'use strict';

(function initPortfolioFilter() {
  const filterBar  = document.getElementById('pfFilterBar');
  const grid       = document.getElementById('pfGrid');
  const emptyState = document.getElementById('pfEmpty');

  if (!filterBar || !grid) return;

  const filterBtns = filterBar.querySelectorAll('.pf-filter-btn');
  const cards      = grid.querySelectorAll('.pcard');

  // Transition duration must match CSS (.pcard { transition: 0.4s })
  const TRANSITION_MS = 400;

  /* ---- Filter logic ------------------------------------------ */
  function applyFilter(filter) {
    const isAll = filter === 'all';

    // Toggle grid mode so CSS removes wide-card behavior while filtered
    grid.classList.toggle('pf-grid--filtered', !isAll);

    let visibleCount = 0;

    cards.forEach(card => {
      const match = isAll || card.dataset.category === filter;

      if (match) {
        // Reveal: un-hide first, then remove the fade-out class
        card.classList.remove('pcard--gone');
        // Force a reflow so the transition fires properly
        void card.offsetWidth;
        card.classList.remove('pcard--out');
        visibleCount++;
      } else {
        // Hide: fade out, then set display:none after transition
        card.classList.add('pcard--out');
        setTimeout(() => {
          // Only hide if still filtered out (user may have switched again)
          if (card.classList.contains('pcard--out')) {
            card.classList.add('pcard--gone');
          }
        }, TRANSITION_MS);
      }
    });

    // Update empty state
    if (visibleCount === 0) {
      setTimeout(() => {
        emptyState.classList.add('visible');
      }, TRANSITION_MS);
    } else {
      emptyState.classList.remove('visible');
    }

    // Sync count badge on active button
    updateActiveCount(filter, visibleCount);
  }

  function updateActiveCount(filter, count) {
    filterBtns.forEach(btn => {
      if (btn.dataset.filter === filter) {
        const countEl = btn.querySelector('.pf-filter-count');
        if (countEl && filter !== 'all') {
          countEl.textContent = count;
        }
      }
    });
  }

  /* ---- Button click handler ----------------------------------- */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      applyFilter(filter);
    });
  });

  /* ---- Keyboard navigation for filter bar -------------------- */
  filterBar.addEventListener('keydown', (e) => {
    const btns = Array.from(filterBtns);
    const idx  = btns.indexOf(document.activeElement);
    if (idx === -1) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      btns[(idx + 1) % btns.length].focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      btns[(idx - 1 + btns.length) % btns.length].focus();
    }
  });

})();

/* =====================================================
   CARD HOVER — CARD-LINK CURSOR
   script.js already handles the global cursor expansion,
   but we need cards to also trigger cursor-hover
   ===================================================== */
(function initCardHover() {
  const cards = document.querySelectorAll('.pcard');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });
})();
