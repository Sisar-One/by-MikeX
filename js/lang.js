// js/lang.js
// Language selector: sets the site language, highlights the active flag,
// loads translations from JSON, and persists the choice.

document.addEventListener("DOMContentLoaded", () => {
  const supported = ["en", "es", "pt", "de", "fr", "ja", "hi"];
  const links = document.querySelectorAll(".lang-selector a");

  // Load preferred language (hash > localStorage > navigator)
  const stored = localStorage.getItem("site-lang");
  const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let lang = (location.hash.replace("#", "") || stored || navLang.slice(0, 2)).toLowerCase();
  if (!supported.includes(lang)) lang = "en";

  async function applyLang(target) {
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

    // Load translations from JSON
    try {
      const response = await fetch(`i18n/${target}.json`);
      const data = await response.json();

      // Navigation
      document.querySelector("nav a[href='#home']").textContent = data.nav.home;
      document.querySelector("nav a[href='#games']").textContent = data.nav.games;
      document.querySelector("nav a[href='#privacy']").textContent = data.nav.privacy;
      document.querySelector("nav a[href='#contact']").textContent = data.nav.contact;

      // Hero
      document.querySelector(".hero h1").textContent = data.hero.title;

      // Sections
      document.querySelector("#games h2").textContent = data.games.title;
      document.querySelector("#privacy h2").textContent = data.privacy.title;
      document.querySelector("#privacy p").textContent = data.privacy.text;
      document.querySelector("#contact h2").textContent = data.contact.title;
      document.querySelector("#contact p").textContent = data.contact.text;

      // Footer
      document.querySelector("footer p").textContent = data.footer.text;
    } catch (err) {
      console.error("Error loading language file:", err);
      if (target !== "en") applyLang("en"); // fallback
    }
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
