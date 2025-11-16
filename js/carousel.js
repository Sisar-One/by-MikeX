// js/carousel.js
// Controla el carrusel de juegos usando data/games.json

async function loadGames() {
  try {
    const response = await fetch("data/games.json");
    const games = await response.json();

    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    games.forEach(game => {
      const img = document.createElement("img");
      img.src = game.image;
      img.alt = "Game screenshot";
      img.addEventListener("click", () => {
        window.open(game.link, "_blank");
      });
      carousel.appendChild(img);
    });
  } catch (err) {
    console.error("Error loading games:", err);
  }
}

// Inicializar carrusel
document.addEventListener("DOMContentLoaded", loadGames);

// Opcional: soporte de swipe en móviles
let startX = 0;
let scrollLeft = 0;

const carousel = document.getElementById("carousel");
carousel.addEventListener("mousedown", (e) => {
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
  carousel.classList.add("active");
});

carousel.addEventListener("mouseleave", () => {
  carousel.classList.remove("active");
});

carousel.addEventListener("mouseup", () => {
  carousel.classList.remove("active");
});

carousel.addEventListener("mousemove", (e) => {
  if (!carousel.classList.contains("active")) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2; // velocidad de desplazamiento
  carousel.scrollLeft = scrollLeft - walk;
});

