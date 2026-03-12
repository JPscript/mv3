const baseUrl = "http://127.0.0.1:3000/recipes";

document.getElementById("eliminarBtn").addEventListener("click", eliminarReceta);
//Delete (eliminar)
async function eliminarReceta() {
  try {

    const id = document.getElementById("idInput").value;
    const r = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    const data = await r.json();
    console.log(data);

    if (!r.ok) {
      console.error("Error eliminando receta:", data);
      alert("Error al eliminar receta ❌. Revisa la consola.");
      return;
    }
    alert("Receta eliminada correctamente ✅");
    
  } catch (error) {
    console.error(error);
  }
};

// GET (listar)
(async () => {
  try {
    const r = await fetch(baseUrl);
    const data = await r.json();

    let html = "";

    data.forEach(receta => {
      html += `
        <div class="card">
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

  } catch (error) {
    console.error(error);
  }
})();