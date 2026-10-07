// Theme: light by default; apply a saved preference before first paint.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  root.classList.add("js");

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (e) {}

  function currentTheme() {
    return root.dataset.theme === "dark" ? "dark" : "light";
  }

  function initThemeToggle() {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    function label() {
      var next = currentTheme() === "dark" ? "light" : "dark";
      button.textContent = next.charAt(0).toUpperCase() + next.slice(1) + " theme";
      button.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
    label();
  }

  // Local table of contents: mark the section currently being read.
  function initToc() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
    if (!links.length) return;

    var sections = links.map(function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    });
    var ticking = false;

    function update() {
      ticking = false;
      var line = Math.min(160, window.innerHeight * 0.3);
      var active = -1;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i] && sections[i].getBoundingClientRect().top <= line) active = i;
      }
      var atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atEnd && active > -1) active = sections.length - 1;
      links.forEach(function (a, i) {
        if (i === active) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  // Diagrams fade or draw in once, the first time they come into view.
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    items.forEach(function (el) { observer.observe(el); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initToc();
    initReveal();
  });
})();
