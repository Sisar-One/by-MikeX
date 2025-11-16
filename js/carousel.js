// js/carousel.js
async function loadGames() {
  try {
    const carousel = document.getElementById("carousel");
    const src = carousel.getAttribute("data-src");
    const response = await fetch(src);
    const games = await response.json();

    carousel.innerHTML = "";

    if (!games || !games.length) {
      carousel.innerHTML = "<p>No games available at the moment.</p>";
      return;
    }

    games.forEach(game => {
      const wrapper = document.createElement("div");
      wrapper.className = "game-card";

      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title || "Game screenshot";
      img.loading = "lazy"; // mejora rendimiento
      img.addEventListener("click", () => {
        window.open(game.link, "_blank");
      });

      const title = document.createElement("p");
      title.textContent = game.title;
      title.className = "game-title";

      wrapper.appendChild(img);
      wrapper.appendChild(title);
      carousel.appendChild(wrapper);
    });

    // Scroll automático continuo con pausa al hover
    let autoScrollInterval;
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        carousel.scrollLeft += 2; // velocidad
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0; // reinicia al inicio
        }
      }, 30); // cada 30ms
    }
    function stopAutoScroll() {
      clearInterval(autoScrollInterval);
    }

    startAutoScroll();
    carousel.addEventListener("mouseenter", stopAutoScroll);
    carousel.addEventListener("mouseleave", startAutoScroll);

  } catch (err) {
    const carousel = document.getElementById("carousel");
    console.error("Error loading games:", err);
    carousel.innerHTML = "<p>Error loading games. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadGames);

// Tema día/noche optimizado
const body = document.body;
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.replace("light", "dark");
    toggleBtn.setAttribute("aria-pressed", "true");
  } else {
    body.classList.replace("dark", "light");
    toggleBtn.setAttribute("aria-pressed", "false");
  }
});

// Tema por defecto: claro
document.body.classList.add("light");
