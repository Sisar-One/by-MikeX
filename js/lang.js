// js/lang.js
// Detección automática de idioma y cambio manual con banderitas

document.addEventListener("DOMContentLoaded", () => {
  const supported = ["en","es","pt","de","fr","ja","hi"];
  const sections = document.querySelectorAll("main section");
  const links = document.querySelectorAll("nav .lang-selector a");

  // Detectar idioma del navegador
  let navLang = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let lang = navLang.slice(0,2).toLowerCase();
  if (!supported.includes(lang)) lang = "en";

  // Si hay hash en la URL, usarlo
  const hash = location.hash.replace("#", "");
  if (supported.includes(hash)) lang = hash;

  // Mostrar solo la sección activa
  function showSection(target) {
    sections.forEach(sec => {
      sec.style.display = (sec.id === target) ? "block" : "none";
    });
    links.forEach(a => {
      const id = a.getAttribute("href").replace("#", "");
      a.classList.toggle("active", id === target);
    });
  }

  showSection(lang);

  // Cambiar idioma manualmente con banderitas
  links.forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = a.getAttribute("href").replace("#", "");
      if (supported.includes(target)) {
        history.replaceState(null, "", "#" + target);
        showSection(target);
      }
    });
  });

  // Responder a cambios de hash (ej. usuario modifica URL)
  window.addEventListener("hashchange", () => {
    const h = location.hash.replace("#", "");
    const target = supported.includes(h) ? h : "en";
    showSection(target);
  });
});
