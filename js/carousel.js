async function loadGames() {
  try {
    const response = await fetch("data/games.json");
    const games = await response.json();

    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    games.forEach(game => {
      const wrapper = document.createElement("div");
      wrapper.className = "game-card";

      const img = document.createElement("img");
      img.src = game.image;
      img.alt = game.title || "Game screenshot";
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
  } catch (err) {
    console.error("Error loading games:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadGames);

// Tema día/noche
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

document.body.classList.add("light");
