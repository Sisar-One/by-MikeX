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
      img.alt = game.title || "Game screenshot";
      img.addEventListener("click", () => {
        window.open(game.link, "_blank");
      });
      carousel.appendChild(img);
    });
  } catch (err) {
    console.error("Error loading games:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadGames);
