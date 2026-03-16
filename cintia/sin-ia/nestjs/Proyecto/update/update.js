const api_url = "http://localhost:3000/recipes";

let recetaSeleccionada = null;

async function verRecetas() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        let text = "";
        for (let i = 0; i < data.length; i++) {
            text += `<div class='card'>
            <button onclick="window.location.href='updateDos.html?id=${data[i].id}'">${data[i].nombre}</button>
            </div><br>`;
        }
        document.getElementById("data").innerHTML = text;
    } catch (e) {
        console.error(e);
    }
}

if (document.getElementById("data")) {
    verRecetas();
}

