// js/lang.js
// Language selector: sets the site language, highlights the active flag,
// and persists the choice. It does NOT hide page sections.

document.addEventListener("DOMContentLoaded", () => {
  const supported = ["en", "es", "pt", "de", "fr", "ja", "hi"];
  const links = document.querySelectorAll(".lang-selector a");

  // Load preferred language (hash > localStorage > navigator)
  const stored = localStorage.getItem("site-lang");
  const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let lang = (location.hash.replace("#", "") || stored || navLang.slice(0, 2)).toLowerCase();
  if (!supported.includes(lang)) lang = "en";

  function applyLang(target) {
    document.documentElement.lang = target;
    localStorage.setItem("site-lang", target);

    // Update hash without scrolling to a section
    const url = new URL(window.location);
    url.hash = target;
    history.replaceState(null, "", url);

    // Highlight active flag
    links.forEach(a => {
      const code = a.getAttribute("href").replace("#", "");
      a.classList.toggle("active", code === target);
    });
  }

  applyLang(lang);

  // Handle clicks on flags
  links.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.getAttribute("href").replace("#", "").toLowerCase();
      if (supported.includes(target)) applyLang(target);
    });
  });

  // If hash changes manually, apply if valid; otherwise keep current
  window.addEventListener("hashchange", () => {
    const h = location.hash.replace("#", "").toLowerCase();
    if (supported.includes(h)) applyLang(h);
  });
});
