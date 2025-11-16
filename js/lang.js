// js/lang.js
// Language selector: sets the site language, highlights the active flag,
// loads translations from JSON using data-key attributes, and persists the choice.

document.addEventListener("DOMContentLoaded", () => {
  const supported = ["en", "es", "pt", "de", "fr", "ja", "hi"];
  const links = document.querySelectorAll(".lang-selector a");

  // Load preferred language (localStorage > navegador)
  const stored = localStorage.getItem("site-lang");
  const navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let lang = (stored || navLang.slice(0, 2)).toLowerCase();
  if (!supported.includes(lang)) lang = "en";

  async function applyLang(target) {
    document.documentElement.lang = target;
    localStorage.setItem("site-lang", target);

    // Highlight active flag
    links.forEach(a => {
      const code = a.dataset.lang;
      a.classList.toggle("active", code === target);
    });

    // Load translations
    try {
      const response = await fetch(`i18n/${target}.json`);
      const data = await response.json();

      // Recorre todos los elementos con data-key y aplica traducción
      document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        const parts = key.split(".");
        let value = data;
        parts.forEach(p => { value = value[p]; });
        if (value) el.textContent = value;
      });
    } catch (err) {
      console.error("Error loading language file:", err);
      if (target !== "en") applyLang("en"); // fallback
    }
  }

  // Aplica idioma inicial
  applyLang(lang);

  // Handle clicks on flags
  links.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.dataset.lang.toLowerCase();
      if (supported.includes(target)) applyLang(target);
    });
  });
});
