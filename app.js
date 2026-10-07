// Theme: apply the saved preference before first paint. With nothing saved,
// CSS follows the OS setting through prefers-color-scheme on its own.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  root.classList.add("js");

  try {
    var saved = localStorage.getItem(KEY);
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch (e) {}

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
  }

  function initThemeToggle() {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    function label() {
      var next = currentTheme() === "dark" ? "light" : "dark";
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
    var header = document.querySelector(".site-header");
    var ticking = false;

    function update() {
      ticking = false;
      var line = (header ? header.offsetHeight : 0) + 48;
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

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initToc();
  });
})();
