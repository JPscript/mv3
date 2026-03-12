const baseUrl = "http://127.0.0.1:3000/recipes";
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

document.getElementById("buscarBtn").addEventListener("click", buscarId);

// GET por id
async function buscarId() {
    

  try {
    const id = document.getElementById("idInput").value;
    const r = await fetch(`${baseUrl}/${id}`);
    const data = await r.json();

    let html = `
        <div class="card">
          <h2>${data.nombre}</h2>
          <p>${data.descripcion}</p>
          <p><strong>Dificultad:</strong> ${data.dificultad}</p>
          <p><strong>Tiempo:</strong> ${data.tiempo_min} min</p>
        ${data.image_url ? `<img src="${data.image_url}" alt="${data.nombre}">` : ''}
        <p></p>ID: ${data.id}</p>
        </div>
      `;
    
    document.getElementById("resultado").innerHTML = html;

  } catch (error) {
    console.error(error);
  }
};