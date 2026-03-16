const baseUrl = "http://127.0.0.1:3000/recipes";

let recetaSeleccionada = null;

// Función para cerrar modal
function cerrarModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Listar recetas
(async () => {
  try {
    const r = await fetch(baseUrl);
    const data = await r.json();

    let html = "";
    data.forEach((receta) => {
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

    // Evento al pulsar sobre una tarjeta
    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("click", () => {
        recetaSeleccionada = card.dataset.id;

        // Rellenar modal con los datos de la receta
        const modalContent = document.querySelector("#modal section");
        modalContent.innerHTML = `
          <p>¿Estás seguro de que quieres eliminar esta deliciosa receta?</p>
          <h2>${card.querySelector("h2").textContent}</h2>
          <p>${card.querySelector("p").textContent}</p>
          <button id="eliminarBtn">Eliminar</button>
          <button type="button" id="cerrarModal">Cancelar</button>
        `;

        // Mostrar modal y overlay
        document.getElementById("modal").style.display = "flex";
        document.getElementById("overlay").style.display = "block";

        // Botón eliminar dentro del modal
        document.getElementById("eliminarBtn").addEventListener("click", async () => {
          if (!recetaSeleccionada) return;
          try {
            const r = await fetch(`${baseUrl}/${recetaSeleccionada}`, { method: "DELETE" });
            const data = await r.json();

            if (!r.ok) {
              console.error("Error eliminando receta:", data);
              alert("Error al eliminar receta ❌");
              return;
            }

            alert("Receta eliminada correctamente ✅");
            cerrarModal();
            location.reload(); // Recargar para actualizar lista
          } catch (error) {
            console.error(error);
          }
        });

        // Botón cerrar modal
        document.getElementById("cerrarModal").addEventListener("click", cerrarModal);
      });
    });

  } catch (error) {
    console.error(error);
  }
})();

// Cerrar modal al pulsar overlay
document.getElementById("overlay").addEventListener("click", cerrarModal);