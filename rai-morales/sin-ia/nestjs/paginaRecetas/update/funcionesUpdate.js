//CREAR UN HTML CON UNA ETIQUETA DONDE METER TODAS LAS TARJETAS.
//CON JS, LLAMAR A LA API PARA OBTENER LAS RECETAS Y MOSTRARLAS EN LA PÁGINA COMO TARJETAS.
//CADA TARJETA AL HACERLE CLICK MOSTRARÁ UNA PANTALLA EMERGENTE CON LA INFORMACIÓN DE LA RECETA EN UN FORMULARIO Y UN BOTÓN PARA EDITARLA.
//AL HACER CLICK CON JS COMPARAMOS LOS DATOS DEL ID DE LA RECE CON LOS DATOS DEL FORMULARIO Y LOS CAMPOS DIFERENTES LAS GUARDAMOS EN UN OBJETO NUEVO
//SI HAY ALGUNA DIFERENCIA HACEMOS UN FETCH A LA API (PATCH) PARA ACTUALIZAR LA RECETA, SI NO HAY NINGUNA DIFERENCIA, NO HACEMOS NADA.

const baseUrl = 'http://localhost:3000/recipes';
const contenedor = document.getElementById('contenedor-recetas');

(async () => {
  try {
    const respuesta = await fetch(baseUrl, { method: "GET" });
    const recetas = await respuesta.json();

    // Limpiamos el mensaje de "Cargando..."
    contenedor.innerHTML = "";

    // Si no hay recetas
    if (recetas.length === 0) {
        contenedor.innerHTML = "<p>No hay recetas todavía. ¡Crea la primera!</p>";
        return;
    }

    // Recorremos cada receta de la base de datos
    recetas.forEach(receta => {
        
        // Creamos un "pedazo" de HTML para cada receta
        const card = document.createElement('div');
        card.style.border = "1px solid #ccc";
        card.style.margin = "10px";
        card.style.padding = "15px";
        card.style.borderRadius = "8px";
        card.style.cursor = pointer;

        // Creamos el modal de cada uno
        const cardModal = document.createElement('div');
        cardModal.style.display = none;
        cardModal.style.position = fixed;
        cardModal.style.backgroundColor = rgba(0,0,0,0.5);

        // Rellenamos el contenido con los campos de tu base de datos
        // Nota: Si la imagen es una URL, la usamos en el src
        card.innerHTML = `
            <h3>${receta.nombre}</h3>
            ${receta.image_url ? `<img src="${receta.image_url}" alt="${receta.nombre}" style="width:200px;">` : ''}
            <p><strong>Descripción :</strong> ${receta.descripcion}</p>
            <p><strong>Ingredientes :</strong> ${receta.ingredientes}</p>
            <p><strong>Dificultad :</strong> ${receta.dificultad}</p>
            <p><strong>Tiempo :</strong> ${receta.tiempo_min} min</p>
            <p><strong>Fecha de creación :</strong> ${receta.created_at}</p>
            <p><strong>Última fecha de actualización :</strong> ${receta.updated_at}</p>
        `;

        // Creamos la pantalla modal con el forcumlario
        cardModal.innerHTML = `
        <h3>${receta.nombre}</h3>
        
        `

        // Lo añadimos al contenedor principal
        contenedor.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<p>Error al cargar las recetas. ¿Está encendido el servidor?</p>";
  }
})();



function dataUpdate() {
    document.getElementById("create-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        //COMPARACION DE DATOS
        let cambios = {};
        console.log("nombre: ", formData.get("nombre"))
        console.log("descripcion: ", formData.get("descripcion"))
        console.log("ingredientes: ", formData.get("ingredientes"))
        console.log("tiempo min: ", formData.get("tiempo"))
        console.log("dificultad: ", formData.get("dificultad"))
        console.log("imagen: ", formData.get("file"))
        try {
            const response = await fetch("http://localhost:3000/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: formData.get("nombre"),
                    descripcion: formData.get("descripcion"),
                    ingredientes: formData.get("ingredientes"),
                    tiempo_min: Number(formData.get("tiempo")),
                    dificultad: formData.get("dificultad")
                }),
            });
            const body = await response.json();
            console.log("body: ", body)
            const fileResponse = await fetch("http://localhost:3000/recipes/"+body.id+"/image", {
                method: "POST",
                body: formData,
            });
            const fileBody = await fileResponse.json();
            console.log("fileBody: ", fileBody);
        }
        catch (error) {
            console.error("Error: ", error);
            }
        })
}
data();