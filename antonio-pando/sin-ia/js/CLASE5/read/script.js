const API_URL = "https://localhost:3000/repices"

async function loadData() {
    try{
        let response = await fetch(API_URL);
        let data = await response.json();
        let tamano = data.length;

        let text = "";

        data.forEach(receta => {
            text += `
            <div class="tarjeta">
                <img src="${receta.image_url}" alt="Imagen de ${receta.nombre}"/>
                <div class="detalles">
                    <p>RECETA: ${receta.nombre}</p>
                    <p>INGREDIENTES: ${receta.ingredientes}</p>
                    <p>TIEMPO REQUERIDO: ${receta.tiempo_min} minutos</p>
                    <p>DESCRIPCION: ${receta.descripcion}</p>
            </div>
            `
        })

    }
}