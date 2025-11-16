document.addEventListener("DOMContentLoaded", () => {
  const supported = ["en", "es", "pt", "de", "fr", "ja", "hi"];
  const links = document.querySelectorAll(".lang-selector a");

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

    try {
      const response = await fetch(`i18n/${target}.json`);
      const data = await response.json();

      document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        const parts = key.split(".");
        let value = data;
        parts.forEach(p => { value = value[p]; });
        if (value) el.textContent = value;
      });
    } catch (err) {
      console.error("Error loading language file:", err);
      if (target !== "en") applyLang("en");
    }
  }

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
