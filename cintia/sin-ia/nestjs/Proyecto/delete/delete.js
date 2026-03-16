const api_url = "http://localhost:3000/recipes";

async function verRecetas() {
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API");
        }
        const data = await response.json();
        let info = data;
        let text = "";

        for (let i = 0; i < info.length; i++) {
            text += `<div class='card'>
                <p>Titulo: ${data[i].nombre}</p>
                <p>Ingredientes: ${data[i].ingredientes}</p>
                <p>Tiempo elaboracion: ${data[i].tiempo_min}</p>
                <p>Dificultad: ${data[i].dificultad}</p>
                <button onclick="eliminarReceta('${data[i].id}')">Eliminar</button>
            </div>`;
        }
        document.getElementById("data").innerHTML = text;
    }

    catch (e) {
        console.error(e);
    }
}

verRecetas();


async function eliminarReceta(id) {
    const confirmation = confirm("¿Estas seguro de que deseas eliminar esta receta?");
    if (!confirm) {
        return;
    }
    try {
        const response = await fetch(`${api_url}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar la receta");
        }
        alert("Receta eliminada correctamente");
        verRecetas();
    } catch (e) {
        console.error("Error: ", e);
    }
}




