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

        // Lo añadimos al contenedor principal
        contenedor.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    contenedor.innerHTML = "<p>Error al cargar las recetas. ¿Está encendido el servidor?</p>";
  }
})();