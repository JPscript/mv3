const API_URL = "https://potterapi-fedeperin.vercel.app/es/characters";

const cardsContainer = document.getElementById("cards");
const statusEl = document.getElementById("status");

async function loadData() {
    try {
        const response = await fetch(API_URL);

        const data = await response.json();

        const characters = data;

        const htmlCards = characters.map((personaje) => {
            return `
            <article class="card">
                <img src="${personaje.image}" alt="${personaje.fullName}">
                <div class="content">
                    <h3>${personaje.fullName}</h3>
                    <p>Casa: ${personaje.hogwartsHouse}</p>
                </div>
            </article>
        `;
        }).join("");

        cardsContainer.innerHTML = htmlCards;
        statusEl.textContent = "Carga mágica completada";
    } catch (error) {
        statusEl.textContent = "Error al cargar los datos";
    } finally {
        console.log("Intento de carga finalizado.");
    }

}

loadData();