// Crear un html con una etiquete donde meter todas las tarjetas.
// Con JS, llamar a la API para obtener las recetas y mostrarlas en la página como tarjetas.
// Cada tarjeta al hacerle click, mostrará un modal con la información de la receta en un formulario y un botón para editarla.
// Al hacer click con javascript comparamos los datos del id de la receta con los datos del formulario, y las claves diferentes las guardamos en un objeto nuevo.
// Si hay alguna diferencia hacemos un fetch (PATCH) a la API para actualizar la receta, si no hay ninguna diferencia, no hacemos nada.
/*
 El objeto pintado:
{
"id": 1,
"nombre": "Tostada Senior Cat",
"descripcion": "Tostada crujiente con aguacate y limón",
"ingredientes": "pan,aguacate,limon,sal",
"tiempo_min": 10,
"dificultad": "facil",
"image_url": null,

}
Los datos del formulario:
{
"id": 1,
"nombre": "Tostada Senior Cat Suprema",
"descripcion": "Tostada crujiente con aguacate y limón",
"ingredientes": "pan,aguacate,limon,sal",
"tiempo_min": 10,
"dificultad": "facil",
"image_url": null,
}
*/

const baseUrl = "http://127.0.0.1:3000/recipes";

// Guardar receta seleccionada
let recetaSeleccionada = null;

// Función para mostrar todas las recetas
(async () => {
  try {
    const r = await fetch(baseUrl);
    const data = await r.json();

    let html = "";

    data.forEach(receta => {
      html += `
        <div class="card" data-id="${receta.id}">
          <h2>${receta.nombre}</h2>
          <p>${receta.descripcion}</p>
          <p><strong>Dificultad:</strong> ${receta.dificultad}</p>
          <p><strong>Tiempo:</strong> ${receta.tiempo_min} min</p>
          ${receta.image_url ? `<img src="${receta.image_url}" alt="${receta.nombre}">` : ''}
          <p><strong>ID:</strong> ${receta.id}</p>
        </div>
      `;
    });

    document.getElementById("recetas").innerHTML = html;

    // Agregar evento click a cada tarjeta
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        recetaSeleccionada = data.find(r => r.id == id);

        // Rellenar el formulario con los datos de la receta
        document.getElementById("nombre").value = recetaSeleccionada.nombre;
        document.getElementById("descripcion").value = recetaSeleccionada.descripcion;
        document.getElementById("ingredientes").value = recetaSeleccionada.ingredientes;
        document.getElementById("dificultad").value = recetaSeleccionada.dificultad;
        document.getElementById("tiempo").value = recetaSeleccionada.tiempo_min;

        // Mostrar modal y overlay
        document.getElementById("modalForm").style.display = "block";
        document.getElementById("overlay").style.display = "block";
      });
    });

  } catch (error) {
    console.error("Error al cargar recetas:", error);
  }
})();

// Cerrar modal
document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
document.getElementById("overlay").addEventListener("click", cerrarModal);

function cerrarModal() {
  document.getElementById("modalForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Función para actualizar la receta
document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // Datos JSON
  const bodyData = {
    nombre: formData.get("nombre"),
    descripcion: formData.get("descripcion"),
    ingredientes: formData.get("ingredientes"),
    dificultad: formData.get("dificultad"),
    tiempo_min: Number(formData.get("tiempo"))
  };

  try {
    // PATCH de datos
    const response = await fetch(`${baseUrl}/${recetaSeleccionada.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData)
    });

    const updatedReceta = await response.json();
    if (!response.ok) {
      console.error("Error actualizando receta:", updatedReceta);
      alert("Error al actualizar la receta ❌");
      return;
    }

    // POST de imagen (si hay archivo)
    const file = formData.get("file");
    if (file && file.size > 0) {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      const fileResponse = await fetch(`${baseUrl}/${recetaSeleccionada.id}/image`, {
        method: "POST",
        body: formDataImg
      });

      const fileBody = await fileResponse.json();
      if (!fileResponse.ok) {
        console.error("Error subiendo imagen:", fileBody);
        alert("Datos actualizados, pero fallo al subir la imagen ❌");
      }
    }

    alert("Receta actualizada correctamente ✅");
    cerrarModal();
    location.reload(); // Recargar para actualizar lista


  } catch (error) {
    console.error("Error en la actualización:", error);
  }
});