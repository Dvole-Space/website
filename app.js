// Apply saved or OS theme preference before paint (matches the personal site).
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (!t) {
      t = window.matchMedia
        && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
    }
    if (t === "dark") document.documentElement.dataset.theme = "dark";
  } catch (e) {}
})();
