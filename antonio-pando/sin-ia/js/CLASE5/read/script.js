const API_URL = "http://localhost:3000/recipes"

async function loadData() {
    try{
        let response = await fetch(API_URL);
        let data = await response.json();

        let tamano = data.length;

        let text = "";
        data.forEach(receta => {
            text += `
            <a href="${API_URL}/${receta.id}">
                <div class="tarjeta">
                    <img src="${receta.image_url}" alt="Imagen de ${receta.nombre}"/>
                    <div class="detalles">
                        <p>RECETA: ${receta.nombre}</p>
                        <p>INGREDIENTES: ${receta.ingredientes}</p>
                        <p>TIEMPO REQUERIDO: ${receta.tiempo_min} minutos</p>
                        <p>DESCRIPCION: ${receta.descripcion}</p>
                    </div>
                </div>
            <a>
            `
        })
        document.getElementById("contenido").innerHTML = text;

    } catch (error) {
        console.log("Network error: ", error);
    }
}

loadData()