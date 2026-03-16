const API_URL = "https://api.disneyapi.dev/character";

let personajes = [];
let paginaActual = 1;
const porPagina = 8; // 2 filas aprox

async function getDisneyCharacters() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error(`No se encontró un pie para este zapatito: ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        personajes = datos.data;

        mostrarPagina();

    } catch (error) {
        console.error("Nooooooo nos ha encerrado Jafar:", error.message);
    }
}

function mostrarPagina(){

    const container = document.getElementById("Disney");

    const inicio = (paginaActual - 1) * porPagina;
    const fin = inicio + porPagina;

    const personajesPagina = personajes.slice(inicio, fin);

    const cards = personajesPagina.map(personaje => {

        return `
        <div class="card">

            <img src="${personaje.imageUrl}" alt="${personaje.name}">

            <h3>${personaje.name}</h3>

            <ul>
                <li>
                ${personaje.films.length > 0 
                ? "Películas: " + personaje.films.join(", ") 
                : "El señor Disney no ha creado ninguna peli donde sea el prota."}
                </li>
            </ul>

        </div>
        `;
    });

    container.innerHTML = cards.join("");
}

document.getElementById("next").addEventListener("click", () => {
    paginaActual++;
    mostrarPagina();
});

document.getElementById("prev").addEventListener("click", () => {
    if(paginaActual > 1){
        paginaActual--;
        mostrarPagina();
    }
});

getDisneyCharacters();