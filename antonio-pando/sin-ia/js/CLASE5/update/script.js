// Resumen: este script carga recetas desde una API y las muestra como tarjetas.
// Al hacer clic en una tarjeta se abre un modal con un formulario para editar esa receta.
// Si hay cambios en el formulario se envía un PATCH para actualizar la receta en la API.
/*
Ejemplo de objeto 'receta' que maneja la app:
{
  "id": 1,
  "nombre": "Tostada Senior Cat",
  "descripcion": "Tostada crujiente con aguacate y limón",
  "ingredientes": "pan,aguacate,limon,sal",
  "tiempo_min": 10,
  "dificultad": "facil",
  "image_url": null,
}

Ejemplo de uso: si el formulario cambia solo la propiedad `nombre`, se enviará
un objeto con solo esa clave modificada al servidor (PATCH).
*/

// URL base de la API donde están las recetas.
const API_URL = "http://localhost:3000/recipes";

// Array global que almacenará las recetas cargadas desde la API.
let recetasData = [];

// Función que obtiene las recetas de la API y las pinta en el DOM.
async function loadRecetas() {
  try {
    // Hacemos la petición a la API.
    let response = await fetch(API_URL);
    // Convertimos la respuesta a JSON y la guardamos en la variable global.
    recetasData = await response.json();

    // Construimos el HTML con las tarjetas de cada receta.
    let text = "";
    recetasData.forEach((receta) => {
      // Usamos template strings para crear el bloque HTML de cada tarjeta.
      text += `
              <div class="tarjeta" data-id="${receta.id}" style="cursor: pointer;">
                  <img src="${receta.image_url}" alt="Imagen de ${receta.nombre}"/>
                  <div class="detalles">
                      <p>RECETA: ${receta.nombre}</p>
                      <p>INGREDIENTES: ${receta.ingredientes}</p>
                      <p>TIEMPO REQUERIDO: ${receta.tiempo_min} minutos</p>
                      <p>DESCRIPCION: ${receta.descripcion}</p>
                  </div>
              </div>
              `;
    });

    // Insertamos todas las tarjetas en el contenedor con id 'contenido'.
    document.getElementById("contenido").innerHTML = text;

    // Añadimos un listener de click a cada tarjeta para abrir el modal.
    document.querySelectorAll(".tarjeta").forEach((tarjeta) => {
      tarjeta.addEventListener("click", () => {
        // Obtenemos el id desde el atributo data-id y buscamos la receta en el array.
        const id = Number(tarjeta.getAttribute("data-id"));
        const receta = recetasData.find((r) => r.id === id);
        if (receta) mostrarModal(receta);
      });
    });
  } catch (error) {
    // En caso de error de red lo mostramos en consola.
    console.log("Eror al hacer la peticion a la API: ", error);
  }
}

function mostrarModal(receta) {
  let modal = document.getElementById("modal-update");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-update";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.7)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    document.body.appendChild(modal);
  }

  // Rellenamos el modal con un formulario que muestra los valores actuales de la receta.
  // Mantener la cadena HTML tal cual para no romper el template.
  modal.innerHTML = ` <div style="background: #f7cac9; padding: 20px; border-radius: 8px; max-width: 500px; width: 100%;">
          <h2>Modificar Receta</h2>
          <form id="update-form">
              <div style="margin-bottom: 10px;">
                <label>Nombre: <input type="text" name="nombre" value="${receta.nombre}"></label>
              </div>
              <div style="margin-bottom: 10px;">
                <label>Descripción: <textarea name="descripcion">${receta.descripcion}</textarea></label>
              </div>
              <div style="margin-bottom: 10px;">
                <label>Ingredientes: <input type="text" name="ingredientes" value="${receta.ingredientes}"></label>
              </div>
              <div style="margin-bottom: 10px;">
                <label>Tiempo (min): <input type="number" name="tiempo_min" value="${receta.tiempo_min}"></label>
              </div>
              <div style="margin-bottom: 10px;">
                <label>Dificultad: <input type="text" name="dificultad" value="${receta.dificultad || ""}"></label>
              </div>
              <div style="margin-bottom: 10px;">
                <label>Cambiar Imagen: <input type="file" name="imagen" accept="image/*"></label>
                ${receta.image_url ? `<p style="font-size: 0.8em; margin-top: 5px; color: #555;">Imagen actual: ${receta.image_url.split('/').pop()}</p>` : ''}
              </div>
              
              <button type="submit">Guardar Cambios</button>
              <button type="button" id="btn-cerrar" style="margin-left: 10px;">Cerrar</button>
          </form>
      </div>
  `;
  modal.style.display = "flex";

  // Listener para cerrar el modal cuando el usuario pulsa el botón 'Cerrar'.
  document.getElementById("btn-cerrar").addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Listener para el submit del formulario de actualización.
  document
    .getElementById("update-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;

      // 'cambios' almacenará solo las propiedades que han cambiado.
      let cambios = {};

      // Comparamos cada campo del formulario con los valores originales.
      if (form.nombre.value !== receta.nombre) 
        cambios.nombre = form.nombre.value;
      if (form.descripcion.value !== receta.descripcion)
        cambios.descripcion = form.descripcion.value;
      if (form.ingredientes.value !== receta.ingredientes)
        cambios.ingredientes = form.ingredientes.value;
      if (Number(form.tiempo_min.value) !== receta.tiempo_min)
        cambios.tiempo_min = Number(form.tiempo_min.value);
      if (form.dificultad.value !== (receta.dificultad || ""))
        cambios.dificultad = form.dificultad.value;
      if (form.image_url.value !== receta.image_url)
        cambios.image_url = form.image_url.value;

      // Si hay claves en 'cambios', hacemos un PATCH a la API con solo esas claves.
      if (Object.keys(cambios).length > 0) {
        try {
          const response = await fetch(`${API_URL}/${receta.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cambios),
          });
          if (response.ok) {
            // Si la actualización fue correcta, cerramos el modal y recargamos la lista.
            modal.style.display = "none";
            loadRecetas(); // Recargar las recetas para mostrar los cambios
          } else {
            // Si el servidor respondió con error, lo mostramos en consola.
            console.error("Error al actualizar la receta:", await response.text());
          }
        } catch (error) {
          // Errores de red u otros problemas se capturan aquí.
          console.error("Error en la petición: ", error);
        }
      } else {
        // Si no hay cambios, no hacemos ninguna petición y cerramos el modal.
        console.log("No hay cambios para actualizar.");
        modal.style.display = "none";
      }
    });
}

// Iniciamos la carga de recetas al cargar el script.
loadRecetas();
