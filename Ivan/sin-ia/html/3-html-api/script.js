const API_URL = "https://rickandmortyapi.com/api/character";
const cardsEl = document.getElementById("Cards");
const statusEl = document.getElementById("status");

async function cargarPersonajes() {
    statusEl.textContent = "Cargando datos...";

    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    const personajes = datos.results;

    const tarjetasArray = personajes.map((personaje) => {
        return `
    <article class="card">
      <img src="${personaje.image}" alt="${personaje.name}">
      <h3>${personaje.name}</h3>
      <p>${personaje.species} - ${personaje.status}</p>
    </article>
  `;
    });

    const tarjetasHTML = tarjetasArray.join("");
    cardsEl.innerHTML = tarjetasHTML;
    statusEl.textContent = `Tarjetas renderizadas: ${personajes.length}`;
}



cargarPersonajes();