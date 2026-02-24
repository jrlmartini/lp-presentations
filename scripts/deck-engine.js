/**
 * Deck Engine — Launchpad Hub Presentation System
 *
 * Shared slide navigation, build-step reveals, progress bar,
 * keyboard shortcuts, and fullscreen toggle.
 *
 * Usage: include at the end of <body> after the .deck and .controls markup.
 *   <script src="../scripts/deck-engine.js"></script>
 *
 * Expected DOM:
 *   .deck > .slide[data-build="N"]   — slide sections
 *   #progressBar                      — progress bar <span>
 *   #prevBtn, #nextBtn, #kioskBtn     — navigation buttons
 *
 * Keyboard:
 *   ArrowRight / Space / PageDown → next build step or slide
 *   ArrowLeft / PageUp            → previous build step or slide
 *   F                             → toggle fullscreen
 */

(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const progressBar = document.getElementById("progressBar");
  let currentSlide = 0;
  let buildStep = 0;

  /* ── helpers ── */
  const stepElements = (slide, step) =>
    Array.from(slide.querySelectorAll(`[data-step="${step}"]`));

  const setProgress = () => {
    const value = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${value}%`;
  };

  const clearBuild = (slide) => {
    slide.querySelectorAll("[data-step]").forEach((el) => {
      el.classList.remove("is-visible", "build-in");
    });
  };

  const revealStep = (slide, step, animate = true) => {
    stepElements(slide, step).forEach((el) => {
      el.classList.add("is-visible");
      if (animate) {
        el.classList.remove("build-in");
        void el.offsetWidth; // force reflow for re-animation
        el.classList.add("build-in");
      }
    });
  };

  const hideStep = (slide, step) => {
    stepElements(slide, step).forEach((el) => {
      el.classList.remove("is-visible", "build-in");
    });
  };

  /* ── core navigation ── */
  const activateSlide = (idx, withFinalState = false) => {
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    currentSlide = idx;
    clearBuild(slides[idx]);

    const max = Number(slides[idx].dataset.build || 0);
    buildStep = withFinalState ? max : 0;
    for (let step = 1; step <= buildStep; step += 1) {
      revealStep(slides[idx], step, false);
    }

    setProgress();
  };

  const next = () => {
    const slide = slides[currentSlide];
    const maxBuild = Number(slide.dataset.build || 0);
    if (buildStep < maxBuild) {
      buildStep += 1;
      revealStep(slide, buildStep, true);
      return;
    }
    if (currentSlide < slides.length - 1) activateSlide(currentSlide + 1);
  };

  const prev = () => {
    if (buildStep > 0) {
      hideStep(slides[currentSlide], buildStep);
      buildStep -= 1;
      return;
    }
    if (currentSlide > 0) activateSlide(currentSlide - 1, true);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  /* ── bind controls ── */
  document.getElementById("nextBtn").addEventListener("click", next);
  document.getElementById("prevBtn").addEventListener("click", prev);
  document.getElementById("kioskBtn").addEventListener("click", toggleFullscreen);

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "ArrowRight" ||
      e.key === "PageDown" ||
      e.key === " "
    ) {
      e.preventDefault();
      next();
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      prev();
    }
    if (e.key.toLowerCase() === "f") toggleFullscreen();
  });

  /* ── init ── */
  activateSlide(0);
})();
